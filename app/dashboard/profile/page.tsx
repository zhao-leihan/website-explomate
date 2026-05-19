"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Button } from "@/components/ui/button";
import { Camera, Mail, MapPin, User } from "lucide-react";
import { useState, useEffect } from "react";

export default function ProfilePage() {
    const { t } = useLanguage();
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const authService = (await import('@/lib/auth-service')).default;
                // Try fetching fresh data first, callback to stored
                const userData = await authService.getCurrentUser();
                // If fetching fails, it usually throws. If userData is null, fallback.
                if (!userData) {
                    const stored = authService.getStoredUser() as any;
                    setUser(stored);
                } else {
                    setUser(userData);
                }
            } catch (e) {
                console.error("Failed to load profile", e);
                // Fallback to stored user on error
                try {
                    const authService = (await import('@/lib/auth-service')).default;
                    const stored = authService.getStoredUser() as any;
                    setUser(stored);
                } catch (err) { }
            } finally {
                setIsLoading(false);
            }
        };
        loadProfile();
    }, []);

    if (isLoading) return <div className="p-8 text-center">Loading profile...</div>;

    return (
        <div className="max-w-3xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-primary">{t.dashboard.profile.title}</h1>
                <p className="text-slate-500">{t.dashboard.profile.subtitle}</p>
            </header>

            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                {/* Cover Image */}
                <div className="h-32 bg-gradient-to-r from-blue-400 to-purple-400 relative">
                    <Button size="sm" variant="secondary" className="absolute bottom-4 right-4 text-xs h-8">
                        Change Cover
                    </Button>
                </div>

                <div className="px-8 pb-8">
                    <div className="relative -mt-12 mb-6 flex justify-between items-end">
                        <div className="relative group cursor-pointer lg:w-32 lg:h-32 w-24 h-24 rounded-full border-4 border-white bg-slate-200 overflow-hidden">
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera className="text-white w-6 h-6" />
                            </div>
                            {/* Avatar Placeholder */}
                            <div className="w-full h-full flex items-center justify-center bg-secondary/80 text-primary font-bold text-3xl">
                                {user?.profile?.firstName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                            </div>
                        </div>
                        <Button className="mb-2">{t.dashboard.profile.save}</Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">{t.dashboard.profile.name}</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        defaultValue={`${user?.profile?.firstName || ''} ${user?.profile?.lastName || ''}`}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Role</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">#</span>
                                    <input
                                        type="text"
                                        defaultValue={user?.role || 'User'}
                                        disabled
                                        className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-8 pr-4 py-3 text-sm focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">{t.dashboard.profile.email}</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="email"
                                        defaultValue={user?.email || ''}
                                        disabled
                                        className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Phone</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        defaultValue={user?.profile?.phone || ''}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-slate-100 pt-6">
                        <h3 className="font-bold text-slate-900 mb-4">Bio</h3>
                        <textarea
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:border-primary transition-colors h-32 resize-none"
                            defaultValue={user?.profile?.bio || ''}
                            placeholder="Tell us about yourself..."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
