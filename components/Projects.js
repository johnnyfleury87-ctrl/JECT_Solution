'use client';

import { motion } from 'framer-motion';

const projects = [
  {
    name: 'ProdOrga',
    status: 'En production',
    statusColor: 'bg-green-100 text-green-800 border-green-200',
    description: 'Outil de gestion et d&apos;organisation de la production pour les PME. Permet de suivre en temps réel l&apos;avancement des tâches, d&apos;optimiser les flux et de réduire les temps morts.',
    impact: [
      'Réduction de 30% du temps de planification',
      'Diminution de 45% des erreurs de suivi',
      'Visibilité temps réel sur l&apos;activité',
    ],
  },
  {
    name: 'JETC Immo',
    status: 'En cours de développement',
    statusColor: 'bg-blue-100 text-blue-800 border-blue-200',
    description: 'Plateforme de gestion immobilière simplifiée. Centralise la gestion locative, le suivi des biens, les documents et la communication avec les locataires.',
    impact: [
      'Centralisation des documents et contrats',
      'Automatisation des relances et rappels',
      'Gain de temps administratif estimé : 60%',
    ],
  },
  {
    name: 'Traçabilité & Spotting Produits',
    status: 'Recherche de partenaires',
    statusColor: 'bg-amber-100 text-amber-800 border-amber-200',
    description: 'Système de traçabilité pour suivre les produits tout au long de la chaîne logistique. QR codes, géolocalisation et historique complet pour garantir authenticité et conformité.',
    impact: [
      'Transparence totale de la chaîne d&apos;approvisionnement',
      'Lutte contre la contrefaçon',
      'Conformité réglementaire facilitée',
    ],
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

export default function Projects() {
  return (
    <section id="projects" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Travaux & Projets en Cours
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transparence totale sur nos projets actuels et leurs impacts mesurables
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8 max-w-5xl mx-auto"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 md:mb-0">
                  {project.name}
                </h3>
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold border ${project.statusColor}`}>
                  {project.status}
                </span>
              </div>

              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                {project.description}
              </p>

              <div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  Impact mesuré / attendu
                </h4>
                <ul className="space-y-2">
                  {project.impact.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 italic">
            Ces projets reflètent notre engagement envers la transparence et la création de valeur mesurable.
            <br />
            Chaque solution est pensée pour résoudre un problème réel et générer un impact concret.
          </p>
        </div>
      </div>
    </section>
  );
}
