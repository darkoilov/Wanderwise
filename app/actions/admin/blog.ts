// app/actions/admin/blog.ts
"use server"

import { AdminBlogService } from "@/lib/adminServices/AdminBlogServices"
import { revalidatePath } from "next/cache"

// TODO: replace with real auth check
async function requireAdmin() {
    // throw new Error("Unauthorized") if not admin
    return true
}

export async function createBlogPostAction(data: any) {
    await requireAdmin()
    const doc = await AdminBlogService.createPost(data)
    revalidatePath("/blog")
    revalidatePath("/") // if you surface featured on home
    return { success: true, id: String(doc._id) }
}

export async function updateBlogPostAction(id: string, data: any) {
    await requireAdmin()
    const ok = await AdminBlogService.updatePost(id, data)
    if (!ok) return { success: false, message: "Post not found or unchanged" }
    revalidatePath("/blog")
    revalidatePath("/")
    return { success: true }
}

export async function deleteBlogPostAction(id: string) {
    await requireAdmin()
    const ok = await AdminBlogService.deletePost(id)
    if (!ok) return { success: false, message: "Post not found" }
    revalidatePath("/blog")
    revalidatePath("/")
    return { success: true }
}

export async function toggleBlogVisibilityAction(id: string, isVisible: boolean) {
    await requireAdmin()
    const ok = await AdminBlogService.toggleVisibility(id, isVisible)
    if (!ok) return { success: false, message: "Post not found" }
    revalidatePath("/blog")
    revalidatePath("/")
    return { success: true }
}

export async function updateBlogOrderAction(items: Array<{ id: string; order: number }>) {
    await requireAdmin()
    const modified = await AdminBlogService.updateOrder(items)
    revalidatePath("/blog")
    revalidatePath("/")
    return { success: true, modified }
}
