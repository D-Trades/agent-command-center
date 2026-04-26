// hooks/useNotion.js — Notion live feed for D-Trades ACC
// Architecture: frontend hits Notion API directly (token from localStorage).
// No backend involvement — backend is Anthropic proxy only.
//
// Polls:
//   transactions  — Comms Log, every 30s, last 25 entries
//   stats         — Decision Log + Pipeline + Perf Log, every 60s
//   todos         — Decision Log + Pipeline + Comms Log, every 60s

import { useState, useEffect, useRef, useCallback } from 'react';

// All Notion calls go through the Netlify proxy function — never direct from browser.
const NOTION_PROXY  = '/.netlify/functions/notion-proxy';

// DB IDs
const DB_COMMS      = '49cabd64-a95d-44c3-853a-ec096114aaeb';
const DB_DECISIONS  = 'aaed4017-e2fb-407d-939c-88bbddc6bb24';
const DB_PIPELINE   = '2b943df0-d336-4bb1-99a9-bbe8fe72b8ce';
const DB_PERF       = 'e4a49a7f-a303-4b13-8575-f3cbd03ef331';

const TX_INTERVAL   = 30_000;  // 30s
const STAT_INTERVAL = 60_000;  // 60s

// ── Notion fetch helper — via proxy ───────────────────────────────────────
async function notionQuery(token, dbId, body = {}) {
  const res = await fetch(NOTION_PROXY, {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ action: 'query', dbId, body }),
  });
  if (!res.ok) throw new Error(`Notion proxy ${res.status}: ${dbId}`);
  return res.json();
}

// ── Property extractors ───────────────────────────────────────────────────
function title(page)    { return Object.values(page.properties).find(p => p.type === 'title')?.title?.[0]?.plain_text ?? ''; }
function select(page, k){ return page.properties[k]?.select?.name ?? ''; }
function multiSel(page, k){ return (page.properties[k]?.multi_select ?? []).map(o => o.name); }
function checkbox(page, k){ return page.properties[k]?.checkbox ?? false; }
function dateProp(page, k){ return page.properties[k]?.date?.start ?? null; }

function pageTime(page) {
  const t = page.last_edited_time ?? page.created_time ?? '';
  return t ? new Date(t).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : '';
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

// ── Transaction mapper ────────────────────────────────────────────────────
function mapTransaction(page) {
  return {
    id:              page.id,
    subject:         title(page),
    from:            select(page, 'From'),
    to:              multiSel(page, 'To'),
    status:          select(page, 'queue_status') || select(page, 'Status'),
    requiresApproval: checkbox(page, 'requires_approval'),
    time:            pageTime(page),
    notionUrl:       page.url,
  };
}

// ── Stats fetcher ─────────────────────────────────────────────────────────
async function fetchStats(token) {
  const today = todayISO();

  const [decAll, pipeline, perf, commsAll] = await Promise.all([
    notionQuery(token, DB_DECISIONS, { page_size: 100 }),
    notionQuery(token, DB_PIPELINE,  { page_size: 100 }),
    notionQuery(token, DB_PERF,      { page_size: 100 }),
    notionQuery(token, DB_COMMS,     { page_size: 100 }),
  ]);

  const decisionsToday = decAll.results.filter(p => dateProp(p, 'Date') === today).length;
  const pendingApproval = decAll.results.filter(p => select(p, 'Outcome') === 'Pending').length;
  const pipelineActive  = pipeline.results.filter(p => ['In Dev','Testing'].includes(select(p, 'Status'))).length;
  const commsToday      = commsAll.results.filter(p => dateProp(p, 'Date') === today).length;
  const algosMonitored  = perf.results.filter(p => ['Paper Trading','Live'].includes(select(p, 'Status'))).length;

  return { decisionsToday, pendingApproval, pipelineActive, commsToday, algosMonitored };
}

// ── Todos fetcher ─────────────────────────────────────────────────────────
async function fetchTodos(token) {
  const [decisions, pipeline, comms] = await Promise.all([
    notionQuery(token, DB_DECISIONS, { page_size: 100 }),
    notionQuery(token, DB_PIPELINE,  { page_size: 100 }),
    notionQuery(token, DB_COMMS,     {
      page_size: 50,
      filter: {
        or: [
          { property: 'requires_approval', checkbox: { equals: true } },
          { property: 'queue_status', select: { equals: 'Failed' } },
        ],
      },
    }),
  ]);

  const todos = [];

  // APPROVAL — Decision Log pending founder decisions
  decisions.results
    .filter(p => select(p, 'Outcome') === 'Pending' && select(p, 'Type') === 'Founder Only')
    .forEach(p => todos.push({ tag: 'APPROVAL', text: title(p), color: '#ef4444', notionUrl: p.url }));

  // PIPELINE — items awaiting vote or just identified
  pipeline.results
    .filter(p => ['Identified','Voting'].includes(select(p, 'Status')))
    .forEach(p => todos.push({ tag: 'PIPELINE', text: title(p), color: '#f59e0b', notionUrl: p.url }));

  // OPEN — comms requiring approval
  comms.results
    .filter(p => checkbox(p, 'requires_approval') && select(p, 'Status') === 'Open')
    .forEach(p => todos.push({ tag: 'OPEN', text: title(p), color: '#8b5cf6', notionUrl: p.url }));

  // FAILED — failed deliveries
  comms.results
    .filter(p => select(p, 'queue_status') === 'Failed')
    .forEach(p => todos.push({ tag: 'FAILED', text: title(p), color: '#ef4444', notionUrl: p.url }));

  return todos;
}

// ── Transactions fetcher ──────────────────────────────────────────────────
async function fetchTransactions(token) {
  const data = await notionQuery(token, DB_COMMS, {
    sorts: [{ timestamp: 'last_edited_time', direction: 'descending' }],
    page_size: 25,
  });
  return data.results.map(mapTransaction);
}

// ── Main hook ─────────────────────────────────────────────────────────────
export default function useNotion(token) {
  const [transactions, setTransactions] = useState(null);
  const [stats,        setStats]        = useState(null);
  const [todos,        setTodos]        = useState(null);
  const [error,        setError]        = useState('');
  const [connected,    setConnected]    = useState(false);

  const txTimerRef   = useRef(null);
  const statTimerRef = useRef(null);

  const loadTx = useCallback(async () => {
    if (!token) return;
    try {
      const tx = await fetchTransactions(token);
      setTransactions(tx);
      setConnected(true);
      setError('');
    } catch (e) {
      setError(e.message);
      setConnected(false);
    }
  }, [token]);

  const loadStats = useCallback(async () => {
    if (!token) return;
    try {
      const [s, t] = await Promise.all([fetchStats(token), fetchTodos(token)]);
      setStats(s);
      setTodos(t);
    } catch (e) {
      setError(e.message);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      setConnected(false);
      setTransactions(null);
      setStats(null);
      setTodos(null);
      return;
    }

    // Initial load
    loadTx();
    loadStats();

    // Poll intervals
    txTimerRef.current   = setInterval(loadTx,    TX_INTERVAL);
    statTimerRef.current = setInterval(loadStats, STAT_INTERVAL);

    return () => {
      clearInterval(txTimerRef.current);
      clearInterval(statTimerRef.current);
    };
  }, [token, loadTx, loadStats]);

  return { transactions, stats, todos, connected, error };
}
