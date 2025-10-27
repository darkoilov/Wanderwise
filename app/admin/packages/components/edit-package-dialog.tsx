// "use client"
//
// import React, {useEffect} from "react"
// import { useState, useTransition } from "react"
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import {updatePackageAction} from "@/app/actions/admin/packages";
//
// interface Package {
//     id: string
//     title: string
//     destination: string        // maps -> location (backend)
//     price: number
//     duration: string
//     category: "standard" | "featured" | "special" | "lastminute"
//     image: string
//     description: string
//     order: number
//     isVisible: boolean
// }
//
// interface EditPackageDialogProps {
//     package: Package
//     open: boolean
//     onOpenChange: (open: boolean) => void
//     onSave: (pkg: Package) => void
// }
//
// export function EditPackageDialog({ package: pkg, open, onOpenChange, onSave }: EditPackageDialogProps) {
//     const [formData, setFormData] = useState<Package>(pkg)
//     const [error, setError] = useState<string | null>(null)
//     const [isPending, startTransition] = useTransition()
//
//     // keep local state in sync if parent passes a new pkg
//     useEffect(() => {
//         if (open) setFormData(pkg)
//     }, [open, pkg])
//
//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault()
//         setError(null)
//
//         // Build payload expected by AdminPackageService.updatePackage
//         const payload = {
//             title: formData.title.trim(),
//             location: formData.destination.trim(),          // ← map
//             duration: formData.duration.trim(),
//             price: Number.isFinite(Number(formData.price)) ? Number(formData.price) : undefined,
//             category: formData.category,
//             image: formData.image.trim(),
//             description: formData.description.trim(),
//             order: Number.isFinite(Number(formData.order)) ? Number(formData.order) : undefined,
//             isVisible: !!formData.isVisible,
//         }
//
//         // quick guard
//         if (!payload.title || !payload.location || !payload.duration || !payload.price || !payload.image) {
//             setError("Please fill all required fields correctly.")
//             return
//         }
//
//         startTransition(async () => {
//             const res = await updatePackageAction(formData.id, payload)
//             if (!res?.success) {
//                 setError(res?.message || "Failed to update package.")
//                 return
//             }
//             // optimistic local update for parent list
//             onSave(formData)
//             onOpenChange(false)
//         })
//     }
//
//     return (
//         <Dialog open={open} onOpenChange={onOpenChange}>
//             <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
//                 <DialogHeader>
//                     <DialogTitle>Edit Package</DialogTitle>
//                     <DialogDescription>Update package information</DialogDescription>
//                 </DialogHeader>
//
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     {error && (
//                         <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
//                             {error}
//                         </div>
//                     )}
//
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                             <Label htmlFor="edit-title">Title</Label>
//                             <Input
//                                 id="edit-title"
//                                 value={formData.title}
//                                 onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                                 required
//                             />
//                         </div>
//
//                         <div>
//                             <Label htmlFor="edit-destination">Destination</Label>
//                             <Input
//                                 id="edit-destination"
//                                 value={formData.destination}
//                                 onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
//                                 required
//                             />
//                         </div>
//
//                         <div>
//                             <Label htmlFor="edit-duration">Duration</Label>
//                             <Input
//                                 id="edit-duration"
//                                 value={formData.duration}
//                                 onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
//                                 required
//                             />
//                         </div>
//
//                         <div>
//                             <Label htmlFor="edit-price">Price (€)</Label>
//                             <Input
//                                 id="edit-price"
//                                 type="number"
//                                 value={formData.price}
//                                 onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
//                                 required
//                             />
//                         </div>
//
//                         <div>
//                             <Label htmlFor="edit-category">Category</Label>
//                             <Select
//                                 value={formData.category}
//                                 onValueChange={(value: "standard" | "featured" | "special" | "lastminute") =>
//                                     setFormData({ ...formData, category: value })
//                                 }
//                             >
//                                 <SelectTrigger>
//                                     <SelectValue />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectItem value="standard">Standard</SelectItem>
//                                     <SelectItem value="featured">Featured</SelectItem>
//                                     <SelectItem value="special">Special</SelectItem>
//                                     <SelectItem value="lastminute">Last Minute</SelectItem>
//                                 </SelectContent>
//                             </Select>
//                         </div>
//
//                         <div>
//                             <Label htmlFor="edit-order">Display Order</Label>
//                             <Input
//                                 id="edit-order"
//                                 type="number"
//                                 value={formData.order}
//                                 onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) || 1 })}
//                                 min={1}
//                             />
//                         </div>
//                     </div>
//
//                     <div>
//                         <Label htmlFor="edit-description">Description</Label>
//                         <Textarea
//                             id="edit-description"
//                             value={formData.description}
//                             onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                             rows={4}
//                         />
//                     </div>
//
//                     <div>
//                         <Label htmlFor="edit-image">Image URL</Label>
//                         <Input
//                             id="edit-image"
//                             value={formData.image}
//                             onChange={(e) => setFormData({ ...formData, image: e.target.value })}
//                         />
//                     </div>
//
//                     <div className="flex justify-end gap-4 pt-4 border-t">
//                         <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
//                             Cancel
//                         </Button>
//                         <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isPending}>
//                             {isPending ? "Saving..." : "Save Changes"}
//                         </Button>
//                     </div>
//                 </form>
//             </DialogContent>
//         </Dialog>
//     )
// }




// app/admin/packages/components/edit-package-dialog.tsx
"use client"

import React, { useEffect, useState, useTransition } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, X } from "lucide-react"
import { updatePackageAction } from "@/app/actions/admin/packages"
import { uploadToCloudinary } from "@/lib/cloudinary"

import {
    Category,
    PackageFormValues,
    initialFormValues,
    toPackagePayload,
    validateRequired,
} from "@/app/admin/packages/components/form-shared"

type UIPackage = {
    id: string
    title: string
    destination: string
    price: number
    duration: string
    category: Category
    image: string
    description: string
    order: number
    isVisible: boolean
    // Optional extras if present in DB; used to prefill
    rating?: number
    reviews?: number
    originalPrice?: number
    highlights?: string[]
    included?: string[]
    difficulty?: "Easy" | "Moderate" | "Challenging"
    groupSize?: string
    isSeasonal?: boolean
}

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

interface EditPackageDialogProps {
    package: UIPackage
    open: boolean
    onOpenChange: (open: boolean) => void
    onSave: (pkg: UIPackage) => void
}

export function EditPackageDialog({ package: pkg, open, onOpenChange, onSave }: EditPackageDialogProps) {
    // Convert incoming package -> shared form values
    const hydrate = (p: UIPackage): PackageFormValues => ({
        ...initialFormValues,
        title: p.title ?? "",
        location: p.destination ?? "",
        duration: p.duration ?? "",
        price: String(p.price ?? ""),
        originalPrice: p.originalPrice != null ? String(p.originalPrice) : "",
        image: p.image ?? "",
        rating: p.rating != null ? String(p.rating) : "4.5",
        reviews: p.reviews != null ? String(p.reviews) : "",
        category: p.category ?? "standard",
        description: p.description ?? "",
        highlights: p.highlights && p.highlights.length ? p.highlights : [""],
        included: p.included && p.included.length ? p.included : [""],
        difficulty: p.difficulty ?? "Easy",
        groupSize: p.groupSize ?? "",
        order: p.order ?? 1,
        isSeasonal: !!p.isSeasonal,
        isVisible: !!p.isVisible,
    })

    const [form, setForm] = useState<PackageFormValues>(hydrate(pkg))
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()
    const [isUploading, setIsUploading] = useState(false)

    useEffect(() => {
        if (open) setForm(hydrate(pkg))
    }, [open, pkg])

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
            const res = await updatePackageAction(pkg.id, payload)
            if (!res?.success) {
                setError(res?.message || "Failed to update package.")
                return
            }
            // reflect changes to parent list shape (convert back to UIPackage)
            onSave({
                ...pkg,
                title: payload.title,
                destination: payload.location,
                duration: payload.duration,
                price: payload.price as number,
                category: payload.category,
                image: payload.image,
                description: payload.description,
                order: payload.order,
                isVisible: payload.isVisible,
                // optional extras kept if your list uses them later
                rating: payload.rating,
                reviews: payload.reviews,
                originalPrice: payload.originalPrice,
                highlights: payload.highlights,
                included: payload.included,
                difficulty: payload.difficulty,
                groupSize: payload.groupSize,
                isSeasonal: payload.isSeasonal,
            })
            onOpenChange(false)
        })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Package</DialogTitle>
                    <DialogDescription>Update package information</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="edit-title">Title *</Label>
                                <Input id="edit-title" value={form.title} onChange={onChange("title")} required />
                            </div>

                            <div>
                                <Label htmlFor="edit-location">Location *</Label>
                                <Input id="edit-location" value={form.location} onChange={onChange("location")} required />
                            </div>

                            <div>
                                <Label htmlFor="edit-duration">Duration *</Label>
                                <Input id="edit-duration" value={form.duration} onChange={onChange("duration")} required />
                            </div>

                            <div>
                                <Label htmlFor="edit-category">Category *</Label>
                                <Select value={form.category} onValueChange={onSelectChange("category")}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
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
                                <Label htmlFor="edit-price">Price (€) *</Label>
                                <Input id="edit-price" type="number" inputMode="decimal" value={form.price} onChange={onChange("price")} required />
                            </div>

                            <div>
                                <Label htmlFor="edit-originalPrice">Original Price (€) — Optional</Label>
                                <Input id="edit-originalPrice" type="number" inputMode="decimal" value={form.originalPrice} onChange={onChange("originalPrice")} />
                            </div>

                            <div>
                                <Label htmlFor="edit-rating">Rating *</Label>
                                <Input id="edit-rating" type="number" step="0.1" min={0} max={5} value={form.rating} onChange={onChange("rating")} required />
                            </div>

                            <div>
                                <Label htmlFor="edit-reviews">Number of Reviews *</Label>
                                <Input id="edit-reviews" type="number" inputMode="numeric" value={form.reviews} onChange={onChange("reviews")} required />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div>
                            <Label>Difficulty</Label>
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
                            <Label htmlFor="edit-groupSize">Group Size</Label>
                            <Input id="edit-groupSize" value={form.groupSize} onChange={onChange("groupSize")} />
                        </div>

                        <div>
                            <Label htmlFor="edit-order">Display Order</Label>
                            <Input id="edit-order" type="number" min={1} value={form.order} onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value || 1) }))} />
                        </div>

                        <div className="h-10 flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Label htmlFor="edit-isSeasonal">Seasonal</Label>
                                <Checkbox id="edit-isSeasonal" checked={form.isSeasonal} onCheckedChange={(v) => setForm((f) => ({ ...f, isSeasonal: !!v }))} />
                            </div>
                            <div className="flex items-center gap-2">
                                <Label htmlFor="edit-isVisible">Visible</Label>
                                <Checkbox id="edit-isVisible" checked={form.isVisible} onCheckedChange={(v) => setForm((f) => ({ ...f, isVisible: !!v }))} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="edit-description">Description *</Label>
                        <Textarea id="edit-description" value={form.description} onChange={onChange("description")} rows={4} required />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="edit-imageFile">Image *</Label>
                        <Input id="edit-imageFile" type="file" accept="image/*" onChange={onPickFile} />
                        {isUploading && <div className="text-xs text-muted-foreground">Uploading…</div>}
                        {form.image && (
                            <>
                                <div className="text-xs text-muted-foreground break-all">{form.image}</div>
                                <Input value={form.image} onChange={(e) => setForm((s) => ({ ...s, image: e.target.value }))} />
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
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>Cancel</Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isPending || isUploading}>
                            {isPending ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
