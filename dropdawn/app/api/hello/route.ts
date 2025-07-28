import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Helper function to detect if input is an image URL
function isImageUrl(url: string): boolean {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];
  const lowerUrl = url.toLowerCase();
  return imageExtensions.some(ext => lowerUrl.includes(ext)) || 
         lowerUrl.includes('data:image/') ||
         lowerUrl.includes('blob:');
}

// Helper function to detect if input is base64 image
function isBase64Image(input: string): boolean {
  return input.startsWith('data:image/') && input.includes('base64,');
}

// Helper function to extract image data from base64
function extractImageData(base64String: string): { mimeType: string; data: string } | null {
  const match = base64String.match(/^data:([^;]+);base64,(.+)$/);
  if (match) {
    return {
      mimeType: match[1],
      data: match[2]
    };
  }
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const { input } = await request.json();
    
    if (!input) {
      return NextResponse.json({ error: "Missing input" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing Gemini API key" }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Determine content type and prepare content for Gemini
    let contentType: 'text' | 'image' | 'mixed' = 'text';
    const contents: Array<{
      role: string;
      parts: Array<{
        text?: string;
        inlineData?: {
          mimeType: string;
          data: string;
        };
      }>;
    }> = [];
    
    if (typeof input === 'string') {
      if (isBase64Image(input)) {
        // Handle base64 image
        const imageData = extractImageData(input);
        if (imageData) {
          contents.push({
            role: "user",
            parts: [{
              inlineData: {
                mimeType: imageData.mimeType,
                data: imageData.data
              }
            }]
          });
          contentType = 'image';
        }
      } else if (isImageUrl(input)) {
        // Handle image URL
        contents.push({
          role: "user",
          parts: [{
            inlineData: {
              mimeType: "image/jpeg", // Default mime type for URLs
              data: input
            }
          }]
        });
        contentType = 'image';
      } else {
        // Handle text
        contents.push({
          role: "user",
          parts: [{ text: input }]
        });
        contentType = 'text';
      }
    } else if (typeof input === 'object' && input.text && input.image) {
      // Handle mixed content (text + image)
      const parts = [];
      
      if (input.text) {
        parts.push({ text: input.text });
      }
      
      if (input.image) {
        if (isBase64Image(input.image)) {
          const imageData = extractImageData(input.image);
          if (imageData) {
            parts.push({
              inlineData: {
                mimeType: imageData.mimeType,
                data: imageData.data
              }
            });
          }
        } else if (isImageUrl(input.image)) {
          parts.push({
            inlineData: {
              mimeType: "image/jpeg",
              data: input.image
            }
          });
        }
      }
      
      contents.push({
        role: "user",
        parts: parts
      });
      contentType = 'mixed';
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
    });
    
    const answer = response.text;
    
    return NextResponse.json({ 
      answer,
      contentType,
      inputType: typeof input === 'object' ? 'mixed' : (isImageUrl(input) || isBase64Image(input) ? 'image' : 'text')
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to get answer from Gemini" }, { status: 500 });
  }
} 