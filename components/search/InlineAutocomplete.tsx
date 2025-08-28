'use client'
import * as React from 'react'
import { searchLocal } from '@/lib/search'
import { useRouter } from 'next/navigation'

export default function InlineAutocomplete({ placeholder = 'Search AI tools…' }: { placeholder?: string }) {
  const [q, setQ] = React.useState('')
  const [focused, setFocused] = React.useState(false)
  const router = useRouter()
  const results = React.useMemo(() => searchLocal({ q }).slice(0, 6), [q])

  return (
    <div className="relative w-full">
      <input
        value={q}
        onChange={e => setQ(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 120)}
        placeholder={placeholder}
        className="w-full rounded-full border border-neutral-800 bg-neutral-900/60 px-5 py-4 text-base text-neutral-100 placeholder:text-neutral-400 shadow-glow focus:outline-none"
      />
      {focused && q && (
        <div className="absolute left-0 right-0 z-20 mt-2 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/90 backdrop-blur">
          {results.length === 0 && (
            <div className="p-4 text-sm text-neutral-400">No results</div>
          )}
          {results.map(r => (
            <button key={r.id} onMouseDown={() => router.push(`/tool/${r.slug}`)} className="flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-neutral-800">
              {r.logoUrl ? <img src={r.logoUrl} alt="" className="mt-0.5 h-8 w-8 rounded" /> : <div className="mt-0.5 h-8 w-8 rounded bg-neutral-800" />}
              <div>
                <div className="font-medium text-neutral-100">{r.name}</div>
                <div className="text-xs text-neutral-400 line-clamp-1">{r.shortDescription}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}


