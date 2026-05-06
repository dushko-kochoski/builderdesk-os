import { describe, expect, it } from 'vitest'
import type { Prompt } from '../types'
import { filterPrompts, sortPrompts } from './promptUtils'

const prompts: Prompt[] = [
  {
    id: 'codex',
    title: 'Codex app prompt',
    category: 'Codex',
    project: 'BuilderDesk OS',
    promptText: 'Build a local-first app feature.',
    favorite: true,
    createdAt: '2026-05-01',
    updatedAt: '2026-05-03',
  },
  {
    id: 'readme',
    title: 'README writer',
    category: 'README',
    promptText: 'Write a polished README.',
    notes: 'Use for portfolio projects.',
    favorite: false,
    createdAt: '2026-05-01',
    updatedAt: '2026-05-04',
  },
]

describe('promptUtils', () => {
  it('filters prompts by category', () => {
    expect(filterPrompts(prompts, { category: 'Codex' }).map((prompt) => prompt.id)).toEqual(['codex'])
  })

  it('filters favorite prompts', () => {
    expect(filterPrompts(prompts, { favoritesOnly: true }).map((prompt) => prompt.id)).toEqual(['codex'])
  })

  it('searches title, text, project, and notes', () => {
    expect(filterPrompts(prompts, { query: 'portfolio' }).map((prompt) => prompt.id)).toEqual(['readme'])
    expect(filterPrompts(prompts, { query: 'builderdesk' }).map((prompt) => prompt.id)).toEqual(['codex'])
    expect(filterPrompts(prompts, { query: 'local-first' }).map((prompt) => prompt.id)).toEqual(['codex'])
  })

  it('sorts favorites before recently updated prompts', () => {
    expect(sortPrompts(prompts).map((prompt) => prompt.id)).toEqual(['codex', 'readme'])
  })
})
