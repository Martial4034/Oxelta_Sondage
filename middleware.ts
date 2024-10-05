import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { hostname, pathname } = request.nextUrl;

  // Redirection automatique pour deck.oxelta.io vers /pdf-viewer-uk
  if (hostname === 'deck.oxelta.io' && pathname === '/') {
    const response = NextResponse.redirect(new URL('/pdf-viewer-uk', request.url));
    response.headers.set('X-SEO-Title', 'Pitch Deck Oxelta');
    response.headers.set('X-SEO-Description', 'Discover our pitch deck Oxelta, future the future of gaming with Web 3. Play and earn OXLT tokens with our innovative ecosystem of play-and-earn games.');
    response.headers.set('X-SEO-Keywords', 'deck, oxelta, pitch deck, future of gaming, web 3, play and earn, OXLT tokens, innovative ecosystem, play-and-earn games');
    return response;
  }

  // Redirection automatique pour deck.fr.oxelta.io vers /pdf-viewer-vf
  if (hostname === 'deck.fr.oxelta.io' && pathname === '/') {
    const response = NextResponse.redirect(new URL('/pdf-viewer-vf', request.url));
    response.headers.set('X-SEO-Title', 'Pitch Deck Oxelta - VF');
    response.headers.set('X-SEO-Description', 'Découvrez notre pitch deck Oxelta, la future du jeu vidéo avec Web 3. Jouez et gagnez des tokens OXLT avec notre écosystème innovant de jeux play-and-earn.');
    response.headers.set('X-SEO-Keywords', 'deck, oxelta, pitch deck, future of gaming, web 3, play and earn, OXLT tokens, innovative ecosystem, play-and-earn games, french');
    return response;
  }

  // Redirection automatique pour whitepaper.oxelta.io vers /whitepaper-pdf-viewer-uk
  if (hostname === 'whitepaper.oxelta.io' && pathname === '/') {
    const response = NextResponse.redirect(new URL('/whitepaper-pdf-viewer-uk', request.url));
    response.headers.set('X-SEO-Title', 'White Paper Oxelta');
    response.headers.set('X-SEO-Description', 'Go to the Oxelta white paper to learn more about our vision for the future of gaming with Web 3.0. Play and earn OXLT tokens with our innovative ecosystem of play-and-earn games.');
    response.headers.set('X-SEO-Keywords', 'white paper, oxelta, solutions, web 3.0, play and earn, OXLT tokens, innovative ecosystem, play-and-earn games');
    return response;
  }

  // Redirection automatique pour whitepaper.fr.oxelta.io vers /whitepaper-pdf-viewer-vf
  if (hostname === 'whitepaper.fr.oxelta.io' && pathname === '/') {
    const response = NextResponse.redirect(new URL('/whitepaper-pdf-viewer-vf', request.url));
    response.headers.set('X-SEO-Title', 'White Paper Oxelta - VF');
    response.headers.set('X-SEO-Description', 'Accédez au white paper Oxelta pour en savoir plus sur notre vision pour le futur du jeu vidéo avec Web 3.0. Jouez et gagnez des tokens OXLT avec notre écosystème innovant de jeux play-and-earn.');
    response.headers.set('X-SEO-Keywords', 'white paper, oxelta, solutions, web 3.0, play and earn, OXLT tokens, innovative ecosystem, play-and-earn games, french');
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
  matcher: ['/', '/dashboard/:path*', '/api/uploadPdf', '/pdf-viewer-vf', '/pdf-viewer-uk', '/whitepaper-pdf-viewer-uk', '/whitepaper-pdf-viewer-vf'],
};
