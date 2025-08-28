import type { Tool } from '@/types/tool'

export type GraphNode = {
  id: string
  type: 'category' | 'tool' | 'tag'
  name: string
  slug?: string
  logoUrl?: string
  val: number
}
export type GraphLink = { source: string; target: string; type: 'belongsTo' | 'hasTag' }

export function buildGraph(tools: Tool[]) {
  const nodes = new Map<string, GraphNode>()
  const links: GraphLink[] = []

  const catCounts = new Map<string, number>()
  tools.forEach(t => t.categories.forEach(c => catCounts.set(c, (catCounts.get(c) ?? 0) + 1)))

  for (const [cat, count] of catCounts)
    nodes.set(`cat:${cat}`, { id: `cat:${cat}`, type: 'category', name: cat, val: Math.max(6, Math.min(18, count * 2)) })

  for (const t of tools) {
    const id = `tool:${t.id}`
    nodes.set(id, { id, type: 'tool', name: t.name, slug: t.slug, logoUrl: t.logoUrl, val: 4 })
    t.categories.forEach(c => links.push({ source: `cat:${c}`, target: id, type: 'belongsTo' }))
    t.tags.slice(0, 3).forEach(tag => {
      const tagId = `tag:${tag}`
      if (!nodes.has(tagId)) nodes.set(tagId, { id: tagId, type: 'tag', name: tag, val: 2 })
      links.push({ source: id, target: tagId, type: 'hasTag' })
    })
  }
  return { nodes: [...nodes.values()], links }
}


