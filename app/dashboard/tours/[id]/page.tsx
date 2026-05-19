"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Check, Clock, Globe, MapPin, Shield, Star, Users, X, CreditCard, QrCode, Building2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function TourDetailsPage() {
    const { t } = useLanguage();
    const { formatPrice } = useCurrency();
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [bookingStep, setBookingStep] = useState("method"); // method, confirm, processing, success
    const [selectedPayment, setSelectedPayment] = useState("crypto");

    const PRICE_PER_PERSON = 150;
    const SERVICE_FEE = 5;
    const totalGuests = 2; // Hardcoded for prototype
    const calculateTotal = () => (PRICE_PER_PERSON * totalGuests) + SERVICE_FEE;

    const handleBook = () => {
        setIsBookingOpen(true);
    };

    const confirmPayment = () => {
        setBookingStep("processing");
        setTimeout(() => {
            setBookingStep("success");
        }, 2000);
    };

    return (
        <div className="max-w-5xl mx-auto pb-20">
            {/* Back Button */}
            <Link href="/dashboard/tourist" className="inline-flex items-center text-slate-500 hover:text-primary mb-6 transition-colors font-medium">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Explore
            </Link>

            {/* Hero Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[400px] mb-8 rounded-3xl overflow-hidden">
                <div className="bg-slate-200 h-full relative group">
                    <Image
                        src="/tours/bali.png"
                        alt="Bali Waterfall"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-secondary/10 group-hover:bg-transparent transition-colors z-10" />
                </div>
                <div className="grid grid-rows-2 gap-4 h-full">
                    <div className="bg-slate-200 relative">
                        <Image
                            src="/tours/kyoto.png"
                            alt="Kyoto"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-200 relative">
                            <Image
                                src="/tours/swiss.png"
                                alt="Swiss"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="bg-slate-200 relative">
                            {/* Reusing Bali for now as 4th image */}
                            <Image
                                src="/tours/bali.png"
                                alt="Bali Detail"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-full">Adventure</span>
                            <div className="flex items-center text-yellow-500 text-sm font-bold">
                                <Star className="w-4 h-4 fill-current mr-1" />
                                4.9 (128 Reviews)
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold text-primary font-display mb-2">Hidden Gems of Bali: Waterfalls & Temples</h1>
                        <p className="text-slate-500 flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            Bali, Indonesia
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                                <Clock className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-bold">{t.dashboard.tourDetails.duration}</p>
                                <p className="font-bold text-slate-900">8 Hours</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                                <Users className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-bold">{t.dashboard.tourDetails.groupSize}</p>
                                <p className="font-bold text-slate-900">Max 6</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                                <Globe className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-bold">{t.dashboard.tourDetails.language}</p>
                                <p className="font-bold text-slate-900">English, ID</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.dashboard.tourDetails.aboutGuide}</h2>
                        <div className="flex items-center gap-4 p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
                            <div className="w-16 h-16 rounded-full bg-slate-200" />
                            <div className="flex-1">
                                <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                                    Budi Santoso
                                    <Shield className="w-4 h-4 text-green-500" />
                                </h3>
                                <p className="text-sm text-slate-500">{t.dashboard.tourDetails.verified}</p>
                            </div>
                            <Button variant="outline">View Profile</Button>
                        </div>
                        <p className="mt-4 text-slate-600 leading-relaxed">
                            Hi! I'm Budi, a local guide born and raised in Bali. I love showing travelers the secret spots that aren't on the usual tourist maps. I'm passionate about our culture, nature, and creating unforgettable memories.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.dashboard.tourDetails.itinerary}</h2>
                        <div className="space-y-6 relative border-l-2 border-slate-100 ml-3 pl-8 py-2">
                            <div className="relative">
                                <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-secondary border-4 border-white shadow-sm" />
                                <h3 className="font-bold text-slate-900 text-lg">Pick up at Hotel</h3>
                                <p className="text-slate-500 text-sm">08:00 AM</p>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-slate-200 border-4 border-white shadow-sm" />
                                <h3 className="font-bold text-slate-900 text-lg">Visit Tegenungan Waterfall</h3>
                                <p className="text-slate-500 text-sm">09:30 AM - Swim and take photos at this majestic waterfall.</p>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-slate-200 border-4 border-white shadow-sm" />
                                <h3 className="font-bold text-slate-900 text-lg">Traditional Lunch</h3>
                                <p className="text-slate-500 text-sm">12:00 PM - Enjoy Balinese Crispy Duck with rice field views.</p>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-slate-200 border-4 border-white shadow-sm" />
                                <h3 className="font-bold text-slate-900 text-lg">Sunset at Tanah Lot</h3>
                                <p className="text-slate-500 text-sm">05:00 PM - Watch the sunset at the iconic temple by the sea.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Booking Card */}
                <div className="lg:col-span-1">
                    <div className="sticky top-8 bg-white p-6 rounded-2xl border border-slate-100 shadow-xl shadow-blue-900/5">
                        <div className="flex items-end gap-1 mb-6">
                            <span className="text-3xl font-bold text-primary">{formatPrice(150)}</span>
                            <span className="text-slate-500 mb-1">/ {t.dashboard.tourDetails.perPerson}</span>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center cursor-pointer hover:border-primary transition-colors">
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-4 h-4 text-slate-400" />
                                    <span className="text-sm font-bold text-slate-900">Select Date</span>
                                </div>
                                <ArrowLeft className="w-4 h-4 rotate-180 text-slate-400" />
                            </div>
                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center cursor-pointer hover:border-primary transition-colors">
                                <div className="flex items-center gap-3">
                                    <Users className="w-4 h-4 text-slate-400" />
                                    <span className="text-sm font-bold text-slate-900">2 Guests</span>
                                </div>
                                <ArrowLeft className="w-4 h-4 rotate-180 text-slate-400" />
                            </div>
                        </div>

                        <div className="space-y-2 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">{formatPrice(PRICE_PER_PERSON)} x {totalGuests}</span>
                                <span className="text-slate-900 font-bold">{formatPrice(PRICE_PER_PERSON * totalGuests)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Service Fee</span>
                                <span className="text-slate-900 font-bold">{formatPrice(SERVICE_FEE)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold border-t border-slate-100 pt-2 mt-2">
                                <span className="text-primary">Total</span>
                                <span className="text-primary">{formatPrice(calculateTotal())}</span>
                            </div>
                        </div>

                        <Button size="lg" className="w-full font-bold h-12 text-lg shadow-lg shadow-secondary/20" onClick={handleBook}>
                            {t.dashboard.tourDetails.bookNow}
                        </Button>
                        <p className="text-xs text-center text-slate-400 mt-4 flex items-center justify-center gap-1">
                            <Shield className="w-3 h-3" />
                            Funds held securely in Escrow
                        </p>
                    </div>
                </div>
            </div>

            {/* Booking Modal */}
            <AnimatePresence>
                {isBookingOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-3xl p-0 max-w-md w-full shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            {/* Modal Header */}
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
                                <h2 className="text-xl font-bold text-slate-900">
                                    {bookingStep === "method" && "Select Payment"}
                                    {bookingStep === "confirm" && "Confirm Payment"}
                                    {bookingStep === "processing" && "Processing"}
                                    {bookingStep === "success" && "Booking Confirmed"}
                                </h2>
                                {bookingStep !== "processing" && bookingStep !== "success" && (
                                    <button onClick={() => setIsBookingOpen(false)} className="text-slate-400 hover:text-slate-900 transition-colors">
                                        <X className="w-6 h-6" />
                                    </button>
                                )}
                            </div>

                            {/* Modal Content */}
                            <div className="p-6 overflow-y-auto custom-scrollbar">
                                {bookingStep === "method" && (
                                    <div className="space-y-4">
                                        <p className="text-slate-500 text-sm mb-4">Choose how you want to pay. All transactions are secure and encrypted.</p>

                                        {/* Crypto / Web3 */}
                                        <div
                                            onClick={() => { setSelectedPayment("crypto"); setBookingStep("confirm"); }}
                                            className="group flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-orange-500 hover:bg-orange-50 cursor-pointer transition-all"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                                                    <Shield className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-slate-900">Crypto (ZTH)</h3>
                                                    <p className="text-xs text-slate-500">Secure Escrow via Smart Contract</p>
                                                </div>
                                            </div>
                                            <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Recommended</div>
                                        </div>

                                        {/* Credit Card / Visa */}
                                        <div
                                            onClick={() => { setSelectedPayment("visa"); setBookingStep("confirm"); }}
                                            className="group flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-blue-600 hover:bg-blue-50 cursor-pointer transition-all"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                                    <CreditCard className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-slate-900">Credit Card</h3>
                                                    <p className="text-xs text-slate-500">Visa, Mastercard, JCB</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-1">
                                                {/* Simulated Logos */}
                                                <div className="h-6 w-9 bg-blue-600 rounded flex items-center justify-center text-[8px] font-bold text-white italic">VISA</div>
                                            </div>
                                        </div>

                                        {/* Wise */}
                                        <div
                                            onClick={() => { setSelectedPayment("wise"); setBookingStep("confirm"); }}
                                            className="group flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-lime-500 hover:bg-lime-50 cursor-pointer transition-all"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-[#9FE870] flex items-center justify-center text-slate-900 group-hover:scale-110 transition-transform">
                                                    <Globe className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-slate-900">Wise</h3>
                                                    <p className="text-xs text-slate-500">Low fees international transfer</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* PayPal */}
                                        <div
                                            onClick={() => { setSelectedPayment("paypal"); setBookingStep("confirm"); }}
                                            className="group flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer transition-all"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#003087] group-hover:scale-110 transition-transform">
                                                    <span className="font-bold italic text-lg">P</span>
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-slate-900">PayPal</h3>
                                                    <p className="text-xs text-slate-500">Fast & Safe checkout</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* QRIS */}
                                        <div
                                            onClick={() => { setSelectedPayment("qris"); setBookingStep("confirm"); }}
                                            className="group flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-red-500 hover:bg-red-50 cursor-pointer transition-all"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
                                                    <QrCode className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-slate-900">QRIS</h3>
                                                    <p className="text-xs text-slate-500">GoPay, OVO, ShopeePay</p>
                                                </div>
                                            </div>
                                            <div className="h-6 px-2 bg-red-600 rounded flex items-center justify-center text-[10px] font-bold text-white">QRIS</div>
                                        </div>

                                        {/* Bank Transfer */}
                                        <div
                                            onClick={() => { setSelectedPayment("bank"); setBookingStep("confirm"); }}
                                            className="group flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 cursor-pointer transition-all"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                                                    <Building2 className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-slate-900">Bank Transfer</h3>
                                                    <p className="text-xs text-slate-500">BCA, Mandiri, BRI, BNI</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {bookingStep === "confirm" && (
                                    <>
                                        <div className="bg-slate-50 p-6 rounded-2xl mb-6 border border-slate-100">
                                            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-200">
                                                <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-md">
                                                    <Image src="/tours/bali.png" alt="Tour" fill className="object-cover" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-slate-900 text-sm leading-tight mb-1">Hidden Gems of Bali</h3>
                                                    <p className="text-xs text-slate-500">2 Guests • Feb 24, 2024</p>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-slate-500">Subtotal</span>
                                                    <span className="font-medium text-slate-900">{formatPrice(PRICE_PER_PERSON * totalGuests)}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-slate-500">Service Fee</span>
                                                    <span className="font-medium text-slate-900">{formatPrice(SERVICE_FEE)}</span>
                                                </div>
                                                <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                                                    <span className="font-bold text-slate-900">Total Amount</span>
                                                    <span className="font-bold text-2xl text-primary">{formatPrice(calculateTotal())}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 mb-6 p-3 bg-blue-50 text-blue-800 rounded-lg text-sm border border-blue-100">
                                            <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                                            Paying via <span className="font-bold uppercase">{selectedPayment}</span>
                                            <button onClick={() => setBookingStep("method")} className="ml-auto text-xs underline font-bold hover:text-blue-600">Change</button>
                                        </div>

                                        <Button className="w-full h-14 font-bold text-lg shadow-lg shadow-primary/20 rounded-xl" onClick={confirmPayment}>
                                            Pay {formatPrice(calculateTotal())}
                                        </Button>
                                    </>
                                )}

                                {bookingStep === "processing" && (
                                    <div className="flex flex-col items-center py-12">
                                        <div className="relative w-24 h-24 mb-6">
                                            <div className="absolute inset-0 border-4 border-slate-100 rounded-full" />
                                            <div className="absolute inset-0 border-4 border-t-primary rounded-full animate-spin" />
                                        </div>
                                        <h3 className="font-bold text-slate-900 text-xl mb-2">{t.dashboard.booking.processing}</h3>
                                        <p className="text-slate-500 text-center text-sm max-w-xs">Please wait while we securely process your payment...</p>
                                    </div>
                                )}

                                {bookingStep === "success" && (
                                    <div className="flex flex-col items-center py-6 text-center">
                                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-6 animate-bounce shadow-xl shadow-green-100">
                                            <Check className="w-12 h-12" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-slate-900 mb-2">{t.dashboard.booking.successTitle}</h2>
                                        <p className="text-slate-500 text-sm mb-8 leading-relaxed max-w-xs">{t.dashboard.booking.successDesc}</p>

                                        <div className="w-full space-y-3">
                                            <Button className="w-full h-12 rounded-xl font-bold">Download Receipt</Button>
                                            <Link href="/dashboard/tourist" className="block w-full">
                                                <Button variant="outline" className="w-full h-12 rounded-xl font-bold">
                                                    {t.dashboard.booking.back}
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
}
