"use client";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Upload, User, Mail, Lock, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";

export default function GuideRegisterPage() {
    const router = useRouter();
    const { t } = useLanguage();
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [idCard, setIdCard] = useState<File | null>(null);
    const [certification, setCertification] = useState<File | null>(null);
    const [hasCertification, setHasCertification] = useState(true);

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
            const res = await authService.register({
                email,
                password,
                role: 'GUIDE',
                profile: {
                    firstName: name.split(' ')[0],
                    lastName: name.split(' ').slice(1).join(' ') || '',
                    phone: '' // Add phone field if needed
                }
            });

            // 2. Submit KYC if files present
            const userService = (await import('@/lib/user-service')).default;
            if (idCard || certification) {
                await userService.submitKYC({
                    idCard: idCard as File,
                    certification: certification as File
                });
            }

            if (!hasCertification) {
                // Redirect to test if no certification
                setTimeout(() => {
                    setIsLoading(false);
                    router.push("/test");
                }, 1000);
                return;
            }

            // 3. Login User (authService.register already handles token storage)
            // Redirect to dashboard
            setTimeout(() => {
                setIsLoading(false);
                router.push("/dashboard/guide");
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
                    {/* Full Width Header */}
                    <div className="bg-primary py-6 px-6 flex items-center justify-between relative overflow-hidden">
                        <div className="absolute inset-0 bg-blue-600/20 pattern-grid-lg opacity-10" />
                        <Link href="/auth/selection" className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full relative z-10">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <Logo className="text-2xl text-white relative z-10" />
                        <div className="w-9" /> {/* Spacer */}
                    </div>

                    <div className="p-6 md:p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">Become a Tour Guide</h1>
                            <p className="text-gray-500 text-sm">Share your local knowledge with the world</p>
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
                                            placeholder="Jane Doe"
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
                                            placeholder="jane@example.com"
                                        />
                                    </div>
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
                            <div className="grid grid-cols-1 gap-2">
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

                                {/* Certification Toggle & Upload */}
                                <div className="space-y-3 pt-2">
                                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
                                        <label className="text-xs font-semibold text-gray-700 ml-1">English Certification</label>
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                id="no-cert"
                                                checked={!hasCertification}
                                                onChange={() => setHasCertification(!hasCertification)}
                                                className="h-3.5 w-3.5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                                            />
                                            <label htmlFor="no-cert" className="text-[10px] text-gray-500 cursor-pointer select-none font-medium">I don't have one</label>
                                        </div>
                                    </div>

                                    {hasCertification ? (
                                        <label className={cn(
                                            "flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-xl cursor-pointer transition-all group overflow-hidden relative",
                                            certification ? "border-green-500 bg-green-50" : "border-gray-200 bg-gray-50 hover:bg-white hover:border-gray-300"
                                        )}>
                                            <div className="flex flex-col items-center justify-center pt-4 pb-5">
                                                <CheckCircle className={cn("w-5 h-5 mb-1 transition-colors", certification ? "text-green-500" : "text-gray-400 group-hover:text-green-500")} />
                                                <p className={cn("mb-1 text-[10px] text-center px-4 max-w-full truncate", certification ? "text-gray-900 font-medium" : "text-gray-500")}>
                                                    {certification ? certification.name : "Upload Certificate"}
                                                </p>
                                            </div>
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept=".pdf,.jpg,.jpeg"
                                                onChange={(e) => handleFileChange(e, setCertification)}
                                                required={hasCertification}
                                            />
                                        </label>
                                    ) : (
                                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
                                            <AlertCircle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                                            <p className="text-xs text-yellow-700 leading-relaxed">
                                                You will need to take an <span className="font-bold">English proficiency test</span> to proceed. We will assess your skills immediately after you submit this form.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className={cn(
                                    "w-full h-11 text-base font-bold transition-all rounded-xl mt-4",
                                    !hasCertification
                                        ? "bg-gray-100 text-primary hover:bg-gray-200 border border-gray-200"
                                        : "bg-primary text-white hover:bg-blue-800 hover:shadow-lg"
                                )}
                                disabled={isLoading}
                            >
                                {isLoading ? (hasCertification ? "Registering..." : "Redirecting...") : (hasCertification ? "Create Account" : "Take Test & Register")}
                            </Button>

                            <div className="text-center text-sm text-gray-500 mt-4">
                                Already have an account?{" "}
                                <Link href="/login?role=guide" className="text-primary hover:text-blue-700 font-bold hover:underline transition-all">
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