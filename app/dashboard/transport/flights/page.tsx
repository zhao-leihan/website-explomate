"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { Button } from "@/components/ui/button";
import { searchFlights, Flight } from "@/lib/transport";
import { ArrowLeft, Clock, Plane } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function FlightsContent() {
    const { t } = useLanguage();
    const { formatPrice } = useCurrency();
    const searchParams = useSearchParams();

    const [flights, setFlights] = useState<Flight[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const from = searchParams.get("from") || "Jakarta";
    const to = searchParams.get("to") || "Bali";
    const date = searchParams.get("date") || "Anytime";

    useEffect(() => {
        const fetchFlights = async () => {
            setIsLoading(true);
            const data = await searchFlights(from, to, date);
            setFlights(data);
            setIsLoading(false);
        };
        fetchFlights();
    }, [from, to, date]);

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <Link href="/dashboard/transport" className="inline-flex items-center text-slate-500 hover:text-primary mb-6 transition-colors font-medium">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Search
            </Link>

            <header className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Flights to {to}</h1>
                <p className="text-slate-500">Showing best results for {date} • {flights.length} Flights found</p>
            </header>

            <div className="space-y-4">
                {isLoading ? (
                    // Skeleton Loading
                    [1, 2, 3].map((i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm animate-pulse">
                            <div className="h-6 bg-slate-100 rounded w-1/3 mb-4" />
                            <div className="h-20 bg-slate-50 rounded" />
                        </div>
                    ))
                ) : (
                    flights.map((flight) => (
                        <div key={flight.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                {/* Airline Info */}
                                <div className="flex items-center gap-4 w-full md:w-auto">
                                    <div className="w-16 h-16 relative flex-shrink-0 bg-white rounded-lg border border-slate-100 p-2 flex items-center justify-center">
                                        <img src={flight.airlineLogo} alt={flight.airline} className="max-w-full max-h-full object-contain" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">{flight.airline}</h3>
                                        <p className="text-xs text-slate-500 bg-slate-100 inline-block px-2 py-1 rounded mt-1">{flight.flightNumber}</p>
                                    </div>
                                </div>

                                {/* Flight Path */}
                                <div className="flex-1 flex items-center justify-center gap-6 w-full md:w-auto">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-slate-900">{flight.departureTime}</p>
                                        <p className="text-xs font-bold text-slate-400">{flight.from}</p>
                                    </div>
                                    <div className="flex flex-col items-center flex-1 max-w-[120px]">
                                        <p className="text-xs text-slate-400 mb-1">{flight.duration}</p>
                                        <div className="w-full h-[2px] bg-slate-200 relative">
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-1">
                                                <Plane className="w-4 h-4 text-slate-300 rotate-90" />
                                            </div>
                                            <div className="absolute w-2 h-2 rounded-full bg-slate-300 left-0 top-1/2 -translate-y-1/2" />
                                            <div className="absolute w-2 h-2 rounded-full bg-slate-300 right-0 top-1/2 -translate-y-1/2" />
                                        </div>
                                        <p className="text-xs text-green-600 font-bold mt-1">{flight.stops === 0 ? "Direct" : `${flight.stops} Stop(s)`}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-slate-900">{flight.arrivalTime}</p>
                                        <p className="text-xs font-bold text-slate-400">{flight.to}</p>
                                    </div>
                                </div>

                                {/* Price & Action */}
                                <div className="flex flex-col items-end gap-2 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                                    <p className="text-3xl font-bold text-primary">{formatPrice(flight.price)}</p>
                                    <p className="text-xs text-slate-400 mb-2">per person</p>
                                    <Button className="font-bold w-full md:w-auto shadow-lg shadow-primary/20">Select Flight</Button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default function FlightsPage() {
    return (
        <Suspense fallback={<div className="max-w-4xl mx-auto py-20 text-slate-500 animate-pulse text-center">Loading flights...</div>}>
            <FlightsContent />
        </Suspense>
    );
}
