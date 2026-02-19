"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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

            {/* --- SVG MAP LAYER --- */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 500">
                <defs>
                    {/* Pattern: Water Waves */}
                    <pattern id="waterPattern" patternUnits="userSpaceOnUse" width="40" height="40" viewBox="0 0 20 20">
                        <rect width="20" height="20" fill="#4B69D2" /> {/* SMW Blue */}
                        <path d="M 2,10 L 8,10 M 12,5 L 18,5" stroke="white" strokeWidth="1" opacity="0.4" />
                    </pattern>

                    {/* Pattern: Grass Texture (Crosshatch) */}
                    <pattern id="grassPattern" patternUnits="userSpaceOnUse" width="60" height="60" viewBox="0 0 20 20">
                        <rect width="20" height="20" fill="#3CB300" /> {/* SMW Green */}
                        <path d="M 0,0 L 2,2 M 10,10 L 12,12" stroke="#2a8000" strokeWidth="2" opacity="0.3" />
                    </pattern>

                    {/* Pattern: Cliff Face (Stripes) */}
                    <pattern id="cliffPattern" patternUnits="userSpaceOnUse" width="20" height="20" viewBox="0 0 10 10">
                        <rect width="10" height="10" fill="#C67C30" /> {/* Brown */}
                        <path d="M 2,0 L 2,10 M 7,0 L 7,10" stroke="#8B4513" strokeWidth="1.5" />
                    </pattern>

                    {/* Pattern: Path (Beige Sand) */}
                    <pattern id="pathPattern" patternUnits="userSpaceOnUse" width="10" height="10">
                        <rect width="10" height="10" fill="#E8D5B5" />
                        <circle cx="2" cy="2" r="0.5" fill="#CBB694" />
                    </pattern>
                </defs>

                {/* 1. BACKGROUND WATER */}
                <rect width="100%" height="100%" fill="url(#waterPattern)" />

                {/* 2. LANDMASS LAYERS */}

                {/* Layer 1: Base Island (Shadow/Cliff bottom) */}
                <path
                    d="M -50,600
                       L -50,350
                       C 50,350 100,380 200,380
                       C 350,380 400,450 600,450
                       C 800,450 850,350 950,350
                       L 1050,350
                       L 1050,600 Z"
                    fill="url(#cliffPattern)"
                    stroke="black"
                    strokeWidth="3"
                />

                {/* Layer 2: Grass Top (The Playable Area) - Offset slightly up to show cliff */}
                <path
                    d="M -50,580
                       L -50,320
                       C 50,320 100,350 200,350
                       C 350,350 400,420 600,420
                       C 800,420 850,320 950,320
                       L 1050,320
                       L 1050,580 Z"
                    fill="url(#grassPattern)"
                    stroke="black"
                    strokeWidth="3"
                />

                {/* Layer 3: Upper Hill (Background Plateau) */}
                <path
                    d="M 600,350
                       C 650,350 700,300 750,300
                       C 850,300 900,200 1050,200
                       L 1050,450
                       C 900,450 850,420 750,420
                       L 600,420 Z"
                    fill="url(#grassPattern)"
                    stroke="black"
                    strokeWidth="3"
                />
                {/* Hill Cliff */}
                <path
                    d="M 600,420
                       L 600,440
                       C 650,440 700,440 750,440
                       L 1050,440
                       L 1050,420 Z"
                    fill="url(#cliffPattern)"
                />


                {/* 3. PATHS */}
                {/* Beveled Path style: Outline black, Fill Light Beige */}
                <path
                    d="M 150,350
                       Q 250,350 350,325
                       T 550,225
                       L 800,150"
                    fill="none"
                    stroke="black"
                    strokeWidth="18"
                    strokeLinecap="round"
                    className="drop-shadow-sm"
                />
                <path
                    d="M 150,350
                       Q 250,350 350,325
                       T 550,225
                       L 800,150"
                    fill="none"
                    stroke="#E8D5B5" /* Beige */
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeDasharray="20 15" /* Dotted path look */
                />

                {/* Bridge (Logs) over the 'water gap' if we imagined one, keeping simple for now */}
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
