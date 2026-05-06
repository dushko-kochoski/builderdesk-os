import { Clipboard, Pencil, Star, Trash2 } from 'lucide-react'
import type { Prompt } from '../types'

type PromptCardProps = {
  prompt: Prompt
  copied: boolean
  onCopy: (prompt: Prompt) => void
  onDelete: (promptId: string) => void
  onEdit: (prompt: Prompt) => void
  onToggleFavorite: (promptId: string) => void
}

export function PromptCard({ prompt, copied, onCopy, onDelete, onEdit, onToggleFavorite }: PromptCardProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-white/[0.055]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2.5 py-1 text-xs font-semibold text-cyan-100">
              {prompt.category}
            </span>
            {prompt.project ? (
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-semibold text-slate-300">
                {prompt.project}
              </span>
            ) : null}
          </div>
          <h3 className="mt-3 text-lg font-semibold tracking-tight text-white">{prompt.title}</h3>
        </div>
        <button
          className={`rounded-xl p-2 transition ${
            prompt.favorite
              ? 'bg-amber-300/10 text-amber-100 ring-1 ring-amber-300/25'
              : 'text-slate-500 hover:bg-amber-300/10 hover:text-amber-100'
          }`}
          type="button"
          aria-label={prompt.favorite ? `Unfavorite ${prompt.title}` : `Favorite ${prompt.title}`}
          onClick={() => onToggleFavorite(prompt.id)}
        >
          <Star className="size-4" />
        </button>
      </div>

      <p className="mt-3 line-clamp-4 whitespace-pre-wrap text-sm leading-6 text-slate-300">{prompt.promptText}</p>
      {prompt.notes ? <p className="mt-3 text-sm leading-6 text-slate-500">{prompt.notes}</p> : null}

      <div className="mt-4 flex flex-wrap justify-end gap-2 border-t border-white/10 pt-4">
        <button
          className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-xs font-semibold text-cyan-100 transition hover:border-cyan-300/40"
          type="button"
          onClick={() => onCopy(prompt)}
        >
          <Clipboard className="size-3.5" />
          {copied ? 'Copied' : 'Copy'}
        </button>
        <button
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-cyan-300/40 hover:text-white"
          type="button"
          onClick={() => onEdit(prompt)}
        >
          <Pencil className="size-3.5" />
          Edit
        </button>
        <button
          className="inline-flex items-center gap-2 rounded-xl border border-rose-300/20 bg-rose-400/10 px-3 py-2 text-xs font-semibold text-rose-100 transition hover:border-rose-300/45"
          type="button"
          onClick={() => onDelete(prompt.id)}
        >
          <Trash2 className="size-3.5" />
          Delete
        </button>
      </div>
    </article>
  )
}
