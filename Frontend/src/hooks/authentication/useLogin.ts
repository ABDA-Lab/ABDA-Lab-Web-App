import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useAppDispatch } from '@/store/hooks';
import { login } from '@/store/slices/authSlice';
import { fetchUserProfile } from '@/store/slices/userSlice';

export function useLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleLogin = async (username: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            const resultAction = await dispatch(login({ username: username, password }));

            if (login.fulfilled.match(resultAction)) {
                await dispatch(fetchUserProfile());
                toast.success('Login successful!');
                router.push('/');
            } else if (login.rejected.match(resultAction)) {
                throw new Error('Invalid login credentials');
            }
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Unexpected error');
            toast.error(err instanceof Error ? err.message : 'Unexpected error');
        } finally {
            setLoading(false);
        }
    };

    return { handleLogin, loading, error };
}
