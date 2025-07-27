import { handleRephrase } from '../commands/rephrase';
import { handleSummarise } from '../commands/summarise';
import { handleExplain } from '../commands/explain';
import { handleIdea } from '../commands/idea';
import { handleBookmark, getBookmarks, clearBookmarks } from '../commands/bookmark';
// Removed broken import from utility.ts (not a module)
import { handleQRCode } from '../commands/qrcode';
import { handleTheme } from '../commands/theme';
import { handleRTC, handleEcho, handleEvaluate, handleMemes, handleAPI, handleRealtime, handleDonate } from '../commands/utility';
import { handleHelp, handleAbout, handleAuthor, handleBuilding } from '../commands/info';

export type ProcessedPrompt = {
  type: 'ai' | 'redirect' | 'echo' | 'evaluate' | 'help' | 'about' | 'author' | 'weather' | 'translate' | 'shorten' | 'building' | 'bookmark' | 'qrcode' | 'theme';
  content: string;
  url?: string;
  mathExpression?: string;
  location?: string;
  sl?: string;
  dl?: string;
  textToTranslate?: string;
  longUrl?: string;
  qrUrl?: string;
  text?: string;
  theme?: string;
  bookmarks?: any[];
};

const LANGUAGE_MAP: Record<string, string> = {
  "afrikaans": "af", "albanian": "sq", "amharic": "am", "arabic": "ar", "armenian": "hy", "azerbaijani": "az", "basque": "eu", "belarusian": "be", "bengali": "bn", "bosnian": "bs", "bulgarian": "bg", "catalan": "ca", "cebuano": "ceb", "chichewa": "ny", "chinese (simplified)": "zh-cn", "chinese (traditional)": "zh-tw", "corsican": "co", "croatian": "hr", "czech": "cs", "danish": "da", "dutch": "nl", "english": "en", "esperanto": "eo", "estonian": "et", "filipino": "tl", "finnish": "fi", "french": "fr", "frisian": "fy", "galician": "gl", "georgian": "ka", "german": "de", "greek": "el", "gujarati": "gu", "haitian creole": "ht", "hausa": "ha", "hawaiian": "haw", "hebrew": "he", "hindi": "hi", "hmong": "hmn", "hungarian": "hu", "icelandic": "is", "igbo": "ig", "indonesian": "id", "irish": "ga", "italian": "it", "japanese": "ja", "javanese": "jw", "kannada": "kn", "kazakh": "kk", "khmer": "km", "korean": "ko", "kurdish (kurmanji)": "ku", "kyrgyz": "ky", "lao": "lo", "latin": "la", "latvian": "lv", "lithuanian": "lt", "luxembourgish": "lb", "macedonian": "mk", "malagasy": "mg", "malay": "ms", "malayalam": "ml", "maltese": "mt", "maori": "mi", "marathi": "mr", "mongolian": "mn", "myanmar (burmese)": "my", "nepali": "ne", "norwegian": "no", "odia": "or", "pashto": "ps", "persian": "fa", "polish": "pl", "portuguese": "pt", "punjabi": "pa", "romanian": "ro", "russian": "ru", "samoan": "sm", "scots gaelic": "gd", "serbian": "sr", "sesotho": "st", "shona": "sn", "sindhi": "sd", "sinhala": "si", "slovak": "sk", "slovenian": "sl", "somali": "so", "spanish": "es", "sundanese": "su", "swahili": "sw", "swedish": "sv", "tajik": "tg", "tamil": "ta", "telugu": "te", "thai": "th", "turkish": "tr", "ukrainian": "uk", "urdu": "ur", "uyghur": "ug", "uzbek": "uz", "vietnamese": "vi", "welsh": "cy", "xhosa": "xh", "yiddish": "yi", "yoruba": "yo", "zulu": "zu"
};

