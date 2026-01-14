'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ContactCTA() {
  return (
    <section className="section-padding bg-primary-600">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-white"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Prêt à démarrer votre projet ?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Contactez-nous dès aujourd&apos;hui pour discuter de vos besoins et 
            transformer vos idées en réalité.
          </p>
          <Link 
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 text-lg"
          >
            Nous contacter
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
