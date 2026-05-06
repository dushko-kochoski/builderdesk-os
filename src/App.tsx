import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  CalendarClock,
  FolderKanban,
  ListTodo,
  Plus,
  Rocket,
  WandSparkles,
} from 'lucide-react'
import { AlertCard } from './components/AlertCard'
import { CalendarPanel } from './components/CalendarPanel'
import { CalendarPreview } from './components/CalendarPreview'
import { Header } from './components/Header'
import { LinksPanel } from './components/LinksPanel'
import { MetricCard } from './components/MetricCard'
import { NotesPanel } from './components/NotesPanel'
import { Panel } from './components/Panel'
import { PortfolioPanel } from './components/PortfolioPanel'
import { ProjectCard } from './components/ProjectCard'
import { ProjectForm } from './components/ProjectForm'
import { PromptVaultPanel } from './components/PromptVaultPanel'
import { Sidebar } from './components/Sidebar'
import { TaskCard } from './components/TaskCard'
import { TaskForm } from './components/TaskForm'
import {
  calendarEvents as demoCalendarEvents,
  notes as demoNotes,
  prompts as demoPrompts,
  projects as demoProjects,
  savedLinks as demoSavedLinks,
  tasks as demoTasks,
} from './data/mockData'
import { useLocalStorage } from './hooks/useLocalStorage'
import type { Alert, AppView, CalendarEvent, Note, Project, Prompt, QuickCreateTarget, SavedLink, Task } from './types'
import { buildAlerts } from './utils/alertUtils'
import { compareToToday, isBeforeToday, isToday, isWithinNextDays } from './utils/dateUtils'
import {
  normalizeCalendarEvents,
  normalizeNotes,
  normalizePrompts,
  normalizeProjects,
  normalizeSavedLinks,
  normalizeTasks,
} from './utils/normalizeData'

function matchesQuery(parts: Array<string | undefined | null>, query: string) {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return true
  return parts.some((part) => part?.toLowerCase().includes(normalized))
}

function viewForAlert(alert: Alert): AppView {
  if (alert.id.includes('task')) return 'Tasks'
  if (alert.id.includes('reminder') || alert.id.includes('deadline') || alert.id.includes('review')) {
    return 'Calendar'
  }
  if (alert.id.includes('project') || alert.id.includes('action')) return 'Projects'
  return 'Alerts'
}

