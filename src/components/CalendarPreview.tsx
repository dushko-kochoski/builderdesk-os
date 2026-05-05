import { CalendarDays, Clock3 } from 'lucide-react'
import type { CalendarEvent } from '../types'
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
        <div className="flex size-9 items-center justify-center rounded-xl border border-white/10 text-cyan-200">
          <CalendarDays className="size-4" />
        </div>
      }
    >
      <div className="space-y-3">
        {events.map((event) => (
          <article className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-cyan-300/25 hover:bg-white/[0.055]" key={event.id}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-white">{event.title}</p>
                <p className="mt-1 text-sm font-medium text-slate-300">{event.project}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-cyan-100">{event.date}</p>
                <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-slate-300">
                  <Clock3 className="size-3" />
                  {event.time}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Panel>
  )
}
