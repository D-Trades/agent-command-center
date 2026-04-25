// AgentGrid.jsx — 3×3 agent grid

import AgentCard from './AgentCard.jsx';
import { AGENTS } from '../data/agents.js';

export default function AgentGrid({ selectedId, unreadIds = [], onSelect }) {
  return (
    <section className="agent-grid">
      {AGENTS.map((agent) => (
        <AgentCard
          key={agent.id}
          agent={agent}
          selected={selectedId === agent.id}
          hasUnread={unreadIds.includes(agent.id)}
          onClick={() => onSelect(selectedId === agent.id ? null : agent.id)}
        />
      ))}

      {/* Add-agent placeholder */}
      <div className="agent-card add-agent-card">
        <div className="add-agent-inner">
          <span className="add-agent-icon">+</span>
          <span className="add-agent-label">ADD AGENT</span>
        </div>
      </div>
    </section>
  );
}
