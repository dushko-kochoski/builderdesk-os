import { useMemo } from 'react'
import { CalendarPlus, Plus } from 'lucide-react'
import type { CalendarEvent } from '../types'
import { compareToToday } from '../utils/dateUtils'
import { CalendarEventCard } from './CalendarEventCard'
import { CalendarEventForm } from './CalendarEventForm'
import { Panel } from './Panel'

type CalendarPanelProps = {
  events: CalendarEvent[]
  projectNames: string[]
  showForm: boolean
  onAddEvent: (event: CalendarEvent) => void
  onToggleComplete: (eventId: string) => void
  onDelete: (eventId: string) => void
  onShowFormChange: (showForm: boolean) => void
}

function sortEvents(events: CalendarEvent[]) {
  return [...events].sort((a, b) => a.date.localeCompare(b.date) || (a.time ?? '').localeCompare(b.time ?? ''))
}

function EmptyGroup({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-slate-400">
      No {label.toLowerCase()} reminders.
    </div>
  )
}

export function CalendarPanel({
  events,
  projectNames,
  showForm,
  onAddEvent,
  onToggleComplete,
  onDelete,
  onShowFormChange,
}: CalendarPanelProps) {
  const groupedEvents = useMemo(() => {
    const open = sortEvents(events.filter((event) => !event.completed))

    return {
      today: open.filter((event) => compareToToday(event.date) === 0),
      tomorrow: open.filter((event) => compareToToday(event.date) === 1),
      thisWeek: open.filter((event) => {
        const diff = compareToToday(event.date)
        return diff >= 2 && diff <= 7
      }),
      later: open.filter((event) => compareToToday(event.date) > 7 || compareToToday(event.date) < 0),
      completed: sortEvents(events.filter((event) => event.completed)),
    }
  }, [events])

  const groups = [
    { label: 'Today', events: groupedEvents.today },
    { label: 'Tomorrow', events: groupedEvents.tomorrow },
    { label: 'This week', events: groupedEvents.thisWeek },
    { label: 'Later', events: groupedEvents.later },
  ]

  return (
    <Panel
      title="Calendar"
      eyebrow="Reminders"
      action={
        <button
          className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100 transition hover:border-cyan-300/40 hover:bg-cyan-300/15"
          type="button"
          onClick={() => onShowFormChange(!showForm)}
        >
          <Plus className="size-3.5" />
          {events.filter((event) => !event.completed).length} open
        </button>
      }
    >
      {showForm ? (
        <CalendarEventForm
          projectNames={projectNames}
          onAddEvent={(event) => {
            onAddEvent(event)
            onShowFormChange(false)
          }}
          onCancel={() => onShowFormChange(false)}
        />
      ) : null}

      {events.length === 0 ? (
        <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-6 text-sm leading-6 text-slate-400">
          No reminders yet. Add deadlines, follow-ups, milestones, or reviews to give the week a spine.
          <button
            className="mt-3 block rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-300/40"
            type="button"
            onClick={() => onShowFormChange(true)}
          >
            Add reminder
          </button>
        </div>
      ) : null}

      <div className="space-y-6">
        {groups.map((group) => (
          <section key={group.label}>
            <div className="mb-3 flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-xl bg-white/[0.04] text-cyan-200 ring-1 ring-white/10">
                <CalendarPlus className="size-4" />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">{group.label}</h3>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {group.events.length > 0 ? (
                group.events.map((event) => (
                  <CalendarEventCard
                    event={event}
                    key={event.id}
                    onDelete={onDelete}
                    onToggleComplete={onToggleComplete}
                  />
                ))
              ) : (
                <EmptyGroup label={group.label} />
              )}
            </div>
          </section>
        ))}

        {groupedEvents.completed.length > 0 ? (
          <section className="border-t border-white/10 pt-5">
            <div className="mb-3 flex items-center gap-3">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Completed</h3>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {groupedEvents.completed.map((event) => (
                <CalendarEventCard
                  event={event}
                  key={event.id}
                  onDelete={onDelete}
                  onToggleComplete={onToggleComplete}
                />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </Panel>
  )
}
