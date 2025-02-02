import http from '@/lib/http';
import { LoginBody, LoginResType } from '@/schemaValidations/auth.schema';

// Login API
export const login = async (username: string, password: string) => {
    const parsedData = LoginBody.parse({ username, password });

    return await http.post<LoginResType>('api/auth/login', parsedData);
};

// // Register API
// export const register = async (name: string, email: string, password: string, confirmPassword: string) => {
//     // Validate dữ liệu đầu vào bằng schema RegisterBody
//     const parsedData = RegisterBody.parse({ name, email, password, confirmPassword });

//     // Gửi request đến API
//     return await http.post<RegisterResType>('/auth/register', parsedData);
// };

// // Get profile API
// export const getProfile = async () => {
//     return await http.get('/auth/profile');
// };
