import type { Prompt, PromptCategory } from '../types'

export type PromptFilters = {
  query?: string
  category?: PromptCategory | 'All'
  favoritesOnly?: boolean
}

function includesQuery(prompt: Prompt, query: string) {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return true

  return [prompt.title, prompt.category, prompt.project, prompt.promptText, prompt.notes].some((value) =>
    value?.toLowerCase().includes(normalized),
  )
}

export function filterPrompts(prompts: Prompt[], filters: PromptFilters) {
  return prompts.filter((prompt) => {
    const categoryMatch = !filters.category || filters.category === 'All' || prompt.category === filters.category
    const favoriteMatch = !filters.favoritesOnly || prompt.favorite
    return categoryMatch && favoriteMatch && includesQuery(prompt, filters.query ?? '')
  })
}

export function sortPrompts(prompts: Prompt[]) {
  return [...prompts].sort((a, b) => Number(b.favorite) - Number(a.favorite) || b.updatedAt.localeCompare(a.updatedAt))
}
