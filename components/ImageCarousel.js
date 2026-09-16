'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

// ─── Configuration ────────────────────────────────────────────────────────────
// Chaque diapositive est qualifiée (titre, catégorie, statut) pour rester honnête
// sur le niveau d'avancement réel de chaque réalisation.
// Statuts possibles : "Prototype", "Pilote opérationnel", "Solution déployée",
// "Développement en cours".
const slides = [
  {
    src: '/image/image1.png',
    alt: 'Tableau de bord JETC OrgaPulse affichant le planning et la charge par zone',
    title: 'JETC OrgaPulse',
    category: 'Analyse & organisation des opérations',
    description: "Tableau de pilotage temps réel : planning, charge par zone et suivi d'équipe.",
    status: 'Pilote opérationnel',
  },
  {
    src: '/images/qhse-visual.svg',
    alt: 'Illustration graphique représentant le suivi qualité, hygiène, sécurité et environnement',
    title: 'Application QHSE',
    category: 'Qualité, hygiène, sécurité, environnement',
    description: 'Prototype de suivi des contrôles qualité et de la conformité réglementaire.',
    status: 'Prototype',
  },
  {
    src: '/image/image6.png',
    alt: "Simulation 3D d'une ligne de conditionnement avec convoyeur et palettes",
    title: 'Optimisation des achats indirects et du packaging',
    category: 'Achats indirects & packaging',
    description: 'Simulation 3D des flux de conditionnement pour comparer différentes configurations.',
    status: 'Prototype',
  },
  {
    src: '/image/image7.png',
    alt: "Vue 3D d'un scénario de simulation logistique avec convoyeur et zones de contrôle",
    title: 'Analyse et simulation opérationnelle',
    category: 'Analyse & simulation',
    description: 'Modélisation visuelle des flux logistiques pour tester des scénarios avant décision.',
    status: 'Prototype',
  },
  {
    src: '/images/tracabilite-bg.svg',
    alt: 'Illustration graphique représentant la traçabilité des produits le long de la chaîne logistique',
    title: 'Traçabilité des produits',
    category: 'Traçabilité & conformité',
    description: 'Illustration du principe de suivi des lots tout au long de la chaîne logistique.',
    status: 'Prototype',
  },
  {
    src: '/image/image4.png',
    alt: "Page d'accueil de la plateforme JETC Immo de gestion immobilière",
    title: 'JETC Immo',
    category: 'Gestion immobilière',
    description: 'Plateforme de gestion locative : baux, quittances, charges et suivi technique.',
    status: 'Développement en cours',
  },
  {
    src: '/image/image3.png',
    alt: "Capture d'un module de suivi des coûts d'entrepôt",
    title: 'Autres réalisations digitales existantes',
    category: 'Autres outils numériques',
    description: "Autres modules internes développés dans la même démarche : suivi des coûts et pilotage d'activité.",
    status: 'Prototype',
  },
];

const AUTO_PLAY_DELAY_MS = 2800;

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, AUTO_PLAY_DELAY_MS);

    return () => clearInterval(intervalId);
  }, [paused]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goToPrevious();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goToNext();
    }
  };

  const activeSlide = slides[currentIndex];

  return (
    <section className="section-padding bg-gray-950 overflow-hidden">
      {/* En-tête de section */}
      <div className="container-custom mb-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Nos réalisations
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-lg text-gray-400 max-w-2xl mx-auto"
        >
          Des solutions concrètes, déployées sur le terrain et conçues pour durer.
        </motion.p>
      </div>

      {/* Piste de défilement */}
      <div
        className="relative mx-auto w-full max-w-5xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onKeyDown={handleKeyDown}
        role="region"
        aria-roledescription="carrousel"
        aria-label="Galerie de réalisations"
        tabIndex={0}
      >
        {/* Dégradés latéraux pour un effet cinématique */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-gray-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-gray-950 to-transparent" />

        <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.src}
              initial={{ opacity: 0, x: 40, scale: 1.02 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -40, scale: 0.995 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <Image
                src={activeSlide.src}
                alt={activeSlide.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1024px"
                className="object-cover"
                priority={currentIndex === 0}
                unoptimized={activeSlide.src.endsWith('.svg')}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Légende qualifiée : titre, catégorie, statut, description */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7" aria-live="polite">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-900">
                    {activeSlide.status}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wide text-white/70">
                    {activeSlide.category}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white drop-shadow-md mb-1">
                  {activeSlide.title}
                </h3>
                <p className="text-sm sm:text-base text-white/85 max-w-xl drop-shadow-sm">
                  {activeSlide.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            onClick={goToPrevious}
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/45 px-3 py-2 text-white transition hover:bg-black/65"
            aria-label="Réalisation précédente"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/45 px-3 py-2 text-white transition hover:bg-black/65"
            aria-label="Réalisation suivante"
          >
            ›
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => goToSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'w-8 bg-white' : 'w-2.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Aller à la réalisation : ${slide.title}`}
              aria-current={currentIndex === index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

