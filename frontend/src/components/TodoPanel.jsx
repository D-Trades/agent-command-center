// TodoPanel.jsx — Actionable items panel
// M2: static mock data. M4: polls /api/notion/todos every 60s.

const MOCK_TODOS = [
  { tag: 'APPROVAL', text: 'DEC-005 VWAP MGC Long-Only Test', color: '#ef4444' },
  { tag: 'APPROVAL', text: 'DEC-006 VWAP MGC Wednesday Filter', color: '#ef4444' },
  { tag: 'PIPELINE', text: 'ACC-M1 Backend — Awaiting Render deploy', color: '#f59e0b' },
  { tag: 'OPEN', text: 'CDM → Dman | M1 Complete — action items', color: '#8b5cf6' },
];

export default function TodoPanel({ todos = null }) {
  const data = todos ?? MOCK_TODOS;
  const approvalCount = data.filter((t) => t.tag === 'APPROVAL').length;

  return (
    <div className="todo-panel">
      <div className="panel-header">
        <span className="panel-title">
          TODO
          {approvalCount > 0 && (
            <span className="approval-badge" style={{ background: '#ef4444' }}>
              {approvalCount}
            </span>
          )}
        </span>
        {!todos && <span className="panel-badge mock">MOCK</span>}
      </div>

      <div className="todo-list">
        {data.length === 0 && (
          <div className="todo-empty">No pending items</div>
        )}
        {data.map((item, i) => (
          <div key={i} className="todo-item" style={{ borderLeftColor: item.color }}>
            <span className="todo-tag" style={{ color: item.color }}>{item.tag}</span>
            <span className="todo-text">
              {item.text.length > 60 ? item.text.slice(0, 57) + '...' : item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
