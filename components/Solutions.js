'use client';

import { motion } from 'framer-motion';

const solutions = [
  {
    title: 'Développement Web',
    description: 'Sites web et applications modernes, rapides et responsive, développés avec les dernières technologies.',
    icon: '🌐',
  },
  {
    title: 'Solutions E-commerce',
    description: 'Boutiques en ligne performantes et sécurisées pour développer votre activité commerciale.',
    icon: '🛒',
  },
  {
    title: 'Applications Sur Mesure',
    description: 'Applications web personnalisées adaptées à vos processus métier et besoins spécifiques.',
    icon: '⚙️',
  },
  {
    title: 'Consulting Digital',
    description: 'Accompagnement stratégique pour optimiser votre présence en ligne et votre performance digitale.',
    icon: '💡',
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
            Nos Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des solutions digitales complètes pour répondre à tous vos besoins
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
