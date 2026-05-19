"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus, LayoutDashboard, Map, MessageSquare, Wallet, User, Settings, Sparkles, History } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useUserRole } from "@/components/providers/UserRoleProvider";

interface CircularNavProps {
    role?: string;
}

export function CircularNav({ role }: CircularNavProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { role: contextRole } = useUserRole();
    const { t } = useLanguage();
    const pathname = usePathname();

    const activeRole = role || contextRole;

    // Auto-close menu when path changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

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
        { icon: MessageSquare, label: t.dashboard.sidebar.messages, href: "/dashboard/messages" },
        { icon: Wallet, label: t.dashboard.sidebar.wallet, href: "/dashboard/wallet" },
        { icon: User, label: t.dashboard.sidebar.profile, href: "/dashboard/profile" },
        { icon: Settings, label: t.dashboard.sidebar.settings, href: "/dashboard/settings" },
    ];

    const menuItems = activeRole === "guide" ? guideLinks : touristLinks;

    // Toggle Menu
    const toggleMenu = () => setIsOpen(!isOpen);

    const spacing = 60; // Vertical spacing between items - Stacked upwards

    return (
        <div className="fixed bottom-8 right-8 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Menu Items */}
            <div className="relative z-50">
                <AnimatePresence>
                    {isOpen && menuItems.map((item, index) => {
                        const y = -(index + 1) * spacing;
                        const isActive = pathname === item.href || (item.href !== '/dashboard/guide' && item.href !== '/dashboard/tourist' && pathname.startsWith(item.href));

                        return (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, scale: 0, y: 0 }}
                                animate={{ opacity: 1, scale: 1, y }}
                                exit={{ opacity: 0, scale: 0, y: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.05 }}
                                className="absolute left-0 top-0"
                            >
                                <Link
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "flex flex-col items-center justify-center w-14 h-14 rounded-full shadow-xl border-2 hover:scale-110 transition-all group",
                                        isActive
                                            ? "bg-primary text-white border-primary"
                                            : "bg-white text-slate-900 border-slate-100 hover:border-primary"
                                    )}
                                    style={{ marginLeft: -28, marginTop: -28 }} // Center anchor relative to 0,0
                                >
                                    <item.icon className={cn(
                                        "w-5 h-5 transition-colors",
                                        isActive ? "text-white" : "text-slate-600 group-hover:text-primary"
                                    )} />
                                    <span className={cn(
                                        "text-[9px] font-bold mt-1 max-w-[40px] truncate transition-colors",
                                        isActive ? "text-white" : "text-slate-500 group-hover:text-primary"
                                    )}>
                                        {item.label}
                                    </span>
                                </Link>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                {/* Main Toggle Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleMenu}
                    className={cn(
                        "relative flex items-center justify-center w-16 h-16 rounded-full shadow-2xl transition-colors z-[60] cursor-pointer",
                        isOpen ? "bg-red-500 text-white" : "bg-primary text-white"
                    )}
                >
                    <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <Plus className="w-8 h-8" />
                    </motion.div>
                </motion.button>
            </div>
        </div>
    );
}

