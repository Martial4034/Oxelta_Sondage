import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('next-auth.session-token') || request.cookies.get('__Secure-next-auth.session-token');

  // Extract hostname and path from the request
  const { hostname, pathname } = request.nextUrl;

  // Subdomain redirection logic
  if (pathname === '/') {
    if (hostname === 'deck.oxelta.io') {
      // Redirect to the UK PDF viewer page
      return NextResponse.redirect(new URL('/pdf-viewer-uk', request.url));
    } else if (hostname === 'deck.vf.oxelta.io') {
      // Redirect to the VF PDF viewer page
      return NextResponse.redirect(new URL('/pdf-viewer-vf', request.url));
    }
  }

  // Session check logic for specific paths
  if (!sessionCookie && ['/dashboard', '/api/uploadPdf'].some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  // Allow other requests to pass through
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/api/uploadPdf'],
};
