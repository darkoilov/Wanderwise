//app/actions/admin/package.tsx
"use server"

import { revalidatePath } from "next/cache"
import { AdminPackageService } from "@/lib/adminServices/AdminPackageService"

async function requireAdmin() {
    return true
}

export async function createPackageAction(data: any) {
    await requireAdmin()
    const doc = await AdminPackageService.createPackage(data)
    revalidatePath("/admin/packages")
    return { success: true, id: String(doc._id) }
}

export async function updatePackageAction(id: string, data: any) {
    await requireAdmin()
    const ok = await AdminPackageService.updatePackage(id, data)
    if (!ok) return { success: false, message: "Package not found or unchanged" }
    revalidatePath("/admin/packages")
    return { success: true }
}

export async function deletePackageAction(id: string) {
    await requireAdmin()
    const ok = await AdminPackageService.deletePackage(id)
    if (!ok) return { success: false, message: "Package not found" }
    revalidatePath("/admin/packages")
    return { success: true }
}

export async function updatePackageOrderAction(items: Array<{ id: string; order: number }>) {
    await requireAdmin()
    const modified = await AdminPackageService.updatePackageOrder(items)
    revalidatePath("/admin/packages")
    return { success: true, modified }
}

export async function togglePackageVisibilityAction(id: string, isVisible: boolean) {
    await requireAdmin()
    const ok = await AdminPackageService.togglePackageVisibility(id, isVisible)
    if (!ok) return { success: false, message: "Package not found" }
    revalidatePath("/admin/packages")
    return { success: true }
}
