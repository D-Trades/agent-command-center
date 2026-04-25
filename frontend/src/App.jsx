// App.jsx — D-Trades Agent Command Center
// Root layout and state. M2: mock data. M3: live chat. M4: live Notion.

import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import AgentGrid from './components/AgentGrid.jsx';
import ChatPanel from './components/ChatPanel.jsx';
import ChatInput from './components/ChatInput.jsx';
import DailyStats from './components/DailyStats.jsx';
import TodoPanel from './components/TodoPanel.jsx';
import TransactionLog from './components/TransactionLog.jsx';
import { getAgent } from './data/agents.js';
import './App.css';

const NOTION_TOKEN_KEY = 'dtrades_notion_token';

export default function App() {
  const [selectedAgentId, setSelectedAgentId] = useState(null);
  const [unreadIds, setUnreadIds] = useState([]);
  const [notionToken, setNotionToken] = useState(
    () => localStorage.getItem(NOTION_TOKEN_KEY) ?? ''
  );
  const [chatLoading, setChatLoading] = useState(false);

  const selectedAgent = getAgent(selectedAgentId);

  function handleNotionConnect(token) {
    setNotionToken(token);
    localStorage.setItem(NOTION_TOKEN_KEY, token);
  }

  function handleAgentSelect(id) {
    setSelectedAgentId(id);
    // Clear unread for selected agent
    if (id) setUnreadIds((prev) => prev.filter((u) => u !== id));
  }

  // M3 hook: send from ChatInput → ChatPanel handles the actual API call
  // For now ChatInput fires into ChatPanel via ref-less approach:
  // we pass a callback that ChatPanel exposes via state lifting
  const [pendingMessage, setPendingMessage] = useState(null);

  function handleSend(text) {
    setPendingMessage({ text, ts: Date.now() });
  }

  return (
    <div className="app">
      <Header
        notionConnected={!!notionToken}
        onNotionConnect={handleNotionConnect}
      />

      <main className="main-layout">
        {/* Left: agent grid + bottom panels */}
        <div className="content-area">
          {/* Agent grid */}
          <AgentGrid
            selectedId={selectedAgentId}
            unreadIds={unreadIds}
            onSelect={handleAgentSelect}
          />

          {/* Bottom row: chat, stats, todo */}
          <div className="bottom-row">
            <ChatPanel
              selectedAgentId={selectedAgentId}
              pendingMessage={pendingMessage}
              onLoadingChange={setChatLoading}
            />
            <DailyStats stats={null} />
            <TodoPanel todos={null} />
          </div>

          {/* Full-width input bar */}
          <ChatInput
            selectedAgent={selectedAgent}
            onSend={handleSend}
            disabled={chatLoading}
          />
        </div>

        {/* Right: transaction log */}
        <TransactionLog entries={null} />
      </main>
    </div>
  );
}
