import { NextRequest, NextResponse } from 'next/server';

/**
 * API route that:
 * 1) Calls your backend to get the CloudFront-signed cookie data.
 * 2) Stores only an "expiryHour" cookie locally, so we know we have a valid set.
 * 3) Returns the CloudFront-signed cookies in the JSON body so the client can
 *    call CloudFront’s /set-cookie endpoint directly.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ResourceUrl, ExpiryHour } = body;

    if (!ResourceUrl || !ExpiryHour) {
      return NextResponse.json(
        { error: 'Missing ResourceUrl or ExpiryHour in the request body' },
        { status: 400 }
      );
    }

    // 1) Call your own backend for the signed cookies
    const backendResponse = await fetch('http://localhost:2406/api/resource/generate-signed-cookie', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ResourceUrl, ExpiryHour }),
    });

    if (!backendResponse.ok) {
      const error = await backendResponse.json();
      return NextResponse.json(
        { error: `Failed to fetch signed cookies: ${JSON.stringify(error)}` },
        { status: backendResponse.status }
      );
    }

    const result = await backendResponse.json();
    const { value: cookies, isSuccess } = result;

    if (!isSuccess || !cookies) {
      return NextResponse.json(
        { error: 'Failed to generate signed cookies' },
        { status: 500 }
      );
    }

    // 2) Store ONLY the expiryHour as a local cookie
    const responseHeaders = new Headers();

    // 3) Return a JSON response with the CloudFront cookies
    //    so the client can set them on drolbzkvfj3fm.cloudfront.net
    return new NextResponse(
      JSON.stringify({
        message: 'Got CloudFront cookie data. Local marker set.',
        data: cookies, // e.g. { CloudFront-Policy, CloudFront-Signature, Key-Pair-Id, auth, ts, ... }
        expiryHour: ExpiryHour,
      }),
      {
        status: 200,
        headers: {
          ...Object.fromEntries(responseHeaders.entries()),
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error in set-cookie-marker route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
