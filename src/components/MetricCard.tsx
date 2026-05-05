import type { LucideIcon } from 'lucide-react'

type MetricCardProps = {
  label: string
  value: string
  change: string
  icon: LucideIcon
}

export function MetricCard({ label, value, change, icon: Icon }: MetricCardProps) {
  return (
    <article className="rounded-[1.35rem] border border-white/10 bg-slate-950/60 p-5 shadow-xl shadow-slate-950/20 backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-slate-950/75">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-300">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-white">{value}</p>
        </div>
        <div className="flex size-11 items-center justify-center rounded-2xl bg-blue-400/10 text-cyan-200 ring-1 ring-cyan-300/20">
          <Icon className="size-5" />
        </div>
      </div>
      <p className="mt-5 border-t border-white/10 pt-3 text-sm font-medium text-cyan-100/90">{change}</p>
    </article>
  )
}
