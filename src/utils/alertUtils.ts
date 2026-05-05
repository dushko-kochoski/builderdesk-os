import type { AlertItem, CalendarEvent, Project, Task } from '../types'
import { formatDateLabel, isBeforeToday, isToday, isWithinNextDays } from './dateUtils'

export function buildAlerts(projects: Project[], tasks: Task[], calendarEvents: CalendarEvent[] = []): AlertItem[] {
  const openTasks = tasks.filter((task) => !task.completed)
  const openEvents = calendarEvents.filter((event) => !event.completed)
  const overdueTasks = openTasks.filter((task) => isBeforeToday(task.dueDate))
  const dueTodayTasks = openTasks.filter((task) => isToday(task.dueDate))
  const overdueEvents = openEvents.filter((event) => isBeforeToday(event.date))
  const highPriorityDueTodayEvents = openEvents.filter(
    (event) => event.priority === 'High' && isToday(event.date),
  )
  const projectsMissingActions = projects.filter((project) => !project.nextAction?.trim())
  const pausedProjects = projects.filter((project) => project.status === 'Paused')
  const upcomingProjects = projects.filter(
    (project) => project.status !== 'Paused' && isWithinNextDays(project.dueDate, 7),
  )
  const upcomingDeadlines = openEvents.filter(
    (event) => event.type === 'Deadline' && isWithinNextDays(event.date, 7),
  )
  const projectReviews = openEvents.filter(
    (event) => event.type === 'Review' && isWithinNextDays(event.date, 7),
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

  if (overdueEvents.length > 0) {
    alerts.push({
      id: 'overdue-reminders',
      title: `${overdueEvents.length} overdue ${overdueEvents.length === 1 ? 'reminder' : 'reminders'}`,
      detail: overdueEvents.map((event) => `${event.title} (${event.project ?? event.type})`).join(', '),
      tone: 'danger',
    })
  }

  if (highPriorityDueTodayEvents.length > 0) {
    alerts.push({
      id: 'high-priority-reminders-today',
      title: `${highPriorityDueTodayEvents.length} high-priority ${highPriorityDueTodayEvents.length === 1 ? 'reminder' : 'reminders'} due today`,
      detail: highPriorityDueTodayEvents.map((event) => event.title).join(', '),
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

  if (upcomingProjects.length > 0 || upcomingDeadlines.length > 0) {
    alerts.push({
      id: 'upcoming-deadlines',
      title: `${upcomingProjects.length + upcomingDeadlines.length} upcoming ${
        upcomingProjects.length + upcomingDeadlines.length === 1 ? 'deadline' : 'deadlines'
      }`,
      detail: [
        ...upcomingProjects.map((project) => `${project.name} is due ${formatDateLabel(project.dueDate)}`),
        ...upcomingDeadlines.map((event) => `${event.title} is due ${formatDateLabel(event.date)}`),
      ]
        .join(', '),
      tone: 'info',
    })
  }

  if (projectReviews.length > 0) {
    alerts.push({
      id: 'project-reviews',
      title: `${projectReviews.length} project ${projectReviews.length === 1 ? 'review' : 'reviews'} coming up`,
      detail: projectReviews
        .map((event) => `${event.title} ${event.project ? `for ${event.project}` : ''}`.trim())
        .join(', '),
      tone: 'success',
    })
  }

  return alerts
}
