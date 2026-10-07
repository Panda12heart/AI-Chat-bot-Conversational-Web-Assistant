import express from "express";
import Anthropic from "@anthropic-ai/sdk";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const client = new Anthropic(); // uses ANTHROPIC_API_KEY env var

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// In-memory conversation store (keyed by session ID)
const sessions = {};

app.post("/api/chat", async (req, res) => {
  const { message, sessionId } = req.body;

  if (!message || !sessionId) {
    return res.status(400).json({ error: "message and sessionId are required" });
  }

  // Initialize session history if new
  if (!sessions[sessionId]) {
    sessions[sessionId] = [];
  }

  // Append user message
  sessions[sessionId].push({ role: "user", content: message });

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system:
        "You are a helpful, friendly AI assistant. Be concise and clear in your responses.",
      messages: sessions[sessionId],
    });

    const reply = response.content[0].text;

    // Append assistant reply to history
    sessions[sessionId].push({ role: "assistant", content: reply });

    res.json({ reply, sessionId });
  } catch (err) {
    console.error("Anthropic API error:", err.message);
    res.status(500).json({ error: "Failed to get response from AI" });
  }
});

// Clear conversation history for a session
app.post("/api/reset", (req, res) => {
  const { sessionId } = req.body;
  if (sessionId && sessions[sessionId]) {
    delete sessions[sessionId];
  }
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
