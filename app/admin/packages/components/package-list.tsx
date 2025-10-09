"use client"

import React, {useEffect} from "react"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit2, Trash2, GripVertical, Eye, EyeOff } from "lucide-react"
import { EditPackageDialog } from "./edit-package-dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
    deletePackageAction,
    togglePackageVisibilityAction,
    updatePackageOrderAction,
} from "@/app/actions/admin/packages"

type Category = "standard" | "featured" | "special" | "lastminute"

interface Package {
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
}

interface PackageListProps {
    category: "all" | Category
    initialPackages: Package[]
}

export function PackageList({ category, initialPackages }: PackageListProps) {
    const [packages, setPackages] = useState<Package[]>(
        () => initialPackages.slice().sort((a, b) => a.order - b.order)
    )
    const [editingPackage, setEditingPackage] = useState<Package | null>(null)
    const [draggedItem, setDraggedItem] = useState<string | null>(null)
    const [busyId, setBusyId] = useState<string | null>(null)

    // when parent passes a new initialPackages (e.g. after hard refresh), sync once
    useEffect(() => {
        setPackages(initialPackages.slice().sort((a, b) => a.order - b.order))
    }, [initialPackages])

    const sorted = useMemo(() => {
        const filtered = category === "all" ? packages : packages.filter((p) => p.category === category)
        return filtered.slice().sort((a, b) => a.order - b.order)
    }, [packages, category])

    async function handleDelete(id: string) {
        const prev = packages
        setPackages((list) => list.filter((p) => p.id !== id))
        try {
            setBusyId(id)
            const res = await deletePackageAction(id)
            if (!res?.success) throw new Error(res?.message || "Delete failed")
        } catch (e) {
            setPackages(prev)
            console.error(e)
        } finally {
            setBusyId(null)
        }
    }

    async function handleToggleVisibility(id: string) {
        const prev = packages
        setPackages((list) => list.map((p) => (p.id === id ? { ...p, isVisible: !p.isVisible } : p)))
        try {
            const pkg = prev.find((p) => p.id === id)!
            setBusyId(id)
            const res = await togglePackageVisibilityAction(id, !pkg.isVisible)
            if (!res?.success) throw new Error(res?.message || "Visibility update failed")
        } catch (e) {
            setPackages(prev)
            console.error(e)
        } finally {
            setBusyId(null)
        }
    }

    function handleDragStart(id: string) {
        setDraggedItem(id)
    }
    function handleDragOver(e: React.DragEvent) {
        e.preventDefault()
    }
    async function handleDrop(targetId: string) {
        if (!draggedItem || draggedItem === targetId) return
        const current = packages.slice()
        const draggedIndex = current.findIndex((p) => p.id === draggedItem)
        const targetIndex = current.findIndex((p) => p.id === targetId)
        if (draggedIndex < 0 || targetIndex < 0) {
            setDraggedItem(null)
            return
        }
        const next = current.slice()
        const [dragged] = next.splice(draggedIndex, 1)
        next.splice(targetIndex, 0, dragged)
        const reOrdered = next.map((p, i) => ({ ...p, order: i + 1 }))
        setPackages(reOrdered)
        setDraggedItem(null)
        try {
            const payload = reOrdered.map((p) => ({ id: p.id, order: p.order }))
            const res = await updatePackageOrderAction(payload)
            if (!res?.success) throw new Error(res?.message || "Order update failed")
        } catch (e) {
            console.error(e)
            setPackages(current)
        }
    }

    return (
        <div className="space-y-4">
            {sorted.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <p className="text-muted-foreground">No packages found in this category</p>
                    </CardContent>
                </Card>
            ) : (
                sorted.map((pkg) => (
                    <Card
                        key={pkg.id}
                        draggable
                        onDragStart={() => handleDragStart(pkg.id)}
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop(pkg.id)}
                        className={`transition-all ${draggedItem === pkg.id ? "opacity-50" : ""} ${
                            !pkg.isVisible ? "border-dashed opacity-60" : ""
                        }`}
                    >
                        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                            <div className="cursor-grab active:cursor-grabbing">
                                <GripVertical className="h-5 w-5 text-gray-400" />
                            </div>

                            <img
                                src={pkg.image || "/placeholder.svg"}
                                alt={pkg.title}
                                className="w-24 h-24 object-cover rounded-lg"
                            />

                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-xl font-semibold">{pkg.title}</h3>
                                    <Badge variant={pkg.category === "featured" ? "default" : "secondary"}>
                                        {pkg.category}
                                    </Badge>
                                    {!pkg.isVisible && <Badge variant="outline">Hidden</Badge>}
                                </div>

                                <p className="text-sm text-gray-600">{pkg.destination}</p>

                                <div className="flex gap-4 mt-2 text-sm">
                                    <span className="text-primary font-semibold">€{pkg.price}</span>
                                    <span className="text-gray-600">{pkg.duration}</span>
                                    <span className="text-gray-600">Order: {pkg.order}</span>
                                </div>
                            </div>
                        </CardHeader>

                        <CardFooter className="flex gap-2 justify-end border-t pt-4">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleToggleVisibility(pkg.id)}
                                disabled={busyId === pkg.id}
                            >
                                {pkg.isVisible ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
                                {pkg.isVisible ? "Hide" : "Show"}
                            </Button>

                            <Button variant="outline" size="sm" onClick={() => setEditingPackage(pkg)} disabled={busyId === pkg.id}>
                                <Edit2 className="h-4 w-4 mr-2" />
                                Edit
                            </Button>

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="sm" disabled={busyId === pkg.id}>
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Delete Package</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to delete "{pkg.title}"? This action cannot be undone.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDelete(pkg.id)}>Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </CardFooter>
                    </Card>
                ))
            )}

            {editingPackage && (
                <EditPackageDialog
                    package={editingPackage}
                    open={!!editingPackage}
                    onOpenChange={(open) => !open && setEditingPackage(null)}
                    onSave={(updated) => {
                        setPackages((list) => list.map((p) => (p.id === updated.id ? updated : p)))
                        setEditingPackage(null)
                    }}
                />
            )}
        </div>
    )
}
