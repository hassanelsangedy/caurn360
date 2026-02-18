"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface LevelNode {
    id: number;
    x: number; // Percentage from left (0-100)
    y: number; // Percentage from top (0-100)
    status: "locked" | "current" | "completed";
    label: string;
}

const levels: LevelNode[] = [
    { id: 1, x: 25, y: 75, status: "current", label: "House" },     // Yoshi's House vibe
    { id: 2, x: 45, y: 55, status: "locked", label: "Level 1" },    // First climb
    { id: 3, x: 75, y: 35, status: "locked", label: "Castle" },     // Castle on hill
];

export function OverworldMap() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="w-full h-[500px] bg-[#5C94FC] rounded-xl animate-pulse" />;

    return (
        <div className="relative w-full h-[500px] bg-[#5C94FC] rounded-xl overflow-hidden shadow-2xl border-4 border-yellow-400">

            {/* --- WATER ANIMATION --- */}
            <div className="absolute inset-0 opacity-30 bg-[url('https://media.giphy.com/media/3o7aD2dLOma2iWWnF6/giphy.gif')] bg-repeat opacity-20" style={{ backgroundSize: '200px' }}></div>

            {/* --- ISLAND LANDMASS (SVG) --- */}
            {/* This SVG draws a shape resembling the starting island of SMW */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <defs>
                    <pattern id="grassPattern" patternUnits="userSpaceOnUse" width="40" height="40" viewBox="0 0 10 10">
                        <rect width="10" height="10" fill="#228B22" />
                        <circle cx="2" cy="2" r="1" fill="#006400" opacity="0.4" />
                        <circle cx="7" cy="7" r="1" fill="#006400" opacity="0.4" />
                    </pattern>
                </defs>

                {/* The Island Shape */}
                <path
                    d="M -10,500 
               L -10,400 
               C 50,400 100,350 150,350 
               S 250,300 300,300
               S 400,200 500,200
               S 700,100 800,100
               L 1200,100
               L 1200,500
               Z"
                    fill="url(#grassPattern)"
                    stroke="#F8D878"
                    strokeWidth="8"
                    className="drop-shadow-xl"
                />

                {/* Outline for the 'cliff' effect */}
                <path
                    d="M -10,500 
               L -10,400 
               C 50,400 100,350 150,350 
               S 250,300 300,300
               S 400,200 500,200
               S 700,100 800,100
               L 1200,100"
                    fill="none"
                    stroke="#006400"
                    strokeWidth="4"
                    opacity="0.5"
                    transform="translate(0, 10)"
                />

                {/* --- PATHS --- */}
                {/* Path 1 -> 2 */}
                <line x1="25%" y1="75%" x2="45%" y2="55%" stroke="white" strokeWidth="6" strokeDasharray="10 10" strokeLinecap="round" />

                {/* Path 2 -> 3 */}
                <line x1="45%" y1="55%" x2="75%" y2="35%" stroke="white" strokeWidth="6" strokeDasharray="10 10" strokeLinecap="round" />
            </svg>

            {/* --- DECORATIVE ELEMENTS (CSS Shapes) --- */}
            {/* Hill 1 */}
            <div className="absolute top-[30%] left-[80%] w-32 h-32 bg-[#1C9C1C] rounded-t-full border-4 border-black z-0">
                <div className="absolute top-4 left-4 w-4 h-8 bg-black opacity-20 rounded-full"></div>
                <div className="absolute top-8 right-8 w-4 h-4 bg-black opacity-20 rounded-full"></div>
            </div>


            {/* --- LEVEL NODES --- */}
            {levels.map((level) => (
                <div
                    key={level.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                    style={{ left: `${level.x}%`, top: `${level.y}%` }}
                >
                    {/* The Node Dot */}
                    <div className={`w-6 h-6 rounded-full border-2 border-white shadow-lg
                ${level.status === "current" ? "bg-red-500 animate-pulse" :
                            level.status === "completed" ? "bg-yellow-400" : "bg-black"
                        }`}>
                    </div>

                    {/* Level Label */}
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white/90 border-2 border-black px-2 py-0.5 rounded text-[10px] whitespace-nowrap font-bold uppercase pointer-events-none">
                        {level.label}
                    </div>

                    {/* AVATAR */}
                    {level.status === "current" && (
                        <motion.div
                            initial={{ y: -10 }}
                            animate={{ y: -25 }}
                            transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.4 }}
                            className="absolute -top-4 -left-3"
                        >
                            {/* Mario CSS Sprite (Simple) */}
                            <div className="w-12 h-16 relative scale-75">
                                {/* Cap */}
                                <div className="absolute top-0 left-0 w-12 h-4 bg-red-600 rounded-t-lg border-2 border-black"></div>
                                <div className="absolute top-4 left-2 w-8 h-4 bg-[#FFC0CB] border-l-2 border-r-2 border-black"></div>
                                <div className="absolute top-4 left-9 w-3 h-2 bg-black rounded-r"></div> {/* Mustache */}
                                {/* Body */}
                                <div className="absolute top-8 left-2 w-8 h-6 bg-red-600 border-2 border-black rounded-md z-10"></div>
                                {/* Overalls */}
                                <div className="absolute top-10 left-1 w-10 h-6 bg-blue-600 border-2 border-black rounded-b-lg"></div>
                            </div>
                        </motion.div>
                    )}
                </div>
            ))}

            {/* --- Title Box --- */}
            <div className="absolute top-4 left-4 bg-white border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,0.5)] px-3 py-1 rounded">
                <h3 className="font-press-start text-xs text-black">YOSHI'S ISLAND 1</h3>
            </div>

        </div>
    );
}
