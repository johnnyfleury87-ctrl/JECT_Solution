'use client';

import { useEffect, useRef } from 'react';

// Génère un ID de session anonyme persistant
function getOrCreateSessionId() {
  if (typeof window === 'undefined') return null;
  
  const SESSION_KEY = 'jetc_session_id';
  let sessionId = localStorage.getItem(SESSION_KEY);
  
  if (!sessionId) {
    // Créer un ID unique basé sur timestamp + random
    sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(SESSION_KEY, sessionId);
    
    if (process.env.NODE_ENV === 'development') {
      console.debug('[PingClient] Nouvelle session créée:', sessionId);
    }
  }
  
  return sessionId;
}

export default function PingClient() {
  const sessionIdRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
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
  }, []);

  // Composant invisible
  return null;
}
