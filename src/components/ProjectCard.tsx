import { ArrowUpRight, Link2 } from 'lucide-react'
import type { Project, ProjectStatus } from '../types'

const statusStyles: Record<ProjectStatus, string> = {
  Building: 'border-cyan-300/30 bg-cyan-300/10 text-cyan-100',
  Planning: 'border-blue-300/30 bg-blue-300/10 text-blue-100',
  Shipping: 'border-emerald-300/30 bg-emerald-300/10 text-emerald-100',
  Paused: 'border-amber-300/30 bg-amber-300/10 text-amber-100',
}

const statusDots: Record<ProjectStatus, string> = {
  Building: 'bg-cyan-300 shadow-cyan-300/40',
  Planning: 'bg-blue-300 shadow-blue-300/40',
  Shipping: 'bg-emerald-300 shadow-emerald-300/40',
  Paused: 'bg-amber-300 shadow-amber-300/40',
}

const progressStyles: Record<ProjectStatus, string> = {
  Building: 'from-blue-500 to-cyan-300',
  Planning: 'from-sky-500 to-blue-300',
  Shipping: 'from-emerald-500 to-violet-300',
  Paused: 'from-amber-500 to-slate-400',
}

type ProjectCardProps = {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-5 transition duration-200 hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-white/[0.055] hover:shadow-2xl hover:shadow-cyan-950/20 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-300">{project.category}</p>
          <h3 className="mt-1 text-2xl font-semibold tracking-tight text-white">{project.name}</h3>
        </div>
        <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${statusStyles[project.status]}`}>
          <span className={`size-2 rounded-full shadow-[0_0_12px] ${statusDots[project.status]}`} />
          {project.status}
        </span>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-slate-300">Progress</span>
          <span className="rounded-full border border-white/10 bg-slate-950/50 px-2.5 py-1 text-xs font-bold text-cyan-100">
            {project.progress}%
          </span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-slate-800 ring-1 ring-white/10">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${progressStyles[project.status]}`}
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-cyan-300/15 bg-slate-950/55 p-4 shadow-inner shadow-cyan-950/20 transition group-hover:border-cyan-300/25">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-cyan-200/80">Next action</p>
        <p className={`mt-2 text-sm font-medium leading-6 ${project.nextAction ? 'text-slate-100' : 'text-amber-100'}`}>
          {project.nextAction ?? 'Needs a clear owner and next action'}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-slate-300">
          Due <span className="font-semibold text-slate-100">{project.dueDate}</span>
        </p>
        <div className="flex items-center gap-2 text-sm font-medium text-cyan-100">
          <Link2 className="size-4" />
          <span>{project.savedLinks.length} links</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.savedLinks.map((link) => (
          <a
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-white"
            href={link.url}
            key={link.id}
          >
            {link.title}
            <ArrowUpRight className="size-3" />
          </a>
        ))}
      </div>
    </article>
  )
}
