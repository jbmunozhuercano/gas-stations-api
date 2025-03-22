import type {Metadata} from 'next';
import {PropsWithChildren, ReactNode} from 'react';
// import {Smooch_Sans} from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import SeoText from './components/SeoText';
import Footer from './components/Footer';

// const smoochSans = Smooch_Sans({
//   variable: '--smooch-sans-font',
//   weight: ['400', '700'],
//   subsets: ['latin'],
// });

export const metadata: Metadata = {
  title: 'Precio Gasolineras España',
  description: 'Precio combustible estaciones de servicio España'
};

export default function RootLayout({children}: PropsWithChildren): ReactNode {
  return (
    <html lang='es'>
      <body>
        <Header />
        {children}
        <SeoText />
        <Footer />
      </body>
    </html>
  );
}
