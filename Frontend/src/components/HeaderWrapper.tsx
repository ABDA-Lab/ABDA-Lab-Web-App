'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';

export default function HeaderWrapper() {
    const pathname = usePathname();
    const isAuthRoute = pathname.startsWith('/auth');
    const isDashboardRoute = pathname.startsWith('/dashboard');

    if (isAuthRoute) return null;
    if (isDashboardRoute) return null;
    return <Header />;
}
