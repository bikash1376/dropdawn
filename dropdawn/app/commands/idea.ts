export function handleIdea(text: string) {
  return {
    type: 'ai' as const,
    content: `Please brainstorm and expand on this idea, providing multiple perspectives and possibilities: ${text}`
  };
} 