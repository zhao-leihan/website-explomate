"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Button } from "@/components/ui/button";
import { Plane, Hotel, Train, Car, MapPin, Search, Zap, Leaf } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { AnimatedDatePicker } from "@/components/ui/AnimatedDatePicker";
import { EVMap } from "@/components/ui/EVMap";

export default function TransportPage() {
    const { t } = useLanguage();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"flight" | "hotel" | "train" | "car">("flight");

    // Search States
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState("");

    const handleSearch = () => {
        // Build query params
        const params = new URLSearchParams();
        if (origin) params.set("from", origin);
        if (destination) params.set("to", destination);
        if (date) params.set("date", date);

        // Redirect to specific sub-page
        const path = activeTab === "car" ? "transport" : `transport/${activeTab}s`; // 's' for plural (flights, hotels, trains)

        // Ensure path exists or handle differently. For this prototype, we'll build subpages.
        // Special case: Car might just stay on a modal or separate view. 
        // For now, let's assume we route to specific result pages.

        if (activeTab === "car") {
            // EV tab shows the live map directly below, no routing needed
            return;
        }

        router.push(`/dashboard/transport/${activeTab}s?${params.toString()}`);
    };

    return (
        <div className="max-w-6xl mx-auto pb-20">
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-bold text-primary font-display mb-3">Explore the World</h1>
                <p className="text-slate-500 text-lg">Book flights, hotels, trains, and rides all in one place with crypto.</p>
            </header>

            {/* Main Search Card */}
            <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 border border-slate-100 relative z-10">
                {/* Tabs */}
                <div className="flex border-b border-slate-100 rounded-t-3xl overflow-hidden">
                    <button
                        onClick={() => setActiveTab("flight")}
                        className={`flex-1 py-6 flex items-center justify-center gap-2 font-bold transition-all ${activeTab === 'flight' ? 'bg-primary text-white' : 'hover:bg-slate-50 text-slate-500'}`}
                    >
                        <Plane className={`w-5 h-5 ${activeTab === 'flight' ? 'fill-current' : ''}`} />
                        Flights
                    </button>
                    <button
                        onClick={() => setActiveTab("hotel")}
                        className={`flex-1 py-6 flex items-center justify-center gap-2 font-bold transition-all ${activeTab === 'hotel' ? 'bg-primary text-white' : 'hover:bg-slate-50 text-slate-500'}`}
                    >
                        <Hotel className={`w-5 h-5 ${activeTab === 'hotel' ? 'fill-current' : ''}`} />
                        Hotels
                    </button>
                    <button
                        onClick={() => setActiveTab("train")}
                        className={`flex-1 py-6 flex items-center justify-center gap-2 font-bold transition-all ${activeTab === 'train' ? 'bg-primary text-white' : 'hover:bg-slate-50 text-slate-500'}`}
                    >
                        <Train className={`w-5 h-5 ${activeTab === 'train' ? 'fill-current' : ''}`} />
                        Trains (KAI)
                    </button>
                    <button
                        onClick={() => setActiveTab("car")}
                        className={`flex-1 py-6 flex items-center justify-center gap-2 font-bold transition-all ${activeTab === 'car' ? 'bg-primary text-white' : 'hover:bg-slate-50 text-slate-500'}`}
                    >
                        <Car className={`w-5 h-5 ${activeTab === 'car' ? 'fill-current' : ''}`} />
                        Transport
                    </button>
                </div>

                {/* Form Content */}
                <div className="p-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="grid grid-cols-1 md:grid-cols-12 gap-4"
                        >
                            {/* Origin Input (Not for Hotel) */}
                            {activeTab !== "hotel" && (
                                <div className="md:col-span-3">
                                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">From</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <MapPin className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                        </div>
                                        <input
                                            type="text"
                                            className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-black placeholder:text-gray-400 font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                            placeholder={activeTab === 'train' ? "Gambir (GMR)" : "Jakarta (CGK)"}
                                            value={origin}
                                            onChange={(e) => setOrigin(e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Destination / Location Input */}
                            <div className={activeTab === "hotel" ? "md:col-span-6" : "md:col-span-4"}>
                                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
                                    {activeTab === "hotel" ? "Where to?" : "To"}
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <MapPin className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-black placeholder:text-gray-400 font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                        placeholder={activeTab === 'hotel' ? "Bali, Indonesia" : activeTab === 'train' ? "Yogyakarta (YK)" : "Denpasar (DPS)"}
                                        value={destination}
                                        onChange={(e) => setDestination(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Date Input */}
                            <div className={activeTab === "hotel" ? "md:col-span-4" : "md:col-span-3"}>
                                <AnimatedDatePicker
                                    label="Date"
                                    value={date}
                                    onChange={setDate}
                                    placeholder="dd/mm/yyyy"
                                />
                            </div>

                            {/* Search Button */}
                            <div className="md:col-span-2 flex items-end">
                                <Button size="lg" className="w-full h-[58px] rounded-xl font-bold text-lg shadow-lg shadow-primary/25" onClick={handleSearch}>
                                    <Search className="w-5 h-5 mr-2" />
                                    Search
                                </Button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* ── EV MAP SECTION (shown when car tab is active) ─────── */}
            <AnimatePresence>
                {activeTab === "car" && (
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 16 }}
                        transition={{ duration: 0.4 }}
                        className="mt-8"
                    >
                        {/* EV promo header */}
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center">
                                        <Zap className="w-4 h-4 text-emerald-600" />
                                    </span>
                                    EV Terdekat di Sekitar Anda
                                </h2>
                                <p className="text-slate-500 text-sm mt-1">Klik pada kendaraan untuk melihat detail driver dan memesan</p>
                            </div>
                            <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-200">
                                <Leaf className="w-3.5 h-3.5" />
                                Zero Emission
                            </div>
                        </div>

                        {/* The animated live EV map */}
                        <EVMap />

                        {/* Quick stats row */}
                        <div className="grid grid-cols-3 gap-4 mt-5">
                            {[
                                { label: "Driver Aktif", value: "4", unit: "online", color: "text-indigo-600", bg: "bg-indigo-50" },
                                { label: "Rata-rata ETA", value: "5", unit: "menit", color: "text-emerald-600", bg: "bg-emerald-50" },
                                { label: "CO₂ Dikurangi", value: "12.8", unit: "kg/hari", color: "text-sky-600", bg: "bg-sky-50" },
                            ].map(s => (
                                <div key={s.label} className={`${s.bg} rounded-2xl p-4 text-center border border-white/60`}>
                                    <p className={`text-2xl font-bold ${s.color}`}>{s.value} <span className="text-sm font-medium">{s.unit}</span></p>
                                    <p className="text-xs text-slate-500 font-semibold mt-0.5">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Popular Destinations for Indonesia (hide when car tab active) */}
            {activeTab !== "car" && (
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Popular in Indonesia</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { name: "Bali", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80" },
                            { name: "Yogyakarta", img: "https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&w=600&q=80" },
                            { name: "Labuan Bajo", img: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=600&q=80" },
                            { name: "Raja Ampat", img: "https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?auto=format&fit=crop&w=600&q=80" },
                        ].map(({ name, img }) => (
                            <div key={name} className="relative aspect-[3/4] rounded-2xl overflow-hidden group cursor-pointer">
                                <img src={img} alt={name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-6">
                                    <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
                                    <p className="text-white/80 text-sm flex items-center gap-1">
                                        <Plane className="w-3 h-3" /> Flight from 1.2M IDR
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
