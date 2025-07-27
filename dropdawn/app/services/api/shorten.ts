export async function shortenUrl(longUrl: string) {
  const res = await fetch('/api/shorten', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: longUrl }),
  });
  
  if (!res.ok) {
    throw new Error('Could not shorten the URL.');
  }
  
  return res.json();
}

export function formatShortenResponse(data: any, originalUrl: string) {
  return `**Original:** ${originalUrl}\n\n**Shortened:** [${data.shortUrl}](${data.shortUrl})`;
} 