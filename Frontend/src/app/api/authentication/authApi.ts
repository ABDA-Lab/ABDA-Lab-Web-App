import http from '@/lib/http';
import { LoginBody, LoginResType } from '@/schemaValidations/auth.schema';

// Login API
export const login = async (username: string, password: string) => {
    const parsedData = LoginBody.parse({ username, password });

    return await http.post<LoginResType>('api/auth/login', parsedData);
};

// Logout API
export const logout = async () => {
    return await http.post('api/auth/logout', {});
};
