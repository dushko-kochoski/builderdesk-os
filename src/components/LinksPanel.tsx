import { ExternalLink, Link2 } from 'lucide-react'
import type { SavedLink } from '../types'
import { Panel } from './Panel'

type LinksPanelProps = {
  links: SavedLink[]
}

export function LinksPanel({ links }: LinksPanelProps) {
  return (
    <Panel
      title="Saved links"
      eyebrow="Research"
      action={
        <div className="flex size-9 items-center justify-center rounded-xl border border-white/10 text-cyan-200">
          <Link2 className="size-4" />
        </div>
      }
    >
      <div className="space-y-2">
        {links.map((link) => (
          <a
            className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-medium text-slate-300 transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-white/[0.055] hover:text-white"
            href={link.url}
            key={link.id}
          >
            <span>{link.title}</span>
            <ExternalLink className="size-4 text-cyan-200" />
          </a>
        ))}
      </div>
    </Panel>
  )
}
