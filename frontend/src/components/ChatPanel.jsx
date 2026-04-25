// ChatPanel.jsx — Agent conversation panel
// M2: renders with empty/localStorage history. M3: live /api/chat wiring active.

import { useState, useEffect, useRef } from 'react';
import { getAgent } from '../data/agents.js';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';

function storageKey(agentId) { return `dtrades_chat_${agentId}`; }

function loadHistory(agentId) {
  try { return JSON.parse(localStorage.getItem(storageKey(agentId)) ?? '[]'); }
  catch { return []; }
}

function saveHistory(agentId, messages) {
  try { localStorage.setItem(storageKey(agentId), JSON.stringify(messages)); }
  catch { /* quota */ }
}

export default function ChatPanel({ selectedAgentId, pendingMessage, onLoadingChange }) {
  const agent = getAgent(selectedAgentId);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);
  const messagesRef = useRef([]);
  messagesRef.current = messages;

  useEffect(() => {
    if (selectedAgentId) { setMessages(loadHistory(selectedAgentId)); setError(''); }
    else setMessages([]);
  }, [selectedAgentId]);

  useEffect(() => {
    if (pendingMessage?.text && selectedAgentId) doSend(pendingMessage.text);
  }, [pendingMessage]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => { onLoadingChange?.(loading); }, [loading]);

  async function doSend(text) {
    if (!text.trim() || loading || !selectedAgentId) return;
    const prior = messagesRef.current;
    const userMsg = { role: 'user', content: text.trim() };
    const updated = [...prior, userMsg];
    setMessages(updated);
    saveHistory(selectedAgentId, updated);
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/chat/${selectedAgentId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: prior, userMessage: userMsg.content }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error ?? `HTTP ${res.status}`);
      const final = [...updated, { role: 'assistant', content: data.reply }];
      setMessages(final);
      saveHistory(selectedAgentId, final);
    } catch (err) {
      setError(`Agent unavailable: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="chat-panel">
      <div className="panel-header">
        <span className="panel-title">
          {agent
            ? <><span style={{ color: agent.accent }}>▸ {agent.code}</span>{' '}{agent.name.toUpperCase()}</>
            : 'CHAT'}
        </span>
        {agent && <span className="panel-sub">{agent.title}</span>}
      </div>

      <div className="chat-messages">
        {!selectedAgentId && <div className="chat-placeholder">SELECT AN AGENT TO BEGIN</div>}
        {selectedAgentId && messages.length === 0 && !loading && (
          <div className="chat-placeholder" style={{ color: agent?.accent }}>▸ {agent?.name} standing by</div>
        )}
        {messages.map((msg, i) => (
          <div key={i}
            className={`chat-bubble ${msg.role === 'user' ? 'bubble-user' : 'bubble-agent'}`}
            style={msg.role === 'assistant' ? { borderLeftColor: agent?.accent } : {}}>
            <div className="bubble-sender">{msg.role === 'user' ? '▸ DMAN' : `▸ ${agent?.code}`}</div>
            <div className="bubble-text">{msg.content}</div>
          </div>
        ))}
        {loading && (
          <div className="chat-bubble bubble-agent" style={{ borderLeftColor: agent?.accent }}>
            <div className="bubble-sender">▸ {agent?.code}</div>
            <div className="typing-indicator"><span /><span /><span /></div>
          </div>
        )}
        {error && <div className="chat-error">{error}</div>}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
