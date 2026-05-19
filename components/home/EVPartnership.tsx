"use client";

import { motion } from "framer-motion";
import { Leaf, Zap, Car, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function EVPartnership() {
    const { language } = useLanguage();

    const isIndo = language === "id";

    const title = isIndo 
        ? "Kolaborasi Kendaraan Listrik (EV) Ramah Lingkungan" 
        : "Eco-Friendly Electric Vehicle (EV) Integration";

    const subtitle = isIndo
        ? "Explomate berkomitmen untuk pariwisata berkelanjutan. Kami bekerja sama dengan penyedia kendaraan listrik lokal untuk menghadirkan perjalanan bebas emisi bagi para wisatawan."
        : "Explomate is committed to sustainable tourism. We partner with local electric vehicle providers to bring zero-emission transport options to your travel journeys.";

    const benefits = [
        {
            icon: Car,
            title: isIndo ? "Armada EV Terintegrasi" : "Integrated EV Fleet",
            desc: isIndo 
                ? "Pesan mobil listrik, motor listrik, atau sepeda listrik langsung dari detail perjalanan Anda." 
                : "Book electric cars, motorbikes, or e-bikes directly from your tour booking details."
        },
        {
            icon: Zap,
            title: isIndo ? "Pembayaran Cepat dengan Blockchain" : "Seamless Payments",
            desc: isIndo 
                ? "Bayar sewa kendaraan listrik secara instan menggunakan token Zytherion dengan biaya gas terendah." 
                : "Pay for your EV rentals instantly using Zytherion tokens with minimal gas fees."
        },
        {
            icon: Leaf,
            title: isIndo ? "Kurangi Jejak Karbon" : "Zero Carbon Footprint",
            desc: isIndo 
                ? "Setiap perjalanan berkontribusi pada pelestarian alam lokal dan udara bersih." 
                : "Every mile you travel in our partner EVs helps keep local destinations clean and green."
        },
        {
            icon: ShieldCheck,
            title: isIndo ? "Keamanan & Pengisian Mudah" : "Safe & Easy Charging",
            desc: isIndo 
                ? "Akses peta stasiun pengisian daya EV langsung di aplikasi selama perjalanan berlangsung." 
                : "Access real-time EV charging station locations directly inside the Explomate app during your tour."
        }
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden border-t border-slate-100">
            {/* Soft Green Glow Backdrop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="container px-4 mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
                    {/* Left: Beautiful Real EV Car Image & Badging */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-full lg:w-1/2"
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl group border border-slate-100 aspect-[4/3]">
                            {/* EV Car Photo */}
                            <img 
                                src="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80"
                                alt="Modern Electric Vehicle"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            {/* Glassmorphic Badge Overlay */}
                            <div className="absolute bottom-6 left-6 right-6 p-5 bg-white/90 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg flex justify-between items-center">
                                <div>
                                    <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider mb-0.5">Eco Partnership</p>
                                    <p className="text-base font-bold text-slate-800">ION Mobility & Hyundai Ioniq</p>
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-500/20">
                                    <Leaf className="w-3.5 h-3.5" />
                                    <span>Eco Friendly</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Text & Key benefits */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-full lg:w-1/2"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 font-display">
                            {title}
                        </h2>
                        <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                            {subtitle}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-8">
                            {benefits.map((benefit, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-100/80 flex items-center justify-center text-emerald-600 font-bold mt-1">
                                        <benefit.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-1 text-base">{benefit.title}</h4>
                                        <p className="text-sm text-slate-500 leading-relaxed">{benefit.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
