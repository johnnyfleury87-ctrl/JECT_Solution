import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { checkSlidingWindowRateLimit, getClientIp } from '@/utils/security/rateLimit';
import { genericErrorResponse, noStoreHeaders, rateLimitExceededResponse } from '@/utils/security/responses';
import { logger } from '@/utils/security/logger';
import { validateTurnstileToken, getTurnstileMode } from '@/utils/security/turnstile';
import { monitor } from '@/utils/security/monitor';
import { parseContactRequest, validateContactPayload, REQUEST_TYPE_LABELS } from '@/utils/security/contactValidation';

// Messages publics par code de validation : clairs pour l'utilisateur, sans
// jamais révéler de détail technique (voir aussi genericErrorResponse).
const VALIDATION_MESSAGES = {
  invalid_name: { field: 'name', message: 'Veuillez saisir votre nom complet.' },
  invalid_company: { field: 'company', message: "Le nom de l'entreprise est trop long." },
  invalid_request_type: { field: 'requestType', message: 'Veuillez sélectionner le motif de votre demande.' },
  invalid_email: { field: 'email', message: 'Veuillez saisir une adresse e-mail valide.' },
  message_too_short: { field: 'message', message: 'Votre message est trop court.' },
  message_too_long: { field: 'message', message: 'Votre message est trop long.' },
};

export async function POST(request) {
  try {
    const rateCheck = checkSlidingWindowRateLimit({
      request,
      routeKey: 'contact',
      limit: 6,
      windowMs: 60_000,
      blockDurationMs: 10 * 60_000,
    });

    if (!rateCheck.allowed) {
      logger.warn('Contact route rate limited', { route: 'contact' });
      return rateLimitExceededResponse(rateCheck.retryAfterSeconds);
    }

    const parsedRequest = await parseContactRequest(request);
    if (!parsedRequest.ok) {
      logger.warn('Contact route invalid request payload', { route: 'contact', reason: parsedRequest.error });
      return NextResponse.json(
        { error: 'Données invalides.' },
        { status: 400, headers: noStoreHeaders() }
      );
    }

    const validatedPayload = validateContactPayload(parsedRequest.data);
    if (!validatedPayload.valid) {
      logger.warn('Contact route invalid payload', { route: 'contact', code: validatedPayload.code });
      const known = VALIDATION_MESSAGES[validatedPayload.code];
      return NextResponse.json(
        known ? { error: known.message, field: known.field } : { error: 'Données invalides.' },
        { status: 400, headers: noStoreHeaders() }
      );
    }

    const { name, email, company, requestType, message, turnstileToken } = validatedPayload.data;

    // Turnstile n'est exigé que si les deux clés (site + secret) sont configurées.
    // Une seule clé présente est une erreur de configuration serveur, jamais une
    // fausse réussite ni un blocage silencieux déguisé en erreur de validation.
    const turnstileMode = getTurnstileMode();

    if (turnstileMode === 'misconfigured') {
      logger.error('Contact route Turnstile misconfigured (only one of the two keys is set)', { route: 'contact' });
      return genericErrorResponse(503);
    }

    if (turnstileMode === 'enabled') {
      const clientIp = getClientIp(request);
      const turnstileResult = await validateTurnstileToken(turnstileToken, clientIp);
      if (!turnstileResult.success) {
        monitor.increment('turnstile_rejected', { route: 'contact' });
        logger.warn('Turnstile validation failed', { route: 'contact', errorCode: turnstileResult.error });
        return NextResponse.json(
          { error: 'Vérification anti-bot échouée. Veuillez réessayer.' },
          { status: 400, headers: noStoreHeaders() }
        );
      }
    }
    // turnstileMode === 'disabled' : aucune clé configurée, Turnstile est ignoré,
    // aucun jeton n'est exigé et aucune erreur liée à Turnstile n'est renvoyée.

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
      logger.error('Contact route SMTP environment missing', { route: 'contact' });
      return genericErrorResponse(500);
    }

    const port = Number(SMTP_PORT);
    if (!Number.isInteger(port) || port <= 0) {
      logger.error('Contact route invalid SMTP port', { route: 'contact' });
      return genericErrorResponse(500);
    }

    const smtpConfig = {
      host: SMTP_HOST,
      port: port,
      secure: port === 465, // true pour 465, false pour 587
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      // Options supplémentaires pour améliorer la fiabilité
      tls: {
        rejectUnauthorized: true,
      },
      // Échec rapide et explicite plutôt qu'un blocage jusqu'au timeout de la plateforme.
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
    };

    let transporter;
    try {
      transporter = nodemailer.createTransport(smtpConfig);
    } catch {
      logger.error('Contact route failed to create SMTP transporter', { route: 'contact' });
      return genericErrorResponse(500);
    }

    const destinationEmail = process.env.CONTACT_RECEIVER_EMAIL || 'contact@jetc-immo.ch';

    const requestTypeLabel = REQUEST_TYPE_LABELS[requestType] || requestType;

    const jetcMailOptions = {
      from: SMTP_FROM,
      to: destinationEmail,
      replyTo: email,
      subject: 'Nouvelle demande de contact – JETC',
      text: `
Nom : ${name}
Email : ${email}
Entreprise : ${company || 'Non renseignée'}
Type de demande : ${requestTypeLabel}

Message :
${message}
      `.trim(),
    };

    const clientMailOptions = {
      from: SMTP_FROM,
      to: email,
      subject: 'JETC – Nous avons bien reçu votre demande',
      text: `
Bonjour ${name},

Nous avons bien reçu votre message et vous remercions pour l'intérêt porté à JETC.

Votre demande a été transmise et sera analysée dans les plus brefs délais.
Nous reviendrons vers vous rapidement si des informations complémentaires sont nécessaires.

Cordialement,

L'équipe JETC
${destinationEmail}
      `.trim(),
    };

    // L'email interne (vers JETC) fait foi de la réussite réelle de la demande.
    try {
      await transporter.sendMail(jetcMailOptions);
    } catch (error) {
      logger.error('Contact route SMTP send failed', { route: 'contact', code: error?.code });
      return genericErrorResponse(502);
    }

    // L'accusé de réception au visiteur est un confort : son échec ne doit pas faire
    // croire à l'utilisateur que sa demande n'est pas arrivée, alors qu'elle l'est bien.
    try {
      await transporter.sendMail(clientMailOptions);
    } catch (error) {
      logger.warn('Contact route confirmation email failed', { route: 'contact', code: error?.code });
    }

    return NextResponse.json(
      { ok: true, message: 'Emails envoyés avec succès' },
      { status: 200, headers: noStoreHeaders() }
    );
  } catch {
    logger.error('Contact route unexpected failure', { route: 'contact' });
    return genericErrorResponse(500);
  }
}
