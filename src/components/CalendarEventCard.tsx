import { CalendarCheck2, Check, Clock3, RotateCcw, Trash2 } from 'lucide-react'
import type { CalendarEvent, CalendarEventType, Priority } from '../types'
import { formatDateLabel, isBeforeToday, isToday } from '../utils/dateUtils'

const typeStyles: Record<CalendarEventType, string> = {
  Deadline: 'border-rose-300/25 bg-rose-400/10 text-rose-100',
  Reminder: 'border-cyan-300/25 bg-cyan-400/10 text-cyan-100',
  Milestone: 'border-violet-300/25 bg-violet-400/10 text-violet-100',
  'Follow-up': 'border-amber-300/25 bg-amber-400/10 text-amber-100',
  Review: 'border-emerald-300/25 bg-emerald-400/10 text-emerald-100',
}

const priorityStyles: Record<Priority, string> = {
  High: 'bg-rose-400/10 text-rose-100 ring-rose-300/20',
  Medium: 'bg-amber-400/10 text-amber-100 ring-amber-300/20',
  Low: 'bg-slate-400/10 text-slate-300 ring-slate-300/20',
}

type CalendarEventCardProps = {
  event: CalendarEvent
  onToggleComplete: (eventId: string) => void
  onDelete: (eventId: string) => void
}

export function CalendarEventCard({ event, onToggleComplete, onDelete }: CalendarEventCardProps) {
  const overdue = !event.completed && isBeforeToday(event.date)
  const dueToday = !event.completed && isToday(event.date)
  const CompleteIcon = event.completed ? RotateCcw : Check

  return (
    <article
      className={`rounded-2xl border p-4 shadow-[0_4px_18px_rgba(0,0,0,0.12)] transition duration-200 hover:-translate-y-0.5 hover:bg-white/[0.05] ${
        event.completed
          ? 'border-white/[0.07] bg-slate-900/30 opacity-75'
          : overdue
            ? 'border-rose-300/25 bg-rose-950/[0.12]'
            : dueToday
              ? 'border-amber-300/25 bg-amber-950/[0.1]'
              : 'border-white/[0.07] bg-white/[0.032]'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl bg-white/[0.035] text-cyan-200 ring-1 ring-white/[0.07]">
          <CalendarCheck2 className="size-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className={`text-sm font-semibold leading-6 ${event.completed ? 'text-slate-400 line-through' : 'text-white'}`}>
                {event.title}
              </h3>
              {event.project ? <p className="mt-1 text-sm font-medium text-slate-300">{event.project}</p> : null}
            </div>
            <div className="flex shrink-0 gap-1">
              <button
                className="rounded-lg p-1.5 text-slate-500 transition hover:bg-cyan-400/10 hover:text-cyan-100"
                type="button"
                aria-label={event.completed ? `Reopen ${event.title}` : `Complete ${event.title}`}
                onClick={() => onToggleComplete(event.id)}
              >
                <CompleteIcon className="size-4" />
              </button>
              <button
                className="rounded-lg p-1.5 text-slate-500 transition hover:bg-rose-400/10 hover:text-rose-100"
                type="button"
                aria-label={`Delete ${event.title}`}
                onClick={() => onDelete(event.id)}
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${typeStyles[event.type]}`}>
              {event.type}
            </span>
            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${priorityStyles[event.priority]}`}>
              {event.priority}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${
                overdue
                  ? 'bg-rose-400/10 text-rose-100 ring-rose-300/20'
                  : dueToday
                    ? 'bg-amber-400/10 text-amber-100 ring-amber-300/20'
                    : 'bg-slate-400/10 text-slate-300 ring-slate-300/20'
              }`}
            >
              <Clock3 className="size-3" />
              {formatDateLabel(event.date)}
              {event.time ? ` at ${event.time}` : ''}
            </span>
          </div>

          {event.notes ? <p className="mt-3 text-sm leading-6 text-slate-300">{event.notes}</p> : null}
        </div>
      </div>
    </article>
  )
}
