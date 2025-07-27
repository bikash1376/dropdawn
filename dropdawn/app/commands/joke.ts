// import { handleJoke } from '../commands/joke';

export function handleJoke(text: string) {
  if (!text || text.trim() === '') {
    return {
      type: 'joke' as const,
      content: 'Why did the programmer quit his job? Because he didn\'t get arrays!'
    };
  }
  
  return {
    type: 'joke' as const,
    content: `Here's a joke about ${text}: Why did the ${text} developer go broke? Because he used up all his cache!`
  };
}