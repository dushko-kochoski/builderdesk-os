import type { LucideIcon } from 'lucide-react'

type MetricCardProps = {
  label: string
  value: string
  change: string
  icon: LucideIcon
}

export function MetricCard({ label, value, change, icon: Icon }: MetricCardProps) {
  const urgent = label === 'Due today' || label === 'Alert load'

  return (
    <article
      className={`rounded-[1.25rem] border border-white/[0.07] bg-[#090f1d]/80 p-4 shadow-[0_4px_22px_rgba(0,0,0,0.18)] backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-300/25 hover:bg-[#0b1222] ${
        urgent ? 'border-t-amber-300/35' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-300/95">{label}</p>
          <p className="mt-2 bg-gradient-to-br from-white via-cyan-100 to-slate-400 bg-clip-text text-3xl font-semibold tracking-tight text-transparent">
            {value}
          </p>
        </div>
        <div className="flex size-9 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.035] text-cyan-200">
          <Icon className="size-[18px]" />
        </div>
      </div>
      <div className="mt-4 border-t border-white/[0.06] pt-3">
        <span className="inline-flex rounded-full border border-white/[0.07] bg-white/[0.025] px-2.5 py-1 text-xs font-semibold text-slate-300">
          {change}
        </span>
      </div>
    </article>
  )
}
