// App.jsx — D-Trades Agent Command Center
// M4: useNotion hook wired — live Notion data when token connected.

import { useState } from 'react';
import Header          from './components/Header.jsx';
import AgentGrid       from './components/AgentGrid.jsx';
import ChatPanel       from './components/ChatPanel.jsx';
import ChatInput       from './components/ChatInput.jsx';
import DailyStats      from './components/DailyStats.jsx';
import TodoPanel       from './components/TodoPanel.jsx';
import TransactionLog  from './components/TransactionLog.jsx';
import useNotion       from './hooks/useNotion.js';
import { getAgent }    from './data/agents.js';
import './App.css';

const NOTION_TOKEN_KEY = 'dtrades_notion_token';

export default function App() {
  const [selectedAgentId, setSelectedAgentId] = useState(null);
  const [unreadIds,       setUnreadIds]        = useState([]);
  const [notionToken,     setNotionToken]       = useState(
    () => localStorage.getItem(NOTION_TOKEN_KEY) ?? ''
  );
  const [chatLoading, setChatLoading]   = useState(false);
  const [pendingMessage, setPendingMessage] = useState(null);

  // M4 — live Notion data
  const { transactions, stats, todos, connected } = useNotion(notionToken);

  const selectedAgent = getAgent(selectedAgentId);

  function handleNotionConnect(token) {
    setNotionToken(token);
    localStorage.setItem(NOTION_TOKEN_KEY, token);
  }

  function handleAgentSelect(id) {
    setSelectedAgentId(id);
    if (id) setUnreadIds(prev => prev.filter(u => u !== id));
  }

  function handleSend(text) {
    setPendingMessage({ text, ts: Date.now() });
  }

  return (
    <div className="app">
      <Header
        notionConnected={connected}
        onNotionConnect={handleNotionConnect}
      />

      <main className="main-layout">
        <div className="content-area">
          <AgentGrid
            selectedId={selectedAgentId}
            unreadIds={unreadIds}
            onSelect={handleAgentSelect}
          />

          <div className="bottom-row">
            <ChatPanel
              selectedAgentId={selectedAgentId}
              pendingMessage={pendingMessage}
              onLoadingChange={setChatLoading}
            />
            <DailyStats stats={stats}        connected={connected} />
            <TodoPanel  todos={todos}        connected={connected} />
          </div>

          <ChatInput
            selectedAgent={selectedAgent}
            onSend={handleSend}
            disabled={chatLoading}
          />
        </div>

        <TransactionLog entries={transactions} connected={connected} />
      </main>
    </div>
  );
}
