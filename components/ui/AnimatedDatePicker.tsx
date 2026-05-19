"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnimatedDatePickerProps {
    value: string;
    onChange: (date: string) => void;
    label?: string;
    placeholder?: string;
}

export function AnimatedDatePicker({ value, onChange, label = "Date", placeholder = "Select Date" }: AnimatedDatePickerProps) {
    const [viewDate, setViewDate] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);

    // Helpers
    const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const handlePrevMonth = () => {
        const newDate = new Date(viewDate);
        newDate.setMonth(newDate.getMonth() - 1);
        // Prevent going back past current month if needed, but for now just allow navigation
        // Optional: Check if newDate < today's month/year
        setViewDate(newDate);
    };

    const handleNextMonth = () => {
        const newDate = new Date(viewDate);
        newDate.setMonth(newDate.getMonth() + 1);
        setViewDate(newDate);
    };

    const handleSelect = (day: number) => {
        const selectedDate = new Date(year, month, day);
        // Format: YYYY-MM-DD (local time)
        const offset = selectedDate.getTimezoneOffset();
        const localDate = new Date(selectedDate.getTime() - (offset * 60 * 1000));
        const formattedDate = localDate.toISOString().split('T')[0];

        onChange(formattedDate);
        setIsOpen(false);
    };

    const isToday = (d: number) => {
        const today = new Date();
        return d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    };

    const isSelected = (d: number) => {
        if (!value) return false;
        const selected = new Date(value);
        return d === selected.getDate() && month === selected.getMonth() && year === selected.getFullYear();
    };

    const isPast = (d: number) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const current = new Date(year, month, d);
        return current < today;
    };

    return (
        <div className="relative">
            <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">{label}</label>
            <div className="relative group">
                <Button
                    variant="outline"
                    className={`w-full h-[58px] justify-start text-left pl-12 pr-4 bg-slate-50 border-slate-200 hover:border-primary hover:bg-slate-50 rounded-xl relative ${value ? 'text-slate-900 font-bold' : 'text-slate-400 font-medium'}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" />
                    </div>
                    {value ? new Date(value).toLocaleDateString("en-GB", { day: 'numeric', month: 'short', year: 'numeric' }) : placeholder}
                </Button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop to close */}
                        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

                        {/* Animated Popover */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="absolute top-full mt-2 left-0 w-[320px] bg-white rounded-2xl shadow-2xl border border-slate-100 z-[100] p-4"
                        >
                            {/* Calendar Header */}
                            <div className="flex items-center justify-between mb-4">
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={handlePrevMonth}>
                                    <ChevronLeft className="w-4 h-4" />
                                </Button>
                                <span className="font-bold text-slate-900">{monthNames[month]} {year}</span>
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={handleNextMonth}>
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>

                            {/* Days Grid */}
                            <div className="grid grid-cols-7 gap-1 text-center mb-2">
                                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                                    <span key={d} className="text-xs font-bold text-slate-400">{d}</span>
                                ))}
                            </div>
                            <div className="grid grid-cols-7 gap-1">
                                {Array.from({ length: firstDay }).map((_, i) => (
                                    <div key={`empty-${i}`} />
                                ))}
                                {days.map((day) => {
                                    const disabled = isPast(day);
                                    return (
                                        <motion.button
                                            key={day}
                                            whileHover={!disabled ? { scale: 1.1, backgroundColor: "var(--primary)", color: "white" } : {}}
                                            whileTap={!disabled ? { scale: 0.9 } : {}}
                                            onClick={() => !disabled && handleSelect(day)}
                                            disabled={disabled}
                                            className={`h-9 w-9 rounded-full text-sm font-medium flex items-center justify-center transition-colors 
                                            ${isSelected(day)
                                                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                                    : isToday(day)
                                                        ? 'bg-slate-100 text-primary font-bold'
                                                        : disabled
                                                            ? 'text-slate-300 cursor-not-allowed'
                                                            : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                                                }`}
                                        >
                                            {day}
                                        </motion.button>
                                    )
                                })}
                            </div>

                            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
                                <Button variant="ghost" className="text-xs text-slate-400 h-auto p-0 hover:bg-transparent hover:text-red-500" onClick={() => { onChange(""); setIsOpen(false); }}>
                                    Clear
                                </Button>
                                <Button size="sm" className="h-8 text-xs rounded-lg" onClick={() => setIsOpen(false)}>
                                    Done
                                </Button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
