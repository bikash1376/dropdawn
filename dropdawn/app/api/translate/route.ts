import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { sl, dl, text } = await request.json();
    
    // Validate required parameters
    if (!sl || !dl || !text) {
      return NextResponse.json({ 
        error: 'Please provide source language, destination language, and text to translate' 
      }, { status: 400 });
    }

    // Validate text length
    if (text.length > 500) {
      return NextResponse.json({ 
        error: 'Text is too long. Please keep it under 500 characters.' 
      }, { status: 400 });
    }

    const url = `https://ftapi.pythonanywhere.com/translate?sl=${encodeURIComponent(sl)}&dl=${encodeURIComponent(dl)}&text=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    
    if (!res.ok) {
      if (res.status === 404) {
        return NextResponse.json({ 
          error: 'Translation service not available. Please try again later.' 
        }, { status: 503 });
      } else if (res.status === 400) {
        return NextResponse.json({ 
          error: 'Invalid language codes or text. Please check your input.' 
        }, { status: 400 });
      } else {
        return NextResponse.json({ 
          error: 'Translation service is temporarily unavailable. Please try again in a few minutes.' 
        }, { status: 503 });
      }
    }

    const data = await res.json();
    
    // Check if the API returned an error in the response body
    if (data.error) {
      return NextResponse.json({ 
        error: 'Translation failed. Please check your language codes and try again.' 
      }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Translation API error:', error);
    return NextResponse.json({ 
      error: 'Unable to connect to translation service. Please check your internet connection and try again.' 
    }, { status: 500 });
  }
}
