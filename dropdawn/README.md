Dropdawn is a modern AI chat application built with **Next.js 15** and **Google Gemini AI**. It has smart commands that show up when you press the colon key (`:`) and uses external APIs for different tools.

-----

## Features

### 🤖 AI Capabilities

  - **Text Chat**: Get responses from Google Gemini AI.
  - **Mixed Content**: Combine text and images in a single query.
  - **Smart Commands**: Use special commands for specific tasks.

### 🎨 Modern UI

  - A sleek gradient design with a dark theme.
  - Responsive layout for both desktop and mobile.
  - Smooth animations and transitions.
  - Dropdown command suggestions for convenience.

### 📝 Available Commands

  - `:rephrase` - Reword text for better clarity.
  - `:summarise` - Create a concise summary of a text.
  - `:describe` - Get a detailed description of an image.
  - `:analyze` - Analyze the content and features of an image.
  - `:rtc` - Redirect to PeerSuite.space (opens in a new tab).
  - `:echo` - Display a message exactly as it's typed.
  - `:evaluate` - Calculate the result of mathematical expressions.
  - `:help` - See a list of all available commands.
  - `:about` - Learn about the application.
  - `:author` - Get information about the creator.

-----

## How to Use

### Text Input

Just type your question and press **Enter**.

### Mixed Content

Combine text and images in your query.

### Examples

  - **Text only**: `What is the capital of France?`
  - **Mixed content**: `:analyze This is a photo of a cat`
  - **Special commands**:
      - `:rtc` (opens PeerSuite.space)
      - `:echo Hello World!` (displays "Hello World\!")
      - `:evaluate 2 + 2 * 3` (calculates and shows the result)
      - `:help` (shows all available commands)

-----

## Setup

1.  **Clone** the repository.
2.  **Install dependencies**: `npm install`
3.  **Set your Gemini API key** in environment variables: `GEMINI_API_KEY=your_api_key_here`
4.  **Run the development server**: `npm run dev`
5.  **Open** your browser to `http://localhost:3000`.

## Tech Stack

  - **Frontend**: Next.js 15, React 19, TypeScript
  - **Styling**: Tailwind CSS
  - **AI**: Google Gemini AI
  - **Markdown**: Marked.js for response formatting

-----

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

  - `GEMINI_API_KEY`: Your Google Gemini AI API key (required).

## Development

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run ESLint
```
