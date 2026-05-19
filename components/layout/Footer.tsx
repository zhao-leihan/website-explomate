"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Github, Heart } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { useLanguage } from "@/components/providers/LanguageProvider";

export const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="bg-slate-900 text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="inline-block mb-6">
                            <Logo className="text-2xl" light />
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            {t.footer.description}
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-primary hover:text-white transition-colors">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-primary hover:text-white transition-colors">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-primary hover:text-white transition-colors">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-primary hover:text-white transition-colors">
                                <Github className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Link */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">{t.footer.explore}</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><Link href="#" className="hover:text-primary transition-colors">{t.footer.destinations}</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">{t.footer.tours}</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">{t.footer.guides}</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">{t.footer.flights}</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">{t.footer.company}</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><Link href="/about" className="hover:text-primary transition-colors">{t.footer.about}</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">{t.footer.careers}</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">{t.footer.privacy}</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">{t.footer.terms}</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">{t.footer.contact}</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li>support@explomate.com</li>
                            <li>+62 812 3456 7890</li>
                            <li>Jakarta, Indonesia</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
                    <p>&copy; {new Date().getFullYear()} Explomate. {t.footer.rights}</p>
                    <p className="flex items-center gap-1 mt-2 md:mt-0">
                        {t.footer.madeWith} <Heart className="w-3 h-3 text-red-500 fill-red-500" /> {t.footer.by} <span className="text-slate-300">Explomate Team</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};
