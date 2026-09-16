export const metadata = {
  title: 'Mentions légales - JETC Solution',
  description: 'Informations légales relatives à l\'éditeur, l\'hébergeur et l\'utilisation du site JETC Solution.',
};

export default function LegalNoticePage() {
  return (
    <div className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12 space-y-8">
          <header className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Mentions légales</h1>
            <p className="text-gray-600">
              Dernière mise à jour: 16 septembre 2026
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900">1. Éditeur du site</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Éditeur : Johnny Fleury</li>
              <li>Statut : Entrepreneur individuel</li>
              <li>Nom commercial : JETC Solution</li>
              <li>SIRET : 994 308 757</li>
              <li>Adresse professionnelle : 415 Route de Champagnole, 39300 Sapois, France</li>
              <li>Adresse électronique : contact@jetc-immo.ch</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900">2. Directeur de la publication</h2>
            <p className="text-gray-700">
              Le directeur de la publication est Johnny Fleury.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900">3. Hébergement</h2>
            <p className="text-gray-700">
              Ce site est hébergé par :
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Vercel Inc.</li>
              <li>340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</li>
              <li>Site web : vercel.com</li>
            </ul>
            <p className="text-gray-700">
              Cet hébergeur a été identifié à partir de la configuration de déploiement du projet
              (fichier <code>vercel.json</code>, dépendance <code>@vercel/analytics</code>,
              documentation de déploiement du dépôt et liens de démonstration hébergés sur le
              domaine vercel.app).
            </p>
            <p className="text-sm text-amber-700 italic">
              L&apos;adresse postale ci-dessus correspond aux informations publiques habituellement
              communiquées par Vercel Inc. Elle doit être vérifiée et confirmée par l&apos;éditeur
              directement auprès de l&apos;hébergeur avant toute publication officielle de cette page.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900">4. Propriété intellectuelle</h2>
            <p className="text-gray-700">
              L&apos;ensemble des contenus présents sur ce site (textes, illustrations, logos, code
              source) est la propriété de Johnny Fleury / JETC Solution, sauf mention contraire.
              Toute reproduction, représentation, modification ou exploitation de tout ou partie
              de ces éléments, sans autorisation préalable, est interdite.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900">5. Responsabilité</h2>
            <p className="text-gray-700">
              Les informations présentées sur ce site, notamment les statuts (prototype, pilote
              opérationnel, solution déployée, développement en cours) et les résultats évalués
              ou estimés, sont fournies à titre indicatif et sans garantie contractuelle. Johnny
              Fleury / JETC Solution ne saurait être tenu responsable des erreurs, omissions ou
              interruptions de service, ni de l&apos;usage fait des informations mises à
              disposition.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900">6. Liens externes</h2>
            <p className="text-gray-700">
              Ce site peut contenir des liens vers des sites tiers, notamment des démonstrations
              ou prototypes hébergés sur des plateformes externes. JETC Solution n&apos;exerce
              aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu,
              leur disponibilité ou leurs pratiques en matière de données personnelles.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900">7. Données personnelles</h2>
            <p className="text-gray-700">
              Le traitement des données personnelles collectées via ce site, notamment via le
              formulaire de contact, est décrit en détail dans la{' '}
              <a href="/confidentialite" className="text-primary-600 hover:underline">
                Politique de confidentialité
              </a>. Aucune donnée confidentielle appartenant à un tiers (employeur, client,
              partenaire) n&apos;est traitée ni publiée sur ce site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900">8. Contact</h2>
            <p className="text-gray-700">
              Pour toute question relative aux présentes mentions légales, vous pouvez écrire à
              contact@jetc-immo.ch ou utiliser le formulaire de contact.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
