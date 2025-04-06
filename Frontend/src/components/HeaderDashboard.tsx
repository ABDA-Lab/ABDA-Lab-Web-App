'use client';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { SidebarTrigger } from './ui/sidebar';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from './ui/breadcrumb';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { UserIcon, LogOut, Settings } from 'lucide-react';

import { useRef, useState } from 'react';

export default function HeaderDashboard() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 150); // Small delay to prevent flickering
    };
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator className="mr-2 h-4" />
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">Shared Folder</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Contents</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* User profile section with hover functionality */}
            <div
                ref={dropdownRef}
                className="ml-auto flex items-center gap-2 relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="/avatars/user-avatar.png" alt="User avatar" />
                        <AvatarFallback>
                            <UserIcon className="h-4 w-4" />
                        </AvatarFallback>
                    </Avatar>
                </Button>

                {isOpen && (
                    <div
                        className="absolute top-full right-0 mt-1 z-50 w-56 bg-popover p-4 shadow-md rounded-md"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}>
                        <div className="flex flex-col space-y-1 mb-2">
                            <p className="text-sm font-medium">User Name</p>
                            <p className="text-xs text-muted-foreground">user@example.com</p>
                        </div>
                        <div className="h-px bg-muted my-2"></div>
                        <div className="space-y-2">
                            <button className="flex items-center w-full hover:bg-accent hover:text-accent-foreground rounded px-2 py-1.5 text-sm">
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Edit Profile</span>
                            </button>
                        </div>
                        <div className="h-px bg-muted my-2"></div>
                        <button className="flex items-center w-full hover:bg-accent hover:text-accent-foreground rounded px-2 py-1.5 text-sm">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}
