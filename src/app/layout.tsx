import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionProvider from './SessionProvider';
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sondge Oxelta",
  description: "Oxelta, the future of gaming with Web 3. Play and earn OXLT tokens with our innovative ecosystem of play-and-earn games, Web 3, NFTs, blockchain games, crypto rewards, and game economy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-full">
      <Analytics/>
        <SessionProvider>
            {children}
        </SessionProvider>
      </body>
    </html>
  );
}