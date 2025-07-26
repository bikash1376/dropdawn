import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    if (!url) {
      return NextResponse.json({ error: 'Missing url' }, { status: 400 });
    }
    const apiKey = process.env.NEXT_PUBLIC_TINYURLAPI_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'TinyURL API key not set' }, { status: 500 });
    }
    const res = await fetch('https://api.tinyurl.com/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });
    if (!res.ok) {
      return NextResponse.json({ error: 'TinyURL API error' }, { status: 500 });
    }
    const data = await res.json();
    if (!data.data || !data.data.tiny_url) {
      return NextResponse.json({ error: 'TinyURL API did not return a short URL' }, { status: 500 });
    }
    return NextResponse.json({ shortUrl: data.data.tiny_url });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
} 