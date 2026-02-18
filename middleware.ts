import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define protected routes
const isDashboardRoute = createRouteMatcher(["/dashboard(.*)"]);
const isManagerRoute = createRouteMatcher(["/dashboard/gestor(.*)"]);

export default clerkMiddleware(async (auth, req) => {
    // Protect all dashboard routes
    if (isDashboardRoute(req)) {
        const { userId, redirectToSignIn } = await auth();
        if (!userId) {
            return redirectToSignIn();
        }
    }

    // Specific check for Manager routes
    if (isManagerRoute(req)) {
        const { sessionClaims } = await auth();

        // Check if the user has the 'gestor' role in metadata
        // Note: You must configure the JWT template in Clerk to include public_metadata
        const role = (sessionClaims?.metadata as any)?.role;

        if (role !== "gestor") {
            // Redirect to a specialized access denied page or main dashboard
            // For now, redirecting to root dashboard
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
