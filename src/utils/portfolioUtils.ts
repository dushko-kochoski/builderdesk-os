import type { PortfolioStatus, Project } from '../types'

export type PortfolioReadiness = {
  ready: boolean
  missingFields: string[]
  status: PortfolioStatus
}

function hasText(value: string | null | undefined) {
  return Boolean(value?.trim())
}

function hasItems(value: string[] | undefined) {
  return Boolean(value?.some((item) => item.trim()))
}

export function hasPortfolioLink(project: Project) {
  return Boolean(project.githubUrl || project.liveDemoUrl)
}

export function getPortfolioReadiness(project: Project): PortfolioReadiness {
  const missingFields: string[] = []

  if (!hasText(project.name)) missingFields.push('Project name')
  if (!hasText(project.category)) missingFields.push('Type/category')
  if (!hasText(project.nextAction)) missingFields.push('Next action or description')
  if (!hasPortfolioLink(project)) missingFields.push('GitHub or live demo URL')
  if (!hasText(project.problemSolved)) missingFields.push('Problem solved')
  if (!hasItems(project.keyFeatures)) missingFields.push('Key features')
  if (!hasItems(project.techStack)) missingFields.push('Tech stack')

  const ready = missingFields.length === 0
  const status = ready ? 'Ready' : project.portfolioStatus === 'Draft' ? 'Draft' : 'Needs work'

  return { ready, missingFields, status }
}

function listOrFallback(items: string[] | undefined, fallback = 'Not documented yet') {
  const cleanItems = items?.map((item) => item.trim()).filter(Boolean) ?? []
  return cleanItems.length > 0 ? cleanItems.join(', ') : fallback
}

function valueOrFallback(value: string | null | undefined, fallback = 'Not documented yet') {
  return value?.trim() || fallback
}

export function generatePortfolioSummary(project: Project) {
  const links = [
    project.githubUrl ? `GitHub: ${project.githubUrl}` : '',
    project.liveDemoUrl ? `Live Demo: ${project.liveDemoUrl}` : '',
  ].filter(Boolean)

  return [
    `Project: ${project.name}`,
    `Problem: ${valueOrFallback(project.problemSolved)}`,
    `Users: ${valueOrFallback(project.targetUsers)}`,
    `Key Features: ${listOrFallback(project.keyFeatures)}`,
    `Tech Stack: ${listOrFallback(project.techStack)}`,
    `Current Status: ${getPortfolioReadiness(project).status}`,
    `Links: ${links.length > 0 ? links.join(' | ') : 'Not published yet'}`,
    `What I Learned: ${valueOrFallback(project.whatILearned)}`,
    `Next Improvement: ${valueOrFallback(project.nextImprovement)}`,
  ].join('\n')
}

export function generateLinkedInSummary(project: Project) {
  return [
    `${project.name} is a ${project.category} project built to solve: ${valueOrFallback(project.problemSolved, 'a focused workflow problem')}.`,
    `Built for ${valueOrFallback(project.targetUsers, 'users who need a cleaner workflow')}.`,
    `Key features: ${listOrFallback(project.keyFeatures)}.`,
    `Tech stack: ${listOrFallback(project.techStack)}.`,
    `Biggest learning: ${valueOrFallback(project.whatILearned)}.`,
  ].join('\n\n')
}

export function generateReadmeSummary(project: Project) {
  return [
    `# ${project.name}`,
    '',
    `## Problem`,
    valueOrFallback(project.problemSolved),
    '',
    `## Users`,
    valueOrFallback(project.targetUsers),
    '',
    `## Key Features`,
    ...(project.keyFeatures?.filter(Boolean).map((feature) => `- ${feature}`) ?? ['- Not documented yet']),
    '',
    `## Tech Stack`,
    listOrFallback(project.techStack),
    '',
    `## Links`,
    project.githubUrl ? `- GitHub: ${project.githubUrl}` : '- GitHub: Not published yet',
    project.liveDemoUrl ? `- Live Demo: ${project.liveDemoUrl}` : '- Live Demo: Not published yet',
    '',
    `## What I Learned`,
    valueOrFallback(project.whatILearned),
    '',
    `## Next Improvement`,
    valueOrFallback(project.nextImprovement),
  ].join('\n')
}
