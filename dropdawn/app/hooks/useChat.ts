import { useState } from 'react';

export function useChat() {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [contentType, setContentType] = useState<'text' | 'image' | 'mixed'>('text');
  const [inputType, setInputType] = useState<'text' | 'image' | 'mixed'>('text');
  const [currentInput, setCurrentInput] = useState<string | { text?: string; image?: string }>('');

  const resetChat = () => {
    setAnswer("");
    setError("");
    setLoading(false);
  };

  const setChatResult = (result: { answer: string; contentType: 'text' | 'image' | 'mixed'; inputType: 'text' | 'image' | 'mixed' }) => {
    setAnswer(result.answer);
    setContentType(result.contentType);
    setInputType(result.inputType);
    setLoading(false);
  };

  return {
    answer,
    loading,
    error,
    hasSubmitted,
    contentType,
    inputType,
    currentInput,
    setAnswer,
    setLoading,
    setError,
    setHasSubmitted,
    setContentType,
    setInputType,
    setCurrentInput,
    resetChat,
    setChatResult
  };
} 