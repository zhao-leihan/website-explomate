"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type UserRole = "tourist" | "guide";

interface UserRoleContextType {
    role: UserRole;
    setRole: (role: UserRole) => void;
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

export function UserRoleProvider({ children }: { children: React.ReactNode }) {
    const [role, setRole] = useState<UserRole>("tourist");
    const pathname = usePathname();

    useEffect(() => {
        // Initialize from stored user role if available
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    const user = JSON.parse(storedUser);
                    if (user && user.role) {
                        const userRole = user.role.toLowerCase() as UserRole;
                        if (userRole === "guide" || userRole === "tourist") {
                            setRole(userRole);
                        }
                    }
                } catch (e) {
                    console.error("Error parsing stored user role", e);
                }
            }
        }
    }, []);

    useEffect(() => {
        // Smart auto-detection based on specific paths
        if (pathname.includes("/dashboard/guide")) {
            setRole("guide");
        } else if (pathname.includes("/dashboard/tourist")) {
            setRole("tourist");
        }
        // If visiting shared pages like /dashboard/wallet, keep the previous role
    }, [pathname]);

    return (
        <UserRoleContext.Provider value={{ role, setRole }}>
            {children}
        </UserRoleContext.Provider>
    );
}

export function useUserRole() {
    const context = useContext(UserRoleContext);
    if (context === undefined) {
        throw new Error("useUserRole must be used within a UserRoleProvider");
    }
    return context;
}
