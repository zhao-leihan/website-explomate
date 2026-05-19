"use client";

import { Wallet, Search, CheckCircle, Smile } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function HowItWorks() {
    const { t } = useLanguage();

    const steps = [
        {
            icon: Wallet,
            title: t.howItWorks.step1Title,
            description: t.howItWorks.step1Desc,
        },
        {
            icon: Search,
            title: t.howItWorks.step2Title,
            description: t.howItWorks.step2Desc,
        },
        {
            icon: CheckCircle,
            title: t.howItWorks.step3Title,
            description: t.howItWorks.step3Desc,
        },
        {
            icon: Smile,
            title: t.howItWorks.step4Title,
            description: t.howItWorks.step4Desc,
        },
    ];

    return (
        <section className="py-24 bg-white relative">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 font-display">{t.howItWorks.title}</h2>
                    <p className="text-xl text-slate-500">{t.howItWorks.subtitle}</p>
                </div>

                <div className="relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2 z-0" />

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                        {steps.map((step, index) => (
                            <div key={index} className="text-center bg-white p-6 rounded-xl">
                                <div className="w-20 h-20 mx-auto bg-white border-4 border-slate-50 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-primary/5 relative z-10 group hover:scale-110 transition-transform duration-300">
                                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white">
                                        <step.icon className="w-8 h-8" />
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center font-bold text-primary shadow-sm border-2 border-white">
                                        {index + 1}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-slate-900">{step.title}</h3>
                                <p className="text-slate-500">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
