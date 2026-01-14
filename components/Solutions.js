'use client';

import { motion } from 'framer-motion';

const solutions = [
  {
    title: 'Écoute Active',
    description: 'Nous prenons le temps de comprendre votre activité, vos défis et vos objectifs pour construire une solution qui vous ressemble.',
    icon: '👂',
  },
  {
    title: 'Accompagnement Personnalisé',
    description: 'Un suivi sur mesure tout au long du projet, avec des solutions adaptées à votre réalité métier et vos ambitions.',
    icon: '🤝',
  },
  {
    title: 'Immersion Métier',
    description: 'Nous nous imprégnons de votre secteur d&apos;activité pour concevoir des outils digitaux réellement utiles et efficaces.',
    icon: '🎯',
  },
  {
    title: 'Impact Business',
    description: 'Notre priorité : créer de la valeur concrète et générer du chiffre d&apos;affaires pour votre entreprise.',
    icon: '📈',
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Solutions() {
  return (
    <section id="solutions" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Notre Approche
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nous construisons avec vous des solutions digitales sur mesure, adaptées à votre activité et orientées résultats
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="text-5xl mb-4">{solution.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {solution.title}
              </h3>
              <p className="text-gray-600">
                {solution.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
