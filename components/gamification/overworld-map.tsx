"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface LevelNode {
    id: number;
    x: number;
    y: number;
    status: "locked" | "current" | "completed";
    label: string;
    type?: "house" | "start" | "castle" | "level";
}

const levels: LevelNode[] = [
    { id: 1, x: 15, y: 75, status: "current", label: "YOSHI'S ISLAND", type: "house" },
    { id: 2, x: 32, y: 65, status: "locked", label: "DONUT PLAINS", type: "level" },
    { id: 3, x: 50, y: 50, status: "locked", label: "VANILLA DOME", type: "level" },
    { id: 4, x: 70, y: 35, status: "locked", label: "FOREST ILLUSION", type: "level" },
    { id: 5, x: 88, y: 25, status: "locked", label: "BOWSER CASTLE", type: "castle" },
];

interface OverworldMapProps {
    currentWorld?: number;
    avatarType?: string; // mario, luigi, peach, toadette
    avatarState?: string; // small, super, fire
}

export function OverworldMap({ currentWorld = 1, avatarType = "mario", avatarState = "small" }: OverworldMapProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Dynamic level status based on currentWorld
    const dynamicLevels = levels.map(level => {
        let status: "locked" | "current" | "completed" = "locked";
        if (level.id < currentWorld) status = "completed";
        if (level.id === currentWorld) status = "current";
        return { ...level, status };
    });

    // Avatar Styling Helpers
    const getAvatarColors = () => {
        switch (avatarType) {
            case "luigi": return { hat: "bg-green-600", body: "bg-green-600", overalls: "bg-blue-700" };
            case "peach": return { hat: "bg-pink-400", body: "bg-pink-400", overalls: "bg-fuchsia-600" }; // Dress simul
            case "toadette": return { hat: "bg-pink-500", body: "bg-pink-500", overalls: "bg-red-500" };
            default: return { hat: "bg-red-600", body: "bg-red-600", overalls: "bg-blue-600" }; // Mario
        }
    };

    const colors = getAvatarColors();
    const isBig = avatarState !== "small";
    const isFire = avatarState === "fire";

    // Adjust colors for Fire State (White Hat/Red Overalls usually)
    const finalColors = isFire ? { hat: "bg-white", body: "bg-white", overalls: "bg-red-600" } : colors;


    if (!mounted) return <div className="w-full h-[500px] bg-[#5C94FC] rounded-xl animate-pulse" />;

    return (
        <div className="relative w-full h-[500px] bg-[#5C94FC] rounded-xl overflow-hidden shadow-[0_0_0_4px_white,0_0_0_8px_black] font-sans user-select-none">

            {/* --- STITCH MAP BACKGROUND --- */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/gamification/main-map.png"
                    alt="Main Journey Map"
                    fill
                    className="object-cover opacity-90"
                />
                {/* Vintage overlay for retro feel */}
                <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>

            {/* --- SVG OVERLAY FOR PATHS --- */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" preserveAspectRatio="none" viewBox="0 0 1000 500">
                {/* Paths can be adjusted to match the Stitch image if needed. 
                    For now, keep them transparent or subtle to maintain interactivity. */}
                <path
                    d="M 150,350 Q 250,350 350,325 T 550,225 L 800,150"
                    fill="none"
                    stroke="white"
                    strokeWidth="4"
                    strokeDasharray="8 8"
                    className="opacity-30 drop-shadow-md"
                />
            </svg>


            {/* --- DECORATIVE SPRITES --- */}
            {/* Bushes */}
            <div className="absolute top-[60%] left-[10%] w-12 h-6 bg-[#3CB300] rounded-full border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,0.3)]">
                <div className="absolute top-1 left-2 w-2 h-2 bg-white/30 rounded-full"></div>
                <div className="absolute top-2 right-2 w-2 h-2 bg-white/30 rounded-full"></div>
            </div>

            {/* Hill with Eyes */}
            <div className="absolute top-[40%] left-[65%] w-24 h-20 bg-[#3CB300] rounded-t-[40px] border-2 border-black z-0 flex justify-center items-center gap-2">
                {/* Eyes */}
                <div className="w-2 h-6 bg-black rounded-full"></div>
                <div className="w-2 h-6 bg-black rounded-full"></div>
            </div>


            {/* --- NODES & AVATAR --- */}
            {dynamicLevels.map((level) => (
                <div
                    key={level.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                    style={{ left: `${level.x}%`, top: `${level.y}%` }}
                >
                    {/* Level Node Graphic */}
                    {/* Yellow Dot for levels, Castle for Castle, House for House */}
                    {level.type === 'level' && (
                        <div className={`w-5 h-5 rounded-full border-2 border-black shadow-md
                            ${level.status === "current" || level.status === "completed" ? "bg-[#F8D878]" : "bg-red-600"}`}>
                        </div>
                    )}

                    {level.type === 'house' && (
                        <div className="w-12 h-10 bg-[#E8D5B5] border-2 border-black relative rounded-sm shadow-lg">
                            {/* Roof */}
                            <div className="absolute -top-4 -left-1 w-14 h-6 bg-red-600 rounded-t-lg border-2 border-black"></div>
                            {/* Door */}
                            <div className="absolute bottom-0 left-4 w-4 h-6 bg-black rounded-t"></div>
                        </div>
                    )}

                    {level.type === 'castle' && (
                        <div className="relative">
                            {/* Simple CSS Castle */}
                            <div className="w-10 h-10 bg-gray-300 border-2 border-black flex flex-col items-center justify-end">
                                <div className="w-4 h-4 bg-black rounded-t-full mb-0"></div>
                            </div>
                            <div className="absolute -top-4 -left-2 w-14 h-4 flex justify-between">
                                <div className="w-3 h-6 bg-gray-300 border-2 border-black"></div>
                                <div className="w-3 h-6 bg-gray-300 border-2 border-black"></div>
                                <div className="w-3 h-6 bg-gray-300 border-2 border-black"></div>
                            </div>
                        </div>
                    )}


                    {/* AVATAR (DYNAMIC) */}
                    {level.status === "current" && (
                        <motion.div
                            initial={{ y: -10 }}
                            animate={{ y: -25 }}
                            transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.3 }}
                            className="absolute -top-8 left-1/2 -translate-x-1/2"
                        >
                            <div className={`w-8 relative transition-all duration-300 ${isBig ? "h-12 -top-2" : "h-10"}`}>
                                {/* Pixel Art Avatar via CSS */}

                                {/* Hat */}
                                <div className={`absolute top-0 w-8 rounded-t-sm border border-black ${finalColors.hat} ${isBig ? "h-4" : "h-3"}`}></div>

                                {/* Face */}
                                <div className={`absolute left-1 w-6 bg-[#ffcc99] border-l border-r border-black ${isBig ? "top-4 h-4" : "top-3 h-3"}`}></div>

                                {/* Body */}
                                <div className={`absolute left-1 w-6 border border-black z-10 ${finalColors.overalls} ${isBig ? "top-8 h-4" : "top-6 h-4"}`}></div>

                                {/* Arms (Color matches body shirt, usually same as hat for Mario/Luigi standard) */}
                                <div className={`absolute -left-1 w-2 rounded-l-full border border-black ${finalColors.body} ${isBig ? "top-8 h-4" : "top-6 h-4"}`}></div>
                                <div className={`absolute -right-1 w-2 rounded-r-full border border-black ${finalColors.body} ${isBig ? "top-8 h-4" : "top-6 h-4"}`}></div>

                                {/* Cape (If Fire/Cape state - simulate with yellow back block) */}
                                {isFire && (
                                    <div className="absolute top-4 -right-2 w-4 h-6 bg-yellow-400 border border-black -z-10 rotate-12"></div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* LABEL */}
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-black text-white px-2 py-0.5 rounded border border-white text-[8px] font-press-start whitespace-nowrap shadow-md">
                        {level.label}
                    </div>
                </div>
            ))}
        </div>
    );
}
