import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';
import HeaderWrapper from '@/components/HeaderWrapper';

const jetBrainsMono = JetBrains_Mono({
    variable: '--font-jetbrains-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'ABDA Lab',
    description: 'Lab at FPT University',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${jetBrainsMono.variable} light`}>
            <body className={`${jetBrainsMono.style} font-mono antialiased bg-gray-100`}>
                <HeaderWrapper />
                <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
                    <main>{children}</main>
                </div>
            </body>
        </html>
    );
}
