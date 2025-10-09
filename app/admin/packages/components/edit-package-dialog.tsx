"use client"

import React, {useEffect} from "react"
import { useState, useTransition } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {updatePackageAction} from "@/app/actions/admin/packages";

interface Package {
    id: string
    title: string
    destination: string        // maps -> location (backend)
    price: number
    duration: string
    category: "standard" | "featured" | "special" | "lastminute"
    image: string
    description: string
    order: number
    isVisible: boolean
}

interface EditPackageDialogProps {
    package: Package
    open: boolean
    onOpenChange: (open: boolean) => void
    onSave: (pkg: Package) => void
}

export function EditPackageDialog({ package: pkg, open, onOpenChange, onSave }: EditPackageDialogProps) {
    const [formData, setFormData] = useState<Package>(pkg)
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()

    // keep local state in sync if parent passes a new pkg
    useEffect(() => {
        if (open) setFormData(pkg)
    }, [open, pkg])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        // Build payload expected by AdminPackageService.updatePackage
        const payload = {
            title: formData.title.trim(),
            location: formData.destination.trim(),          // ← map
            duration: formData.duration.trim(),
            price: Number.isFinite(Number(formData.price)) ? Number(formData.price) : undefined,
            category: formData.category,
            image: formData.image.trim(),
            description: formData.description.trim(),
            order: Number.isFinite(Number(formData.order)) ? Number(formData.order) : undefined,
            isVisible: !!formData.isVisible,
        }

        // quick guard
        if (!payload.title || !payload.location || !payload.duration || !payload.price || !payload.image) {
            setError("Please fill all required fields correctly.")
            return
        }

        startTransition(async () => {
            const res = await updatePackageAction(formData.id, payload)
            if (!res?.success) {
                setError(res?.message || "Failed to update package.")
                return
            }
            // optimistic local update for parent list
            onSave(formData)
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="edit-title">Title</Label>
                            <Input
                                id="edit-title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="edit-destination">Destination</Label>
                            <Input
                                id="edit-destination"
                                value={formData.destination}
                                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="edit-duration">Duration</Label>
                            <Input
                                id="edit-duration"
                                value={formData.duration}
                                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="edit-price">Price (€)</Label>
                            <Input
                                id="edit-price"
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="edit-category">Category</Label>
                            <Select
                                value={formData.category}
                                onValueChange={(value: "standard" | "featured" | "special" | "lastminute") =>
                                    setFormData({ ...formData, category: value })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="standard">Standard</SelectItem>
                                    <SelectItem value="featured">Featured</SelectItem>
                                    <SelectItem value="special">Special</SelectItem>
                                    <SelectItem value="lastminute">Last Minute</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="edit-order">Display Order</Label>
                            <Input
                                id="edit-order"
                                type="number"
                                value={formData.order}
                                onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) || 1 })}
                                min={1}
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="edit-description">Description</Label>
                        <Textarea
                            id="edit-description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={4}
                        />
                    </div>

                    <div>
                        <Label htmlFor="edit-image">Image URL</Label>
                        <Input
                            id="edit-image"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        />
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isPending}>
                            {isPending ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
