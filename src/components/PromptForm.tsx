import { type FormEvent, useEffect, useState } from 'react'
import type { Prompt, PromptCategory } from '../types'
import { promptCategories } from '../utils/normalizeData'
import { todayISO } from '../utils/dateUtils'

type PromptFormProps = {
  editingPrompt?: Prompt | null
  projectNames: string[]
  onCancel: () => void
  onSave: (prompt: Prompt) => void
}

export function PromptForm({ editingPrompt, projectNames, onCancel, onSave }: PromptFormProps) {
  const [title, setTitle] = useState(editingPrompt?.title ?? '')
  const [category, setCategory] = useState<PromptCategory>(editingPrompt?.category ?? 'Codex')
  const [project, setProject] = useState(editingPrompt?.project ?? '')
  const [promptText, setPromptText] = useState(editingPrompt?.promptText ?? '')
  const [notes, setNotes] = useState(editingPrompt?.notes ?? '')
  const [favorite, setFavorite] = useState(editingPrompt?.favorite ?? false)

  useEffect(() => {
    setTitle(editingPrompt?.title ?? '')
    setCategory(editingPrompt?.category ?? 'Codex')
    setProject(editingPrompt?.project ?? '')
    setPromptText(editingPrompt?.promptText ?? '')
    setNotes(editingPrompt?.notes ?? '')
    setFavorite(editingPrompt?.favorite ?? false)
  }, [editingPrompt])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const now = todayISO()

    if (!title.trim() || !promptText.trim()) {
      return
    }

    onSave({
      id: editingPrompt?.id ?? `prompt-${Date.now()}`,
      title: title.trim(),
      category,
      project: project.trim() || undefined,
      promptText: promptText.trim(),
      notes: notes.trim() || undefined,
      favorite,
      createdAt: editingPrompt?.createdAt ?? now,
      updatedAt: now,
    })
  }

  return (
    <form className="mb-5 rounded-[1.35rem] border border-cyan-300/20 bg-cyan-300/10 p-4 sm:p-5" onSubmit={handleSubmit}>
      <div className="grid gap-3 md:grid-cols-2">
        <input
          className="h-11 rounded-xl border border-white/10 bg-slate-950/50 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
          placeholder="Prompt title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          className="h-11 rounded-xl border border-white/10 bg-slate-950/50 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
          list="prompt-projects"
          placeholder="Project"
          value={project}
          onChange={(event) => setProject(event.target.value)}
        />
        <datalist id="prompt-projects">
          {projectNames.map((projectName) => (
            <option key={projectName} value={projectName} />
          ))}
        </datalist>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-[1fr_auto]">
        <select
          className="h-11 rounded-xl border border-white/10 bg-slate-950/50 px-3 text-sm text-white outline-none transition focus:border-cyan-300/50"
          value={category}
          onChange={(event) => setCategory(event.target.value as PromptCategory)}
        >
          {promptCategories.map((promptCategory) => (
            <option key={promptCategory}>{promptCategory}</option>
          ))}
        </select>
        <label className="flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-slate-950/50 px-3 text-sm font-semibold text-slate-300">
          <input
            className="size-4 accent-cyan-300"
            checked={favorite}
            type="checkbox"
            onChange={(event) => setFavorite(event.target.checked)}
          />
          Favorite
        </label>
      </div>

      <textarea
        className="mt-3 min-h-40 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
        placeholder="Prompt text"
        value={promptText}
        onChange={(event) => setPromptText(event.target.value)}
      />

      <textarea
        className="mt-3 min-h-20 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
        placeholder="Notes"
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
      />

      <div className="mt-4 flex justify-end gap-2">
        <button
          className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-cyan-300/40 hover:text-white"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="rounded-xl bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
          type="submit"
        >
          {editingPrompt ? 'Save prompt' : 'Add prompt'}
        </button>
      </div>
    </form>
  )
}
