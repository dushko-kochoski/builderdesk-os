const dayMs = 24 * 60 * 60 * 1000

function startOfLocalDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function toISODate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function todayISO() {
  return toISODate(new Date())
}

export function addDaysISO(days: number, from = new Date()) {
  const date = startOfLocalDay(from)
  date.setDate(date.getDate() + days)
  return toISODate(date)
}

export function parseLocalDate(value: string) {
  const normalized = value.trim()

  if (!normalized) {
    return null
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
    const [year, month, day] = normalized.split('-').map(Number)
    return new Date(year, month - 1, day)
  }

  const lowered = normalized.toLowerCase()
  if (lowered === 'today') return startOfLocalDay(new Date())
  if (lowered === 'tomorrow') {
    const date = startOfLocalDay(new Date())
    date.setDate(date.getDate() + 1)
    return date
  }
  if (lowered === 'overdue' || lowered === 'yesterday') {
    const date = startOfLocalDay(new Date())
    date.setDate(date.getDate() - 1)
    return date
  }

  const withYear = /^\D+\s+\d{1,2}$/.test(normalized)
    ? `${normalized}, ${new Date().getFullYear()}`
    : normalized
  const parsed = new Date(withYear)

  if (Number.isNaN(parsed.getTime())) {
    return null
  }

  return startOfLocalDay(parsed)
}

export function normalizeDateInput(value: string, fallbackDays = 7) {
  const parsed = parseLocalDate(value)
  return parsed ? toISODate(parsed) : addDaysISO(fallbackDays)
}

export function compareToToday(isoDate: string) {
  const date = parseLocalDate(isoDate)
  if (!date) return 0

  const diff = startOfLocalDay(date).getTime() - startOfLocalDay(new Date()).getTime()
  return Math.round(diff / dayMs)
}

export function isToday(isoDate: string) {
  return compareToToday(isoDate) === 0
}

export function isBeforeToday(isoDate: string) {
  return compareToToday(isoDate) < 0
}

export function isWithinNextDays(isoDate: string, days: number) {
  const diff = compareToToday(isoDate)
  return diff >= 0 && diff <= days
}

export function formatDateLabel(isoDate: string) {
  const date = parseLocalDate(isoDate)
  if (!date) return isoDate

  const diff = compareToToday(isoDate)
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Tomorrow'
  if (diff === -1) return 'Yesterday'
  if (diff < 0) return 'Overdue'

  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
  }).format(date)
}

export function formatCreatedDate(isoDate: string) {
  const date = parseLocalDate(isoDate)
  if (!date) return isoDate

  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
  }).format(date)
}
