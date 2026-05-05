import { describe, expect, it } from 'vitest'
import { addDaysISO, compareToToday, isBeforeToday, isToday, isWithinNextDays, normalizeDateInput } from './dateUtils'

describe('dateUtils', () => {
  it('detects today', () => {
    expect(isToday(addDaysISO(0))).toBe(true)
    expect(compareToToday(addDaysISO(0))).toBe(0)
  })

  it('detects overdue dates', () => {
    expect(isBeforeToday(addDaysISO(-1))).toBe(true)
    expect(isBeforeToday(addDaysISO(1))).toBe(false)
  })

  it('detects dates within the upcoming window', () => {
    expect(isWithinNextDays(addDaysISO(3), 7)).toBe(true)
    expect(isWithinNextDays(addDaysISO(8), 7)).toBe(false)
    expect(isWithinNextDays(addDaysISO(-1), 7)).toBe(false)
  })

  it('handles invalid and missing dates safely', () => {
    expect(compareToToday('not-a-date')).toBe(0)
    expect(normalizeDateInput('', 2)).toBe(addDaysISO(2))
    expect(normalizeDateInput('not-a-date', 4)).toBe(addDaysISO(4))
  })
})
