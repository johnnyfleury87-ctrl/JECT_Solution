import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">JETC Solution</h3>
            <p className="text-gray-400">
              Votre partenaire pour la transformation digitale et les solutions innovantes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/#solutions" className="text-gray-400 hover:text-white transition-colors">
                  Approche
                </Link>
              </li>
              <li>
                <Link href="/#process" className="text-gray-400 hover:text-white transition-colors">
                  Méthode
                </Link>
              </li>
              <li>
                <Link href="/#projects" className="text-gray-400 hover:text-white transition-colors">
                  Projets
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-gray-400">
              Des questions ? N'hésitez pas à nous contacter.
            </p>
            <Link href="/contact" className="inline-block mt-4 text-primary-400 hover:text-primary-300 transition-colors">
              Nous contacter →
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} JETC Solution. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
