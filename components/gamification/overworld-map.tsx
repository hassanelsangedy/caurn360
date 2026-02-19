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
    { id: 1, x: 15, y: 70, status: "completed", label: "YOSHI'S HOUSE", type: "house" },
    { id: 2, x: 35, y: 65, status: "current", label: "LEVEL 1", type: "level" },
    { id: 3, x: 55, y: 45, status: "locked", label: "LAKE", type: "level" },
    { id: 4, x: 80, y: 30, status: "locked", label: "CASTLE #1", type: "castle" },
];

export function OverworldMap() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

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
            {levels.map((level) => (
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


                    {/* AVATAR (MARIO) */}
                    {level.status === "current" && (
                        <motion.div
                            initial={{ y: -10 }}
                            animate={{ y: -25 }}
                            transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.3 }}
                            className="absolute -top-8 left-1/2 -translate-x-1/2"
                        >
                            <div className="w-8 h-10 relative">
                                {/* Pixel Art Mario via CSS shadows could be huge, sticking to blocky abstraction */}
                                {/* Hat */}
                                <div className="absolute top-0 w-8 h-3 bg-red-600 rounded-t-sm border border-black"></div>
                                {/* Face */}
                                <div className="absolute top-3 w-6 left-1 h-3 bg-[#ffcc99] border-l border-r border-black"></div>
                                {/* Body */}
                                <div className="absolute top-6 w-6 left-1 h-4 bg-blue-600 border border-black z-10"></div>
                                <div className="absolute top-6 -left-1 w-2 h-4 bg-red-600 rounded-l-full border border-black"></div> {/* Arm L */}
                                <div className="absolute top-6 -right-1 w-2 h-4 bg-red-600 rounded-r-full border border-black"></div> {/* Arm R */}
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
