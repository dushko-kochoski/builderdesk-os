import { type FormEvent, useState } from 'react'
import { ExternalLink, Link2 } from 'lucide-react'
import type { SavedLink } from '../types'
import { Panel } from './Panel'

type LinksPanelProps = {
  links: SavedLink[]
  onAddLink: (link: SavedLink) => void
  onDeleteLink: (linkId: string) => void
}

export function LinksPanel({ links, onAddLink, onDeleteLink }: LinksPanelProps) {
  const [showForm, setShowForm] = useState(false)
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
      url: url.trim(),
      project: project.trim() || undefined,
    })
    setTitle('')
    setUrl('')
    setProject('')
    setShowForm(false)
  }

  return (
    <Panel
      title="Saved links"
      eyebrow="Research"
      action={
        <button
          className="flex size-9 items-center justify-center rounded-xl border border-white/10 text-cyan-200 transition hover:border-cyan-300/40 hover:text-white"
          type="button"
          aria-label="Add saved link"
          onClick={() => setShowForm((current) => !current)}
        >
          <Link2 className="size-4" />
        </button>
      }
    >
      <div className="space-y-2">
        {showForm ? (
          <form className="space-y-3 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4" onSubmit={handleSubmit}>
            <input
              className="h-10 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
              placeholder="Link title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <input
              className="h-10 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
              placeholder="https://..."
              type="url"
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
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-slate-400">
            No saved links yet. Add research, docs, launch checklists, or demo references here.
          </div>
        ) : null}

        {links.map((link) => (
          <div
            className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-medium text-slate-300 transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-white/[0.055] hover:text-white"
            key={link.id}
          >
            <a className="min-w-0 flex-1" href={link.url}>
              <span className="block truncate">{link.title}</span>
              {link.project ? <span className="mt-1 block text-xs text-slate-500">{link.project}</span> : null}
            </a>
            <div className="flex items-center gap-2">
              <ExternalLink className="size-4 text-cyan-200" />
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
