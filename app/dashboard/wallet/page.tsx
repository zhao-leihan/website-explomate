"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Button } from "@/components/ui/button";
import { ArrowDownLeft, ArrowRightLeft, ArrowUpRight, Wallet, History, CreditCard, RefreshCw, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";

export default function WalletPage() {
    const { t } = useLanguage();
    const [fromCurrency, setFromCurrency] = useState("ZTH");
    const [toCurrency, setToCurrency] = useState("USD");
    const [amount, setAmount] = useState("");
    const [balance, setBalance] = useState("0.00");
    const [transactions, setTransactions] = useState<any[]>([]);

    useEffect(() => {
        const fetchWalletData = async () => {
            try {
                const walletService = (await import('@/lib/services')).walletService;
                const balanceData = await walletService.getBalance();
                setBalance(balanceData.balance.toFixed(2));

                const txs = await walletService.getTransactions();
                // Map backend txs to UI model
                const mappedTxs = txs.map((tx: any, idx: number) => ({
                    id: tx.hash || idx,
                    type: tx.type || (tx.from === 'me' ? 'out' : 'in'), // Logic depends on backend response
                    desc: tx.description || 'Transaction',
                    amount: `${tx.amount} ${tx.currency}`,
                    date: new Date(tx.timestamp).toLocaleString(),
                    status: tx.status
                }));
                setTransactions(mappedTxs);
            } catch (e) {
                console.error("Failed to load wallet data", e);
            }
        };
        fetchWalletData();
    }, []);

    const currencies = [
        { code: "ZTH", name: "Zytherion", icon: Wallet },
        { code: "BTC", name: "Bitcoin", icon: TrendingUp }, // Using TrendingUp as generic crypto placeholder if icon missing
        { code: "ETH", name: "Ethereum", icon: Wallet },
        { code: "USD", name: "US Dollar", icon: RefreshCw }, // Placeholder
        { code: "IDR", name: "Indonesian Rupiah", icon: RefreshCw },
    ];

    return (
        <div className="max-w-4xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-primary">{t.dashboard.wallet.title}</h1>
                <p className="text-slate-500">{t.dashboard.wallet.subtitle}</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Balance Card */}
                <div className="md:col-span-2 bg-gradient-to-br from-primary to-blue-800 rounded-2xl p-8 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                    <div className="relative z-10">
                        <p className="text-blue-200 font-medium mb-1">{t.dashboard.wallet.balance}</p>
                        <h2 className="text-4xl font-bold font-display mb-8">1,250.00 ZTH</h2>

                        <div className="flex gap-4">
                            <Button variant="secondary" className="font-bold">
                                <ArrowDownLeft className="w-4 h-4 mr-2" />
                                Deposit
                            </Button>
                            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white">
                                <ArrowUpRight className="w-4 h-4 mr-2" />
                                Withdraw
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col justify-center space-y-4">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-4 cursor-pointer hover:bg-blue-50 hover:border-blue-100 transition-colors group">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-slate-100 group-hover:border-blue-200">
                            <CreditCard className="w-5 h-5 text-slate-600 group-hover:text-primary" />
                        </div>
                        <span className="font-bold text-slate-700 group-hover:text-primary">Link Card</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-4 cursor-pointer hover:bg-blue-50 hover:border-blue-100 transition-colors group">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-slate-100 group-hover:border-blue-200">
                            <History className="w-5 h-5 text-slate-600 group-hover:text-primary" />
                        </div>
                        <span className="font-bold text-slate-700 group-hover:text-primary">Statements</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Exchange Card */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <RefreshCw className="w-5 h-5 text-secondary" />
                        {t.dashboard.wallet.exchange.swap}
                    </h2>

                    <div className="space-y-4">
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <label className="text-xs text-slate-500 font-bold mb-2 block">{t.dashboard.wallet.exchange.from}</label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0.00"
                                    className="bg-transparent text-2xl font-bold text-black w-full focus:outline-none placeholder:text-gray-400"
                                />
                                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                                    <span className="font-bold text-sm text-slate-700">{fromCurrency}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center -my-3 relative z-10">
                            <button className="w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm hover:bg-slate-50 text-slate-500">
                                <ArrowRightLeft className="w-4 h-4 rotate-90" />
                            </button>
                        </div>

                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <label className="text-xs text-slate-500 font-bold mb-2 block">{t.dashboard.wallet.exchange.to}</label>
                            <div className="flex items-center gap-4">
                                <div className="text-2xl font-bold text-slate-900 w-full opacity-50">
                                    {amount ? (parseFloat(amount) * 1.5).toFixed(2) : "0.00"}
                                </div>
                                <select
                                    value={toCurrency}
                                    onChange={(e) => setToCurrency(e.target.value)}
                                    className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm font-bold text-sm text-black focus:outline-none"
                                >
                                    {currencies.map(c => (
                                        <option key={c.code} value={c.code}>{c.code}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-slate-500 px-2">
                            <span>{t.dashboard.wallet.exchange.rate}</span>
                            <span className="font-bold">1 {fromCurrency} ≈ 1.5 {toCurrency}</span>
                        </div>

                        <Button className="w-full h-12 text-lg font-bold" variant="default">
                            {t.dashboard.wallet.exchange.convert}
                        </Button>
                    </div>
                </div>

                {/* Available Assets */}
                <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Assets</h2>
                    <div className="space-y-3">
                        {currencies.map((currency) => (
                            <div key={currency.code} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                                        <currency.icon className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-slate-900">{currency.name}</p>
                                        <p className="text-xs text-slate-400">{currency.code}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-sm text-slate-900">0.00</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Transaction History */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <History className="w-5 h-5 text-secondary" />
                    {t.dashboard.wallet.history}
                </h2>

                <div className="space-y-4">
                    {transactions.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 rounded-xl transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'in' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                    {tx.type === 'in' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">{tx.desc}</h4>
                                    <p className="text-xs text-slate-500">{tx.date}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`font-bold ${tx.type === 'in' ? 'text-green-600' : 'text-slate-900'}`}>{tx.amount}</p>
                                <p className="text-xs text-slate-400">{tx.status}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
