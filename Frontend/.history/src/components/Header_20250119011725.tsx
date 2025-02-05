'use client';
import Navigation from './Navigation';
import { BackgroundLines } from './ui/background-lines';

export default function Header() {
    return (
        <header className="">
            <div className="w-full bg-white border-b">
                <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
                    <div className="flex items-center space-x-4 w-[20%]">
                        <div className="">
                            <BackgroundLines>
                                <h1 className="text-xl font-bold">ABDA:Lab</h1>
                            </BackgroundLines>
                        </div>
                    </div>
                    <Navigation className="w-[40%]" />
                    <div className="flex items-center space-x-4 w-[40%] justify-end">
                        <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                                Sign in
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
