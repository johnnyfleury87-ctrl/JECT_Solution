'use client';

import { motion } from 'framer-motion';

const pricingExamples = [
  {
    icon: '🌐',
    title: 'Site vitrine / site professionnel',
    items: [
      'Site vitrine 3–5 pages',
      'Formulaire de contact',
      'Mise en ligne + configuration de base',
    ],
    time: '3 à 10 jours',
    price: '1 200 € – 2 500 €',
    note: 'exemple indicatif',
  },
  {
    icon: '⚙️',
    title: 'Évolutions & mises à jour',
    items: [
      'Ajout de pages',
      'Ajustements design',
      'Corrections / optimisations',
    ],
    time: 'Intervention ponctuelle',
    price: '60 € – 90 € / heure',
    note: 'selon complexité',
  },
  {
    icon: '⚡',
    title: 'Outil métier sur mesure',
    items: [
      'Automatisation Excel / VBA',
      'Tableaux de pilotage',
      'Outils logistique, RH, qualité, production',
    ],
    time: 'Variable selon besoin',
    price: '800 € – 3 000 €',
    note: 'exemple indicatif',
  },
  {
    icon: '🚀',
    title: 'SaaS / plateforme métier',
    items: [
      'Prototype / démo',
      'Développement progressif',
      'Maintenance & évolutions',
    ],
    time: 'Projet structurant',
    price: 'Modèle discuté au cas par cas',
    note: 'périmètre défini ensemble',
  },
];

const notIncluded = [
  "Pas d'abonnements imposés",
  "Pas de promesses irréalistes",
  "Pas de fonctionnalités inutiles",
  "Pas de formations interminables",
  "Pas d'outils qui ne servent pas le terrain",
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
            Une rémunération claire, sans surprise
          </h2>
          <div className="max-w-3xl mx-auto space-y-4 text-lg text-gray-600">
            <p>
              JETC ne fonctionne pas avec des abonnements imposés ou des grilles tarifaires floues.
            </p>
            <p>
              Chaque projet est différent. La rémunération dépend du besoin réel, du temps nécessaire et de la valeur apportée.
            </p>
            <p className="font-medium text-gray-700">
              Pour être transparent, voici quelques exemples concrets.
            </p>
          </div>
        </div>

        {/* Cartes de tarifs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
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

              <ul className="space-y-2 mb-6">
                {example.items.map((item, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-start">
                    <svg className="w-4 h-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{example.time}</span>
                </div>
                <div className="text-lg font-bold text-primary-600">
                  {example.price}
                </div>
                <p className="text-xs text-gray-500 italic">
                  {example.note}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Hébergement & technique */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gray-50 rounded-xl p-8 mb-12 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
            Hébergement & technique
          </h3>
          <p className="text-lg text-gray-700 text-center leading-relaxed">
            L'hébergement, le nom de domaine et les services techniques peuvent être :<br />
            <span className="font-medium">– gérés par le client</span><br />
            <span className="font-medium">– ou mis en place avec accompagnement</span>
          </p>
          <p className="text-center text-gray-600 mt-4 font-medium">
            Aucun verrou technique. Aucune dépendance imposée.
          </p>
        </motion.div>

        {/* Ce que JETC ne facture pas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Ce que JETC ne facture pas
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
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="bg-primary-50 border-l-4 border-primary-600 rounded-lg p-8">
            <p className="text-xl text-gray-800 leading-relaxed">
              L'objectif n'est pas de vendre plus.<br />
              <span className="font-semibold text-primary-700">
                L'objectif est de faire juste, avec des solutions utiles, durables et adaptées à la réalité du terrain.
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
