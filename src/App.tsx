import { AlertCard } from './components/AlertCard'
import { CalendarPreview } from './components/CalendarPreview'
import { Header } from './components/Header'
import { LinksPanel } from './components/LinksPanel'
import { MetricCard } from './components/MetricCard'
import { NotesPanel } from './components/NotesPanel'
import { Panel } from './components/Panel'
import { ProjectCard } from './components/ProjectCard'
import { Sidebar } from './components/Sidebar'
import { TaskCard } from './components/TaskCard'
import {
  alerts,
  calendarEvents,
  metrics,
  notes,
  projects,
  savedLinks,
  tasks,
} from './data/mockData'

function App() {
  return (
    <div className="min-h-screen bg-[#050814] text-slate-200">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.1),transparent_30%),linear-gradient(135deg,#050814_0%,#0b1224_48%,#06111f_100%)]" />
      <Sidebar />

      <main className="px-4 py-5 sm:px-6 lg:ml-72 lg:px-8 xl:py-8">
        <div className="mx-auto max-w-[92rem] space-y-8">
          <Header />

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
            {metrics.map((metric) => (
              <MetricCard
                change={metric.change}
                icon={metric.icon}
                key={metric.label}
                label={metric.label}
                value={metric.value}
              />
            ))}
          </section>

          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_26rem] 2xl:grid-cols-[minmax(0,1fr)_28rem]">
            <div className="space-y-8">
              <Panel
                title="Projects"
                eyebrow="Build pipeline"
                action={
                  <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                    {projects.length} tracked
                  </span>
                }
              >
                <div className="grid gap-5 2xl:grid-cols-2">
                  {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </Panel>

              <Panel
                title="Tasks"
                eyebrow="Execution"
                action={
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-200">
                    {tasks.length} open
                  </span>
                }
              >
                <div className="grid gap-4 md:grid-cols-2">
                  {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </Panel>
            </div>

            <aside className="space-y-6 xl:sticky xl:top-8 xl:self-start">
              <Panel
                title="Alerts"
                eyebrow="Attention"
                className="border-rose-300/20 bg-slate-950/75 shadow-rose-950/20"
                action={
                  <span className="rounded-full border border-rose-300/20 bg-rose-400/10 px-3 py-1 text-xs font-semibold text-rose-100">
                    2 urgent
                  </span>
                }
              >
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <AlertCard alert={alert} key={alert.id} />
                  ))}
                </div>
              </Panel>

              <NotesPanel notes={notes} />
              <LinksPanel links={savedLinks} />
              <CalendarPreview events={calendarEvents} />
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
