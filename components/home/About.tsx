"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export const About = () => {
    const { t } = useLanguage();

    const team = [
        {
            name: "Rayhan Aziel Abbrar",
            nickname: "( Zhao han )",
            role: t.about.roles.rayhan,
            color: "border-blue-500",
            bg: "bg-blue-500/10",
            image: "/about/rayhan2.webp"
        },
        {
            name: "Friska Mutiara Ramadhani",
            nickname: "( Pika )",
            role: t.about.roles.friska,
            color: "border-pink-500",
            bg: "bg-pink-500/10",
            image: "/about/friska.jpeg"
        },
        {
            name: "Ridho Perkasa Bukit",
            nickname: "( Bukit )",
            role: t.about.roles.ridho,
            color: "border-yellow-500",
            bg: "bg-yellow-500/10",
            image: "/about/bukit.jpeg"
        },
    ];

    return (
        <section id="about" className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Intro Section */}
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-6">
                             {t.about.title}
                        </h2>
                        <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8">
                            {t.about.description}
                        </p>

                        {/* Zytherion Logo */}
                        <div className="flex justify-center mb-12">
                            <div className="relative w-48 h-48 md:w-64 md:h-64 animate-pulse-slow">
                                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl"></div>
                                <img
                                    src="https://zytherion.pages.dev/logo_zythc.png"
                                    alt="Zytherion Blockchain Logo"
                                    className="relative w-full h-full object-contain drop-shadow-2xl"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Team Section */}
                <div className="max-w-6xl mx-auto">
                    <motion.h3
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="text-3xl font-bold text-center mb-12 text-slate-800"
                    >
                        {t.about.meetTeam}
                    </motion.h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center max-w-4xl mx-auto">
                        {team.map((member, index) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group w-full perspective-[1000px] aspect-[3/4]"
                            >
                                <div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-2xl shadow-lg">

                                    {/* Front Face - Image Only */}
                                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl overflow-hidden bg-white">
                                        {member.image ? (
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className={`w-full h-full flex items-center justify-center bg-slate-100 ${member.bg}`}>
                                                <User className="w-20 h-20 text-slate-400" />
                                            </div>
                                        )}
                                        {/* Subtle Name Overlay on Front (Optional, helpful for context) */}
                                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                            <p className="text-white text-center font-bold truncate">{member.name}</p>
                                        </div>
                                    </div>

                                    {/* Back Face - Details */}
                                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl overflow-hidden bg-slate-900 text-white p-6 flex flex-col items-center justify-center text-center border mr-[-1px] border-slate-700/50 relative">
                                        {/* Background Decoration */}
                                        <div className={`absolute inset-0 opacity-20 ${member.bg}`}></div>
                                        <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/30 rounded-full blur-2xl"></div>
                                        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-purple-500/30 rounded-full blur-2xl"></div>

                                        {/* Content */}
                                        <div className="relative z-10">
                                            <div className={`w-12 h-12 rounded-full border-2 ${member.color} flex items-center justify-center mb-4 mx-auto bg-slate-800`}>
                                                <User className="w-6 h-6 text-slate-300" />
                                            </div>

                                            <h4 className="font-bold text-lg mb-1 leading-tight">{member.name}</h4>

                                            {member.nickname && (
                                                <p className="text-sm font-medium text-slate-400 mb-3 italic">{member.nickname}</p>
                                            )}

                                            <div className="h-0.5 w-8 bg-primary/50 mx-auto mb-4 rounded-full"></div>

                                            <p className="text-sm text-slate-300 font-medium leading-relaxed">
                                                {member.role}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
