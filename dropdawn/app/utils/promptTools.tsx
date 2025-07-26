export type ProcessedPrompt = {
  type: 'ai' | 'redirect' | 'echo' | 'evaluate' | 'help' | 'about' | 'author' | 'weather' | 'translate' | 'shorten' | 'building';
  content: string;
  url?: string;
  mathExpression?: string;
  location?: string;
  sl?: string;
  dl?: string;
  textToTranslate?: string;
  longUrl?: string;
};

const LANGUAGE_MAP: Record<string, string> = {
  "afrikaans": "af", "albanian": "sq", "amharic": "am", "arabic": "ar", "armenian": "hy", "azerbaijani": "az", "basque": "eu", "belarusian": "be", "bengali": "bn", "bosnian": "bs", "bulgarian": "bg", "catalan": "ca", "cebuano": "ceb", "chichewa": "ny", "chinese (simplified)": "zh-cn", "chinese (traditional)": "zh-tw", "corsican": "co", "croatian": "hr", "czech": "cs", "danish": "da", "dutch": "nl", "english": "en", "esperanto": "eo", "estonian": "et", "filipino": "tl", "finnish": "fi", "french": "fr", "frisian": "fy", "galician": "gl", "georgian": "ka", "german": "de", "greek": "el", "gujarati": "gu", "haitian creole": "ht", "hausa": "ha", "hawaiian": "haw", "hebrew": "he", "hindi": "hi", "hmong": "hmn", "hungarian": "hu", "icelandic": "is", "igbo": "ig", "indonesian": "id", "irish": "ga", "italian": "it", "japanese": "ja", "javanese": "jw", "kannada": "kn", "kazakh": "kk", "khmer": "km", "korean": "ko", "kurdish (kurmanji)": "ku", "kyrgyz": "ky", "lao": "lo", "latin": "la", "latvian": "lv", "lithuanian": "lt", "luxembourgish": "lb", "macedonian": "mk", "malagasy": "mg", "malay": "ms", "malayalam": "ml", "maltese": "mt", "maori": "mi", "marathi": "mr", "mongolian": "mn", "myanmar (burmese)": "my", "nepali": "ne", "norwegian": "no", "odia": "or", "pashto": "ps", "persian": "fa", "polish": "pl", "portuguese": "pt", "punjabi": "pa", "romanian": "ro", "russian": "ru", "samoan": "sm", "scots gaelic": "gd", "serbian": "sr", "sesotho": "st", "shona": "sn", "sindhi": "sd", "sinhala": "si", "slovak": "sk", "slovenian": "sl", "somali": "so", "spanish": "es", "sundanese": "su", "swahili": "sw", "swedish": "sv", "tajik": "tg", "tamil": "ta", "telugu": "te", "thai": "th", "turkish": "tr", "ukrainian": "uk", "urdu": "ur", "uyghur": "ug", "uzbek": "uz", "vietnamese": "vi", "welsh": "cy", "xhosa": "xh", "yiddish": "yi", "yoruba": "yo", "zulu": "zu"
};

