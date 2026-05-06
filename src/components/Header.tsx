import { useEffect, useRef, useState } from 'react'
import { Bell, CalendarDays, Plus, Search } from 'lucide-react'
import type { AppView, QuickCreateTarget } from '../types'

type HeaderProps = {
  searchQuery: string
  onSearchChange: (query: string) => void
  onNavigate: (view: AppView) => void
  onQuickCreate: (target: QuickCreateTarget) => void
}

const quickCreateTargets: QuickCreateTarget[] = ['Project', 'Task', 'Note', 'Link', 'Reminder', 'Prompt']

export function Header({ searchQuery, onSearchChange, onNavigate, onQuickCreate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        searchRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <header className="relative overflow-visible rounded-[1.35rem] border border-white/[0.07] bg-[#090f1d]/80 p-5 shadow-[0_4px_28px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:p-7">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />
      <div className="absolute inset-0 -z-10 rounded-[1.35rem] bg-[linear-gradient(135deg,rgba(34,211,238,0.07),rgba(139,92,246,0.04)_42%,transparent_78%)]" />
      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-slate-400">Command center</p>
          <div className="mt-2 flex flex-wrap items-end gap-3">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">BuilderDesk OS</h2>
            <span className="mb-1 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/[0.06] px-3 py-1 text-xs font-semibold text-emerald-100">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-20" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-300/80" />
              </span>
              Live MVP
            </span>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
            Projects, tasks, notes, links, calendar reminders, prompts, and alerts in one builder workflow.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative min-w-0 flex-1 sm:w-80 lg:w-[29rem] xl:w-[30rem]">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
            <input
              className="h-12 w-full rounded-2xl border border-white/[0.07] bg-white/[0.03] pl-11 pr-20 text-sm text-white outline-none transition-all duration-200 placeholder:text-slate-500 hover:border-white/15 focus:border-cyan-300/45 focus:ring-4 focus:ring-cyan-400/10"
              placeholder="Search projects, tasks, notes..."
              ref={searchRef}
              type="search"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
            />
            <button
              className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-lg border border-white/[0.07] bg-white/[0.03] px-2 py-1 text-[0.68rem] font-semibold text-slate-400 transition hover:border-cyan-300/35 hover:text-white sm:inline-flex"
              type="button"
              onClick={() => searchRef.current?.focus()}
            >
              Ctrl K
            </button>
          </label>
          <div className="flex gap-2">
            <button
              className="flex size-12 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.01] hover:border-cyan-300/30 hover:text-white"
              type="button"
              aria-label="Open calendar"
              onClick={() => onNavigate('Calendar')}
            >
              <CalendarDays className="size-5" />
            </button>
            <button
              className="flex size-12 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.01] hover:border-cyan-300/30 hover:text-white"
              type="button"
              aria-label="Open alerts"
              onClick={() => onNavigate('Alerts')}
            >
              <Bell className="size-5" />
            </button>
            <div className="relative">
              <button
                className="flex h-12 items-center gap-2 rounded-xl bg-cyan-300 px-4 text-sm font-semibold text-slate-950 shadow-[0_4px_18px_rgba(34,211,238,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.01] hover:bg-cyan-200"
                type="button"
                onClick={() => setMenuOpen((current) => !current)}
              >
                <Plus className="size-4" />
                New
              </button>
              {menuOpen ? (
                <div className="absolute right-0 z-20 mt-2 w-52 rounded-2xl border border-white/[0.08] bg-[#090f1d]/95 p-2 shadow-[0_12px_36px_rgba(0,0,0,0.36)] backdrop-blur">
                  {quickCreateTargets.map((target) => (
                    <button
                      className="flex w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-slate-300 transition hover:bg-cyan-300/[0.06] hover:text-white"
                      key={target}
                      type="button"
                      onClick={() => {
                        onQuickCreate(target)
                        setMenuOpen(false)
                      }}
                    >
                      New {target}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
