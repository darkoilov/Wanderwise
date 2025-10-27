// lib/models/Package.ts
import { getDatabase } from "@/lib/mongodb"
import type { Collection } from "mongodb"
import { ObjectId } from "mongodb"

/** enums */
export const CATEGORIES = ["standard", "featured", "special", "lastminute"] as const
export type Category = (typeof CATEGORIES)[number]

export const DIFFICULTIES = ["Easy", "Moderate", "Challenging"] as const
export type Difficulty = (typeof DIFFICULTIES)[number]

export interface IncludedItem {
  icon: string
  title: string
  description: string
}

/** Canonical DB shape (numbers for price/rating/reviews) */
export interface TravelPackage {
  _id?: ObjectId

  slug: string
  title: string
  location: string
  duration: string

  price: number
  originalPrice?: number | null

  image: string
  images: string[]

  rating: number // 0..5
  reviews: number

  category: Category
  difficulty: Difficulty
  groupSize?: string

  highlights: string[]
  description: string
  whyBook?: string
  included: IncludedItem[]
  sights?: string[]

  order: number
  isVisible: boolean
  isSeasonal: boolean

  createdAt: Date
  updatedAt: Date
}

export interface PackageFilters {
  category?: Category | "all"
  duration?: "short" | "medium" | "long" | "all"
  /** "budget" | "mid" | "luxury" | "all" */
  priceRange?: "budget" | "mid" | "luxury" | "all"
  search?: string
  page?: number
  limit?: number
  isSeasonal?: boolean
}

export interface PackageResponse {
  packages: TravelPackage[]
  total: number
  page: number
  totalPages: number
}

export async function getPackageCollection(): Promise<Collection<TravelPackage>> {
  const db = await getDatabase()
  return db.collection<TravelPackage>("packages")
}

export async function ensurePackageIndexes() {
  const col = await getPackageCollection()
  await col.createIndexes([
    { key: { slug: 1 }, name: "slug_unique", unique: true },
    { key: { order: 1 }, name: "order_idx" },
    { key: { createdAt: -1 }, name: "createdAt_desc" },
    { key: { category: 1, isVisible: 1 }, name: "category_visible_idx" },
    { key: { isSeasonal: 1, isVisible: 1 }, name: "seasonal_visible_idx" },
    { key: { title: "text", location: "text", description: "text" }, name: "packages_text_idx" },
    { key: { price: 1 }, name: "price_idx" },
    { key: { rating: -1, createdAt: -1 }, name: "rating_created_desc" },
  ])
}
