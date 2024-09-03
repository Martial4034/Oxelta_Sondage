import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import SessionProvider from './SessionProvider';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata({
  params,
}: {
  params: any;
}): Promise<Metadata> {
  // Pour obtenir le hostname, on doit éventuellement utiliser des middlewares
  // ou définir les informations nécessaires au niveau des routes.

  // Par exemple, ici on utilise une logique simplifiée :
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';

  let title = 'Sondage Oxelta';
  let description =
    'Oxelta, the future of gaming with Web 3. Play and earn OXLT tokens with our innovative ecosystem of play-and-earn games, Web 3, NFTs, blockchain games, crypto rewards, and game economy';

  if (hostname.includes('deck.vf.oxelta.io')) {
    title = 'Deck FR';
    description = 'Description spécifique pour Deck FR';
  } else if (hostname.includes('deck.oxelta.io')) {
    title = 'Deck EN';
    description = 'Description spécifique pour Deck EN';
  }

  return {
    title,
    description,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Les métadonnées générées dynamiquement apparaîtront ici */}
      </head>
      <body className={`${inter.className} h-full`}>
        <SpeedInsights />
        <Analytics />
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
