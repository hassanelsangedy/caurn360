import Image from 'next/image';

interface MarioLevelProps {
    level: number;
    status: 'locked' | 'unlocked' | 'completed';
}

export function MarioGamification({ level, status }: MarioLevelProps) {
    const isLocked = status === 'locked';
    const isCompleted = status === 'completed';

    return (
        <div className={`relative w-full h-64 rounded-lg overflow-hidden shadow-xl border-4 transition-all duration-300 group
            ${isLocked ? 'border-gray-400 grayscale' : 'border-yellow-400 hover:scale-[1.02] hover:shadow-2xl'}`}>

            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/assets/gamification/mario-level-bg.png"
                    alt="Level Environment"
                    fill
                    className="object-cover"
                    priority={level === 1}
                />
                {/* Overlay gradient for better text readability */}
                <div className={`absolute inset-0 ${isLocked ? 'bg-black/60' : 'bg-gradient-to-t from-black/40 to-transparent'}`} />
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">

                {/* Level Indicator */}
                <div className="z-10 text-center transform transition-transform group-hover:-translate-y-2">
                    <h3 className="text-5xl font-black text-yellow-300 drop-shadow-[4px_4px_0_rgba(0,0,0,1)] tracking-wider"
                        style={{ fontFamily: 'impact, sans-serif', textShadow: '4px 4px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>
                        LEVEL {level}
                    </h3>

                    <div className={`mt-3 inline-flex items-center gap-2 px-4 py-1 rounded-full border-2 text-sm font-bold uppercase tracking-widest shadow-lg
                        ${isLocked
                            ? 'bg-gray-800 border-gray-600 text-gray-400'
                            : isCompleted
                                ? 'bg-green-500 border-green-300 text-white animate-pulse'
                                : 'bg-red-500 border-red-300 text-white'
                        }`}>
                        {status === 'locked' && <span className="text-xs">🔒</span>}
                        {status === 'completed' && <span className="text-xs">⭐</span>}
                        {status === 'unlocked' && <span className="text-xs">▶️</span>}
                        {status}
                    </div>
                </div>

                {/* Interactive Elements / Decorations */}
                {!isLocked && (
                    <>
                        {/* CSS-only Pixel Art Question Block */}
                        <div className="absolute top-4 right-4 w-10 h-10 bg-yellow-400 border-4 border-orange-600 shadow-md flex items-center justify-center animate-bounce duration-[2000ms]">
                            <span className="text-orange-800 font-bold text-xl drop-shadow-sm">?</span>
                            <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-yellow-200"></div>
                        </div>

                        {/* Character Placeholder (using CSS) */}
                        <div className="absolute bottom-4 left-8 animate-bounce">
                            <div className="relative group cursor-pointer">
                                <div className="w-14 h-14 bg-red-500 rounded-lg border-2 border-white shadow-[0_4px_0_rgba(0,0,0,0.3)] flex items-center justify-center text-white text-xs font-bold transform transition-transform hover:-translate-y-1 hover:rotate-3">
                                    <div className="absolute -top-2 w-10 h-4 bg-red-600 rounded-t-md border-2 border-b-0 border-white"></div>
                                    <span className="drop-shadow-md">HERO</span>
                                </div>
                                {/* Simple shadow */}
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-2 bg-black/40 rounded-full blur-sm group-hover:w-8 transition-all"></div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
