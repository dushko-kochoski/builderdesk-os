import { CalendarDays, Check, Flag, Trash2 } from 'lucide-react'
import type { Priority, Task } from '../types'
import { formatDateLabel, isBeforeToday, isToday } from '../utils/dateUtils'

const priorityStyles: Record<Priority, string> = {
  High: 'bg-rose-400/10 text-rose-200 ring-rose-300/20',
  Medium: 'bg-amber-400/10 text-amber-200 ring-amber-300/20',
  Low: 'bg-slate-400/10 text-slate-300 ring-slate-300/20',
}

type TaskCardProps = {
  task: Task
  onToggleComplete: (taskId: string) => void
  onDelete: (taskId: string) => void
}

export function TaskCard({ task, onToggleComplete, onDelete }: TaskCardProps) {
  const overdue = !task.completed && isBeforeToday(task.dueDate)
  const dueToday = !task.completed && isToday(task.dueDate)
  const urgent = overdue || dueToday

  return (
    <article
      className={`rounded-2xl border border-white/[0.07] p-4 shadow-[0_4px_18px_rgba(0,0,0,0.12)] transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300/25 hover:bg-white/[0.05] ${
        task.completed ? 'bg-slate-900/30 opacity-75' : 'bg-white/[0.032]'
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          className={`mt-1 flex size-5 items-center justify-center rounded-full border transition ${
            task.completed
              ? 'border-emerald-300/40 bg-emerald-300/15 text-emerald-100'
              : 'border-slate-500 bg-slate-950/40 text-transparent hover:border-cyan-300 hover:bg-cyan-300/10'
          }`}
          type="button"
          aria-label={task.completed ? `Mark ${task.title} open` : `Mark ${task.title} complete`}
          onClick={() => onToggleComplete(task.id)}
        >
          <Check className="size-3.5" />
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className={`text-sm font-semibold leading-6 ${task.completed ? 'text-slate-400 line-through' : 'text-white'}`}>
              {task.title}
            </h3>
            <button
              className="rounded-lg p-1.5 text-slate-500 transition hover:bg-rose-400/10 hover:text-rose-100"
              type="button"
              aria-label={`Delete ${task.title}`}
              onClick={() => onDelete(task.id)}
            >
              <Trash2 className="size-4" />
            </button>
          </div>
          <p className="mt-1 text-sm font-medium text-slate-400">{task.project}</p>
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
                  ? overdue
                    ? 'bg-rose-400/10 text-rose-100 ring-rose-300/20'
                    : 'bg-amber-400/10 text-amber-100 ring-amber-300/20'
                  : 'bg-slate-400/10 text-slate-300 ring-slate-300/20'
              }`}
            >
              <CalendarDays className="size-3" />
              {formatDateLabel(task.dueDate)}
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}
