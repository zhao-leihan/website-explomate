import Navbar from "@/components/layout/Navbar";
import { About } from "@/components/home/About";
import { Footer } from "@/components/layout/Footer";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="pt-20">
                <About />
            </div>
            <Footer />
        </main>
    );
}
