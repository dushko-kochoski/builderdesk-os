import type { AlertItem, Project, Task } from '../types'
import { formatDateLabel, isBeforeToday, isToday, isWithinNextDays } from './dateUtils'

export function buildAlerts(projects: Project[], tasks: Task[]): AlertItem[] {
  const openTasks = tasks.filter((task) => !task.completed)
  const overdueTasks = openTasks.filter((task) => isBeforeToday(task.dueDate))
  const dueTodayTasks = openTasks.filter((task) => isToday(task.dueDate))
  const projectsMissingActions = projects.filter((project) => !project.nextAction?.trim())
  const pausedProjects = projects.filter((project) => project.status === 'Paused')
  const upcomingProjects = projects.filter(
    (project) => project.status !== 'Paused' && isWithinNextDays(project.dueDate, 7),
  )

  const alerts: AlertItem[] = []

  if (overdueTasks.length > 0) {
    alerts.push({
      id: 'overdue-tasks',
      title: `${overdueTasks.length} overdue ${overdueTasks.length === 1 ? 'task' : 'tasks'}`,
      detail: overdueTasks.map((task) => task.title).join(', '),
      tone: 'danger',
    })
  }

  if (dueTodayTasks.length > 0) {
    alerts.push({
      id: 'due-today',
      title: `${dueTodayTasks.length} ${dueTodayTasks.length === 1 ? 'task is' : 'tasks are'} due today`,
      detail: dueTodayTasks.map((task) => `${task.title} (${task.project})`).join(', '),
      tone: 'today',
    })
  }

  if (projectsMissingActions.length > 0) {
    alerts.push({
      id: 'missing-actions',
      title: `${projectsMissingActions.length} missing next ${projectsMissingActions.length === 1 ? 'action' : 'actions'}`,
      detail: projectsMissingActions.map((project) => project.name).join(', '),
      tone: 'warning',
    })
  }

  if (pausedProjects.length > 0) {
    alerts.push({
      id: 'paused-projects',
      title: `${pausedProjects.length} paused ${pausedProjects.length === 1 ? 'project' : 'projects'}`,
      detail: pausedProjects.map((project) => project.name).join(', '),
      tone: 'warning',
    })
  }

  if (upcomingProjects.length > 0) {
    alerts.push({
      id: 'upcoming-deadlines',
      title: `${upcomingProjects.length} upcoming ${upcomingProjects.length === 1 ? 'deadline' : 'deadlines'}`,
      detail: upcomingProjects
        .map((project) => `${project.name} is due ${formatDateLabel(project.dueDate)}`)
        .join(', '),
      tone: 'info',
    })
  }

  return alerts
}
