"use client"
import { useState } from "react";
import SideNav from "./_components/sidenav";
import DashboardHeader from "./_components/DashboardHeader";
import { Button } from "@/components/ui/button";
import { List,X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardLayout({ children }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative min-h-screen">
            {/* --- MOBILE OVERLAY (Backdrop) --- */}
            {/* This dims the screen when the sidebar is open on mobile */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* --- SIDEBAR --- */}
            <div className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-white transition-transform duration-300 ease-in-out transform border-r",
                // On mobile: Translate off-screen if not open. On desktop: always show (translate-x-0)
                open ? "translate-x-0" : "-translate-x-full",
                "md:translate-x-0 md:block"
            )}>
                {/* Optional: Close button inside sidebar for mobile */}
                <div className="flex justify-end p-4 md:hidden">
                    <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                        <X className="h-6 w-6" />
                    </Button>
                </div>

                <SideNav />
            </div>

            {/* --- MAIN CONTENT AREA --- */}
            <div className="md:ml-64">
                {/* --- MOBILE HEADER/TOP BAR --- */}
                <div className="p-4 md:hidden flex items-center border-b">
                    <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
                        <List className="h-6 w-6" />
                    </Button>
                    <span className="ml-4 font-bold text-lg">Dashboard</span>
                </div>

                <DashboardHeader />

                <main className="p-5">
                    {children}
                </main>
            </div>
        </div>
    );
}


