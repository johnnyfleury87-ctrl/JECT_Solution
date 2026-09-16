'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Fragment, useState } from 'react';

/** Ligne de balayage traversant une représentation de flux (barres). */
function AnalyzeIcon({ active, reduceMotion }) {
  return (
    <svg viewBox="0 0 64 64" className="h-9 w-9" aria-hidden="true">
      <rect x="9" y="36" width="7" height="18" rx="1.5" className="fill-primary-200" />
      <rect x="20" y="26" width="7" height="28" rx="1.5" className="fill-primary-300" />
      <rect x="31" y="16" width="7" height="38" rx="1.5" className="fill-primary-400" />
      <rect x="42" y="30" width="7" height="24" rx="1.5" className="fill-primary-300" />
      {reduceMotion ? (
        <line x1="54" y1="10" x2="54" y2="56" className="stroke-primary-600" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
      ) : (
        <motion.line
          key={active ? 'sweep-active' : 'sweep-idle'}
          y1="10"
          y2="56"
          className="stroke-primary-600"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ x1: 6, x2: 6, opacity: 0.9 }}
          animate={{ x1: [6, 54], x2: [6, 54], opacity: [0.9, 0.9, 0] }}
          transition={{ duration: active ? 0.7 : 1.4, ease: 'easeInOut', delay: active ? 0 : 0.6 }}
        />
      )}
    </svg>
  );
}

/** Points dispersés qui se relient en une organisation claire. */
function StructureIcon({ active, reduceMotion }) {
  const scattered = [
    { x: 11, y: 15 },
    { x: 42, y: 11 },
    { x: 17, y: 41 },
    { x: 47, y: 35 },
  ];
  const aligned = [
    { x: 12, y: 32 },
    { x: 26, y: 32 },
    { x: 40, y: 32 },
    { x: 54, y: 32 },
  ];

  return (
    <svg viewBox="0 0 64 64" className="h-9 w-9" aria-hidden="true">
      <line x1="10" y1="32" x2="54" y2="32" className="stroke-primary-200" strokeWidth="2" strokeDasharray="3 3" />
      {aligned.map((point, i) =>
        reduceMotion ? (
          <circle key={i} cx={point.x} cy={point.y} r="4.5" className="fill-primary-500" />
        ) : (
          <motion.circle
            key={active ? `dot-active-${i}` : `dot-idle-${i}`}
            r="4.5"
            className="fill-primary-500"
            initial={{ cx: scattered[i].x, cy: scattered[i].y }}
            animate={{ cx: point.x, cy: point.y }}
            transition={{
              duration: active ? 0.5 : 0.9,
              delay: active ? i * 0.05 : 0.4 + i * 0.12,
              ease: 'easeInOut',
            }}
          />
        )
      )}
    </svg>
  );
}

/** Trajectoires convergeant progressivement vers une direction sélectionnée. */
function OptimizeIcon({ active, reduceMotion }) {
  const starts = [
    { x: 8, y: 14 },
    { x: 8, y: 32 },
    { x: 8, y: 50 },
  ];
  const end = { x: 52, y: 32 };

  return (
    <svg viewBox="0 0 64 64" className="h-9 w-9" aria-hidden="true">
      <circle cx={end.x} cy={end.y} r="5" className="fill-primary-600" />
      {starts.map((point, i) =>
        reduceMotion ? (
          <line
            key={i}
            x1={point.x}
            y1={point.y}
            x2={end.x}
            y2={end.y}
            className="stroke-primary-400"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.8"
          />
        ) : (
          <motion.line
            key={active ? `path-active-${i}` : `path-idle-${i}`}
            x1={point.x}
            y1={point.y}
            className="stroke-primary-400"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ x2: point.x, y2: point.y, opacity: 0.35 }}
            animate={{ x2: end.x, y2: end.y, opacity: [0.35, 0.85] }}
            transition={{
              duration: active ? 0.5 : 0.9,
              delay: active ? i * 0.05 : 0.4 + i * 0.1,
              ease: 'easeInOut',
            }}
          />
        )
      )}
    </svg>
  );
}

