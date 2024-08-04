import React from 'react';
import { Metadata } from 'next';

interface RootLayoutProps {
  children: React.ReactNode;
  hostname: string;
}

export function RootLayout({ children, hostname }: RootLayoutProps) {
  // Determine the title based on the hostname
  const title = hostname.includes('deck.vf.oxelta.io')
    ? 'Deck Oxelta FR'
    : hostname.includes('deck.oxelta.io')
    ? 'Deck Oxelta EN'
    : 'Sondage Oxelta';

  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <meta
          name="description"
          content="Oxelta, the future of gaming with Web 3. Play and earn OXLT tokens with our innovative ecosystem of play-and-earn games, Web 3, NFTs, blockchain games, crypto rewards, and game economy"
        />
        {/* Add other meta tags here */}
      </head>
      <body>{children}</body>
    </html>
  );
}

// Note: getServerSideProps can be used on pages, but for App Router, we'll handle differently
// Assuming usage with App Router
export const metadata: Metadata = {
  title: 'Sondage Oxelta',
  description:
    'Oxelta, the future of gaming with Web 3. Play and earn OXLT tokens with our innovative ecosystem of play-and-earn games, Web 3, NFTs, blockchain games, crypto rewards, and game economy',
};

export default RootLayout;