export function processPrompt(input: string): ProcessedPrompt {
    const rephraseCommand = ':rephrase';
    const summariseCommand = ':summarise';
    const describeImageCommand = ':describe';
    const analyzeImageCommand = ':analyze';
    const rtcCommand = ':rtc';
    const echoCommand = ':echo';
    const evaluateCommand = ':evaluate';
    const helpCommand = ':help';
    const aboutCommand = ':about';
    const authorCommand = ':author';
    const weatherCommand = ':weather';
    const translateCommand = ':translate';
    const shortenCommand = ':shorten';
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
    
    // Handle :rtc command - redirect to peersuite.com
    if (trimmed.toLowerCase().startsWith(rtcCommand)) {
      return {
        type: 'redirect',
        content: 'Redirecting to PeerSuite...',
        url: 'https://peersuite.space'
      };
    }
    
    // Handle :echo command - display message as is
    if (trimmed.toLowerCase().startsWith(echoCommand)) {
      const message = trimmed.slice(echoCommand.length).trim();
      return {
        type: 'echo',
        content: message || 'No message provided'
      };
    }
    
    // Handle :evaluate command - math evaluation
    if (trimmed.toLowerCase().startsWith(evaluateCommand)) {
      const mathExpression = trimmed.slice(evaluateCommand.length).trim();
      return {
        type: 'evaluate',
        content: `Evaluating: ${mathExpression}`,
        mathExpression: mathExpression
      };
    }
    
    // Handle :help command - display all available commands
    if (trimmed.toLowerCase().startsWith(helpCommand)) {
      return {
        type: 'help',
        content: `# Available Commands

## AI Commands
- **:rephrase** - Rephrase text in a clearer way
- **:summarise** - Summarize text concisely
- **:describe** - Describe an image in detail
- **:analyze** - Analyze image content and features

## Utility Commands
- **:rtc** - Redirect to PeerSuite.space (opens in new tab)
- **:echo** - Display message exactly as typed
- **:evaluate** - Evaluate mathematical expressions

## Info Commands
- **:help** - Show this help message
- **:about** - Learn about this application
- **:author** - Information about the creator

## Usage Examples
\`\`\`
:rephrase This text needs to be clearer
:summarise Long article text here
:describe https://example.com/image.jpg
:analyze This is a photo of a cat https://example.com/cat.jpg
:rtc
:echo Hello World!
:evaluate 2 + 2 * 3
\`\`\`

Type any command followed by your input and press Enter!`
      };
    }
    
    // Handle :about command - information about the app
    if (trimmed.toLowerCase().startsWith(aboutCommand)) {
      return {
        type: 'about',
        content: `# About Dropdawn

**Dropdawn** is a modern AI chat application built with Next.js 15 and Google Gemini AI that supports both text and image inputs.

## Features

### 🤖 AI Capabilities
- **Text Chat**: Ask questions, get responses from Google Gemini AI
- **Image Analysis**: Upload images or paste image URLs for AI analysis
- **Mixed Content**: Combine text and images in a single query
- **Smart Commands**: Use special commands for specific tasks

### 🎨 Modern UI
- Beautiful gradient design with dark theme
- Responsive layout for desktop and mobile
- Smooth animations and transitions
- Dropdown command suggestions

### 🛠️ Tech Stack
- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini AI
- **Markdown**: Marked.js for response formatting

This application provides a seamless interface for interacting with AI, analyzing images, and performing various utility tasks through an intuitive command system.`
      };
    }
    
    // Handle :author command - information about the creator
    if (trimmed.toLowerCase().startsWith(authorCommand)) {
      return {
        type: 'author',
        content: `# About the Author

## Bikash

**Creator & Developer**

### Contact Information
- **Twitter**: [@bikash1376](https://x.com/bikash1376)
- **Email**: bikash13763@gmail.com

### Connect
Feel free to reach out for questions, feedback, or collaboration opportunities!

---
*Built with ❤️ using Next.js and Google Gemini AI*`
      };
    }
    
    // Handle AI commands
    if (trimmed.toLowerCase().startsWith(rephraseCommand)) {
      const text = trimmed.slice(rephraseCommand.length).trim();
      return {
        type: 'ai',
        content: `Please rephrase the following text in a clearer and more natural way: ${text}`
      };
    }
    
    if (trimmed.toLowerCase().startsWith(summariseCommand)) {
      const text = trimmed.slice(summariseCommand.length).trim();
      return {
        type: 'ai',
        content: `Please summarise the following text in a concise and clear way: ${text}`
      };
    }
    
    if (trimmed.toLowerCase().startsWith(describeImageCommand)) {
      const text = trimmed.slice(describeImageCommand.length).trim();
      return {
        type: 'ai',
        content: `Please describe this image in detail: ${text}`
      };
    }
    
    if (trimmed.toLowerCase().startsWith(analyzeImageCommand)) {
      const text = trimmed.slice(analyzeImageCommand.length).trim();
      return {
        type: 'ai',
        content: `Please analyze this image and provide insights about its content, style, and any notable features: ${text}`
      };
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

    if (trimmed.toLowerCase() === memesCommand) {
      return {
        type: 'redirect',
        content: 'Redirecting to MemeHub... Have fun!',
        url: 'https://www.memehub.mom/'
      };
    }
    if (trimmed.toLowerCase() === apiCommand) {
      return {
        type: 'redirect',
        content: 'Redirecting to Hoppscotch (API client)...',
        url: 'https://hoppscotch.io/'
      };
    }
    if (trimmed.toLowerCase() === realtimeCommand) {
      return {
        type: 'redirect',
        content: 'Redirecting to Scira (Realtime infra)...',
        url: 'https://scira.ai/'
      };
    }
    if (trimmed.toLowerCase() === donateCommand) {
      return {
        type: 'redirect',
        content: 'Redirecting to coffee donation page... Thank you!',
        url: 'https://coff.ee/bikash1376V'
      };
    }
    if (trimmed.toLowerCase() === buildingCommand) {
      return {
        type: 'building',
        content: `# Bikash is currently building

- **dotstudio** ([repo](https://github.com/bikash1376/dotstudio))  
  *An open-source alternative to ScreenStudio for screen recording and streaming, built with React and ffmpeg. [Portfolio](http://bksh.site)*

**He has contributed to:**
- **The Orbit Studio** ([theorbit.studio](https://theorbit.studio))  
  *A DevRel & Community Activation studio for Web3 protocols for builders.*

**Other projects:**
- **Pistash** ([app](https://pistash.vercel.app/))  
  *A modern API client (currently not working as expected).*
- **Laggyfx** ([app](https://laggyfx.netlify.app/), [repo](https://github.com/bikash1376/Laggyfx))  
  *A customizable gradient generator with live preview and image download. The app is intentionally “laggy” for fun! You can try [gradii.fun](https://gradii.fun) if you don't like my UI.*
- **Yet Another To-Do** ([app](https://yet-another-to-do.vercel.app/))  
  *A web-based calendar and to-do app using localStorage for persistence.*
- **Invoicelee** ([app](https://invoicelee.netlify.app/))  
  *Generate invoices quickly and easily, right in your browser.*
- **Take You Forward Redesign** ([app](https://takeyouforward-blush.vercel.app/))  
  *A modern redesign of the TakeUForward landing page ([original](https://takeuforward.org/)).*
`
      };
    }
    
    // Default: send to AI
    return {
      type: 'ai',
      content: input
    };
  } 