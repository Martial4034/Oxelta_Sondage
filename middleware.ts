import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { hostname, pathname } = request.nextUrl;

  // Redirection automatique pour deck.oxelta.io vers /pdf-viewer-uk
  if (hostname === 'deck.oxelta.io' && pathname === '/') {
    return NextResponse.redirect(new URL('/pdf-viewer-uk', request.url));
  }

  // Redirection automatique pour deck.fr.oxelta.io vers /pdf-viewer-vf
  if (hostname === 'deck.fr.oxelta.io' && pathname === '/') {
    return NextResponse.redirect(new URL('/pdf-viewer-vf', request.url));
  }
  // Redirection automatique pour deck.oxelta.io vers /whitepaper-pdf-viewer-uk
  if (hostname === 'whitepaper.oxelta.io' && pathname === '/') {
    return NextResponse.redirect(new URL('/whitepaper-pdf-viewer-uk', request.url));
  }

  // Redirection automatique pour whitepaper.fr.oxelta.io vers /whitepaper-pdf-viewer-vf
  if (hostname === 'whitepaper.fr.oxelta.io' && pathname === '/') {
    return NextResponse.redirect(new URL('/whitepaper-pdf-viewer-vf', request.url));
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
