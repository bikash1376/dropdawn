'use client'
// import Search from "./components/Seach";
import Answer from "./components/Answer";
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
    const processedInput = processPrompt(input);
    try {
      const res = await fetch("/api/hello", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: processedInput }),
      });
      const data = await res.json();
      if (res.ok) {
        setAnswer(data.answer);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Failed to fetch answer");
    } finally {
      setLoading(false);
    }
  };

  
  const innerDivClass = `m-10 rounded-lg flex justify-center pt-20${hasSubmitted ? ' bg-neutral-800 min-h-screen' : ''}`;

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
                  placeholder="What's up? (Type :help for commands)"
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
                  placeholder="What's up? (Type :help for commands)"
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
          <Answer answer={answer} className="px-3 py-2 w-80 md:w-xl max-w-full text-lg rounded-lg font-sans mt-2 text-white break-words" />
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












