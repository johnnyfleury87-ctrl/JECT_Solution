'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const visionItems = [
  {
    title: 'Écoute Active',
    description: 'Nous prenons le temps de comprendre votre activité, vos défis quotidiens et vos objectifs avant de proposer quoi que ce soit.',
    icon: '👂',
    impact: 'On commence par comprendre, pas par coder.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Accompagnement Personnalisé',
    description: 'Un suivi sur mesure tout au long du projet, adapté à votre rythme et vos contraintes opérationnelles.',
    icon: '🤝',
    impact: "Vous n'êtes jamais seul face à l'outil.",
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Immersion Métier',
    description: 'Nous nous imprégnons de votre secteur pour concevoir des solutions qui parlent votre langue et répondent aux vrais problèmes.',
    icon: '🎯',
    impact: "Des outils pensés par quelqu'un qui connaît votre réalité.",
    color: 'from-orange-500 to-red-500',
  },
  {
    title: 'Impact Business',
    description: "Notre seule boussole : est-ce que ça crée de la valeur mesurable et génère du chiffre d'affaires pour vous ?",
    icon: '📈',
    impact: 'Pas de gadget. Juste de la performance.',
    color: 'from-green-500 to-emerald-500',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Solutions() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [expandedMobile, setExpandedMobile] = useState(null);

  return (
    <section id="solutions" className="section-padding bg-white">
      <div className="container-custom">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Notre Vision
          </h2>
          <div className="max-w-4xl mx-auto space-y-4 text-lg md:text-xl text-gray-700 leading-relaxed">
            <p>
              Les solutions <span className="font-semibold text-gray-900">"standards"</span> sont 
              souvent lourdes, coûteuses et rigides.
            </p>
            <p>
              Excel est puissant, mais sans maîtrise, il devient{' '}
              <span className="text-orange-600 font-semibold">fragile</span> : 
              couleurs, formules cassées, erreurs cachées, maintenance impossible.
            </p>
            <p className="text-xl md:text-2xl font-semibold text-primary-700 pt-4">
              Résultat : beaucoup de ressources consommées pour peu de valeur créée.
            </p>
            <div className="h-1 w-24 bg-primary-600 mx-auto rounded-full mt-8"></div>
            <p className="text-base md:text-lg text-gray-600 italic pt-6">
              Notre vision : <strong>simplifier, structurer, automatiser</strong> avec du sur-mesure 
              utile et mesurable.
            </p>
          </div>
        </motion.div>

        {/* Cartes interactives */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {visionItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setExpandedMobile(expandedMobile === index ? null : index)}
              className="relative group cursor-pointer"
            >
              {/* Carte */}
              <motion.div
                className={`bg-white rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                  hoveredIndex === index || expandedMobile === index
                    ? 'border-primary-500 shadow-2xl'
                    : 'border-gray-200 shadow-lg'
                }`}
                whileHover={{ y: -12 }}
                transition={{ duration: 0.3 }}
              >
                {/* Header toujours visible */}
                <div className="p-8">
                  {/* Icône avec gradient background */}
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${item.color} mb-6 shadow-lg`}>
                    <span className="text-4xl">{item.icon}</span>
                  </div>
                  
                  {/* Titre */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  
                  {/* Indicateur hover (desktop) */}
                  <div className="hidden md:block">
                    {hoveredIndex !== index && (
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-gray-400 italic"
                      >
                        Survolez pour en savoir plus →
                      </motion.p>
                    )}
                  </div>

                  {/* Indicateur tap (mobile) */}
                  <div className="md:hidden">
                    {expandedMobile !== index && (
                      <p className="text-sm text-gray-400 italic">
                        Touchez pour développer →
                      </p>
                    )}
                  </div>
                </div>

                {/* Contenu déployable (Desktop : hover, Mobile : tap) */}
                <AnimatePresence>
                  {(hoveredIndex === index || expandedMobile === index) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="px-8 pb-8"
                    >
                      {/* Description */}
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {item.description}
                      </p>
                      
                      {/* Impact */}
                      <div className={`bg-gradient-to-r ${item.color} bg-opacity-10 border-l-4 border-current pl-4 py-3 rounded-r`}>
                        <p className="text-sm font-semibold text-gray-900 italic">
                          "{item.impact}"
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Message de clôture */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-600 max-w-3xl mx-auto italic">
            Cette vision guide chaque projet. Chaque solution est conçue spécifiquement pour produire des résultats mesurables,
            au service de <strong>vos performances réelles</strong>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
