'use client'
import Container from '@/components/Container'
import CategoryChips from '@/components/CategoryChips'
import ToolCard from '@/components/ToolCard'
import { useSearchParams } from 'next/navigation'
import { searchLocal } from '@/lib/search'

export default function ToolsPage() {
  const params = useSearchParams()
  const q = params.get('q') ?? ''
  const category = params.get('category') ?? undefined
  const pricing = params.get('pricing') ?? undefined
  const tags = params.get('tags')?.split(',') ?? []

  const results = searchLocal({ q, category, pricing, tags })

  return (
    <Container className="py-12">
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-semibold">Browse AI Tools</h1>
        <CategoryChips />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {results.map((t: any) => <ToolCard key={t.id} tool={t} />)}
        </div>
        {results.length === 0 && <p className="text-neutral-400">No tools found. Try another search.</p>}
      </div>
    </Container>
  )
}


