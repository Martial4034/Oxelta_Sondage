// src/app/layout.tsx

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sondage Oxelta',
  description:
    'Oxelta, the future of gaming with Web 3. Play and earn OXLT tokens with our innovative ecosystem of play-and-earn games, Web 3, NFTs, blockchain games, crypto rewards, and game economy',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Determine the title based on the hostname
  let title = 'Sondage Oxelta';

  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname.includes('deck.vf.oxelta.io')) {
      title = 'Deck Oxelta FR';
    } else if (hostname.includes('deck.oxelta.io')) {
      title = 'Deck Oxelta EN';
    }
  }

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
