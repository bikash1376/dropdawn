export async function getWeather(location: string) {
  const apiKey = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
  if (!apiKey) {
    throw new Error('RapidAPI key is not set.');
  }
  
  const city = encodeURIComponent(location);
  const url = `https://open-weather13.p.rapidapi.com/city?city=${city}&lang=EN`;
  
  const res = await fetch(url, {
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'open-weather13.p.rapidapi.com',
    },
  });
  
  if (!res.ok) {
    throw new Error('Could not fetch weather for that location.');
  }
  
  return res.json();
}

export function formatWeatherResponse(
  data: {
    name: string;
    sys?: { country?: string };
    weather?: { main?: string; description?: string; icon?: string }[];
    main?: { temp?: number; feels_like?: number; humidity?: number };
    wind?: { speed?: number };
  }
) {
  return `# Weather for ${data.name}, ${data.sys?.country || ''}\n\n` +
    `**Condition:** ${data.weather?.[0]?.main || ''} (${data.weather?.[0]?.description || ''})\n` +
    `**Temperature:** ${data.main?.temp}°C (feels like ${data.main?.feels_like}°C)\n` +
    `**Humidity:** ${data.main?.humidity}%\n` +
    `**Wind:** ${data.wind?.speed} m/s\n` +
    (data.weather?.[0]?.icon ? `![icon](https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)` : '');
} 