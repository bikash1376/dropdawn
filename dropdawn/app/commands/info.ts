export function handleHelp() {
  return {
    type: 'help' as const,
    content: `# Available Commands

## AI Commands
- **:rephrase** - Rephrase text in a clearer way
- **:summarise** - Summarize text concisely
- **:explain** - Explain things in simple terms
- **:idea** - Brainstorm and expand on ideas
- **:joke** - Tell a joke about something

## Utility Commands
- **:rtc** - Redirect to PeerSuite.space (opens in new tab)
- **:echo** - Display message exactly as typed
- **:evaluate** - Evaluate mathematical expressions
- **:bookmark** - Save text to local storage
  - \`:bookmark <text>\` - Save text as bookmark
  - \`:bookmark\` (no text) - List all bookmarks
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
:bookmark
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