function App() {
  const [storedProjects, setProjects] = useLocalStorage('builderdesk:projects:v2', demoProjects)
  const [storedTasks, setTasks] = useLocalStorage('builderdesk:tasks:v2', demoTasks)
  const [storedNotes, setNotes] = useLocalStorage('builderdesk:notes:v2', demoNotes)
  const [storedSavedLinks, setSavedLinks] = useLocalStorage('builderdesk:links:v2', demoSavedLinks)
  const [storedPrompts, setPrompts] = useLocalStorage('builderdesk:prompts:v1', demoPrompts)
  const [storedCalendarEvents, setCalendarEvents] = useLocalStorage(
    'builderdesk:calendar-events:v1',
    demoCalendarEvents,
  )
  const [dismissedAlertIds, setDismissedAlertIds] = useLocalStorage('builderdesk:dismissed-alerts:v1', [] as string[])
  const [activeView, setActiveView] = useState<AppView>('Dashboard')
  const [searchQuery, setSearchQuery] = useState('')
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [showNoteForm, setShowNoteForm] = useState(false)
  const [showLinkForm, setShowLinkForm] = useState(false)
  const [showCalendarForm, setShowCalendarForm] = useState(false)
  const [showPromptForm, setShowPromptForm] = useState(false)

  const projects = useMemo(() => normalizeProjects(storedProjects, demoProjects), [storedProjects])
  const tasks = useMemo(() => normalizeTasks(storedTasks, demoTasks), [storedTasks])
  const notes = useMemo(() => normalizeNotes(storedNotes, demoNotes), [storedNotes])
  const savedLinks = useMemo(() => normalizeSavedLinks(storedSavedLinks, demoSavedLinks), [storedSavedLinks])
  const prompts = useMemo(() => normalizePrompts(storedPrompts, demoPrompts), [storedPrompts])
  const calendarEvents = useMemo(
    () => normalizeCalendarEvents(storedCalendarEvents, demoCalendarEvents),
    [storedCalendarEvents],
  )

  const alerts = useMemo(() => buildAlerts(projects, tasks, calendarEvents), [calendarEvents, projects, tasks])
  const visibleAlerts = useMemo(
    () => alerts.filter((alert) => !dismissedAlertIds.includes(alert.id)),
    [alerts, dismissedAlertIds],
  )
  const openTasks = useMemo(() => tasks.filter((task) => !task.completed), [tasks])
  const completedTasks = useMemo(() => tasks.filter((task) => task.completed), [tasks])
  const projectNames = useMemo(() => projects.map((project) => project.name), [projects])
  const openCalendarEvents = useMemo(
    () => calendarEvents.filter((event) => !event.completed),
    [calendarEvents],
  )
  const calendarPreviewEvents = useMemo(
    () =>
      [...openCalendarEvents]
        .filter((event) => compareToToday(event.date) >= 0)
        .sort((a, b) => a.date.localeCompare(b.date) || (a.time ?? '').localeCompare(b.time ?? ''))
        .slice(0, 5),
    [openCalendarEvents],
  )

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) =>
        matchesQuery(
          [
            project.name,
            project.category,
            project.status,
            project.nextAction,
            project.problemSolved,
            project.targetUsers,
            project.whatILearned,
            project.nextImprovement,
            ...(project.keyFeatures ?? []),
            ...(project.techStack ?? []),
            ...project.savedLinks.map((link) => link.label),
          ],
          searchQuery,
        ),
      ),
    [projects, searchQuery],
  )
  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) =>
        matchesQuery([task.title, task.project, task.priority, task.completed ? 'completed' : 'open'], searchQuery),
      ),
    [searchQuery, tasks],
  )
  const filteredNotes = useMemo(
    () => notes.filter((note) => matchesQuery([note.title, note.body, note.tag], searchQuery)),
    [notes, searchQuery],
  )
  const filteredSavedLinks = useMemo(
    () => savedLinks.filter((link) => matchesQuery([link.title, link.project, link.url], searchQuery)),
    [savedLinks, searchQuery],
  )
  const filteredPrompts = useMemo(
    () =>
      prompts.filter((prompt) =>
        matchesQuery(
          [prompt.title, prompt.category, prompt.project, prompt.promptText, prompt.notes],
          searchQuery,
        ),
      ),
    [prompts, searchQuery],
  )
  const filteredCalendarEvents = useMemo(
    () =>
      calendarEvents.filter((event) =>
        matchesQuery([event.title, event.project, event.type, event.priority, event.notes], searchQuery),
      ),
    [calendarEvents, searchQuery],
  )
  const filteredOpenTasks = useMemo(() => filteredTasks.filter((task) => !task.completed), [filteredTasks])
  const filteredCompletedTasks = useMemo(() => filteredTasks.filter((task) => task.completed), [filteredTasks])
  const filteredAlerts = useMemo(
    () => visibleAlerts.filter((alert) => matchesQuery([alert.title, alert.detail, alert.tone], searchQuery)),
    [searchQuery, visibleAlerts],
  )

  const metrics = useMemo(() => {
    const activeProjects = projects.filter((project) => project.status !== 'Paused')
    const pausedProjects = projects.length - activeProjects.length
    const calendarDueTodayCount = openCalendarEvents.filter((event) => isToday(event.date)).length
    const dueTodayCount = openTasks.filter((task) => isToday(task.dueDate)).length + calendarDueTodayCount
    const overdueCount =
      openTasks.filter((task) => isBeforeToday(task.dueDate)).length +
      openCalendarEvents.filter((event) => isBeforeToday(event.date) && event.priority === 'High').length
    const upcomingDeadlineCount =
      projects.filter((project) => project.status !== 'Paused' && isWithinNextDays(project.dueDate, 7)).length +
      openCalendarEvents.filter((event) => event.type === 'Deadline' && isWithinNextDays(event.date, 7)).length
    const favoritePromptCount = prompts.filter((prompt) => prompt.favorite).length
    const alertOverdueCount = visibleAlerts.filter((alert) => alert.tone === 'danger').length

    return [
      {
        label: 'Active projects',
        value: String(activeProjects.length),
        change: pausedProjects === 1 ? '1 paused' : `${pausedProjects} paused`,
        icon: FolderKanban,
      },
      {
        label: 'Open tasks',
        value: String(openTasks.length),
        change: completedTasks.length === 1 ? '1 completed' : `${completedTasks.length} completed`,
        icon: ListTodo,
      },
      {
        label: 'Due today',
        value: String(dueTodayCount),
        change: overdueCount > 0 ? `${overdueCount} overdue` : `${calendarDueTodayCount} reminders today`,
        icon: CalendarClock,
      },
      {
        label: 'Alert load',
        value: String(visibleAlerts.length),
        change:
          alertOverdueCount > 0
            ? `${alertOverdueCount} overdue alerts`
            : visibleAlerts.length > 0
              ? `${visibleAlerts.length} needs review`
              : 'all clear',
        icon: AlertTriangle,
      },
      {
        label: 'Launch runway',
        value: String(upcomingDeadlineCount),
        change: `${upcomingDeadlineCount} deadlines in 7 days`,
        icon: Rocket,
      },
      {
        label: 'Prompts',
        value: String(prompts.length),
        change: favoritePromptCount === 1 ? '1 favorite' : `${favoritePromptCount} favorites`,
        icon: WandSparkles,
      },
    ]
  }, [completedTasks.length, openCalendarEvents, openTasks, projects, prompts, visibleAlerts.length])

  function closeForms() {
    setShowProjectForm(false)
    setShowTaskForm(false)
    setShowNoteForm(false)
    setShowLinkForm(false)
    setShowCalendarForm(false)
    setShowPromptForm(false)
  }

  function navigate(view: AppView) {
    setActiveView(view)
  }

  function resetDemoData() {
    if (window.confirm('Reset BuilderDesk OS demo data? This will replace your local changes.')) {
      setProjects(demoProjects)
      setTasks(demoTasks)
      setNotes(demoNotes)
      setSavedLinks(demoSavedLinks)
      setPrompts(demoPrompts)
      setCalendarEvents(demoCalendarEvents)
      setDismissedAlertIds([])
      closeForms()
      setSearchQuery('')
      setActiveView('Dashboard')
    }
  }

  function addProject(project: Project) {
    setProjects([project, ...projects])
    setShowProjectForm(false)
  }

  function updateProject(updatedProject: Project) {
    setProjects(projects.map((project) => (project.id === updatedProject.id ? updatedProject : project)))
  }

  function deleteProject(projectId: string) {
    setProjects(projects.filter((project) => project.id !== projectId))
  }

  function addTask(task: Task) {
    setTasks([task, ...tasks])
    setShowTaskForm(false)
  }

  function toggleTaskComplete(taskId: string) {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  function deleteTask(taskId: string) {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  function addNote(note: Note) {
    setNotes([note, ...notes])
    setShowNoteForm(false)
  }

  function deleteNote(noteId: string) {
    setNotes(notes.filter((note) => note.id !== noteId))
  }

  function addLink(link: SavedLink) {
    setSavedLinks([link, ...savedLinks])
    setShowLinkForm(false)
  }

  function savePrompt(prompt: Prompt) {
    setPrompts(prompts.some((current) => current.id === prompt.id)
      ? prompts.map((current) => (current.id === prompt.id ? prompt : current))
      : [prompt, ...prompts])
    setShowPromptForm(false)
  }

  function deletePrompt(promptId: string) {
    setPrompts(prompts.filter((prompt) => prompt.id !== promptId))
  }

  function togglePromptFavorite(promptId: string) {
    setPrompts(
      prompts.map((prompt) =>
        prompt.id === promptId
          ? { ...prompt, favorite: !prompt.favorite, updatedAt: new Date().toISOString().slice(0, 10) }
          : prompt,
      ),
    )
  }

  function deleteLink(linkId: string) {
    setSavedLinks(savedLinks.filter((link) => link.id !== linkId))
  }

  function addCalendarEvent(event: CalendarEvent) {
    setCalendarEvents([event, ...calendarEvents])
    setShowCalendarForm(false)
  }

  function toggleCalendarEventComplete(eventId: string) {
    setCalendarEvents(
      calendarEvents.map((event) => (event.id === eventId ? { ...event, completed: !event.completed } : event)),
    )
  }

  function deleteCalendarEvent(eventId: string) {
    setCalendarEvents(calendarEvents.filter((event) => event.id !== eventId))
  }

  function handleQuickCreate(target: QuickCreateTarget) {
    closeForms()

    if (target === 'Project') {
      setActiveView('Projects')
      setShowProjectForm(true)
    } else if (target === 'Task') {
      setActiveView('Tasks')
      setShowTaskForm(true)
    } else if (target === 'Note') {
      setActiveView('Notes')
      setShowNoteForm(true)
    } else if (target === 'Link') {
      setActiveView('Links')
      setShowLinkForm(true)
    } else if (target === 'Reminder') {
      setActiveView('Calendar')
      setShowCalendarForm(true)
    } else {
      setActiveView('Prompts')
      setShowPromptForm(true)
    }
  }

  function handlePromptSearch(view: AppView, query: string) {
    setSearchQuery(query)
    setActiveView(view)
  }

  function handleReviewAlert(alert: Alert) {
    setActiveView(viewForAlert(alert))
  }

  function dismissAlert(alertId: string) {
    setDismissedAlertIds([...new Set([...dismissedAlertIds, alertId])])
  }

  function renderProjectsSection(projectList = filteredProjects) {
    return (
      <Panel
        title="Projects"
        eyebrow="Build pipeline"
        action={
          <button
            className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100 transition hover:border-cyan-300/40 hover:bg-cyan-300/15"
            type="button"
            onClick={() => setShowProjectForm(!showProjectForm)}
          >
            <Plus className="size-3.5" />
            {projects.length} tracked
          </button>
        }
      >
        {showProjectForm ? <ProjectForm onAddProject={addProject} onCancel={() => setShowProjectForm(false)} /> : null}
        {projectList.length === 0 ? (
          <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-6 text-sm leading-6 text-slate-400">
            {searchQuery ? 'No projects match your search.' : 'No projects yet. Add one to start building your local command center.'}
            <button
              className="mt-3 block rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-300/40"
              type="button"
              onClick={() => setShowProjectForm(true)}
            >
              Add project
            </button>
          </div>
        ) : null}
        <div className="grid gap-5 2xl:grid-cols-2">
          {projectList.map((project) => (
            <ProjectCard key={project.id} project={project} onDelete={deleteProject} onUpdate={updateProject} />
          ))}
        </div>
      </Panel>
    )
  }

  function renderTasksSection(openList = filteredOpenTasks, completedList = filteredCompletedTasks) {
    return (
      <Panel
        title="Tasks"
        eyebrow="Execution"
        action={
          <button
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-200 transition hover:border-cyan-300/40 hover:text-white"
            type="button"
            onClick={() => setShowTaskForm(!showTaskForm)}
          >
            <Plus className="size-3.5" />
            {openTasks.length} open
          </button>
        }
      >
        {showTaskForm ? (
          <TaskForm projectNames={projectNames} onAddTask={addTask} onCancel={() => setShowTaskForm(false)} />
        ) : null}
        {openList.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-6 text-slate-400">
            {searchQuery ? 'No open tasks match your search.' : 'No open tasks. Add the next concrete action when you are ready.'}
            <button
              className="mt-3 block rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-300/40"
              type="button"
              onClick={() => setShowTaskForm(true)}
            >
              Add task
            </button>
          </div>
        ) : null}
        <div className="grid gap-4 md:grid-cols-2">
          {openList.map((task) => (
            <TaskCard key={task.id} task={task} onDelete={deleteTask} onToggleComplete={toggleTaskComplete} />
          ))}
        </div>
        {completedList.length > 0 ? (
          <div className="mt-6 border-t border-white/10 pt-5">
            <p className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-slate-500">Completed</p>
            <div className="grid gap-4 md:grid-cols-2">
              {completedList.map((task) => (
                <TaskCard key={task.id} task={task} onDelete={deleteTask} onToggleComplete={toggleTaskComplete} />
              ))}
            </div>
          </div>
        ) : null}
      </Panel>
    )
  }

  function renderAlertsPanel(alertList = filteredAlerts) {
    return (
      <Panel
        title="Alerts"
        eyebrow="Attention"
        className="border-rose-300/20 bg-slate-950/75 shadow-rose-950/20"
        action={
          <span className="rounded-full border border-rose-300/20 bg-rose-400/10 px-3 py-1 text-xs font-semibold text-rose-100">
            {visibleAlerts.length} live
          </span>
        }
      >
        <div className="space-y-3">
          {alertList.length === 0 ? (
            <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm leading-6 text-emerald-100">
              {searchQuery ? 'No alerts match your search.' : 'Nothing needs attention right now.'}
            </div>
          ) : null}
          {alertList.map((alert) => (
            <AlertCard
              alert={alert}
              key={alert.id}
              onDismiss={dismissAlert}
              onReview={handleReviewAlert}
            />
          ))}
        </div>
      </Panel>
    )
  }

  function renderNotesPanel() {
    return (
      <NotesPanel
        notes={filteredNotes}
        showForm={showNoteForm}
        onAddNote={addNote}
        onDeleteNote={deleteNote}
        onShowFormChange={setShowNoteForm}
      />
    )
  }

  function renderLinksPanel() {
    return (
      <LinksPanel
        links={filteredSavedLinks}
        showForm={showLinkForm}
        onAddLink={addLink}
        onDeleteLink={deleteLink}
        onShowFormChange={setShowLinkForm}
      />
    )
  }

  function renderCalendarPanel(events = filteredCalendarEvents) {
    return (
      <CalendarPanel
        events={events}
        projectNames={projectNames}
        showForm={showCalendarForm}
        onAddEvent={addCalendarEvent}
        onDelete={deleteCalendarEvent}
        onShowFormChange={setShowCalendarForm}
        onToggleComplete={toggleCalendarEventComplete}
      />
    )
  }

  function renderPortfolioPanel() {
    return <PortfolioPanel projects={filteredProjects} onUpdateProject={updateProject} />
  }

  function renderPromptVaultPanel() {
    return (
      <PromptVaultPanel
        prompts={filteredPrompts}
        projectNames={projectNames}
        showForm={showPromptForm}
        totalPromptCount={prompts.length}
        onDeletePrompt={deletePrompt}
        onSavePrompt={savePrompt}
        onShowFormChange={setShowPromptForm}
        onToggleFavorite={togglePromptFavorite}
      />
    )
  }

  function renderMainContent() {
    if (activeView === 'Projects') return <div className="space-y-8">{renderProjectsSection()}</div>
    if (activeView === 'Tasks') return <div className="space-y-8">{renderTasksSection()}</div>
    if (activeView === 'Notes') return <div className="space-y-8">{renderNotesPanel()}</div>
    if (activeView === 'Links') return <div className="space-y-8">{renderLinksPanel()}</div>
    if (activeView === 'Calendar') return <div className="space-y-8">{renderCalendarPanel()}</div>
    if (activeView === 'Alerts') return <div className="space-y-8">{renderAlertsPanel()}</div>
    if (activeView === 'Portfolio') return <div className="space-y-8">{renderPortfolioPanel()}</div>
    if (activeView === 'Prompts') return <div className="space-y-8">{renderPromptVaultPanel()}</div>

    return (
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_26rem] 2xl:grid-cols-[minmax(0,1fr)_28rem]">
        <div className="space-y-8">
          {renderProjectsSection(filteredProjects)}
          {renderTasksSection(filteredOpenTasks, filteredCompletedTasks)}
          {renderCalendarPanel(filteredCalendarEvents)}
        </div>
        <aside className="space-y-6 xl:sticky xl:top-8 xl:self-start">
          {renderAlertsPanel(filteredAlerts)}
          {renderNotesPanel()}
          {renderLinksPanel()}
          <CalendarPreview events={calendarPreviewEvents} />
        </aside>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050814] text-slate-200">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.09),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.06),transparent_28%),linear-gradient(135deg,#050814_0%,#080e1a_48%,#050b15_100%)]" />
      <Sidebar
        activeView={activeView}
        onNavigate={navigate}
        onPromptSearch={handlePromptSearch}
        onResetDemoData={resetDemoData}
      />
      <main className="px-4 py-5 sm:px-6 lg:ml-72 lg:px-8 xl:py-8">
        <div className="mx-auto max-w-[92rem] space-y-8">
          <Header
            searchQuery={searchQuery}
            onNavigate={navigate}
            onQuickCreate={handleQuickCreate}
            onSearchChange={setSearchQuery}
          />
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
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
          {searchQuery ? (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm font-medium text-cyan-100">
              <span>Filtering for "{searchQuery}"</span>
              <button
                className="rounded-xl border border-cyan-300/20 bg-slate-950/35 px-3 py-1.5 text-xs font-semibold transition hover:border-cyan-300/40"
                type="button"
                onClick={() => setSearchQuery('')}
              >
                Clear search
              </button>
            </div>
          ) : null}
          {renderMainContent()}
        </div>
      </main>
    </div>
  )
}

export default App
