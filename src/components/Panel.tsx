import type { ReactNode } from 'react'

type PanelProps = {
  title: string
  eyebrow?: string
  action?: ReactNode
  children: ReactNode
  className?: string
}

export function Panel({ title, eyebrow, action, children, className = '' }: PanelProps) {
  return (
    <section
      className={`rounded-[1.35rem] border border-white/10 bg-slate-950/60 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur sm:p-6 ${className}`}
    >
      <div className="mb-6 flex items-start justify-between gap-4 border-b border-white/10 pb-4">
        <div className="min-w-0">
          {eyebrow ? (
            <p className="mb-1.5 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-cyan-200/90">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-lg font-semibold tracking-tight text-white">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}
