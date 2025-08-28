'use client'
import * as React from 'react'
import { Command } from 'cmdk'
import { useRouter } from 'next/navigation'
import { searchLocal } from '@/lib/search'

export default function CommandSearch() {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState('')
  const router = useRouter()
  const results = React.useMemo(() => searchLocal({ q: query }).slice(0, 8), [query])

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault(); setOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <button onClick={() => setOpen(true)} className="inline-flex items-center justify-between rounded-2xl border border-neutral-800 bg-neutral-900/60 px-4 py-3 text-left text-neutral-300 shadow-sm hover:bg-neutral-900">
        <span>Search AI tools…</span>
        <kbd className="rounded bg-neutral-800 px-2 py-1 text-xs text-neutral-400">⌘K</kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" onClick={() => setOpen(false)}>
          <div className="cmdk-root w-full max-w-2xl" onClick={e => e.stopPropagation()}>
            <Command aria-label="Global Search">
              <Command.Input value={query} onValueChange={setQuery} placeholder="Search tools, e.g., chat, image, agent…" className="cmdk-input" />
              <Command.List className="cmdk-list">
                {results.length === 0 && <Command.Empty className="cmdk-empty">No results</Command.Empty>}
                {results.map(tool => (
                  <Command.Item key={tool.id} value={tool.name} className="cmdk-item" onSelect={() => { setOpen(false); router.push(`/tool/${tool.slug}`) }}>
                    <div className="flex items-center gap-3">
                      {tool.logoUrl ? <img src={tool.logoUrl} alt="" className="h-8 w-8 rounded" /> : <div className="h-8 w-8 rounded bg-neutral-800" />}
                      <div>
                        <div className="font-medium">{tool.name}</div>
                        <div className="text-xs text-neutral-400 line-clamp-1">{tool.shortDescription}</div>
                      </div>
                    </div>
                  </Command.Item>
                ))}
              </Command.List>
            </Command>
          </div>
        </div>
      )}
    </>
  )
}


