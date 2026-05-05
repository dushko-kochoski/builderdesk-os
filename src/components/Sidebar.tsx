import {
  Bell,
  CalendarDays,
  Command,
  FolderKanban,
  Link2,
  ListTodo,
  PanelLeft,
  Search,
  Settings,
  Sparkles,
  StickyNote,
} from 'lucide-react'

const navigation = [
  { label: 'Dashboard', icon: PanelLeft, active: true },
  { label: 'Projects', icon: FolderKanban },
  { label: 'Tasks', icon: ListTodo },
  { label: 'Notes', icon: StickyNote },
  { label: 'Links', icon: Link2 },
  { label: 'Calendar', icon: CalendarDays },
  { label: 'Alerts', icon: Bell },
]

export function Sidebar() {
  return (
    <aside className="border-white/10 bg-slate-950/95 px-4 py-5 backdrop-blur lg:fixed lg:inset-y-0 lg:left-0 lg:w-72 lg:border-r">
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
        <button className="rounded-2xl border border-white/10 p-3 text-slate-300 lg:hidden" type="button">
          <PanelLeft className="size-5" />
        </button>
      </div>

      <nav className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1">
        {navigation.map((item) => {
          const Icon = item.icon

          return (
            <a
              className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${
                item.active
                  ? 'bg-cyan-300/10 text-cyan-100 ring-1 ring-cyan-300/30'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
              href="#"
              key={item.label}
            >
              <Icon className="size-4" />
              <span>{item.label}</span>
            </a>
          )
        })}
      </nav>

      <div className="mt-8 hidden rounded-[1.35rem] border border-cyan-300/20 bg-gradient-to-b from-cyan-300/10 to-white/[0.03] p-4 shadow-xl shadow-cyan-950/20 lg:block">
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
          {[
            'What needs attention today?',
            'Show paused projects',
            'Prepare portfolio summary',
          ].map((prompt) => (
            <button
              className="flex w-full items-center gap-2 rounded-xl border border-white/10 bg-slate-950/35 px-3 py-2 text-left text-xs font-medium leading-5 text-slate-300 transition hover:border-cyan-300/35 hover:bg-cyan-300/10 hover:text-white"
              key={prompt}
              type="button"
            >
              <Search className="size-3.5 shrink-0 text-cyan-200" />
              <span>{prompt}</span>
            </button>
          ))}
        </div>
      </div>

      <a
        className="mt-6 hidden items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white lg:flex"
        href="#"
      >
        <Settings className="size-4" />
        Settings
      </a>
    </aside>
  )
}
