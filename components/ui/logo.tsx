import { cn } from "@/lib/utils";

export const Logo = ({ className, light = false }: { className?: string, light?: boolean }) => {
    return (
        <div className={cn("relative flex items-center gap-2", className)}>
            {/* Using standard img tag to avoid next/image optimization issues with locally added files */}
            <img
                src="/gambar.png"
                alt="Explomate Logo"
                className="object-contain h-10 w-auto"
            />
        </div>
    );
};
