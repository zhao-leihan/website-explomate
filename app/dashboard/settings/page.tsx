"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { Button } from "@/components/ui/button";
import { Bell, Globe, Lock, Moon, Shield } from "lucide-react";

export default function SettingsPage() {
    const { t, language, setLanguage } = useLanguage();
    const { currency, setCurrency } = useCurrency();

    return (
        <div className="max-w-2xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-primary">{t.dashboard.settings.title}</h1>
                <p className="text-slate-500">{t.dashboard.settings.subtitle}</p>
            </header>

            <div className="space-y-6">
                {/* Language Settings */}
                <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                            <Globe className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900">{t.dashboard.settings.language}</h3>
                            <p className="text-xs text-slate-500">Select your preferred language.</p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            variant={language === 'en' ? 'secondary' : 'outline'}
                            onClick={() => setLanguage('en')}
                            className="flex-1"
                        >
                            English
                        </Button>
                        <Button
                            variant={language === 'id' ? 'secondary' : 'outline'}
                            onClick={() => setLanguage('id')}
                            className="flex-1"
                        >
                            Bahasa Indonesia
                        </Button>
                    </div>
                </div>

                {/* Currency Settings */}
                <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                            <span className="text-green-600 font-bold">$</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900">{t.dashboard.settings.currency}</h3>
                            <p className="text-xs text-slate-500">Select your preferred display currency.</p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            variant={currency === 'ZTH' ? 'secondary' : 'outline'}
                            onClick={() => setCurrency('ZTH')}
                            className="flex-1"
                        >
                            ZTH
                        </Button>
                        <Button
                            variant={currency === 'USD' ? 'secondary' : 'outline'}
                            onClick={() => setCurrency('USD')}
                            className="flex-1"
                        >
                            USD
                        </Button>
                        <Button
                            variant={currency === 'IDR' ? 'secondary' : 'outline'}
                            onClick={() => setCurrency('IDR')}
                            className="flex-1"
                        >
                            IDR
                        </Button>
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                            <Bell className="w-5 h-5 text-orange-500" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900">{t.dashboard.settings.notifications}</h3>
                            <p className="text-xs text-slate-500">Manage how you receive alerts.</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                            <span className="text-sm font-medium text-slate-700">Email Notifications</span>
                            <div className="w-10 h-5 bg-green-500 rounded-full relative cursor-pointer">
                                <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                            <span className="text-sm font-medium text-slate-700">Push Notifications</span>
                            <div className="w-10 h-5 bg-slate-300 rounded-full relative cursor-pointer">
                                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security */}
                <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-red-500" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900">Security</h3>
                            <p className="text-xs text-slate-500">Protect your account and assets.</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start text-slate-700 hover:text-red-600 hover:bg-red-50 border-slate-200">
                            <Lock className="w-4 h-4 mr-2" />
                            Change Password
                        </Button>
                        <Button variant="outline" className="w-full justify-start text-slate-700 hover:text-red-600 hover:bg-red-50 border-slate-200">
                            <Shield className="w-4 h-4 mr-2" />
                            Enable 2FA
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
