import { useEffect, useMemo, useState } from 'react'
import { BriefcaseBusiness, CheckCircle2, TriangleAlert } from 'lucide-react'
import type { Project } from '../types'
import { getPortfolioReadiness } from '../utils/portfolioUtils'
import { Panel } from './Panel'
import { PortfolioProjectCard } from './PortfolioProjectCard'
import { PortfolioSummary } from './PortfolioSummary'

type PortfolioPanelProps = {
  projects: Project[]
  onUpdateProject: (project: Project) => void
}

export function PortfolioPanel({ projects, onUpdateProject }: PortfolioPanelProps) {
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id ?? '')

  useEffect(() => {
    if (!projects.some((project) => project.id === selectedProjectId)) {
      setSelectedProjectId(projects[0]?.id ?? '')
    }
  }, [projects, selectedProjectId])

  const readiness = useMemo(() => projects.map((project) => getPortfolioReadiness(project)), [projects])
  const readyCount = readiness.filter((item) => item.ready).length
  const needsWorkCount = projects.length - readyCount
  const selectedProject = projects.find((project) => project.id === selectedProjectId) ?? projects[0]

  return (
    <Panel
      title="Portfolio"
      eyebrow="Showcase mode"
      action={
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
          <BriefcaseBusiness className="size-3.5" />
          {readyCount} ready
        </span>
      }
    >
      <div className="mb-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4">
          <div className="flex items-center gap-2 text-emerald-100">
            <CheckCircle2 className="size-4" />
            <p className="text-sm font-semibold">Portfolio Ready</p>
          </div>
          <p className="mt-2 text-3xl font-semibold text-white">{readyCount}</p>
        </div>
        <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4">
          <div className="flex items-center gap-2 text-amber-100">
            <TriangleAlert className="size-4" />
            <p className="text-sm font-semibold">Needs Work</p>
          </div>
          <p className="mt-2 text-3xl font-semibold text-white">{needsWorkCount}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
          <p className="text-sm font-semibold text-slate-300">Tracked Projects</p>
          <p className="mt-2 text-3xl font-semibold text-white">{projects.length}</p>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-6 text-slate-400">
          No projects available yet. Add projects first, then return here to prepare portfolio summaries.
        </div>
      ) : null}

      {selectedProject ? (
        <div className="grid gap-5 xl:grid-cols-[22rem_minmax(0,1fr)]">
          <div className="space-y-3">
            {projects.map((project) => (
              <PortfolioProjectCard
                key={project.id}
                project={project}
                selected={project.id === selectedProject.id}
                onSelect={setSelectedProjectId}
              />
            ))}
          </div>
          <PortfolioSummary project={selectedProject} onUpdateProject={onUpdateProject} />
        </div>
      ) : null}
    </Panel>
  )
}
