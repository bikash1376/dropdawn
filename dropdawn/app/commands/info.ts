export function handleRephrase(text: string) {
  return {
    type: 'ai' as const,
    content: `Please rephrase the following text in a clearer and more natural way: ${text}`
  };
}

export function handleSummarise(text: string) {
  return {
    type: 'ai' as const,
    content: `Please summarise the following text in a concise and clear way: ${text}`
  };
}

export function handleExplain(text: string) {
  return {
    type: 'ai' as const,
    content: `Please explain the following in a simple and easy-to-understand way: ${text}`
  };
}

export function handleIdea(text: string) {
  return {
    type: 'ai' as const,
    content: `Please brainstorm and expand on this idea, providing multiple perspectives and possibilities: ${text}`
  };
}

export function handleBookmark(text: string) {
  // Store in localStorage
  const bookmarks = JSON.parse(localStorage.getItem('dropdawn_bookmarks') || '[]');
  const newBookmark = {
    id: Date.now(),
    text: text,
    timestamp: new Date().toISOString()
  };
  bookmarks.push(newBookmark);
  localStorage.setItem('dropdawn_bookmarks', JSON.stringify(bookmarks));
  
  return {
    type: 'bookmark' as const,
    content: `Bookmark saved! You now have ${bookmarks.length} bookmarks.`
  };
}

export function getBookmarks() {
  const bookmarks = JSON.parse(localStorage.getItem('dropdawn_bookmarks') || '[]');
  return bookmarks;
}

export function clearBookmarks() {
  localStorage.removeItem('dropdawn_bookmarks');
  return {
    type: 'bookmark' as const,
    content: 'All bookmarks cleared!'
  };
}

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

export function handleTheme(theme: string) {
  const validThemes = ['color', 'dark', 'light'];
  const selectedTheme = theme.toLowerCase().trim();
  
  if (!selectedTheme) {
    return {
      type: 'theme' as const,
      content: 'Current theme: color (default)',
      theme: 'color'
    };
  }
  
  if (!validThemes.includes(selectedTheme)) {
    return {
      type: 'theme' as const,
      content: 'Invalid theme. Available themes: color, dark, light',
      theme: 'color'
    };
  }
  
  // Store theme preference
  localStorage.setItem('dropdawn_theme', selectedTheme);
  
  return {
    type: 'theme' as const,
    content: `Theme changed to: ${selectedTheme}`,
    theme: selectedTheme
  };
}

export function getCurrentTheme() {
  return localStorage.getItem('dropdawn_theme') || 'color';
}

export function handleRTC() {
  return {
    type: 'redirect' as const,
    content: 'Redirecting to PeerSuite...',
    url: 'https://peersuite.space'
  };
}

export function handleEcho(message: string) {
  return {
    type: 'echo' as const,
    content: message || 'No message provided'
  };
}

export function handleEvaluate(mathExpression: string) {
  return {
    type: 'evaluate' as const,
    content: `Evaluating: ${mathExpression}`,
    mathExpression: mathExpression
  };
}

export function handleMemes() {
  return {
    type: 'redirect' as const,
    content: 'Redirecting to MemeHub... Have fun!',
    url: 'https://www.memehub.mom/'
  };
}

export function handleAPI() {
  return {
    type: 'redirect' as const,
    content: 'Redirecting to Hoppscotch (API client)...',
    url: 'https://hoppscotch.io/'
  };
}

export function handleRealtime() {
  return {
    type: 'redirect' as const,
    content: 'Redirecting to Scira (Realtime infra)...',
    url: 'https://scira.ai/'
  };
}

export function handleDonate() {
  return {
    type: 'redirect' as const,
    content: 'Redirecting to coffee donation page... Thank you!',
    url: 'https://coff.ee/bikash1376V'
  };
}

export function handleHelp() {
  return {
    type: 'help' as const,
    content: `# Available Commands

## AI Commands
- **:rephrase** - Rephrase text in a clearer way
- **:summarise** - Summarize text concisely
- **:explain** - Explain things in simple terms
- **:idea** - Brainstorm and expand on ideas

## Utility Commands
- **:rtc** - Redirect to PeerSuite.space (opens in new tab)
- **:echo** - Display message exactly as typed
- **:evaluate** - Evaluate mathematical expressions
- **:bookmark** - Save text to local storage
- **:qrcode** - Generate QR code from text
- **:theme** - Change theme (color/dark/light)

## Info Commands
- **:help** - Show this help message
- **:about** - Learn about this application
- **:author** - Information about the creator
- **:building** - See what Bikash is building

## Redirect Commands
- **:memes** - Redirect to MemeHub
- **:api** - Redirect to Hoppscotch
- **:realtime** - Redirect to Scira
- **:donate** - Support the creator

## Usage Examples
\`\`\`
:rephrase This text needs to be clearer
:summarise Long article text here
:explain How does photosynthesis work?
:idea A mobile app for pet owners
:bookmark Important meeting notes
:qrcode https://example.com
:theme dark
:rtc
:echo Hello World!
:evaluate 2 + 2 * 3
\`\`\`

Type any command followed by your input and press Enter!`
  };
}

export function handleAbout() {
  return {
    type: 'about' as const,
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

export function handleAuthor() {
  return {
    type: 'author' as const,
    content: `# About the Author\n\n## Bikash\n\n**Creator & Developer**\n\n### Contact Information\n- **Twitter**: [@bikash1376](https://x.com/bikash1376)\n- **Email**: bikash13763@gmail.com\n\n### Connect\nFeel free to reach out for questions, feedback, or collaboration opportunities!\n\n---\n*Built with ❤️ using Next.js and Google Gemini AI*`
  };
}

export function handleBuilding() {
  return {
    type: 'building' as const,
    content: `# Bikash is currently building\n\n- **dotstudio** ([repo](https://github.com/bikash1376/dotstudio))  \n  *An open-source alternative to ScreenStudio for screen recording and streaming, built with React and ffmpeg. Contributions are welcome! [Portfolio](http://bksh.site)*\n\n**He has contributed to:**\n- **The Orbit Studio** ([theorbit.studio](https://theorbit.studio))  \n  *A DevRel & Community Activation studio for Web3 protocols for builders.*\n\n**Other projects:**\n- **Pistash** ([app](https://pistash.vercel.app/))  \n  *A modern API client (currently not working as expected O_O).*\n- **Laggyfx** ([app](https://laggyfx.netlify.app/), [repo](https://github.com/bikash1376/Laggyfx))  \n  *A customizable gradient generator with live preview and image download. The app is intentionally "laggy" for fun! You can try [gradii.fun](https://gradii.fun) if you don't like my UI.*\n- **Yet Another To-Do** ([app](https://yet-another-to-do.vercel.app/))  \n  *A web-based calendar and to-do app using localStorage for persistence. Nonsense*\n- **Invoicelee** ([app](https://invoicelee.netlify.app/))  \n  *Generate invoices quickly and easily, right in your browser.*\n- **Take You Forward Redesign** ([app](https://takeyouforward-blush.vercel.app/))  \n  *A modern redesign of the TakeUForward landing page ([original](https://takeuforward.org/)).*\n`
  };
} 