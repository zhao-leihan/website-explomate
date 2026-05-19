"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Button } from "@/components/ui/button";
import { BookingsTable } from "@/components/guide/BookingsTable";
import { EarningsChart } from "@/components/guide/EarningsChart";
import { BarChart3, Calendar, Plus, Users, Wallet } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getTours, Tour } from "@/lib/tours";

export default function GuideDashboard() {
    const { t } = useLanguage();
    const [myTours, setMyTours] = useState<Tour[]>([]); // Use 'Tour' type

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const tourService = (await import('@/lib/services')).tourService;
                // Assuming we have a way to get current user ID or guide ID
                // For now, let's assume getMyTours handles it or we pass 'me'
                // The service definition expects guideId. 
                // We might need to get it from AuthService or profile.
                // Let's use a placeholder 'current' or fetch profile first
                // Actually, let's just fetch ALL tours for now or filtered by 'me' if backend supports it
                // API_CONFIG.TOUR_BY_GUIDE(guideId). 
                // Let's fetch profile first.
                const authService = (await import('@/lib/auth-service')).default;
                const user = authService.getStoredUser();
                if (user && user.id) {
                    const tours = await tourService.getMyTours(user.id);
                    // Map to UI model
                    const mappedTours: Tour[] = tours.map((t: any) => ({
                        id: t.id,
                        title: t.title,
                        location: `${t.city}, ${t.country}`,
                        rating: t.averageRating || 0,
                        price: t.pricing.basePrice,
                        duration: `${t.duration} Hours`,
                        image: t.imageUrl || '/tours/bali.png',
                        category: (t.type.charAt(0) + t.type.slice(1).toLowerCase()) as any,
                        description: t.description
                    }));
                    setMyTours(mappedTours);
                }
            } catch (e) {
                console.error("Failed to load guide tours", e);
            }
        };
        fetchTours();
    }, []);

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 font-display mb-1">{t.dashboard.guideTitle}</h1>
                    <p className="text-slate-500">{t.dashboard.guideSubtitle}</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2">
                        <Wallet className="w-4 h-4" />
                        Withdraw
                    </Button>
                    <Link href="/dashboard/guide/create-tour">
                        <Button className="gap-2 shadow-lg shadow-primary/20">
                            <Plus className="w-4 h-4" />
                            {t.dashboard.createTour}
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Analytics Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-slate-500">Total Revenue</h3>
                        <Wallet className="h-4 w-4 text-slate-500" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900">$45,231.89</div>
                    <p className="text-xs text-green-600 font-bold mt-1">+20.1% from last month</p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-slate-500">Bookings</h3>
                        <Users className="h-4 w-4 text-slate-500" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900">+2350</div>
                    <p className="text-xs text-green-600 font-bold mt-1">+180.1% from last month</p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-slate-500">Active Tours</h3>
                        <BarChart3 className="h-4 w-4 text-slate-500" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900">{myTours.length}</div>
                    <p className="text-xs text-slate-500 mt-1">Currently listed</p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-slate-500">Upcoming tours</h3>
                        <Calendar className="h-4 w-4 text-slate-500" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900">12</div>
                    <p className="text-xs text-slate-500 mt-1">In the next 7 days</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Chart Section */}
                <div className="col-span-4 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-6">Revenue Overview</h3>
                    <EarningsChart />
                </div>

                {/* Recent Sales/Bookings */}
                <div className="col-span-3 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-6">Recent Bookings</h3>
                    <BookingsTable />
                </div>
            </div>

            {/* Active Tours List */}
            <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">{t.dashboard.activeTours}</h2>
                {myTours.length === 0 ? (
                    <div className="bg-slate-50 rounded-2xl p-12 text-center border border-dashed border-slate-300">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <Plus className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">No tours created yet</h3>
                        <p className="text-slate-500 mb-6">Start earning by creating your first tour package.</p>
                        <Link href="/dashboard/guide/create-tour">
                            <Button>Create Tour</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {myTours.map((tour) => (
                            <div key={tour.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all group">
                                <div className="h-48 relative bg-slate-200">
                                    <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-slate-900">
                                        ${tour.price}
                                    </div>
                                    <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                                        Active
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-slate-900 mb-1 truncate">{tour.title}</h3>
                                    <p className="text-sm text-slate-500 mb-4 truncate">{tour.location}</p>

                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                                        <Button variant="outline" size="sm" className="flex-1 text-red-500 hover:text-red-600 hover:bg-red-50">Stop</Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
