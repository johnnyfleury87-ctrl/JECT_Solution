'use client';

import { motion } from 'framer-motion';

const benefits = [
  {
    title: 'Performance',
    description: 'Sites ultra-rapides et optimisés pour le SEO, garantissant une excellente expérience utilisateur.',
  },
  {
    title: 'Modernité',
    description: 'Technologies de pointe et design contemporain pour une solution toujours à jour.',
  },
  {
    title: 'Accompagnement',
    description: 'Support et conseil personnalisés tout au long de votre projet et au-delà.',
  },
  {
    title: 'Scalabilité',
    description: 'Solutions évolutives qui grandissent avec votre entreprise et vos ambitions.',
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
            Des avantages concrets pour votre réussite digitale
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
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
