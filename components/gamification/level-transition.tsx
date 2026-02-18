"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface LevelTransitionProps {
    isTransitioning: boolean;
    onComplete?: () => void;
}

export function LevelTransition({ isTransitioning, onComplete }: LevelTransitionProps) {
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

// Hook to easily use the transition
export function useLevelTransition() {
    const [isTransitioning, setIsTransitioning] = useState(false);

    const startTransition = (callback?: () => void) => {
        setIsTransitioning(true);
        // The animation takes 1.5s, we trigger callback slightly before end or at end
        setTimeout(() => {
            if (callback) callback();
        }, 1500);
    };

    return { isTransitioning, startTransition };
}
