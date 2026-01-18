'use client';

import { useState, useEffect } from 'react';
import { BarChart3, X } from 'lucide-react';

export default function StatsWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [todayVisits, setTodayVisits] = useState(0);
  const [stats, setStats] = useState({
    today: 0,
    week: 0,
    month: 0,
    currentMonth: 0,
    year: 0
  });
  const [showTooltip, setShowTooltip] = useState(false);

  // Désactivé en production par défaut
  const isEnabled = process.env.NEXT_PUBLIC_ENABLE_STATS === 'true';

  // Ping déjà géré par PingClient dans layout.js - on n'a plus besoin de ça ici

  // Récupérer les visiteurs actifs (toutes les 15 secondes)
  useEffect(() => {
    if (!isEnabled) return;
    
    const fetchActive = async () => {
      try {
        const res = await fetch('/api/active', {
          cache: 'no-store'
        });
        const data = await res.json();
        setActive(data.active || 0);
        setTodayVisits(data.active || 0); // Pour le tooltip
        
        if (process.env.NODE_ENV === 'development') {
          console.debug('[StatsWidget] Visiteurs actifs:', data.active);
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('[StatsWidget] Erreur fetch active:', error);
        }
      }
    };

    fetchActive();
    const interval = setInterval(fetchActive, 15000);
    return () => clearInterval(interval);
  }, [isEnabled]);

  // Récupérer les stats complètes quand le modal s'ouvre
  useEffect(() => {
    if (!isEnabled || !isOpen) return;
    
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats', {
          cache: 'no-store'
        });
        const data = await res.json();
        setStats(data);
        setTodayVisits(data.today || 0);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('[StatsWidget] Erreur fetch stats:', error);
        }
      }
    };
    fetchStats();
  }, [isOpen, isEnabled]);

  // Ne rien rendre si désactivé
  if (!isEnabled) {
    return null;
  }

  return (
    <>
      {/* Icône avec tooltip */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-all"
          aria-label="Statistiques"
        >
          <BarChart3 className="w-5 h-5" />
        </button>

        {/* Tooltip au survol */}
        {showTooltip && !isOpen && (
          <div className="absolute right-0 top-full mt-2 bg-gray-900 text-white text-sm rounded-lg p-3 shadow-lg whitespace-nowrap z-50">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>En ligne : {active}</span>
            </div>
            <div className="text-gray-300">Aujourd'hui : {todayVisits} visites</div>
            <div className="absolute top-0 right-4 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
          </div>
        )}
      </div>

      {/* Modal des statistiques */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-primary-600" />
                <h2 className="text-2xl font-bold text-gray-900">Statistiques</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Fermer"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Contenu */}
            <div className="p-6 space-y-6">
              {/* Visiteurs en ligne */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-green-900">En ligne</span>
                  </div>
                  <span className="text-3xl font-bold text-green-700">{active}</span>
                </div>
              </div>

              {/* Aujourd'hui */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                <div className="text-sm font-medium text-blue-900 mb-1">Aujourd'hui</div>
                <div className="text-3xl font-bold text-blue-700">{stats.today}</div>
                <div className="text-xs text-blue-600 mt-1">visites</div>
              </div>

              {/* 7 derniers jours */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                <div className="text-sm font-medium text-purple-900 mb-1">7 derniers jours</div>
                <div className="text-3xl font-bold text-purple-700">{stats.week}</div>
                <div className="text-xs text-purple-600 mt-1">visites</div>
              </div>

              {/* 30 derniers jours */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                <div className="text-sm font-medium text-orange-900 mb-1">30 derniers jours</div>
                <div className="text-3xl font-bold text-orange-700">{stats.month}</div>
                <div className="text-xs text-orange-600 mt-1">visites</div>
              </div>

              {/* Grille mois et année */}
              <div className="grid grid-cols-2 gap-4">
                {/* Mois en cours */}
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4 border border-pink-200">
                  <div className="text-sm font-medium text-pink-900 mb-1">Mois en cours</div>
                  <div className="text-2xl font-bold text-pink-700">{stats.currentMonth}</div>
                  <div className="text-xs text-pink-600 mt-1">visites</div>
                </div>

                {/* Année en cours */}
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 border border-indigo-200">
                  <div className="text-sm font-medium text-indigo-900 mb-1">Année {new Date().getFullYear()}</div>
                  <div className="text-2xl font-bold text-indigo-700">{stats.year}</div>
                  <div className="text-xs text-indigo-600 mt-1">visites</div>
                </div>
              </div>

              {/* Note de confidentialité */}
              <div className="text-xs text-gray-500 text-center pt-4 border-t border-gray-200">
                Aucune donnée personnelle n'est collectée. Respect de votre vie privée.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
