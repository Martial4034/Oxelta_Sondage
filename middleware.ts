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

    // Redirection automatique pour sheet.oxelta.io vers /whitepaper-pdf-viewer-uk
    if (hostname === 'sheet.oxelta.io' && pathname === '/') {
      const response = NextResponse.redirect(new URL('/sheet-pdf-viewer-uk', request.url));
      response.headers.set('X-SEO-Title', 'Sheet Paper Oxelta');
      response.headers.set('X-SEO-Description', 'Go to the Oxelta sheet paper to learn more about our vision for the future of gaming with Web 3.0. Play and earn OXLT tokens with our innovative ecosystem of play-and-earn games.');
      response.headers.set('X-SEO-Keywords', 'sheet paper, oxelta, solutions, web 3.0, play and earn, OXLT tokens, innovative ecosystem, play-and-earn games');
      return response;
    }

    // Redirection automatique pour sheet.flappy.oxelta.io vers /whitepaper-pdf-viewer-uk
    if (hostname === 'sheet.flappy.oxelta.io' && pathname === '/') {
      const response = NextResponse.redirect(new URL('/flappy-sheet-pdf-viewer-uk', request.url));
      response.headers.set('X-SEO-Title', 'Sheet Paper Oxelta');
      response.headers.set('X-SEO-Description', 'Go to the Oxelta sheet paper to learn more about our vision for the future of gaming with Web 3.0. Play and earn OXLT tokens with our innovative ecosystem of play-and-earn games.');
      response.headers.set('X-SEO-Keywords', 'sheet paper, oxelta, solutions, web 3.0, play and earn, OXLT tokens, innovative ecosystem, play-and-earn games');
      return response;
    }
  
    // Redirection automatique pour whitepaper.fr.oxelta.io vers /whitepaper-pdf-viewer-vf
    if (hostname === 'sheet.fr.oxelta.io' && pathname === '/') {
      const response = NextResponse.redirect(new URL('/sheet-pdf-viewer-vf', request.url));
      response.headers.set('X-SEO-Title', 'Sheet Paper Oxelta - VF');
      response.headers.set('X-SEO-Description', 'Accédez au sheet paper Oxelta pour en savoir plus sur notre vision pour le futur du jeu vidéo avec Web 3.0. Jouez et gagnez des tokens OXLT avec notre écosystème innovant de jeux play-and-earn.');
      response.headers.set('X-SEO-Keywords', 'sheet paper, oxelta, solutions, web 3.0, play and earn, OXLT tokens, innovative ecosystem, play-and-earn games, french');
      return response;
    }

    // Redirection automatique pour sheet.oxelta.io vers /oral-pdf-viewer-uk
    if (hostname === 'oral.oxelta.io' && pathname === '/') {
      const response = NextResponse.redirect(new URL('/oral-pdf-viewer-uk', request.url));
      response.headers.set('X-SEO-Title', 'Oral Paper Oxelta');
      response.headers.set('X-SEO-Description', 'Go to the Oxelta oral paper to learn more about our vision for the future of gaming with Web 3.0. Play and earn OXLT tokens with our innovative ecosystem of play-and-earn games.');
      response.headers.set('X-SEO-Keywords', 'Oral paper, oxelta, solutions, web 3.0, play and earn, OXLT tokens, innovative ecosystem, play-and-earn games');
      return response;
    }
  
    // Redirection automatique pour whitepaper.fr.oxelta.io vers /oral-pdf-viewer-vf
    if (hostname === 'oral.fr.oxelta.io' && pathname === '/') {
      const response = NextResponse.redirect(new URL('/oral-pdf-viewer-vf', request.url));
      response.headers.set('X-SEO-Title', 'Oral Paper Oxelta - VF');
      response.headers.set('X-SEO-Description', 'Accédez au oral paper Oxelta pour en savoir plus sur notre vision pour le futur du jeu vidéo avec Web 3.0. Jouez et gagnez des tokens OXLT avec notre écosystème innovant de jeux play-and-earn.');
      response.headers.set('X-SEO-Keywords', 'sheet paper, oxelta, solutions, web 3.0, play and earn, OXLT tokens, innovative ecosystem, play-and-earn games, french');
      return response;
    }

    // Redirection automatique pour pub.flappy.oxelta.io vers /pub-pdf-flappy-uk
    if (hostname === 'pub.flappy.oxelta.io' && pathname === '/') {
      const response = NextResponse.redirect(new URL('/pub-pdf-flappy-uk', request.url));
      response.headers.set('X-SEO-Title', 'Publicity Oxelta');
      response.headers.set('X-SEO-Description', 'Go to the Oxelta pitch paper to learn more about our vision for the future of gaming with Web 3.0. Play and earn OXLT tokens with our innovative ecosystem of play-and-earn games.');
      response.headers.set('X-SEO-Keywords', 'flappyoxo, oxelta, solutions, web 3.0, play and earn, OXLT tokens, innovative ecosystem, play-and-earn games');
      return response;
    }
  
    // Redirection automatique pour pub.flappy.fr.oxelta.io vers /pub-pdf-flappy-vf
    if (hostname === 'pub.flappy.fr.oxelta.io' && pathname === '/') {
      const response = NextResponse.redirect(new URL('/pub-pdf-flappy-vf', request.url));
      response.headers.set('X-SEO-Title', 'Publicité Oxelta - VF');
      response.headers.set('X-SEO-Description', 'Accédez au pitch paper Oxelta pour en savoir plus sur notre vision pour le futur du jeu vidéo avec Web 3.0. Jouez et gagnez des tokens OXLT avec notre écosystème innovant de jeux play-and-earn.');
      response.headers.set('X-SEO-Keywords', 'flappyoxo, oxelta, solutions, web 3.0, play and earn, OXLT tokens, innovative ecosystem, play-and-earn games, french');
      return response;
    }

    // Redirection automatique pour flappy.oxelta.io vers /pdf-flappy-uk
    if (hostname === 'flappy.oxelta.io' && pathname === '/') {
      const response = NextResponse.redirect(new URL('/pdf-flappy-uk', request.url));
      response.headers.set('X-SEO-Title', 'Publicity Oxelta');
      response.headers.set('X-SEO-Description', 'Go to the Oxelta pitch paper to learn more about our vision for the future of gaming with Web 3.0. Play and earn OXLT tokens with our innovative ecosystem of play-and-earn games.');
      response.headers.set('X-SEO-Keywords', 'flappyoxo, oxelta, solutions, web 3.0, play and earn, OXLT tokens, innovative ecosystem, play-and-earn games');
      return response;
    }
  
    // Redirection automatique pour partner.oxelta.io vers /pdf-partner
    if (hostname === 'partner.oxelta.io' && pathname === '/') {
      const response = NextResponse.redirect(new URL('/pdf-partner', request.url));
      response.headers.set('X-SEO-Title', 'TON NEST Oxelta');
      response.headers.set('X-SEO-Description', 'Accédez au ton nest paper Oxelta pour en savoir plus sur notre vision pour le futur du jeu vidéo avec Web 3.0. Jouez et gagnez des tokens OXLT avec notre écosystème innovant de jeux play-and-earn.');
      response.headers.set('X-SEO-Keywords', 'flappyoxo, oxelta, solutions, web 3.0, play and earn, OXLT tokens, innovative ecosystem, play-and-earn games, french');
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
  matcher: ['/', '/dashboard/:path*', '/api/uploadPdf', '/pdf-viewer-vf', '/pdf-viewer-uk', '/whitepaper-pdf-viewer-uk', '/whitepaper-pdf-viewer-vf', '/sheet-pdf-viewer-uk', '/sheet-pdf-viewer-vf', '/oral-pdf-viewer-uk', '/oral-pdf-viewer-vf', '/pdf-flappy-uk', '/pub-pdf-flappy-uk', '/pub-pdf-flappy-vf', '/flappy-sheet-pdf-viewer-uk', '/pdf-partner'],
};
