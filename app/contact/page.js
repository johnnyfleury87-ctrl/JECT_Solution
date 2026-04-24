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
              Une idée, un besoin, une question ? On en parle et on voit si ça a du sens.
            </p>
            <p className="text-sm text-amber-600 mt-3 font-medium">
              💡 Structure opérationnelle, ouverture prochaine. Les prises de contact sont ouvertes dès maintenant.
            </p>
          </div>
          
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
