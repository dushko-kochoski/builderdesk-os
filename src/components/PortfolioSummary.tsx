import { type FormEvent, useEffect, useMemo, useState } from 'react'
import { Copy, Save } from 'lucide-react'
import type { PortfolioStatus, Project } from '../types'
import {
  generateLinkedInSummary,
  generatePortfolioSummary,
  generateReadmeSummary,
  getPortfolioReadiness,
} from '../utils/portfolioUtils'
import { normalizeExternalUrl } from '../utils/normalizeData'

const portfolioStatuses: PortfolioStatus[] = ['Draft', 'Ready', 'Needs work']

type PortfolioSummaryProps = {
  project: Project
  onUpdateProject: (project: Project) => void
}

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
  }
}

export function PortfolioSummary({ project, onUpdateProject }: PortfolioSummaryProps) {
  const [problemSolved, setProblemSolved] = useState(project.problemSolved ?? '')
  const [targetUsers, setTargetUsers] = useState(project.targetUsers ?? '')
  const [keyFeatures, setKeyFeatures] = useState(project.keyFeatures?.join(', ') ?? '')
  const [techStack, setTechStack] = useState(project.techStack?.join(', ') ?? '')
  const [liveDemoUrl, setLiveDemoUrl] = useState(project.liveDemoUrl ?? '')
  const [githubUrl, setGithubUrl] = useState(project.githubUrl ?? '')
  const [portfolioStatus, setPortfolioStatus] = useState<PortfolioStatus>(project.portfolioStatus ?? 'Draft')
  const [whatILearned, setWhatILearned] = useState(project.whatILearned ?? '')
  const [nextImprovement, setNextImprovement] = useState(project.nextImprovement ?? '')
  const [copiedLabel, setCopiedLabel] = useState('')

  useEffect(() => {
    setProblemSolved(project.problemSolved ?? '')
    setTargetUsers(project.targetUsers ?? '')
    setKeyFeatures(project.keyFeatures?.join(', ') ?? '')
    setTechStack(project.techStack?.join(', ') ?? '')
    setLiveDemoUrl(project.liveDemoUrl ?? '')
    setGithubUrl(project.githubUrl ?? '')
    setPortfolioStatus(project.portfolioStatus ?? 'Draft')
    setWhatILearned(project.whatILearned ?? '')
    setNextImprovement(project.nextImprovement ?? '')
  }, [project])

  const previewProject = useMemo(
    () => ({
      ...project,
      problemSolved,
      targetUsers,
      keyFeatures: keyFeatures.split(',').map((item) => item.trim()).filter(Boolean),
      techStack: techStack.split(',').map((item) => item.trim()).filter(Boolean),
      liveDemoUrl: normalizeExternalUrl(liveDemoUrl),
      githubUrl: normalizeExternalUrl(githubUrl),
      portfolioStatus,
      whatILearned,
      nextImprovement,
    }),
    [
      githubUrl,
      keyFeatures,
      liveDemoUrl,
      nextImprovement,
      portfolioStatus,
      problemSolved,
      project,
      targetUsers,
      techStack,
      whatILearned,
    ],
  )
  const readiness = getPortfolioReadiness(previewProject)
  const summary = generatePortfolioSummary(previewProject)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onUpdateProject(previewProject)
  }

  async function handleCopy(label: string, text: string) {
    await copyText(text)
    setCopiedLabel(label)
    window.setTimeout(() => setCopiedLabel(''), 1600)
  }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.032] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/80">Summary Preview</p>
            <h3 className="mt-1 text-xl font-semibold text-white">{project.name}</h3>
          </div>
          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${
              readiness.ready
                ? 'border-emerald-300/25 bg-emerald-300/10 text-emerald-100'
                : 'border-amber-300/25 bg-amber-300/10 text-amber-100'
            }`}
          >
            {readiness.status}
          </span>
        </div>

        {readiness.missingFields.length > 0 ? (
          <p className="mt-3 text-sm leading-6 text-amber-100">Missing: {readiness.missingFields.join(', ')}</p>
        ) : null}

        <pre className="mt-4 whitespace-pre-wrap rounded-2xl border border-white/[0.07] bg-slate-950/55 p-4 text-sm leading-6 text-slate-200">
          {summary}
        </pre>

        <div className="mt-4 flex flex-wrap gap-2">
          {[
            ['Copy summary', summary],
            ['Copy LinkedIn version', generateLinkedInSummary(previewProject)],
            ['Copy GitHub README version', generateReadmeSummary(previewProject)],
          ].map(([label, text]) => (
            <button
              className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/20 bg-cyan-300/[0.08] px-3 py-2 text-sm font-semibold text-cyan-100 transition hover:scale-[1.01] hover:border-cyan-300/40"
              key={label}
              type="button"
              onClick={() => void handleCopy(label, text)}
            >
              <Copy className="size-4" />
              {copiedLabel === label ? 'Copied' : label}
            </button>
          ))}
        </div>
      </div>

      <form
        className="rounded-2xl border border-white/[0.07] bg-white/[0.032] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.12)]"
        onSubmit={handleSubmit}
      >
        <div className="grid gap-3 md:grid-cols-2">
          <label className="space-y-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            GitHub URL
            <input
              className="h-11 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 text-sm normal-case tracking-normal text-white outline-none transition focus:border-cyan-300/50"
              value={githubUrl}
              onChange={(event) => setGithubUrl(event.target.value)}
            />
          </label>
          <label className="space-y-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            Live Demo URL
            <input
              className="h-11 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 text-sm normal-case tracking-normal text-white outline-none transition focus:border-cyan-300/50"
              value={liveDemoUrl}
              onChange={(event) => setLiveDemoUrl(event.target.value)}
            />
          </label>
        </div>

        <label className="mt-3 block space-y-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          Problem Solved
          <textarea
            className="min-h-20 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-3 text-sm normal-case leading-6 tracking-normal text-white outline-none transition focus:border-cyan-300/50"
            value={problemSolved}
            onChange={(event) => setProblemSolved(event.target.value)}
          />
        </label>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <label className="space-y-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            Target Users
            <textarea
              className="min-h-20 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-3 text-sm normal-case leading-6 tracking-normal text-white outline-none transition focus:border-cyan-300/50"
              value={targetUsers}
              onChange={(event) => setTargetUsers(event.target.value)}
            />
          </label>
          <label className="space-y-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            Portfolio Status
            <select
              className="h-11 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 text-sm normal-case tracking-normal text-white outline-none transition focus:border-cyan-300/50"
              value={portfolioStatus}
              onChange={(event) => setPortfolioStatus(event.target.value as PortfolioStatus)}
            >
              {portfolioStatuses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <label className="space-y-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            Key Features
            <textarea
              className="min-h-20 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-3 text-sm normal-case leading-6 tracking-normal text-white outline-none transition focus:border-cyan-300/50"
              value={keyFeatures}
              onChange={(event) => setKeyFeatures(event.target.value)}
            />
          </label>
          <label className="space-y-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            Tech Stack
            <textarea
              className="min-h-20 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-3 text-sm normal-case leading-6 tracking-normal text-white outline-none transition focus:border-cyan-300/50"
              value={techStack}
              onChange={(event) => setTechStack(event.target.value)}
            />
          </label>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <label className="space-y-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            What I Learned
            <textarea
              className="min-h-20 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-3 text-sm normal-case leading-6 tracking-normal text-white outline-none transition focus:border-cyan-300/50"
              value={whatILearned}
              onChange={(event) => setWhatILearned(event.target.value)}
            />
          </label>
          <label className="space-y-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            Next Improvement
            <textarea
              className="min-h-20 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-3 text-sm normal-case leading-6 tracking-normal text-white outline-none transition focus:border-cyan-300/50"
              value={nextImprovement}
              onChange={(event) => setNextImprovement(event.target.value)}
            />
          </label>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            type="submit"
          >
            <Save className="size-4" />
            Save portfolio details
          </button>
        </div>
      </form>
    </div>
  )
}
