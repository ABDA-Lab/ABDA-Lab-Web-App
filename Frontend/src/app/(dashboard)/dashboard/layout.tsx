import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { Toaster } from 'react-hot-toast';
import Provider from '@/components/Provider';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/appSidebar';
import HeaderDashboard from '@/components/HeaderDashboard';

const jetBrainsMono = JetBrains_Mono({
    variable: '--font-jetbrains-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'ABDA Lab',
    description: 'Lab at FPT University',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        // <div className="dashboard-layout">
            <Provider>
                <SidebarProvider>
                    <AppSidebar />
                    <SidebarInset className="w-full flex-1">
                        <HeaderDashboard />
                        <main className="flex-1 w-full">{children}</main>
                        {/* {children} */}
                    </SidebarInset>
                </SidebarProvider>
                <Toaster position="top-right" reverseOrder={false} />
            </Provider>
        // </div>
    );
}
