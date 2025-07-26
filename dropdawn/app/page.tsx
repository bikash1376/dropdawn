'use client'
// import Search from "./components/Seach";
import Answer from "./components/answer";
import React, { useState } from "react";
import { processPrompt } from "./utils/promptTools";
import { Space_Mono } from 'next/font/google';

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const TOOL_COMMANDS = [
  ':rephrase',
  ':summarise',
  ':describe',
  ':analyze',
  ':rtc',
  ':echo',
  ':evaluate',
  ':help',
  ':about',
  ':author',
  ':weather',
  ':translate',
  ':shorten',
  ':memes',
  ':api',
  ':realtime',
  ':donate',
  ':building',
];

export default function Home() {
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownOptions, setDropdownOptions] = useState<string[]>([]);
  const [dropdownIndex, setDropdownIndex] = useState(0);
  const [contentType, setContentType] = useState<'text' | 'image' | 'mixed'>('text');
  const [inputType, setInputType] = useState<'text' | 'image' | 'mixed'>('text');
  const [currentInput, setCurrentInput] = useState<string | { text?: string; image?: string }>('');

  // Handle input change and dropdown logic
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    // Show dropdown if input starts with ':' and filter options
    const match = val.match(/^:(\w*)$/);
    if (match) {
      const filter = match[1].toLowerCase();
      const filtered = TOOL_COMMANDS.filter(cmd => cmd.startsWith(':' + filter));
      setDropdownOptions(filtered);
      setShowDropdown(filtered.length > 0);
      setDropdownIndex(0);
    } else {
      setShowDropdown(false);
    }
  };

  // Handle dropdown selection (keyboard/mouse)
  const handleDropdownSelect = (option: string) => {
    setInput(option + ' ');
    setShowDropdown(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (showDropdown && dropdownOptions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setDropdownIndex(i => (i + 1) % dropdownOptions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setDropdownIndex(i => (i - 1 + dropdownOptions.length) % dropdownOptions.length);
      } else if (e.key === 'Enter') {
        if (input.match(/^:(\w*)$/)) {
          e.preventDefault();
          handleDropdownSelect(dropdownOptions[dropdownIndex]);
        }
      }
    }
  };

  const handleInputBlur = () => {
    setTimeout(() => setShowDropdown(false), 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim().length < 2) return;
    setLoading(true);
    setError("");
    setAnswer("");
    setHasSubmitted(true);
    setCurrentInput(input);
    
    const processedInput = processPrompt(input);
    
    // Handle different command types
    switch (processedInput.type) {
      case 'redirect':
        // Open URL in new tab
        window.open(processedInput.url, '_blank');
        setAnswer(processedInput.content);
        setContentType('text');
        setInputType('text');
        setLoading(false);
        return;
        
      case 'echo':
        // Display message as is
        setAnswer(processedInput.content);
        setContentType('text');
        setInputType('text');
        setLoading(false);
        return;
        
      case 'evaluate':
        // Evaluate math expression
        try {
          const result = eval(processedInput.mathExpression || '');
          setAnswer(`${processedInput.content}\n\nResult: ${result}`);
        } catch (error) {
          setError(`Invalid math expression: ${processedInput.mathExpression}`);
        }
        setContentType('text');
        setInputType('text');
        setLoading(false);
        return;
        
      case 'help':
      case 'about':
      case 'author':
        // Display help, about, or author information
        setAnswer(processedInput.content);
        setContentType('text');
        setInputType('text');
        setLoading(false);
        return;
        
      case 'ai':
        // Send to AI API
        try {
          const res = await fetch("/api/hello", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ input: processedInput.content }),
          });
          const data = await res.json();
          if (res.ok) {
            setAnswer(data.answer);
            setContentType(data.contentType || 'text');
            setInputType(data.inputType || 'text');
          } else {
            setError(data.error || "Something went wrong");
          }
        } catch (err) {
          setError("Failed to fetch answer");
        } finally {
          setLoading(false);
        }
        return;
      case 'weather':
        if (!processedInput.location) {
          setError('Please provide a location, e.g. :weather London');
          setLoading(false);
          return;
        }
        try {
          const apiKey = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
          if (!apiKey) {
            setError('RapidAPI key is not set.');
            setLoading(false);
            return;
          }
          const city = encodeURIComponent(processedInput.location);
          const url = `https://open-weather13.p.rapidapi.com/city?city=${city}&lang=EN`;
          const res = await fetch(url, {
            headers: {
              'x-rapidapi-key': apiKey,
              'x-rapidapi-host': 'open-weather13.p.rapidapi.com',
            },
          });
          if (!res.ok) {
            setError('Could not fetch weather for that location.');
            setLoading(false);
            return;
          }
          const data = await res.json();
          setAnswer(
            `# Weather for ${data.name}, ${data.sys?.country || ''}\n\n` +
            `**Condition:** ${data.weather?.[0]?.main || ''} (${data.weather?.[0]?.description || ''})\n` +
            `**Temperature:** ${data.main?.temp}°C (feels like ${data.main?.feels_like}°C)\n` +
            `**Humidity:** ${data.main?.humidity}%\n` +
            `**Wind:** ${data.wind?.speed} m/s\n` +
            (data.weather?.[0]?.icon ? `![icon](https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)` : '')
          );
          setContentType('text');
          setInputType('text');
        } catch (err) {
          setError('Failed to fetch weather.');
        } finally {
          setLoading(false);
        }
        return;
      case 'translate':
        if (!processedInput.sl || !processedInput.dl || !processedInput.textToTranslate) {
          setError('Usage: english to french good morning (supported languages: english, french, etc.)');
          setLoading(false);
          return;
        }
        try {
          const res = await fetch('/api/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              sl: processedInput.sl,
              dl: processedInput.dl,
              text: processedInput.textToTranslate,
            }),
          });
          if (!res.ok) {
            setError('Could not fetch translation.');
            setLoading(false);
            return;
          }
          const data = await res.json();
          let translationMd = `# Translation\n\n`;
          translationMd += `**${processedInput.sl} → ${processedInput.dl}**\n\n`;
          translationMd += `**Original:** ${data['source-text']}\n`;
          translationMd += `**Translated:** ${data['destination-text']}\n`;
          if (data.translations && data.translations['possible-translations'] && data.translations['possible-translations'].length > 0) {
            translationMd += `\n\n**Possible Translations:**\n`;
            translationMd += data.translations['possible-translations'].map((t: string) => `- ${t}`).join('\n');
          }
          setAnswer(translationMd);
          setContentType('text');
          setInputType('text');
        } catch (err) {
          setError('Failed to fetch translation.');
        } finally {
          setLoading(false);
        }
        return;
      case 'shorten':
        if (!processedInput.longUrl) {
          setError('Usage: :shorten <long_url>');
          setLoading(false);
          return;
        }
        try {
          const res = await fetch('/api/shorten', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: processedInput.longUrl }),
          });
          if (!res.ok) {
            setError('Could not shorten the URL.');
            setLoading(false);
            return;
          }
          const data = await res.json();
          setAnswer(`**Original:** ${processedInput.longUrl}\n\n**Shortened:** [${data.shortUrl}](${data.shortUrl})`);
          setContentType('text');
          setInputType('text');
        } catch (err) {
          setError('Failed to shorten the URL.');
        } finally {
          setLoading(false);
        }
        return;
      case 'building':
        setAnswer(processedInput.content);
        setContentType('text');
        setInputType('text');
        setLoading(false);
        return;
    }
  };

  
  const innerDivClass = `m-10 rounded-lg flex justify-center pt-20 ${hasSubmitted ? ' bg-neutral-800 min-h-screen' : ''}`;

  return (
    <>
    <div className="min-h-screen pt-2 pb-2 bg-[url('https://res.cloudinary.com/dnr4p6zlc/image/upload/c_limit,w_1920/f_auto/q_auto/v1682422456/ick3k4qslbdjgfxtexaf?_a=BAVAfVE40')] bg-no-repeat bg-cover">
      {/* <div className="m-10 rounded-lg flex justify-center pt-14 bg-gradient-to-br from-neutral-800 via-gray-300 to-neutral-950 h-full"> */}
      <div className={innerDivClass}>
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
          <div className="relative w-80 md:w-xl flex flex-col items-center">
            {loading ? (
              <div
                className="w-full rounded-lg p-[2px] mb-4"
                style={{
                  background: 'linear-gradient(270deg, #ff6ec4, #7873f5, #1fd1f9, #ff6ec4)',
                  backgroundSize: '600% 600%',
                  animation: 'gradientMove 2s linear infinite',
                }}
              >
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                  onBlur={handleInputBlur}
                  placeholder="Ask anything (Type : for commands)"
                  className="px-4 py-2 w-full h-12 text-xl md:text-xl rounded-lg focus:outline-none bg-gradient-to-b from-neutral-700 to-neutral-600 shadow-[inset_2px_2px_6px_rgba(255,255,255,0.1),_4px_4px_8px_rgba(0,0,0,0.6)] border-0 text-white placeholder-white/70 font-sans"
                  style={{ fontFamily: 'inherit' }}
                  disabled={loading}
                />
              </div>
            ) : (
              <>
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                  onBlur={handleInputBlur}
                  placeholder="Ask anything (Type : for commands)"
                  className="px-4 py-2 w-full h-12 text-xl md:text-xl rounded-lg focus:outline-none bg-gradient-to-b from-neutral-700 to-neutral-600 shadow-[inset_2px_2px_6px_rgba(255,255,255,0.1),_4px_4px_8px_rgba(0,0,0,0.6)] border-0 text-white placeholder-white/70 mb-4 font-sans"
                  style={{ fontFamily: 'inherit' }}
                  disabled={loading}
                />
                {showDropdown && (
                  <ul className={`absolute left-0 top-full w-full border border-neutral-700 rounded-xl mt-2 z-20 shadow-2xl backdrop-blur-md overflow-hidden bg-neutral-800/80 ${spaceMono.className}`}>
                    {dropdownOptions.map((option, idx) => (
                      <li
                        key={option}
                        className={`px-4 py-2 cursor-pointer transition-colors duration-150 select-none text-xs md:text-sm font-normal flex items-center gap-2 ${spaceMono.className}
                          ${idx === dropdownIndex ? 'bg-neutral-800 text-white' : 'text-neutral-200 hover:bg-neutral-700/80'}`}
                        onMouseDown={() => handleDropdownSelect(option)}
                        style={{ borderLeft: idx === dropdownIndex ? '4px solid #60a5fa' : '4px solid transparent' }}
                      >
                        <span className="font-mono">{option}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
          {/* No button, submit via Enter key only */}
          {error && <div className="text-red-400 mb-2">{error}</div>}
          <Answer 
            answer={answer} 
            className="px-3 py-2 w-80 md:w-xl max-w-full text-lg rounded-lg font-sans mt-2 text-white break-words" 
            contentType={contentType}
            inputType={inputType}
            input={currentInput}
          />
        </form>
      </div>
      {/* </div> */}
      <style jsx global>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>
      
    </div>
    </>
  );
}


//https://images.pexels.com/photos/158063/bellingrath-gardens-alabama-landscape-scenic-158063.jpeg












