import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PingClient from '@/components/PingClient';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'JETC Solution - Solutions Digitales Innovantes',
  description: 'JETC Solution accompagne votre transformation digitale avec des solutions modernes et performantes.',
  keywords: 'solutions digitales, développement web, transformation digitale',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <PingClient />
        {/* Bandeau "Site en préparation" */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 px-4 text-center text-sm font-medium shadow-md">
          🚧 Site en préparation – Ouverture prochainement
        </div>
        <Navbar />
        <main className="min-h-screen relative">
          {/* Watermark "SPÉCIMEN" */}
          <div 
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
            style={{ opacity: 0.08 }}
          >
            <div className="text-9xl font-black text-gray-900 transform -rotate-45 select-none">
              SPÉCIMEN
            </div>
          </div>
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
