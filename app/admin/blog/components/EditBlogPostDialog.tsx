"use client"

import { useEffect, useState, useTransition } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { uploadToCloudinary } from "@/lib/cloudinary"
import { updateBlogPostAction } from "@/app/actions/admin/blog"

const CATEGORIES = ["Destinations", "Travel Tips", "Solo Travel", "Food & Culture", "Budget Travel", "Photography", "Sustainable Travel"] as const
type Category = (typeof CATEGORIES)[number]

export type UIBlogPost = {
    id: string
    title: string
    excerpt?: string
    image?: string
    author: string
    category: string
    tags: string[]
    readTime?: number
    publishedAt: Date | null
    order: number
    isVisible: boolean
    content?: string
}

export function EditBlogPostDialog({
                                       post,
                                       open,
                                       onOpenChange,
                                       onSave,
                                   }: {
    post: UIBlogPost
    open: boolean
    onOpenChange: (open: boolean) => void
    onSave: (post: UIBlogPost) => void
}) {
    const [form, setForm] = useState<UIBlogPost>(post)
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()
    const [isUploading, setIsUploading] = useState(false)

    useEffect(() => {
        if (open) setForm(post)
    }, [open, post])

    async function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
        const f = e.target.files?.[0]
        if (!f) return
        if (!f.type.startsWith("image/")) return alert("Please select an image.")
        if (f.size > 8 * 1024 * 1024) return alert("Max 8MB.")
        try {
            setIsUploading(true)
            const url = await uploadToCloudinary(f)
            setForm((s) => ({ ...s, image: url }))
        } catch {
            alert("Cloud upload failed")
        } finally {
            setIsUploading(false)
        }
    }

    function toISODate(d?: string) {
        if (!d) return undefined
        try {
            return new Date(d).toISOString()
        } catch {
            return undefined
        }
    }

    function dateInputValue(d: Date | null) {
        if (!d) return ""
        const dt = new Date(d)
        const yyyy = dt.getFullYear()
        const mm = String(dt.getMonth() + 1).padStart(2, "0")
        const dd = String(dt.getDate()).padStart(2, "0")
        return `${yyyy}-${mm}-${dd}`
    }

    function compact(arr: string[]) {
        return arr.map((s) => s.trim()).filter(Boolean)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        const payload = {
            title: form.title.trim(),
            excerpt: (form.excerpt ?? "").trim(),
            content: (form.content ?? "").trim(),
            image: (form.image ?? "").trim(),
            author: (form.author ?? "").trim() || "Editorial Team",
            category: form.category as Category,
            tags: compact(form.tags ?? []),
            readTime: Number.isFinite(Number(form.readTime)) ? Number(form.readTime) : undefined,
            publishedAt: toISODate((document.getElementById("publishedAt") as HTMLInputElement)?.value),
            order: Number.isFinite(Number(form.order)) ? Number(form.order) : undefined,
            isVisible: !!form.isVisible,
        }

        if (!payload.title || !payload.content) {
            setError("Title and content are required.")
            return
        }
        if (isUploading) {
            setError("Image is still uploading. Please wait a moment.")
            return
        }

        startTransition(async () => {
            const res = await updateBlogPostAction(form.id, payload)
            if (!res?.success) {
                setError(res?.message || "Failed to update post.")
                return
            }
            onSave(form)
            onOpenChange(false)
        })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Post</DialogTitle>
                    <DialogDescription>Update blog post details</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                        </div>

                        <div>
                            <Label htmlFor="author">Author</Label>
                            <Input id="author" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
                        </div>

                        <div className="md:col-span-2">
                            <Label htmlFor="excerpt">Excerpt</Label>
                            <Textarea id="excerpt" value={form.excerpt ?? ""} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={3} />
                        </div>

                        <div className="md:col-span-2">
                            <Label htmlFor="content">Content</Label>
                            <Textarea id="content" value={form.content ?? ""} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={10} required />
                        </div>

                        <div>
                            <Label htmlFor="category">Category</Label>
                            <Select
                                value={form.category as Category}
                                onValueChange={(value: Category) => setForm({ ...form, category: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {CATEGORIES.map((c) => (
                                        <SelectItem key={c} value={c}>
                                            {c}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="readTime">Read time (min)</Label>
                            <Input
                                id="readTime"
                                type="number"
                                inputMode="numeric"
                                value={form.readTime ?? ("" as any)}
                                onChange={(e) => setForm({ ...form, readTime: Number(e.target.value) as any })}
                            />
                        </div>

                        <div>
                            <Label htmlFor="order">Display Order</Label>
                            <Input
                                id="order"
                                type="number"
                                min={1}
                                value={form.order}
                                onChange={(e) => setForm({ ...form, order: Number(e.target.value || 1) })}
                            />
                        </div>

                        <div>
                            <Label htmlFor="publishedAt">Publish date</Label>
                            <Input
                                id="publishedAt"
                                type="date"
                                defaultValue={dateInputValue(form.publishedAt)}
                            />
                        </div>

                        <div className="md:col-span-2 grid gap-2">
                            <Label htmlFor="imageFile">Hero Image</Label>
                            <Input id="imageFile" type="file" accept="image/*" onChange={onPickFile} />
                            {isUploading && <div className="text-xs text-muted-foreground">Uploading…</div>}
                            <Input
                                value={form.image ?? ""}
                                onChange={(e) => setForm((s) => ({ ...s, image: e.target.value }))}
                                placeholder="https://res.cloudinary.com/..."
                            />
                        </div>

                        <div className="md:col-span-2">
                            <Label>Tags</Label>
                            <Input
                                value={(form.tags || []).join(", ")}
                                onChange={(e) =>
                                    setForm({ ...form, tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })
                                }
                                placeholder="tag1, tag2"
                            />
                        </div>

                        <div className="md:col-span-2 flex items-center gap-2">
                            <input
                                id="isVisible"
                                type="checkbox"
                                checked={form.isVisible}
                                onChange={(e) => setForm((s) => ({ ...s, isVisible: e.target.checked }))}
                            />
                            <Label htmlFor="isVisible">Visible</Label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending || isUploading}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isPending || isUploading}>
                            {isPending ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
