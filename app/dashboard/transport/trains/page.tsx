"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { Button } from "@/components/ui/button";
import { searchTrains, TrainTrip } from "@/lib/transport";
import { ArrowLeft, ArrowRight, Train } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function TrainsContent() {
    const { t } = useLanguage();
    const { formatPrice } = useCurrency();
    const searchParams = useSearchParams();

    const [trains, setTrains] = useState<TrainTrip[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const from = searchParams.get("from") || "Gambir";
    const to = searchParams.get("to") || "Yogyakarta";
    const date = searchParams.get("date") || "Anytime";

    useEffect(() => {
        const fetchTrains = async () => {
            setIsLoading(true);
            const data = await searchTrains(from, to, date);
            setTrains(data);
            setIsLoading(false);
        };
        fetchTrains();
    }, [from, to, date]);

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <Link href="/dashboard/transport?active=train" className="inline-flex items-center text-slate-500 hover:text-primary mb-6 transition-colors font-medium">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Search
            </Link>

            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Trains to {to}</h1>
                    <p className="text-slate-500">Official KAI Schedule • {date}</p>
                </div>
                <div className="bg-orange-600 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg shadow-orange-500/30">
                    KAI Official Partner
                </div>
            </header>

            <div className="space-y-4">
                {isLoading ? (
                    [1, 2, 3].map((i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm animate-pulse h-40" />
                    ))
                ) : (
                    trains.map((train) => (
                        <div key={train.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                            {/* KAI Stripe Decoration */}
                            <div className="absolute top-0 left-0 w-1 h-full bg-orange-500" />

                            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pl-4">
                                {/* Train Info */}
                                <div className="w-full md:w-auto">
                                    <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                                        <Train className="w-5 h-5 text-orange-600" />
                                        {train.trainName}
                                    </h3>
                                    <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">{train.className} Class</p>
                                </div>

                                {/* Schedule */}
                                <div className="flex-1 flex items-center justify-center gap-4 w-full md:w-auto">
                                    <div className="text-center">
                                        <p className="text-xl font-bold text-slate-900">{train.departureTime}</p>
                                        <p className="text-xs font-bold text-slate-400">{train.fromStation}</p>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <p className="text-xs text-slate-400 mb-1">{train.duration}</p>
                                        <ArrowRight className="w-4 h-4 text-slate-200" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xl font-bold text-slate-900">{train.arrivalTime}</p>
                                        <p className="text-xs font-bold text-slate-400">{train.toStation}</p>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="text-right min-w-[120px]">
                                    <p className="text-2xl font-bold text-orange-600">{formatPrice(train.price)}</p>
                                    <Button className="w-full mt-2 font-bold bg-orange-600 hover:bg-orange-700 shadow-lg shadow-orange-500/20 text-white">
                                        Book Ticket
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default function TrainsPage() {
    return (
        <Suspense fallback={<div className="max-w-4xl mx-auto py-20 text-slate-500 animate-pulse text-center">Loading trains...</div>}>
            <TrainsContent />
        </Suspense>
    );
}
