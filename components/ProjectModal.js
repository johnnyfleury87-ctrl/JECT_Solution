'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function ProjectModal({ project, isOpen, onClose }) {
  // Bloquer le scroll du body quand le modal est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal Desktop / Drawer Mobile */}
          <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-t-3xl md:rounded-3xl shadow-2xl w-full md:max-w-4xl max-h-[90vh] overflow-y-auto pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className={`bg-gradient-to-br ${project.gradient} p-8 relative`}>
                {/* Bouton fermer */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all"
                  aria-label="Fermer"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Titre + Badge */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-6xl">{project.emoji}</div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {project.name}
                    </h2>
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold border ${project.statusColor} bg-white`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Description courte */}
                <p className="text-white/90 text-lg leading-relaxed">
                  {project.descriptionShort}
                </p>
              </div>

              {/* Contenu */}
              <div className="p-8 space-y-8">
                {/* KPIs */}
                {project.kpis && project.kpis.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Indicateurs clés
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {project.kpis.map((kpi, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-colors shadow-sm"
                        >
                          <p className="text-sm font-medium text-gray-600 mb-3">{kpi.label}</p>
                          <p className="text-4xl font-bold text-gray-900 mb-2">{kpi.value}</p>
                          {kpi.note && (
                            <p className="text-xs text-gray-500">{kpi.note}</p>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features en cartes visuelles */}
                {project.features && project.features.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                      Ce que ça fait concrètement
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                          className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border-2 border-gray-200 hover:border-green-300 hover:shadow-md transition-all group"
                        >
                          <div className="flex items-start gap-3">
                            <div className="text-3xl group-hover:scale-110 transition-transform">
                              {feature.icon}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-900 mb-1">
                                {feature.title}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {feature.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section Screenshots/Mockups */}
                {project.screenshots && project.screenshots.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      L&apos;outil en action
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {project.screenshots.map((screenshot, index) => (
                        <motion.div
                          key={screenshot.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                          className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border-2 border-green-200 hover:border-green-400 transition-all group cursor-pointer"
                        >
                          <div className="aspect-video bg-white rounded-lg mb-3 flex items-center justify-center border-2 border-gray-200 group-hover:border-green-300 transition-colors overflow-hidden">
                            {screenshot.image ? (
                              <img 
                                src={screenshot.image} 
                                alt={screenshot.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="text-center p-4">
                                <div className="text-4xl mb-2">📊</div>
                                <p className="text-xs text-gray-500">Capture d&apos;écran</p>
                              </div>
                            )}
                          </div>
                          <h4 className="font-bold text-gray-900 text-sm mb-1">
                            {screenshot.title}
                          </h4>
                          <p className="text-xs text-gray-600">
                            {screenshot.description}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 italic mt-4 text-center">
                      Captures d&apos;écran réelles de l&apos;interface ProdOrga en production
                    </p>
                  </div>
                )}

                {/* CTA Lien plateforme */}
                {project.link && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    className="pt-4 border-t border-gray-200"
                  >
                    <a
                      href={project.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${project.gradient} text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200`}
                    >
                      {project.link.label}
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
