import { CheckCircle2, CircleDashed, TriangleAlert } from 'lucide-react'
import type { Project } from '../types'
import { getPortfolioReadiness } from '../utils/portfolioUtils'

type PortfolioProjectCardProps = {
  project: Project
  selected: boolean
  onSelect: (projectId: string) => void
}

export function PortfolioProjectCard({ project, selected, onSelect }: PortfolioProjectCardProps) {
  const readiness = getPortfolioReadiness(project)
  const StatusIcon = readiness.ready ? CheckCircle2 : readiness.status === 'Draft' ? CircleDashed : TriangleAlert

  return (
    <button
      className={`w-full rounded-2xl border p-4 text-left shadow-[0_4px_18px_rgba(0,0,0,0.1)] transition hover:-translate-y-0.5 hover:scale-[1.005] ${
        selected
          ? 'border-cyan-300/35 bg-cyan-300/[0.055] shadow-[0_6px_24px_rgba(8,145,178,0.12)]'
          : 'border-white/[0.07] bg-white/[0.032] hover:border-cyan-300/25 hover:bg-white/[0.05]'
      }`}
      type="button"
      onClick={() => onSelect(project.id)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{project.category}</p>
          <h3 className="mt-1 text-base font-semibold text-white">{project.name}</h3>
        </div>
        <span
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${
            readiness.ready
              ? 'border-emerald-300/25 bg-emerald-300/10 text-emerald-100'
              : readiness.status === 'Draft'
                ? 'border-slate-300/15 bg-slate-400/10 text-slate-300'
                : 'border-amber-300/25 bg-amber-300/10 text-amber-100'
          }`}
        >
          <StatusIcon className="size-3.5" />
          {readiness.status}
        </span>
      </div>

      {readiness.missingFields.length > 0 ? (
        <p className="mt-3 text-sm leading-6 text-amber-100">
          Missing: {readiness.missingFields.slice(0, 3).join(', ')}
          {readiness.missingFields.length > 3 ? ` +${readiness.missingFields.length - 3}` : ''}
        </p>
      ) : (
        <p className="mt-3 text-sm leading-6 text-emerald-100">Portfolio summary is ready to copy.</p>
      )}
    </button>
  )
}
