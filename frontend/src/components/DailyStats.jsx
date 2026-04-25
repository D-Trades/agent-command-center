// DailyStats.jsx — Daily metrics panel
// M2: static mock data. M4: polls /api/notion/stats every 60s.

const MOCK_STATS = {
  decisionsToday: 4,
  pendingApproval: 2,
  pipelineActive: 3,
  commsToday: 18,
  algosMonitored: 4,
};

// Months remaining to Jan 2029 from Apr 2026
function monthsToTarget() {
  const now = new Date();
  const target = new Date(2029, 0, 1);
  return (
    (target.getFullYear() - now.getFullYear()) * 12 +
    (target.getMonth() - now.getMonth())
  );
}

export default function DailyStats({ stats = null }) {
  const data = stats ?? MOCK_STATS;
  const months = monthsToTarget();

  const metrics = [
    { label: 'DECISIONS TODAY', value: data.decisionsToday },
    { label: 'PENDING APPROVAL', value: data.pendingApproval, accent: '#ef4444' },
    { label: 'PIPELINE ACTIVE', value: data.pipelineActive, accent: '#f59e0b' },
    { label: 'COMMS LOGGED TODAY', value: data.commsToday },
    { label: 'ALGOS MONITORED', value: data.algosMonitored, accent: '#10b981' },
  ];

  return (
    <div className="stats-panel">
      <div className="panel-header">
        <span className="panel-title">DAILY STATS</span>
        {!stats && <span className="panel-badge mock">MOCK</span>}
      </div>

      <div className="stats-list">
        {metrics.map((m) => (
          <div key={m.label} className="stat-row">
            <span className="stat-label">{m.label}</span>
            <span className="stat-value" style={{ color: m.accent ?? '#ff8c3a' }}>
              {m.value}
            </span>
          </div>
        ))}
      </div>

      {/* Target tracker */}
      <div className="target-tracker">
        <div className="target-label">TARGET</div>
        <div className="target-value">$1M BY JAN 2029</div>
        <div className="target-months">
          <span className="months-num" style={{ color: '#f59e0b' }}>{months}</span>
          <span className="months-label"> MONTHS REMAINING</span>
        </div>
      </div>
    </div>
  );
}
