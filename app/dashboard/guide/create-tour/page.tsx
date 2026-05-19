"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import TourForm from "@/components/guide/TourForm";

export default function CreateTourPage() {
    const { t } = useLanguage();

    return (
        <div className="max-w-3xl mx-auto">
            <header className="mb-8">
                <Link href="/dashboard/guide" className="inline-flex items-center text-slate-500 hover:text-primary mb-4 transition-colors text-sm font-bold">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                </Link>
                <h1 className="text-3xl font-bold text-primary mb-2">Create New Tour</h1>
                <p className="text-slate-500">Share your passion with the world. Create a unique experience.</p>
            </header>

            <TourForm />
        </div>
    );
}
