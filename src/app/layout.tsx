import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

// Configurando as fontes com suporte a variáveis CSS do Tailwind v4
const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Casamento de Amanda & Guilherme | 24.01.2027',
  description: 'Site oficial do casamento de Amanda e Guilherme. Acompanhe a contagem regressiva, confirme sua presença (RSVP) e veja nossa lista de presentes criativos!',
  keywords: ['casamento', 'Amanda e Guilherme', 'RSVP', 'lista de presentes', 'noivos'],
  authors: [{ name: 'Amanda & Guilherme' }],
  openGraph: {
    title: 'Casamento de Amanda & Guilherme | 24.01.2027',
    description: 'Confirme sua presença e participe deste dia especial conosco!',
    type: 'website',
    locale: 'pt_BR',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-off-white text-text-dark font-body">
        {/* Provedor de Notificações elegante e estilizado com a paleta do casamento */}
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              background: '#ffffff',
              color: '#2D1B3D',
              border: '1px solid #E9D5EC',
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '14px',
              padding: '12px 18px',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(75, 0, 130, 0.08)',
            },
            success: {
              iconTheme: {
                primary: '#4B0082',
                secondary: '#ffffff',
              },
            },
          }}
        />

        {/* Navbar Fixa no topo */}
        <Navbar />

        {/* Conteúdo Principal, com margem para a Navbar fixa (pt-16 a pt-20) */}
        <main className="flex-1 flex flex-col pt-16 sm:pt-20">
          {children}
        </main>

        {/* Rodapé global */}
        <Footer />
      </body>
    </html>
  );
}
