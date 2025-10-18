// app/packages/_server/PackagesGrid.tsx
import { Button } from "@/components/ui/button"
import { PackageService } from "@/lib/services/packageService"
import PackageCard from "@/app/packages/components/PackageCard";
import { Category } from "@/lib/models/Package";

type Params = {
    page: number
    limit: number
    category: Category | "all"
    duration: "short" | "medium" | "long" | "all"
    priceRange: "budget" | "mid" | "luxury" | "all"
    search: string
}

function nextQs(params: Params, page: number) {
    const q = new URLSearchParams({
        ...(params.category !== "all" ? { category: params.category } : {}),
        ...(params.duration !== "all" ? { duration: params.duration } : {}),
        ...(params.priceRange !== "all" ? { priceRange: params.priceRange } : {}),
        ...(params.search ? { search: params.search } : {}),
        page: String(page),
    })
    return `?${q.toString()}`
}

export default async function PackagesGrid({ params }: { params: Params }) {
    const { packages = [], total = 0, page = params.page } =
        await PackageService.getAllPackages({
            page: params.page,
            limit: params.limit,
            category: params.category,
            duration: params.duration,
            priceRange: params.priceRange,
            search: params.search,
        })

    if (!packages.length) {
        return (
            <div className="text-center py-24">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">No packages found</h3>
                <p className="text-gray-600 mb-6">
                    Try adjusting filters or clearing the search.
                </p>
                <a href="/packages">
                    <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                        Reset Filters
                    </Button>
                </a>
            </div>
        )
    }

    const totalPages = Math.max(1, Math.ceil(total / params.limit))
    const hasPrev = page > 1
    const hasNext = page < totalPages

    return (
        <>
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {packages.map((pkg: any) => (
                    <PackageCard key={String(pkg._id)} pkg={pkg} />
                ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-3 mt-12">
                <a aria-disabled={!hasPrev} className={hasPrev ? "" : "pointer-events-none opacity-50"} href={nextQs(params, page - 1)}>
                    <Button variant="outline" className="bg-transparent border-blue-200 text-blue-600 hover:bg-blue-50">
                        Previous
                    </Button>
                </a>
                <span className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </span>
                <a aria-disabled={!hasNext} className={hasNext ? "" : "pointer-events-none opacity-50"} href={nextQs(params, page + 1)}>
                    <Button variant="outline" className="bg-transparent border-blue-200 text-blue-600 hover:bg-blue-50">
                        Next
                    </Button>
                </a>
            </div>
        </>
    )
}
