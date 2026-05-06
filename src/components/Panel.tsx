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
      className={`rounded-[1.35rem] border border-white/[0.07] bg-[#090f1d]/85 p-5 shadow-[0_4px_24px_rgba(0,0,0,0.22)] backdrop-blur sm:p-6 ${className}`}
    >
      <div className="mb-6 flex items-start justify-between gap-4 border-b border-white/[0.06] pb-4">
        <div className="min-w-0">
          {eyebrow ? (
            <p className="mb-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-slate-400">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-lg font-semibold tracking-tight text-slate-50">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}
