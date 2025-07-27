export async function translateText(sl: string, dl: string, text: string) {
  const res = await fetch('/api/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sl, dl, text }),
  });
  
  if (!res.ok) {
    throw new Error('Translation failed');
  }
  
  return res.json();
}

export function formatTranslationResponse(data: any, sl: string, dl: string) {
  let translationMd = `# Translation\n\n`;
  translationMd += `**${sl} → ${dl}**\n\n`;
  translationMd += `**Original:** ${data['source-text']}\n`;
  translationMd += `**Translated:** ${data['destination-text']}\n`;
  
  if (data.translations && data.translations['possible-translations'] && data.translations['possible-translations'].length > 0) {
    translationMd += `\n\n**Possible Translations:**\n`;
    translationMd += data.translations['possible-translations'].map((t: string) => `- ${t}`).join('\n');
  }
  
  return translationMd;
} 