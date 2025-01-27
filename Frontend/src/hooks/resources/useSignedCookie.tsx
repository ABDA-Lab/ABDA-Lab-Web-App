import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';

const COOKIE_NAMES = ['CloudFront-Policy', 'CloudFront-Signature', 'CloudFront-Key-Pair-Id'];

const isCookieExpired = (): boolean => {
    const cookies = parseCookies();
    return !COOKIE_NAMES.every((cookieName) => cookies[cookieName]);
};

const useCookieHandler = () => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const updateCookies = async () => {
            if (isCookieExpired()) {
                setIsLoading(true);
                try {
                    const response = await fetch('/api/resource/get-signed-cookie', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({}),
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const data = await response.json();

                    if (data.success) {
                        console.log('Cookies updated successfully');
                    } else {
                        console.error('Failed to update cookies');
                    }
                } catch (error) {
                    console.error('Error updating cookies:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        updateCookies();
    }, []);

    return { isLoading };
};

export default useCookieHandler;
