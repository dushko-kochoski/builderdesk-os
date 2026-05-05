import { describe, expect, it } from 'vitest'
import type { CalendarEvent, Project, Task } from '../types'
import { addDaysISO, todayISO } from './dateUtils'
import { buildAlerts } from './alertUtils'

const baseProject: Project = {
  id: 'project-1',
  name: 'BuilderDesk OS',
  category: 'Command Center',
  status: 'Building',
  progress: 50,
  nextAction: 'Ship QA pass',
  dueDate: addDaysISO(14),
  savedLinks: [],
}

const baseTask: Task = {
  id: 'task-1',
  title: 'Review alert logic',
  project: 'BuilderDesk OS',
  priority: 'High',
  dueDate: todayISO(),
  completed: false,
}

const baseEvent: CalendarEvent = {
  id: 'calendar-1',
  title: 'Portfolio follow-up',
  date: todayISO(),
  type: 'Reminder',
  priority: 'High',
  completed: false,
  createdAt: todayISO(),
}

describe('alertUtils', () => {
  it('generates due today task alerts', () => {
    const alerts = buildAlerts([baseProject], [baseTask], [])

    expect(alerts.some((alert) => alert.id === 'due-today')).toBe(true)
  })

  it('generates overdue task and reminder alerts', () => {
    const alerts = buildAlerts(
      [baseProject],
      [{ ...baseTask, dueDate: addDaysISO(-1) }],
      [{ ...baseEvent, date: addDaysISO(-1) }],
    )

    expect(alerts.some((alert) => alert.id === 'overdue-tasks')).toBe(true)
    expect(alerts.some((alert) => alert.id === 'overdue-reminders')).toBe(true)
  })

  it('generates missing next action alerts', () => {
    const alerts = buildAlerts([{ ...baseProject, nextAction: null }], [], [])

    expect(alerts.some((alert) => alert.id === 'missing-actions')).toBe(true)
  })

  it('generates paused project alerts', () => {
    const alerts = buildAlerts([{ ...baseProject, status: 'Paused' }], [], [])

    expect(alerts.some((alert) => alert.id === 'paused-projects')).toBe(true)
  })
})
