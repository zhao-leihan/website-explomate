"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { Button } from "@/components/ui/button";
import { searchHotels, HotelData } from "@/lib/transport";
import { ArrowLeft, MapPin, Star, Wifi, Coffee, Waves } from "lucide-react"; // Waves as Pool replacement if needed, or stick to simple icons
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Image from "next/image";

function HotelsContent() {
    const { t } = useLanguage();
    const { formatPrice } = useCurrency();
    const searchParams = useSearchParams();

    const [hotels, setHotels] = useState<HotelData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const location = searchParams.get("to") || "Bali";
    const date = searchParams.get("date") || "Anytime";

    useEffect(() => {
        const fetchHotels = async () => {
            setIsLoading(true);
            const data = await searchHotels(location, date);
            setHotels(data);
            setIsLoading(false);
        };
        fetchHotels();
    }, [location, date]);

    return (
        <div className="max-w-6xl mx-auto pb-20">
            <Link href="/dashboard/transport?active=hotel" className="inline-flex items-center text-slate-500 hover:text-primary mb-6 transition-colors font-medium">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Search
            </Link>

            <header className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Stays in {location}</h1>
                <p className="text-slate-500">Showing best available properties for {date}</p>
            </header>

            <div className="grid grid-cols-1 gap-6">
                {isLoading ? (
                    [1, 2, 3].map((i) => (
                        <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm animate-pulse h-64" />
                    ))
                ) : (
                    hotels.map((hotel) => (
                        <div key={hotel.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6 group">
                            {/* Image */}
                            <div className="w-full md:w-72 h-48 md:h-auto relative rounded-xl overflow-hidden flex-shrink-0">
                                <Image src={hotel.image} alt={hotel.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-slate-900 flex items-center shadow-sm">
                                    <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
                                    {hotel.rating} ({hotel.reviews})
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex-1 py-2 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-1">{hotel.name}</h3>
                                    <p className="text-slate-500 text-sm flex items-center mb-4">
                                        <MapPin className="w-3 h-3 mr-1" />
                                        {hotel.location}
                                    </p>

                                    {/* Amenities */}
                                    <div className="flex flex-wrap gap-2">
                                        {hotel.amenities.includes("Wifi") && (
                                            <span className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-600 flex items-center">
                                                <Wifi className="w-3 h-3 mr-1" /> Free Wifi
                                            </span>
                                        )}
                                        {hotel.amenities.includes("Breakfast") && (
                                            <span className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-600 flex items-center">
                                                <Coffee className="w-3 h-3 mr-1" /> Breakfast
                                            </span>
                                        )}
                                        {hotel.amenities.includes("Pool") && (
                                            <span className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-600 flex items-center">
                                                <Waves className="w-3 h-3 mr-1" /> Pool
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-end justify-between mt-6 md:mt-0">
                                    <div className="text-green-600 text-sm font-bold bg-green-50 px-3 py-1 rounded-lg">
                                        Free Cancellation available
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-primary">{formatPrice(hotel.pricePerNight)}</p>
                                        <p className="text-xs text-slate-400 mb-2">per night</p>
                                        <Button className="font-bold shadow-lg shadow-primary/20">View Deal</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default function HotelsPage() {
    return (
        <Suspense fallback={<div className="max-w-6xl mx-auto py-20 text-slate-500 animate-pulse text-center">Loading hotels...</div>}>
            <HotelsContent />
        </Suspense>
    );
}
