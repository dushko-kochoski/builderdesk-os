import {
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  Command,
  FolderKanban,
  Link2,
  ListTodo,
  PanelLeft,
  RotateCcw,
  Search,
  Settings,
  Sparkles,
  StickyNote,
  WandSparkles,
} from 'lucide-react'
import type { AppView } from '../types'

const navigation = [
  { label: 'Dashboard', view: 'Dashboard', icon: PanelLeft },
  { label: 'Projects', view: 'Projects', icon: FolderKanban },
  { label: 'Tasks', view: 'Tasks', icon: ListTodo },
  { label: 'Notes', view: 'Notes', icon: StickyNote },
  { label: 'Links', view: 'Links', icon: Link2 },
  { label: 'Calendar', view: 'Calendar', icon: CalendarDays },
  { label: 'Alerts', view: 'Alerts', icon: Bell },
  { label: 'Portfolio', view: 'Portfolio', icon: BriefcaseBusiness },
  { label: 'Prompts', view: 'Prompts', icon: WandSparkles },
] satisfies { label: string; view: AppView; icon: typeof PanelLeft }[]

const prompts = [
  { label: 'What needs attention today?', view: 'Alerts', search: '' },
  { label: 'Show paused projects', view: 'Projects', search: 'paused' },
  { label: 'Prepare portfolio summary', view: 'Portfolio', search: '' },
] satisfies { label: string; view: AppView; search: string }[]

type SidebarProps = {
  activeView: AppView
  onNavigate: (view: AppView) => void
  onPromptSearch: (view: AppView, search: string) => void
  onResetDemoData: () => void
}

export function Sidebar({ activeView, onNavigate, onPromptSearch, onResetDemoData }: SidebarProps) {
  return (
    <aside className="max-h-screen overflow-y-auto border-white/[0.08] bg-[#070c17]/95 px-4 py-5 shadow-[6px_0_24px_rgba(0,0,0,0.16)] backdrop-blur lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:h-screen lg:w-72 lg:flex-col lg:border-r">
      <div className="flex items-center justify-between lg:block">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl border border-cyan-200/20 bg-cyan-300 text-slate-950 shadow-[0_4px_18px_rgba(34,211,238,0.18)]">
            <Command className="size-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/90">BuilderDesk</p>
            <h1 className="text-xl font-semibold text-white">OS</h1>
          </div>
        </div>
        <button
          className="rounded-2xl border border-white/10 p-3 text-slate-300 lg:hidden"
          type="button"
          onClick={() => onNavigate('Dashboard')}
          aria-label="Show dashboard"
        >
          <PanelLeft className="size-5" />
        </button>
      </div>

      <nav className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-1">
        {navigation.map((item) => {
          const Icon = item.icon
          const active = item.view === activeView

          return (
            <button
              className={`relative flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition-all duration-200 ${
                active
                  ? 'bg-cyan-300/[0.06] text-cyan-50 ring-1 ring-cyan-300/15 before:absolute before:left-0 before:top-1/2 before:h-6 before:w-[2px] before:-translate-y-1/2 before:rounded-full before:bg-cyan-300'
                  : 'text-slate-400 hover:bg-white/[0.045] hover:text-white'
              }`}
              key={item.label}
              type="button"
              onClick={() => onNavigate(item.view)}
            >
              <Icon className={`size-4 transition ${active ? 'text-cyan-200 drop-shadow-[0_0_5px_rgba(34,211,238,0.24)]' : ''}`} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="mt-6 rounded-xl border border-white/[0.055] bg-white/[0.02] p-3">
        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-slate-500">Workspace</p>
        <button
          className="mt-2 flex w-full items-center gap-2 rounded-xl border border-rose-300/[0.12] bg-rose-400/[0.025] px-2.5 py-2 text-left text-xs font-semibold text-rose-200/80 transition-all duration-200 hover:border-rose-300/25 hover:bg-rose-400/[0.05] hover:text-rose-100"
          type="button"
          onClick={onResetDemoData}
        >
          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-rose-400/[0.06] text-rose-200">
            <RotateCcw className="size-3.5" />
          </span>
          <span>Reset demo data</span>
        </button>
      </div>

      <div className="mt-6 hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 shadow-[0_4px_18px_rgba(0,0,0,0.14)] lg:block">
        <div className="flex items-start justify-between gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-cyan-300/[0.06] text-cyan-200">
            <Sparkles className="size-5" />
          </div>
          <span className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-2 py-1 text-[0.68rem] font-semibold text-slate-500">
            Ctrl K
          </span>
        </div>
        <p className="mt-4 text-sm font-semibold text-white">Ask BuilderDesk</p>
        <div className="mt-3 space-y-2">
          {prompts.map((prompt) => (
            <button
              className="flex w-full items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-left text-xs font-medium leading-5 text-slate-400 transition hover:border-cyan-300/25 hover:bg-cyan-300/[0.05] hover:text-white"
              key={prompt.label}
              type="button"
              onClick={() => onPromptSearch(prompt.view, prompt.search)}
            >
              <Search className="size-3.5 shrink-0 text-cyan-200" />
              <span>{prompt.label}</span>
            </button>
          ))}
        </div>
      </div>

      <button
        className="mt-3 hidden cursor-not-allowed items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-slate-600 lg:flex"
        type="button"
        disabled
      >
        <Settings className="size-4" />
        Settings
      </button>
    </aside>
  )
}
