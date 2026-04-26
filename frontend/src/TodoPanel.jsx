// TodoPanel.jsx — Actionable items panel
// M4: live Notion data polled every 60s. Falls back to mock when not connected.

const MOCK_TODOS = [
  { tag: 'APPROVAL', text: 'DEC-005 VWAP MGC Long-Only Test',        color: '#ef4444' },
  { tag: 'APPROVAL', text: 'DEC-006 VWAP MGC Wednesday Filter',       color: '#ef4444' },
  { tag: 'PIPELINE', text: 'ACC-M4 Notion Integration — In Dev',       color: '#f59e0b' },
  { tag: 'OPEN',     text: 'CDM → Dman | M1 Complete — action items',  color: '#8b5cf6' },
];

export default function TodoPanel({ todos = null, connected = false }) {
  const data         = todos ?? MOCK_TODOS;
  const approvalCount = data.filter(t => t.tag === 'APPROVAL').length;

  return (
    <div className="todo-panel">
      <div className="panel-header">
        <span className="panel-title">
          <span className="pdot" style={{
            background: approvalCount > 0 ? '#ef4444' : '#3a3a5a',
            boxShadow:  approvalCount > 0 ? '0 0 5px #ef4444' : 'none',
            animation:  approvalCount > 0 ? 'pulse 1.5s infinite' : 'none',
          }} />
          TODO
          {approvalCount > 0 && (
            <span className="approval-badge" style={{ background: '#ef4444' }}>{approvalCount}</span>
          )}
        </span>
        <span style={{ fontSize: '8px', color: connected ? '#10b981' : '#3a3a5a', letterSpacing: '1px' }}>
          {connected ? 'LIVE' : 'MOCK'}
        </span>
      </div>

      <div className="todo-list">
        {data.length === 0 && <div className="todo-empty">No pending items</div>}
        {data.map((item, i) => (
          <div key={i} className="todo-item" style={{ borderLeftColor: item.color }}>
            <div className="todo-tag" style={{ color: item.color }}>{item.tag}</div>
            <div className="todo-text">
              {item.text.length > 60 ? item.text.slice(0, 57) + '…' : item.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
