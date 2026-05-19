"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/logo";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Simplified Background */}
                    <div className="absolute inset-0 bg-slate-950" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 to-transparent opacity-50" />

                    {/* Static decorative glow instead of massive animated orb */}
                    <div className="absolute w-[300px] h-[300px] bg-primary/20 rounded-full blur-2xl" />

                    {/* Content Container */}
                    <div className="relative z-10 flex flex-col items-center">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="mb-8 text-center"
                        >
                            <Logo className="text-5xl md:text-6xl mb-2" light />
                        </motion.div>

                        {/* Optimized Loading Bar - CSS animation instead of Framer Motion for the infinite loop */}
                        <div className="relative w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
                            <div className="absolute inset-0 bg-secondary w-full h-full animate-indeterminate-bar origin-left" />
                        </div>

                        <p className="mt-4 text-white/40 text-xs font-medium">
                            Loading assets...
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
