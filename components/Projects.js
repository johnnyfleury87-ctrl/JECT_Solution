'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import ProjectModal from './ProjectModal';

const projects = [
  {
    id: 'prodorga',
    name: 'ProdOrga',
    status: 'En production',
    statusColor: 'bg-green-100 text-green-800 border-green-200',
    emoji: '🏭',
    gradient: 'from-green-400 to-emerald-500',
    description: "Outil de gestion et d'organisation de la production pour les PME. Permet de suivre en temps réel l'avancement des tâches, d'optimiser les flux et de réduire les temps morts.",
    descriptionShort: "Pilotez votre production en temps réel. ProdOrga calcule automatiquement charges et capacités, détecte les surcharges et vous montre immédiatement ce qui est faisable ou non.",
    impact: [
      "Réduction de 30% du temps de planification",
      "Visibilité temps réel sur l'activité",
      "Données horaires 100% fiables",
    ],
    kpis: [
      { label: 'Données horaires', value: '100% fiables', note: 'issues du timbrage' },
      { label: 'Temps de planification', value: '-30%', note: 'vs Excel manuel' },
      { label: 'Visibilité', value: 'Temps réel', note: 'capacité / charge' }
    ],
    features: [
      { icon: '⚡', title: 'Charge vs capacité', description: 'Calcul automatique par poste' },
      { icon: '🚨', title: 'Alertes immédiates', description: 'Surcharges détectées en temps réel' },
      { icon: '📊', title: 'Tableaux de bord', description: 'Adaptés au rythme de production' },
      { icon: '📱', title: 'Accès terrain', description: "Mobile pour chefs d'atelier" },
      { icon: '📥', title: 'Démarrage rapide', description: 'Import de vos fichiers Excel' }
    ],
    screenshots: [
      { id: 1, title: 'Planning 28 jours', description: 'Vue complète charge/capacité' },
      { id: 2, title: 'Fiche collaborateur', description: 'Suivi individuel détaillé' },
      { id: 3, title: 'Dashboard temps réel', description: 'Pilotage de la production' }
    ],
    link: {
      label: 'Découvrir le fonctionnement',
      href: '#contact',
      type: 'contact'
    }
  },
  {
    id: 'jetc-immo',
    name: 'JETC Immo',
    status: 'En cours de développement',
    statusColor: 'bg-blue-100 text-blue-800 border-blue-200',
    emoji: '🏢',
    gradient: 'from-blue-400 to-cyan-500',
    description: 'Plateforme de gestion immobilière simplifiée. Centralise la gestion locative, le suivi des biens, les documents et la communication avec les locataires.',
    descriptionShort: "Pour les propriétaires bailleurs qui en ont marre de jongler entre 10 fichiers Excel. Tout au même endroit : baux, quittances, charges, travaux, et vue d'ensemble financière.",
    impact: [
      'Centralisation des documents et contrats',
      'Automatisation des relances et rappels',
      'Gain de temps administratif estimé : 60%',
    ],
    kpis: [
      { label: 'Modules actifs', value: '6/10', note: 'en développement continu' },
      { label: 'Multi-devises', value: '✓', note: 'EUR, USD, CHF' },
      { label: 'Gain de temps', value: '~60%', note: 'vs gestion manuelle' }
    ],
    points: [
      'Génération automatique des quittances de loyer',
      'Suivi des charges locatives et régularisations',
      'Alertes sur échéances (révisions loyers, fins de bail)',
      'Gestion multi-biens et multi-devises',
      'Export comptable pour votre expert-comptable',
      'Module travaux et suivi budgétaire'
    ],
    link: {
      label: 'Découvrir JETC Immo',
      href: 'https://jetc-immo-saa-s.vercel.app/'
    }
  },
  {
    id: 'tracabilite',
    name: 'Traçabilité & Spotting Produits',
    status: 'Prototype',
    statusColor: 'bg-amber-100 text-amber-800 border-amber-200',
    emoji: '📦',
    gradient: 'from-amber-400 to-orange-500',
    description: 'Système de traçabilité pour suivre les produits tout au long de la chaîne logistique. QR codes, géolocalisation et historique complet pour garantir authenticité et conformité.',
    descriptionShort: "Projet en phase d'expérimentation pour démontrer la valeur de la traçabilité produit. Ce prototype illustre comment un système peut enregistrer automatiquement les lots, dates et contrôles QHSE, et générer les documents pour vos audits. Les fonctionnalités présentées sont indicatives et évolutives.",
    impact: [
      "Transparence totale de la chaîne d'approvisionnement",
      "Lutte contre la contrefaçon",
      "Conformité réglementaire facilitée",
    ],
    kpis: [
      { label: 'Traçabilité', value: '100%', note: 'lot → produit fini (démo)' },
      { label: 'Délais réduits', value: '-40%', note: 'estimation en cas de rappel' },
      { label: 'Conformité', value: 'Simulée', note: 'audits réglementaires' }
    ],
    points: [
      'Enregistrement automatique à chaque étape de production (prototype)',
      'Suivi des numéros de lots matières premières',
      'Traçabilité ascendante et descendante',
      'Export des données pour audits (FDA, ISO, etc.)',
      'Alertes sur anomalies de production (fonctionnalité démonstrée)',
      'Interface simple pour opérateurs terrains'
    ],
    link: {
      label: 'Voir le prototype QHSE',
      href: 'https://product-simulation-one.vercel.app/qhse'
    }
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
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -12, scale: 1.02, transition: { duration: 0.3 } }}
              onClick={() => handleProjectClick(project)}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
            >
              {/* Header avec gradient et emoji */}
              <div className={`bg-gradient-to-br ${project.gradient} p-8 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 text-9xl opacity-10 transform translate-x-4 -translate-y-4">
                  {project.emoji}
                </div>
                <div className="relative z-10">
                  <div className="text-5xl mb-4">{project.emoji}</div>
                  <h3 className="text-2xl font-bold mb-2">
                    {project.name}
                  </h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${project.statusColor} bg-white`}>
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Contenu */}
              <div className="p-6">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    Impact mesuré / attendu
                  </h4>
                  <ul className="space-y-2">
                    {project.impact.map((item, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <svg
                          className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0"
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

                {/* Indicateur clic */}
                <div className="mt-6 flex items-center gap-2 text-sm text-gray-500 group-hover:text-primary-600 transition-colors">
                  <span>Cliquez pour voir les détails</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
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

      {/* Modal */}
      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={closeModal}
      />
    </section>
  );
}
