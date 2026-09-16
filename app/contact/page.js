import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contact - JETC Solution',
  description: 'Contactez-nous pour discuter de votre projet',
};

export default function ContactPage() {
  return (
    <div className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Discutons
            </h1>
            <p className="text-lg text-gray-600">
              Un processus difficile à mesurer, un coût qui reste invisible ou un projet que
              vous souhaitez tester avant d'investir ? Présentez-moi simplement votre situation.
            </p>
            <p className="text-sm text-amber-600 mt-3 font-medium">
              JETC Solution entre en phase pilote. Les prises de contact et propositions de
              collaboration sont ouvertes.
            </p>
          </div>
          
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
