
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchUserProfile, clearProfile } from '@/store/slices/userSlice';
import { useEffect, useState } from 'react';
import Logo from './Logo';
import Link from 'next/link';
import Navigation from './Navigation';
import UserPopover from './UserPopover';

import { store } from '@/store/store';

export default function Header() {
    const [isReduxReady, setIsReduxReady] = useState(false);
    const dispatch = useAppDispatch();
    const { profile, status } = useAppSelector((state) => state.user);
    const { accessToken } = useAppSelector((state) => state.auth);

    // Kiểm tra Redux đã sẵn sàng trước khi gọi `dispatch`
    useEffect(() => {
        if (accessToken) {
            setIsReduxReady(true);
        }
    }, [accessToken]);

    // Fetch user profile
    useEffect(() => {
        if (isReduxReady && !profile && status === 'idle') {
            dispatch(fetchUserProfile())
                .unwrap()
                .catch((error) => console.error('❌ Error fetching user profile:', error));
        }
    }, [isReduxReady, profile, status, dispatch]);

    const logout = () => {
        dispatch(clearProfile());
        if (typeof window !== 'undefined') {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/auth/login';
        }
    };

    return (
        <header className="z-50 relative">
            <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
                <Link href="/" className="flex items-center space-x-4">
                    <Logo />
                </Link>
                <Navigation />
                <div className="flex items-center space-x-4">
                    {status === 'loading' ? (
                        <span>Loading...</span>
                    ) : profile ? (
                        <UserPopover profile={profile} logout={logout} />
                    ) : (
                        <Link
                            href="/auth/login"
                            className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                                Sign in
                            </span>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
