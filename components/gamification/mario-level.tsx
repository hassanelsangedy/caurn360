import Image from 'next/image';

interface MarioLevelProps {
    level: number;
    status: 'locked' | 'unlocked' | 'completed';
}

export function MarioGamification({ level, status }: MarioLevelProps) {
    // Placeholder images - in a real app, these would be your assets
    // You would replace "/mario-placeholder.png" with your actual asset paths

    return (
        <div className="relative w-full h-64 bg-sky-300 rounded-lg overflow-hidden shadow-xl border-4 border-yellow-400">
            <div className="absolute inset-0 flex items-center justify-center">
                {/* Background Elements */}
                <div className="absolute bottom-0 w-full h-16 bg-green-600 border-t-4 border-green-800"></div>

                {/* Level Indicator */}
                <div className="z-10 text-center font-bold text-white drop-shadow-md">
                    <h3 className="text-4xl text-yellow-300 stroke-black stroke-2" style={{ textShadow: '2px 2px 0 #000' }}>LEVEL {level}</h3>
                    <span className="text-xl inline-block bg-black/50 px-2 py-1 rounded mt-2 uppercase">{status}</span>
                </div>

                {/* Character Placeholder (using next/image for optimization) */}
                <div className="absolute bottom-4 left-10 animate-bounce">
                    {/* 
                For Vercel optimization:
                1. Always define width/height to avoid layout shift (CLS).
                2. Use priority={true} for above-the-fold assets.
            */}
                    <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white font-bold border-2 border-white">
                        MARIO
                    </div>
                </div>
            </div>
        </div>
    );
}
