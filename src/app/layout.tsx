// src/app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import SessionProvider from './SessionProvider';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import React from 'react';
import { DynamicTitle } from '@/components/DynamicTitle';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sondage Oxelta',
  description:
    'Oxelta, the future of gaming with Web 3. Play and earn OXLT tokens with our innovative ecosystem of play-and-earn games, Web 3, NFTs, blockchain games, crypto rewards, and game economy',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Metadata title is the default title for SSR, DynamicTitle will adjust it */}
        <meta
          name="description"
          content="Oxelta, the future of gaming with Web 3. Play and earn OXLT tokens with our innovative ecosystem of play-and-earn games, Web 3, NFTs, blockchain games, crypto rewards, and game economy"
        />
        {/* Add other meta tags here */}
      </head>
      <body className={`${inter.className} h-full`}>
        <SpeedInsights />
        <Analytics />
        <SessionProvider>
          <DynamicTitle /> {/* Insert the client-side logic for dynamic titles */}
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
