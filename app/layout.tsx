import type { Metadata } from 'next';
import { Smooch_Sans } from 'next/font/google';
import './globals.css';
import { Header } from './components/Header';
import { SeoText } from './components/Prefooter';
import { Footer } from './components/Footer';

const smoochSans = Smooch_Sans({
  variable: '--smooch-sans-font',
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Precio Gasolineras España - Combustible Estaciones de Servicio',
  description:
    'Consulta los precios de gasolina y diésel en estaciones de servicio de España. Compara precios por municipio y encuentra la gasolinera más barata cerca de ti.',
  keywords: [
    'gasolineras España',
    'precio gasolina',
    'precio diésel',
    'combustible',
    'estaciones de servicio',
    'gasolina barata',
  ],
  openGraph: {
    title: 'Precio Gasolineras España',
    description:
      'Consulta los precios de gasolina y diésel en estaciones de servicio de España.',
    url: 'https://gas-stations-api-hazel.vercel.app',
    siteName: 'Precio Gasolineras España',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Precio Gasolineras España',
    description:
      'Consulta los precios de gasolina y diésel en estaciones de servicio de España.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={smoochSans.className}>
      <body>
        <Header />
        {children}
        <SeoText />
        <Footer />
      </body>
    </html>
  );
}
