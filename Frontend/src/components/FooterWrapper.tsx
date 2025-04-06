'use client';
import { usePathname } from 'next/navigation';
import Footer from './Footer';
export default function FooterWrapper() {
    const pathname = usePathname();
    const isAuthRoute = pathname.startsWith('/auth');
    const isDashboardRoute = pathname.startsWith('/dashboard');

    if (isAuthRoute) return null;
    if (isDashboardRoute) return null;
    return <Footer />;
}
