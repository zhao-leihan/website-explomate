import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Explomate - Web3 Tourism",
  description: "Explore the World with Trusted Local Guides",
};

import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { UserRoleProvider } from "@/components/providers/UserRoleProvider";
import { CurrencyProvider } from "@/components/providers/CurrencyProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased text-slate-900 bg-white`}>
        <LoadingScreen />
        <LanguageProvider>
          <UserRoleProvider>
            <CurrencyProvider>
              {children}
            </CurrencyProvider>
          </UserRoleProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
