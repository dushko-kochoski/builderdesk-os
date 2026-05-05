import { Bell, CalendarDays, Plus, Search } from 'lucide-react'

type HeaderProps = {
  onNewProject: () => void
}

export function Header({ onNewProject }: HeaderProps) {
  return (
    <header className="relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-slate-950/75 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur sm:p-7">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(34,211,238,0.1),rgba(139,92,246,0.07)_42%,transparent_78%)]" />
      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-200/90">Command center</p>
        <div className="mt-2 flex flex-wrap items-end gap-3">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">BuilderDesk OS</h2>
          <span className="mb-1 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-100">
            Live MVP
          </span>
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
          Projects, tasks, notes, links, calendar reminders, prompts, and alerts in one builder workflow.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative min-w-0 flex-1 sm:w-80">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
          <input
            className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] pl-11 pr-20 text-sm text-white outline-none transition placeholder:text-slate-500 hover:border-white/20 focus:border-cyan-300/50 focus:ring-4 focus:ring-cyan-400/10"
            placeholder="Search projects, tasks, prompts..."
            type="search"
          />
          <span className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-lg border border-white/10 bg-slate-950/70 px-2 py-1 text-[0.68rem] font-semibold text-slate-400 sm:inline-flex">
            Ctrl K
          </span>
        </label>
        <div className="flex gap-2">
          <button
            className="flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-300 transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:text-white"
            type="button"
            aria-label="Calendar"
          >
            <CalendarDays className="size-5" />
          </button>
          <button
            className="flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-300 transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:text-white"
            type="button"
            aria-label="Alerts"
          >
            <Bell className="size-5" />
          </button>
          <button
            className="flex h-12 items-center gap-2 rounded-2xl bg-cyan-300 px-4 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:bg-cyan-200"
            type="button"
            onClick={onNewProject}
          >
            <Plus className="size-4" />
            New
          </button>
        </div>
      </div>
      </div>
    </header>
  )
}
