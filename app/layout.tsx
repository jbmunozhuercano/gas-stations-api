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
    images: [
      {
        url: 'https://gas-stations-api-hazel.vercel.app/og.png',
        width: 1200,
        height: 630,
        alt: 'Precio Gasolineras España',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Precio Gasolineras España',
    description:
      'Consulta los precios de gasolina y diésel en estaciones de servicio de España.',
    images: ['https://gas-stations-api-hazel.vercel.app/og.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://gas-stations-api-hazel.vercel.app',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Precio Gasolineras España',
    url: 'https://gas-stations-api-hazel.vercel.app',
    description:
      'Consulta los precios de gasolina y diésel en estaciones de servicio de España.',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
  };

  return (
    <html lang="es" className={smoochSans.className}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Header />
        {children}
        <SeoText />
        <Footer />
      </body>
    </html>
  );
}
