import { type FormEvent, useState } from 'react'
import type { Priority, Task } from '../types'
import { todayISO } from '../utils/dateUtils'

const priorities: Priority[] = ['High', 'Medium', 'Low']

type TaskFormProps = {
  projectNames: string[]
  onAddTask: (task: Task) => void
  onCancel: () => void
}

export function TaskForm({ projectNames, onAddTask, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [project, setProject] = useState(projectNames[0] ?? '')
  const [priority, setPriority] = useState<Priority>('Medium')
  const [dueDate, setDueDate] = useState(todayISO())

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!title.trim()) {
      return
    }

    onAddTask({
      id: `task-${Date.now()}`,
      title: title.trim(),
      project: project.trim() || 'General',
      priority,
      dueDate,
      completed: false,
    })
  }

  return (
    <form className="mb-4 rounded-[1.35rem] border border-cyan-300/20 bg-cyan-300/10 p-4" onSubmit={handleSubmit}>
      <input
        className="h-11 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
        placeholder="Task title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <div className="mt-3 grid gap-3 md:grid-cols-3">
        <input
          className="h-11 rounded-xl border border-white/10 bg-slate-950/50 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
          list="builderdesk-projects"
          placeholder="Project"
          value={project}
          onChange={(event) => setProject(event.target.value)}
        />
        <datalist id="builderdesk-projects">
          {projectNames.map((projectName) => (
            <option key={projectName} value={projectName} />
          ))}
        </datalist>

        <select
          className="h-11 rounded-xl border border-white/10 bg-slate-950/50 px-3 text-sm text-white outline-none transition focus:border-cyan-300/50"
          value={priority}
          onChange={(event) => setPriority(event.target.value as Priority)}
        >
          {priorities.map((taskPriority) => (
            <option key={taskPriority}>{taskPriority}</option>
          ))}
        </select>

        <input
          className="h-11 rounded-xl border border-white/10 bg-slate-950/50 px-3 text-sm text-white outline-none transition focus:border-cyan-300/50"
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
        />
      </div>

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
          Add task
        </button>
      </div>
    </form>
  )
}
