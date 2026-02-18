"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface LevelNode {
    id: number;
    x: number; // Percentage from left (0-100)
    y: number; // Percentage from top (0-100)
    status: "locked" | "current" | "completed";
    label: string;
}

const levels: LevelNode[] = [
    { id: 1, x: 20, y: 70, status: "current", label: "Start: Anamnese" },
    { id: 2, x: 50, y: 50, status: "locked", label: "Level 2: Check-up" },
    { id: 3, x: 80, y: 30, status: "locked", label: "Level 3: Metas" },
];

export function OverworldMap() {
    // Simple state to handle hydration/mounting animations
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="w-full h-96 bg-green-200 rounded-lg animate-pulse" />;

    return (
        <div className="relative w-full h-[500px] bg-[#5C94FC] rounded-xl overflow-hidden shadow-2xl border-4 border-yellow-400">

            {/* --- Background Layers (Simulating Parallax/Depth) --- */}

            {/* Far Background: Hills */}
            <div className="absolute inset-0 opacity-80"
                style={{
                    backgroundImage: "url('/assets/gamification/mario-level-bg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center bottom"
                }}
            />

            {/* Grid Pattern Overlay (Retro Feel) */}
            <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/pixel-weave.png')] opacity-10 pointer-events-none"></div>

            {/* --- Map Paths (SVG Lines) --- */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {/* Path from Level 1 to 2 */}
                <line x1="20%" y1="70%" x2="50%" y2="50%" stroke="black" strokeWidth="8" strokeDasharray="10 5" className="opacity-40" />
                <line x1="20%" y1="70%" x2="50%" y2="50%" stroke="#F8D878" strokeWidth="4" strokeDasharray="10 5" />

                {/* Path from Level 2 to 3 */}
                <line x1="50%" y1="50%" x2="80%" y2="30%" stroke="black" strokeWidth="8" strokeDasharray="10 5" className="opacity-40" />
                <line x1="50%" y1="50%" x2="80%" y2="30%" stroke="#F8D878" strokeWidth="4" strokeDasharray="10 5" />
            </svg>

            {/* --- Level Nodes --- */}
            {levels.map((level) => (
                <div
                    key={level.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                    style={{ left: `${level.x}%`, top: `${level.y}%` }}
                >
                    {/* Node Circle */}
                    <div className={`w-8 h-8 rounded-full border-2 border-black shadow-lg transition-all duration-300
            ${level.status === "current" ? "bg-red-500 scale-125 animate-bounce-slow" :
                            level.status === "completed" ? "bg-yellow-400" : "bg-gray-800"
                        }
          `}>
                        {level.status === "current" && (
                            <div className="absolute inset-0 bg-white opacity-30 rounded-full animate-ping"></div>
                        )}
                    </div>

                    {/* Label Tooltip */}
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white">
                        {level.label}
                    </div>

                    {/* --- Avatar (Only on Current Level) --- */}
                    {level.status === "current" && (
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: -45, opacity: 1 }}
                            transition={{ duration: 0.5, type: "spring" }}
                            className="absolute left-1/2 -translate-x-1/2 w-12 h-12"
                        >
                            {/* Mario CSS Placeholder (or use Image if we had the asset) */}
                            <div className="w-full h-full relative">
                                <div className="absolute bottom-0 w-8 h-10 bg-red-600 left-2 rounded-t-lg border border-black shadow-sm"></div>
                                <div className="absolute -top-1 left-1 w-10 h-4 bg-red-600 rounded-full border border-black z-10"></div>
                                <div className="absolute top-8 left-0 w-12 h-4 bg-blue-600 rounded-md border border-black"></div>
                                <div className="text-[8px] font-bold text-white absolute top-10 left-3 drop-shadow-md">YOU</div>
                            </div>
                        </motion.div>
                    )}
                </div>
            ))}

            {/* --- Decorative Elements --- */}
            <div className="absolute top-4 left-4 bg-yellow-300 border-4 border-black px-4 py-2 rounded-lg shadow-[4px_4px_0px_#000] rotate-[-2deg]">
                <h2 className="text-xl font-black text-black tracking-tighter" style={{ fontFamily: 'Impact, sans-serif' }}>
                    WORLD 1
                </h2>
                <span className="text-xs font-bold text-red-600 uppercase">Yoshi's Island</span>
            </div>

        </div>
    );
}
