import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchUserProfile, clearProfile } from '@/store/slices/userSlice';
import { useEffect, useState } from 'react';

export function useAuth() {
    const dispatch = useAppDispatch();
    const { profile, status } = useAppSelector((state) => state.user);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!profile && status === 'idle') {
            setLoading(true);
            dispatch(fetchUserProfile())
                .unwrap()
                .catch((error) => console.error('❌ Error fetching user profile:', error))
                .finally(() => setLoading(false));
        }
    }, [profile, status, dispatch]);

    const logout = () => {
        dispatch(clearProfile());
        if (typeof window !== 'undefined') {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/auth/login';
        }
    };

    return {
        profile: profile || null, 
        status: loading ? 'loading' : status, 
        logout,
    };
}
