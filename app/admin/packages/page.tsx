// app/admin/page.tsx
import { PackageService } from "@/lib/services/packageService"
import AdminDashboardClient from "@/app/admin/packages/components/AdminDashboardClient"

// map DB doc -> UI item used by PackageList
function mapPkg(p: any) {
    return {
        id: String(p._id),
        title: p.title,
        destination: p.location, // UI shows "destination"
        price: p.price,
        duration: p.duration,
        category: p.category, // "standard" | "featured" | "special" | "lastminute"
        image: p.image,
        description: p.description,
        order: p.order ?? 1,
        isVisible: p.isVisible !== false,
    }
}

export default async function AdminPage() {
    const { packages } = await PackageService.getAllPackages({ page: 1, limit: 500 })
    const initialPackages = packages.map(mapPkg)

    const total = initialPackages.length
    const featured = initialPackages.filter((p) => p.category === "featured").length
    const special = initialPackages.filter((p) => p.category === "special").length
    const lastminute = initialPackages.filter((p) => p.category === "lastminute").length

    return (
        <AdminDashboardClient
            initialPackages={initialPackages}
            kpis={{ total, featured, special, lastminute }}
        />
    )
}
