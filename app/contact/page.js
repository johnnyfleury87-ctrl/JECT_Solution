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
              Contactez-nous
            </h1>
            <p className="text-lg text-gray-600">
              Vous avez un projet ? Une question ? N&apos;hésitez pas à nous contacter.
              Nous vous répondrons dans les plus brefs délais.
            </p>
          </div>
          
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
