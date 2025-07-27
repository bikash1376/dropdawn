export function handleSummarise(text: string) {
  return {
    type: 'ai' as const,
    content: `Please summarise the following text in a concise and clear way: ${text}`
  };
} 