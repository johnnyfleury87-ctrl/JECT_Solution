'use client';

import { motion } from 'framer-motion';

const pricingExamples = [
  {
    icon: '🌐',
    title: 'Création de solution digitale',
    items: [
      'Présentation claire de l\'activité',
      'Outil simple et fonctionnel',
      'Mise en place rapide',
      'Solution installée et utilisable immédiatement',
    ],
  },
  {
    icon: '⚙️',
    title: 'Évolution et accompagnement dans le temps',
    items: [
      'Ajustements selon l\'usage réel',
      'Améliorations progressives',
      'Corrections si besoin',
      'Suivi léger, sans obligation',
    ],
    description: 'La rémunération peut prendre la forme d\'un entretien mensuel simple, uniquement si cela apporte une vraie valeur.',
    price: 'Contribution mensuelle légère',
    subPrice: 'adaptée au besoin réel',
  },
  {
    icon: '⚡',
    title: 'Solution métier sur mesure',
    items: [
      'Réponse à un besoin précis',
      'Adaptée à la réalité du terrain',
      'Pensée pour simplifier le quotidien',
      'Pas de solution générique imposée',
    ],
    description: 'Approche "vous gagnez / je gagne" : gain de temps, meilleure visibilité, moins d\'erreurs, solution qui travaille à votre place.',
    price: 'Définie en fonction de la valeur créée',
    subPrice: 'du périmètre et de l\'impact réel',
  },
];

const notIncluded = [
  "Pas de vente d'outils inutiles",
  "Pas d'abonnement imposé",
  "Pas de dépendance forcée",
  "Pas de jargon technique",
  "Pas de promesses irréalistes",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
};

export default function Pricing() {
  return (
    <section id="pricing" className="section-padding bg-white">
      <div className="container-custom">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Une logique simple : vous gagnez, je gagne
          </h2>
          <div className="max-w-3xl mx-auto space-y-4 text-lg text-gray-600">
            <p>
              JETC fonctionne sur une approche simple et honnête.
            </p>
            <p>
              Chaque projet est différent, chaque besoin aussi.
            </p>
            <p>
              La rémunération est donc adaptée à la valeur réelle apportée, pas à un nombre d'heures ou à un outil imposé.
            </p>
          </div>
        </div>

        {/* Cartes de tarifs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 max-w-6xl mx-auto"
        >
          {pricingExamples.map((example, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">{example.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {example.title}
                </h3>
              </div>

              <ul className="space-y-2 mb-4">
                {example.items.map((item, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-start">
                    <svg className="w-4 h-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {example.description && (
                <p className="text-sm text-gray-600 mb-4 italic">
                  {example.description}
                </p>
              )}

              {(example.price || example.subPrice || example.note) && (
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  {example.price && (
                    <div className="text-lg font-bold text-primary-600">
                      💰 {example.price}
                    </div>
                  )}
                  {example.subPrice && (
                    <p className="text-xs text-gray-500">
                      {example.subPrice}
                    </p>
                  )}
                  {example.note && (
                    <p className="text-xs text-gray-500 italic mt-3 pt-3 border-t border-gray-100">
                      {example.note}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Ce que JETC ne fait pas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Ce que JETC ne fait pas
          </h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {notIncluded.map((item, index) => (
              <motion.div
                key={index}
                variants={listItemVariants}
                className="flex items-center bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <svg className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-700 font-medium">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Phrase de clôture */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="bg-primary-50 border-l-4 border-primary-600 rounded-lg p-8">
            <p className="text-xl text-gray-800 leading-relaxed mb-4">
              L'objectif n'est pas de vendre plus.
              <br />
              L'objectif est que la solution soit utile.
            </p>
            <p className="text-lg text-gray-700">
              Si vous gagnez du temps et de la clarté, alors la collaboration a du sens pour tout le monde.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
