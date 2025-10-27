// app/admin/packages/components/add-package-form.tsx
"use client"

import React, { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, X } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { createPackageAction } from "@/app/actions/admin/packages"
import { uploadToCloudinary } from "@/lib/cloudinary"

import {
    Category,
    PackageFormValues,
    initialFormValues,
    toPackagePayload,
    validateRequired,
} from "@/app/admin/packages/components/form-shared"

function FieldArray({...props}: {
    label: string
    items: string[]
    onAdd: () => void
    onRemove: (index: number) => void
    onUpdate: (index: number, value: string) => void
    placeholder: string
}) {
    const { label, items, onAdd, onRemove, onUpdate, placeholder } = props
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
                            <Button type="button" onClick={() => onRemove(index)} size="icon" variant="destructive" aria-label="Remove">
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

type AddPackageFormProps = { onCreated?: (id: string) => void }

export function AddPackageForm({ onCreated }: AddPackageFormProps) {
    const [form, setForm] = useState<PackageFormValues>(initialFormValues)
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()
    const [isUploading, setIsUploading] = useState(false)

    const onChange =
        <K extends keyof PackageFormValues>(key: K) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                setForm((f) => ({ ...f, [key]: e.target.value }))

    const onSelectChange =
        <K extends keyof PackageFormValues>(key: K) =>
            (value: any) =>
                setForm((f) => ({ ...f, [key]: value }))

    const addItem = (key: "highlights" | "included") => setForm((f) => ({ ...f, [key]: [...f[key], ""] }))
    const removeItem = (key: "highlights" | "included", index: number) =>
        setForm((f) => ({ ...f, [key]: f[key].filter((_, i) => i !== index) }))
    const updateItem = (key: "highlights" | "included", index: number, value: string) =>
        setForm((f) => {
            const next = [...f[key]]
            next[index] = value
            return { ...f, [key]: next }
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        const payload = toPackagePayload(form)
        const msg = validateRequired(payload)
        if (msg) {
            setError(msg)
            return
        }
        if (isUploading) {
            setError("Image is still uploading. Please wait a moment.")
            return
        }

        startTransition(async () => {
            const res = await createPackageAction(payload)
            if (!res?.success) {
                setError("Failed to create package.")
                return
            }
            setForm(initialFormValues)
            onCreated?.(res.id as string)
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
                        <Label htmlFor="title">Package Title *</Label>
                        <Input id="title" value={form.title} onChange={onChange("title")} placeholder="e.g., Discover Sardinia" required />
                    </div>

                    <div>
                        <Label htmlFor="location">Location *</Label>
                        <Input id="location" value={form.location} onChange={onChange("location")} placeholder="Sardinia, Italy" required />
                    </div>

                    <div>
                        <Label htmlFor="duration">Duration *</Label>
                        <Input id="duration" value={form.duration} onChange={onChange("duration")} placeholder="10 days" required />
                    </div>

                    <div>
                        <Label htmlFor="category">Category *</Label>
                        <Select value={form.category} onValueChange={onSelectChange("category")}>
                            <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="standard">Standard</SelectItem>
                                <SelectItem value="featured">Featured</SelectItem>
                                <SelectItem value="special">Special Offer</SelectItem>
                                <SelectItem value="lastminute">Last Minute</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <Label htmlFor="price">Price (€) *</Label>
                        <Input id="price" type="number" inputMode="decimal" value={form.price} onChange={onChange("price")} placeholder="1500" required />
                    </div>

                    <div>
                        <Label htmlFor="originalPrice">Original Price (€) — Optional</Label>
                        <Input id="originalPrice" type="number" inputMode="decimal" value={form.originalPrice} onChange={onChange("originalPrice")} placeholder="1800" />
                    </div>

                    <div>
                        <Label htmlFor="rating">Rating *</Label>
                        <Input id="rating" type="number" step="0.1" min={0} max={5} value={form.rating} onChange={onChange("rating")} required />
                    </div>

                    <div>
                        <Label htmlFor="reviews">Number of Reviews *</Label>
                        <Input id="reviews" type="number" inputMode="numeric" value={form.reviews} onChange={onChange("reviews")} placeholder="87" required />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div>
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select value={form.difficulty} onValueChange={onSelectChange("difficulty")}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Easy">Easy</SelectItem>
                            <SelectItem value="Moderate">Moderate</SelectItem>
                            <SelectItem value="Challenging">Challenging</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="groupSize">Group Size</Label>
                    <Input id="groupSize" value={form.groupSize} onChange={onChange("groupSize")} placeholder="2-8 people" />
                </div>

                <div>
                    <Label htmlFor="order">Display Order</Label>
                    <Input id="order" type="number" min={1} value={form.order} onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value || 1) }))} />
                </div>

                <div className="h-10 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="isSeasonal">Seasonal</Label>
                        <Checkbox id="isSeasonal" checked={form.isSeasonal} onCheckedChange={(v) => setForm((f) => ({ ...f, isSeasonal: !!v }))} />
                    </div>
                    <div className="flex items-center gap-2">
                        <Label htmlFor="isVisible">Visible</Label>
                        <Checkbox id="isVisible" checked={form.isVisible} onCheckedChange={(v) => setForm((f) => ({ ...f, isVisible: !!v }))} />
                    </div>
                </div>
            </div>

            <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea id="description" value={form.description} onChange={onChange("description")} placeholder="Describe the package..." rows={4} required />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="imageFile">Image *</Label>
                <Input id="imageFile" type="file" accept="image/*" onChange={onPickFile} />
                {isUploading && <div className="text-xs text-muted-foreground">Uploading…</div>}
                {form.image && (
                    <>
                        <div className="text-xs text-muted-foreground break-all">{form.image}</div>
                        <Input value={form.image} onChange={(e) => setForm((s) => ({ ...s, image: e.target.value }))} placeholder="https://res.cloudinary.com/..." />
                    </>
                )}
            </div>

            <FieldArray
                label="Highlights (shown as badges)"
                items={form.highlights}
                onAdd={() => addItem("highlights")}
                onRemove={(i) => removeItem("highlights", i)}
                onUpdate={(i, v) => updateItem("highlights", i, v)}
                placeholder="Flight & Transfers"
            />

            <FieldArray
                label="What's Included (detailed list)"
                items={form.included}
                onAdd={() => addItem("included")}
                onRemove={(i) => removeItem("included", i)}
                onUpdate={(i, v) => updateItem("included", i, v)}
                placeholder="Round-trip flights & transfers"
            />

            <div className="flex justify-end gap-4 pt-4 border-t">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                        setForm(initialFormValues)
                        setError(null)
                    }}
                    disabled={isPending || isUploading}
                >
                    Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isPending || isUploading}>
                    {isPending ? "Creating..." : "Create Package"}
                </Button>
            </div>
        </form>
    )
}
