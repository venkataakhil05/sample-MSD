import type { Metadata } from 'next';
import '../styles/globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

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
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
