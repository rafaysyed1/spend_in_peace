import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const { token } = req.nextauth

    // Redirect authenticated users away from auth pages
    if (token && (
      pathname === "/login" || 
      pathname === "/signup" || 
      pathname === "/reset-password"
    )) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        // Public routes
        if (
          pathname === "/" || 
          pathname === "/login" || 
          pathname === "/signup" || 
          pathname === "/reset-password" ||
          pathname.startsWith("/api/auth")
        ) {
          return true
        }

        // Protected routes require authentication
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/reset-password",
    "/dashboard/:path*",
    "/api/auth/:path*",
  ],
}