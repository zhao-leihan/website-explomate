"use client";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { Compass, Map } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function AuthSelectionPage() {
    const [role, setRole] = useState<"tourist" | "guide" | null>(null);
    const router = useRouter();
    const { t } = useLanguage();

    const handleContinue = () => {
        if (role) {
            router.push(`/login?role=${role}`);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden py-10 px-4">
            {/* Subtle Background Effects */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-yellow-100/40 rounded-full blur-[100px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/grid-pattern.svg')] opacity-[0.03]" />

            <div className="w-full max-w-3xl z-10">
                <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden">

                    {/* Full Width Header */}
                    <div className="bg-primary py-8 flex justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-blue-600/20 pattern-grid-lg opacity-10" />
                        <Link href="/" className="hover:opacity-90 transition-opacity relative z-10">
                            <Logo className="text-4xl text-white" />
                        </Link>
                    </div>

                    <div className="p-8 md:p-12 text-center">
                        <div className="mb-10">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                                Welcome <span className="text-secondary">Back</span>
                            </h1>
                            <p className="text-gray-500 text-lg">
                                Select your role to continue your journey
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            {/* Tourist Card */}
                            <div
                                onClick={() => setRole("tourist")}
                                className={cn(
                                    "group cursor-pointer rounded-2xl border-2 p-6 transition-all duration-300 relative overflow-hidden text-left hover:shadow-lg hover:-translate-y-1 bg-gray-50",
                                    role === "tourist"
                                        ? "border-secondary bg-yellow-50/50 ring-2 ring-secondary/20 scale-[1.02]"
                                        : "border-gray-100 hover:border-gray-200 hover:bg-white"
                                )}
                            >
                                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                                    <Compass className={cn("w-7 h-7 transition-colors", role === "tourist" ? "text-secondary" : "text-gray-400 group-hover:text-secondary")} />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-gray-900">Tourist</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Explore new destinations and book local guides for your next adventure.
                                </p>
                            </div>

                            {/* Guide Card */}
                            <div
                                onClick={() => setRole("guide")}
                                className={cn(
                                    "group cursor-pointer rounded-2xl border-2 p-6 transition-all duration-300 relative overflow-hidden text-left hover:shadow-lg hover:-translate-y-1 bg-gray-50",
                                    role === "guide"
                                        ? "border-secondary bg-yellow-50/50 ring-2 ring-secondary/20 scale-[1.02]"
                                        : "border-gray-100 hover:border-gray-200 hover:bg-white"
                                )}
                            >
                                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                                    <Map className={cn("w-7 h-7 transition-colors", role === "guide" ? "text-secondary" : "text-gray-400 group-hover:text-secondary")} />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-gray-900">Tour Guide</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Share your local knowledge and earn by guiding tourists.
                                </p>
                            </div>
                        </div>

                        <Button
                            className={cn(
                                "w-full h-14 text-lg font-bold transition-all duration-300 rounded-xl",
                                role
                                    ? "bg-primary text-white hover:bg-blue-800 hover:shadow-lg hover:scale-[1.01]"
                                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                            )}
                            disabled={!role}
                            onClick={handleContinue}
                        >
                            {role ? "Continue to Login" : "Select a Role"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
