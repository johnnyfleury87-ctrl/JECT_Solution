'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

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
                👋 Bonjour, je suis Johnny
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
                  Depuis 10 ans, j&apos;accompagne des entreprises comme la vôtre pour transformer 
                  ces irritants quotidiens en processus{' '}
                  <span className="text-green-600 font-semibold">fluides</span> et{' '}
                  <span className="text-blue-600 font-semibold">automatisés</span>.
                </motion.p>
                
                <motion.p 
                  variants={itemVariants}
                  className="font-medium text-gray-900 bg-primary-50 border-l-4 border-primary-600 pl-4 py-3 rounded-r"
                >
                  Pas de solution miracle <span className="text-sm">(désolé 😅)</span>.<br />
                  Juste de l&apos;écoute, du travail sur mesure, et des résultats mesurables.
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

            {/* Partie droite : Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateZ: -2 }}
              animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="order-1 lg:order-2"
            >
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.02, rotateZ: 1 }}
                transition={{ duration: 0.3 }}
              >
                {/* Décoration d'arrière-plan animée */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-primary-200 to-primary-100 rounded-3xl opacity-50"
                  animate={{ 
                    rotateZ: [3, -3, 3],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                ></motion.div>
                
                {/* Photo */}
                <motion.div 
                  className="relative bg-white p-4 rounded-3xl shadow-2xl"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    {/* TODO: Remplacer par votre vraie photo */}
                    {/* <Image src="/images/johnny-hero.jpg" alt="Johnny Fleury" fill className="object-cover" /> */}
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center p-8">
                        <motion.div 
                          className="text-9xl mb-4"
                          animate={{ rotateZ: [0, 5, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                          👨‍💼
                        </motion.div>
                        <p className="text-gray-600 font-medium">Photo à ajouter</p>
                        <p className="text-sm text-gray-500 mt-2">johnny-hero.jpg</p>
                        <p className="text-xs text-gray-400 mt-1 italic">
                          (promis, je souris mieux en vrai)
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Badge confiance avec animation */}
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.6, type: "spring" }}
                    whileHover={{ scale: 1.05 }}
                    className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-lg border-2 border-primary-500 cursor-default"
                  >
                    <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      <span className="text-primary-600">⚡</span>
                      10+ ans d&apos;expérience terrain
                    </p>
                  </motion.div>
                </motion.div>

                {/* Petits éléments décoratifs flottants */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-yellow-400 rounded-full w-16 h-16 flex items-center justify-center shadow-lg"
                  animate={{ 
                    y: [0, -10, 0],
                    rotateZ: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 0.5 
                  }}
                >
                  <span className="text-3xl">✨</span>
                </motion.div>

                <motion.div
                  className="absolute -bottom-6 -left-6 bg-green-400 rounded-full w-20 h-20 flex items-center justify-center shadow-lg"
                  animate={{ 
                    y: [0, 10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 1
                  }}
                >
                  <span className="text-3xl">🎯</span>
                </motion.div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
