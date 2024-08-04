// app/layout.tsx or wherever you have your layout component
import { useDomainTitle } from '@/lib/useDomainTitle';
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
  const dynamicTitle = useDomainTitle();

  return (
    <html lang="en">
      <head>
        <title>{dynamicTitle}</title>
        <meta name="description" content={metadata.description!} />
      </head>
      <body>{children}</body>
    </html>
  );
}
