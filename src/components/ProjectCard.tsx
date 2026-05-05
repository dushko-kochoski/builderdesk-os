import { type FormEvent, useState } from 'react'
import { ArrowUpRight, Link2, Pencil, Save, Trash2, X } from 'lucide-react'
import type { Project, ProjectStatus } from '../types'
import { formatDateLabel } from '../utils/dateUtils'

const statusStyles: Record<ProjectStatus, string> = {
  Building: 'border-cyan-300/30 bg-cyan-300/10 text-cyan-100',
  Planning: 'border-blue-300/30 bg-blue-300/10 text-blue-100',
  Shipping: 'border-emerald-300/30 bg-emerald-300/10 text-emerald-100',
  Paused: 'border-amber-300/30 bg-amber-300/10 text-amber-100',
}

const statusDots: Record<ProjectStatus, string> = {
  Building: 'bg-cyan-300 shadow-cyan-300/40',
  Planning: 'bg-blue-300 shadow-blue-300/40',
  Shipping: 'bg-emerald-300 shadow-emerald-300/40',
  Paused: 'bg-amber-300 shadow-amber-300/40',
}

const progressStyles: Record<ProjectStatus, string> = {
  Building: 'from-blue-500 to-cyan-300',
  Planning: 'from-sky-500 to-blue-300',
  Shipping: 'from-emerald-500 to-violet-300',
  Paused: 'from-amber-500 to-slate-400',
}

type ProjectCardProps = {
  project: Project
  onUpdate: (project: Project) => void
  onDelete: (projectId: string) => void
}

const projectStatuses: ProjectStatus[] = ['Building', 'Planning', 'Shipping', 'Paused']

function linksToText(project: Project) {
  return project.savedLinks.map((link) => link.title).join(', ')
}

function linksFromText(value: string, projectId: string) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((title, index) => ({
      id: `${projectId}-link-${index + 1}-${Date.now()}`,
      title,
      url: '#',
    }))
}

