import MiniSearch, { Options } from 'minisearch'
import tools from '@/data/tools.json'
import type { Tool } from '@/types/tool'

let _index: MiniSearch<Tool> | null = null

const options: Options<Tool> = {
  fields: ['name', 'shortDescription', 'description', 'tags', 'categories'],
  storeFields: ['id', 'name', 'slug', 'shortDescription', 'pricing', 'categories', 'tags', 'logoUrl', 'upvotes', 'rating'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.2,
    boost: { name: 4, shortDescription: 2, description: 1 }
  }
}

export function getIndex() {
  if (_index) return _index
  _index = new MiniSearch<Tool>(options)
  _index.addAll(tools as Tool[])
  return _index
}

export type Query = { q?: string; category?: string; pricing?: string; tags?: string[] }

export function searchLocal({ q = '', category, pricing, tags = [] }: Query) {
  const idx = getIndex()
  let results = q ? idx.search(q) : (tools as Tool[])

  const res = (Array.isArray(results) ? results.map(r => ('id' in r ? r : r)) : results) as any

  let list: Tool[] = Array.isArray(res)
    ? res.map((r: any) => ('id' in r ? r : (r as Tool)))
    : (tools as Tool[])

  if (!q) list = tools as Tool[]

  if (category) list = list.filter(t => t.categories.includes(category as any))
  if (pricing) list = list.filter(t => t.pricing === pricing)
  if (tags.length) list = list.filter(t => tags.every(tag => t.tags.includes(tag)))

  return list
}


