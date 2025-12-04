import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('fitflow_token')?.value;
    const { pathname } = request.nextUrl;

    const publicRoutes = ['/', '/auth/login', '/auth/register'];
    const isPublicRoute = publicRoutes.includes(pathname);

    if (isPublicRoute) {
        return NextResponse.next();
    }

    const protectedPrefixes = ['/admin', '/styler', '/partner', '/auth/pending'];
    const isProtectedRoute = protectedPrefixes.some((prefix) =>
        pathname.startsWith(prefix)
    );

    if (isProtectedRoute && !token) {
        const loginUrl = new URL('/auth/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|placeholder\\.svg).*)',
    ],
};
