"use client";

import Link from "next/link";
import { LayoutDashboard, FileText, User, Settings, ShieldCheck } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Navigation items can be dynamically rendered based on roles in a real app
const navItems = [
    { name: "Painel Principal", href: "/dashboard", icon: LayoutDashboard },
    { name: "Minhas Avaliações", href: "/dashboard/avaliacoes", icon: FileText },
    { name: "Perfil", href: "/dashboard/perfil", icon: User },
    { name: "Gestão (Admin)", href: "/dashboard/gestor", icon: ShieldCheck, roleRequired: "gestor" },
];

export function Sidebar() {
    const pathname = usePathname();

    // In a real scenario, use Clerk's useUser hook to filter based on role, e.g.:
    // const { user } = useUser();
    // const role = user?.publicMetadata?.role as string;
    // Then filter navItems based on roleRequired

    return (
        <div className="flex flex-col h-full bg-slate-950 text-white border-r border-slate-800">
            <div className="h-16 flex items-center px-6 border-b border-slate-800">
                <h1 className="text-xl font-bold tracking-tighter text-blue-500">
                    CAURN 360º
                </h1>
            </div>

            <div className="flex-1 px-4 py-6 space-y-2">
                {navItems.map((item) => (
                    <Button
                        key={item.href}
                        asChild
                        variant={"ghost"}
                        className={cn(
                            "w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800",
                            pathname === item.href && "bg-slate-800 text-white font-medium"
                        )}
                    >
                        <Link href={item.href}>
                            <item.icon className="mr-3 h-5 w-5" />
                            {item.name}
                        </Link>
                    </Button>
                ))}
            </div>

            <div className="p-4 border-t border-slate-800">
                <p className="text-xs text-slate-500 text-center">
                    System v1.0.0
                </p>
            </div>
        </div>
    );
}
