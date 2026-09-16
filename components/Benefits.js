'use client';

import { motion } from 'framer-motion';

const benefits = [
  {
    title: 'Expérience terrain',
    description: 'Une compréhension directe des contraintes opérationnelles, des équipes et des flux.',
  },
  {
    title: 'Approche par les données',
    description: 'Des décisions appuyées par des mesures, des faits et des indicateurs compréhensibles.',
  },
  {
    title: 'Vision transversale',
    description: 'Une lecture combinant logistique, qualité, ressources humaines, achats et coûts.',
  },
  {
    title: 'Simulation avant investissement',
    description: "Plusieurs scénarios comparés avant d'engager une transformation ou une dépense importante.",
  },
  {
    title: 'Résultats mesurables',
    description: "Un état initial, des objectifs définis et une mesure concrète de l'évolution.",
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
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
};

export default function Benefits() {
  return (
    <section id="benefits" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Pourquoi nous choisir ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une approche terrain, appuyée sur les données, pour des décisions opérationnelles mesurables.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white p-8 rounded-lg shadow-md border-l-4 border-primary-600"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-lg">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
