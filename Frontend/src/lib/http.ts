import envConfig from '@/config';
import { normalizePath } from '@/lib/utils';
import { LoginResType } from '@/schemaValidations/auth.schema';
import { redirect } from 'next/navigation';

type CustomOptions = Omit<RequestInit, 'method'> & {
    baseUrl?: string | undefined;
};

const ENTITY_ERROR_STATUS = 422;
const AUTHENTICATION_ERROR_STATUS = 401;

type EntityErrorPayload = {
    message: string;
    errors?: { field: string; message: string }[];
};

export class HttpError extends Error {
    status: number;
    payload: {
        message: string;
        [key: string]: any;
    };
    constructor({ status, payload }: { status: number; payload: any }) {
        super(payload.message || 'Http Error');
        this.status = status;
        this.payload = payload;
    }
}

export class EntityError extends HttpError {
    status: 422;
    payload: EntityErrorPayload;
    constructor({ status, payload }: { status: 422; payload: EntityErrorPayload }) {
        super({ status, payload });
        this.status = status;
        this.payload = payload;
    }
}

const clientLogoutRequest: null | Promise<any> = null;
export const isClient = () => typeof window !== 'undefined';

const request = async <Response>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    options?: CustomOptions | undefined
) => {
    let body: FormData | string | undefined = undefined;
    if (options?.body instanceof FormData) {
        body = options.body;
    } else if (options?.body) {
        body = JSON.stringify(options.body);
    }

    const baseHeaders: Record<string, string> = body instanceof FormData ? {} : { 'Content-Type': 'application/json' };

    if (isClient()) {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            baseHeaders.Authorization = `Bearer ${accessToken}`;
        }
    }

    const baseUrl = options?.baseUrl === undefined ? envConfig.NEXT_PUBLIC_API_ENDPOINT : options.baseUrl;

    if (!baseUrl) {
        throw new Error('API base URL is not defined. Check your environment configuration.');
    }

    const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;

    try {
        const res = await fetch(fullUrl, {
            ...options,
            headers: { ...baseHeaders, ...options?.headers },
            body,
            method,
        });

        const contentType = res.headers.get('content-type');
        let payload: Response;

        if (contentType && contentType.includes('application/json')) {
            payload = await res.json();
        } else {
            const text = await res.text();
            throw new HttpError({
                status: res.status,
                payload: { message: `Unexpected response format. Status: ${res.status}`, raw: text },
            });
        }

        if (!res.ok) {
            if (res.status === ENTITY_ERROR_STATUS) {
                throw new EntityError({ status: ENTITY_ERROR_STATUS, payload: payload as EntityErrorPayload });
            } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
                await handleAuthError();
                // Retry the request after token refresh
                return await request<Response>(method, url, options);
            } else {
                throw new HttpError({ status: res.status, payload });
            }
        }

        if (isClient() && ['auth/login', 'auth/refresh'].some((item) => item === normalizePath(url))) {
            const { value } = payload as unknown as { value: { accessToken: string; refreshToken: string } };
            if (value) {
                localStorage.setItem('accessToken', value.accessToken);
                localStorage.setItem('refreshToken', value.refreshToken);
            }
        }

        return payload;
    } catch (error) {
        console.error('HTTP Request Error:', error);

        if (error instanceof HttpError || error instanceof EntityError) {
            throw error;
        }

        throw new Error('Unexpected network error. Please check your connection and try again.');
    }
};

async function handleAuthError() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
        try {
            const response = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/refresh`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken }),
            });

            const data = await response.json();

            if (response.ok && data.value) {
                localStorage.setItem('accessToken', data.value.accessToken);
                localStorage.setItem('refreshToken', data.value.refreshToken);
            } else {
                await handleLogout();
            }
        } catch (error) {
            console.error('Token refresh failed:', error);
            await handleLogout();
        }
    } else {
        await handleLogout();
    }
}

async function handleLogout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
}

const http = {
    get<Response>(url: string, options?: Omit<CustomOptions, 'body'>) {
        return request<Response>('GET', url, options);
    },
    post<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'>) {
        return request<Response>('POST', url, { ...options, body });
    },
    put<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'>) {
        return request<Response>('PUT', url, { ...options, body });
    },
    delete<Response>(url: string, options?: Omit<CustomOptions, 'body'>) {
        return request<Response>('DELETE', url, options);
    },
};

export default http;
