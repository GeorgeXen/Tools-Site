'use client'
import { useRouter, useSearchParams } from 'next/navigation'

const CATS = ['Writing','Image Generation','Programming','Research','Productivity','Marketing','Education','Customer Support','Video','Audio','Agents','Other']

export default function CategoryChips() {
  const router = useRouter()
  const params = useSearchParams()
  const active = params.get('category')

  function toggle(cat: string) {
    const q = new URLSearchParams(params.toString())
    if (active === cat) q.delete('category')
    else q.set('category', cat)
    router.push(`/tools?${q.toString()}`)
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {CATS.map(c => (
        <button key={c} onClick={() => toggle(c)} className={`rounded-full border px-3 py-1 text-sm ${active === c ? 'border-brand-600 bg-brand-600/10 text-brand-500' : 'border-neutral-800 bg-neutral-900/40 text-neutral-300 hover:bg-neutral-900'}`}>
          {c}
        </button>
      ))}
    </div>
  )
}


