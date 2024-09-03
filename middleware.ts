import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { hostname, pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  // Gestion des redirections et des métadonnées dynamiques
  if (hostname === 'deck.fr.oxelta.io') {
    url.pathname = '/pdf-viewer-vf';
    const response = NextResponse.rewrite(url);
    response.headers.set('x-meta-title', 'Deck Oxelta FR');
    response.headers.set('x-meta-description', 'Deck de Oxelta, le futur du jeu avec le Web 3. Jouez et gagnez des jetons OXLT avec notre écosystème innovant de jeux play-to-earn, Web 3, NFTs, jeux blockchain, récompenses crypto et économie de jeu');
    return response;
  } else if (hostname === 'deck.oxelta.io') {
    url.pathname = '/pdf-viewer-uk';
    const response = NextResponse.rewrite(url);
    response.headers.set('x-meta-title', 'Deck Oxelta EN');
    response.headers.set('x-meta-description', "Deck Oxelta, the future of gaming with Web 3. Play and earn OXLT tokens with our innovative ecosystem of play-and-earn games, Web 3, NFTs, blockchain games, crypto rewards, and game economy");
    return response;
  }

  // Gestion de la session pour les pages protégées de sondage.oxelta.io
  const sessionCookie = request.cookies.get('next-auth.session-token') || request.cookies.get('__Secure-next-auth.session-token');

  if (hostname === 'sondage.oxelta.io') {
    if (!sessionCookie && ['/dashboard', '/api/uploadPdf'].some((path) => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
  }

  // Permettre aux autres requêtes de passer
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/api/uploadPdf', '/pdf-viewer-vf', '/pdf-viewer-uk'],
};
