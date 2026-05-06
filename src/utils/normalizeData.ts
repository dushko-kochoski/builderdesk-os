import type {
  CalendarEvent,
  CalendarEventType,
  Note,
  Priority,
  Project,
  ProjectLink,
  PortfolioStatus,
  ProjectStatus,
  SavedLink,
  Task,
} from '../types'
import { normalizeDateInput, todayISO } from './dateUtils'

const statuses: ProjectStatus[] = ['Building', 'Planning', 'Shipping', 'Paused']
const portfolioStatuses: PortfolioStatus[] = ['Draft', 'Ready', 'Needs work']
const priorities: Priority[] = ['High', 'Medium', 'Low']
const eventTypes: CalendarEventType[] = ['Deadline', 'Reminder', 'Milestone', 'Follow-up', 'Review']

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function text(value: unknown, fallback = '') {
  return typeof value === 'string' ? value : fallback
}

function normalizeUrl(value: unknown) {
  const url = text(value).trim()
  if (!url || url === '#') return ''
  if (/^(https?:)?\/\//i.test(url) || /^mailto:/i.test(url)) return url
  return `https://${url}`
}

export function normalizeExternalUrl(value: string) {
  return normalizeUrl(value)
}

function textList(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((item) => text(item).trim()).filter(Boolean)
  }

  return text(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

function normalizeProjectLink(value: unknown, index: number): ProjectLink {
  if (typeof value === 'string') {
    return { id: `project-link-${index}`, label: value, url: '' }
  }

  if (isRecord(value)) {
    return {
      id: text(value.id, `project-link-${index}`),
      label: text(value.label, text(value.title, `Link ${index + 1}`)),
      url: normalizeUrl(value.url),
    }
  }

  return { id: `project-link-${index}`, label: `Link ${index + 1}`, url: '' }
}

function findProjectLinkUrl(links: ProjectLink[], patterns: RegExp[]) {
  return links.find((link) => link.url && patterns.some((pattern) => pattern.test(link.label)))?.url
}

export function normalizeProjects(value: unknown, fallback: Project[]): Project[] {
  const source = Array.isArray(value) ? value : fallback

  return source.map((item, index) => {
    const record = isRecord(item) ? item : {}
    const status = statuses.includes(record.status as ProjectStatus)
      ? (record.status as ProjectStatus)
      : 'Planning'

    const savedLinks = (Array.isArray(record.savedLinks) ? record.savedLinks : []).map(normalizeProjectLink)
    const githubUrl = normalizeUrl(record.githubUrl) || findProjectLinkUrl(savedLinks, [/github/i])
    const liveDemoUrl =
      normalizeUrl(record.liveDemoUrl) ||
      findProjectLinkUrl(savedLinks, [/live/i, /demo/i, /vercel/i, /render/i, /netlify/i])
    const portfolioStatus = portfolioStatuses.includes(record.portfolioStatus as PortfolioStatus)
      ? (record.portfolioStatus as PortfolioStatus)
      : 'Draft'

    return {
      id: text(record.id, `project-${index}`),
      name: text(record.name, 'Untitled project'),
      category: text(record.category, 'Project'),
      status,
      progress: Math.min(100, Math.max(0, Number(record.progress) || 0)),
      nextAction: text(record.nextAction).trim() || null,
      dueDate: normalizeDateInput(text(record.dueDate), 7),
      savedLinks,
      problemSolved: text(record.problemSolved) || undefined,
      targetUsers: text(record.targetUsers) || undefined,
      keyFeatures: textList(record.keyFeatures),
      techStack: textList(record.techStack),
      liveDemoUrl: liveDemoUrl || undefined,
      githubUrl: githubUrl || undefined,
      portfolioStatus,
      whatILearned: text(record.whatILearned) || undefined,
      nextImprovement: text(record.nextImprovement) || undefined,
    }
  })
}

export function normalizeTasks(value: unknown, fallback: Task[]): Task[] {
  const source = Array.isArray(value) ? value : fallback

  return source.map((item, index) => {
    const record = isRecord(item) ? item : {}
    const priority = priorities.includes(record.priority as Priority) ? (record.priority as Priority) : 'Medium'

    return {
      id: text(record.id, `task-${index}`),
      title: text(record.title, 'Untitled task'),
      project: text(record.project, 'General'),
      priority,
      dueDate: normalizeDateInput(text(record.dueDate), 0),
      completed: Boolean(record.completed),
    }
  })
}

export function normalizeNotes(value: unknown, fallback: Note[]): Note[] {
  const source = Array.isArray(value) ? value : fallback

  return source.map((item, index) => {
    if (typeof item === 'string') {
      return {
        id: `note-${index}`,
        title: 'Imported note',
        body: item,
        tag: 'Note',
        createdAt: todayISO(),
      }
    }

    const record = isRecord(item) ? item : {}
    return {
      id: text(record.id, `note-${index}`),
      title: text(record.title, 'Untitled note'),
      body: text(record.body, text(record.text)),
      tag: text(record.tag, 'Note'),
      createdAt: normalizeDateInput(text(record.createdAt), 0),
    }
  })
}

export function normalizeSavedLinks(value: unknown, fallback: SavedLink[]): SavedLink[] {
  const source = Array.isArray(value) ? value : fallback

  return source.map((item, index) => {
    if (typeof item === 'string') {
      return {
        id: `link-${index}`,
        title: item,
        url: '',
        createdAt: todayISO(),
      }
    }

    const record = isRecord(item) ? item : {}
    return {
      id: text(record.id, `link-${index}`),
      title: text(record.title, text(record.label, `Link ${index + 1}`)),
      url: normalizeUrl(record.url),
      project: text(record.project) || undefined,
      createdAt: normalizeDateInput(text(record.createdAt), 0),
    }
  })
}

export function normalizeCalendarEvents(value: unknown, fallback: CalendarEvent[]): CalendarEvent[] {
  const source = Array.isArray(value) ? value : fallback

  return source.map((item, index) => {
    const record = isRecord(item) ? item : {}
    const type = eventTypes.includes(record.type as CalendarEventType)
      ? (record.type as CalendarEventType)
      : 'Reminder'
    const priority = priorities.includes(record.priority as Priority) ? (record.priority as Priority) : 'Medium'

    return {
      id: text(record.id, `calendar-${index}`),
      title: text(record.title, 'Untitled reminder'),
      date: normalizeDateInput(text(record.date), index + 1),
      time: text(record.time) || undefined,
      type,
      project: text(record.project) || undefined,
      priority,
      notes: text(record.notes) || undefined,
      completed: Boolean(record.completed),
      createdAt: normalizeDateInput(text(record.createdAt), 0),
    }
  })
}
