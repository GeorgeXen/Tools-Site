export type Pricing = 'free' | 'freemium' | 'paid' | 'open-source'
export type Category =
  | 'Writing' | 'Image Generation' | 'Programming' | 'Research' | 'Productivity'
  | 'Marketing' | 'Education' | 'Customer Support' | 'Video' | 'Audio' | 'Agents' | 'Other'

export interface Tool {
  id: string
  name: string
  slug: string
  shortDescription: string
  description: string
  categories: Category[]
  tags: string[]
  pricing: Pricing
  websiteUrl: string
  signupUrl?: string
  logoUrl?: string
  screenshots?: string[]
  verified?: boolean
  featured?: boolean
  upvotes?: number
  rating?: number
  addedAt: string
  models?: string[]
}


