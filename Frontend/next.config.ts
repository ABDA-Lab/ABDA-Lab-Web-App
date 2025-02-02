import type { NextConfig } from 'next';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

if (!apiBaseUrl) {
    throw new Error('NEXT_PUBLIC_API_ENDPOINT is not defined in .env.local');
}

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
                pathname: '**',
            },
        ],
    },

    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${apiBaseUrl}/api/:path*`,
            },
        ];
    },
};

console.log('Proxying API requests to:', apiBaseUrl);

export default nextConfig;
