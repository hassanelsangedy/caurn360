import { UserButton } from "@clerk/nextjs";
import { Sidebar } from "@/components/dashboard/sidebar"; // We need to create this

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
            {/* Sidebar Navigation */}
            <div className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50">
                <Sidebar />
            </div>

            {/* Main Content Area */}
            <main className="md:pl-64 flex flex-col flex-1">
                {/* Top Header */}
                <header className="h-16 border-b bg-white dark:bg-slate-950 flex items-center justify-end px-6 shadow-sm">
                    <UserButton afterSignOutUrl="/" />
                </header>

                {/* Page Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
