"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, Wallet, Globe } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { t, language, setLanguage } = useLanguage();
    const pathname = usePathname();
    const isHome = pathname === "/";

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleLanguage = () => {
        setLanguage(language === "en" ? "id" : "en");
    };

    return (
        <nav className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
            (scrolled || !isHome) ? "bg-primary/95 backdrop-blur-md border-b border-white/10 shadow-sm py-2" : "bg-transparent py-4"
        )}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <Logo light={true} />
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/about" className="text-sm font-medium text-white/80 hover:text-secondary transition-colors">
                            {t.nav.about}
                        </Link>
                        <Link href="/guide" className="text-sm font-medium text-white/80 hover:text-secondary transition-colors">
                            {t.nav.becomeGuide}
                        </Link>

                        {/* Language Switcher */}
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-1 text-sm font-bold text-white/90 hover:text-secondary transition-colors"
                        >
                            <Globe className="w-4 h-4" />
                            {language.toUpperCase()}
                        </button>

                        <div className="h-6 w-px bg-white/20" />

                        <Link href="/auth/selection">
                            <Button variant="ghost" className="text-sm text-white hover:bg-white/10 hover:text-white">
                                {t.nav.login}
                            </Button>
                        </Link>
                        <Button variant="secondary" className="font-semibold shadow-none border-0">
                            {t.nav.connectWallet}
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-white p-2"
                        >
                            {mobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-primary border-b border-white/10">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        <Link href="/about" className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md">
                            {t.nav.about}
                        </Link>
                        <Link href="/guide" className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md">
                            {t.nav.becomeGuide}
                        </Link>
                        <button
                            onClick={toggleLanguage}
                            className="w-full text-left px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md flex items-center gap-2"
                        >
                            <Globe className="w-4 h-4" />
                            Switch to {language === "en" ? "Bahasa Indonesia" : "English"}
                        </button>
                        <div className="h-px bg-white/10 my-2" />
                        <Link href="/auth/selection" className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md">
                            {t.nav.login}
                        </Link>
                        <div className="px-3 pt-2">
                            <Button variant="secondary" className="w-full justify-center">
                                {t.nav.connectWallet}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
