import { ProcessedPrompt } from '../../utils/promptTools';
import { callAI } from '../api/ai';
import { getWeather, formatWeatherResponse } from '../api/weather';
import { translateText, formatTranslationResponse } from '../api/translate';
import { shortenUrl, formatShortenResponse } from '../api/shorten';

export interface CommandResult {
  answer: string;
  contentType: 'text' | 'image' | 'mixed';
  inputType: 'text' | 'image' | 'mixed';
}

export async function handleCommand(processedInput: ProcessedPrompt): Promise<CommandResult> {
  switch (processedInput.type) {
    case 'redirect':
      // Open URL in new tab
      window.open(processedInput.url, '_blank');
      return {
        answer: processedInput.content,
        contentType: 'text',
        inputType: 'text'
      };
      
    case 'echo':
      return {
        answer: processedInput.content,
        contentType: 'text',
        inputType: 'text'
      };
      
    case 'evaluate':
      try {
        const result = eval(processedInput.mathExpression || '');
        return {
          answer: `${processedInput.content}\n\nResult: ${result}`,
          contentType: 'text',
          inputType: 'text'
        };
      } catch {
        throw new Error(`Invalid math expression: ${processedInput.mathExpression}`);
      }
      
    case 'help':
    case 'about':
    case 'author':
    case 'building':
    case 'bookmark':
    case 'qrcode':
    case 'theme':
    case 'joke':
      return {
        answer: processedInput.content,
        contentType: 'text',
        inputType: 'text'
      };
      
    case 'ai':
      const data = await callAI(processedInput.content);
      return {
        answer: data.answer,
        contentType: data.contentType || 'text',
        inputType: data.inputType || 'text'
      };
      
    case 'weather':
      if (!processedInput.location) {
        throw new Error('Please provide a location, e.g. :weather London');
      }
      const weatherData = await getWeather(processedInput.location);
      return {
        answer: formatWeatherResponse(weatherData),
        contentType: 'text',
        inputType: 'text'
      };
      
    case 'translate':
      if (!processedInput.sl || !processedInput.dl || !processedInput.textToTranslate) {
        throw new Error('Usage: english to french good morning (supported languages: english, french, etc.)');
      }
      const translationData = await translateText(processedInput.sl, processedInput.dl, processedInput.textToTranslate);
      return {
        answer: formatTranslationResponse(translationData, processedInput.sl, processedInput.dl),
        contentType: 'text',
        inputType: 'text'
      };
      
    case 'shorten':
      if (!processedInput.longUrl) {
        throw new Error('Usage: :shorten <long_url>');
      }
      const shortenData = await shortenUrl(processedInput.longUrl);
      return {
        answer: formatShortenResponse(shortenData, processedInput.longUrl),
        contentType: 'text',
        inputType: 'text'
      };

    case 'home':
      return {
        answer: '',
        contentType: 'text',
        inputType: 'text'
      }
      
    default:
      throw new Error('Unknown command type');
  }
} 