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
      className={`rounded-[1.35rem] border border-white/[0.07] bg-[#090f1d]/80 p-5 shadow-[0_4px_24px_rgba(0,0,0,0.2)] backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300/25 hover:bg-[#0b1222] ${
        urgent ? 'border-t-amber-300/35' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-300/95">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-50">{value}</p>
        </div>
        <div className="flex size-10 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.035] text-cyan-200">
          <Icon className="size-[18px]" />
        </div>
      </div>
      <p className="mt-5 border-t border-white/[0.06] pt-3 text-sm font-medium text-slate-300">{change}</p>
    </article>
  )
}
