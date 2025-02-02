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

            // Validate the response format
            if (!response || !response.value || !response.value.accessToken) {
                throw new Error('Invalid response format from server.');
            }

            // Save tokens to localStorage
            localStorage.setItem('accessToken', response.value.accessToken);
            localStorage.setItem('refreshToken', response.value.refreshToken);

            // Show success toast and redirect
            toast.success('Login successful! Redirecting to homepage...');
            router.push('/');
        } catch (err: unknown) {
            console.error('Login error:', err);

            let errorMessage = 'Login failed. Please try again.';

            if (err instanceof EntityError) {
                // Handle validation errors (422)
                errorMessage = err.payload?.message || 'Validation error.';
            } else if (err instanceof HttpError) {
                // Handle HTTP errors (e.g., 400, 401, 500)
                errorMessage = err.payload?.message || err.payload?.detail || 'Invalid login credentials.';
            } else if (err instanceof Error) {
                // Handle unexpected errors
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
