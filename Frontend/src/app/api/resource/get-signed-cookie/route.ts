import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const response = await fetch('http://localhost:2406/api/resource/generate-signed-cookie', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ResourceUrl: '/*', ExpiryHour: 1 }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { value, isSuccess } = await response.json();

        if (isSuccess) {
            const res = NextResponse.json({ success: true });

            res.cookies.set('CloudFront-Policy', value['CloudFront-Policy'], {
                path: '/',
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            });

            res.cookies.set('CloudFront-Signature', value['CloudFront-Signature'], {
                path: '/',
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            });

            res.cookies.set('CloudFront-Key-Pair-Id', value['CloudFront-Key-Pair-Id'], {
                path: '/',
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            });

            return res;
        } else {
            return NextResponse.json(
                { success: false, error: 'Failed to generate signed cookie' },
                { status: 500 }
            );
        }
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                error: error.message || 'Something went wrong',
            },
            { status: 500 }
        );
    }
}
