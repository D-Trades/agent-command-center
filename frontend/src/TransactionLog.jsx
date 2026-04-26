// TransactionLog.jsx — Comms log transaction feed
// M4: live Notion data polled every 30s. Falls back to mock when not connected.

const STATUS_COLOURS = {
  Delivered: '#10b981',
  Failed:    '#ef4444',
  'In-Flight': '#f59e0b',
  Queued:    '#3b82f6',
  Open:      '#8b5cf6',
  Resolved:  '#10b981',
  Escalated: '#ef4444',
  'N/A':     '#555555',
};

const MOCK_ENTRIES = [
  { subject: 'CDM → Dman | ACC M2+M3 Live',        from: 'Dfl3x',   to: ['Dman'],    status: 'Delivered', time: '17:48', requiresApproval: false },
  { subject: 'CDM → Daytona | M2+M3 BDM Sign-off', from: 'Dfl3x',   to: ['Daytona'], status: 'Open',      time: '17:49', requiresApproval: false },
  { subject: 'CDM → OneEye | Session Close M4 Queued', from: 'Dfl3x', to: ['OneEye'], status: 'Open',     time: '17:49', requiresApproval: false },
  { subject: 'CDM → Dman | ACC M1 Complete',        from: 'Dfl3x',   to: ['Dman'],    status: 'Delivered', time: '08:33', requiresApproval: false },
  { subject: 'SPEC-ACC-001 BDM Review — M1 GO',     from: 'Daytona', to: ['Dfl3x'],   status: 'Delivered', time: '08:19', requiresApproval: false },
  { subject: 'DEC-005 VWAP MGC Long-Only Approved', from: 'Dman',    to: ['Darius'],  status: 'Delivered', time: '07:44', requiresApproval: false },
  { subject: 'DEC-006 Wed Filter Approved',         from: 'Dman',    to: ['Darius'],  status: 'Delivered', time: '07:44', requiresApproval: false },
  { subject: 'ARCO Session Log — Apr 25 Summary',   from: 'Dman',    to: ['OneEye'],  status: 'Resolved',  time: '08:34', requiresApproval: false },
];

function truncate(str, n) {
  return str.length > n ? str.slice(0, n - 1) + '…' : str;
}

export default function TransactionLog({ entries = null, connected = false }) {
  const data = (entries ?? MOCK_ENTRIES).slice(0, 25);

  return (
    <aside className="transaction-log">
      <div className="panel-header">
        <span className="panel-title">
          <span className={`pdot ${connected ? 'dot-green' : ''}`}
            style={{ background: connected ? '#10b981' : '#3a3a5a',
                     boxShadow: connected ? '0 0 5px #10b981' : 'none' }} />
          COMMS LOG
        </span>
        <span style={{ fontSize: '9px', color: connected ? '#10b981' : '#3a3a5a', letterSpacing: '1px' }}>
          {connected ? 'LIVE' : 'MOCK'} · {data.length}
        </span>
      </div>

      <div className="txn-list">
        {data.map((entry, i) => {
          const colour = STATUS_COLOURS[entry.status] ?? '#555';
          const toStr  = Array.isArray(entry.to) ? entry.to.join(', ') : entry.to;
          return (
            <div key={entry.id ?? i} className="txn-entry" style={{ borderLeftColor: colour }}>
              {entry.requiresApproval && (
                <div style={{ fontSize: '8px', color: '#ef4444', letterSpacing: '1px', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span className="approval-dot pulse" />APPROVAL REQ
                </div>
              )}
              <div className="txn-top">
                <span className="txn-subject">{truncate(entry.subject, 44)}</span>
                <span className="txn-time">{entry.time}</span>
              </div>
              <div className="txn-bottom">
                <span className="txn-route">{entry.from} → {toStr}</span>
                <span className="txn-status" style={{ color: colour }}>{entry.status}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="tx-footer">
        {connected ? '● POLLING EVERY 30S' : '⚙ CONFIG → CONNECT NOTION'}
      </div>
    </aside>
  );
}
