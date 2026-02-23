import React from 'react';
import type { Metadata } from 'next';
import '../styles/globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { PersonaProvider } from '../contexts/PersonaContext';
import { AudioProvider } from '../contexts/SoundContext';
import { DocumentaryProvider } from '../contexts/DocumentaryContext';
import PersonaToggle from '../components/ui/PersonaToggle';
import DocumentaryMode from '../components/ui/DocumentaryMode';

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
    <html lang="en">
      <body>
        <PersonaProvider>
          <AudioProvider>
            <DocumentaryProvider>
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
