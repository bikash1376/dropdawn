export function handleRephrase(text: string) {
  return {
    type: 'ai' as const,
    content: `Please rephrase the following text in a clearer and more natural way: ${text}`
  };
} 