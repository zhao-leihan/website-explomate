"use client";

import { Button } from "@/components/ui/button";
import { Search, MapPin, Star, Clock, Filter } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getTours, Tour } from "@/lib/tours";
import { motion, AnimatePresence } from "framer-motion";

export default function TouristDashboard() {
    const { t } = useLanguage();
    const { formatPrice } = useCurrency();
    const [tours, setTours] = useState<Tour[]>([]);
    const [filteredTours, setFilteredTours] = useState<Tour[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = ["All", "Adventure", "Culture", "Food", "Nature"];

    useEffect(() => {
        // Initialize tours
        const loadTours = async () => {
            try {
                const tourService = (await import('@/lib/services')).tourService;
                const activeTours = await tourService.getAllTours();
                // Map API response to UI model if needed (assuming backend matches or we adapt)
                // Here we assume backend returns list that matches UI or we map it
                const mappedTours: Tour[] = activeTours.map((t: any) => ({
                    id: t.id,
                    title: t.title,
                    location: `${t.city}, ${t.country}`,
                    rating: t.averageRating,
                    price: t.pricing.basePrice,
                    duration: `${t.duration} Hours`,
                    image: t.imageUrl || '/tours/bali.png', // Fallback image
                    category: t.type.charAt(0) + t.type.slice(1).toLowerCase(), // CAPITAL -> Title Case
                    description: t.description
                })) as any;

                setTours(mappedTours);
                setFilteredTours(mappedTours);
            } catch (error) {
                console.warn("Failed to load tours from backend, falling back to local mocks", error);
                const localTours = getTours();
                setTours(localTours);
                setFilteredTours(localTours);
            }
        };
        loadTours();
    }, []);

    useEffect(() => {
        // Filter logic
        let result = tours;

        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            result = result.filter(t =>
                t.title.toLowerCase().includes(lowerQuery) ||
                t.location.toLowerCase().includes(lowerQuery)
            );
        }

        if (selectedCategory !== "All") {
            result = result.filter(t => t.category === selectedCategory);
        }

        setFilteredTours(result);
    }, [searchQuery, selectedCategory, tours]);

    return (
        <div className="pb-20">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-primary">{t.dashboard.exploreTitle}</h1>
                    <p className="text-slate-500">{t.dashboard.exploreSubtitle}</p>
                </div>
                <div className="flex items-center gap-4">
                    {/* Wallet Status */}
                    <div className="px-4 py-2 bg-white border border-blue-100 shadow-sm rounded-full text-sm font-medium flex items-center gap-2 text-primary">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Connected: 0x123...456
                    </div>
                </div>
            </header>

            {/* Search & Filter Bar */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-blue-100 flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex-1 flex items-center gap-3 px-4 bg-slate-50 rounded-xl border border-transparent focus-within:border-primary/20 transition-all">
                    <Search className="text-primary/50" />
                    <input
                        type="text"
                        placeholder={t.dashboard.searchPlaceholder}
                        className="bg-transparent w-full py-3 focus:outline-none text-black placeholder:text-slate-600"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Category Pills (Mobile Scrollable) */}
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${selectedCategory === cat
                                ? "bg-primary text-white shadow-md shadow-primary/20"
                                : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Featured Tours Grid */}
            <section>
                <div className="flex justify-between items-end mb-6">
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-secondary rounded-full" />
                        {selectedCategory === "All" ? t.dashboard.featured : `${selectedCategory} Tours`}
                    </h2>
                    <p className="text-sm text-slate-400 font-bold">{filteredTours.length} Results</p>
                </div>

                {filteredTours.length > 0 ? (
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        <AnimatePresence>
                            {filteredTours.map((tour) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                    key={tour.id}
                                >
                                    <Link href={`/dashboard/tours/${tour.id}`}>
                                        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-blue-500/10 transition-all group cursor-pointer hover:-translate-y-1 h-full">
                                            <div className="h-48 relative">
                                                <Image
                                                    src={tour.image}
                                                    alt={tour.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold text-slate-900 flex items-center gap-1 shadow-sm z-10">
                                                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                                    {tour.rating > 0 ? tour.rating : "New"}
                                                </div>
                                                <div className="absolute top-4 left-4 bg-secondary/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold text-white shadow-sm z-10">
                                                    {tour.category}
                                                </div>
                                            </div>
                                            <div className="p-5">
                                                <div className="flex items-start justify-between mb-2">
                                                    <h3 className="font-bold text-lg text-slate-900 line-clamp-1 group-hover:text-primary transition-colors">{tour.title}</h3>
                                                </div>
                                                <div className="flex items-center text-slate-500 text-sm mb-4">
                                                    <MapPin className="w-4 h-4 mr-1 text-secondary" />
                                                    {tour.location}
                                                </div>

                                                <div className="flex items-center justify-between pt-4 border-t border-slate-50 group-hover:border-blue-50 transition-colors">
                                                    <div className="text-xs text-slate-500 flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        {tour.duration}
                                                    </div>
                                                    <div className="text-primary font-bold bg-blue-50 px-3 py-1 rounded-lg">
                                                        {formatPrice(tour.price)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                            <Search className="w-10 h-10" />
                        </div>
                        <h3 className="font-bold text-slate-900 text-lg">No tours found</h3>
                        <p className="text-slate-500">Try adjusting your search or filters.</p>
                        <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedCategory("All");
                            }}
                        >
                            Clear Filters
                        </Button>
                    </div>
                )}
            </section>
        </div>
    );
}
