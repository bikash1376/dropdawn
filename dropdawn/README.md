# Dropdawn - AI Chat with Image Support

A modern AI chat application built with Next.js 15 and Google Gemini AI that supports both text and image inputs.

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

### 📝 Available Commands
- `:rephrase` - Rephrase text in a clearer way
- `:summarise` - Summarize text concisely
- `:describe` - Describe an image in detail
- `:analyze` - Analyze image content and features
- `:rtc` - Redirect to PeerSuite.space (opens in new tab)
- `:echo` - Display message exactly as typed
- `:evaluate` - Evaluate mathematical expressions
- `:help` - Show all available commands
- `:about` - Learn about this application
- `:author` - Information about the creator

## How to Use

### Text Input
Simply type your question and press Enter.

### Image Input
1. **Paste Image URL**: Copy an image URL and paste it directly
2. **Base64 Images**: Paste base64 encoded images (data:image/...)
3. **Mixed Content**: Combine text and images in your query

### Examples
```
# Text only
What is the capital of France?

# Image URL
https://example.com/image.jpg

# Image with text
:describe https://example.com/image.jpg

# Mixed content
:analyze This is a photo of a cat https://example.com/cat.jpg

# Special commands
:rtc                    # Opens PeerSuite.space in new tab
:echo Hello World!      # Displays "Hello World!"
:evaluate 2 + 2 * 3     # Calculates and shows result
:help                   # Shows all available commands
:about                  # Learn about the application
:author                 # Information about the creator
```

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set your Gemini API key in environment variables:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```
4. Run the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini AI
- **Markdown**: Marked.js for response formatting

## API Structure

The application uses Next.js App Router with the following API structure:
```
app/
├── api/
│   └── hello/
│       └── route.ts  # Main AI endpoint
├── components/
│   └── answer.tsx    # Response display component
└── utils/
    └── promptTools.tsx # Command processing
```

## Environment Variables

- `GEMINI_API_KEY`: Your Google Gemini AI API key (required)

## Development

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run ESLint
```
