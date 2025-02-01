'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';

export default function HeaderWrapper() {
    const pathname = usePathname();
    const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register');

    if (isAuthRoute) return null;

    return <Header />;
}
