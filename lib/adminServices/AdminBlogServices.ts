// lib/services/AdminBlogService.ts
import { ObjectId } from "mongodb"
import {
    getBlogCollection,
    ensureBlogIndexes,
    type BlogPost,
    BLOG_CATEGORIES,
} from "@/lib/models/Blog"

const sanitize = (s: any) => String(s ?? "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")

async function uniqueSlugForTitle(title: string) {
    const col = await getBlogCollection()
    const base = slugify(title)
    let slug = base
    let i = 1
    while (await col.findOne({ slug }, { projection: { _id: 1 } })) slug = `${base}-${i++}`
    return slug
}

async function nextOrder() {
    const col = await getBlogCollection()
    const last = await col.find({}, { projection: { order: 1 } }).sort({ order: -1 }).limit(1).next()
    return (last?.order ?? 0) + 1
}

export class AdminBlogService {
    private static async col() {
        await ensureBlogIndexes()
        return getBlogCollection()
    }

    static async createPost(data: Omit<BlogPost, "_id" | "slug" | "order" | "isVisible" | "createdAt" | "updatedAt"> & {
        isVisible?: boolean
        order?: number | string
    }): Promise<BlogPost> {
        const col = await this.col()
        const now = new Date()

        const title = sanitize(data.title)
        const slug = await uniqueSlugForTitle(title)

        const doc: BlogPost = {
            slug,
            title,
            excerpt: sanitize(data.excerpt),
            content: (data as any).content ?? "", // allow rich text downstream; keep server sanitization minimal if you store HTML
            image: (data as any).image ? sanitize((data as any).image) : undefined,
            images: Array.isArray((data as any).images) ? (data as any).images.map(sanitize) : [],

            author: data.author ? sanitize(data.author) : "Editorial Team",
            category: data.category && BLOG_CATEGORIES.includes(data.category as any) ? (data.category as any) : undefined,
            tags: Array.isArray(data.tags) ? data.tags.map(sanitize).filter(Boolean) : [],

            readTime: Number.isFinite((data as any).readTime) ? Number((data as any).readTime) : undefined,
            publishedAt: (data as any).publishedAt ? new Date((data as any).publishedAt) : null,

            isVisible: (data as any).isVisible !== false,
            order: (data as any).order && Number((data as any).order) > 0 ? Number((data as any).order) : await nextOrder(),

            createdAt: now,
            updatedAt: now,
        }

        const res = await col.insertOne(doc)
        return { ...doc, _id: res.insertedId }
    }

    static async updatePost(id: string, updates: Partial<BlogPost>): Promise<boolean> {
        const col = await this.col()
        const _id = new ObjectId(id)
        const $set: any = { updatedAt: new Date() }

        if (updates.title !== undefined) {
            $set.title = sanitize(updates.title)
            $set.slug = await uniqueSlugForTitle($set.title)
        }
        if (updates.excerpt !== undefined) $set.excerpt = sanitize(updates.excerpt)
        if ((updates as any).content !== undefined) $set.content = (updates as any).content
        if ((updates as any).image !== undefined) $set.image = sanitize((updates as any).image)
        if (updates.images !== undefined) $set.images = (updates.images || []).map(sanitize)
        if (updates.author !== undefined) $set.author = sanitize(updates.author)
        if (updates.category !== undefined)
            $set.category = BLOG_CATEGORIES.includes(updates.category as any) ? updates.category : undefined
        if (updates.tags !== undefined) $set.tags = (updates.tags || []).map(sanitize)
        if ((updates as any).readTime !== undefined) $set.readTime = Number((updates as any).readTime) || undefined
        if ((updates as any).publishedAt !== undefined)
            $set.publishedAt = (updates as any).publishedAt ? new Date((updates as any).publishedAt) : null
        if ((updates as any).order !== undefined) $set.order = Math.max(1, Math.floor(Number((updates as any).order)))
        if ((updates as any).isVisible !== undefined) $set.isVisible = !!(updates as any).isVisible

        const res = await col.updateOne({ _id }, { $set })
        return res.modifiedCount > 0
    }

    static async deletePost(id: string): Promise<boolean> {
        const col = await this.col()
        const _id = new ObjectId(id)
        const res = await col.deleteOne({ _id })
        return res.deletedCount > 0
    }

    static async toggleVisibility(id: string, isVisible: boolean): Promise<boolean> {
        const col = await this.col()
        const _id = new ObjectId(id)
        const res = await col.updateOne({ _id }, { $set: { isVisible: !!isVisible, updatedAt: new Date() } })
        return res.modifiedCount > 0
    }

    static async updateOrder(items: Array<{ id: string; order: number }>): Promise<number> {
        const col = await this.col()
        if (!Array.isArray(items) || !items.length) return 0
        const ops = items.map((x) => ({
            updateOne: {
                filter: { _id: new ObjectId(x.id) },
                update: { $set: { order: Math.max(1, Math.floor(Number(x.order))), updatedAt: new Date() } },
            },
        }))
        const res = await col.bulkWrite(ops, { ordered: false })
        return res.modifiedCount
    }
}
