import { type FormEvent, useState } from 'react'
import { StickyNote } from 'lucide-react'
import type { Note } from '../types'
import { formatCreatedDate, todayISO } from '../utils/dateUtils'
import { Panel } from './Panel'

type NotesPanelProps = {
  notes: Note[]
  showForm: boolean
  onAddNote: (note: Note) => void
  onDeleteNote: (noteId: string) => void
  onShowFormChange: (showForm: boolean) => void
}

export function NotesPanel({ notes, showForm, onAddNote, onDeleteNote, onShowFormChange }: NotesPanelProps) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [tag, setTag] = useState('Note')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!title.trim() && !body.trim()) {
      return
    }

    onAddNote({
      id: `note-${Date.now()}`,
      title: title.trim() || 'Untitled note',
      body: body.trim(),
      tag: tag.trim() || 'Note',
      createdAt: todayISO(),
    })
    setTitle('')
    setBody('')
    setTag('Note')
    onShowFormChange(false)
  }

  return (
    <Panel
      title="Notes inbox"
      eyebrow="Capture"
      action={
        <button
          className="flex size-9 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-slate-300 transition hover:scale-[1.01] hover:border-cyan-300/35 hover:text-white"
          type="button"
          aria-label="Add note"
          onClick={() => onShowFormChange(!showForm)}
        >
          <StickyNote className="size-4" />
        </button>
      }
    >
      <div className="space-y-3">
        {showForm ? (
          <form
            className="space-y-3 rounded-2xl border border-white/[0.07] bg-[#0a1120]/80 p-4 shadow-[0_4px_20px_rgba(0,0,0,0.14)]"
            onSubmit={handleSubmit}
          >
            <input
              className="h-10 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
              placeholder="Note title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <textarea
              className="min-h-20 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
              placeholder="Capture the thought..."
              value={body}
              onChange={(event) => setBody(event.target.value)}
            />
            <div className="flex gap-2">
              <input
                className="h-10 min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-950/50 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
                placeholder="Tag"
                value={tag}
                onChange={(event) => setTag(event.target.value)}
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

        {notes.length === 0 ? (
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 text-sm leading-6 text-slate-400 shadow-[0_4px_18px_rgba(0,0,0,0.1)]">
            No notes yet. Capture quick ideas, launch thoughts, or rough prompt patterns here.
            <button
              className="mt-3 block rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-300/40"
              type="button"
              onClick={() => onShowFormChange(true)}
            >
              Add note
            </button>
          </div>
        ) : null}

        {notes.map((note) => (
          <article
            className="rounded-2xl border border-white/[0.07] bg-white/[0.032] p-4 shadow-[0_4px_18px_rgba(0,0,0,0.1)] transition hover:-translate-y-0.5 hover:border-cyan-300/25 hover:bg-white/[0.05]"
            key={note.id}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-white">{note.title}</h3>
                <p className="mt-1 text-xs font-medium text-slate-400">{formatCreatedDate(note.createdAt)}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-cyan-300/10 px-2.5 py-1 text-xs font-semibold text-cyan-200">
                  {note.tag}
                </span>
                <button
                  className="rounded-lg px-2 py-1 text-xs font-semibold text-slate-500 transition hover:bg-rose-400/10 hover:text-rose-100"
                  type="button"
                  onClick={() => onDeleteNote(note.id)}
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-300">{note.body}</p>
          </article>
        ))}
      </div>
    </Panel>
  )
}
