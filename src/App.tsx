import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  CalendarClock,
  FolderKanban,
  Link2,
  ListTodo,
  Plus,
  Rocket,
} from 'lucide-react'
import { AlertCard } from './components/AlertCard'
import { CalendarPreview } from './components/CalendarPreview'
import { Header } from './components/Header'
import { LinksPanel } from './components/LinksPanel'
import { MetricCard } from './components/MetricCard'
import { NotesPanel } from './components/NotesPanel'
import { Panel } from './components/Panel'
import { ProjectCard } from './components/ProjectCard'
import { ProjectForm } from './components/ProjectForm'
import { Sidebar } from './components/Sidebar'
import { TaskCard } from './components/TaskCard'
import { TaskForm } from './components/TaskForm'
import {
  calendarEvents,
  notes as demoNotes,
  projects as demoProjects,
  savedLinks as demoSavedLinks,
  tasks as demoTasks,
} from './data/mockData'
import { useLocalStorage } from './hooks/useLocalStorage'
import type { Project, SavedLink, Task } from './types'
import { buildAlerts } from './utils/alertUtils'
import { isBeforeToday, isToday, isWithinNextDays } from './utils/dateUtils'

function App() {
  const [projects, setProjects] = useLocalStorage('builderdesk:projects:v2', demoProjects)
  const [tasks, setTasks] = useLocalStorage('builderdesk:tasks:v2', demoTasks)
  const [notes, setNotes] = useLocalStorage('builderdesk:notes:v2', demoNotes)
  const [savedLinks, setSavedLinks] = useLocalStorage('builderdesk:links:v2', demoSavedLinks)
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showTaskForm, setShowTaskForm] = useState(false)

  const alerts = useMemo(() => buildAlerts(projects, tasks), [projects, tasks])
  const openTasks = useMemo(() => tasks.filter((task) => !task.completed), [tasks])
  const completedTasks = useMemo(() => tasks.filter((task) => task.completed), [tasks])
  const projectNames = useMemo(() => projects.map((project) => project.name), [projects])

  const metrics = useMemo(() => {
    const activeProjects = projects.filter((project) => project.status !== 'Paused')
    const pausedProjects = projects.length - activeProjects.length
    const dueTodayCount = openTasks.filter((task) => isToday(task.dueDate)).length
    const overdueCount = openTasks.filter((task) => isBeforeToday(task.dueDate)).length
    const upcomingDeadlineCount = projects.filter(
      (project) => project.status !== 'Paused' && isWithinNextDays(project.dueDate, 7),
    ).length

    return [
      {
        label: 'Active projects',
        value: String(activeProjects.length),
        change: `${pausedProjects} paused`,
        icon: FolderKanban,
      },
      {
        label: 'Open tasks',
        value: String(openTasks.length),
        change: `${completedTasks.length} completed`,
        icon: ListTodo,
      },
      {
        label: 'Due today',
        value: String(dueTodayCount),
        change: overdueCount > 0 ? `${overdueCount} overdue` : 'no overdue tasks',
        icon: CalendarClock,
      },
      {
        label: 'Alert load',
        value: String(alerts.length),
        change: alerts.length > 0 ? 'needs review' : 'all clear',
        icon: AlertTriangle,
      },
      {
        label: 'Launch runway',
        value: String(upcomingDeadlineCount),
        change: 'deadlines in 7 days',
        icon: Rocket,
      },
      {
        label: 'Saved links',
        value: String(savedLinks.length),
        change: 'research references',
        icon: Link2,
      },
    ]
  }, [alerts.length, completedTasks.length, openTasks, projects, savedLinks.length])

  function resetDemoData() {
    if (window.confirm('Reset BuilderDesk OS demo data? This will replace your local changes.')) {
      setProjects(demoProjects)
      setTasks(demoTasks)
      setNotes(demoNotes)
      setSavedLinks(demoSavedLinks)
      setShowProjectForm(false)
      setShowTaskForm(false)
    }
  }

  function addProject(project: Project) {
    setProjects((current) => [project, ...current])
    setShowProjectForm(false)
  }

  function updateProject(updatedProject: Project) {
    setProjects((current) =>
      current.map((project) => (project.id === updatedProject.id ? updatedProject : project)),
    )
  }

  function deleteProject(projectId: string) {
    setProjects((current) => current.filter((project) => project.id !== projectId))
  }

  function addTask(task: Task) {
    setTasks((current) => [task, ...current])
    setShowTaskForm(false)
  }

  function toggleTaskComplete(taskId: string) {
    setTasks((current) =>
      current.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)),
    )
  }

  function deleteTask(taskId: string) {
    setTasks((current) => current.filter((task) => task.id !== taskId))
  }

  function addLink(link: SavedLink) {
    setSavedLinks((current) => [link, ...current])
  }

  return (
    <div className="min-h-screen bg-[#050814] text-slate-200">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.1),transparent_30%),linear-gradient(135deg,#050814_0%,#0b1224_48%,#06111f_100%)]" />
      <Sidebar onResetDemoData={resetDemoData} />

      <main className="px-4 py-5 sm:px-6 lg:ml-72 lg:px-8 xl:py-8">
        <div className="mx-auto max-w-[92rem] space-y-8">
          <Header onNewProject={() => setShowProjectForm(true)} />

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
                  <button
                    className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100 transition hover:border-cyan-300/40 hover:bg-cyan-300/15"
                    type="button"
                    onClick={() => setShowProjectForm((current) => !current)}
                  >
                    <Plus className="size-3.5" />
                    {projects.length} tracked
                  </button>
                }
              >
                {showProjectForm ? (
                  <ProjectForm onAddProject={addProject} onCancel={() => setShowProjectForm(false)} />
                ) : null}

                {projects.length === 0 ? (
                  <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-6 text-sm leading-6 text-slate-400">
                    No projects yet. Add one to start building your local command center.
                  </div>
                ) : null}

                <div className="grid gap-5 2xl:grid-cols-2">
                  {projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onDelete={deleteProject}
                      onUpdate={updateProject}
                    />
                  ))}
                </div>
              </Panel>

              <Panel
                title="Tasks"
                eyebrow="Execution"
                action={
                  <button
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-200 transition hover:border-cyan-300/40 hover:text-white"
                    type="button"
                    onClick={() => setShowTaskForm((current) => !current)}
                  >
                    <Plus className="size-3.5" />
                    {openTasks.length} open
                  </button>
                }
              >
                {showTaskForm ? (
                  <TaskForm
                    projectNames={projectNames}
                    onAddTask={addTask}
                    onCancel={() => setShowTaskForm(false)}
                  />
                ) : null}

                {openTasks.length === 0 ? (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-6 text-slate-400">
                    No open tasks. Add the next concrete action when you are ready.
                  </div>
                ) : null}

                <div className="grid gap-4 md:grid-cols-2">
                  {openTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onDelete={deleteTask}
                      onToggleComplete={toggleTaskComplete}
                    />
                  ))}
                </div>

                {completedTasks.length > 0 ? (
                  <div className="mt-6 border-t border-white/10 pt-5">
                    <p className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-slate-500">
                      Completed
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                      {completedTasks.map((task) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          onDelete={deleteTask}
                          onToggleComplete={toggleTaskComplete}
                        />
                      ))}
                    </div>
                  </div>
                ) : null}
              </Panel>
            </div>

            <aside className="space-y-6 xl:sticky xl:top-8 xl:self-start">
              <Panel
                title="Alerts"
                eyebrow="Attention"
                className="border-rose-300/20 bg-slate-950/75 shadow-rose-950/20"
                action={
                  <span className="rounded-full border border-rose-300/20 bg-rose-400/10 px-3 py-1 text-xs font-semibold text-rose-100">
                    {alerts.length} live
                  </span>
                }
              >
                <div className="space-y-3">
                  {alerts.length === 0 ? (
                    <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm leading-6 text-emerald-100">
                      Nothing needs attention right now.
                    </div>
                  ) : null}

                  {alerts.map((alert) => (
                    <AlertCard alert={alert} key={alert.id} />
                  ))}
                </div>
              </Panel>

              <NotesPanel
                notes={notes}
                onAddNote={(note) => setNotes((current) => [note, ...current])}
                onDeleteNote={(noteId) => setNotes((current) => current.filter((note) => note.id !== noteId))}
              />
              <LinksPanel
                links={savedLinks}
                onAddLink={addLink}
                onDeleteLink={(linkId) =>
                  setSavedLinks((current) => current.filter((link) => link.id !== linkId))
                }
              />
              <CalendarPreview events={calendarEvents} />
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
