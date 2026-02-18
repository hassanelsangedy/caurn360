```javascript
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { MarioGamification } from "@/components/gamification/mario-level";
import { OverworldMap } from "@/components/gamification/overworld-map";
import { GameHUD } from "@/components/gamification/game-hud";
import DashboardClient from "./dashboard-client"; // Assuming DashboardClient is in the same directory

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

    // Transition State
    const { isTransitioning, startTransition } = useLevelTransition();

    const handleStartMission = () => {
        startTransition(() => {
            // In a real app, this would be router.push('/anamnese')
            console.log("Navigating to mission...");
            // For now, we simulate navigation or reload to show effect
            window.location.href = "/dashboard?mission=started";
        });
    };

    // --- Patient View (Mario World Gamification) ---
    // In a real app, calculate current level based on assessments completed
    const currentLevel = 1;

    return (
        <div className="min-h-screen bg-[#101010] pb-10">
            {/* The Iris Transition Overlay */}
            <LevelTransition isTransitioning={isTransitioning} />

            {/* Retro HUD */}
            <GameHUD />

            <div className="max-w-5xl mx-auto px-4 space-y-8">

                {/* Intro Text - slightly more game-like */}
                <div className="text-center space-y-2 mb-8">
                    <h1 className="text-2xl md:text-3xl text-white font-press-start text-shadow-lg leading-relaxed text-yellow-400"
                        style={{ textShadow: '4px 4px 0 #000' }}>
                        WORLD 1: SAÚDE INICIAL
                    </h1>
                </div>

                {/* Gamification Map (Overworld) */}
                <div className="w-full">
                    <OverworldMap />
                </div>

                {/* Action Prompt - Styled as SMW Message Box */}
                <div className="mt-8 border-4 border-white bg-[#0000AA] rounded-2xl p-6 shadow-[8px_8px_0_#000] relative overflow-hidden">
                    {/* Corner decorative dots inside border */}
                    <div className="absolute top-2 left-2 w-2 h-2 bg-white rounded-full"></div>
                    <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full"></div>
                    <div className="absolute bottom-2 left-2 w-2 h-2 bg-white rounded-full"></div>
                    <div className="absolute bottom-2 right-2 w-2 h-2 bg-white rounded-full"></div>

                    <h2 className="text-lg md:text-xl text-yellow-300 font-press-start mb-4 uppercase tracking-wider relative z-10"
                        style={{ textShadow: '2px 2px 0 #000' }}>
                        MESSAGE BLOCK
                    </h2>

                    <div className="text-white font-mono text-lg md:text-xl font-bold leading-relaxed relative z-10 space-y-4">
                        <p>
                            Olá, <span className="text-yellow-300">{user.firstName}</span>! Bem-vindo ao CAURN 360º.
                        </p>
                        <p>
                            Sua jornada começa aqui. Para desbloquear o mapa e acessar novos mundos, você precisa completar a <span className="text-red-300">ANAMNESE INICIAL</span>.
                        </p>
                        <p className="animate-pulse mt-4 text-center text-yellow-200">
                            ▼ PRESS START TO BEGIN ▼
                        </p>
                    </div>

                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={handleStartMission}
                            className="font-press-start bg-red-600 hover:bg-red-500 text-white py-4 px-8 border-4 border-white rounded shadow-[4px_4px_0_#000] hover:translate-y-1 hover:shadow-none transition-all uppercase text-sm"
                        >
                            Começar Missão
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
