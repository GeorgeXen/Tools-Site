import { NextRequest, NextResponse } from 'next/server'
import { searchLocal } from '@/lib/search'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const { q = '', category, pricing, tags = [] } = body as any
  const results = searchLocal({ q, category, pricing, tags })
  return NextResponse.json({ results })
}


