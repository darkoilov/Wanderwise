import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    })
    const { pathname } = req.nextUrl

    // Restrict /admin routes to logged-in admins
    if (pathname.startsWith("/admin")) {
        if (!token) {
            return NextResponse.redirect(new URL("/auth/signin", req.url))
        }
        if (token.role !== "admin") {
            return NextResponse.redirect(new URL("/", req.url))
        }
    }

    if (
        (pathname.startsWith("/auth/signin") || pathname.startsWith("/auth/signup")) &&
        token
    ) {
        return NextResponse.redirect(new URL("/", req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/admin/:path*", "/auth/:path*"],
}
