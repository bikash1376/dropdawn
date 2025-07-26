import React from "react";
import { marked } from 'marked';

type AnswerProps = {
  answer: string;
  className?: string;
  contentType?: 'text' | 'image' | 'mixed';
  inputType?: 'text' | 'image' | 'mixed';
  input?: string | { text?: string; image?: string };
};

export default function Answer({ answer, className, contentType, inputType, input }: AnswerProps) {
  if (!answer) return null;

  // Configure marked to handle links properly
  const html = marked(answer, {
    breaks: true,
    gfm: true
  });

  // Add target="_blank" to all links using a simple string replacement
  const processedHtml = String(html).replace(/<a\s+href=/gi, '<a target="_blank" rel="noopener noreferrer" href=');

  return (
    <div className={`${className} space-y-4`}>
      {/* Display input content type indicator */}
      {inputType && (
        <div className="text-xs text-neutral-400 mb-2">
          <span className="inline-block px-2 py-1 bg-neutral-700 rounded-md">
            {inputType === 'image' ? '🖼️ Image Input' : 
             inputType === 'mixed' ? '📝 Mixed Input' : '💬 Text Input'}
          </span>
        </div>
      )}

      {/* Display input preview for images */}
      {inputType === 'image' && typeof input === 'string' && (
        <div className="mb-4 p-3 bg-neutral-800 rounded-lg border border-neutral-700">
          <div className="text-xs text-neutral-400 mb-2">Input Image:</div>
          <div className="flex justify-center">
            <img 
              src={input} 
              alt="Input" 
              className="max-w-full max-h-48 rounded-lg object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = 'none';
                ((e.currentTarget as HTMLElement).nextElementSibling as HTMLElement)!.style.display = 'block';
              }}
            />
            <div className="hidden text-neutral-500 text-sm items-center justify-center">
              Image preview unavailable
            </div>
          </div>
        </div>
      )}

      {/* Display mixed input preview */}
      {inputType === 'mixed' && typeof input === 'object' && input.text && input.image && (
        <div className="mb-4 p-3 bg-neutral-800 rounded-lg border border-neutral-700">
          <div className="text-xs text-neutral-400 mb-2">Input:</div>
          <div className="space-y-3">
            <div className="text-sm text-neutral-300">{input.text}</div>
            <div className="flex justify-center">
              <img 
                src={input.image} 
                alt="Input" 
                className="max-w-full max-h-32 rounded-lg object-contain"
                               onError={(e) => {
                 (e.currentTarget as HTMLElement).style.display = 'none';
                 ((e.currentTarget as HTMLElement).nextElementSibling as HTMLElement)!.style.display = 'block';
               }}
              />
              <div className="hidden text-neutral-500 text-sm items-center justify-center">
                Image preview unavailable
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Display AI response */}
      <div className="p-3 bg-neutral-800 rounded-lg border border-neutral-700">
        <div className="text-xs text-neutral-400 mb-2">AI Response:</div>
        <div 
          className="prose prose-invert prose-sm max-w-none [&_a]:text-blue-400 [&_a]:underline [&_a]:hover:text-blue-300"
          dangerouslySetInnerHTML={{ __html: processedHtml }}
        />
      </div>
    </div>
  );
} 