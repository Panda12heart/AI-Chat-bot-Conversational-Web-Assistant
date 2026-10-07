# AI Chatbot — Claude-powered (Node.js)

A simple, fully functional AI chatbot using the Anthropic Claude API, Express.js backend, and a clean browser-based frontend. Supports multi-turn conversations (memory within a session).

---

## Project structure

```
ai-chatbot/
├── server.js          ← Express API server
├── package.json       ← Dependencies & scripts
├── .env.example       ← Environment variable template
├── .gitignore
└── public/
    └── index.html     ← Chat frontend (HTML/CSS/JS)
```

---

## Step-by-step setup

### Step 1 — Get your Anthropic API key

1. Go to https://console.anthropic.com
2. Sign in or create a free account
3. Navigate to **API Keys** → click **Create Key**
4. Copy the key (starts with `sk-ant-...`)

---

### Step 2 — Clone or download the project

If you have the zip, extract it. Or initialize manually:

```bash
mkdir ai-chatbot && cd ai-chatbot
# then place the files as shown in the structure above
```

---

### Step 3 — Install Node.js (if not already installed)

Download from https://nodejs.org (LTS version recommended, v18+).

Verify:
```bash
node -v   # should print v18.x.x or higher
npm -v    # should print 9.x.x or higher
```

---

### Step 4 — Install dependencies

```bash
cd ai-chatbot
npm install
```

This installs:
- `express` — web server
- `@anthropic-ai/sdk` — official Anthropic Node.js SDK

---

### Step 5 — Set your API key

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Open `.env` and replace the placeholder:

```
ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
PORT=3000
```

Then load it before starting (or use a package like `dotenv`):

**Option A — inline (simplest):**
```bash
ANTHROPIC_API_KEY=sk-ant-... node server.js
```

**Option B — install dotenv (recommended):**
```bash
npm install dotenv
```
Add this line at the very top of `server.js`:
```js
import "dotenv/config";
```
Then just run `npm start`.

---

### Step 6 — Start the server

```bash
npm start
```

You should see:
```
✅ Server running at http://localhost:3000
```

For development with auto-restart on file changes:
```bash
npm run dev
```

---

### Step 7 — Open the chatbot

Open your browser and go to:

```
http://localhost:3000
```

You'll see the chat UI. Type a message and press Enter or click Send.

---

## How it works

| Layer     | What it does                                                       |
|-----------|--------------------------------------------------------------------|
| Frontend  | Pure HTML/CSS/JS in `public/index.html` — no build step needed    |
| Backend   | `server.js` — Express handles `/api/chat` and `/api/reset` routes  |
| AI        | Anthropic SDK sends messages to `claude-sonnet-4-6`                |
| Memory    | Conversation history stored in-memory per `sessionId`              |

### API endpoints

| Method | Endpoint     | Body                          | Description                     |
|--------|-------------|-------------------------------|---------------------------------|
| POST   | /api/chat   | `{ message, sessionId }`      | Send a message, get AI reply    |
| POST   | /api/reset  | `{ sessionId }`               | Clear conversation history      |

---

## Customization tips

**Change the AI personality** — edit the `system` prompt in `server.js`:
```js
system: "You are a sarcastic but helpful pirate assistant.",
```

**Change the model** — swap `claude-sonnet-4-6` for another model:
```js
model: "claude-haiku-4-5-20251001",  // faster & cheaper
model: "claude-opus-4-6",            // most powerful
```

**Persist conversations** — replace the in-memory `sessions` object with a database (SQLite, Redis, MongoDB, etc.).

---

## Troubleshooting

| Problem                        | Fix                                                              |
|-------------------------------|------------------------------------------------------------------|
| `Error: API key not set`      | Make sure `ANTHROPIC_API_KEY` is exported in your environment    |
| `Cannot find module`          | Run `npm install` again                                          |
| Port already in use           | Change `PORT=3000` to another port in `.env`                     |
| Blank page in browser         | Make sure `public/index.html` exists                             |
| `node --watch` not found      | Upgrade to Node.js v18+, or use `nodemon` instead                |
