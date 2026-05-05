import type { LucideIcon } from 'lucide-react'

export type ProjectStatus = 'Building' | 'Planning' | 'Shipping' | 'Paused'

export type Priority = 'High' | 'Medium' | 'Low'

export type AlertTone = 'danger' | 'today' | 'warning' | 'info' | 'success'

export type Project = {
  id: string
  name: string
  category: string
  status: ProjectStatus
  progress: number
  nextAction: string | null
  dueDate: string
  savedLinks: SavedLink[]
}

export type Task = {
  id: string
  title: string
  project: string
  priority: Priority
  dueDate: string
}

export type Alert = {
  id: string
  title: string
  detail: string
  tone: AlertTone
}

export type Note = {
  id: string
  title: string
  body: string
  tag: string
}

export type SavedLink = {
  id: string
  title: string
  url: string
}

export type CalendarEvent = {
  id: string
  title: string
  project: string
  date: string
  time: string
}

export type Metric = {
  label: string
  value: string
  change: string
  icon: LucideIcon
}
