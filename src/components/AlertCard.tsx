import { AlertCircle, CheckCircle2, Info, TriangleAlert } from 'lucide-react'
import type { Alert, AlertTone } from '../types'

const toneStyles: Record<AlertTone, string> = {
  danger: 'border-l-rose-400/70 bg-rose-400/[0.035] hover:border-l-rose-300/80',
  today: 'border-l-amber-300/70 bg-amber-300/[0.035] hover:border-l-amber-200/80',
  warning: 'border-l-amber-400/70 bg-amber-400/[0.035] hover:border-l-amber-300/80',
  info: 'border-l-cyan-300/70 bg-cyan-400/[0.035] hover:border-l-cyan-200/80',
  success: 'border-l-emerald-300/70 bg-emerald-400/[0.035] hover:border-l-emerald-200/80',
}

const iconStyles: Record<AlertTone, string> = {
  danger: 'text-rose-200',
  today: 'text-amber-200',
  warning: 'text-amber-200',
  info: 'text-cyan-200',
  success: 'text-emerald-200',
}

const toneIcons: Record<AlertTone, typeof AlertCircle> = {
  danger: AlertCircle,
  today: AlertCircle,
  warning: TriangleAlert,
  info: Info,
  success: CheckCircle2,
}

type AlertCardProps = {
  alert: Alert
  onDismiss: (alertId: string) => void
  onReview: (alert: Alert) => void
}

export function AlertCard({ alert, onDismiss, onReview }: AlertCardProps) {
  const Icon = toneIcons[alert.tone]

  return (
    <article
      className={`rounded-2xl border border-white/[0.07] border-l-2 p-4 shadow-[0_4px_18px_rgba(0,0,0,0.16)] transition duration-200 hover:-translate-y-0.5 hover:border-white/[0.1] hover:bg-white/[0.04] ${toneStyles[alert.tone]}`}
    >
      <div className="flex gap-3">
        <div className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.035] ${iconStyles[alert.tone]}`}>
          <Icon className="size-4" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-slate-50">{alert.title}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-300/95">{alert.detail}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:scale-[1.01] hover:border-cyan-300/35 hover:bg-cyan-300/10 hover:text-white"
              type="button"
              onClick={() => onReview(alert)}
            >
              Review
            </button>
            <button
              className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:scale-[1.01] hover:border-cyan-300/35 hover:bg-cyan-300/10 hover:text-white"
              type="button"
              onClick={() => onReview(alert)}
            >
              Open
            </button>
            <button
              className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:scale-[1.01] hover:border-emerald-300/35 hover:bg-emerald-300/10 hover:text-white"
              type="button"
              onClick={() => onDismiss(alert.id)}
            >
              Mark read
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
