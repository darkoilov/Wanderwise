import PackagesFilters from "@/app/packages/components/PackagesFilters"
import { PackageService } from "@/lib/services/packageService"
import PackageCard from "@/app/packages/components/PackageCard"
import { Button } from "@/components/ui/button"

export default async function PackagesPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const category = (searchParams.category as string) ?? "all"
  const duration = (searchParams.duration as string) ?? "all"
  const priceRange = (searchParams.priceRange as string) ?? "all"
  const search = (searchParams.search as string) ?? ""

  const { packages } = await PackageService.getAllPackages({
    page: 1,
    limit: 500,
    category,
    duration,
    priceRange,
    search,
  })

  return (
      <div className="min-h-screen">
        {/* Hero */}
        <section className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">Travel Packages</h1>
              <p className="text-xl mb-8 text-blue-100">
                Carefully curated travel experiences designed to create unforgettable memories
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-gray-50 border-b">
          <div className="container mx-auto px-4">
            <PackagesFilters />
          </div>
        </section>

        {/* Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {packages?.map((pkg: any) => (
                  <PackageCard key={String(pkg._id)} pkg={pkg} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Button
                  variant="outline"
                  size="lg"
                  className="px-8 bg-transparent border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                Load More Packages
              </Button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-blue-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Can't Find What You're Looking For?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Let us create a completely personalized itinerary tailored to your specific interests, budget, and travel style.
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
              Create Custom Itinerary
            </Button>
          </div>
        </section>
      </div>
  )
}
