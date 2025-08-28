import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[--color-border-subtle]">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 text-sm text-neutral-400">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/toolatlas/symbol.svg" alt="ToolAtlas" className="h-5 w-5" />
            <span>© {new Date().getFullYear()} ToolAtlas</span>
          </div>
          <nav className="flex gap-4">
            <Link className="hover:text-white" href="/tools">Tools</Link>
            <Link className="hover:text-white" href="/map">Map</Link>
            <a className="hover:text-white" href="https://nextjs.org" target="_blank" rel="noreferrer">Built on Next.js</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}


