'use client';

import { motion } from 'framer-motion';

const pricingExamples = [
  {
    icon: '🌐',
    title: 'Création de site vitrine / site professionnel',
    items: [
      'Site clair et moderne',
      'Présentation de l\'activité',
      'Formulaire de contact fonctionnel',
      'Mise en ligne et configuration de base',
    ],
    price: 'En général entre 400 € et 600 €',
    subPrice: 'selon le contenu et les besoins',
    note: 'Il s\'agit d\'exemples indicatifs. Le périmètre est toujours défini ensemble.',
  },
  {
    icon: '⚙️',
    title: 'Évolutions, ajustements et entretien',
    items: [
      'Corrections',
      'Ajustements visuels',
      'Petites évolutions',
      'Maintenance légère',
    ],
    description: 'Pas d\'obligation. Possible sous forme d\'entretien mensuel léger si le client le souhaite.',
    price: 'À partir de quelques dizaines d\'euros par mois',
    subPrice: 'selon le site et les besoins réels',
  },
  {
    icon: '⚡',
    title: 'Outils sur mesure & automatisation',
    items: [
      'Automatisation Excel / logique métier',
      'Outils adaptés au terrain',
      'Pas de logiciel inutile',
    ],
    description: 'La rémunération dépend du temps gagné, de la simplification apportée et de l\'impact réel sur le quotidien.',
    price: 'Projet ponctuel, discuté au cas par cas',
  },
];

const notIncluded = [
  "Pas de taux horaire imposé",
  "Pas d'abonnement forcé",
  "Pas de logiciel inutile",
  "Pas de solution miracle",
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
            Une rémunération simple, adaptée à vos besoins
          </h2>
          <div className="max-w-3xl mx-auto space-y-4 text-lg text-gray-600">
            <p>
              JETC ne vend pas des heures, ni des solutions standardisées.
            </p>
            <p>
              Chaque projet est construit pour répondre à un besoin concret.
            </p>
            <p>
              La rémunération s'adapte donc au projet, à sa complexité et à son impact réel.
            </p>
            <p className="font-medium text-gray-700">
              Pour être transparent, voici quelques exemples indicatifs.
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

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="text-lg font-bold text-primary-600">
                  💰 {example.price}
                </div>
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
            <p className="text-xl text-gray-800 leading-relaxed">
              Le but n'est pas de facturer plus, mais de proposer une solution juste, utile et durable.
            </p>
            <p className="text-lg text-gray-700 mt-4">
              Si une solution simple suffit, elle sera privilégiée.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
