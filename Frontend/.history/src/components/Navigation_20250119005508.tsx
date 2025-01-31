'use client';
import { useState } from 'react';
import { Menu, MenuItem, ProductItem } from './ui/navbar-menu';
import Link from 'next/link';

export default function Navigation() {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    return (
        <Menu setActive={setActiveMenu}>
            <MenuItem item="Home" active={activeMenu} setActive={setActiveMenu}>
                <Link 
                    title="Home" 
                    href="/" 
                    className="flex items-center space-x-4 hover:text-blue-500 transition-colors"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="h-4 w-4"
                    >
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                        <polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                    <span>Home</span>
                </Link>
            </MenuItem>
            <MenuItem item="About ABDA" active={activeMenu} setActive={setActiveMenu}>
                <div className="grid grid-cols-3 gap-4">
                    <ProductItem
                        title="Research"
                        description="Our research in AI, ML, and data analytics"
                        href=""
                        src="https://www.vinai.io/wp-content/uploads/2023/01/3.-ML-shutterstock_2152292393-Horizontal-2560-px.jpg"
                    />
                    <ProductItem
                        title="Projects"
                        description="Innovative AI projects and applications"
                        href=""
                        src="https://research.vinai.io/wp-content/uploads/2023/09/5-Amazing-Examples-Of-Natural-Language-Processing-NLP-In-Practice-1200x639-1-1024x545.jpg"
                    />
                    <ProductItem
                        title="Lab Members"
                        description="Our team of researchers and engineers"
                        href=""
                        src="https://news.vinai.io/wp-content/uploads/2025/01/VinAI-at-CES-2025.jpg"
                    />
                    <ProductItem
                        title="Alumni Members"
                        description="Our distinguished alumni network"
                        href=""
                        src="https://plus.unsplash.com/premium_photo-1679429320956-f6171b6f006b?q=80&w=3269&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                    <ProductItem
                        title="Colaboration"
                        description="Partner with us on research projects"
                        href=""
                        src="https://research.vinai.io/wp-content/uploads/2023/10/Machine-learning-1024x512.jpg"
                    />
                    <ProductItem
                        title="Contact"
                        description="Get in touch with our team"
                        href=""
                        src="https://www.vinai.io/wp-content/uploads/MirrorSense-CES-Award-KV-1.png"
                    />
                </div>
            </MenuItem>
            <MenuItem item="Publications" active={activeMenu} setActive={setActiveMenu}>
                <div className="flex flex-col space-y-4">
                    <Link title="Journal Papers" href="/" className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                        </svg>
                        <span>Journal Papers</span>
                    </Link>
                    <Link title="Conference Papers" href="/" className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                            <line x1="16" x2="16" y1="2" y2="6" />
                            <line x1="8" x2="8" y1="2" y2="6" />
                            <line x1="3" x2="21" y1="10" y2="10" />
                        </svg>
                        <span>Conferences Papers</span>
                    </Link>
                </div>
            </MenuItem>
            <MenuItem item="Sharing" active={activeMenu} setActive={setActiveMenu}>
                <ProductItem title="" description=" Test content" href="" src="" />
            </MenuItem>
            <MenuItem item="Events" active={activeMenu} setActive={setActiveMenu}>
                <ProductItem title="" description=" Test content" href="" src="" />
            </MenuItem>
        </Menu>
    );
}
