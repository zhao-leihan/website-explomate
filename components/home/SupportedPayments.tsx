// Categorized static display
export const SupportedPayments = () => {
    const banks = [
        { name: "Bank BCA", image: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg" },
        { name: "Bank BNI", image: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Bank_Negara_Indonesia_logo_%282004%29.svg" },
        { name: "Visa Mastercard", image: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" }
    ];

    const digital = [
        { name: "QRIS", image: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_QRIS.svg" },
        { name: "PayPal", image: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" },
    ];

    const crypto = [
        { name: "Bitcoin", image: "https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg" },
        { name: "Ethereum", image: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg" },
        { name: "Solana", image: "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png" },
        { name: "Zytherion", image: "https://zytherion.pages.dev/logo_zythc.png" },
    ];

    const renderLogos = (items: { name: string; image: string }[]) => (
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-80">
            {items.map((item, index) => (
                <div
                    key={`${item.name}-${index}`}
                    className="flex items-center justify-center transition-transform hover:scale-105 duration-300"
                >
                    <img
                        src={item.image}
                        alt={item.name}
                        className="h-10 md:h-14 w-auto object-contain max-w-[120px] md:max-w-[160px] grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 hover:drop-shadow-lg"
                    />
                </div>
            ))}
        </div>
    );

    return (
        <section className="py-16 bg-slate-50 border-t border-slate-200">
            <div className="container mx-auto px-4 mb-10 text-center">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Secured by Trusted Payment Gateways
                </p>
                <div className="w-12 h-1 bg-slate-200 mx-auto rounded-full"></div>
            </div>

            <div className="container mx-auto px-4 space-y-12">
                {/* Banks Row */}
                <div className="flex flex-col items-center">
                    {renderLogos(banks)}
                </div>

                {/* Digital/Wallets Row */}
                <div className="flex flex-col items-center border-t border-slate-100 pt-8 w-full max-w-4xl mx-auto">
                    {renderLogos(digital)}
                </div>

                {/* Crypto Row */}
                <div className="flex flex-col items-center border-t border-slate-100 pt-8 w-full max-w-4xl mx-auto">
                    {renderLogos(crypto)}
                </div>
            </div>
        </section>
    );
};
