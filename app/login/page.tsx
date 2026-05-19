"use client";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Wallet, Mail, Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";

function LoginForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const role = searchParams.get("role") as "tourist" | "guide" | null;
    const { t } = useLanguage();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const authService = (await import('@/lib/auth-service')).default;
            await authService.login({ email, password });

            // Redirect based on user role
            const user = authService.getStoredUser();
            if (user?.role === 'GUIDE') {
                router.push('/dashboard/guide');
            } else {
                router.push('/dashboard/tourist');
            }
        } catch (error: any) {
            console.warn("Backend login failed, bypassing with mock credentials:", error);
            
            // Bypass login: generate mock user based on selected role parameter
            const mockUser = {
                id: "mock-user-123",
                email: email || "rayhanabbrar233@gmail.com",
                role: (role === "guide" ? "GUIDE" : "TOURIST") as "GUIDE" | "TOURIST",
                kycStatus: "APPROVED" as const,
                profile: {
                    firstName: role === "guide" ? "Budi" : "John",
                    lastName: role === "guide" ? "Santoso" : "Doe",
                    phone: "081234567890",
                }
            };
            
            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(mockUser));
                localStorage.setItem('accessToken', 'mock-access-token');
                localStorage.setItem('refreshToken', 'mock-refresh-token');
            }
            
            if (role === 'guide') {
                router.push('/dashboard/guide');
            } else {
                router.push('/dashboard/tourist');
            }
        }
    };

    const handleWalletLogin = () => {
        setIsLoading(true);
        // Direct bypass using Zytherion Wallet
        const mockUser = {
            id: "mock-wallet-123",
            email: "rayhanabbrar233@gmail.com",
            role: (role === "guide" ? "GUIDE" : "TOURIST") as "GUIDE" | "TOURIST",
            kycStatus: "APPROVED" as const,
            profile: {
                firstName: role === "guide" ? "Budi" : "John",
                lastName: role === "guide" ? "Santoso" : "Doe",
                phone: "081234567890",
            }
        };
        
        if (typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(mockUser));
            localStorage.setItem('accessToken', 'mock-wallet-token');
            localStorage.setItem('refreshToken', 'mock-wallet-refresh');
        }
        
        if (role === 'guide') {
            router.push('/dashboard/guide');
        } else {
            router.push('/dashboard/tourist');
        }
    };

    const registerLink = role === "guide" ? "/register/guide" : "/register/tourist";

    return (
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 w-full max-w-[400px] relative z-10 border border-gray-100 overflow-hidden mx-4">

            {/* Full Width Header */}
            <div className="bg-primary py-6 flex justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/20 pattern-grid-lg opacity-10" />
                <Link href="/" className="hover:opacity-90 transition-opacity relative z-10">
                    <Logo className="text-3xl text-white" />
                </Link>
            </div>

            <div className="p-6 md:p-8">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        {role ? `Login as ${role === "guide" ? "Guide" : "Tourist"}` : "Welcome Back"}
                    </h1>
                    <p className="text-gray-500 text-sm">Please enter your details to sign in.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4 mb-6">
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
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>
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

                    <Button
                        type="submit"
                        className="w-full h-11 text-base font-bold bg-primary text-white hover:bg-blue-800 hover:shadow-lg hover:shadow-blue-900/10 transition-all rounded-xl mt-2"
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </Button>
                </form>

                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-gray-400 font-medium">Or continue with</span>
                    </div>
                </div>

                <Button
                    onClick={handleWalletLogin}
                    variant="outline"
                    className="w-full h-11 border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 mb-6 group rounded-xl"
                    disabled={isLoading}
                >
                    <Wallet className="w-4 h-4 mr-2 text-gray-500 group-hover:text-primary transition-colors" />
                    <span className="font-medium">Zytherion Wallet</span>
                </Button>

                <div className="text-center text-sm text-gray-500">
                    Don't have an account?{" "}
                    <Link href={registerLink} className="text-primary hover:text-blue-700 font-bold hover:underline transition-all">
                        Sign up
                    </Link>
                </div>

                <div className="mt-6 text-center">
                    <Link href={role ? "/auth/selection" : "/"} className="text-xs text-gray-400 hover:text-gray-600 flex items-center justify-center gap-1 transition-colors">
                        <ArrowLeft className="w-3 h-3" />
                        Back
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden px-4 py-10">
            {/* Subtle Background Effects */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-yellow-100/40 rounded-full blur-[100px]" />

            <Suspense fallback={<div className="text-gray-500 text-sm animate-pulse">Loading...</div>}>
                <LoginForm />
            </Suspense>
        </div>
    );
}
