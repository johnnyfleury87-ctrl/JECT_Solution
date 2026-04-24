'use client';

import { useEffect, useRef } from 'react';

// Génère un ID de session anonyme persistant
function getOrCreateSessionId() {
  if (typeof window === 'undefined') return null;

  const SESSION_KEY = 'jetc_session_id';
  const MAX_SESSION_AGE_MS = 24 * 60 * 60 * 1000;
  const rawSession = localStorage.getItem(SESSION_KEY);

  if (rawSession) {
    try {
      const parsed = JSON.parse(rawSession);
      const age = Date.now() - Number(parsed.createdAt || 0);
      if (parsed.id && age >= 0 && age <= MAX_SESSION_AGE_MS) {
        return parsed.id;
      }
    } catch {
      // On ignore la valeur corrompue et on régénère un identifiant.
    }
  }

  if (typeof crypto?.randomUUID !== 'function') {
    return null;
  }

  const sessionId = crypto.randomUUID();
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({
      id: sessionId,
      createdAt: Date.now(),
    })
  );

  return sessionId;
}

export default function PingClient() {
  const sessionIdRef = useRef(null);
  const intervalRef = useRef(null);
  const isStatsEnabled = process.env.NEXT_PUBLIC_ENABLE_STATS === 'true';

  useEffect(() => {
    if (!isStatsEnabled) return;

    // Obtenir ou créer la session ID
    sessionIdRef.current = getOrCreateSessionId();
    
    if (!sessionIdRef.current) return;

    // Fonction de ping
    const sendPing = async () => {
      try {
        const response = await fetch('/api/ping', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId: sessionIdRef.current
          }),
        });
        
        if (response.ok) {
          const data = await response.json();
          if (process.env.NODE_ENV === 'development') {
            console.debug('[PingClient] Ping envoyé:', data);
          }
        } else {
          if (process.env.NODE_ENV === 'development') {
            console.error('[PingClient] Erreur ping:', response.status);
          }
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('[PingClient] Erreur réseau:', error);
        }
      }
    };

    // Ping initial au chargement
    sendPing();

    // Ping toutes les 30 secondes
    intervalRef.current = setInterval(sendPing, 30000);

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isStatsEnabled]);

  // Composant invisible
  return null;
}
