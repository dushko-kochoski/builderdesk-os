import { type FormEvent, useState } from 'react'
import type { Project, ProjectStatus } from '../types'
import { addDaysISO } from '../utils/dateUtils'
import { normalizeExternalUrl } from '../utils/normalizeData'

const projectStatuses: ProjectStatus[] = ['Building', 'Planning', 'Shipping', 'Paused']

type ProjectFormProps = {
  onAddProject: (project: Project) => void
  onCancel: () => void
}

function buildProjectLinks(value: string, projectId: string) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item, index) => {
      const [rawLabel, rawUrl = ''] = item.split('|').map((part) => part.trim())
      const looksLikeUrl = /^https?:\/\//i.test(rawLabel) || rawLabel.includes('.')

      return {
        id: `${projectId}-link-${index + 1}`,
        label: looksLikeUrl ? rawLabel.replace(/^https?:\/\//i, '') : rawLabel,
        url: normalizeExternalUrl(rawUrl || (looksLikeUrl ? rawLabel : '')),
      }
    })
}

export function ProjectForm({ onAddProject, onCancel }: ProjectFormProps) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState<ProjectStatus>('Building')
  const [progress, setProgress] = useState('0')
  const [nextAction, setNextAction] = useState('')
  const [dueDate, setDueDate] = useState(addDaysISO(7))
  const [linksText, setLinksText] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!name.trim() || !category.trim()) {
      return
    }

    const projectId = `project-${Date.now()}`
    onAddProject({
      id: projectId,
      name: name.trim(),
      category: category.trim(),
      status,
      progress: Math.min(100, Math.max(0, Number(progress) || 0)),
      nextAction: nextAction.trim() || null,
      dueDate,
      savedLinks: buildProjectLinks(linksText, projectId),
    })
  }

  return (
    <form
      className="mb-5 rounded-[1.35rem] border border-white/[0.07] bg-[#0a1120]/80 p-4 shadow-[0_4px_20px_rgba(0,0,0,0.14)] sm:p-5"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-3 md:grid-cols-2">
        <input
          className="h-11 rounded-xl border border-white/10 bg-slate-950/50 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
          placeholder="Project name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          className="h-11 rounded-xl border border-white/10 bg-slate-950/50 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
          placeholder="Type / category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-3">
        <select
          className="h-11 rounded-xl border border-white/10 bg-slate-950/50 px-3 text-sm text-white outline-none transition focus:border-cyan-300/50"
          value={status}
          onChange={(event) => setStatus(event.target.value as ProjectStatus)}
        >
          {projectStatuses.map((projectStatus) => (
            <option key={projectStatus}>{projectStatus}</option>
          ))}
        </select>
        <input
          className="h-11 rounded-xl border border-white/10 bg-slate-950/50 px-3 text-sm text-white outline-none transition focus:border-cyan-300/50"
          max="100"
          min="0"
          type="number"
          value={progress}
          onChange={(event) => setProgress(event.target.value)}
        />
        <input
          className="h-11 rounded-xl border border-white/10 bg-slate-950/50 px-3 text-sm text-white outline-none transition focus:border-cyan-300/50"
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
        />
      </div>

      <textarea
        className="mt-3 min-h-20 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
        placeholder="Next action"
        value={nextAction}
        onChange={(event) => setNextAction(event.target.value)}
      />

      <input
        className="mt-3 h-11 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
        placeholder="Links: GitHub|https://github.com/..., README"
        value={linksText}
        onChange={(event) => setLinksText(event.target.value)}
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
          Add project
        </button>
      </div>
    </form>
  )
}
