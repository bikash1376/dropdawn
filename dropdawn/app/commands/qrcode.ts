export function handleQRCode(text: string) {
  // Using QR Server API (free, no API key required)
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`;
  
  return {
    type: 'qrcode' as const,
    content: `QR Code generated for: ${text}`,
    qrUrl: qrUrl,
    text: text
  };
} 