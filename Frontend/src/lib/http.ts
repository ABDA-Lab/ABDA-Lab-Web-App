import envConfig from '@/config';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

const baseUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT;

const config = {
    baseUrl,
    timeout: 10000,
};

const http = axios.create(config);
http.defaults.baseURL = baseUrl;

const handleBefore = async (config: any) => {
    const accessToken = Cookies.get('accessToken')?.replaceAll('"', '');
    if (accessToken) {
        const tokenExpiry = (jwtDecode(accessToken)?.exp ?? 0) * 1000;
        if (Date.now() >= tokenExpiry) {
            try {
                const refreshToken = Cookies.get('refreshToken')?.replaceAll('"', '');
                const response = await axios.post(`${baseUrl}/auth/refresh`, {
                    refreshToken,
                });
                const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data.value;
                Cookies.set('accessToken', newAccessToken, {
                    expires: 1,
                    secure: true,
                });
                Cookies.set('refreshToken', newRefreshToken, {
                    expires: 7,
                    secure: true,
                });
            } catch (error) {
                console.error('❌ Token refresh failed:', error);
                Cookies.remove('accessToken');
                Cookies.remove('refreshToken');
                window.location.href = 'auth/login';
            }
        }
    }
    config.headers['Content-Type'] = 'application/json';
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
};

const handleResponse = (response: any) => {
    if (response.status === 200) {
        return response.data;
    }
    throw new Error('Request failed');
};

const handleError = (error: any) => {
    if (error.response) {
        const { status, data } = error.response;
        if (status === 401) {
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
            window.location.href = 'auth/login';
        }
        return Promise.reject(data);
    }
    return Promise.reject(error);
};

http.interceptors.request.use(handleBefore, (error) => {
    return Promise.reject(error);
});

http.interceptors.response.use(handleResponse, handleError);

export default http;
