"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GameHUD } from "@/components/gamification/game-hud";
import { OverworldMap } from "@/components/gamification/overworld-map";

// --- Inline Hook & Component due to Vercel Import Issues ---

interface LevelTransitionProps {
    isTransitioning: boolean;
    onComplete?: () => void;
}

function LevelTransition({ isTransitioning, onComplete }: LevelTransitionProps) {
    if (!isTransitioning) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            {/* The Iris Effect using a massive border */}
            <motion.div
                initial={{
                    width: "150vw",
                    height: "150vw",
                    borderWidth: "0px"
                }}
                animate={{
                    width: "0px",
                    height: "0px",
                    borderWidth: "100vw"
                }}
                transition={{
                    duration: 1.5,
                    ease: "easeInOut",
                    times: [0, 1]
                }}
                onAnimationComplete={onComplete}
                className="rounded-full border-black box-content"
                style={{
                    borderStyle: "solid",
                    borderColor: "black",
                }}
            />
        </div>
    );
}

function useLevelTransition() {
    const [isTransitioning, setIsTransitioning] = useState(false);

    const startTransition = (callback?: () => void) => {
        setIsTransitioning(true);
        setTimeout(() => {
            if (callback) callback();
        }, 1500);
    };

    return { isTransitioning, startTransition };
}

// --- Main Component ---

export function DashboardClient({ user }: { user: any }) {
    // Transition State
    const { isTransitioning, startTransition } = useLevelTransition();

    const handleStartMission = () => {
        startTransition(() => {
            console.log("Navigating to mission...");
            // Simulate navigation
            window.location.href = "/dashboard?mission=started";
        });
    };

    return (
        <div className="min-h-screen bg-[#101010] pb-10">
            {/* The Iris Transition Overlay */}
            <LevelTransition isTransitioning={isTransitioning} />

            {/* Retro HUD */}
            <GameHUD userName={user.firstName} />

            <div className="max-w-5xl mx-auto px-4 space-y-8">

                {/* Intro Text */}
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
                    {/* Corner decorative dots */}
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
