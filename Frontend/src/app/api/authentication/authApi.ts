import http from '@/lib/http';
import { LoginBody, LoginResType, RegisterBody } from '@/schemaValidations/auth.schema';

// Login API
export const login = async (username: string, password: string) => {
    const parsedData = LoginBody.parse({ username, password });

    return await http.post<LoginResType>('api/auth/login', parsedData);
};

// Logout API
export const logout = async () => {
    return await http.post('api/auth/logout', {});
};

// Register API
export const register = async (username: string, password: string, confirmPassword: string) => {
    const parsedData = RegisterBody.parse({ username, password, confirmPassword });

    return await http.post('api/auth/register', parsedData);
};
