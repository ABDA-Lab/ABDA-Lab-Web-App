import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';
import HeaderWrapper from '@/components/HeaderWrapper';
import { Toaster } from 'react-hot-toast';
import Provider from '@/components/Provider';
import Footer from '@/components/Footer';

const jetBrainsMono = JetBrains_Mono({
    variable: '--font-jetbrains-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'ABDA Lab',
    description: 'Lab at FPT University',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${jetBrainsMono.variable} light`}>
            <body className={`${jetBrainsMono.style} font-mono antialiased bg-gray-100 min-h-screen flex flex-col`}>
                <Provider>
                    <HeaderWrapper />
                    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex-grow">
                        <main>{children}</main>
                    </div>
                    <Footer />
                    <Toaster position="top-right" reverseOrder={false} />
                </Provider>
            </body>
        </html>
    );
}
