"use client";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Upload, User, Mail, Lock, MapPin, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";

export default function TouristRegisterPage() {
    const router = useRouter();
    const { t } = useLanguage();
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [idCard, setIdCard] = useState<File | null>(null);
    const [passport, setPassport] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: (f: File | null) => void) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // 1. Register User
            const authService = (await import('@/lib/auth-service')).default;
            await authService.register({
                email,
                password,
                role: 'TOURIST',
                profile: {
                    firstName: name.split(' ')[0],
                    lastName: name.split(' ').slice(1).join(' ') || '',
                    phone: '' // Add phone field if needed
                }
            });

            // 2. Submit KYC if files present
            const userService = (await import('@/lib/user-service')).default;
            if (idCard || passport) {
                await userService.submitKYC({
                    idCard: idCard as File,
                    passport: passport as File
                });
            }

            // 3. Redirect to dashboard
            setTimeout(() => {
                setIsLoading(false);
                router.push("/dashboard/tourist");
            }, 1000);

        } catch (error: any) {
            setIsLoading(false);
            alert(error.response?.data?.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-10 px-4 relative overflow-hidden">
            {/* Subtle Background Effects */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-yellow-100/40 rounded-full blur-[100px]" />

            <div className="w-full max-w-lg z-10">
                <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden">
                    <div className="bg-primary py-6 px-6 flex items-center justify-between relative overflow-hidden">
                        <div className="absolute inset-0 bg-blue-600/20 pattern-grid-lg opacity-10" />
                        <Link href="/auth/selection" className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full relative z-10">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <Logo className="text-2xl text-white relative z-10" />
                        <div className="w-9" /> {/* Spacer to balance */}
                    </div>

                    <div className="p-6 md:p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">Join as a Tourist</h1>
                            <p className="text-gray-500 text-sm">Create your account to start exploring</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Name */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-gray-700 ml-1">Full Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="block w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-gray-700 ml-1">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="block w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-700 ml-1">Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MapPin className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="block w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                        placeholder="123 Street, City, Country"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-700 ml-1">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            {/* File Uploads */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* ID Card Upload */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-gray-700 ml-1">ID Card</label>
                                    <label className={cn(
                                        "flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-xl cursor-pointer transition-all group overflow-hidden relative",
                                        idCard ? "border-secondary bg-yellow-50" : "border-gray-200 bg-gray-50 hover:bg-white hover:border-gray-300"
                                    )}>
                                        <div className="flex flex-col items-center justify-center pt-4 pb-5">
                                            <Upload className={cn("w-5 h-5 mb-1 transition-colors", idCard ? "text-secondary" : "text-gray-400 group-hover:text-primary")} />
                                            <p className={cn("mb-1 text-[10px] text-center px-4 max-w-full truncate", idCard ? "text-gray-900 font-medium" : "text-gray-500")}>
                                                {idCard ? idCard.name : "Upload ID"}
                                            </p>
                                        </div>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept=".pdf,.jpg,.jpeg"
                                            onChange={(e) => handleFileChange(e, setIdCard)}
                                            required
                                        />
                                    </label>
                                </div>

                                {/* Passport Upload */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-gray-700 ml-1">Passport</label>
                                    <label className={cn(
                                        "flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-xl cursor-pointer transition-all group overflow-hidden relative",
                                        passport ? "border-secondary bg-yellow-50" : "border-gray-200 bg-gray-50 hover:bg-white hover:border-gray-300"
                                    )}>
                                        <div className="flex flex-col items-center justify-center pt-4 pb-5">
                                            <FileText className={cn("w-5 h-5 mb-1 transition-colors", passport ? "text-secondary" : "text-gray-400 group-hover:text-primary")} />
                                            <p className={cn("mb-1 text-[10px] text-center px-4 max-w-full truncate", passport ? "text-gray-900 font-medium" : "text-gray-500")}>
                                                {passport ? passport.name : "Upload Passport"}
                                            </p>
                                        </div>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept=".pdf,.jpg,.jpeg"
                                            onChange={(e) => handleFileChange(e, setPassport)}
                                        />
                                    </label>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-11 text-base font-bold bg-primary text-white hover:bg-blue-800 hover:shadow-lg transition-all rounded-xl mt-4"
                                disabled={isLoading}
                            >
                                {isLoading ? "Creating Account..." : "Create Account"}
                            </Button>

                            <div className="text-center text-sm text-gray-500 mt-4">
                                Already have an account?{" "}
                                <Link href="/login?role=tourist" className="text-primary hover:text-blue-700 font-bold hover:underline transition-all">
                                    Login here
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

