// agents.js — D-Trades Agent Roster
// Single source of truth. Used by AgentGrid, ChatPanel, prompts, etc.

export const AGENTS = [
  {
    id: 'dman',
    code: 'BOSS',
    name: 'Dman',
    title: 'Founder & CEO',
    duty: 'Strategy, vision, final decisions',
    accent: '#f59e0b',
  },
  {
    id: 'oneeye',
    code: 'ARCO',
    name: 'OneEye',
    title: 'Agent Resources & Communications Officer',
    duty: 'Comms routing, Notion logging, approvals',
    accent: '#8b5cf6',
  },
  {
    id: 'dinkins',
    code: 'PDO',
    name: 'Dinkins',
    title: 'PnL Development Officer',
    duty: 'Cost tracking, PnL modelling, revenue targets',
    accent: '#10b981',
  },
  {
    id: 'dip',
    code: 'PMO',
    name: 'Dip',
    title: 'Portfolio Management Officer',
    duty: 'Portfolio risk, algo weighting, concentration',
    accent: '#06b6d4',
  },
  {
    id: 'daveto',
    code: 'ASAM',
    name: 'Daveto',
    title: 'Asset Analysis Manager',
    duty: 'Market reports, macro analysis, calendar',
    accent: '#f97316',
  },
  {
    id: 'darius',
    code: 'ALAM',
    name: 'Darius',
    title: 'Algo Analysis Manager',
    duty: 'Performance scanning, improvement proposals',
    accent: '#ef4444',
  },
  {
    id: 'daytona',
    code: 'BDM',
    name: 'Daytona',
    title: 'Business Development Manager',
    duty: 'Pipeline ownership, milestone gating',
    accent: '#ec4899',
  },
  {
    id: 'dfl3x',
    code: 'CDM',
    name: 'Dfl3x',
    title: 'Code Development Manager',
    duty: 'Builds, infra, Pine Script, Notion schema',
    accent: '#3b82f6',
  },
];

export const getAgent = (id) => AGENTS.find((a) => a.id === id) ?? null;
