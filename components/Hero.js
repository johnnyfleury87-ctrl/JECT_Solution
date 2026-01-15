'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="min-h-[85vh] flex items-center bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="container-custom py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Partie gauche : Texte */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="order-2 lg:order-1"
            >
              <motion.p 
                variants={itemVariants}
                className="text-primary-600 font-medium mb-3 text-sm uppercase tracking-wide"
              >
                Automatisez vos processus & gagnez en efficacité
              </motion.p>
              
              <motion.h1 
                variants={itemVariants}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
              >
                Vous passez trop de temps sur des tâches{' '}
                <span className="text-orange-600 relative">
                  répétitives
                  <svg className="absolute -bottom-1 left-0 w-full" height="8" viewBox="0 0 100 8" preserveAspectRatio="none">
                    <path d="M0,7 Q25,3 50,5 T100,7" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
                  </svg>
                </span>{' '}
                qui ne créent pas de valeur ?
              </motion.h1>
              
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed mb-8">
                <motion.p variants={itemVariants}>
                  Je connais cette frustration. Celle de voir son temps partir dans des{' '}
                  <span className="font-semibold text-gray-900">saisies manuelles</span>, des{' '}
                  <span className="font-semibold text-gray-900">suivis Excel interminables</span>, 
                  des oublis et des erreurs qui coûtent cher.
                </motion.p>
                
                <motion.p variants={itemVariants}>
                  Je transforme ces irritants quotidiens en processus{' '}
                  <span className="text-green-600 font-semibold">fluides</span> et{' '}
                  <span className="text-blue-600 font-semibold">automatisés</span>.
                </motion.p>
                
                <motion.p 
                  variants={itemVariants}
                  className="font-medium text-gray-900 bg-primary-50 border-l-4 border-primary-600 pl-4 py-3 rounded-r"
                >
                  Pas de solution miracle <span className="text-sm">(désolé 😅)</span>.<br />
                  Juste de l'écoute, du travail sur mesure, et des résultats mesurables.
                </motion.p>
              </div>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link 
                  href="/contact" 
                  className="btn-primary text-base inline-flex items-center justify-center group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Parlons de votre situation
                    <svg 
                      className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <span className="absolute inset-0 bg-primary-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </Link>
                
                <Link 
                  href="/#process" 
                  className="btn-secondary text-base inline-flex items-center justify-center group"
                >
                  Comment je travaille
                  <svg 
                    className="w-5 h-5 ml-2 group-hover:rotate-90 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>

            {/* Partie droite : Carte identité interactive */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="order-1 lg:order-2"
            >
              <div 
                className="relative group cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setIsHovered(!isHovered)}
              >
                {/* Carte principale */}
                <div className="relative bg-white p-8 rounded-3xl shadow-2xl border-2 border-gray-100 hover:border-primary-200 transition-all duration-500">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100">
                    
                    {/* État par défaut : Logo + Texte */}
                    <div 
                      className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${
                        isHovered ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
                      }`}
                    >
                      <div className="text-center space-y-6">
                        {/* Logo JETC */}
                        <div className="flex justify-center">
                          <Image 
                            src="/images/logo-jetc.png" 
                            alt="JETC Solution Logo" 
                            width={120} 
                            height={120}
                            className="object-contain"
                          />
                        </div>
                        <div className="h-1 w-20 bg-primary-600 mx-auto rounded-full"></div>
                        <p className="text-lg text-gray-700 font-medium px-8">
                          Johnny Fleury<br />
                          <span className="text-sm text-gray-500">Fondateur</span>
                        </p>
                        <p className="text-xs text-gray-400 italic px-8">
                          Passez la souris pour me découvrir
                        </p>
                      </div>
                    </div>

                    {/* État hover : Photo */}
                    <div 
                      className={`absolute inset-0 transition-all duration-700 ${
                        isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                      }`}
                    >
                      <Image 
                        src="/images/johnny-hero.jpg" 
                        alt="Johnny Fleury - Fondateur JETC Solution" 
                        fill 
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* Indicateur subtil d'interaction */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-400 italic lg:hidden">
                    Touchez pour voir la photo
                  </p>
                  <p className="text-xs text-gray-400 italic hidden lg:block">
                    Passez la souris pour voir la photo
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
