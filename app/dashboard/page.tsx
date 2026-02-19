
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
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

    // Fetch User with Relations
    const dbUser = await prisma.user.findUnique({
        where: { clerkId: user.id },
        include: {
            gamification: true,
            patientProfile: true
        }
    });

    if (!dbUser) {
        // Should not happen as middleware/sync should handle this, but safe fallback
        return <div>Erro ao carregar perfil. Tente recarregar.</div>;
    }

    // Initialize Gamification Profile if deemed missing (though sync should catch it)
    let gameProfile = dbUser.gamification;
    if (!gameProfile) {
        gameProfile = await prisma.gamificationProfile.create({
            data: {
                userId: dbUser.id,
                currentWorld: 1,
                levelProgress: 0,
                lives: 5
            }
        });
    }

    // Determine Avatar Type
    let avatarType = "mario"; // Default
    const age = dbUser.patientProfile?.birthDate
        ? new Date().getFullYear() - dbUser.patientProfile.birthDate.getFullYear()
        : 30; // Default age
    const gender = dbUser.patientProfile?.gender?.toLowerCase() || "male";

    if (gender === "female") {
        avatarType = age >= 60 ? "toadette" : "peach";
    } else {
        avatarType = age >= 60 ? "luigi" : "mario"; // Using Luigi for older male distinctness or keep Mario
    }

    // Determine Avatar State (Evolution)
    let avatarState = "small";
    if (gameProfile.currentWorld > 1 || (gameProfile.hasCompletedAnamnesis && gameProfile.hasApsConnection)) {
        avatarState = "super"; // Big/Super form
    }
    if (gameProfile.currentWorld >= 3) {
        avatarState = "fire"; // Fire/Cape form
    }

    // Serialize Props
    const serializedUser = {
        firstName: user.firstName || "Associado",
        publicMetadata: user.publicMetadata || {},
    };

    const serializedGameData = {
        world: gameProfile.currentWorld,
        coins: gameProfile.coins,
        score: gameProfile.score,
        lives: gameProfile.lives,
        missionAnamnesis: gameProfile.hasCompletedAnamnesis,
        missionAps: gameProfile.hasApsConnection,
        avatarType,
        avatarState
    };

    return <DashboardClient user={serializedUser} gameData={serializedGameData} />;
}