export function processPrompt(input: string): ProcessedPrompt {
    const rephraseCommand = ':rephrase';
    const summariseCommand = ':summarise';
    const explainCommand = ':explain';
    const ideaCommand = ':idea';
    const rtcCommand = ':rtc';
    const echoCommand = ':echo';
    const evaluateCommand = ':evaluate';
    const helpCommand = ':help';
    const aboutCommand = ':about';
    const authorCommand = ':author';
    const weatherCommand = ':weather';
    const translateCommand = ':translate';
    const shortenCommand = ':shorten';
    const bookmarkCommand = ':bookmark';
    const qrcodeCommand = ':qrcode';
    const themeCommand = ':theme';
    const memesCommand = ':memes';
    const apiCommand = ':api';
    const realtimeCommand = ':realtime';
    const donateCommand = ':donate';
    const buildingCommand = ':building';
    
    const trimmed = input.trim();
    
    // Handle :weather command - get weather for a location
    if (trimmed.toLowerCase().startsWith(weatherCommand)) {
      const location = trimmed.slice(weatherCommand.length).trim();
      return {
        type: 'weather',
        content: location ? `Getting weather for: ${location}` : 'Please provide a location, e.g. :weather London',
        location: location
      };
    }
    
    // Handle :rtc command
    if (trimmed.toLowerCase().startsWith(rtcCommand)) {
      return handleRTC();
    }
    
    // Handle :echo command
    if (trimmed.toLowerCase().startsWith(echoCommand)) {
      const message = trimmed.slice(echoCommand.length).trim();
      return handleEcho(message);
    }
    
    // Handle :evaluate command
    if (trimmed.toLowerCase().startsWith(evaluateCommand)) {
      const mathExpression = trimmed.slice(evaluateCommand.length).trim();
      return handleEvaluate(mathExpression);
    }
    
    // Handle :help command
    if (trimmed.toLowerCase().startsWith(helpCommand)) {
      return handleHelp();
    }
    
    // Handle :about command
    if (trimmed.toLowerCase().startsWith(aboutCommand)) {
      return handleAbout();
    }
    
    // Handle :author command
    if (trimmed.toLowerCase().startsWith(authorCommand)) {
      return handleAuthor();
    }
    
    // Handle :bookmark command
    if (trimmed.toLowerCase().startsWith(bookmarkCommand)) {
      const text = trimmed.slice(bookmarkCommand.length).trim();
      if (!text) {
        // Show all bookmarks if no text provided
        const bookmarks = getBookmarks();
        if (bookmarks.length === 0) {
          return {
            type: 'bookmark',
            content: 'No bookmarks saved yet. Use :bookmark <text> to save one.',
            bookmarks: []
          };
        }
        return {
          type: 'bookmark',
          content: `You have ${bookmarks.length} bookmark(s):`,
          bookmarks: bookmarks
        };
      }
      return handleBookmark(text);
    }
    
    // Handle :qrcode command
    if (trimmed.toLowerCase().startsWith(qrcodeCommand)) {
      const text = trimmed.slice(qrcodeCommand.length).trim();
      if (!text) {
        return {
          type: 'qrcode',
          content: 'Usage: :qrcode <text>'
        };
      }
      return handleQRCode(text);
    }
    
    // Handle :theme command
    if (trimmed.toLowerCase().startsWith(themeCommand)) {
      const theme = trimmed.slice(themeCommand.length).trim();
      return handleTheme(theme);
    }
    
    // Handle AI commands
    if (trimmed.toLowerCase().startsWith(rephraseCommand)) {
      const text = trimmed.slice(rephraseCommand.length).trim();
      return handleRephrase(text);
    }
    
    if (trimmed.toLowerCase().startsWith(summariseCommand)) {
      const text = trimmed.slice(summariseCommand.length).trim();
      return handleSummarise(text);
    }
    
    if (trimmed.toLowerCase().startsWith(explainCommand)) {
      const text = trimmed.slice(explainCommand.length).trim();
      return handleExplain(text);
    }
    
    if (trimmed.toLowerCase().startsWith(ideaCommand)) {
      const text = trimmed.slice(ideaCommand.length).trim();
      return handleIdea(text);
    }

    // Support: 'english to french good morning' (no :translate needed)
    const match = trimmed.match(/^([a-zA-Z ()]+) to ([a-zA-Z ()]+) (.+)$/);
    if (match) {
      const slName = match[1].toLowerCase().trim();
      const dlName = match[2].toLowerCase().trim();
      const textToTranslate = match[3].trim();
      const sl = LANGUAGE_MAP[slName];
      const dl = LANGUAGE_MAP[dlName];
      if (!sl || !dl || !textToTranslate) {
        return {
          type: 'translate',
          content: 'Usage: english to french good morning (supported languages: english, french, etc.)',
        };
      }
      return {
        type: 'translate',
        content: `Translating from ${sl} to ${dl}: ${textToTranslate}`,
        sl,
        dl,
        textToTranslate,
      };
    }

    // Handle :translate command - parse sl, dl, and text
    if (trimmed.toLowerCase().startsWith(translateCommand)) {
      const rest = trimmed.slice(translateCommand.length).trim();
      const [sl, dl, ...textArr] = rest.split(' ');
      const textToTranslate = textArr.join(' ');
      if (!sl || !dl || !textToTranslate) {
        return {
          type: 'translate',
          content: 'Usage: :translate <source_lang> <dest_lang> <text>. Example: :translate en hi how are you',
        };
      }
      return {
        type: 'translate',
        content: `Translating from ${sl} to ${dl}: ${textToTranslate}`,
        sl,
        dl,
        textToTranslate,
      };
    }

    // Handle :shorten command - shorten a URL
    if (trimmed.toLowerCase().startsWith(shortenCommand)) {
      const longUrl = trimmed.slice(shortenCommand.length).trim();
      if (!longUrl) {
        return {
          type: 'shorten',
          content: 'Usage: :shorten <long_url>',
        };
      }
      return {
        type: 'shorten',
        content: `Shortening: ${longUrl}`,
        longUrl,
      };
    }

    // Handle redirect commands
    if (trimmed.toLowerCase() === memesCommand) {
      return handleMemes();
    }
    if (trimmed.toLowerCase() === apiCommand) {
      return handleAPI();
    }
    if (trimmed.toLowerCase() === realtimeCommand) {
      return handleRealtime();
    }
    if (trimmed.toLowerCase() === donateCommand) {
      return handleDonate();
    }
    if (trimmed.toLowerCase().startsWith(buildingCommand)) {
      return handleBuilding();
    }
    
    // Default: send to AI
    return {
      type: 'ai',
      content: input
    };
  } 