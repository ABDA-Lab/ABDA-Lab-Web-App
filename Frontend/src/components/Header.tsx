// 'use client';
import Link from 'next/link';
import Logo from './Logo';
import Navigation from './Navigation';

export default function Header() {
    return (
        <header className="z-50 relative">
            <div className="w-full bg-white border-b">
                <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
                    <Link href="/" className="flex items-center space-x-4">
                        <Logo />
                    </Link>
                    <Navigation />
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/login"
                            className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                                Sign in
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
