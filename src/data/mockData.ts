import type { CalendarEvent, Note, Project, SavedLink, Task } from '../types'
import { addDaysISO, todayISO } from '../utils/dateUtils'

export const projects: Project[] = [
  {
    id: 'ai-cost-guardrails',
    name: 'AI Cost Guardrails',
    category: 'SaaS Infrastructure',
    status: 'Building',
    progress: 72,
    nextAction: 'Finalize usage anomaly rule builder',
    dueDate: addDaysISO(5),
    savedLinks: [
      { id: 'acg-1', title: 'Pricing model', url: '#' },
      { id: 'acg-2', title: 'OpenAI usage notes', url: '#' },
      { id: 'acg-3', title: 'Launch checklist', url: '#' },
    ],
  },
  {
    id: 'riskdesk-ai',
    name: 'RiskDesk AI',
    category: 'Fintech Copilot',
    status: 'Shipping',
    progress: 88,
    nextAction: 'Record demo flow for enterprise reviewers',
    dueDate: addDaysISO(3),
    savedLinks: [
      { id: 'rd-1', title: 'Demo script', url: '#' },
      { id: 'rd-2', title: 'Risk scoring matrix', url: '#' },
    ],
  },
  {
    id: 'tradelabtools',
    name: 'TradeLabTools',
    category: 'Trading Research',
    status: 'Planning',
    progress: 41,
    nextAction: 'Map indicator library into paid tiers',
    dueDate: addDaysISO(15),
    savedLinks: [
      { id: 'tlt-1', title: 'Strategy backlog', url: '#' },
      { id: 'tlt-2', title: 'Charting references', url: '#' },
    ],
  },
  {
    id: 'builderdesk-os',
    name: 'BuilderDesk OS',
    category: 'Personal Command Center',
    status: 'Building',
    progress: 54,
    nextAction: 'Connect dashboard actions to local storage',
    dueDate: addDaysISO(7),
    savedLinks: [
      { id: 'bdo-1', title: 'MVP scope', url: '#' },
      { id: 'bdo-2', title: 'Component map', url: '#' },
    ],
  },
  {
    id: 'gridion-gear',
    name: 'Gridion Gear',
    category: 'Commerce Experiment',
    status: 'Paused',
    progress: 23,
    nextAction: null,
    dueDate: addDaysISO(23),
    savedLinks: [
      { id: 'gg-1', title: 'Supplier shortlist', url: '#' },
      { id: 'gg-2', title: 'Landing page copy', url: '#' },
    ],
  },
]

export const tasks: Task[] = [
  {
    id: 'task-1',
    title: 'Ship guardrail alert thresholds',
    project: 'AI Cost Guardrails',
    priority: 'High',
    dueDate: todayISO(),
    completed: false,
  },
  {
    id: 'task-2',
    title: 'Clean up RiskDesk onboarding deck',
    project: 'RiskDesk AI',
    priority: 'High',
    dueDate: addDaysISO(1),
    completed: false,
  },
  {
    id: 'task-3',
    title: 'Draft BuilderDesk prompt library taxonomy',
    project: 'BuilderDesk OS',
    priority: 'Medium',
    dueDate: todayISO(),
    completed: false,
  },
  {
    id: 'task-4',
    title: 'Review missed Gridion supplier email',
    project: 'Gridion Gear',
    priority: 'Low',
    dueDate: addDaysISO(-1),
    completed: false,
  },
]

export const notes: Note[] = [
  {
    id: 'note-1',
    title: 'Prompt pattern',
    body: 'Convert rough feature ideas into launchable one-week scopes with explicit constraints.',
    tag: 'Prompts',
    createdAt: todayISO(),
  },
  {
    id: 'note-2',
    title: 'Distribution thought',
    body: 'Short demos should start with the painful spreadsheet or current manual workflow.',
    tag: 'Marketing',
    createdAt: addDaysISO(-1),
  },
  {
    id: 'note-3',
    title: 'BuilderDesk data model',
    body: 'Projects, tasks, notes, links, prompts, events, alerts. Keep everything searchable.',
    tag: 'Architecture',
    createdAt: addDaysISO(-2),
  },
]

export const savedLinks: SavedLink[] = [
  { id: 'link-1', title: 'Claude prompt testing board', url: '#', project: 'BuilderDesk OS' },
  { id: 'link-2', title: 'OpenAI pricing notes', url: '#', project: 'AI Cost Guardrails' },
  { id: 'link-3', title: 'Stripe launch checklist', url: '#', project: 'RiskDesk AI' },
  { id: 'link-4', title: 'Vite + Tailwind reference', url: '#', project: 'BuilderDesk OS' },
]

export const calendarEvents: CalendarEvent[] = [
  {
    id: 'event-1',
    title: 'RiskDesk AI demo review',
    project: 'RiskDesk AI',
    date: 'May 6',
    time: '10:30',
  },
  {
    id: 'event-2',
    title: 'Cost Guardrails launch pass',
    project: 'AI Cost Guardrails',
    date: 'May 8',
    time: '15:00',
  },
  {
    id: 'event-3',
    title: 'BuilderDesk MVP retrospective',
    project: 'BuilderDesk OS',
    date: 'May 12',
    time: '09:00',
  },
]
