import type { Metadata } from 'next';
import { Inter, Oswald } from 'next/font/google';
import '../styles/globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-main' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-display' });

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
      <body className={`${inter.variable} ${oswald.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
