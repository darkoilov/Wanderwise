// app/admin/blog/page.tsx
import { BlogService } from "@/lib/services/BlogService"
import AdminBlogDashboardClient from "@/app/admin/blog/components/AdminBlogDashboardClient"
import type { BlogPost, BlogCategory } from "@/lib/models/Blog"

function mapPost(p: BlogPost) {
    return {
        id: String(p._id),
        title: p.title,
        excerpt: p.excerpt,
        image: p.image ?? "",
        author: p.author ?? "Editorial Team",
        category: (p.category as BlogCategory) ?? "Destinations",
        tags: p.tags ?? [],
        readTime: p.readTime ?? undefined,
        publishedAt: p.publishedAt ? new Date(p.publishedAt) : null,
        order: p.order ?? 1,
        isVisible: p.isVisible !== false,
    }
}

export default async function AdminBlogPage() {
    const { posts } = await BlogService.getAllPosts({
        page: 1,
        limit: 500,
        onlyVisible: false,
    })

    const initialPosts = posts.map(mapPost)

    const total = initialPosts.length
    const published = initialPosts.filter((p) => p.isVisible && p.publishedAt).length
    const drafts = initialPosts.filter((p) => !p.isVisible || !p.publishedAt).length

    const byCategory = initialPosts.reduce<Record<string, number>>((acc, p) => {
        acc[p.category] = (acc[p.category] ?? 0) + 1
        return acc
    }, {})

    return (
        <AdminBlogDashboardClient
            initialPosts={initialPosts}
            kpis={{ total, published, drafts, byCategory }}
        />
    )
}
