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
    payload: { message: string; detail?: string; [key: string]: any };

    constructor({ status, payload }: { status: number; payload: any }) {
        super(payload.detail || payload.message || 'Http Error');
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

let clientLogoutRequest: null | Promise<any> = null;

export const isClient = () => typeof window !== 'undefined';

const request = async <Response>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, options?: CustomOptions) => {
    let body: FormData | string | undefined;
    if (options?.body instanceof FormData) {
        body = options.body;
    } else if (options?.body) {
        body = JSON.stringify(options.body);
    }

    const baseHeaders: Record<string, string> = body instanceof FormData ? {} : { 'Content-Type': 'application/json' };

    if (isClient()) {
        const sessionToken = localStorage.getItem('sessionToken');
        if (sessionToken) {
            baseHeaders.Authorization = `Bearer ${sessionToken}`;
        }
    }

    const baseUrl = options?.baseUrl || envConfig.NEXT_PUBLIC_API_ENDPOINT;
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
            credentials: 'include',
        });

        const contentType = res.headers.get('content-type');

        let payload;

        if (contentType && contentType.includes('application/json')) {
            try {
                payload = await res.json();

                // Kiểm tra nếu là `application/problem+json`
                if (contentType.includes('application/problem+json')) {
                    // Xử lý theo cấu trúc RFC 7807
                    const problemMessage = payload.detail || payload.title || `HTTP Error ${res.status}`;
                    throw new HttpError({
                        status: res.status,
                        payload: {
                            message: problemMessage,
                            raw: payload, // Lưu toàn bộ raw response để debug
                        },
                    });
                }

                // Nếu là JSON bình thường, xử lý như cũ
                if (!res.ok) {
                    const errorMessage = payload.detail || payload.message || `HTTP Error ${res.status}`;
                    throw new HttpError({
                        status: res.status,
                        payload: {
                            message: errorMessage,
                            raw: payload, // Lưu raw payload để dễ debug
                        },
                    });
                }
            } catch (error) {
                throw new HttpError({
                    status: res.status,
                    payload: {
                        message: `Failed to parse JSON. Status: ${res.status}`,
                        raw: error instanceof Error ? error.message : String(error),
                    },
                });
            }
        } else {
            const text = await res.text();
            throw new HttpError({
                status: res.status,
                payload: {
                    message: `Unexpected response format. Status: ${res.status}`,
                    raw: text,
                },
            });
        }


        if (!res.ok) {
            // Kiểm tra và xử lý lỗi với `detail` hoặc `message`
            if (payload && (payload.detail || payload.message)) {
                throw new HttpError({
                    status: res.status,
                    payload: {
                        message: payload.detail || payload.message,
                        raw: payload,
                    },
                });
            }

            throw new HttpError({
                status: res.status,
                payload: {
                    message: `HTTP error: ${res.status}`,
                    raw: payload || 'Unexpected error format.',
                },
            });
        }


        return payload;
    } catch (error) {
        console.error('HTTP Request Error:', error);

        if (error instanceof HttpError) {
            throw error;
        }

        throw new Error(error instanceof Error ? error.message : 'Unexpected network error. Please try again.');
    }
};


async function handleClientLogout() {
    if (!clientLogoutRequest) {
        clientLogoutRequest = fetch('/api/auth/logout', {
            method: 'POST',
            body: JSON.stringify({ force: true }),
            headers: { 'Content-Type': 'application/json' },
        });

        try {
            await clientLogoutRequest;
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            localStorage.removeItem('sessionToken');
            clientLogoutRequest = null;
            window.location.href = '/login';
        }
    }
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
