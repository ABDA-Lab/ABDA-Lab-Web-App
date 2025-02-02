import Link from 'next/link';
import { GalleryVerticalEnd } from 'lucide-react';
import Logo from '@/components/Logo';

export default function HeaderAuth() {
    return (
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
            <Link href="/" className="flex items-center gap-2 font-medium">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <GalleryVerticalEnd className="size-4" />
                </div>
                <Logo />
            </Link>
        </div>
    );
}
