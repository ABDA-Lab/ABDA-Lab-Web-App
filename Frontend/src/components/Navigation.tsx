'use client';

import { useState } from 'react';
import { Menu, MenuItem, ProductItem } from './ui/navbar-menu';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Navigation({ mobile = false }) {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    // Responsive styles based on mobile prop
    const navClasses = mobile ? 'flex flex-col w-full space-y-4' : 'flex items-center space-x-6';

    // For mobile view, use simpler navigation
    if (mobile) {
        return (
            <div className={navClasses}>
                <Link
                    href="/"
                    className="block w-full px-3 py-2 text-gray-700 hover:text-blue-500 hover:bg-gray-100 rounded-md font-medium">
                    Home
                </Link>
                <Link
                    href="/about"
                    className="block w-full px-3 py-2 text-gray-700 hover:text-blue-500 hover:bg-gray-100 rounded-md font-medium">
                    About ABDA
                </Link>
                <div className="pl-6 flex flex-col space-y-2">
                    <Link href="/about/research" className="block text-gray-600 hover:text-blue-500 text-sm">
                        Research
                    </Link>
                    <Link href="/about/projects" className="block text-gray-600 hover:text-blue-500 text-sm">
                        Projects
                    </Link>
                    <Link href="/about/members" className="block text-gray-600 hover:text-blue-500 text-sm">
                        Lab Members
                    </Link>
                </div>
                <Link
                    href="/publications"
                    className="block w-full px-3 py-2 text-gray-700 hover:text-blue-500 hover:bg-gray-100 rounded-md font-medium">
                    Publications
                </Link>
                <div className="pl-6 flex flex-col space-y-2">
                    <Link href="/publications/journal" className="block text-gray-600 hover:text-blue-500 text-sm">
                        Journal Papers
                    </Link>
                    <Link href="/publications/conference" className="block text-gray-600 hover:text-blue-500 text-sm">
                        Conference Papers
                    </Link>
                </div>
            </div>
        );
    }

    // Desktop navigation with dropdowns
    return (
        <div className="hidden md:flex space-x-6">
            {/* Home */}
            <div className="relative group">
                <button className="text-gray-700 hover:text-blue-500 transition-colors font-medium py-2 px-3">
                    Home
                </button>
                <div className="absolute left-0 top-full w-56 bg-white shadow-lg rounded-lg p-0 invisible group-hover:visible opacity-0 group-hover:opacity-100 z-50 transform -translate-y-2 group-hover:translate-y-0 transition-all duration-200 border border-gray-100">
                    <div className="p-2">
                        <Link
                            href="/"
                            className="block w-full text-gray-700 hover:text-blue-500 hover:bg-blue-50 py-2 px-3 rounded-md transition-colors">
                            Home
                        </Link>
                    </div>
                </div>
            </div>

            {/* About ABDA */}
            <div className="relative group">
                <button className="text-gray-700 hover:text-blue-500 transition-colors font-medium py-2 px-3">
                    About ABDA
                </button>
                <div className="absolute left-0 top-full min-w-[900px] bg-white shadow-lg rounded-lg invisible group-hover:visible opacity-0 group-hover:opacity-100 z-50 transform -translate-y-2 group-hover:translate-y-0 transition-all duration-200 border border-gray-100">
                    <div className="p-6">
                        <h4 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">
                            About Our Lab
                        </h4>
                        <div className="grid grid-cols-3 gap-6">
                            <ProductItem
                                title="Research"
                                description="Our research in AI, ML, and data analytics"
                                href="/about/research"
                                src="https://images.unsplash.com/photo-1742827871494-3a34fc06b69f?q=80&w=2584&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            />
                            <ProductItem
                                title="Projects"
                                description="Innovative AI projects and applications"
                                href="/about/projects"
                                src="https://images.unsplash.com/photo-1742827871494-3a34fc06b69f?q=80&w=2584&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            />
                            <ProductItem
                                title="Lab Members"
                                description="Our team of researchers and engineers"
                                href="/about/members"
                                src="https://images.unsplash.com/photo-1742827871494-3a34fc06b69f?q=80&w=2584&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Publications */}
            <div className="relative group">
                <button className="text-gray-700 hover:text-blue-500 transition-colors font-medium py-2 px-3">
                    Publications
                </button>
                <div className="absolute left-0 top-full w-64 bg-white shadow-lg rounded-lg invisible group-hover:visible opacity-0 group-hover:opacity-100 z-50 transform -translate-y-2 group-hover:translate-y-0 transition-all duration-200 border border-gray-100">
                    <div className="p-4">
                        <h4 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">
                            Our Research Papers
                        </h4>
                        <div className="space-y-1">
                            <Link
                                href="/publications/journal"
                                className="flex items-center w-full text-gray-700 hover:text-blue-500 hover:bg-blue-50 py-2 px-3 rounded-md transition-colors">
                                <div>
                                    <div className="font-medium">Journal Papers</div>
                                    <div className="text-xs text-gray-500">Peer-reviewed journal publications</div>
                                </div>
                            </Link>
                            <Link
                                href="/publications/conference"
                                className="flex items-center w-full text-gray-700 hover:text-blue-500 hover:bg-blue-50 py-2 px-3 rounded-md transition-colors">
                                <div>
                                    <div className="font-medium">Conference Papers</div>
                                    <div className="text-xs text-gray-500">Papers presented at conferences</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
