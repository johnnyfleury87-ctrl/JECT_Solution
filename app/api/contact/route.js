import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { checkSlidingWindowRateLimit } from '@/utils/security/rateLimit';
import { genericErrorResponse, noStoreHeaders, rateLimitExceededResponse } from '@/utils/security/responses';
import { logger } from '@/utils/security/logger';

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

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
      logger.error('Contact route SMTP environment missing', { route: 'contact' });
      return genericErrorResponse(500);
    }

    let data;
    try {
      data = await request.json();
    } catch {
      logger.warn('Contact route invalid JSON payload', { route: 'contact' });
      return NextResponse.json(
        { error: 'Données invalides.' },
        { status: 400, headers: noStoreHeaders() }
      );
    }

    const { name, email, company, requestType, message } = data;

    if (!name || !email || !requestType || !message) {
      return NextResponse.json(
        { error: 'Données invalides.' },
        { status: 400, headers: noStoreHeaders() }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Données invalides.' },
        { status: 400, headers: noStoreHeaders() }
      );
    }

    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { error: 'Données invalides.' },
        { status: 400, headers: noStoreHeaders() }
      );
    }

    if (message.length < 10 || message.length > 2000) {
      return NextResponse.json(
        { error: 'Données invalides.' },
        { status: 400, headers: noStoreHeaders() }
      );
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
