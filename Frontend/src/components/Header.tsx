'use client';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchUserProfile, clearProfile } from '@/store/slices/userSlice';
import { useEffect, useState } from 'react';
import Logo from './Logo';
import Link from 'next/link';
import Navigation from './Navigation';
import UserPopover from './UserPopover';

export default function Header() {
    const [isReduxReady, setIsReduxReady] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
        <header className="fixed top-0 inset-x-0 z-50 bg-white shadow-md">
            <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 sm:space-x-4">
                    <Logo />
                    {/* <span className="text-xl font-bold text-gray-800">ABDA Lab</span> */}
                </Link>

                {/* Mobile Menu Button */}
                <button
                    className="block md:hidden text-gray-600 focus:outline-none"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu">
                    {mobileMenuOpen ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    )}
                </button>

                {/* Desktop Navigation */}
                <div className="hidden md:block">
                    <Navigation />
                </div>

                {/* User Actions */}
                <div className="flex items-center">
                    {status === 'loading' ? (
                        <span className="text-gray-500 text-sm sm:text-base">Loading...</span>
                    ) : profile ? (
                        <UserPopover profile={profile} logout={logout} />
                    ) : (
                        <Link
                            href="/auth/login"
                            className="relative inline-flex h-8 sm:h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
                            <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 animate-gradient-x" />
                            <span className="relative inline-flex h-full w-full items-center justify-center rounded-full bg-[#1E293B] px-3 sm:px-6 py-0 text-xs sm:text-sm font-medium text-white backdrop-blur-3xl transition-all hover:bg-opacity-90">
                                Sign in
                            </span>
                        </Link>
                    )}
                </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white py-2 px-4 shadow-lg">
                    <div className="flex flex-col space-y-4">
                        <Navigation mobile={true} />
                    </div>
                </div>
            )}
        </header>
    );
}
