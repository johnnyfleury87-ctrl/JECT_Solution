import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'JETC Solution - Solutions Digitales Innovantes',
  description: 'JETC Solution accompagne votre transformation digitale avec des solutions modernes et performantes.',
  keywords: 'solutions digitales, développement web, transformation digitale',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
