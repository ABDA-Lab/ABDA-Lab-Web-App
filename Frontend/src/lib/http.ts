import envConfig from '@/config';
import { normalizePath } from '@/lib/utils';
import { store } from '@/store/store';
import { clearProfile } from '@/store/slices/userSlice';
import { updateTokens } from '@/store/slices/authSlice';

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

export const isClient = () => typeof window !== 'undefined';

const getAccessToken = (): string | null => {
    if (isClient()) {
        return localStorage.getItem('accessToken');
    }
    return null;
};

const logRequest = (method: string, url: string, options: CustomOptions | undefined) => {
    console.log(`[HTTP ${method}] ${url}`, {
        headers: options?.headers,
        body: options?.body,
        baseUrl: options?.baseUrl,
    });
};

async function handleLogout() {
    if (isClient()) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        store.dispatch(clearProfile());
        window.location.href = '/login';
    }
}

async function handleAuthError() {
    if (!isClient()) {
        console.error('❌ handleAuthError() được gọi trên Server. Bỏ qua...');
        return;
    }

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

                // 🚨 Dùng import động để phá vòng lặp dependency
                const { updateTokens } = await import('@/store/slices/authSlice');
                store.dispatch(updateTokens(data.value));
            } else {
                await handleLogout();
            }
        } catch (error) {
            console.error('❌ Token refresh failed:', error);
            await handleLogout();
        }
    } else {
        await handleLogout();
    }
}

const normalizeUrl = (url: string) => (url.startsWith('/') ? url : `/${url}`);

const request = async <Response>(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    url: string,
    options?: CustomOptions
) => {
    logRequest(method, url, options);

    let body: FormData | string | undefined = undefined;
    if (options?.body instanceof FormData) {
        body = options.body;
    } else if (options?.body) {
        body = JSON.stringify(options.body);
    }

    const baseHeaders: Record<string, string> = body instanceof FormData ? {} : { 'Content-Type': 'application/json' };
    const accessToken = getAccessToken();

    if (accessToken) {
        baseHeaders.Authorization = `Bearer ${accessToken}`;
    }

    const baseUrl = options?.baseUrl === undefined ? envConfig.NEXT_PUBLIC_API_ENDPOINT : options.baseUrl;

    if (!baseUrl) {
        throw new Error('❌ API base URL is not defined. Check your environment configuration.');
    }

    const fullUrl = normalizeUrl(url).startsWith('/')
        ? `${baseUrl}${normalizeUrl(url)}`
        : `${baseUrl}/${normalizeUrl(url)}`;

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
                payload: { message: `❌ Unexpected response format. Status: ${res.status}`, raw: text },
            });
        }

        if (!res.ok) {
            if (res.status === ENTITY_ERROR_STATUS) {
                throw new EntityError({ status: ENTITY_ERROR_STATUS, payload: payload as EntityErrorPayload });
            } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
                await handleAuthError();
                return await request<Response>(method, url, options);
            } else {
                throw new HttpError({ status: res.status, payload });
            }
        }

        return payload;
    } catch (error) {
        console.error('❌ HTTP Request Error:', error);

        if (error instanceof HttpError || error instanceof EntityError) {
            throw error;
        }

        throw new Error('❌ Unexpected network error. Please check your connection and try again.');
    }
};

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
    patch<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'>) {
        return request<Response>('PATCH', url, { ...options, body });
    },
    delete<Response>(url: string, options?: Omit<CustomOptions, 'body'>) {
        return request<Response>('DELETE', url, options);
    },
};

export default http;
