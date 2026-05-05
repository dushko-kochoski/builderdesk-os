import { StickyNote } from 'lucide-react'
import type { Note } from '../types'
import { Panel } from './Panel'

type NotesPanelProps = {
  notes: Note[]
}

export function NotesPanel({ notes }: NotesPanelProps) {
  return (
    <Panel
      title="Notes inbox"
      eyebrow="Capture"
      action={
        <button
          className="flex size-9 items-center justify-center rounded-xl border border-white/10 text-slate-300 transition hover:border-cyan-300/40 hover:text-white"
          type="button"
          aria-label="Add note"
        >
          <StickyNote className="size-4" />
        </button>
      }
    >
      <div className="space-y-3">
        {notes.map((note) => (
          <article className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-cyan-300/25 hover:bg-white/[0.055]" key={note.id}>
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-sm font-semibold text-white">{note.title}</h3>
              <span className="rounded-full bg-cyan-300/10 px-2.5 py-1 text-xs font-semibold text-cyan-200">
                {note.tag}
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-300">{note.body}</p>
          </article>
        ))}
      </div>
    </Panel>
  )
}
