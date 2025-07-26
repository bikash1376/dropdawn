import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { sl, dl, text } = await request.json();
    if (!sl || !dl || !text) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }
    const url = `https://ftapi.pythonanywhere.com/translate?sl=${encodeURIComponent(sl)}&dl=${encodeURIComponent(dl)}&text=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    if (!res.ok) {
      return NextResponse.json({ error: 'Translation API error' }, { status: 500 });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
