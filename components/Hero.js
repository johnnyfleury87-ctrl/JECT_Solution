'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="min-h-[85vh] flex items-center bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="container-custom py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Partie gauche : Texte */}
            <div className="order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <p className="text-primary-600 font-medium mb-3 text-sm uppercase tracking-wide">
                  Bonjour, je suis Johnny
                </p>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Vous passez trop de temps sur des tâches répétitives qui ne créent pas de valeur ?
                </h1>
                
                <div className="space-y-4 text-lg text-gray-700 leading-relaxed mb-8">
                  <p>
                    Je connais cette frustration. Celle de voir son temps partir dans des saisies manuelles, 
                    des suivis Excel interminables, des oublis et des erreurs qui coûtent cher.
                  </p>
                  
                  <p>
                    Depuis 10 ans, j&apos;accompagne des entreprises comme la vôtre pour transformer ces 
                    irritants quotidiens en processus fluides et automatisés.
                  </p>
                  
                  <p className="font-medium text-gray-900">
                    Pas de solution miracle. Juste de l&apos;écoute, du travail sur mesure, 
                    et des résultats mesurables.
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link 
                    href="/contact" 
                    className="btn-primary text-base inline-flex items-center justify-center group"
                  >
                    Parlons de votre situation
                    <svg 
                      className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  
                  <Link 
                    href="/#process" 
                    className="btn-secondary text-base inline-flex items-center justify-center"
                  >
                    Comment je travaille
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Partie droite : Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                {/* Décoration d'arrière-plan */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-primary-100 rounded-3xl transform rotate-3 opacity-50"></div>
                
                {/* Photo */}
                <div className="relative bg-white p-4 rounded-3xl shadow-2xl">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    {/* TODO: Remplacer par votre vraie photo */}
                    {/* <Image src="/images/johnny-hero.jpg" alt="Johnny Fleury" fill className="object-cover" /> */}
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center p-8">
                        <div className="text-9xl mb-4">👨‍💼</div>
                        <p className="text-gray-600 font-medium">Photo à ajouter</p>
                        <p className="text-sm text-gray-500 mt-2">johnny-hero.jpg</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Badge confiance */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-lg border-2 border-primary-500"
                  >
                    <p className="text-sm font-semibold text-gray-900">
                      10+ ans d&apos;expérience terrain
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
