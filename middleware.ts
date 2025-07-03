import { NextRequest, NextResponse } from 'next/server';

import { STORAGE_KEY } from './constants/common';
import { routes } from './constants/routes';

const publicRoutes = [
  routes.login,
  routes.register,
  '/error',
];

// Middleware function
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const response = NextResponse.next();
  response.headers.set('x-url', req.nextUrl.pathname);

  const authToken = req.cookies.get(STORAGE_KEY.EC_TOKEN)?.value;

  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (!isPublicRoute && !authToken) {
    const loginUrl = new URL(routes.login, req.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if ((pathname === routes.login || pathname === routes.register) && authToken) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return response;
}

export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};

// Also export as default for better compatibility
export default middleware;
