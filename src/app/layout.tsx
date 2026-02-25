import React from 'react';
import type { Metadata } from 'next';
import '../styles/globals.css';
import { Inter, Gloock } from 'next/font/google';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { PersonaProvider } from '../contexts/PersonaContext';
import { AudioProvider } from '../contexts/SoundContext';
import { DocumentaryProvider } from '../contexts/DocumentaryContext';
import PersonaToggle from '../components/ui/PersonaToggle';
import DocumentaryMode from '../components/ui/DocumentaryMode';
import PreloaderWrapper from '../components/ui/PreloaderWrapper';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const gloock = Gloock({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-gloock',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MS Dhoni | Official Portfolio',
  description: 'The official portfolio website of Mahendra Singh Dhoni. Explore the journey, stats, and legacy of Captain Cool.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${gloock.variable}`}>
      <body>
        <PersonaProvider>
          <AudioProvider>
            <DocumentaryProvider>
              <PreloaderWrapper />
              <Header />
              <main>{children}</main>
              <Footer />
              <PersonaToggle />
              <DocumentaryMode />
            </DocumentaryProvider>
          </AudioProvider>
        </PersonaProvider>
      </body>
    </html>
  );
}
