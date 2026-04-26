// DailyStats.jsx — Daily metrics panel
// M4: live Notion data polled every 60s. Falls back to mock when not connected.

function monthsToTarget() {
  const now    = new Date();
  const target = new Date(2029, 0, 1);
  return (target.getFullYear() - now.getFullYear()) * 12 + (target.getMonth() - now.getMonth());
}

const MOCK = { decisionsToday: 4, pendingApproval: 2, pipelineActive: 3, commsToday: 18, algosMonitored: 4 };

export default function DailyStats({ stats = null, connected = false }) {
  const data   = stats ?? MOCK;
  const months = monthsToTarget();

  const metrics = [
    { label: 'DECISIONS TODAY',   value: data.decisionsToday,  accent: '#f59e0b' },
    { label: 'PENDING APPROVAL',  value: data.pendingApproval, accent: data.pendingApproval > 0 ? '#ef4444' : '#f59e0b' },
    { label: 'PIPELINE ACTIVE',   value: data.pipelineActive,  accent: '#06b6d4' },
    { label: 'COMMS LOGGED TODAY',value: data.commsToday,      accent: '#10b981' },
    { label: 'ALGOS MONITORED',   value: data.algosMonitored,  accent: '#8b5cf6' },
  ];

  return (
    <div className="stats-panel">
      <div className="panel-header">
        <span className="panel-title">
          <span className="pdot" style={{ background: '#f59e0b' }} />
          DAILY STATS
        </span>
        <span style={{ fontSize: '8px', color: connected ? '#10b981' : '#3a3a5a', letterSpacing: '1px' }}>
          {connected ? 'LIVE' : 'MOCK'}
        </span>
      </div>

      <div className="stats-list">
        {metrics.map((m) => (
          <div key={m.label} className="stat-row">
            <span className="stat-label">{m.label}</span>
            <span className="stat-value" style={{ color: m.accent }}>{m.value}</span>
          </div>
        ))}
      </div>

      <div className="target-tracker">
        <div className="target-label">TARGET PROGRESS</div>
        <div className="target-value">$1M BY JAN 2029</div>
        <div className="target-months">
          <span className="months-num" style={{ color: '#f59e0b' }}>{months}</span>
          <span className="months-label"> MONTHS REMAINING</span>
        </div>
      </div>
    </div>
  );
}
