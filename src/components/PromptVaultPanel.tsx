import { useMemo, useState } from 'react'
import { Plus, Search, Star } from 'lucide-react'
import type { Prompt, PromptCategory } from '../types'
import { filterPrompts, sortPrompts } from '../utils/promptUtils'
import { promptCategories } from '../utils/normalizeData'
import { Panel } from './Panel'
import { PromptCard } from './PromptCard'
import { PromptForm } from './PromptForm'

type PromptVaultPanelProps = {
  prompts: Prompt[]
  projectNames: string[]
  showForm: boolean
  totalPromptCount: number
  onDeletePrompt: (promptId: string) => void
  onSavePrompt: (prompt: Prompt) => void
  onShowFormChange: (showForm: boolean) => void
  onToggleFavorite: (promptId: string) => void
}

async function copyPrompt(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
  }
}

export function PromptVaultPanel({
  prompts,
  projectNames,
  showForm,
  totalPromptCount,
  onDeletePrompt,
  onSavePrompt,
  onShowFormChange,
  onToggleFavorite,
}: PromptVaultPanelProps) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<PromptCategory | 'All'>('All')
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null)
  const [copiedPromptId, setCopiedPromptId] = useState('')

  const visiblePrompts = useMemo(
    () => sortPrompts(filterPrompts(prompts, { query, category, favoritesOnly })),
    [category, favoritesOnly, prompts, query],
  )
  const favoriteCount = prompts.filter((prompt) => prompt.favorite).length

  async function handleCopy(prompt: Prompt) {
    await copyPrompt(prompt.promptText)
    setCopiedPromptId(prompt.id)
    window.setTimeout(() => setCopiedPromptId(''), 1400)
  }

  function handleSave(prompt: Prompt) {
    onSavePrompt(prompt)
    setEditingPrompt(null)
  }

  return (
    <Panel
      title="Prompt Vault"
      eyebrow="Reusable prompts"
      action={
        <button
          className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100 transition hover:border-cyan-300/40 hover:bg-cyan-300/15"
          type="button"
          onClick={() => {
            setEditingPrompt(null)
            onShowFormChange(!showForm)
          }}
        >
          <Plus className="size-3.5" />
          {prompts.length} saved
        </button>
      }
    >
      <div className="mb-5 grid gap-3 lg:grid-cols-[minmax(0,1fr)_13rem_auto]">
        <label className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
          <input
            className="h-11 w-full rounded-xl border border-white/10 bg-slate-950/50 pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
            placeholder="Search prompts..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <select
          className="h-11 rounded-xl border border-white/10 bg-slate-950/50 px-3 text-sm text-white outline-none transition focus:border-cyan-300/50"
          value={category}
          onChange={(event) => setCategory(event.target.value as PromptCategory | 'All')}
        >
          <option>All</option>
          {promptCategories.map((promptCategory) => (
            <option key={promptCategory}>{promptCategory}</option>
          ))}
        </select>
        <button
          className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl border px-3 text-sm font-semibold transition ${
            favoritesOnly
              ? 'border-amber-300/30 bg-amber-300/10 text-amber-100'
              : 'border-white/10 bg-white/[0.04] text-slate-300 hover:border-amber-300/30 hover:text-white'
          }`}
          type="button"
          onClick={() => setFavoritesOnly((current) => !current)}
        >
          <Star className="size-4" />
          Favorites {favoriteCount}
        </button>
      </div>

      {showForm ? (
        <PromptForm
          editingPrompt={editingPrompt}
          projectNames={projectNames}
          onCancel={() => {
            setEditingPrompt(null)
            onShowFormChange(false)
          }}
          onSave={handleSave}
        />
      ) : null}

      {totalPromptCount === 0 ? (
        <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-6 text-sm leading-6 text-slate-400">
          No prompts saved yet. Add your first reusable Codex or ChatGPT prompt.
          <button
            className="mt-3 block rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-300/40"
            type="button"
            onClick={() => onShowFormChange(true)}
          >
            Add prompt
          </button>
        </div>
      ) : null}

      {visiblePrompts.length === 0 && totalPromptCount > 0 ? (
        <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-6 text-sm leading-6 text-slate-400">
          No prompts match the current filters.
        </div>
      ) : null}

      <div className="grid gap-4 xl:grid-cols-2">
        {visiblePrompts.map((prompt) => (
          <PromptCard
            copied={copiedPromptId === prompt.id}
            key={prompt.id}
            prompt={prompt}
            onCopy={handleCopy}
            onDelete={onDeletePrompt}
            onEdit={(selectedPrompt) => {
              setEditingPrompt(selectedPrompt)
              onShowFormChange(true)
            }}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </Panel>
  )
}
