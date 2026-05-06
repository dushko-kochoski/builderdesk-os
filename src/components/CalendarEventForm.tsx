import { type FormEvent, useState } from 'react'
import type { CalendarEvent, CalendarEventType, Priority } from '../types'
import { addDaysISO, todayISO } from '../utils/dateUtils'

const eventTypes: CalendarEventType[] = ['Deadline', 'Reminder', 'Milestone', 'Follow-up', 'Review']
const priorities: Priority[] = ['High', 'Medium', 'Low']

type CalendarEventFormProps = {
  projectNames: string[]
  onAddEvent: (event: CalendarEvent) => void
  onCancel: () => void
}

export function CalendarEventForm({ projectNames, onAddEvent, onCancel }: CalendarEventFormProps) {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState(addDaysISO(1))
  const [time, setTime] = useState('')
  const [type, setType] = useState<CalendarEventType>('Reminder')
  const [project, setProject] = useState(projectNames[0] ?? '')
  const [priority, setPriority] = useState<Priority>('Medium')
  const [notes, setNotes] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!title.trim()) {
      return
    }

    onAddEvent({
      id: `calendar-${Date.now()}`,
      title: title.trim(),
      date,
      time: time || undefined,
      type,
      project: project.trim() || undefined,
      priority,
      notes: notes.trim() || undefined,
      completed: false,
      createdAt: todayISO(),
    })
  }

  return (
    <form
      className="mb-5 rounded-[1.35rem] border border-white/[0.07] bg-[#0a1120]/80 p-4 shadow-[0_4px_20px_rgba(0,0,0,0.14)] sm:p-5"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-3 md:grid-cols-2">
        <input
          className="h-11 rounded-xl border border-white/10 bg-slate-950/50 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
          placeholder="Reminder or event title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          className="h-11 rounded-xl border border-white/10 bg-slate-950/50 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
          list="calendar-projects"
          placeholder="Project"
          value={project}
          onChange={(event) => setProject(event.target.value)}
        />
        <datalist id="calendar-projects">
          {projectNames.map((projectName) => (
            <option key={projectName} value={projectName} />
          ))}
        </datalist>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-4">
        <input
          className="h-11 rounded-xl border border-white/10 bg-slate-950/50 px-3 text-sm text-white outline-none transition focus:border-cyan-300/50"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <input
          className="h-11 rounded-xl border border-white/10 bg-slate-950/50 px-3 text-sm text-white outline-none transition focus:border-cyan-300/50"
          type="time"
          value={time}
          onChange={(event) => setTime(event.target.value)}
        />
        <select
          className="h-11 rounded-xl border border-white/10 bg-slate-950/50 px-3 text-sm text-white outline-none transition focus:border-cyan-300/50"
          value={type}
          onChange={(event) => setType(event.target.value as CalendarEventType)}
        >
          {eventTypes.map((eventType) => (
            <option key={eventType}>{eventType}</option>
          ))}
        </select>
        <select
          className="h-11 rounded-xl border border-white/10 bg-slate-950/50 px-3 text-sm text-white outline-none transition focus:border-cyan-300/50"
          value={priority}
          onChange={(event) => setPriority(event.target.value as Priority)}
        >
          {priorities.map((eventPriority) => (
            <option key={eventPriority}>{eventPriority}</option>
          ))}
        </select>
      </div>

      <textarea
        className="mt-3 min-h-20 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
        placeholder="Notes"
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
      />

      <div className="mt-4 flex justify-end gap-2">
        <button
          className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-cyan-300/40 hover:text-white"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="rounded-xl bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
          type="submit"
        >
          Add reminder
        </button>
      </div>
    </form>
  )
}
