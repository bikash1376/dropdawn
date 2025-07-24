export function processPrompt(input: string): string {
  const rephraseCommand = ':rephrase';
  const summariseCommand = ':summarise';
  const trimmed = input.trim();
  if (trimmed.toLowerCase().startsWith(rephraseCommand)) {
    const text = trimmed.slice(rephraseCommand.length).trim();
    return `Please rephrase the following text in a clearer and more natural way: ${text}`;
  }
  if (trimmed.toLowerCase().startsWith(summariseCommand)) {
    const text = trimmed.slice(summariseCommand.length).trim();
    return `Please summarise the following text in a concise and clear way: ${text}`;
  }
  return input;
} 