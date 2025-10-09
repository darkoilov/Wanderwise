"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit2, Trash2, GripVertical, Eye, EyeOff, Calendar } from "lucide-react"
import { EditBlogPostDialog } from "@/app/admin/blog/components/EditBlogPostDialog"
import {
    deleteBlogPostAction,
    toggleBlogVisibilityAction,
    updateBlogOrderAction,
} from "@/app/actions/admin/blog"
import type { UIBlogPost } from "./AdminBlogDashboardClient"

export function BlogPostList({
                                 filter,
                                 initialPosts,
                             }: {
    filter: "all" | "published" | "drafts"
    initialPosts: UIBlogPost[]
}) {
    const [posts, setPosts] = useState<UIBlogPost[]>(() =>
        initialPosts.slice().sort((a, b) => a.order - b.order)
    )
    const [editing, setEditing] = useState<UIBlogPost | null>(null)
    const [draggedId, setDraggedId] = useState<string | null>(null)
    const [busyId, setBusyId] = useState<string | null>(null)

    useEffect(() => {
        setPosts(initialPosts.slice().sort((a, b) => a.order - b.order))
    }, [initialPosts])

    const sorted = useMemo(() => {
        let filtered = posts
        if (filter === "published") filtered = posts.filter((p) => p.isVisible && p.publishedAt)
        if (filter === "drafts") filtered = posts.filter((p) => !p.isVisible || !p.publishedAt)
        return filtered.slice().sort((a, b) => a.order - b.order)
    }, [posts, filter])

    async function handleDelete(id: string) {
        const prev = posts
        setPosts((list) => list.filter((p) => p.id !== id))
        try {
            setBusyId(id)
            const res = await deleteBlogPostAction(id)
            if (!res?.success) throw new Error(res?.message || "Delete failed")
        } catch (e) {
            setPosts(prev)
            console.error(e)
        } finally {
            setBusyId(null)
        }
    }

    async function handleToggleVisibility(id: string) {
        const prev = posts
        setPosts((list) => list.map((p) => (p.id === id ? { ...p, isVisible: !p.isVisible } : p)))
        try {
            const current = prev.find((p) => p.id === id)!
            setBusyId(id)
            const res = await toggleBlogVisibilityAction(id, !current.isVisible)
            if (!res?.success) throw new Error(res?.message || "Visibility update failed")
        } catch (e) {
            setPosts(prev)
            console.error(e)
        } finally {
            setBusyId(null)
        }
    }

    function onDragStart(id: string) {
        setDraggedId(id)
    }
    function onDragOver(e: React.DragEvent) {
        e.preventDefault()
    }
    async function onDrop(targetId: string) {
        if (!draggedId || draggedId === targetId) return

        const current = posts.slice()
        const a = current.findIndex((p) => p.id === draggedId)
        const b = current.findIndex((p) => p.id === targetId)
        if (a < 0 || b < 0) {
            setDraggedId(null)
            return
        }
        const next = current.slice()
        const [dragged] = next.splice(a, 1)
        next.splice(b, 0, dragged)

        const reOrdered = next.map((p, i) => ({ ...p, order: i + 1 }))
        setPosts(reOrdered)
        setDraggedId(null)

        try {
            const payload = reOrdered.map((p) => ({ id: p.id, order: p.order }))
            const res = await updateBlogOrderAction(payload)
            if (!res?.success) throw new Error(res?.message || "Order update failed")
        } catch (e) {
            console.error(e)
            setPosts(current)
        }
    }

    return (
        <div className="space-y-4">
            {sorted.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <p className="text-muted-foreground">No posts found</p>
                    </CardContent>
                </Card>
            ) : (
                sorted.map((post) => (
                    <Card
                        key={post.id}
                        draggable
                        onDragStart={() => onDragStart(post.id)}
                        onDragOver={onDragOver}
                        onDrop={() => onDrop(post.id)}
                        className={`transition-all ${draggedId === post.id ? "opacity-50" : ""} ${
                            !post.isVisible ? "border-dashed opacity-60" : ""
                        }`}
                    >
                        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                            <div className="cursor-grab active:cursor-grabbing">
                                <GripVertical className="h-5 w-5 text-gray-400" />
                            </div>

                            <img
                                src={post.image || "/placeholder.svg"}
                                alt={post.title}
                                className="w-24 h-24 object-cover rounded-lg"
                            />

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-xl font-semibold truncate">{post.title}</h3>
                                    <Badge variant="secondary">{post.category}</Badge>
                                    {!post.isVisible && <Badge variant="outline">Hidden</Badge>}
                                </div>

                                <p className="text-sm text-gray-600 line-clamp-1">{post.excerpt}</p>

                                <div className="flex gap-4 mt-2 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "Not set"}
                  </span>
                                    <span>Order: {post.order}</span>
                                    {post.tags?.length ? <span>Tags: {post.tags.slice(0, 3).join(", ")}{post.tags.length > 3 ? "…" : ""}</span> : null}
                                </div>
                            </div>
                        </CardHeader>

                        <CardFooter className="flex gap-2 justify-end border-t pt-4">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleToggleVisibility(post.id)}
                                disabled={busyId === post.id}
                            >
                                {post.isVisible ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
                                {post.isVisible ? "Hide" : "Show"}
                            </Button>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setEditing(post)}
                                disabled={busyId === post.id}
                            >
                                <Edit2 className="h-4 w-4 mr-2" />
                                Edit
                            </Button>

                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDelete(post.id)}
                                disabled={busyId === post.id}
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                            </Button>
                        </CardFooter>
                    </Card>
                ))
            )}

            {editing && (
                <EditBlogPostDialog
                    post={editing}
                    open={!!editing}
                    onOpenChange={(open) => !open && setEditing(null)}
                    onSave={(updated) => {
                        setPosts((list) => list.map((p) => (p.id === updated.id ? updated : p)))
                        setEditing(null)
                    }}
                />
            )}
        </div>
    )
}
