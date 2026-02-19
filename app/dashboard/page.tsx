
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
    let dbUser;
    try {
        dbUser = await prisma.user.findUnique({
            where: { clerkId: user.id },
            include: {
                gamification: true,
                patientProfile: true
            }
        });
    } catch (error: any) {
        console.error("Database Error:", error);
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] p-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl w-full">
                    <h2 className="text-lg font-semibold text-red-800 mb-2">Erro ao carregar dados do usuário</h2>
                    <p className="text-sm text-red-600 mb-4">
                        Ocorreu um erro ao conectar com o banco de dados. Isso geralmente acontece quando o esquema do banco está desatualizado.
                    </p>
                    <div className="bg-slate-900 rounded p-4 overflow-auto max-h-64">
                        <pre className="text-xs font-mono text-green-400 whitespace-pre-wrap">
                            {error?.message || JSON.stringify(error, null, 2)}
                        </pre>
                    </div>
                    <p className="mt-4 text-xs text-red-500">
                        Digest: {error?.digest}
                    </p>
                </div>
            </div>
        );
    }

    if (!dbUser) {
        // Self-healing: Create user if webhook failed
        console.warn(`User ${user.id} not found in DB. Creating on the fly...`);

        try {
            const roleMeta = (user.publicMetadata?.role as string)?.toUpperCase();
            let role: 'ASSOCIADO' | 'MEDICO' | 'GESTOR' = 'ASSOCIADO';
            if (roleMeta === 'MEDICO') role = 'MEDICO';
            else if (roleMeta === 'GESTOR') role = 'GESTOR';

            dbUser = await prisma.user.create({
                data: {
                    clerkId: user.id,
                    email: user.emailAddresses[0]?.emailAddress,
                    name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
                    role: role,
                    gamification: {
                        create: {
                            currentWorld: 1,
                            levelProgress: 0,
                            lives: 5
                        }
                    }
                },
                include: {
                    gamification: true,
                    patientProfile: true
                }
            });
        } catch (createError: any) {
            console.error("Failed to auto-create user:", createError);
            return (
                <div className="p-8 text-center text-red-500">
                    Erro crítico ao criar perfil de usuário. Contate o suporte.
                    <br />
                    <small>{createError?.message}</small>
                </div>
            );
        }
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
