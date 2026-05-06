import type { LucideIcon } from 'lucide-react'

export type AppView =
  | 'Dashboard'
  | 'Projects'
  | 'Tasks'
  | 'Notes'
  | 'Links'
  | 'Calendar'
  | 'Alerts'
  | 'Portfolio'
  | 'Prompts'

export type QuickCreateTarget = 'Project' | 'Task' | 'Note' | 'Link' | 'Reminder' | 'Prompt'

export type ProjectStatus = 'Building' | 'Planning' | 'Shipping' | 'Paused'

export type PortfolioStatus = 'Draft' | 'Ready' | 'Needs work'

export type Priority = 'High' | 'Medium' | 'Low'

export type AlertTone = 'danger' | 'today' | 'warning' | 'info' | 'success'

export type CalendarEventType = 'Deadline' | 'Reminder' | 'Milestone' | 'Follow-up' | 'Review'

export type PromptCategory =
  | 'Codex'
  | 'Debugging'
  | 'README'
  | 'LinkedIn'
  | 'Planning'
  | 'Deployment'
  | 'Trading'
  | 'Newsroom'
  | 'Other'

export type SavedLink = {
  id: string
  title: string
  url: string
  project?: string
  createdAt: string
}

export type Prompt = {
  id: string
  title: string
  category: PromptCategory
  project?: string
  promptText: string
  notes?: string
  favorite: boolean
  createdAt: string
  updatedAt: string
}

export type ProjectLink = {
  id: string
  label: string
  url: string
}

export type Project = {
  id: string
  name: string
  category: string
  status: ProjectStatus
  progress: number
  nextAction: string | null
  dueDate: string
  savedLinks: ProjectLink[]
  problemSolved?: string
  targetUsers?: string
  keyFeatures?: string[]
  techStack?: string[]
  liveDemoUrl?: string
  githubUrl?: string
  portfolioStatus?: PortfolioStatus
  whatILearned?: string
  nextImprovement?: string
}

export type Task = {
  id: string
  title: string
  project: string
  priority: Priority
  dueDate: string
  completed: boolean
}

export type AlertItem = {
  id: string
  title: string
  detail: string
  tone: AlertTone
}

export type Alert = AlertItem

export type Note = {
  id: string
  title: string
  body: string
  tag: string
  createdAt: string
}

export type CalendarEvent = {
  id: string
  title: string
  date: string
  time?: string
  type: CalendarEventType
  project?: string
  priority: Priority
  notes?: string
  completed: boolean
  createdAt: string
}

export type LegacyCalendarEvent = {
  id: string
  title: string
  date: string
  time: string
  project: string
}

export type Metric = {
  label: string
  value: string
  change: string
  icon: LucideIcon
}
