'use client';

import { useState, useRef, useEffect } from 'react';
import Script from 'next/script';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    requestType: '',
    message: '',
    honeypot: '', // Champ anti-spam caché
  });
  
  const [status, setStatus] = useState({
    type: '', // 'success', 'error', 'loading'
    message: '',
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Protection anti-spam : si le honeypot est rempli, c'est un bot
    if (formData.honeypot) {
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

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Merci, votre message a bien été envoyé. Un email de confirmation vient de vous être transmis.',
        });
        // Réinitialiser le formulaire
        setFormData({
          name: '',
          email: '',
          company: '',
          requestType: '',
          message: '',
          honeypot: '',
        });
        // Reset Turnstile widget so it can be used again.
        setTurnstileToken('');
        if (widgetIdRef.current != null && window.turnstile) {
          window.turnstile.reset(widgetIdRef.current);
        }
      } else {
        setStatus({
          type: 'error',
          message: data.message || data.error || 'Une erreur est survenue lors de l\'envoi. Merci de réessayer ou de nous contacter par email.',
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Erreur de connexion. Veuillez vérifier votre connexion internet.',
      });
    }
  };

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
      <form onSubmit={handleSubmit} className="space-y-6">
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            placeholder="Votre nom"
          />
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            placeholder="votre@email.com"
          />
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white"
          >
            <option value="">Sélectionnez un type de demande</option>
            <option value="Discussion">Discussion</option>
            <option value="Question">Question</option>
            <option value="Démo">Démo</option>
            <option value="Partenariat">Partenariat</option>
            <option value="Autre">Autre</option>
          </select>
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
            placeholder="Décrivez votre projet ou votre demande..."
          />
        </div>

        {/* Cloudflare Turnstile widget */}
        {siteKey && (
          <div ref={turnstileRef} className="flex justify-center" />
        )}

        {/* Message de statut */}
        {status.message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg ${
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
          disabled={status.type === 'loading'}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status.type === 'loading' ? 'Envoi en cours...' : 'Envoyer le message'}
        </button>
      </form>
    </motion.div>
  );
}
