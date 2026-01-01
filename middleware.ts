import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
    // Check if running in production (Vercel)
    const isProduction = process.env.NODE_ENV === "production"

    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
        secureCookie: isProduction,
    })

    // 🐛 PRODUCTION DEBUG LOGS - Check Vercel logs
    const cookieHeader = req.headers.get('cookie') || 'NO_COOKIES'
    console.log('═══════════════════════════════════════')
    console.log('[MIDDLEWARE] Path:', req.nextUrl.pathname)
    console.log('[MIDDLEWARE] Has Token:', !!token)
    console.log('[MIDDLEWARE] Token Email:', token?.email || 'NULL')
    console.log('[MIDDLEWARE] ENV:', {
        nodeEnv: process.env.NODE_ENV,
        hasSecret: !!process.env.NEXTAUTH_SECRET,
        isProduction,
    })
    console.log('[MIDDLEWARE] Cookies:', cookieHeader.substring(0, 200) + '...')
    console.log('═══════════════════════════════════════')

    const isLoggedIn = !!token
    const isAuthPage = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/signup")

    // Only protect dashboard and profile - allow guest access to practice and songs
    const protectedRoutes = ["/dashboard", "/profile"]
    const isProtectedRoute = protectedRoutes.some(route =>
        req.nextUrl.pathname.startsWith(route)
    )

    if (isProtectedRoute && !isLoggedIn) {
        console.log('[Middleware] Redirecting to login - no token')
        return NextResponse.redirect(new URL("/login", req.url))
    }

    if (isAuthPage && isLoggedIn) {
        console.log('[Middleware] Redirecting to dashboard - has token')
        return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    return NextResponse.next()
}

export const config = {
    // ✅ Exclude /api/auth BEFORE /api to prevent middleware blocking NextAuth
    matcher: ["/((?!api/auth|api|_next|favicon.ico).*)"],
}
