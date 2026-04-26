'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// ─── Configuration ────────────────────────────────────────────────────────────
// Pour ajouter image11.jpg, image12.jpg…, augmentez simplement TOTAL_IMAGES.
const TOTAL_IMAGES = 10;

const images = Array.from({ length: TOTAL_IMAGES }, (_, i) => ({
  src: `/image/image${i + 1}.jpg`,
  alt: `Réalisation ${i + 1}`,
}));

// Duplication pour créer une boucle infinie transparente
const track = [...images, ...images];

export default function ImageCarousel() {
  const [paused, setPaused] = useState(false);

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
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-label="Galerie de réalisations"
      >
        {/* Dégradés latéraux pour un effet cinématique */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-gray-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-gray-950 to-transparent" />

        {/* Conteneur animé */}
        <div
          className="flex"
          style={{
            animation: 'carousel-scroll 45s linear infinite',
            animationPlayState: paused ? 'paused' : 'running',
          }}
        >
          {track.map((img, index) => (
            <div
              key={index}
              className="relative mx-3 flex-shrink-0 overflow-hidden rounded-2xl"
              style={{ width: '360px', height: '240px' }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="360px"
                className="object-cover transition-transform duration-700 ease-in-out hover:scale-105"
                loading="lazy"
              />
              {/* Overlay léger pour harmoniser avec le fond sombre */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-2xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
