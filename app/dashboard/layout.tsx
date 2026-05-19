"use client";

import { cn } from "@/lib/utils";
import { LayoutDashboard, Map, MessageSquare, Wallet, User, LogOut, Settings, Menu, X, Sparkles, History } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Logo } from "@/components/ui/logo";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useUserRole } from "@/components/providers/UserRoleProvider";
import { CircularNav } from "@/components/ui/CircularNav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { role } = useUserRole(); // Use global state
    const { t } = useLanguage();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const touristLinks = [
        { icon: Map, label: t.dashboard.sidebar.exploreTours, href: "/dashboard/tourist" },
        { icon: LayoutDashboard, label: t.dashboard.sidebar.transport, href: "/dashboard/transport" },
        { icon: Sparkles, label: t.dashboard.sidebar.aiAssistant, href: "/dashboard/ai" },
        { icon: History, label: t.dashboard.sidebar.transactions, href: "/dashboard/transactions" },
        { icon: MessageSquare, label: t.dashboard.sidebar.messages, href: "/dashboard/messages" },
        { icon: Wallet, label: t.dashboard.sidebar.wallet, href: "/dashboard/wallet" },
        { icon: User, label: t.dashboard.sidebar.profile, href: "/dashboard/profile" },
        { icon: Settings, label: t.dashboard.sidebar.settings, href: "/dashboard/settings" },
    ];

    const guideLinks = [
        { icon: LayoutDashboard, label: t.dashboard.sidebar.dashboard, href: "/dashboard/guide" },
        // { icon: Map, label: t.dashboard.sidebar.myTours, href: "/dashboard/guide" }, // Removed redundant
        { icon: MessageSquare, label: t.dashboard.sidebar.messages, href: "/dashboard/messages" },
        { icon: Wallet, label: t.dashboard.sidebar.wallet, href: "/dashboard/wallet" },
        { icon: User, label: t.dashboard.sidebar.profile, href: "/dashboard/profile" },
        { icon: Settings, label: t.dashboard.sidebar.settings, href: "/dashboard/settings" },
    ];

    const links = role === 'guide' ? guideLinks : touristLinks;

    // Close mobile menu on path change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const SidebarContent = () => (
        <>
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <Link href="/">
                    <Logo className="text-xl" light />
                </Link>
                {/* Mobile Close Button */}
                <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-white/70 hover:text-white">
                    <X className="w-6 h-6" />
                </button>
            </div>

            <div className="px-6 pt-6">
                <div className={cn("text-xs font-bold uppercase tracking-wider mb-2", role === 'guide' ? "text-emerald-400" : "text-blue-300")}>
                    {role === 'guide' ? "Guide Workspace" : "Tourist Mode"}
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-2 font-medium overflow-y-auto custom-scrollbar">
                {links.map((link) => {
                    const active = pathname === link.href || (link.href !== '/dashboard/guide' && link.href !== '/dashboard/tourist' && pathname.startsWith(link.href));
                    return (
                        <Link
                            key={link.label}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-all duration-200",
                                active
                                    ? "bg-white text-slate-900 shadow-md translate-x-1"
                                    : "text-white/70 hover:bg-white/10 hover:text-white hover:translate-x-1"
                            )}
                        >
                            <link.icon className={cn("w-5 h-5", active ? (role === 'guide' ? "text-slate-900" : "text-primary") : "text-white/70")} />
                            {link.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/10">
                <div className="flex items-center gap-3 mb-4 px-2">
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-slate-900 font-bold text-xs", role === 'guide' ? "bg-emerald-400" : "bg-secondary/80")}>
                        JD
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-bold text-white truncate">John Doe</p>
                        <p className={cn("text-xs truncate", role === 'guide' ? "text-emerald-400" : "text-blue-300")}>
                            {role === 'guide' ? "Guide Account" : "Tourist Account"}
                        </p>
                    </div>
                </div>

                <button className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-300 hover:bg-red-500/10 hover:text-red-200 rounded-xl w-full transition-colors">
                    <LogOut className="w-5 h-5" />
                    {t.dashboard.sidebar.logout}
                </button>
            </div>
        </>
    );

    return (
        <div className="min-h-screen bg-slate-50 relative font-sans">
            {/* Header / Logo (Top Left Absolute) */}
            <div className="absolute top-0 left-0 z-30 bg-primary p-4 pr-6 rounded-br-3xl shadow-xl border-b border-r border-white/10">
                <Link href="/">
                    <Logo className="text-xl" light />
                </Link>
            </div>

            {/* Main Content - Full Width */}
            <main className="w-full pt-24 px-4 md:px-8 pb-32 bg-slate-50 min-h-screen">
                {children}
            </main>

            {/* Circular Navigation (FAB) - Primary Nav */}
            <CircularNav role={role} />
        </div>
    );
}
