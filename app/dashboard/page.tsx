
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DashboardClient } from "@/components/dashboard/dashboard-client";

export default async function DashboardPage() {
    const user = await currentUser();

    if (!user) {
        redirect("/sign-in");
    }

    // Check role to potentially redirect managers immediately to their dashboard
    const userRole = (user.publicMetadata.role as string)?.toUpperCase();

    if (userRole === "GESTOR") {
        redirect("/dashboard/gestor");
    }


    // --- Patient View (Mario World Gamification) ---
    // All UI logic is now handled by the client component

    // Serialize only what's needed to avoid server/client serialization issues
    const serializedUser = {
        firstName: user.firstName || "Associado",
        publicMetadata: user.publicMetadata || {},
    };

    return <DashboardClient user={serializedUser} />;
}
