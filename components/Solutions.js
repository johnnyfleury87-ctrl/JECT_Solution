'use client';

import { motion } from 'framer-motion';

export default function Solutions() {
  return (
    <section id="solutions" className="section-padding bg-white">
      <div className="container-custom">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Notre Vision
          </h2>
          <div className="max-w-4xl mx-auto space-y-4 text-lg md:text-xl text-gray-700 leading-relaxed">
            <p>
              Chaque entreprise possède ses propres outils, ses méthodes et une expertise
              construite sur le terrain.
            </p>
            <p>
              Nous nous appuyons sur cet environnement pour comprendre les flux, structurer
              les données et identifier les améliorations réellement utiles.
            </p>
            <p className="text-xl md:text-2xl font-semibold text-primary-700 pt-4">
              Notre rôle : valoriser l’existant et concentrer les efforts là où ils
              produisent un impact concret.
            </p>
            <div className="h-1 w-24 bg-primary-600 mx-auto rounded-full mt-8"></div>
            <p className="text-base md:text-lg text-gray-600 italic pt-6">
              Une démarche adaptée à votre réalité pour simplifier, structurer et
              améliorer durablement vos opérations.
            </p>
          </div>
        </motion.div>

        {/* Message de clôture */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <blockquote className="max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-gray-800 font-medium italic">
              « Avant d’automatiser, il faut comprendre. Avant d’investir, il faut mesurer. »
            </p>
            <footer className="mt-3 text-sm text-gray-500 not-italic">
              — Johnny Fleury, fondateur de JETC Solution
            </footer>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
