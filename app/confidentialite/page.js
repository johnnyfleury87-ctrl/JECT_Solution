export const metadata = {
  title: 'Politique de confidentialité - JETC Solution',
  description: 'Informations sur le traitement des données personnelles par JETC Solution.',
};

export default function PrivacyPage() {
  return (
    <div className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12 space-y-8">
          <header className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Politique de confidentialité</h1>
            <p className="text-gray-600">
              Dernière mise à jour: 24 avril 2026
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900">1. Responsable du traitement</h2>
            <p className="text-gray-700">
              JETC Solution est responsable du traitement des données collectées via ce site, notamment via le formulaire de contact.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900">2. Données collectées</h2>
            <p className="text-gray-700">Nous collectons uniquement les données strictement nécessaires au traitement de votre demande:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Nom</li>
              <li>Adresse email</li>
              <li>Entreprise (optionnel)</li>
              <li>Type de demande</li>
              <li>Message</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900">3. Finalités du traitement</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Répondre à vos demandes envoyées via le formulaire de contact</li>
              <li>Assurer le suivi commercial et la relation client</li>
              <li>Renforcer la sécurité et prévenir les abus techniques</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900">4. Base légale</h2>
            <p className="text-gray-700">
              Le traitement repose sur l'intérêt légitime de JETC Solution à répondre aux demandes reçues et, selon les cas, sur des mesures précontractuelles prises à votre demande.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900">5. Durée de conservation</h2>
            <p className="text-gray-700">
              Les données de contact sont conservées pendant la durée nécessaire au traitement de la demande, puis archivées pendant une durée maximale de 24 mois sauf obligation légale contraire.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900">6. Destinataires des données</h2>
            <p className="text-gray-700">
              Les données sont accessibles uniquement aux personnes autorisées chez JETC Solution et à nos sous-traitants techniques strictement nécessaires au fonctionnement du site (hébergement, messagerie transactionnelle).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900">7. Vos droits</h2>
            <p className="text-gray-700">Vous disposez des droits suivants, dans les conditions prévues par la réglementation applicable:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Droit d'accès</li>
              <li>Droit de rectification</li>
              <li>Droit d'effacement</li>
              <li>Droit de limitation du traitement</li>
              <li>Droit d'opposition</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900">8. Contact</h2>
            <p className="text-gray-700">
              Pour toute demande liée à vos données personnelles, vous pouvez nous écrire à: contact@jetc-immo.ch.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
