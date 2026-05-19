"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { motion } from "framer-motion";

export default function Hero() {
    const { t } = useLanguage();

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-32 pb-32 overflow-hidden bg-primary text-white">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/50 via-primary to-primary"></div>

            {/* Animated Orbs */}
            <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-secondary/20 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-blue-400/20 rounded-full blur-[120px]"></div>

            <div className="container relative z-10 px-4 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 animate-fade-in-up">
                    <ShieldCheck className="w-4 h-4 text-secondary" />
                    <span className="text-sm font-medium text-blue-100">{t.hero.badge}</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 font-display drop-shadow-sm leading-tight">
                    {t.hero.title} <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-yellow-200">
                        {t.hero.titleHighlight}
                    </span>
                </h1>

                <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
                    {t.hero.subtitle}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-200">
                    <Link href="/login?role=tourist">
                        <Button size="lg" variant="secondary" className="rounded-full px-8 text-lg h-14 w-full sm:w-auto hover:scale-105 transition-transform shadow-xl shadow-secondary/20 font-bold text-primary">
                            {t.hero.ctaFind}
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                    <Link href="/login?role=guide">
                        <Button size="lg" variant="outline" className="rounded-full px-8 text-lg h-14 w-full sm:w-auto hover:scale-105 transition-transform bg-transparent border-white text-white hover:bg-white/10 hover:text-white">
                            {t.hero.ctaBecome}
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Restored Absolute Floating Card */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute bottom-20 left-4 md:left-20 bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-2xl hidden md:block border border-white/20 max-w-sm animate-float"
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Globe className="w-6 h-6 text-blue-300" />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-white text-sm">{t.hero.cardTitle}</h3>
                        <p className="text-blue-200 text-xs">{t.hero.cardStatus}</p>
                    </div>
                </div>
            </motion.div>

            {/* Restored Aesthetic Wave */}
            <svg className="absolute bottom-0 left-0 w-full h-24 text-slate-50 fill-current pointer-events-none" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
        </section>
    );
}
