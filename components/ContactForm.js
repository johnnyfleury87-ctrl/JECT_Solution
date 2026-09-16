'use client';

import { useState, useRef, useEffect } from 'react';
import Script from 'next/script';
import { motion } from 'framer-motion';

const REQUEST_TYPES = [
  { value: 'information', label: 'Demande de renseignements' },
  { value: 'pilot', label: 'Je souhaite devenir pilote' },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validation alignée sur utils/security/contactValidation.js : le client doit
// signaler les mêmes règles que le serveur pour éviter un rejet silencieux.
function validateFields(data) {
  const errors = {};

  if (data.name.trim().length < 2) {
    errors.name = 'Veuillez saisir votre nom complet.';
  }

  if (!EMAIL_PATTERN.test(data.email.trim())) {
    errors.email = 'Veuillez saisir une adresse e-mail valide.';
  }

  if (!data.requestType) {
    errors.requestType = 'Veuillez sélectionner le motif de votre demande.';
  }

  if (data.message.trim().length < 10) {
    errors.message = 'Votre message est trop court.';
  } else if (data.message.trim().length > 2000) {
    errors.message = 'Votre message est trop long.';
  }

  return errors;
}

const INITIAL_FORM_DATA = {
  name: '',
  email: '',
  company: '',
  requestType: '',
  message: '',
  honeypot: '', // Champ anti-spam caché
};

export default function ContactForm() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [fieldErrors, setFieldErrors] = useState({});

  const [status, setStatus] = useState({
    type: '', // 'success', 'error', 'loading'
    message: '',
  });

  const isSubmittingRef = useRef(false);
  const statusRef = useRef(null);

  // Cloudflare Turnstile
  const turnstileRef = useRef(null);
  const widgetIdRef = useRef(null);
  const [turnstileToken, setTurnstileToken] = useState('');
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  function renderTurnstile() {
    if (!siteKey || !turnstileRef.current || !window.turnstile) return;
    if (widgetIdRef.current != null) return; // Already rendered.
    widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
      sitekey: siteKey,
      callback: (token) => setTurnstileToken(token),
      'expired-callback': () => setTurnstileToken(''),
      'error-callback': () => setTurnstileToken(''),
    });
  }

  useEffect(() => {
    // Turnstile may already be loaded (e.g. navigating back).
    if (window.turnstile) {
      renderTurnstile();
    }
    return () => {
      if (widgetIdRef.current != null && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Replace le focus sur la confirmation pour l'accessibilité (lecteurs d'écran).
    if (status.type === 'success' && statusRef.current) {
      statusRef.current.focus();
    }
  }, [status.type]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Efface l'erreur du champ dès que l'utilisateur le corrige.
    setFieldErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Protection anti-spam : si le honeypot est rempli, c'est un bot
    if (formData.honeypot) {
      return;
    }

    // Empêche les doubles soumissions (double clic avant le re-rendu du bouton désactivé).
    if (isSubmittingRef.current) {
      return;
    }

    const errors = validateFields(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus({ type: 'error', message: 'Veuillez corriger les champs signalés ci-dessous.' });
      return;
    }

    // Turnstile: if configured, require a valid token before submitting.
    if (siteKey && !turnstileToken) {
      setStatus({
        type: 'error',
        message: 'Veuillez compléter la vérification anti-bot avant d\'envoyer.',
      });
      return;
    }

    setFieldErrors({});
    isSubmittingRef.current = true;
    setStatus({ type: 'loading', message: 'Envoi en cours...' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          requestType: formData.requestType,
          message: formData.message,
          turnstileToken: turnstileToken || undefined,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Merci, votre message a bien été envoyé. Un email de confirmation vient de vous être transmis.',
        });
        // Réinitialiser le formulaire
        setFormData(INITIAL_FORM_DATA);
        setFieldErrors({});
        // Reset Turnstile widget so it can be used again.
        setTurnstileToken('');
        if (widgetIdRef.current != null && window.turnstile) {
          window.turnstile.reset(widgetIdRef.current);
        }
      } else if (response.status === 400 && data.field) {
        // Erreur de validation ciblée par le serveur : affichée près du champ concerné.
        setFieldErrors({ [data.field]: data.error });
        setStatus({ type: 'error', message: 'Veuillez corriger le champ signalé ci-dessous.' });
      } else if (response.status === 429) {
        setStatus({
          type: 'error',
          message: 'Trop de tentatives. Veuillez réessayer dans quelques minutes.',
        });
      } else if (response.status === 400) {
        setStatus({
          type: 'error',
          message: data.error || 'Données invalides. Veuillez vérifier votre saisie.',
        });
      } else {
        setStatus({
          type: 'error',
          message: 'L\'envoi du message a échoué. Veuillez réessayer dans quelques instants.',
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'L\'envoi du message a échoué. Veuillez réessayer dans quelques instants.',
      });
    } finally {
      isSubmittingRef.current = false;
    }
  };

  const isLoading = status.type === 'loading';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white p-8 rounded-xl shadow-lg"
    >
      {/* Cloudflare Turnstile script (only loaded when siteKey is configured) */}
      {siteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="lazyOnload"
          onLoad={renderTurnstile}
        />
      )}
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Champ honeypot caché pour anti-spam */}
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          className="hidden"
          tabIndex="-1"
          autoComplete="off"
        />

        {/* Nom */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nom complet *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? 'name-error' : undefined}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${fieldErrors.name ? 'border-red-400' : 'border-gray-300'}`}
            placeholder="Votre nom"
          />
          {fieldErrors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-600">{fieldErrors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? 'email-error' : undefined}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${fieldErrors.email ? 'border-red-400' : 'border-gray-300'}`}
            placeholder="votre@email.com"
          />
          {fieldErrors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
          )}
        </div>

        {/* Entreprise */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
            Entreprise
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            placeholder="Nom de votre entreprise (optionnel)"
          />
        </div>

        {/* Type de demande */}
        <div>
          <label htmlFor="requestType" className="block text-sm font-medium text-gray-700 mb-2">
            Type de demande *
          </label>
          <select
            id="requestType"
            name="requestType"
            value={formData.requestType}
            onChange={handleChange}
            required
            aria-invalid={Boolean(fieldErrors.requestType)}
            aria-describedby={fieldErrors.requestType ? 'requestType-error' : undefined}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white ${fieldErrors.requestType ? 'border-red-400' : 'border-gray-300'}`}
          >
            <option value="" disabled>Sélectionnez le motif de votre demande</option>
            {REQUEST_TYPES.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          {fieldErrors.requestType && (
            <p id="requestType-error" className="mt-1 text-sm text-red-600">{fieldErrors.requestType}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="6"
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={fieldErrors.message ? 'message-error' : undefined}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none ${fieldErrors.message ? 'border-red-400' : 'border-gray-300'}`}
            placeholder="Décrivez votre projet ou votre demande..."
          />
          {fieldErrors.message && (
            <p id="message-error" className="mt-1 text-sm text-red-600">{fieldErrors.message}</p>
          )}
        </div>

        {/* Cloudflare Turnstile widget */}
        {siteKey && (
          <div ref={turnstileRef} className="flex justify-center" />
        )}

        {/* Message de statut */}
        {status.message && (
          <motion.div
            ref={statusRef}
            tabIndex={-1}
            role="status"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg outline-none ${
              status.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : status.type === 'error'
                ? 'bg-red-50 text-red-800 border border-red-200'
                : 'bg-blue-50 text-blue-800 border border-blue-200'
            }`}
          >
            {status.message}
          </motion.div>
        )}

        {/* Bouton Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Envoi en cours…' : 'Envoyer le message'}
        </button>
      </form>
    </motion.div>
  );
}
