'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Écoute & Découverte',
    description: 'Je prends le temps de comprendre votre activité, vos défis quotidiens et vos objectifs de croissance.',
    icon: '🎧',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    number: '02',
    title: 'Immersion Métier',
    description: "Je m'imprègne de votre secteur pour identifier les vrais leviers d'efficacité et les points de friction.",
    icon: '🔍',
    color: 'from-purple-500 to-pink-500',
  },
  {
    number: '03',
    title: 'Co-construction',
    description: 'Nous élaborons ensemble une solution sur mesure, testée et affinée en continu avec vos retours.',
    icon: '⚡',
    color: 'from-orange-500 to-red-500',
  },
  {
    number: '04',
    title: 'Déploiement & Suivi',
    description: "Mise en production progressive, formation et accompagnement pour garantir l'adoption et les résultats.",
    icon: '🚀',
    color: 'from-green-500 to-emerald-500',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function WorkProcess() {
  return (
    <section id="process" className="section-padding bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Comment je travaille
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une méthode structurée en 4 étapes pour transformer votre vision en résultats concrets
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -12, transition: { duration: 0.3 } }}
              className="relative"
            >
              {/* Ligne de connexion (desktop uniquement) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-primary-300 to-transparent -z-10" />
              )}

              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-gray-100">
                {/* Badge numéro avec gradient */}
                <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${step.color} text-white font-bold text-sm mb-4`}>
                  {step.number}
                </div>

                {/* Icône */}
                <div className="text-6xl mb-4">
                  {step.icon}
                </div>

                {/* Titre */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Message de clôture */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Cette démarche garantit que chaque solution est <strong>parfaitement alignée</strong> avec 
            vos besoins réels et capable de <strong>générer un impact mesurable</strong> sur votre activité.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
