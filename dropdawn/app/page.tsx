'use client'
import Answer from "./components/answer";
import { ChatInput } from "./components/ChatInput";
import { processPrompt } from "./utils/promptTools";
import { handleCommand } from "./services/commands/commandHandler";
import { useChat } from "./hooks/useChat";
import { useCommands } from "./hooks/useCommands";
import React, { useState } from "react";

export default function Home() {
  const {
    answer,
    loading,
    error,
    hasSubmitted,
    // Remove contentType since it's not being used
    inputType,
    currentInput,
    setLoading,
    setError,
    setHasSubmitted,
    setCurrentInput,
    resetChat,
    setChatResult
  } = useChat();

  const {
    showDropdown,
    dropdownOptions,
    dropdownIndex,
    handleInputChange,
    handleDropdownSelect,
    handleInputKeyDown,
    handleInputBlur
  } = useCommands();

  const [input, setInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim().length < 2) return;
    
    resetChat();       // Reset first
    setLoading(true);  // Then set loading to true
    setHasSubmitted(true);
    setCurrentInput(input);
    
    try {
      const processedInput = processPrompt(input);
      const result = await handleCommand(processedInput);
      setChatResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  const handleInputChangeWrapper = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    handleInputChange(val);
  };

  const handleInputKeyDownWrapper = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const result = handleInputKeyDown(e, input);
    if (result) {
      setInput(result);
    }
  };

  const handleDropdownSelectWrapper = (option: string) => {
    const newInput = handleDropdownSelect(option);
    setInput(newInput);
  };

  // Make the container wider on small screens, centered, and responsive
  const innerDivClass = `
    mx-auto my-6 sm:my-10 rounded-lg flex justify-center pt-10 sm:pt-20
    bg-neutral-800 min-h-screen
    w-[90vw] max-w-lg sm:max-w-xl md:max-w-2xl
    px-2 sm:px-6
  `;

  return (
    <>
      <div 
        className="min-h-screen pt-2 pb-2 bg-no-repeat bg-cover"
        style={{ 
          backgroundImage: "url('https://res.cloudinary.com/dnr4p6zlc/image/upload/c_limit,w_1920/f_auto/q_auto/v1682422456/ick3k4qslbdjgfxtexaf?_a=BAVAfVE40')" 
        }}
      >
        <div className={innerDivClass}>
          <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
            
            <ChatInput
              input={input}
              onChange={handleInputChangeWrapper}
              onKeyDown={handleInputKeyDownWrapper}
              onBlur={handleInputBlur}
              showDropdown={showDropdown}
              dropdownOptions={dropdownOptions}
              dropdownIndex={dropdownIndex}
              onDropdownSelect={handleDropdownSelectWrapper}
            />
            
            {error && <div className="text-red-400 mb-2">{error}</div>}
            
            {loading ? (
              <div className="px-3 py-2 w-full max-w-2xl text-lg rounded-lg font-sans mt-2 text-white/50 break-words flex items-center justify-center">
                Working...
              </div>
            ) : (
              (!hasSubmitted && !answer && !error) ? (
                <Answer
                  answer={`hi im dropdawn, a beautiful gemini ai wrapper with some extra tools. Press the colon (:) key on your keyboard to see them.


                    
[Click here to raise an issue on GitHub](https://github.com/bikash1376/dropdawn/issues/new)
`}
                  className="px-3 py-2 w-full max-w-2xl text-lg rounded-lg font-sans mt-2 text-white break-words"
                />
              ) : (
                <Answer 
                  answer={answer} 
                  className="px-3 py-2 w-full max-w-2xl text-lg rounded-lg font-sans mt-2 text-white break-words" 
                  inputType={inputType}
                  input={currentInput}
                />
              )
            )}
            
          </form>
            
        </div>
        
      </div>
      
      <style jsx global>{`        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>
    </>
  );
}


//https://images.pexels.com/photos/158063/bellingrath-gardens-alabama-landscape-scenic-158063.jpeg













