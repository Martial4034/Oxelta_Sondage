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
  title: 'Oxelta',
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
        <meta
          name="description"
          content="Oxelta, the future of gaming with Web 3. Play and earn OXLT tokens with our innovative ecosystem of play-and-earn games, Web 3, NFTs, blockchain games, crypto rewards, and game economy"
        />
      </head>
      <body className={`${inter.className} h-full`}>
        <SpeedInsights />
        <Analytics />
        <SessionProvider>
          <DynamicTitle />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
