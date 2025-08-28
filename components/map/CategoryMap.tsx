'use client'
import * as React from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import data from '@/data/tools.json'
import { buildGraph, type GraphNode } from '@/lib/buildGraph'

const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false }) as any
const IMG = new Map<string, HTMLImageElement>()
const getImg = (u?: string) => (!u ? undefined : IMG.get(u) ?? (IMG.set(u, Object.assign(new Image(), { src: u })), IMG.get(u)))

export default function CategoryMap() {
  const router = useRouter()
  const graph = React.useMemo(() => buildGraph(data as any), [])
  const [q, setQ] = React.useState('')
  const graphRef = React.useRef<any>(null)
  const miniRef = React.useRef<HTMLCanvasElement | null>(null)
  const matches = React.useMemo(() => {
    const s = q.trim().toLowerCase()
    if (s.length < 3) return new Set<string>()
    return new Set(graph.nodes.filter(n => n.name.toLowerCase().includes(s)).map(n => n.id))
  }, [graph.nodes, q])

  // Minimap render loop
  React.useEffect(() => {
    let raf = 0
    const draw = () => {
      const canvas = miniRef.current
      const inst = graphRef.current
      if (!canvas || !inst) { raf = requestAnimationFrame(draw); return }
      const ctx = canvas.getContext('2d')
      if (!ctx) { raf = requestAnimationFrame(draw); return }

      const gd = inst.graphData?.() ?? graph
      const nodes: any[] = (gd.nodes as any[]) || []
      const links: any[] = (gd.links as any[]) || []

      const coords = nodes.filter(n => typeof n.x === 'number' && typeof n.y === 'number')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (coords.length) {
        const xs = coords.map(n => n.x as number)
        const ys = coords.map(n => n.y as number)
        const minX = Math.min(...xs), maxX = Math.max(...xs)
        const minY = Math.min(...ys), maxY = Math.max(...ys)
        const pad = 12
        const scaleX = (canvas.width - pad * 2) / Math.max(1, maxX - minX)
        const scaleY = (canvas.height - pad * 2) / Math.max(1, maxY - minY)
        const scale = Math.min(scaleX, scaleY)
        const tx = (canvas.width - (maxX - minX) * scale) / 2 - minX * scale
        const ty = (canvas.height - (maxY - minY) * scale) / 2 - minY * scale

        // links
        ctx.strokeStyle = 'rgba(255,255,255,0.08)'
        ctx.lineWidth = 1
        links.forEach(l => {
          const a: any = typeof l.source === 'object' ? l.source : nodes.find(n => n.id === l.source)
          const b: any = typeof l.target === 'object' ? l.target : nodes.find(n => n.id === l.target)
          if (!a || !b || typeof a.x !== 'number' || typeof a.y !== 'number' || typeof b.x !== 'number' || typeof b.y !== 'number') return
          ctx.beginPath()
          ctx.moveTo(a.x * scale + tx, a.y * scale + ty)
          ctx.lineTo(b.x * scale + tx, b.y * scale + ty)
          ctx.stroke()
        })

        // nodes
        coords.forEach((n: any) => {
          const highlight = (matches as Set<string>).has(n.id)
          ctx.fillStyle = highlight ? '#ef4444' : (n.type === 'category' ? '#7C3AED' : '#7E869E')
          const r = Math.max(1, (n.val || 2) * 0.5)
          ctx.beginPath()
          ctx.arc((n.x as number) * scale + tx, (n.y as number) * scale + ty, r, 0, Math.PI * 2)
          ctx.fill()
        })
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [graph, matches])

  return (
    <div className="relative h-[70vh] w-full rounded-lg border border-[--color-border-subtle] overflow-hidden">
      <input
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Search nodes…"
        className="pointer-events-auto absolute left-1/2 top-4 z-10 w-full max-w-xl -translate-x-1/2 rounded-full border border-neutral-800 bg-neutral-900/70 px-5 py-3 text-neutral-200"
      />
      {/* Zoom controls (buttons) */}
      <div className="pointer-events-auto absolute left-4 bottom-4 z-10 flex flex-col gap-2">
        <button
          type="button"
          aria-label="Zoom in"
          className="h-9 w-9 rounded-md border border-[--color-border-subtle] bg-[--color-surface-800]/80 text-lg text-neutral-200 hover:text-white"
          onClick={() => { const api = graphRef.current; if (api?.zoom) api.zoom(api.zoom() * 1.2); }}
        >
          +
        </button>
        <button
          type="button"
          aria-label="Zoom out"
          className="h-9 w-9 rounded-md border border-[--color-border-subtle] bg-[--color-surface-800]/80 text-lg text-neutral-200 hover:text-white"
          onClick={() => { const api = graphRef.current; if (api?.zoom) api.zoom(api.zoom() / 1.2); }}
        >
          −
        </button>
        <button
          type="button"
          aria-label="Center graph"
          className="h-9 w-9 rounded-md border border-[--color-border-subtle] bg-[--color-surface-800]/80 text-sm text-neutral-200 hover:text-white"
          onClick={() => { const api = graphRef.current; if (api?.zoomToFit) api.zoomToFit(400, 50); }}
        >
          ⊙
        </button>
      </div>
      <ForceGraph2D
        ref={graphRef}
        graphData={graph}
        backgroundColor="#0b0f19"
        linkColor={() => 'rgba(255,255,255,.08)'}
        nodeRelSize={8}
        nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D, scale: number) => {
          const n = node as GraphNode
          const size = Math.max(4, n.val * 2)
          const highlight = matches.has(n.id)
          if (n.type === 'tool' && n.logoUrl) {
            const r = size + 2
            const img = getImg(n.logoUrl)
            ctx.save(); ctx.beginPath(); ctx.arc(node.x, node.y, r, 0, 2 * Math.PI); ctx.clip()
            if (img && img.complete) ctx.drawImage(img, node.x - r, node.y - r, r * 2, r * 2)
            else { ctx.fillStyle = '#222'; ctx.fillRect(node.x - r, node.y - r, r * 2, r * 2) }
            ctx.restore()
            ctx.strokeStyle = highlight ? '#ef4444' : 'rgba(255,255,255,.2)'
            ctx.lineWidth = highlight ? 2 : 1
            ctx.beginPath(); ctx.arc(node.x, node.y, r, 0, 2 * Math.PI); ctx.stroke()
          } else {
            ctx.fillStyle = n.type === 'category' ? '#7C3AED' : '#7E869E'
            ctx.beginPath(); ctx.arc(node.x, node.y, size, 0, 2 * Math.PI); ctx.fill()
            if (highlight) { ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2; ctx.stroke() }
          }
          const font = 12 / Math.sqrt(scale)
          if (font > 4) { ctx.font = `${font}px Inter`; ctx.fillStyle = highlight ? '#ef4444' : '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'top'; ctx.fillText(n.name, node.x, node.y + size + 6) }
        }}
        onNodeClick={(node: any) => {
          const n = node as GraphNode
          if (n.type === 'tool' && n.slug) router.push(`/tool/${n.slug}`)
        }}
      />
      {/* Minimap (preview) */}
      <canvas ref={miniRef} width={160} height={120} className="absolute bottom-4 right-4 z-10 rounded border border-[--color-border-subtle] bg-[--color-surface-800]/80"></canvas>
    </div>
  )
}


