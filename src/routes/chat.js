// routes/chat.js — Anthropic API proxy for D-Trades agent conversations
// Handles: POST /api/chat/:agentId

const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');
const prompts = require('../prompts');

const router = express.Router();
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Valid agent IDs — must match keys in prompts.js
const VALID_AGENTS = ['dman', 'oneeye', 'dinkins', 'dip', 'daveto', 'darius', 'daytona', 'dfl3x'];

/**
 * POST /api/chat/:agentId
 *
 * Body:
 *   messages    — prior conversation history [{role, content}, ...]
 *   userMessage — the new user message (string)
 *
 * Response:
 *   { reply: string }
 *   { error: string }  on failure
 */
router.post('/:agentId', async (req, res) => {
  const { agentId } = req.params;

  // --- Validate agent ---
  if (!VALID_AGENTS.includes(agentId)) {
    return res.status(404).json({ error: `Unknown agent: ${agentId}` });
  }

  const { messages = [], userMessage } = req.body;

  // --- Validate message ---
  if (!userMessage || typeof userMessage !== 'string' || userMessage.trim().length === 0) {
    return res.status(400).json({ error: 'userMessage is required and must be a non-empty string.' });
  }

  // --- Sanitise input: strip HTML tags ---
  const sanitised = userMessage.replace(/<[^>]*>/g, '').trim();

  // --- Build full message array ---
  const fullMessages = [
    ...messages,
    { role: 'user', content: sanitised },
  ];

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: prompts[agentId],
      messages: fullMessages,
    });

    const reply = response.content?.[0]?.text ?? '';

    if (!reply) {
      return res.status(502).json({ error: 'Empty response from Anthropic API.' });
    }

    return res.json({ reply });

  } catch (err) {
    console.error(`[chat/${agentId}] Anthropic API error:`, err.message);

    // Surface a clean error — never leak internal details
    if (err.status === 429) {
      return res.status(429).json({ error: 'Rate limit reached. Please wait a moment.' });
    }
    if (err.status === 401) {
      return res.status(500).json({ error: 'Authentication error. Check ANTHROPIC_API_KEY.' });
    }

    return res.status(500).json({ error: 'Agent unavailable. Try again.' });
  }
});

module.exports = router;
