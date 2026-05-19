"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AIResponse, generateAIResponse, Itinerary } from "@/lib/ai-planner";
import { Bot, MapPin, Plane, Send, Sparkles, User as UserIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    id: number;
    role: "user" | "ai";
    content: AIResponse[];
}

export default function AIPage() {
    const { t } = useLanguage();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 0,
            role: "ai",
            content: [{
                type: "text",
                text: "Hi! I'm Explomate AI. I can help you plan your dream vacation. Where do you want to go today?",
                chips: ["Plan a trip to Bali", "Find hotels in Jakarta", "Best tours in Kyoto"]
            }]
        }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async (text: string = input) => {
        if (!text.trim()) return;

        const userMsg: Message = { id: Date.now(), role: "user", content: [{ type: "text", text: text }] };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Simulate AI
        const responses = await generateAIResponse(text);

        setIsTyping(false);
        const aiMsg: Message = { id: Date.now() + 1, role: "ai", content: responses };
        setMessages(prev => [...prev, aiMsg]);
    };

    return (
        <div className="max-w-4xl mx-auto h-[calc(100vh-100px)] flex flex-col bg-slate-50/80 backdrop-blur-md rounded-3xl shadow-lg border border-white/20 overflow-hidden relative">

            {/* Header */}
            <header className="p-4 border-b border-white/10 flex items-center gap-4 bg-white/80 backdrop-blur-sm z-10 sticky top-0 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                    <h1 className="font-bold text-slate-900 text-lg">Explomate AI Assistant</h1>
                    <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        Online & Ready to Plan
                    </p>
                </div>
            </header>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scroll-smooth z-0" ref={scrollRef}>
                <AnimatePresence>
                    {messages.map((msg) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            key={msg.id}
                            className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                        >
                            {/* Avatar */}
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border-2 border-white ${msg.role === "ai" ? "bg-gradient-to-br from-white to-slate-50 text-indigo-600" : "bg-gradient-to-br from-slate-200 to-slate-300 text-slate-600"}`}>
                                {msg.role === "ai" ? <Bot className="w-6 h-6" /> : <UserIcon className="w-5 h-5" />}
                            </div>

                            {/* Content */}
                            <div className={`space-y-3 max-w-[85%] ${msg.role === "user" ? "items-end flex flex-col" : ""}`}>
                                {msg.content.map((block, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: msg.role === "ai" ? -10 : 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 + 0.2 }}
                                    >
                                        {/* Text Bubble */}
                                        {block.type === "text" && (
                                            <div className={`p-5 rounded-2xl text-[15px] leading-relaxed shadow-sm backdrop-blur-sm ${msg.role === "user"
                                                ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-tr-none shadow-indigo-500/20"
                                                : "bg-white/80 text-slate-700 rounded-tl-none border border-white/50 shadow-slate-200/50"
                                                }`}>
                                                {block.text}
                                            </div>
                                        )}

                                        {/* Itinerary Widget */}
                                        {block.type === "itinerary" && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="bg-white/90 backdrop-blur-sm rounded-3xl border border-white/50 overflow-hidden w-full md:min-w-[450px] shadow-lg shadow-slate-200/50 mt-2"
                                            >
                                                <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 p-5 border-b border-orange-100/50">
                                                    <h3 className="font-bold text-orange-900 flex items-center gap-2 text-lg">
                                                        <MapPin className="w-5 h-5 text-orange-600" />
                                                        {(block.data as Itinerary).title}
                                                    </h3>
                                                </div>
                                                <div className="p-5 space-y-8">
                                                    {(block.data as Itinerary).days.map((day, i) => (
                                                        <div key={day.day} className="relative pl-8 border-l-2 border-slate-100 last:border-0 hover:border-indigo-200 transition-colors">
                                                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500 ring-4 ring-white shadow-sm" />
                                                            <h4 className="font-bold text-slate-900 mb-3 text-base">Day {day.day}: {day.title}</h4>
                                                            <ul className="space-y-3">
                                                                {day.activities.map((act, j) => (
                                                                    <li key={j} className="text-sm text-slate-600 flex items-start gap-3 bg-slate-50/50 p-3 rounded-xl border border-slate-100 hover:bg-white hover:shadow-sm transition-all">
                                                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 flex-shrink-0" />
                                                                        {act}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="p-5 border-t border-slate-100 bg-slate-50/50 text-center">
                                                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 h-10 font-semibold rounded-xl">Book This Itinerary</Button>
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* Product Carousel */}
                                        {block.type === "product-carousel" && (
                                            <div className="flex gap-4 overflow-x-auto pb-6 pt-2 -mx-6 px-6 snap-x hide-scrollbar">
                                                {block.data.items.map((item: any) => (
                                                    <motion.div
                                                        key={item.id}
                                                        whileHover={{ y: -5 }}
                                                        className="min-w-[260px] bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-md shadow-slate-200/50 snap-center group cursor-pointer"
                                                    >
                                                        <div className="h-36 bg-slate-200 relative overflow-hidden">
                                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10" />
                                                            <img src={item.image || "/tours/bali.png"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                            <div className="absolute top-3 right-3 z-20 bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1">
                                                                <span className="text-green-600">$</span> {item.price || item.pricePerNight}
                                                            </div>
                                                        </div>
                                                        <div className="p-4">
                                                            <h4 className="font-bold text-slate-900 truncate text-base mb-1">{item.name || item.title}</h4>
                                                            <p className="text-xs text-slate-500 mb-3 flex items-center gap-1">
                                                                <MapPin className="w-3 h-3" />
                                                                {item.location}
                                                            </p>
                                                            <Button size="sm" variant="outline" className="w-full rounded-lg border-indigo-100 hover:bg-indigo-50 hover:text-indigo-600 font-medium">View Details</Button>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Suggestions Chips */}
                                        {block.chips && block.chips.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {block.chips.map((chip, idx) => (
                                                    <motion.button
                                                        key={chip}
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: 0.3 + (idx * 0.05) }}
                                                        onClick={() => handleSend(chip)}
                                                        className="text-xs bg-white/80 backdrop-blur-sm text-indigo-600 px-4 py-2 rounded-full hover:bg-indigo-600 hover:text-white transition-all font-medium border border-indigo-100 shadow-sm hover:shadow-indigo-500/30"
                                                    >
                                                        {chip}
                                                    </motion.button>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}

                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex gap-4"
                        >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white to-slate-50 text-indigo-600 flex items-center justify-center flex-shrink-0 shadow-sm border border-white">
                                <Bot className="w-6 h-6" />
                            </div>
                            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl rounded-tl-none border border-white/50 shadow-sm flex items-center gap-1.5 h-[46px]">
                                <motion.span
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
                                    className="w-1.5 h-1.5 bg-slate-400 rounded-full"
                                />
                                <motion.span
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.1 }}
                                    className="w-1.5 h-1.5 bg-slate-400 rounded-full"
                                />
                                <motion.span
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.2 }}
                                    className="w-1.5 h-1.5 bg-slate-400 rounded-full"
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/80 backdrop-blur-lg border-t border-white/20 z-10">
                <form
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="flex gap-3 items-center bg-white border border-slate-200 p-2 pl-4 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-indigo-500/30 focus-within:border-indigo-500 transition-all"
                >
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask Explomate AI regarding your trip..."
                        className="flex-1 bg-transparent border-none focus:ring-0 text-slate-900 placeholder:text-slate-400 text-sm font-medium"
                    />
                    <Button type="submit" size="icon" className="h-10 w-10 rounded-xl shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95">
                        <Send className="w-4 h-4" />
                    </Button>
                </form>
            </div>
        </div>
    );
}
