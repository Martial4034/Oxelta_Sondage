import { Inter } from 'next/font/google';
import SessionProvider from './SessionProvider';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const title = 'Oxelta';
  const description =
    'Oxelta, the future of gaming with Web 3. Play and earn OXLT tokens with our innovative ecosystem of play-and-earn games, Web 3, NFTs, blockchain games, crypto rewards, and game economy';
  const imageUrl = '/Hero_Header_EN.png';

  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <meta name="description" content={description} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />

        {/* Autres métadonnées statiques ici */}
      </head>
      <body className={`${inter.className} h-full`}>
        <SpeedInsights />
        <Analytics />
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
