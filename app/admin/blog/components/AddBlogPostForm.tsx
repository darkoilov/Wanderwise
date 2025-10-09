"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, X } from "lucide-react"
import { createBlogPostAction } from "@/app/actions/admin/blog"
import { uploadToCloudinary } from "@/lib/cloudinary"

const CATEGORIES = ["Destinations", "Travel Tips", "Solo Travel", "Food & Culture", "Budget Travel", "Photography", "Sustainable Travel"] as const
type Category = (typeof CATEGORIES)[number]

type FormState = {
    title: string
    excerpt: string
    content: string
    image: string
    author: string
    category: Category
    tags: string[]
    readTime?: string
    publishedAt?: string // ISO (input type="date")
    order: number
    isVisible: boolean
}

const initialState: FormState = {
    title: "",
    excerpt: "",
    content: "",
    image: "",
    author: "Editorial Team",
    category: "Destinations",
    tags: [""],
    readTime: "",
    publishedAt: "",
    order: 1,
    isVisible: true,
}

function FieldArray({
                        label,
                        items,
                        onAdd,
                        onRemove,
                        onUpdate,
                        placeholder,
                    }: {
    label: string
    items: string[]
    onAdd: () => void
    onRemove: (index: number) => void
    onUpdate: (index: number, value: string) => void
    placeholder: string
}) {
    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <Label>{label}</Label>
                <Button type="button" onClick={onAdd} size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                </Button>
            </div>
            <div className="space-y-2">
                {items.map((val, index) => (
                    <div key={index} className="flex gap-2">
                        <Input value={val} onChange={(e) => onUpdate(index, e.target.value)} placeholder={placeholder} />
                        {items.length > 1 && (
                            <Button
                                type="button"
                                onClick={() => onRemove(index)}
                                size="icon"
                                variant="destructive"
                                aria-label="Remove"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export function AddBlogPostForm() {
    const [form, setForm] = useState<FormState>(initialState)
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()
    const [isUploading, setIsUploading] = useState(false)

    const onChange =
        <K extends keyof FormState>(key: K) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                setForm((f) => ({ ...f, [key]: e.target.value }))

    const onSelectChange =
        <K extends keyof FormState>(key: K) =>
            (value: any) =>
                setForm((f) => ({ ...f, [key]: value }))

    const addItem = () => setForm((f) => ({ ...f, tags: [...f.tags, ""] }))
    const removeItem = (index: number) =>
        setForm((f) => ({ ...f, tags: f.tags.filter((_, i) => i !== index) }))
    const updateItem = (index: number, value: string) =>
        setForm((f) => {
            const next = [...f.tags]
            next[index] = value
            return { ...f, tags: next }
        })

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

    function compact(arr: string[]) {
        return arr.map((s) => s.trim()).filter(Boolean)
    }

    function toISODate(d?: string) {
        if (!d) return undefined
        // input type="date" returns "YYYY-MM-DD"
        try {
            const iso = new Date(d).toISOString()
            return iso
        } catch {
            return undefined
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        const payload = {
            title: form.title.trim(),
            excerpt: form.excerpt.trim(),
            content: form.content.trim(),
            image: form.image.trim(),
            author: form.author.trim() || "Editorial Team",
            category: form.category,
            tags: compact(form.tags),
            readTime: form.readTime ? Number(form.readTime) : undefined,
            publishedAt: toISODate(form.publishedAt),
            order: Number.isFinite(Number(form.order)) ? Number(form.order) : 1,
            isVisible: !!form.isVisible,
        }

        if (!payload.title || !payload.content || !payload.category) {
            setError("Title, content and category are required.")
            return
        }
        if (isUploading) {
            setError("Image is still uploading. Please wait a moment.")
            return
        }

        startTransition(async () => {
            const res = await createBlogPostAction(payload)
            if (!res?.success) {
                setError(res?.message || "Failed to create post.")
                return
            }
            setForm(initialState)
        })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="title">Title *</Label>
                        <Input id="title" value={form.title} onChange={onChange("title")} placeholder="Post title" required />
                    </div>

                    <div>
                        <Label htmlFor="excerpt">Excerpt</Label>
                        <Textarea id="excerpt" value={form.excerpt} onChange={onChange("excerpt")} rows={3} />
                    </div>

                    <div>
                        <Label htmlFor="author">Author</Label>
                        <Input id="author" value={form.author} onChange={onChange("author")} placeholder="Editorial Team" />
                    </div>

                    <div>
                        <Label htmlFor="category">Category *</Label>
                        <Select value={form.category} onValueChange={onSelectChange("category")}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
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
                </div>

                <div className="space-y-4">
                    <div>
                        <Label htmlFor="readTime">Read time (min)</Label>
                        <Input id="readTime" type="number" inputMode="numeric" value={form.readTime} onChange={onChange("readTime")} />
                    </div>

                    <div>
                        <Label htmlFor="publishedAt">Publish date</Label>
                        <Input id="publishedAt" type="date" value={form.publishedAt} onChange={onChange("publishedAt")} />
                    </div>

                    <div>
                        <Label htmlFor="order">Display Order</Label>
                        <Input
                            id="order"
                            type="number"
                            min={1}
                            value={form.order}
                            onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value || 1) }))}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="imageFile">Hero Image</Label>
                        <Input id="imageFile" type="file" accept="image/*" onChange={onPickFile} />
                        {isUploading && <div className="text-xs text-muted-foreground">Uploading…</div>}
                        {form.image && (
                            <>
                                <div className="text-xs text-muted-foreground break-all">{form.image}</div>
                                <Input
                                    value={form.image}
                                    onChange={(e) => setForm((s) => ({ ...s, image: e.target.value }))}
                                    placeholder="https://res.cloudinary.com/..."
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div>
                <Label htmlFor="content">Content *</Label>
                <Textarea id="content" value={form.content} onChange={onChange("content")} rows={10} required />
            </div>

            <FieldArray
                label="Tags"
                items={form.tags}
                onAdd={addItem}
                onRemove={removeItem}
                onUpdate={updateItem}
                placeholder="e.g., Japan"
            />

            <div className="flex items-center gap-2">
                <input
                    id="isVisible"
                    type="checkbox"
                    checked={form.isVisible}
                    onChange={(e) => setForm((s) => ({ ...s, isVisible: e.target.checked }))}
                />
                <Label htmlFor="isVisible">Visible</Label>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                        setForm(initialState)
                        setError(null)
                    }}
                    disabled={isPending || isUploading}
                >
                    Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isPending || isUploading}>
                    {isPending ? "Creating..." : "Create Post"}
                </Button>
            </div>
        </form>
    )
}
