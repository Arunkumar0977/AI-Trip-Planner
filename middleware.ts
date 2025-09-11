import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

// 👇 Only protect specific routes
export const config = {
  matcher: [
    "/api/aimodel/:path*", // protect all routes under /api/aimodel
    "/dashboard/:path*",   // (optional) protect dashboard
  ],
};
