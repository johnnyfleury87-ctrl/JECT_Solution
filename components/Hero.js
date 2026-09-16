'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Sources analysées (flux, temps, ressources, outils) convergeant vers une zone d'analyse
// centrale, d'où émergent ensuite plusieurs pistes de scénarios. Illustration abstraite,
// aucun chiffre ni résultat représenté.
const FLOW_SOURCES = [
  { key: 'flux', label: 'Flux', y: 46 },
  { key: 'temps', label: 'Temps', y: 116 },
  { key: 'ressources', label: 'Ressources', y: 186 },
  { key: 'outils', label: 'Outils', y: 256 },
];
const CENTER = { x: 205, y: 151 };
const SCENARIO_PATHS = [
  `M ${CENTER.x + 26} ${CENTER.y - 8} C 265 ${CENTER.y - 55}, 305 ${CENTER.y - 65}, 345 ${CENTER.y - 82}`,
  `M ${CENTER.x + 30} ${CENTER.y} C 270 ${CENTER.y}, 305 ${CENTER.y}, 345 ${CENTER.y}`,
  `M ${CENTER.x + 26} ${CENTER.y + 8} C 265 ${CENTER.y + 55}, 305 ${CENTER.y + 65}, 345 ${CENTER.y + 82}`,
];

const lineVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => ({
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.7, delay: 0.15 * i, ease: 'easeInOut' },
  }),
};

const nodeVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, delay: 0.15 * i + 0.25, ease: 'easeOut' },
  }),
};

const centerVariants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.9, ease: 'easeOut' } },
};

const scenarioVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => ({
    pathLength: 1,
    opacity: 0.85,
    transition: { duration: 0.6, delay: 1.3 + i * 0.18, ease: 'easeInOut' },
  }),
};

const underlineVariants = {
  hidden: { pathLength: 0 },
  visible: { pathLength: 1, transition: { duration: 0.8, delay: 0.6, ease: 'easeInOut' } },
};

/** Illustration abstraite : convergence de flux/temps/ressources/outils vers une analyse
 *  centrale, puis divergence vers plusieurs pistes de scénarios. Aucune donnée réelle. */
