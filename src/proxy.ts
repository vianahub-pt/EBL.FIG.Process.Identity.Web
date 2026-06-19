import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { createContextLogger } from './core/logger/logger';

const intlMiddleware = createMiddleware(routing);
const log = createContextLogger('proxy');

const PUBLIC_PATHS = ['/login'];

function normalizeLocalizedPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return '/';
  }

  const locale = segments[0];
  if ((routing.locales as readonly string[]).includes(locale)) {
    const withoutLocale = segments.slice(1).join('/');
    return `/${withoutLocale}` || '/';
  }

  return pathname;
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { method } = request;
  const normalizedPath = normalizeLocalizedPath(pathname);
  const start = Date.now();

  const isPublicPath = PUBLIC_PATHS.some(path =>
    normalizedPath === path || normalizedPath.startsWith(path + '/')
  );

  if (!isPublicPath) {
    const token = request.cookies.get('auth-storage');
    if (token) {
      try {
        const authData = JSON.parse(decodeURIComponent(token.value));
        const accessToken = authData?.state?.accessToken;
        if (!accessToken) {
          log.warn(`${method} ${pathname} 302 ${Date.now() - start}ms (sem accessToken)`);
          return NextResponse.redirect(new URL('/login', request.url));
        }
      } catch {
        log.error(`${method} ${pathname} 302 ${Date.now() - start}ms (cookie inválido)`);
        return NextResponse.redirect(new URL('/login', request.url));
      }
    } else {
      log.warn(`${method} ${pathname} 302 ${Date.now() - start}ms (sem autenticação)`);
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  const response = intlMiddleware(request);
  log.info(`${method} ${pathname} ${response.status} ${Date.now() - start}ms`);
  return response;
}

export const config = {
  matcher: ['/((?!_next|_vercel|.*\\..*).*)']
};
