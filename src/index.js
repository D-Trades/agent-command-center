// src/index.js — D-Trades Agent Command Center Backend
// Express server: Anthropic API proxy, rate limiting, CORS, keep-alive

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const chatRouter = require('./routes/chat');

const app = express();
const PORT = process.env.PORT || 3000;

// ---------------------------------------------------------------------------
// CORS
// Accepts requests from Netlify frontend and local dev only.
// ALLOWED_ORIGIN env var must be set to the Netlify domain in production.
// ---------------------------------------------------------------------------
const allowedOrigins = [
  process.env.ALLOWED_ORIGIN,
  'http://localhost:5173',
  'http://localhost:3000',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. Postman, health checks)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    console.warn(`[CORS] Blocked origin: ${origin}`);
    callback(new Error(`Origin ${origin} not allowed by CORS policy.`));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ---------------------------------------------------------------------------
// Body parsing
// ---------------------------------------------------------------------------
app.use(express.json({ limit: '16kb' }));

// ---------------------------------------------------------------------------
// Rate limiting
// Chat: 20 requests/min/IP
// Data routes: 60 requests/min/IP (Notion reads — added in M4)
// ---------------------------------------------------------------------------
const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Slow down.' },
});

app.use('/api/chat', chatLimiter);

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

// Health — used by Render for uptime checks and by keep-alive ping
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Chat proxy
app.use('/api/chat', chatRouter);

// 404 catch-all
app.use((req, res) => {
  res.status(404).json({ error: `No route: ${req.method} ${req.path}` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[Global error]', err.message);
  res.status(500).json({ error: 'Internal server error.' });
});

// ---------------------------------------------------------------------------
// Keep-alive ping — prevents Render free tier cold starts
// Pings /api/health every 14 minutes (Render spins down after 15min idle)
// ---------------------------------------------------------------------------
const KEEP_ALIVE_INTERVAL_MS = 14 * 60 * 1000; // 14 minutes

function keepAlive() {
  const url = process.env.RENDER_EXTERNAL_URL
    ? `${process.env.RENDER_EXTERNAL_URL}/api/health`
    : `http://localhost:${PORT}/api/health`;

  fetch(url)
    .then(() => console.log(`[keep-alive] Pinged ${url} at ${new Date().toISOString()}`))
    .catch((err) => console.warn(`[keep-alive] Ping failed: ${err.message}`));
}

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`[D-Trades ACC Backend] Listening on port ${PORT}`);
  console.log(`[D-Trades ACC Backend] Allowed origins: ${allowedOrigins.join(', ')}`);

  // Start keep-alive after first 14min interval
  setInterval(keepAlive, KEEP_ALIVE_INTERVAL_MS);
  console.log(`[D-Trades ACC Backend] Keep-alive active — pinging every 14 minutes`);
});
