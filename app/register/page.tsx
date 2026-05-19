"use client";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { Compass, Map } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function RegisterPage() {
    const [role, setRole] = useState<"tourist" | "guide" | null>(null);
    const router = useRouter();
    const { t } = useLanguage();

    const handleContinue = () => {
        if (role === "guide") {
            router.push("/register/guide");
        } else {
            router.push("/dashboard/tourist");
        }
    };

    return (
        <div className="min-h-screen grid items-center justify-center bg-primary relative overflow-hidden">
            {/* Back Orb */}
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px]" />

            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-2xl relative z-10 border border-white/20">
                <div className="flex justify-center mb-8">
                    <Link href="/">
                        <Logo className="text-3xl" light />
                    </Link>
                </div>

                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-white mb-3">{t.auth.joinTitle}</h1>
                    <p className="text-blue-200 text-lg">{t.auth.joinSubtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    {/* Tourist Card */}
                    <div
                        onClick={() => setRole("tourist")}
                        className={cn(
                            "cursor-pointer rounded-xl border-2 p-6 transition-all hover:scale-105",
                            role === "tourist"
                                ? "border-secondary bg-secondary/20 ring-1 ring-secondary"
                                : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30"
                        )}
                    >
                        <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-4 mx-auto">
                            <Compass className={cn("w-8 h-8", role === "tourist" ? "text-secondary" : "text-white")} />
                        </div>
                        <h3 className="text-xl font-bold text-center mb-2 text-white">{t.auth.touristTitle}</h3>
                        <p className="text-center text-blue-200 text-sm">
                            {t.auth.touristDesc}
                        </p>
                    </div>

                    {/* Guide Card */}
                    <div
                        onClick={() => setRole("guide")}
                        className={cn(
                            "cursor-pointer rounded-xl border-2 p-6 transition-all hover:scale-105",
                            role === "guide"
                                ? "border-secondary bg-secondary/20 ring-1 ring-secondary"
                                : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30"
                        )}
                    >
                        <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-4 mx-auto">
                            <Map className={cn("w-8 h-8", role === "guide" ? "text-secondary" : "text-white")} />
                        </div>
                        <h3 className="text-xl font-bold text-center mb-2 text-white">{t.auth.guideTitle}</h3>
                        <p className="text-center text-blue-200 text-sm">
                            {t.auth.guideDesc}
                        </p>
                    </div>
                </div>

                <Button
                    className="w-full h-14 text-lg font-bold text-primary"
                    size="lg"
                    variant="secondary"
                    disabled={!role}
                    onClick={handleContinue}
                >
                    {t.auth.continue} {role ? (role === "tourist" ? "Tourist" : "Tour Guide") : "..."}
                </Button>

                <div className="mt-8 text-center text-sm text-blue-200">
                    {t.auth.noAccount}{" "}
                    <Link href="/login" className="text-secondary hover:text-yellow-300 hover:underline font-bold">
                        {t.auth.login}
                    </Link>
                </div>
            </div>
        </div>
    );
}
