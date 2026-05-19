"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Currency = "ZTH" | "USD" | "IDR";

interface CurrencyContextType {
    currency: Currency;
    setCurrency: (currency: Currency) => void;
    formatPrice: (amountInZth: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
    const [currency, setCurrency] = useState<Currency>("ZTH");

    // Exchange Rates: 1 ZTH = 1 USD = 15,000 IDR
    const rates = {
        ZTH: 1,
        USD: 1,
        IDR: 15000,
    };

    const formatPrice = (amountInZth: number) => {
        const value = amountInZth * rates[currency];

        switch (currency) {
            case "USD":
                return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
            case "IDR":
                return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
            case "ZTH":
            default:
                return `${new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(value)} ZTH`;
        }
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (context === undefined) {
        throw new Error("useCurrency must be used within a CurrencyProvider");
    }
    return context;
}
