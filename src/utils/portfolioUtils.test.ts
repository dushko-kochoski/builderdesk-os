import { describe, expect, it } from 'vitest'
import type { Project } from '../types'
import { generatePortfolioSummary, getPortfolioReadiness } from './portfolioUtils'

const baseProject: Project = {
  id: 'builderdesk',
  name: 'BuilderDesk OS',
  category: 'Productivity',
  status: 'Building',
  progress: 80,
  nextAction: 'Prepare portfolio mode',
  dueDate: '2026-05-06',
  savedLinks: [],
  problemSolved: 'Solo builders need a local-first command center.',
  targetUsers: 'Indie builders',
  keyFeatures: ['Projects', 'Tasks', 'Calendar'],
  techStack: ['React', 'TypeScript'],
  githubUrl: 'https://github.com/example/builderdesk',
  portfolioStatus: 'Draft',
  whatILearned: 'Local-first UX needs honest interactions.',
  nextImprovement: 'Add export mode.',
}

describe('portfolioUtils', () => {
  it('calculates ready projects', () => {
    const readiness = getPortfolioReadiness(baseProject)

    expect(readiness.ready).toBe(true)
    expect(readiness.missingFields).toEqual([])
    expect(readiness.status).toBe('Ready')
  })

  it('reports missing portfolio fields', () => {
    const readiness = getPortfolioReadiness({
      ...baseProject,
      githubUrl: '',
      liveDemoUrl: '',
      problemSolved: '',
      keyFeatures: [],
      techStack: [],
    })

    expect(readiness.ready).toBe(false)
    expect(readiness.missingFields).toEqual(
      expect.arrayContaining(['GitHub or live demo URL', 'Problem solved', 'Key features', 'Tech stack']),
    )
  })

  it('generates summary content', () => {
    const summary = generatePortfolioSummary(baseProject)

    expect(summary).toContain('Project: BuilderDesk OS')
    expect(summary).toContain('Problem: Solo builders need a local-first command center.')
    expect(summary).toContain('Tech Stack: React, TypeScript')
    expect(summary).toContain('GitHub: https://github.com/example/builderdesk')
  })
})
