"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownLeft, Clock, CheckCircle2, XCircle, Search, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function TransactionsPage() {
    const { t } = useLanguage();
    const { formatPrice } = useCurrency();
    const [filter, setFilter] = useState("all");

    // Mock Data
    const transactions = [
        {
            id: "TRX-882910",
            title: "Hidden Gems of Bali Tour",
            type: "payment",
            date: "2024-02-24T09:30:00",
            amount: 305,
            status: "completed",
            method: "Crypto (ZTH)",
            category: "Tour"
        },
        {
            id: "TRX-882909",
            title: "Wallet Top Up",
            type: "deposit",
            date: "2024-02-23T14:15:00",
            amount: 500,
            status: "completed",
            method: "Bank Transfer (BCA)",
            category: "Wallet"
        },
        {
            id: "TRX-882908",
            title: "Garuda Indonesia Flight (CGK-DPS)",
            type: "payment",
            date: "2024-02-20T10:00:00",
            amount: 120,
            status: "completed",
            method: "Credit Card",
            category: "Transport"
        },
        {
            id: "TRX-882905",
            title: "Refund: Canceled Booking",
            type: "refund",
            date: "2024-02-18T16:45:00",
            amount: 150,
            status: "pending",
            method: "System",
            category: "Refund"
        },
        {
            id: "TRX-882901",
            title: "Kuta Beach Hotel (2 Nights)",
            type: "payment",
            date: "2024-02-15T08:20:00",
            amount: 200,
            status: "failed",
            method: "QRIS",
            category: "Hotel"
        },
    ];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "completed":
                return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">Completed</Badge>;
            case "pending":
                return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-yellow-200">Pending</Badge>;
            case "failed":
                return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200">Failed</Badge>;
            default:
                return <Badge className="bg-slate-100 text-slate-700">Unknown</Badge>;
        }
    };

    const getIcon = (type: string) => {
        switch (type) {
            case "payment":
                return <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500"><ArrowUpRight className="w-5 h-5" /></div>;
            case "deposit":
                return <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500"><ArrowDownLeft className="w-5 h-5" /></div>;
            case "refund":
                return <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500"><ArrowDownLeft className="w-5 h-5" /></div>;
            default:
                return <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500"><Clock className="w-5 h-5" /></div>;
        }
    };

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 font-display">Transaction History</h1>
                    <p className="text-slate-500">Track all your payments, top-ups, and refunds.</p>
                </div>
                <Button variant="outline" className="flex gap-2">
                    <Download className="w-4 h-4" />
                    Export CSV
                </Button>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-6 flex gap-4 items-center">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                    />
                </div>
                <div className="flex gap-2">
                    <Button
                        variant={filter === "all" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setFilter("all")}
                        className={`rounded-lg ${filter !== "all" ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100" : "font-bold"}`}
                    >
                        All
                    </Button>
                    <Button
                        variant={filter === "payment" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setFilter("payment")}
                        className={`rounded-lg ${filter !== "payment" ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100" : "font-bold"}`}
                    >
                        Payments
                    </Button>
                    <Button
                        variant={filter === "deposit" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setFilter("deposit")}
                        className={`rounded-lg ${filter !== "deposit" ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100" : "font-bold"}`}
                    >
                        Deposits
                    </Button>
                </div>
            </div>

            {/* Transaction List */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Transaction</th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Method</th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="text-right py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {transactions.map((trx) => (
                                <tr key={trx.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-4">
                                            {getIcon(trx.type)}
                                            <div>
                                                <p className="font-bold text-slate-900 text-sm">{trx.title}</p>
                                                <p className="text-xs text-slate-500">{trx.id} • {trx.category}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-slate-600">
                                        {new Date(trx.date).toLocaleDateString("en-US", {
                                            year: 'numeric', month: 'short', day: 'numeric',
                                            hour: '2-digit', minute: '2-digit'
                                        })}
                                    </td>
                                    <td className="py-4 px-6 text-sm text-slate-600">
                                        {trx.method}
                                    </td>
                                    <td className="py-4 px-6">
                                        {getStatusBadge(trx.status)}
                                    </td>
                                    <td className={`py-4 px-6 text-right font-bold ${trx.type === "deposit" || trx.type === "refund" ? "text-green-600" : "text-slate-900"
                                        }`}>
                                        {trx.type === "deposit" || trx.type === "refund" ? "+" : "-"}{formatPrice(trx.amount)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination (Mock) */}
                <div className="p-4 border-t border-slate-100 flex justify-between items-center text-sm text-slate-500">
                    <span>Showing 5 of 24 transactions</span>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled>Previous</Button>
                        <Button variant="outline" size="sm">Next</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