export function ProjectCard({ project, onUpdate, onDelete }: ProjectCardProps) {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(project.name)
  const [category, setCategory] = useState(project.category)
  const [status, setStatus] = useState<ProjectStatus>(project.status)
  const [progress, setProgress] = useState(String(project.progress))
  const [nextAction, setNextAction] = useState(project.nextAction ?? '')
  const [dueDate, setDueDate] = useState(project.dueDate)
  const [linksText, setLinksText] = useState(linksToText(project))

  function resetForm() {
    setName(project.name)
    setCategory(project.category)
    setStatus(project.status)
    setProgress(String(project.progress))
    setNextAction(project.nextAction ?? '')
    setDueDate(project.dueDate)
    setLinksText(linksToText(project))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    onUpdate({
      ...project,
      name: name.trim() || project.name,
      category: category.trim() || project.category,
      status,
      progress: Math.min(100, Math.max(0, Number(progress) || 0)),
      nextAction: nextAction.trim() || null,
      dueDate,
      savedLinks: linksFromText(linksText, project.id),
    })
    setEditing(false)
  }

  if (editing) {
    return (
      <article className="rounded-[1.35rem] border border-cyan-300/25 bg-white/[0.055] p-5 shadow-2xl shadow-cyan-950/20 sm:p-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Name
              <input
                className="h-11 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 text-sm normal-case tracking-normal text-white outline-none transition focus:border-cyan-300/50"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
            <label className="space-y-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Category
              <input
                className="h-11 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 text-sm normal-case tracking-normal text-white outline-none transition focus:border-cyan-300/50"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              />
            </label>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <label className="space-y-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Status
              <select
                className="h-11 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 text-sm normal-case tracking-normal text-white outline-none transition focus:border-cyan-300/50"
                value={status}
                onChange={(event) => setStatus(event.target.value as ProjectStatus)}
              >
                {projectStatuses.map((projectStatus) => (
                  <option key={projectStatus}>{projectStatus}</option>
                ))}
              </select>
            </label>
            <label className="space-y-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Progress
              <input
                className="h-11 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 text-sm normal-case tracking-normal text-white outline-none transition focus:border-cyan-300/50"
                max="100"
                min="0"
                type="number"
                value={progress}
                onChange={(event) => setProgress(event.target.value)}
              />
            </label>
            <label className="space-y-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Due
              <input
                className="h-11 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 text-sm normal-case tracking-normal text-white outline-none transition focus:border-cyan-300/50"
                type="date"
                value={dueDate}
                onChange={(event) => setDueDate(event.target.value)}
              />
            </label>
          </div>

          <label className="block space-y-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            Next action
            <textarea
              className="min-h-20 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-3 text-sm normal-case leading-6 tracking-normal text-white outline-none transition focus:border-cyan-300/50"
              value={nextAction}
              onChange={(event) => setNextAction(event.target.value)}
            />
          </label>

          <label className="block space-y-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            Links
            <input
              className="h-11 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 text-sm normal-case tracking-normal text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
              placeholder="Pricing model, Launch checklist"
              value={linksText}
              onChange={(event) => setLinksText(event.target.value)}
            />
          </label>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <button
              className="inline-flex items-center gap-2 rounded-xl border border-rose-300/20 bg-rose-400/10 px-3 py-2 text-sm font-semibold text-rose-100 transition hover:border-rose-300/45 hover:bg-rose-400/15"
              type="button"
              onClick={() => onDelete(project.id)}
            >
              <Trash2 className="size-4" />
              Delete
            </button>
            <div className="flex gap-2">
              <button
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-semibold text-slate-300 transition hover:border-cyan-300/40 hover:text-white"
                type="button"
                onClick={() => {
                  resetForm()
                  setEditing(false)
                }}
              >
                <X className="size-4" />
                Cancel
              </button>
              <button
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
                type="submit"
              >
                <Save className="size-4" />
                Save
              </button>
            </div>
          </div>
        </form>
      </article>
    )
  }

  return (
    <article className="group rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-5 transition duration-200 hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-white/[0.055] hover:shadow-2xl hover:shadow-cyan-950/20 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-300">{project.category}</p>
          <h3 className="mt-1 text-2xl font-semibold tracking-tight text-white">{project.name}</h3>
        </div>
        <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${statusStyles[project.status]}`}>
          <span className={`size-2 rounded-full shadow-[0_0_12px] ${statusDots[project.status]}`} />
          {project.status}
        </span>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-slate-300">Progress</span>
          <span className="rounded-full border border-white/10 bg-slate-950/50 px-2.5 py-1 text-xs font-bold text-cyan-100">
            {project.progress}%
          </span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-slate-800 ring-1 ring-white/10">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${progressStyles[project.status]}`}
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-cyan-300/15 bg-slate-950/55 p-4 shadow-inner shadow-cyan-950/20 transition group-hover:border-cyan-300/25">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-cyan-200/80">Next action</p>
        <p className={`mt-2 text-sm font-medium leading-6 ${project.nextAction ? 'text-slate-100' : 'text-amber-100'}`}>
          {project.nextAction ?? 'Needs a clear owner and next action'}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-slate-300">
          Due <span className="font-semibold text-slate-100">{formatDateLabel(project.dueDate)}</span>
        </p>
        <div className="flex items-center gap-2 text-sm font-medium text-cyan-100">
          <Link2 className="size-4" />
          <span>{project.savedLinks.length} links</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.savedLinks.map((link) => (
          <a
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-white"
            href={link.url}
            key={link.id}
          >
            {link.title}
            <ArrowUpRight className="size-3" />
          </a>
        ))}
      </div>

      <div className="mt-5 flex justify-end gap-2 border-t border-white/10 pt-4">
        <button
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-white"
          type="button"
          onClick={() => setEditing(true)}
        >
          <Pencil className="size-3.5" />
          Edit
        </button>
        <button
          className="inline-flex items-center gap-2 rounded-xl border border-rose-300/20 bg-rose-400/10 px-3 py-2 text-xs font-semibold text-rose-100 transition hover:border-rose-300/45 hover:bg-rose-400/15"
          type="button"
          onClick={() => onDelete(project.id)}
        >
          <Trash2 className="size-3.5" />
          Delete
        </button>
      </div>
    </article>
  )
}
