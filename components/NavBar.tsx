'use client'
import * as React from 'react'
import Link from 'next/link'
import { Menu, X, Compass, Map as MapIcon, Search } from 'lucide-react'
import CommandSearch from '@/components/search/CommandSearch'

export default function NavBar() {
  const [open, setOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-40 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 border-b border-[--color-border-subtle] bg-[color:rgba(11,15,25,0.6)]">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/toolatlas/symbol.svg" alt="ToolAtlas" className="h-7 w-7" />
            <span className="hidden sm:inline text-sm font-semibold">ToolAtlas</span>
          </Link>
          <nav className="ml-6 hidden gap-6 text-sm text-neutral-300 md:flex">
            <Link className="hover:text-white" href="/">Home</Link>
            <Link className="hover:text-white" href="/tools">Tools</Link>
            <Link className="hover:text-white" href="/map">Map</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <CommandSearch />
          </div>
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md border border-[--color-border-subtle] p-2 text-neutral-300 hover:text-white"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-b border-[--color-border-subtle] bg-[--color-surface-800]">
          <nav className="mx-auto w-full max-w-6xl px-4 py-3">
            <div className="flex flex-col gap-3 text-sm text-neutral-300">
              <Link className="hover:text-white" href="/" onClick={() => setOpen(false)}>
                <span className="inline-flex items-center gap-2"><Compass className="h-4 w-4" /> Home</span>
              </Link>
              <Link className="hover:text-white" href="/tools" onClick={() => setOpen(false)}>
                <span className="inline-flex items-center gap-2"><Search className="h-4 w-4" /> Tools</span>
              </Link>
              <Link className="hover:text-white" href="/map" onClick={() => setOpen(false)}>
                <span className="inline-flex items-center gap-2"><MapIcon className="h-4 w-4" /> Map</span>
              </Link>
              <div className="pt-2">
                <CommandSearch />
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}


