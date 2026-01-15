import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configuration de l'API route
export async function POST(request) {
  try {
    const { name, email, company, requestType, message } = await request.json();

    // Validation des champs requis
    if (!name || !email || !requestType || !message) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      );
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }

    // Validation de la longueur des champs
    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { error: 'Le nom doit contenir entre 2 et 100 caractères' },
        { status: 400 }
      );
    }

    if (message.length < 10 || message.length > 2000) {
      return NextResponse.json(
        { error: 'Le message doit contenir entre 10 et 2000 caractères' },
        { status: 400 }
      );
    }

    // Configuration du transporteur email SMTP Infomaniak
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // false pour port 587 (STARTTLS)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email n°1 : Notification à JETC (contact@jetc-immo.ch)
    const jetcMailOptions = {
      from: process.env.SMTP_FROM,
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

    // Email n°2 : Accusé de réception au client
    const clientMailOptions = {
      from: process.env.SMTP_FROM,
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

    // Envoi des deux emails
    await Promise.all([
      transporter.sendMail(jetcMailOptions),
      transporter.sendMail(clientMailOptions),
    ]);

    return NextResponse.json(
      { message: 'Emails envoyés avec succès' },
      { status: 200 }
    );

  } catch (error) {
    // Ne pas logger les données sensibles en production
    console.error('Erreur lors de l\'envoi des emails:', error.message);
    
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message. Veuillez réessayer.' },
      { status: 500 }
    );
  }
}


// Bloquer les autres méthodes HTTP
export async function GET() {
  return NextResponse.json(
    { error: 'Méthode non autorisée' },
    { status: 405 }
  );
}
