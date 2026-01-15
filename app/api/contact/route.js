import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Endpoint de test GET (à supprimer après validation)
export async function GET() {
  console.log('[contact api] GET test endpoint called');
  console.log('[contact api] SMTP env check:', {
    hasHost: !!process.env.SMTP_HOST,
    hasPort: !!process.env.SMTP_PORT,
    hasUser: !!process.env.SMTP_USER,
    hasPass: !!process.env.SMTP_PASS,
    hasFrom: !!process.env.SMTP_FROM,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    from: process.env.SMTP_FROM,
  });
  
  return NextResponse.json({
    ok: true,
    message: 'Contact API is reachable',
    env_check: {
      SMTP_HOST: !!process.env.SMTP_HOST,
      SMTP_PORT: !!process.env.SMTP_PORT,
      SMTP_USER: !!process.env.SMTP_USER,
      SMTP_PASS: !!process.env.SMTP_PASS,
      SMTP_FROM: !!process.env.SMTP_FROM,
    }
  });
}

// Configuration de l'API route POST
export async function POST(request) {
  console.log('[contact api] POST called');
  
  try {
    // 1. Vérification des variables d'environnement
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;
    
    console.log('[contact api] Env vars check:', {
      hasHost: !!SMTP_HOST,
      hasPort: !!SMTP_PORT,
      hasUser: !!SMTP_USER,
      hasPass: !!SMTP_PASS,
      hasFrom: !!SMTP_FROM,
    });
    
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
      console.error('[contact api] Missing SMTP environment variables');
      return NextResponse.json(
        { ok: false, error: 'smtp_env_missing', message: 'Configuration SMTP manquante' },
        { status: 500 }
      );
    }

    // 2. Parsing du body
    let data;
    try {
      data = await request.json();
    } catch (parseError) {
      console.error('[contact api] JSON parse error:', parseError.message);
      return NextResponse.json(
        { ok: false, error: 'invalid_json', message: 'Données invalides' },
        { status: 400 }
      );
    }

    const { name, email, company, requestType, message } = data;
    
    console.log('[contact api] Form data received:', {
      hasName: !!name,
      hasEmail: !!email,
      hasCompany: !!company,
      hasRequestType: !!requestType,
      hasMessage: !!message,
    });

    // 3. Validation des champs requis
    if (!name || !email || !requestType || !message) {
      console.log('[contact api] Validation failed: missing required fields');
      return NextResponse.json(
        { ok: false, error: 'missing_fields', message: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      );
    }

    // 4. Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('[contact api] Validation failed: invalid email format');
      return NextResponse.json(
        { ok: false, error: 'invalid_email', message: 'Email invalide' },
        { status: 400 }
      );
    }

    // 5. Validation de la longueur des champs
    if (name.length < 2 || name.length > 100) {
      console.log('[contact api] Validation failed: invalid name length');
      return NextResponse.json(
        { ok: false, error: 'invalid_name', message: 'Le nom doit contenir entre 2 et 100 caractères' },
        { status: 400 }
      );
    }

    if (message.length < 10 || message.length > 2000) {
      console.log('[contact api] Validation failed: invalid message length');
      return NextResponse.json(
        { ok: false, error: 'invalid_message', message: 'Le message doit contenir entre 10 et 2000 caractères' },
        { status: 400 }
      );
    }

    // 6. Configuration du transporteur SMTP Infomaniak
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
    
    console.log('[contact api] Creating SMTP transporter:', {
      host: SMTP_HOST,
      port: port,
      secure: port === 465,
      user: SMTP_USER,
    });

    let transporter;
    try {
      transporter = nodemailer.createTransport(smtpConfig);
    } catch (transportError) {
      console.error('[contact api] Transporter creation error:', transportError.message);
      return NextResponse.json(
        { ok: false, error: 'smtp_config_error', message: 'Erreur de configuration SMTP' },
        { status: 500 }
      );
    }

    // 7. Email n°1 : Notification à JETC
    const jetcMailOptions = {
      from: SMTP_FROM,
      to: 'contact@jetc-immo.ch',
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

    // 8. Email n°2 : Accusé de réception au client
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
contact@jetc-immo.ch
      `.trim(),
    };

    // 9. Envoi des deux emails
    console.log('[contact api] Sending emails to:', {
      jetc: 'contact@jetc-immo.ch',
      client: email,
    });
    
    try {
      await Promise.all([
        transporter.sendMail(jetcMailOptions),
        transporter.sendMail(clientMailOptions),
      ]);
      
      console.log('[contact api] Emails sent successfully');
      
      return NextResponse.json(
        { ok: true, message: 'Emails envoyés avec succès' },
        { status: 200 }
      );
      
    } catch (smtpError) {
      console.error('[contact api] SMTP send error:', {
        message: smtpError.message,
        code: smtpError.code,
        command: smtpError.command,
        response: smtpError.response,
      });
      
      return NextResponse.json(
        { 
          ok: false, 
          error: 'smtp_failed', 
          message: 'Erreur lors de l\'envoi des emails',
          details: smtpError.message 
        },
        { status: 502 }
      );
    }

  } catch (error) {
    console.error('[contact api] Unexpected error:', {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });
    
    return NextResponse.json(
      { 
        ok: false, 
        error: 'unexpected_error', 
        message: 'Erreur inattendue lors de l\'envoi du message',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
