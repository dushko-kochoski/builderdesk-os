import { describe, expect, it } from 'vitest'
import type { CalendarEvent, Project, SavedLink } from '../types'
import { normalizeCalendarEvents, normalizeProjects, normalizeSavedLinks } from './normalizeData'

const fallbackProject: Project = {
  id: 'fallback-project',
  name: 'Fallback Project',
  category: 'Fallback',
  status: 'Planning',
  progress: 0,
  nextAction: null,
  dueDate: '2026-05-05',
  savedLinks: [],
}

const fallbackLink: SavedLink = {
  id: 'fallback-link',
  title: 'Fallback Link',
  url: 'https://example.com',
  createdAt: '2026-05-05',
}

const fallbackEvent: CalendarEvent = {
  id: 'fallback-event',
  title: 'Fallback Event',
  date: '2026-05-05',
  type: 'Reminder',
  priority: 'Medium',
  completed: false,
  createdAt: '2026-05-05',
}

describe('normalizeData', () => {
  it('converts old saved link strings safely', () => {
    const [link] = normalizeSavedLinks(['Research doc'], [fallbackLink])

    expect(link.title).toBe('Research doc')
    expect(link.url).toBe('')
    expect(link.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('converts old project link strings safely', () => {
    const [project] = normalizeProjects(
      [{ name: 'Legacy Project', savedLinks: ['GitHub', { title: 'Docs', url: 'example.com' }] }],
      [fallbackProject],
    )

    expect(project.savedLinks[0]).toMatchObject({ label: 'GitHub', url: '' })
    expect(project.savedLinks[1]).toMatchObject({ label: 'Docs', url: 'https://example.com' })
  })

  it('fills safe defaults for missing project fields', () => {
    const [project] = normalizeProjects([{}], [fallbackProject])

    expect(project.name).toBe('Untitled project')
    expect(project.category).toBe('Project')
    expect(project.status).toBe('Planning')
    expect(project.savedLinks).toEqual([])
  })

  it('does not crash on invalid calendar data', () => {
    const events = normalizeCalendarEvents(
      [null, { title: 12, date: 'bad-date', type: 'Nope', priority: 'Urgent' }],
      [fallbackEvent],
    )

    expect(events).toHaveLength(2)
    expect(events[0].title).toBe('Untitled reminder')
    expect(events[1]).toMatchObject({
      title: 'Untitled reminder',
      type: 'Reminder',
      priority: 'Medium',
      completed: false,
    })
  })
})
