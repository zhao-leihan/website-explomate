"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { saveTour } from "@/lib/tours";
import { useRouter } from "next/navigation";
import { Loader2, Image as ImageIcon } from "lucide-react";

export default function TourForm() {
    const { t } = useLanguage();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // Simple state form management
    const [formData, setFormData] = useState({
        title: "",
        location: "",
        price: "",
        duration: "",
        category: "Adventure",
        image: "/tours/bali.png", // Default for prototype
        description: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API delay
        setTimeout(() => {
            saveTour({
                title: formData.title,
                location: formData.location,
                price: parseFloat(formData.price),
                duration: formData.duration,
                category: formData.category as any,
                image: formData.image, // Use default or mock upload
                description: formData.description
            });
            setIsLoading(false);
            router.push("/dashboard/guide");
        }, 1500);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900">Basic Information</h2>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tour Title</label>
                    <input
                        required
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        type="text"
                        placeholder="e.g. Hidden Bali Waterfall Trek"
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-black placeholder:text-gray-400"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-900 mb-1">Location</label>
                    <input
                        required
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        type="text"
                        placeholder="e.g. Ubud, Bali"
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-black placeholder:text-gray-400"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-900 mb-1">Description</label>
                    <textarea
                        required
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Describe the experience..."
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none text-black placeholder:text-gray-400"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-900 mb-1">Price (ZTH)</label>
                    <input
                        required
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        type="number"
                        placeholder="150"
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-black placeholder:text-gray-400"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-900 mb-1">Duration</label>
                    <input
                        required
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        type="text"
                        placeholder="e.g. 6 Hours"
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-black placeholder:text-gray-400"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">Category</label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-black"
                >
                    <option value="Adventure">Adventure</option>
                    <option value="Culture">Culture</option>
                    <option value="Food">Food</option>
                    <option value="Nature">Nature</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-900 mb-3">Cover Image</label>
                <div className="grid grid-cols-3 gap-4">
                    {/* Mock Image Selection */}
                    {['/tours/bali.png', '/tours/kyoto.png', '/tours/swiss.png'].map((img) => (
                        <div
                            key={img}
                            onClick={() => setFormData({ ...formData, image: img })}
                            className={`relative aspect-video rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${formData.image === img ? 'border-primary ring-2 ring-primary/20' : 'border-transparent opacity-70 hover:opacity-100'}`}
                        >
                            <img src={img} alt="Selection" className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
                <p className="text-xs text-slate-500 mt-2">Select a mock image for the prototype.</p>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full font-bold h-12 text-lg shadow-lg shadow-primary/20">
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                {isLoading ? "Creating Tour..." : "Publish Tour"}
            </Button>
        </form>
    );
}
