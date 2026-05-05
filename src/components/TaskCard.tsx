import { CalendarDays, Flag } from 'lucide-react'
import type { Priority, Task } from '../types'

const priorityStyles: Record<Priority, string> = {
  High: 'bg-rose-400/10 text-rose-200 ring-rose-300/20',
  Medium: 'bg-amber-400/10 text-amber-200 ring-amber-300/20',
  Low: 'bg-slate-400/10 text-slate-300 ring-slate-300/20',
}

type TaskCardProps = {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  const urgent = task.dueDate === 'Today' || task.dueDate === 'Overdue'

  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-white/[0.055]">
      <div className="flex items-start gap-3">
        <button
          className="mt-1 size-5 rounded-full border border-slate-500 bg-slate-950/40 transition hover:border-cyan-300 hover:bg-cyan-300/10"
          type="button"
          aria-label={`Mark ${task.title} complete`}
        />
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold leading-6 text-white">{task.title}</h3>
          <p className="mt-1 text-sm font-medium text-slate-300">{task.project}</p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${priorityStyles[task.priority]}`}
            >
              <Flag className="size-3" />
              {task.priority}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${
                urgent
                  ? task.dueDate === 'Overdue'
                    ? 'bg-rose-400/10 text-rose-100 ring-rose-300/20'
                    : 'bg-amber-400/10 text-amber-100 ring-amber-300/20'
                  : 'bg-slate-400/10 text-slate-300 ring-slate-300/20'
              }`}
            >
              <CalendarDays className="size-3" />
              {task.dueDate}
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}
