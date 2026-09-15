import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { checkSlidingWindowRateLimit, getClientIp } from '@/utils/security/rateLimit';
import { genericErrorResponse, noStoreHeaders, rateLimitExceededResponse } from '@/utils/security/responses';
import { logger } from '@/utils/security/logger';
import { validateTurnstileToken } from '@/utils/security/turnstile';
import { monitor } from '@/utils/security/monitor';
import { parseContactRequest, validateContactPayload } from '@/utils/security/contactValidation';

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
      return NextResponse.json(
        { error: 'Données invalides.' },
        { status: 400, headers: noStoreHeaders() }
      );
    }

    const { name, email, company, requestType, message, turnstileToken } = validatedPayload.data;

    // Cloudflare Turnstile server-side validation.
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

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
      logger.error('Contact route SMTP environment missing', { route: 'contact' });
      return genericErrorResponse(500);
    }

    const port = Number(SMTP_PORT);
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
    };

    let transporter;
    try {
      transporter = nodemailer.createTransport(smtpConfig);
    } catch {
      logger.error('Contact route failed to create SMTP transporter', { route: 'contact' });
      return genericErrorResponse(500);
    }

    const destinationEmail = process.env.CONTACT_RECEIVER_EMAIL || 'contact@jetc-immo.ch';

    const jetcMailOptions = {
      from: SMTP_FROM,
      to: destinationEmail,
      replyTo: email,
      subject: 'Nouvelle demande de contact – JETC',
      text: `
Nom : ${name}
Email : ${email}
Entreprise : ${company || 'Non renseignée'}
Type de demande : ${requestType}

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

    try {
      await Promise.all([
        transporter.sendMail(jetcMailOptions),
        transporter.sendMail(clientMailOptions),
      ]);

      return NextResponse.json(
        { ok: true, message: 'Emails envoyés avec succès' },
        { status: 200, headers: noStoreHeaders() }
      );
    } catch {
      logger.error('Contact route SMTP send failed', { route: 'contact' });
      return genericErrorResponse(502);
    }
  } catch {
    logger.error('Contact route unexpected failure', { route: 'contact' });
    return genericErrorResponse(500);
  }
}
