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
                {/* TODO: Remplacer par votre vraie photo */}
                {/* <Image src="/images/photo-profile.jpg" alt="Johnny Fleury" fill className="object-cover" /> */}
                <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-4">👨‍💻</div>
                    <p className="text-sm text-gray-600">Photo à venir</p>
                  </div>
                </div>
              </div>
              
              {/* Logo en incrustation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border-4 border-primary-600"
              >
                {/* TODO: Remplacer par votre vrai logo */}
                <div className="text-4xl font-bold text-primary-600">
                  JETC
                </div>
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
                Une démarche centrée sur <span className="text-primary-600">vos résultats</span>
              </h2>
              
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  Je ne vends pas de solutions toutes faites. Je construis avec vous des outils digitaux 
                  qui correspondent réellement à votre activité et vos ambitions.
                </p>
                
                <p>
                  Chaque projet commence par <strong>l&apos;écoute</strong>, se poursuit par 
                  <strong> l&apos;immersion dans votre métier</strong>, et aboutit à des solutions 
                  qui <strong>génèrent de la valeur mesurable</strong>.
                </p>
                
                <p className="text-primary-700 font-semibold italic">
                  Transparence, traçabilité et performance : ce sont les piliers de mon approche.
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
