'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';

export default function HeaderWrapper() {
    const pathname = usePathname();
    const isAuthRoute = pathname.startsWith('/auth');

    if (isAuthRoute) return null;

    return <Header />;
}
