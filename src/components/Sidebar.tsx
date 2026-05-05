import {
  Bell,
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
] satisfies { label: string; view: AppView; icon: typeof PanelLeft }[]

const prompts = [
  { label: 'What needs attention today?', view: 'Alerts', search: '' },
  { label: 'Show paused projects', view: 'Projects', search: 'paused' },
  { label: 'Prepare portfolio summary', view: 'Calendar', search: 'portfolio' },
] satisfies { label: string; view: AppView; search: string }[]

type SidebarProps = {
  activeView: AppView
  onNavigate: (view: AppView) => void
  onPromptSearch: (view: AppView, search: string) => void
  onResetDemoData: () => void
}

export function Sidebar({ activeView, onNavigate, onPromptSearch, onResetDemoData }: SidebarProps) {
  return (
    <aside className="max-h-screen overflow-y-auto border-white/10 bg-slate-950/95 px-4 py-5 backdrop-blur lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:h-screen lg:w-72 lg:flex-col lg:border-r">
      <div className="flex items-center justify-between lg:block">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-cyan-300 text-slate-950 shadow-lg shadow-cyan-500/20">
            <Command className="size-5" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">BuilderDesk</p>
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

      <nav className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1">
        {navigation.map((item) => {
          const Icon = item.icon
          const active = item.view === activeView

          return (
            <button
              className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-medium transition ${
                active
                  ? 'bg-cyan-300/10 text-cyan-100 ring-1 ring-cyan-300/30'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
              key={item.label}
              type="button"
              onClick={() => onNavigate(item.view)}
            >
              <Icon className="size-4" />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="mt-6 rounded-[1.35rem] border border-rose-300/20 bg-rose-950/20 p-4 shadow-lg shadow-rose-950/10">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-slate-500">Workspace</p>
        <button
          className="mt-3 flex w-full items-center gap-3 rounded-2xl border border-rose-300/30 bg-rose-950/35 px-3 py-3 text-left text-sm font-semibold text-rose-100 transition hover:-translate-y-0.5 hover:border-rose-300/50 hover:bg-rose-900/40"
          type="button"
          onClick={onResetDemoData}
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-rose-400/10 text-rose-200 ring-1 ring-rose-300/25">
            <RotateCcw className="size-4" />
          </span>
          <span>Reset demo data</span>
        </button>
      </div>

      <div className="mt-6 hidden rounded-[1.35rem] border border-cyan-300/20 bg-gradient-to-b from-cyan-300/10 to-white/[0.03] p-4 shadow-xl shadow-cyan-950/20 lg:block">
        <div className="flex items-start justify-between gap-3">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-cyan-300/15 text-cyan-200">
            <Sparkles className="size-5" />
          </div>
          <span className="rounded-lg border border-white/10 bg-slate-950/60 px-2 py-1 text-[0.68rem] font-semibold text-slate-400">
            Ctrl K
          </span>
        </div>
        <p className="mt-4 text-sm font-semibold text-white">Ask BuilderDesk</p>
        <div className="mt-3 space-y-2">
          {prompts.map((prompt) => (
            <button
              className="flex w-full items-center gap-2 rounded-xl border border-white/10 bg-slate-950/35 px-3 py-2 text-left text-xs font-medium leading-5 text-slate-300 transition hover:border-cyan-300/35 hover:bg-cyan-300/10 hover:text-white"
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
