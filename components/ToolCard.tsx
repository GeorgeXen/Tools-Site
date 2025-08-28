'use client'
import { ExternalLink, ArrowRight } from 'lucide-react'
import type { Tool } from '@/types/tool'

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div className="group rounded-2xl border border-neutral-800 bg-neutral-900/50 p-4 transition hover:border-neutral-700 hover:bg-neutral-900">
      <div className="flex items-start gap-4">
        {tool.logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={tool.logoUrl} alt={tool.name} className="h-12 w-12 rounded-lg object-cover" />
        ) : (
          <div className="h-12 w-12 rounded-lg bg-neutral-800" />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-lg font-semibold">{tool.name}</h3>
            {tool.verified && <span className="rounded bg-brand-600/20 px-2 py-0.5 text-xs text-brand-500">Verified</span>}
            {tool.pricing && (
              <span className="rounded bg-neutral-800 px-2 py-0.5 text-xs text-neutral-300">{tool.pricing}</span>
            )}
          </div>
          <p className="mt-1 line-clamp-2 text-sm text-neutral-300">{tool.shortDescription}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {tool.categories.map(cat => (
              <span key={cat} className="rounded-full bg-neutral-800 px-2 py-0.5 text-xs text-neutral-300">{cat}</span>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <a href={`/tool/${tool.slug}`} className="inline-flex items-center gap-1 rounded-lg border border-neutral-700 px-3 py-1.5 text-sm hover:bg-neutral-800">
              Details <ArrowRight className="h-4 w-4" />
            </a>
            <a href={tool.websiteUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-lg bg-brand-600 px-3 py-1.5 text-sm text-white hover:bg-brand-700">
              Visit <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}


