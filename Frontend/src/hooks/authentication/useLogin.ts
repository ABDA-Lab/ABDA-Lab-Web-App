import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { login } from '@/app/api/authentication/authApi';
import { HttpError, EntityError } from '@/lib/http';

export function useLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (username: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            // Call the login API
            const response = await login(username, password);

            // Save the token and redirect
            localStorage.setItem('token', response.value);
            toast.success('Login successful! Redirecting to dashboard...');
            router.push('/');
        } catch (err: any) {
            console.error('Login error:', err);

            let errorMessage = 'Login failed. Please try again.';

            // Handle validation errors (422)
            if (err instanceof EntityError) {
                errorMessage = err.payload?.message || 'Validation error.';
            }
            // Handle HTTP errors (e.g., 400, 401, 500)
            else if (err instanceof HttpError) {
                errorMessage = err.payload?.message || 'Invalid login credentials.';
            }
            // Handle unexpected network or other errors
            else if (err.message) {
                errorMessage = err.message;
            }

            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return { handleLogin, loading, error };
}
