export function handleExplain(text: string) {
  return {
    type: 'ai' as const,
    content: `Please explain the following in a simple and easy-to-understand way: ${text}`
  };
} 