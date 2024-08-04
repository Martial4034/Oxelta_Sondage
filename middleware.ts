import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('next-auth.session-token') || request.cookies.get('__Secure-next-auth.session-token');

  // Extract hostname from the request
  const { hostname, pathname } = request.nextUrl;

  // Subdomain redirection logic
  if (hostname === 'deck.vf.oxelta.io') {
    // Redirect any path on deck.vf.oxelta.io to /pdf-viewer-vf
    return NextResponse.redirect(new URL('/pdf-viewer-vf', 'https://sondage.oxelta.io'));
  } else if (hostname === 'deck.oxelta.io') {
    // Redirect any path on deck.oxelta.io to /pdf-viewer-uk
    return NextResponse.redirect(new URL('/pdf-viewer-uk', 'https://sondage.oxelta.io'));
  }

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
  matcher: ['/dashboard/:path*', '/api/uploadPdf'],
};
