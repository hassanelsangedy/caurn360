"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Types for gamification stages
interface GameStage {
    id: string; // 'anamnese', 'treino', 'preventivo'
    name: string;
    x: number; // Percentage position X (0-100)
    y: number; // Percentage position Y (0-100)
    status: 'locked' | 'unlocked' | 'completed';
}

const stages: GameStage[] = [
    { id: 'anamnese', name: 'Avaliação Inicial', x: 20, y: 70, status: 'completed' },
    { id: 'treino', name: 'Treino Especializado', x: 50, y: 40, status: 'unlocked' },
    { id: 'preventivo', name: 'Check-up Preventivo', x: 80, y: 20, status: 'locked' },
];

export function GameMap() {
    const [activeStage, setActiveStage] = useState<string | null>(null);

    // Find the currently active/unlocked stage for avatar positioning
    const currentStageCheck = stages.find(s => s.status === 'unlocked') || stages[stages.length - 1];

    return (
        <div className="relative w-full aspect-video bg-sky-300 rounded-xl overflow-hidden border-4 border-yellow-500 shadow-2xl">
            {/* 
        Background Map - "Dinosaur Land" style
        Using placehold.co for now, replace /assets/mario/dinosaur-land.png in production
      */}
            <Image
                src="/assets/mario/dinosaur-land.png" // User should provide this asset
                alt="Mapa da Jornada CAURN"
                fill
                className="object-cover"
                priority={true} // Critical for LCP
                onError={(e) => {
                    // Fallback if image missing during dev
                    e.currentTarget.style.display = 'none';
                }}
            />

            {/* Fallback background if image fails */}
            <div className="absolute inset-0 bg-gradient-to-b from-sky-300 to-green-400 -z-10" />

            {/* Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Cloud animations could go here */}
            </div>

            {/* Stages Paths (simple SVG lines connecting points) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path
                    d="M 20% 70% Q 35% 55% 50% 40% T 80% 20%"
                    fill="none"
                    stroke="white"
                    strokeWidth="4"
                    strokeDasharray="8 8"
                    className="drop-shadow-md"
                />
            </svg>

            {/* Stage Points */}
            {stages.map((stage) => (
                <motion.div
                    key={stage.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                    style={{ left: `${stage.x}%`, top: `${stage.y}%` }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setActiveStage(stage.id)}
                >
                    {/* Stage Marker (Level Dot) */}
                    <div className={cn(
                        "w-6 h-6 rounded-full border-2 border-black shadow-lg z-10 relative",
                        stage.status === 'locked' ? "bg-red-500" :
                            stage.status === 'completed' ? "bg-yellow-400" : "bg-red-600 animate-pulse"
                    )}></div>

                    {/* Label */}
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        {stage.name}
                    </div>
                </motion.div>
            ))}

            {/* Avatar Animation */}
            <motion.div
                className="absolute w-12 h-12 z-20"
                initial={{
                    left: `${stages.find(s => s.status === 'completed')?.x || 10}%`,
                    top: `${stages.find(s => s.status === 'completed')?.y || 80}%`
                }}
                animate={{
                    left: `${currentStageCheck.x}%`,
                    top: `${currentStageCheck.y}%`
                }}
                transition={{
                    duration: 2,
                    type: "spring",
                    stiffness: 50
                }}
                style={{ transform: 'translate(-50%, -100%)' }} // Anchor at bottom center (feet)
            >
                {/* Avatar Sprite Placeholder */}
                <div className="w-full h-full bg-red-500 rounded-full border-2 border-white shadow-xl flex items-center justify-center text-[8px] font-bold text-white">
                    VOCÊ
                </div>
            </motion.div>

            {/* Action Block [?] */}
            <div className="absolute top-4 right-4 animate-bounce">
                <button className="w-12 h-12 bg-yellow-400 border-b-4 border-r-4 border-yellow-600 rounded shadow-lg text-brown-900 font-bold text-2xl flex items-center justify-center hover:bg-yellow-300 active:border-0 active:translate-y-1 transition-all">
                    ?
                </button>
            </div>
        </div>
    );
}
