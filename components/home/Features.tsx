"use client";

import { Shield, Lock, Star, Wallet } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Features() {
    const { t } = useLanguage();

    const features = [
        {
            icon: Shield,
            title: t.features.t1,
            description: t.features.d1,
        },
        {
            icon: Wallet,
            title: t.features.t2,
            description: t.features.d2,
        },
        {
            icon: Star,
            title: t.features.t3,
            description: t.features.d3,
        },
        {
            icon: Lock,
            title: t.features.t4,
            description: t.features.d4,
        },
    ];

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-[80px]" />

            <div className="container px-4 mx-auto relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 font-display">{t.features.title}</h2>
                    <p className="text-xl text-slate-500">
                        {t.features.subtitle}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2 transition-all duration-300 group">
                            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                                <feature.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
                            <p className="text-slate-500 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
