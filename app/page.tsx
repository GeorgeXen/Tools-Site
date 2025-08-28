import Container from '@/components/Container'
import CommandSearch from '@/components/search/CommandSearch'
import InlineAutocomplete from '@/components/search/InlineAutocomplete'
import tools from '@/data/tools.json'
import ToolCard from '@/components/ToolCard'

export default function HomePage() {
  const featured = (tools as any[]).filter(t => t.featured).slice(0, 6)
  return (
    <div className="hero-bg">
      <Container className="py-20 text-center">
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
          Find The Best <span className="text-brand-500">AI Tools</span> & Apps
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-neutral-300">
          Search the most complete AI tools database. Discover the latest apps for writing, coding, business, learning & more.
        </p>
        <div className="mx-auto mt-8 max-w-2xl">
          <InlineAutocomplete />
          <div className="mt-3 text-sm text-neutral-400">
            Press <kbd className="rounded bg-neutral-800 px-1.5 py-0.5 text-xs">⌘K</kbd> for the command palette.
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-2xl">
          <CommandSearch />
        </div>
      </Container>

      <Container className="pb-20">
        <h2 className="mb-4 text-left text-xl font-semibold text-neutral-200">Featured</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((t: any) => <ToolCard key={t.id} tool={t} />)}
        </div>
      </Container>
    </div>
  )
}
