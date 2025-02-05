import { register } from '@/app/api/authentication/authApi';
import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export function useRegister() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleRegister = useCallback(
        async (username: string, password: string, confirmPassword: string) => {
            setLoading(true);
            setError(null);

            try {
                await register(username, password, confirmPassword);
                toast.success('Registration successful! Redirecting to login...');
                router.push('/auth/login');
            } catch (err: unknown) {
                const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
                setError(errorMessage);
                toast.error(errorMessage);
                console.error('Registration error:', err);
            } finally {
                setLoading(false);
            }
        },
        [router]
    );

    return { handleRegister, loading, error };
}
