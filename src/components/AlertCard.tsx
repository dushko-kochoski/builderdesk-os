import { AlertCircle, CheckCircle2, Info, TriangleAlert } from 'lucide-react'
import type { Alert, AlertTone } from '../types'

const toneStyles: Record<AlertTone, string> = {
  danger: 'border-rose-300/25 bg-rose-400/10 text-rose-100 hover:border-rose-300/40',
  today: 'border-yellow-300/25 bg-yellow-300/10 text-yellow-100 hover:border-yellow-300/40',
  warning: 'border-amber-300/25 bg-amber-400/10 text-amber-100 hover:border-amber-300/40',
  info: 'border-cyan-300/25 bg-cyan-400/10 text-cyan-100 hover:border-cyan-300/40',
  success: 'border-emerald-300/25 bg-emerald-400/10 text-emerald-100 hover:border-emerald-300/40',
}

const iconStyles: Record<AlertTone, string> = {
  danger: 'bg-rose-300/15 text-rose-100 ring-rose-300/25',
  today: 'bg-yellow-300/15 text-yellow-100 ring-yellow-300/25',
  warning: 'bg-amber-300/15 text-amber-100 ring-amber-300/25',
  info: 'bg-cyan-300/15 text-cyan-100 ring-cyan-300/25',
  success: 'bg-emerald-300/15 text-emerald-100 ring-emerald-300/25',
}

const actionStyles: Record<AlertTone, string> = {
  danger: 'hover:border-rose-300/45 hover:bg-rose-300/10 hover:text-white',
  today: 'hover:border-yellow-300/45 hover:bg-yellow-300/10 hover:text-white',
  warning: 'hover:border-amber-300/45 hover:bg-amber-300/10 hover:text-white',
  info: 'hover:border-cyan-300/45 hover:bg-cyan-300/10 hover:text-white',
  success: 'hover:border-emerald-300/45 hover:bg-emerald-300/10 hover:text-white',
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
}

export function AlertCard({ alert }: AlertCardProps) {
  const Icon = toneIcons[alert.tone]

  return (
    <article className={`rounded-2xl border p-4 transition duration-200 hover:-translate-y-0.5 ${toneStyles[alert.tone]}`}>
      <div className="flex gap-3">
        <div className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl ring-1 ${iconStyles[alert.tone]}`}>
          <Icon className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-white">{alert.title}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-300">{alert.detail}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {['Review', 'Mark read', 'Open'].map((action) => (
              <button
                className={`rounded-full border border-white/10 bg-slate-950/35 px-3 py-1.5 text-xs font-semibold text-slate-300 transition ${actionStyles[alert.tone]}`}
                key={action}
                type="button"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
