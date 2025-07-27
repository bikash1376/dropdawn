import React from 'react';
import { Space_Mono } from 'next/font/google';

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
});

interface ChatInputProps {
  input: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  disabled?: boolean;
  showDropdown: boolean;
  dropdownOptions: string[];
  dropdownIndex: number;
  onDropdownSelect: (option: string) => void;
}

export function ChatInput({
  input,
  onChange,
  onKeyDown,
  onBlur,
  disabled = false,
  showDropdown,
  dropdownOptions,
  dropdownIndex,
  onDropdownSelect
}: ChatInputProps) {
  return (
    <div className="relative w-80 md:w-xl flex flex-col items-center">
      <input
        type="text"
        value={input}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        placeholder="Ask anything (Type : for commands)"
        className="px-4 py-2 w-full h-12 text-xl md:text-xl rounded-lg focus:outline-none bg-gradient-to-b from-neutral-700 to-neutral-600 shadow-[inset_2px_2px_6px_rgba(255,255,255,0.1),_4px_4px_8px_rgba(0,0,0,0.6)] border-0 text-white placeholder-white/70 mb-4 font-sans"
        style={{ fontFamily: 'inherit' }}
        disabled={disabled}
      />
      {showDropdown && (
        <ul className={`absolute left-0 top-full w-full border border-neutral-700 rounded-xl mt-2 z-20 shadow-2xl backdrop-blur-md overflow-hidden bg-neutral-800/80 ${spaceMono.className}`}>
          {dropdownOptions.map((option, idx) => (
            <li
              key={option}
              className={`px-4 py-2 cursor-pointer transition-colors duration-150 select-none text-xs md:text-sm font-normal flex items-center gap-2 ${spaceMono.className}
                ${idx === dropdownIndex ? 'bg-neutral-800 text-white' : 'text-neutral-200 hover:bg-neutral-700/80'}`}
              onMouseDown={() => onDropdownSelect(option)}
              style={{ borderLeft: idx === dropdownIndex ? '4px solid #60a5fa' : '4px solid transparent' }}
            >
              <span className="font-mono">{option}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 