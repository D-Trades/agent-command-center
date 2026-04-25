// TransactionLog.jsx — Comms log transaction feed
// M2: static mock data. M4: polls Notion Comms Log every 30s.

const STATUS_COLOURS = {
  Delivered: '#10b981',
  Failed: '#ef4444',
  'In-Flight': '#f59e0b',
  Queued: '#3b82f6',
  Open: '#8b5cf6',
  Resolved: '#10b981',
};

const MOCK_ENTRIES = [
  { subject: 'CDM → Dman | ACC M1 Complete', from: 'Dfl3x', to: ['Dman'], status: 'Delivered', time: '08:33', requiresApproval: false },
  { subject: 'CDM → Daytona | M1 Acceptance Review', from: 'Dfl3x', to: ['Daytona'], status: 'Open', time: '08:35', requiresApproval: false },
  { subject: 'CDM → OneEye | Notion MCP Access Flag', from: 'Dfl3x', to: ['OneEye'], status: 'Open', time: '08:35', requiresApproval: false },
  { subject: 'ARCO Session Log — Apr 25 Summary', from: 'Dman', to: ['OneEye'], status: 'Resolved', time: '08:34', requiresApproval: false },
  { subject: 'SPEC-ACC-001 BDM Review Complete M1 GO', from: 'Daytona', to: ['Dfl3x'], status: 'Delivered', time: '08:19', requiresApproval: false },
  { subject: 'GitHub org for ACC repo confirmed live', from: 'Dman', to: ['Dfl3x'], status: 'Delivered', time: '08:22', requiresApproval: false },
  { subject: 'DEC-005 VWAP MGC Long-Only — Approved', from: 'Dman', to: ['Darius', 'Dfl3x'], status: 'Delivered', time: '07:44', requiresApproval: false },
  { subject: 'DEC-006 VWAP MGC Wed Filter — Approved', from: 'Dman', to: ['Darius', 'Dfl3x'], status: 'Delivered', time: '07:44', requiresApproval: false },
];

function truncate(str, n) {
  return str.length > n ? str.slice(0, n - 1) + '…' : str;
}

export default function TransactionLog({ entries = null }) {
  const data = (entries ?? MOCK_ENTRIES).slice(0, 25);

  return (
    <aside className="transaction-log">
      <div className="panel-header">
        <span className="panel-title">COMMS LOG</span>
        {!entries && <span className="panel-badge mock">MOCK</span>}
      </div>

      <div className="txn-list">
        {data.map((entry, i) => {
          const colour = STATUS_COLOURS[entry.status] ?? '#666';
          return (
            <div key={i} className="txn-entry">
              <div className="txn-top">
                <span className="txn-subject">{truncate(entry.subject, 44)}</span>
                <span className="txn-time">{entry.time}</span>
              </div>
              <div className="txn-bottom">
                <span className="txn-route">
                  {entry.from} → {Array.isArray(entry.to) ? entry.to.join(', ') : entry.to}
                </span>
                <span className="txn-status" style={{ color: colour }}>
                  {entry.requiresApproval && (
                    <span className="approval-dot pulse" title="Approval required" />
                  )}
                  {entry.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
