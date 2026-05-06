import { CalendarDays, Clock3 } from 'lucide-react'
import type { CalendarEvent } from '../types'
import { formatDateLabel } from '../utils/dateUtils'
import { Panel } from './Panel'

type CalendarPreviewProps = {
  events: CalendarEvent[]
}

export function CalendarPreview({ events }: CalendarPreviewProps) {
  return (
    <Panel
      title="Calendar preview"
      eyebrow="Reminders"
      action={
        <div className="flex size-9 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-cyan-200">
          <CalendarDays className="size-4" />
        </div>
      }
    >
      <div className="space-y-3">
        {events.length === 0 ? (
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 text-sm leading-6 text-slate-400 shadow-[0_4px_18px_rgba(0,0,0,0.1)]">
            No upcoming reminders.
          </div>
        ) : null}

        {events.map((event) => (
          <article
            className="rounded-2xl border border-white/[0.07] bg-white/[0.032] p-4 shadow-[0_4px_18px_rgba(0,0,0,0.1)] transition hover:-translate-y-0.5 hover:border-cyan-300/25 hover:bg-white/[0.05]"
            key={event.id}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-white">{event.title}</p>
                <p className="mt-1 text-sm font-medium text-slate-300">
                  {event.project ?? event.type}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-cyan-100">{formatDateLabel(event.date)}</p>
                {event.time ? (
                  <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-slate-300">
                    <Clock3 className="size-3" />
                    {event.time}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-xs font-semibold text-slate-300">
                {event.type}
              </span>
              <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2.5 py-1 text-xs font-semibold text-cyan-100">
                {event.priority}
              </span>
            </div>
          </article>
        ))}
      </div>
    </Panel>
  )
}
