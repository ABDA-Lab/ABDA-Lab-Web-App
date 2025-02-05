import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';
import Navigation from '@/components/Navigation';
import { useState } from 'react';

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
        <html lang="en" className={jetBrainsMono.variable}>
            <body className={`${jetBrainsMono.style} antialiased`}>
                <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 font-mono">
                    <Navigation />
                    {children}
                </div>
            </body>
        </html>
    );
}
