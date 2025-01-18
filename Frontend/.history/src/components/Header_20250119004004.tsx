import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Header() {
    return (
        <header className="w-full py-4 bg-white border-b"></header>
            <div className="container flex items-center justify-between mx-auto max-w-7xl">
                {/* Logo Section */}
                <div>
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={40}
                        height={40}
                        priority
                    />
                </div>

                {/* Navigation Section */}
                <nav className="flex gap-6">
                    <Button variant="ghost">Home</Button>
                    <Button variant="ghost">About</Button>
                    <Button variant="ghost">Services</Button>
                </nav>

                {/* Login Section */}
                <div>
                    <Button>Login</Button>
                </div>
            </div>
        </header>
    );
}
import React from "react";
import { HoveredLink, Menu, MenuItem } from "@/components/ui/menu";

export function NavigationMenu() {
    return (
        <Menu>
            <MenuItem>
                <HoveredLink href="/home">Home</HoveredLink>
            </MenuItem>
            <MenuItem>
                <HoveredLink href="/about">About</HoveredLink>
            </MenuItem>
            <MenuItem>
                <HoveredLink href="/services">Services</HoveredLink>
            </MenuItem>
        </Menu>
    );
}