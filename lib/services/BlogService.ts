// lib/services/BlogService.ts
import { ObjectId } from "mongodb"
import {
    getBlogCollection,
    ensureBlogIndexes,
    type BlogPost,
    type BlogFilters,
    type BlogResponse,
} from "@/lib/models/Blog"

export class BlogService {
    private static async col() {
        await ensureBlogIndexes()
        return getBlogCollection()
    }

    static async getAllPosts(filters: BlogFilters = {}): Promise<BlogResponse> {
        const col = await this.col()
        const { search, category, tag, page = 1, limit = 12, onlyVisible = true } = filters

        const query: Record<string, any> = {}
        if (onlyVisible) query.isVisible = true
        if (category && category !== "All") query.category = category
        if (tag) query.tags = tag
        if (search) query.$text = { $search: search }

        const skip = (page - 1) * limit

        const cursor = col
            .find(query)
            .sort({ publishedAt: -1, order: 1, createdAt: -1 })
            .skip(skip)
            .limit(limit)

        const [posts, total] = await Promise.all([cursor.toArray(), col.countDocuments(query)])

        return {
            posts,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        }
    }

    static async getFeaturedPost(): Promise<BlogPost | null> {
        const col = await this.col()
        return col
            .find({ isVisible: true })
            .sort({ publishedAt: -1, order: 1, createdAt: -1 })
            .limit(1)
            .next()
    }

    static async getPostBySlug(slug: string): Promise<BlogPost | null> {
        const col = await this.col()
        return col.findOne({ slug, isVisible: true })
    }

    static async getPostById(id: string): Promise<BlogPost | null> {
        const col = await this.col()
        return col.findOne({ _id: new ObjectId(id), isVisible: true })
    }
}
