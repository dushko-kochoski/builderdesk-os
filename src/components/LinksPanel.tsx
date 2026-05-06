import { type FormEvent, useState } from 'react'
import { ExternalLink, Link2 } from 'lucide-react'
import type { SavedLink } from '../types'
import { normalizeExternalUrl } from '../utils/normalizeData'
import { Panel } from './Panel'

type LinksPanelProps = {
  links: SavedLink[]
  showForm: boolean
  onAddLink: (link: SavedLink) => void
  onDeleteLink: (linkId: string) => void
  onShowFormChange: (showForm: boolean) => void
}

export function LinksPanel({ links, showForm, onAddLink, onDeleteLink, onShowFormChange }: LinksPanelProps) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [project, setProject] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!title.trim() || !url.trim()) {
      return
    }

    onAddLink({
      id: `link-${Date.now()}`,
      title: title.trim(),
      url: normalizeExternalUrl(url),
      project: project.trim() || undefined,
      createdAt: new Date().toISOString().slice(0, 10),
    })
    setTitle('')
    setUrl('')
    setProject('')
    onShowFormChange(false)
  }

  return (
    <Panel
      title="Saved links"
      eyebrow="Research"
      action={
        <button
          className="flex size-9 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-cyan-200 transition hover:scale-[1.01] hover:border-cyan-300/35 hover:text-white"
          type="button"
          aria-label="Add saved link"
          onClick={() => onShowFormChange(!showForm)}
        >
          <Link2 className="size-4" />
        </button>
      }
    >
      <div className="space-y-2">
        {showForm ? (
          <form
            className="space-y-3 rounded-2xl border border-white/[0.07] bg-[#0a1120]/80 p-4 shadow-[0_4px_20px_rgba(0,0,0,0.14)]"
            onSubmit={handleSubmit}
          >
            <input
              className="h-10 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
              placeholder="Link title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <input
              className="h-10 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
              placeholder="https://..."
              value={url}
              onChange={(event) => setUrl(event.target.value)}
            />
            <div className="flex gap-2">
              <input
                className="h-10 min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-950/50 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
                placeholder="Project"
                value={project}
                onChange={(event) => setProject(event.target.value)}
              />
              <button
                className="rounded-xl bg-cyan-300 px-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
                type="submit"
              >
                Add
              </button>
            </div>
          </form>
        ) : null}

        {links.length === 0 ? (
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 text-sm leading-6 text-slate-400 shadow-[0_4px_18px_rgba(0,0,0,0.1)]">
            No saved links yet. Add research, docs, launch checklists, or demo references here.
            <button
              className="mt-3 block rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-300/40"
              type="button"
              onClick={() => onShowFormChange(true)}
            >
              Add saved link
            </button>
          </div>
        ) : null}

        {links.map((link) => (
          <div
            className="flex items-center justify-between gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.032] px-4 py-3 text-sm font-medium text-slate-300 shadow-[0_4px_18px_rgba(0,0,0,0.1)] transition hover:-translate-y-0.5 hover:border-cyan-300/25 hover:bg-white/[0.05] hover:text-white"
            key={link.id}
          >
            {link.url ? (
              <a className="min-w-0 flex-1" href={link.url} rel="noreferrer" target="_blank">
                <span className="block truncate">{link.title}</span>
                {link.project ? <span className="mt-1 block text-xs text-slate-500">{link.project}</span> : null}
              </a>
            ) : (
              <div className="min-w-0 flex-1">
                <span className="block truncate text-slate-400">{link.title}</span>
                {link.project ? <span className="mt-1 block text-xs text-slate-500">{link.project}</span> : null}
              </div>
            )}
            <div className="flex items-center gap-2">
              {link.url ? <ExternalLink className="size-4 text-cyan-200" /> : null}
              <button
                className="rounded-lg px-2 py-1 text-xs font-semibold text-slate-500 transition hover:bg-rose-400/10 hover:text-rose-100"
                type="button"
                onClick={() => onDeleteLink(link.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  )
}