function OperationalAnalysisIllustration({ reduceMotion }) {
  if (reduceMotion) {
    return (
      <svg
        viewBox="0 0 360 302"
        className="w-full h-auto"
        role="img"
        aria-label="Illustration d'une analyse opérationnelle : les flux, le temps, les ressources et les outils convergent vers une zone d'analyse centrale, d'où émergent plusieurs pistes de scénarios."
      >
        {FLOW_SOURCES.map((s) => (
          <path
            key={s.key}
            d={`M 60 ${s.y} C 120 ${s.y}, 140 ${CENTER.y}, ${CENTER.x - 24} ${CENTER.y}`}
            fill="none"
            className="stroke-primary-300"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}
        {FLOW_SOURCES.map((s) => (
          <g key={`${s.key}-node`}>
            <circle cx="46" cy={s.y} r="10" className="fill-primary-500" />
            <text x="46" y={s.y + 26} textAnchor="middle" className="fill-gray-600 text-[11px] font-medium">
              {s.label}
            </text>
          </g>
        ))}
        <circle cx={CENTER.x} cy={CENTER.y} r="30" className="fill-white stroke-primary-600" strokeWidth="2.5" />
        <text x={CENTER.x} y={CENTER.y + 5} textAnchor="middle" className="fill-primary-700 text-[11px] font-semibold">
          Analyse
        </text>
        {SCENARIO_PATHS.map((d, i) => (
          <path key={i} d={d} fill="none" className="stroke-orange-400" strokeWidth="2" strokeDasharray="5 4" strokeLinecap="round" opacity="0.85" />
        ))}
      </svg>
    );
  }

  return (
    <motion.svg
      viewBox="0 0 360 302"
      className="w-full h-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      role="img"
      aria-label="Illustration d'une analyse opérationnelle : les flux, le temps, les ressources et les outils convergent vers une zone d'analyse centrale, d'où émergent plusieurs pistes de scénarios."
    >
      {FLOW_SOURCES.map((s, i) => (
        <motion.path
          key={s.key}
          custom={i}
          variants={lineVariants}
          d={`M 60 ${s.y} C 120 ${s.y}, 140 ${CENTER.y}, ${CENTER.x - 24} ${CENTER.y}`}
          fill="none"
          className="stroke-primary-300"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}
      {FLOW_SOURCES.map((s, i) => (
        <motion.g key={`${s.key}-node`} custom={i} variants={nodeVariants}>
          <circle cx="46" cy={s.y} r="10" className="fill-primary-500" />
          <text x="46" y={s.y + 26} textAnchor="middle" className="fill-gray-600 text-[11px] font-medium">
            {s.label}
          </text>
        </motion.g>
      ))}
      <motion.g variants={centerVariants}>
        <circle cx={CENTER.x} cy={CENTER.y} r="30" className="fill-white stroke-primary-600" strokeWidth="2.5" />
        <text x={CENTER.x} y={CENTER.y + 5} textAnchor="middle" className="fill-primary-700 text-[11px] font-semibold">
          Analyse
        </text>
      </motion.g>
      {SCENARIO_PATHS.map((d, i) => (
        <motion.path
          key={i}
          custom={i}
          variants={scenarioVariants}
          d={d}
          fill="none"
          className="stroke-orange-400"
          strokeWidth="2"
          strokeDasharray="5 4"
          strokeLinecap="round"
        />
      ))}
    </motion.svg>
  );
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="min-h-[85vh] flex items-center bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="container-custom py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Partie gauche : Texte */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.p 
                variants={itemVariants}
                className="text-primary-600 font-medium mb-3 text-sm uppercase tracking-wide"
              >
                ANALYSE OPÉRATIONNELLE • AUTOMATISATION • SIMULATION
              </motion.p>
              
              <motion.h1 
                variants={itemVariants}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
              >
                Rendez visibles vos{' '}
                <span className="text-orange-600 relative">
                  coûts cachés
                  <svg className="absolute -bottom-1 left-0 w-full" height="8" viewBox="0 0 100 8" preserveAspectRatio="none">
                    {shouldReduceMotion ? (
                      <path d="M0,7 Q25,3 50,5 T100,7" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
                    ) : (
                      <motion.path
                        d="M0,7 Q25,3 50,5 T100,7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        opacity="0.3"
                        initial="hidden"
                        animate="visible"
                        variants={underlineVariants}
                      />
                    )}
                  </svg>
                </span>
                . Testez vos décisions avant d’investir.
              </motion.h1>
              
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed mb-8">
                <motion.p variants={itemVariants}>
                  Nous analysons vos flux, vos temps, vos ressources et vos outils existants afin
                  d’identifier les pertes invisibles et de simuler différents scénarios
                  d’amélioration.
                </motion.p>
                
                <motion.p 
                  variants={itemVariants}
                  className="font-medium text-gray-900 bg-primary-50 border-l-4 border-primary-600 pl-4 py-3 rounded-r"
                >
                  Pas de solution générique ni de remplacement imposé : nous nous appuyons sur
                  votre environnement existant pour construire une démarche mesurable, adaptée à
                  la réalité du terrain.
                </motion.p>
              </div>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link 
                  href="/contact" 
                  className="btn-primary text-base inline-flex items-center justify-center group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Étudier un processus
                    <svg 
                      className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <span className="absolute inset-0 bg-primary-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </Link>
                
                <Link 
                  href="/#process" 
                  className="btn-secondary text-base inline-flex items-center justify-center group"
                >
                  Découvrir la méthode
                  <svg 
                    className="w-5 h-5 ml-2 group-hover:rotate-90 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>

            {/* Partie droite (dessous sur mobile/tablette) : illustration d'analyse opérationnelle */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-sm mx-auto lg:max-w-none"
            >
              <OperationalAnalysisIllustration reduceMotion={shouldReduceMotion} />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
