import { NextResponse } from 'next/server';

export function middleware() {
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('Content-Security-Policy', "frame-ancestors 'self'");
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'interest-cohort=()');
  return response;
}

export const config = {
  matcher: '/:path*',
};
