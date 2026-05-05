import {
  AlertTriangle,
  CalendarClock,
  CircleDollarSign,
  FolderKanban,
  ListTodo,
  Rocket,
} from 'lucide-react'
import type { Alert, CalendarEvent, Metric, Note, Project, SavedLink, Task } from '../types'

export const projects: Project[] = [
  {
    id: 'ai-cost-guardrails',
    name: 'AI Cost Guardrails',
    category: 'SaaS Infrastructure',
    status: 'Building',
    progress: 72,
    nextAction: 'Finalize usage anomaly rule builder',
    dueDate: 'May 10, 2026',
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
    dueDate: 'May 8, 2026',
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
    dueDate: 'May 20, 2026',
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
    dueDate: 'May 12, 2026',
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
    dueDate: 'May 28, 2026',
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
    dueDate: 'Today',
  },
  {
    id: 'task-2',
    title: 'Clean up RiskDesk onboarding deck',
    project: 'RiskDesk AI',
    priority: 'High',
    dueDate: 'May 6',
  },
  {
    id: 'task-3',
    title: 'Draft BuilderDesk prompt library taxonomy',
    project: 'BuilderDesk OS',
    priority: 'Medium',
    dueDate: 'Today',
  },
  {
    id: 'task-4',
    title: 'Review missed Gridion supplier email',
    project: 'Gridion Gear',
    priority: 'Low',
    dueDate: 'Overdue',
  },
]

export const alerts: Alert[] = [
  {
    id: 'alert-1',
    title: '2 tasks due today',
    detail: 'AI Cost Guardrails and BuilderDesk OS both need action before end of day.',
    tone: 'today',
  },
  {
    id: 'alert-2',
    title: '1 overdue task',
    detail: 'Gridion Gear has a supplier follow-up sitting past deadline.',
    tone: 'danger',
  },
  {
    id: 'alert-3',
    title: 'Missing next action',
    detail: 'Gridion Gear is paused without a clear next action.',
    tone: 'warning',
  },
  {
    id: 'alert-4',
    title: 'Inactive project',
    detail: 'Gridion Gear has not moved this week.',
    tone: 'warning',
  },
  {
    id: 'alert-5',
    title: 'Upcoming deadlines',
    detail: 'RiskDesk AI is due May 8 and AI Cost Guardrails is due May 10.',
    tone: 'info',
  },
]

export const notes: Note[] = [
  {
    id: 'note-1',
    title: 'Prompt pattern',
    body: 'Convert rough feature ideas into launchable one-week scopes with explicit constraints.',
    tag: 'Prompts',
  },
  {
    id: 'note-2',
    title: 'Distribution thought',
    body: 'Short demos should start with the painful spreadsheet or current manual workflow.',
    tag: 'Marketing',
  },
  {
    id: 'note-3',
    title: 'BuilderDesk data model',
    body: 'Projects, tasks, notes, links, prompts, events, alerts. Keep everything searchable.',
    tag: 'Architecture',
  },
]

export const savedLinks: SavedLink[] = [
  { id: 'link-1', title: 'Claude prompt testing board', url: '#' },
  { id: 'link-2', title: 'OpenAI pricing notes', url: '#' },
  { id: 'link-3', title: 'Stripe launch checklist', url: '#' },
  { id: 'link-4', title: 'Vite + Tailwind reference', url: '#' },
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

export const metrics: Metric[] = [
  {
    label: 'Active projects',
    value: '4',
    change: '1 paused',
    icon: FolderKanban,
  },
  {
    label: 'Open tasks',
    value: '18',
    change: '2 due today',
    icon: ListTodo,
  },
  {
    label: 'Launch runway',
    value: '3',
    change: 'deadlines in 7 days',
    icon: Rocket,
  },
  {
    label: 'AI spend watch',
    value: '$428',
    change: 'projected this month',
    icon: CircleDollarSign,
  },
  {
    label: 'Alert load',
    value: '5',
    change: '2 need attention',
    icon: AlertTriangle,
  },
  {
    label: 'Calendar holds',
    value: '9',
    change: 'next 14 days',
    icon: CalendarClock,
  },
]
