'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

// ─── Configuration ────────────────────────────────────────────────────────────
// Pour ajouter image11.jpg, image12.jpg…, augmentez simplement TOTAL_IMAGES.
const TOTAL_IMAGES = 7;

const images = Array.from({ length: TOTAL_IMAGES }, (_, i) => ({
  src: `/image/image${i + 1}.png`,
  alt: `Réalisation ${i + 1}`,
}));

const AUTO_PLAY_DELAY_MS = 2800;

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, AUTO_PLAY_DELAY_MS);

    return () => clearInterval(intervalId);
  }, [paused]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

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
        aria-label="Galerie de réalisations"
      >
        {/* Dégradés latéraux pour un effet cinématique */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-gray-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-gray-950 to-transparent" />

        <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={images[currentIndex].src}
              initial={{ opacity: 0, x: 40, scale: 1.02 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -40, scale: 0.995 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <Image
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1024px"
                className="object-cover"
                priority={currentIndex === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            onClick={goToPrevious}
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/45 px-3 py-2 text-white transition hover:bg-black/65"
            aria-label="Image précédente"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/45 px-3 py-2 text-white transition hover:bg-black/65"
            aria-label="Image suivante"
          >
            ›
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {images.map((img, index) => (
            <button
              key={img.src}
              type="button"
              onClick={() => goToSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'w-8 bg-white' : 'w-2.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Aller à l'image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
