interface GameHUDProps {
    userName?: string;
    lives?: number;
    coins?: number;
    score?: number;
}

export function GameHUD({ userName = "MARIO", lives = 5, coins = 0, score = 0 }: GameHUDProps) {

    // Formatting score to 6 digits
    const formattedScore = score.toString().padStart(6, '0');
    const time = "000"; // Time usually static in world map

    return (
        <div className="font-['Press_Start_2P'] font-press-start bg-black border-b-4 border-gray-700 p-2 text-white flex justify-between items-start select-none shadow-xl mb-6">
            {/* Left: Character Name/Lives */}
            <div className="flex flex-col">
                <span className="text-red-500 uppercase tracking-widest text-shadow mb-1">{userName}</span>
                <span className="text-white text-shadow flex items-center gap-2">
                    <span className="text-xs">x</span>
                    <span>{lives}</span>
                </span>
            </div>

            {/* Center: Dragon Coins / Bonus (Using simpler representation) */}
            <div className="flex flex-col items-center">
                <div className="flex gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-4 h-6 border-2 border-gray-500 bg-black/50 rounded-sm"></div>
                    ))}
                </div>
                <div className="flex items-center gap-1 text-yellow-400">
                    <span className="text-[10px] animate-pulse">⬤</span>
                    <span className="text-white">x {coins}</span>
                </div>
            </div>

            {/* Right: Score & Time */}
            <div className="flex flex-col items-end text-right">
                <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                        <span className="text-yellow-500 text-[10px] mb-1">TIME</span>
                        <span className="text-yellow-300">{time}</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] text-gray-400 mb-1">SCORE</span>
                        <span>{formattedScore}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
