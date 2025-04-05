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
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className={cn('text-gray-700 hover:text-blue-500 transition-colors font-medium')}>
                        Home
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white shadow-lg rounded-lg p-4">
                    <DropdownMenuItem>
                        <Link href="/" className="w-full text-gray-700 hover:text-blue-500">
                            Home
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* About ABDA */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className={cn('text-gray-700 hover:text-blue-500 transition-colors font-medium')}>
                        About ABDA
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white shadow-lg rounded-lg grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
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
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Publications */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className={cn('text-gray-700 hover:text-blue-500 transition-colors font-medium')}>
                        Publications
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white shadow-lg rounded-lg p-4">
                    <DropdownMenuItem>
                        <Link href="/publications/journal" className="w-full text-gray-700 hover:text-blue-500">
                            Journal Papers
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="/publications/conference" className="w-full text-gray-700 hover:text-blue-500">
                            Conference Papers
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
