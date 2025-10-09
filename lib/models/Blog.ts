// lib/models/Blog.ts
import { Collection, Db, MongoClient } from "mongodb"
import { getDatabase } from "@/lib/mongodb"

// ---- Types ----
export type BlogCategory =
    | "Destinations"
    | "Travel Tips"
    | "Solo Travel"
    | "Food & Culture"
    | "Budget Travel"
    | "Photography"
    | "Sustainable Travel"

export const BLOG_CATEGORIES: BlogCategory[] = [
    "Destinations",
    "Travel Tips",
    "Solo Travel",
    "Food & Culture",
    "Budget Travel",
    "Photography",
    "Sustainable Travel",
]

export type BlogPost = {
    _id: any
    slug: string
    title: string
    excerpt: string
    content: string
    image?: string
    images?: string[]

    author?: string
    category?: BlogCategory | string
    tags?: string[]

    readTime?: number // minutes
    publishedAt?: Date | null

    isVisible: boolean
    order: number

    createdAt: Date
    updatedAt: Date
}

// Filters/response for listing
export type BlogFilters = {
    search?: string
    category?: string
    tag?: string
    page?: number
    limit?: number
    onlyVisible?: boolean
}

export type BlogResponse = {
    posts: BlogPost[]
    total: number
    page: number
    totalPages: number
}

// ---- Collection helpers ----
let _col: Collection<BlogPost> | null = null

export async function getBlogCollection(): Promise<Collection<BlogPost>> {
    if (_col) return _col
    const db: Db = await getDatabase()
    _col = db.collection<BlogPost>("blog_posts")
    return _col
}

let _indexesEnsured = false
export async function ensureBlogIndexes() {
    if (_indexesEnsured) return
    const col = await getBlogCollection()
    await Promise.all([
        col.createIndex({ slug: 1 }, { unique: true }),
        col.createIndex({ title: "text", excerpt: "text", content: "text", tags: "text" }),
        col.createIndex({ category: 1, publishedAt: -1 }),
        col.createIndex({ isVisible: 1 }),
        col.createIndex({ order: 1 }),
        col.createIndex({ createdAt: -1, updatedAt: -1 }),
    ])
    _indexesEnsured = true
}
