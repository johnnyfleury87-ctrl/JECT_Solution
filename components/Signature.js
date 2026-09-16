'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Signature() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Photo et Logo */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/images/photo-profile.png" alt="Johnny Fleury" fill className="object-cover" priority />
              </div>
              
              {/* Logo en incrustation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border-4 border-primary-600"
              >
                <Image 
                  src="/images/logo-jetc.png" 
                  alt="JETC Solution Logo" 
                  width={60} 
                  height={60}
                  className="object-contain"
                />
              </motion.div>
            </motion.div>

            {/* Texte Signature */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Un parcours terrain, <span className="text-primary-600">des solutions concrètes</span>
              </h2>
              
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  Mon parcours a commencé sur le terrain, de la restauration à la préparation de
                  commandes, avant d’évoluer vers l’assistance opérationnelle, les ressources
                  humaines, la coordination de projets, les achats indirects et la qualité.
                </p>

                <p>
                  Depuis près de huit ans, j’évolue dans un environnement e-commerce alimentaire
                  multi-sites comprenant plus de 12 500 références, trois sites logistiques et un
                  nouveau dépôt automatisé. Cette expérience m’a permis de développer une vision
                  transversale des opérations : flux, ressources, qualité, coûts,
                  approvisionnements et outils de pilotage.
                </p>

                <p>
                  J’ai notamment piloté l’intégration dans RELEX de l’ensemble des achats
                  indirects et du packaging de plusieurs entrepôts. Mon travail consiste à rendre
                  visibles les pertes de temps, les déplacements inutiles, les erreurs et les
                  coûts qui se cachent entre les différentes étapes d’un processus.
                </p>

                <p>
                  JETC Solution est née de cette expérience : comprendre le terrain, structurer
                  les données et construire des améliorations mesurables, sans imposer un nouvel
                  outil lorsque l’existant peut être mieux exploité.
                </p>

                <p className="text-primary-700 font-semibold italic">
                  Clarté, fiabilité, utilité réelle : ce sont mes priorités.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-8 pt-8 border-t border-gray-200"
              >
                <p className="text-gray-600 italic">
                  — Johnny Fleury, Fondateur JETC Solution
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
