import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const { pathname } = request.nextUrl;

    // Define public routes that are accessible to everyone
    const publicRoutes = ["/auth/login", "/auth/register", "/auth/signup", "/partner-register"];

    // Define protected routes that require authentication
    const protectedRoutes = ["/admin", "/partner", "/styler"];

    const isPublicRoute = pathname === "/" || publicRoutes.some((route) => pathname.startsWith(route));
    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

    // Allow public routes to be accessed without authentication
    if (isPublicRoute) {
        return NextResponse.next();
    }

    // If the route is protected and there's no token, redirect to the login page
    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // Handle role-based access for protected routes
    if (isProtectedRoute && token) {
        const userCookie = request.cookies.get("user")?.value;
        if (userCookie) {
            try {
                const user = JSON.parse(userCookie);
                if (pathname.startsWith("/admin") && user.role !== "admin") {
                    return NextResponse.redirect(new URL("/", request.url));
                }
            } catch (e) {
                // Ignore JSON parse error if the cookie is malformed
            }
        }
    }

    // For any other request, let Next.js handle it. This allows static assets
    // and non-existent routes (which will result in a 404) to be handled correctly.
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - images (images in public folder)
         */
        "/((?!api|_next/static|_next/image|favicon.ico|images).*)",
    ],
};