import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Redirect logic if needed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token,req }) => {
        const pathname = req.nextUrl.pathname;

        if(pathname === '/' || pathname === '/login' || pathname === '/signup' || pathname.startsWith('/api/auth')) {
            return true;
        }

        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    // "/settings/:path*",
    // Add other protected routes here
  ],
};