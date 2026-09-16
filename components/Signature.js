'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Signature() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Photo principale + portrait en incrustation */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/images/photo-profile.png" alt="Johnny Fleury" fill className="object-cover" priority />
              </div>
              
              {/* Photo du fondateur en incrustation (reprise de l'ancienne carte d'accueil) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -bottom-6 -right-6 w-28 h-28 rounded-xl overflow-hidden shadow-xl border-4 border-primary-600"
              >
                <Image
                  src="/images/johnny-hero.jpg"
                  alt="Portrait de Johnny Fleury, fondateur de JETC Solution"
                  fill
                  className="object-cover object-[center_20%]"
                />
              </motion.div>
            </motion.div>

            {/* Texte Signature */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Du terrain <span className="text-primary-600">à une vision transversale</span>
              </h2>
              
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  Depuis près de huit ans, Johnny Fleury évolue au sein d’un environnement de
                  commerce en ligne alimentaire multisite, comptant environ 12 500 références et
                  intégrant un nouvel entrepôt automatisé.
                </p>

                <p>
                  Son parcours a commencé sur le terrain, dans la préparation de commandes, avant
                  d’évoluer vers l’assistance opérationnelle, le management, les ressources
                  humaines, la coordination de projets, les achats indirects et la qualité.
                </p>

                <p>
                  Ce passage entre les fonctions opérationnelles et les différents services
                  support lui a permis d’observer une même organisation sous plusieurs angles.
                  Chaque fonction possède ses priorités et ses contraintes, mais leurs décisions
                  interagissent et influencent l’ensemble des opérations.
                </p>

                <p>
                  Ce parcours a construit sa vision : les améliorations les plus utiles
                  apparaissent lorsque la réalité du terrain, les données disponibles et les
                  fonctions support sont reliées autour d’un objectif commun.
                </p>

                <p>
                  JETC Solution est née de cette approche terrain et transversale. Son objectif
                  est de comprendre le fonctionnement existant, de structurer les informations
                  disponibles et de construire avec les équipes des améliorations concrètes,
                  adaptées à leur réalité.
                </p>

                <p className="text-primary-700 font-semibold italic">
                  Analyser. Structurer. Optimiser.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
