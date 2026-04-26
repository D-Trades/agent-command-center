// AgentCard.jsx — Individual agent card, pixel-matched to approved prototype

import Portrait from './portraits/index.jsx';

export default function AgentCard({ agent, selected, hasUnread, onClick }) {
  return (
    <div
      className={`agent-card${selected ? ' selected' : ''}`}
      style={{ '--accent': agent.accent, '--accent-glow': `${agent.accent}10` }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      {/* Code badge — top left */}
      <div className="agent-code-badge" style={{ color: agent.accent }}>{agent.code}</div>

      {/* Status dot — top right */}
      <div className="agent-status-dot" />

      {/* Portrait */}
      <div
        className="portrait-wrap"
        style={{
          borderColor: selected ? agent.accent : '#2a2a44',
          boxShadow: selected ? `0 0 16px ${agent.accent}66` : 'none',
        }}
      >
        <Portrait id={agent.id} size={78} />
      </div>

      {/* Name */}
      <div className="agent-name" style={{ color: selected ? agent.accent : 'var(--text)' }}>
        {agent.name}
      </div>

      {/* Full title */}
      <div className="agent-title" style={{ color: agent.accent, opacity: 0.9 }}>
        {agent.title}
      </div>

      {/* Unread dot */}
      {hasUnread && !selected && (
        <div className="agent-unread" style={{ color: agent.accent }} />
      )}
    </div>
  );
}
