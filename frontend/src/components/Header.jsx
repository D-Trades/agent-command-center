// Header.jsx — D-Trades ACC Header
// Logo, tagline, system status, config drawer (Notion token)

import { useState } from 'react';

export default function Header({ notionConnected, onNotionConnect }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [token, setToken] = useState('');
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState('');

  async function handleConnect() {
    if (!token.trim()) return;
    setConnecting(true);
    setError('');
    try {
      // Validate token by hitting Notion API directly
      const res = await fetch('https://api.notion.com/v1/users/me', {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
          'Notion-Version': '2022-06-28',
        },
      });
      if (res.ok) {
        onNotionConnect(token.trim());
        setDrawerOpen(false);
      } else {
        setError('Invalid token — Notion returned ' + res.status);
      }
    } catch {
      setError('Connection failed. Check token and try again.');
    } finally {
      setConnecting(false);
    }
  }

  return (
    <header className="header">
      <div className="header-inner">
        {/* Logo */}
        <div className="header-logo">
          <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <polygon points="20,2 36,11 36,29 20,38 4,29 4,11" fill="none" stroke="#ff8c3a" strokeWidth="1.5"/>
            <polygon points="20,7 31,13.5 31,26.5 20,33 9,26.5 9,13.5" fill="rgba(255,140,58,0.08)"/>
            <text x="20" y="24" textAnchor="middle" fontFamily="'Rajdhani', sans-serif" fontWeight="700" fontSize="11" fill="#ff8c3a">DT</text>
          </svg>
          <div className="header-brand">
            <span className="brand-name">D-TRADES</span>
            <span className="brand-sub">ALGO TRADING COMMAND CENTER</span>
          </div>
        </div>

        {/* Status + config */}
        <div className="header-right">
          {notionConnected && (
            <div className="notion-badge">
              <span className="dot dot-green pulse" />
              LIVE FEED ACTIVE
            </div>
          )}
          <div className="system-status">
            <span className="dot dot-green" />
            <span className="dot dot-green" />
            <span className="dot dot-amber" />
            <span className="status-label">SYSTEM ONLINE</span>
          </div>
          <button className="btn-config" onClick={() => setDrawerOpen((o) => !o)}>
            ⚙ CONFIG
          </button>
        </div>
      </div>

      {/* Config drawer */}
      {drawerOpen && (
        <div className="config-drawer">
          <div className="config-row">
            <span className="config-label">NOTION TOKEN</span>
            <input
              className="config-input"
              type="password"
              placeholder="ntn_..."
              value={token}
              onChange={(e) => setToken(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleConnect()}
            />
            <button className="btn-connect" onClick={handleConnect} disabled={connecting}>
              {connecting ? 'CONNECTING...' : 'CONNECT'}
            </button>
          </div>
          {error && <div className="config-error">{error}</div>}
          <div className="config-hint">
            Token stored in localStorage. Never sent to the backend.
          </div>
        </div>
      )}
    </header>
  );
}
