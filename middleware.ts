import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { hostname, pathname } = request.nextUrl;

  // Subdomain redirection logic
  if (hostname === 'deck.fr.oxelta.io') {
    // Redirect any request from deck.vf.oxelta.io to sondage.oxelta.io/pdf-viewer-vf
    return NextResponse.redirect('https://sondage.oxelta.io/pdf-viewer-vf');
  } else if (hostname === 'deck.oxelta.io') {
    // Redirect any request from deck.oxelta.io to sondage.oxelta.io/pdf-viewer-uk
    return NextResponse.redirect('https://sondage.oxelta.io/pdf-viewer-uk');
  }

  // Extract session cookie
  const sessionCookie = request.cookies.get('next-auth.session-token') || request.cookies.get('__Secure-next-auth.session-token');

  // Session check logic for specific paths on sondage.oxelta.io
  if (hostname === 'sondage.oxelta.io') {
    if (!sessionCookie && ['/dashboard', '/api/uploadPdf'].some((path) => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
  }

  // Allow other requests to pass through
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/uploadPdf', '/(.*)'],
};
