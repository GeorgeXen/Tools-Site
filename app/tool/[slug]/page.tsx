import tools from '@/data/tools.json'
import Container from '@/components/Container'
import { notFound } from 'next/navigation'

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = (tools as any[]).find(t => t.slug === params.slug)
  if (!tool) return notFound()
  return (
    <Container className="py-10">
      <div className="flex items-start gap-6">
        {tool.logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={tool.logoUrl} alt={tool.name} className="h-16 w-16 rounded-xl" />
        ) : <div className="h-16 w-16 rounded-xl bg-neutral-800" />}
        <div>
          <h1 className="text-3xl font-bold">{tool.name}</h1>
          <p className="mt-2 max-w-3xl text-neutral-300">{tool.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tool.categories.map((c: string) => <span key={c} className="rounded bg-neutral-800 px-2 py-0.5 text-xs text-neutral-300">{c}</span>)}
            <span className="rounded bg-brand-600/20 px-2 py-0.5 text-xs text-brand-500">{tool.pricing}</span>
          </div>
          <div className="mt-6 flex gap-3">
            <a href={tool.websiteUrl} target="_blank" rel="noreferrer" className="rounded-lg bg-brand-600 px-4 py-2 text-white">Visit Website</a>
          </div>
        </div>
      </div>
    </Container>
  )
}