const steps = [
  {
    number: '01',
    title: 'Analyser',
    description:
      'Observer les flux, écouter les équipes et étudier les temps, les capacités ainsi que les points de friction rencontrés dans le fonctionnement quotidien.',
    Icon: AnalyzeIcon,
  },
  {
    number: '02',
    title: 'Structurer',
    description:
      'Relier les données, les contraintes et les priorités afin de rendre visibles les interactions, les coûts cachés et les leviers d’amélioration.',
    Icon: StructureIcon,
  },
  {
    number: '03',
    title: 'Optimiser',
    description:
      'Comparer les scénarios, construire les améliorations avec les équipes et accompagner leur mise en œuvre de manière progressive.',
    Icon: OptimizeIcon,
  },
];

const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const timelineVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.25, delayChildren: 0.15 } },
};

const stepVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const verticalLineVariants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 0.8, ease: 'easeInOut' } },
};

const horizontalLineVariants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.8, ease: 'easeInOut' } },
};

const closingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function WorkProcess() {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(null);
  const [pulseKeys, setPulseKeys] = useState(() => steps.map(() => 0));

  const activate = (index) => {
    setActiveIndex(index);
    setPulseKeys((prev) => prev.map((value, i) => (i === index ? value + 1 : value)));
  };
  const deactivate = () => setActiveIndex(null);

  return (
    <section id="process" className="section-padding bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <motion.div
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Analyser<span className="text-primary-600">.</span> Structurer
            <span className="text-primary-600">.</span> Optimiser<span className="text-primary-600">.</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une démarche progressive pour comprendre votre fonctionnement, rendre les
            informations exploitables et concentrer les efforts sur les améliorations les
            plus utiles.
          </p>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={timelineVariants}
          className="flex flex-col md:flex-row md:items-start"
        >
          {steps.map((step, index) => (
            <Fragment key={step.title}>
              <motion.div
                variants={stepVariants}
                className={`flex-1 flex flex-col items-center text-center px-4 py-6 rounded-2xl transition-colors duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-200 ${
                  activeIndex === index ? 'bg-primary-50' : 'bg-transparent'
                }`}
                role="group"
                aria-label={`Étape ${step.number} : ${step.title}`}
                tabIndex={0}
                onMouseEnter={() => activate(index)}
                onMouseLeave={deactivate}
                onFocus={() => activate(index)}
                onBlur={deactivate}
                onClick={() => activate(index)}
              >
                <div
                  className={`flex items-center justify-center w-16 h-16 rounded-full border-2 bg-white mb-4 transition-colors duration-300 ${
                    activeIndex === index ? 'border-primary-600' : 'border-primary-200'
                  }`}
                >
                  <step.Icon
                    key={pulseKeys[index]}
                    active={activeIndex === index}
                    reduceMotion={shouldReduceMotion}
                  />
                </div>
                <span className="text-sm font-semibold text-primary-600 mb-1">{step.number}</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed max-w-xs">{step.description}</p>
              </motion.div>

              {index < steps.length - 1 && (
                <div className="flex items-center justify-center w-full md:w-auto md:flex-1 py-1 md:py-8" aria-hidden="true">
                  <div className="md:hidden w-0.5 h-10 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div variants={verticalLineVariants} className="w-full h-full bg-primary-600 origin-top" />
                  </div>
                  <div className="hidden md:block w-full h-0.5 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div variants={horizontalLineVariants} className="w-full h-full bg-primary-600 origin-left" />
                  </div>
                </div>
              )}
            </Fragment>
          ))}
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
          variants={closingVariants}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Chaque étape s’appuie sur votre environnement, vos outils et l’expertise de vos
            équipes.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
