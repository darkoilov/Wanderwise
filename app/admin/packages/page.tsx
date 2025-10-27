// app/admin/page.tsx
import { PackageService } from "@/lib/services/packageService"
import AdminDashboardClient from "@/app/admin/packages/components/AdminDashboardClient"

// map DB doc -> UI item used by PackageList
// app/admin/page.tsx  (server file)
function mapPkg(p: any) {
    return {
        id: String(p._id),
        title: p.title,
        destination: p.location, // UI label
        price: p.price,
        originalPrice: p.originalPrice ?? null,          // ✅ add
        duration: p.duration,
        category: p.category,
        image: p.image,
        description: p.description,
        order: p.order ?? 1,
        isVisible: p.isVisible !== false,

        // ✅ add everything you said is missing
        groupSize: p.groupSize ?? "",
        difficulty: p.difficulty ?? "Easy",
        isSeasonal: !!p.isSeasonal,

        // ✅ highlights are strings in DB already
        highlights: Array.isArray(p.highlights) ? p.highlights : [],

        // ✅ DB stores objects; convert to strings for UI if your UI expects strings
        included: Array.isArray(p.included)
            ? p.included.map((i: any) =>
                typeof i === "string" ? i : (i?.title ?? "").trim()
            ).filter(Boolean)
            : [],
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
