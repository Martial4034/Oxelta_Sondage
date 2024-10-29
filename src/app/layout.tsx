"use client";

import { Inter } from "next/font/google";
import SessionProvider from "./SessionProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import React, { useEffect, useState } from "react";
import { NextResponse } from "next/server"; // Ajout de l'import pour NextResponse

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [title, setTitle] = useState("Oxelta");
  const [description, setDescription] = useState(
    "Oxelta, the future of gaming with Web 3. Play and earn OXLT tokens with our innovative ecosystem of play-and-earn games, Web 3, NFTs, blockchain games, crypto rewards, and game economy"
  );
  const [imageUrl, setImageUrl] = useState("/Hero_Header_EN.png");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      const pathname = window.location.pathname;

      // Redirection automatique pour deck.oxelta.io vers /pdf-viewer-uk
      if (hostname === "deck.oxelta.io" && pathname === "/") {
        const response = NextResponse.redirect(
          new URL("/pdf-viewer-uk", window.location.href)
        ); // Correction de la redirection
        response.headers.set("X-SEO-Title", "Pitch Deck Oxelta");
        response.headers.set(
          "X-SEO-Description",
          "Discover our pitch deck Oxelta, future the future of gaming with Web 3. Play and earn OXLT tokens with our innovative ecosystem of play-and-earn games."
        );
        window.location.href = "/pdf-viewer-uk";
      }

      // Redirection automatique pour deck.fr.oxelta.io vers /pdf-viewer-vf
      else if (hostname === "deck.fr.oxelta.io" && pathname === "/") {
        const response = NextResponse.redirect(
          new URL("/pdf-viewer-vf", window.location.href)
        ); // Correction de la redirection
        response.headers.set("X-SEO-Title", "Pitch Deck Oxelta - VF");
        response.headers.set(
          "X-SEO-Description",
          "Découvrez notre pitch deck Oxelta, la future du jeu vidéo avec Web 3. Jouez et gagnez des tokens OXLT avec notre écosystème innovant de jeux play-and-earn."
        );
        window.location.href = "/pdf-viewer-vf";
      }

      // Redirection automatique pour whitepaper.oxelta.io vers /whitepaper-pdf-viewer-uk
      else if (hostname === "whitepaper.oxelta.io" && pathname === "/") {
        const response = NextResponse.redirect(
          new URL("/whitepaper-pdf-viewer-uk", window.location.href)
        ); // Correction de la redirection
        response.headers.set("X-SEO-Title", "White Paper Oxelta");
        response.headers.set(
          "X-SEO-Description",
          "Go to the Oxelta white paper to learn more about our vision for the future of gaming with Web 3.0. Play and earn OXLT tokens with our innovative ecosystem of play-and-earn games."
        );
        window.location.href = "/whitepaper-pdf-viewer-uk";
      }

      // Redirection automatique pour whitepaper.fr.oxelta.io vers /whitepaper-pdf-viewer-vf
      else if (hostname === "whitepaper.fr.oxelta.io" && pathname === "/") {
        const response = NextResponse.redirect(
          new URL("/whitepaper-pdf-viewer-vf", window.location.href)
        ); // Correction de la redirection
        response.headers.set("X-SEO-Title", "White Paper Oxelta - VF");
        response.headers.set(
          "X-SEO-Description",
          "Accédez au white paper Oxelta pour en savoir plus sur notre vision pour le futur du jeu vidéo avec Web 3.0. Jouez et gagnez des tokens OXLT avec notre écosystème innovant de jeux play-and-earn."
        );
        window.location.href = "/whitepaper-pdf-viewer-vf";
      }

      // Redirection automatique pour sheet.oxelta.io vers /sheet-pdf-viewer-uk
      else if (hostname === "sheet.oxelta.io" && pathname === "/") {
        const response = NextResponse.redirect(
          new URL("/sheet-pdf-viewer-uk", window.location.href)
        ); // Correction de la redirection
        response.headers.set("X-SEO-Title", "Sheet Paper Oxelta");
        response.headers.set(
          "X-SEO-Description",
          "Go to the Oxelta sheet paper to learn more about our vision for the future of gaming with Web 3.0. Play and earn OXLT tokens with our innovative ecosystem of play-and-earn games."
        );
        window.location.href = "/sheet-pdf-viewer-uk";
      }

      // Redirection automatique pour sheet.fr.oxelta.io vers /sheet-pdf-viewer-vf
      else if (hostname === "sheet.fr.oxelta.io" && pathname === "/") {
        const response = NextResponse.redirect(
          new URL("/sheet-pdf-viewer-vf", window.location.href)
        ); // Correction de la redirection
        response.headers.set("X-SEO-Title", "Sheet Paper Oxelta - VF");
        response.headers.set(
          "X-SEO-Description",
          "Accédez au Sheet paper Oxelta pour en savoir plus sur notre vision pour le futur du jeu vidéo avec Web 3.0. Jouez et gagnez des tokens OXLT avec notre écosystème innovant de jeux play-and-earn."
        );
        window.location.href = "/sheet-pdf-viewer-vf";
      }

      // Logique existante pour définir le titre, la description et l'image
      if (hostname === "deck.fr.oxelta.io") {
        setTitle("Oxelta - Deck FR");
        setDescription("Description spécifique pour Deck FR");
        setImageUrl("/Hero_Header_FR.png");
      } else if (hostname === "deck.oxelta.io") {
        setTitle("Oxelta - Deck EN");
        setDescription(
          "Oxelta, the future of gaming with Web 3. Play and earn OXLT tokens with our innovative ecosystem of play-and-earn games, Web 3, NFTs, blockchain games, crypto rewards, and game economy"
        );
        setImageUrl("/Hero_Header_EN.png");
      } else if (hostname === "sondage.oxelta.io") {
        setTitle("Oxelta - Sondage");
        setDescription(
          "Participez à notre sondage pour améliorer votre expérience."
        );
        setImageUrl("/Hero_Header_Sondage.png");
      }
    }
  }, []);

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
