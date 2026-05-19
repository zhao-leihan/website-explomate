import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import { About } from "@/components/home/About";
import HowItWorks from "@/components/home/HowItWorks";
import EVPartnership from "@/components/home/EVPartnership";
import { SupportedPayments } from "@/components/home/SupportedPayments";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
    return (
        <main className="min-h-screen bg-background font-sans">
            <Navbar />
            <Hero />
            <Features />
            <About /> {/* Added About component after Features */}
            <HowItWorks />
            <EVPartnership />
            <SupportedPayments />
            <Footer />
        </main>
    );
}
