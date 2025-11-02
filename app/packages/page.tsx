import { Suspense } from "react"
import PackagesFilters from "@/app/packages/components/PackagesFilters"
import PackagesGrid from "./components/PackagesGrid"
import {CATEGORIES} from "@/lib/models/Package";

const DURATIONS = ["short","medium","long","all"] as const
const PRICE_RANGES = ["budget","mid","luxury","all"] as const

function pickFromUnion<T extends readonly string[]>(
    value: string | undefined,
    allowed: T,
    fallback: T[number]
): T[number] {
    return value && (allowed as readonly string[]).includes(value)
        ? (value as T[number])
        : fallback
}

type RawParams = Record<string, string | string[] | undefined>
const DEFAULT_LIMIT = 12

function coercePage(v: unknown) {
    const n = Number(v)
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : 1
}

function parseParams(searchParams: RawParams) {
    return {
        page: coercePage(searchParams.page),
        limit: DEFAULT_LIMIT,
        category: pickFromUnion(searchParams.category as string | undefined, [...CATEGORIES, "all"] as const, "all"),
        duration: pickFromUnion(searchParams.duration as string | undefined, DURATIONS, "all"),
        priceRange: pickFromUnion(searchParams.priceRange as string | undefined, PRICE_RANGES, "all"),
        search: (searchParams.search as string) ?? "",
    }
}

export default async function PackagesPage({
                                             searchParams,
                                           }: { searchParams: RawParams }) {
  const parsed = parseParams(searchParams)

  return (
      <div className="min-h-screen">
        {/* Hero */}
        <section className="relative py-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
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
            <Suspense key={JSON.stringify(parsed)} fallback={<GridSkeleton />}>
              {/* server component that fetches */}
              <PackagesGrid params={parsed} />
            </Suspense>
          </div>
        </section>

        {/* CTA */}
        <section className="py-10 bg-blue-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Let us create a completely personalized itinerary tailored to your specific interests, budget, and travel style.
            </p>
            <a href="/custom-itinerary">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium">
                Create Custom Itinerary
              </button>
            </a>
          </div>
        </section>
      </div>
  )
}

function GridSkeleton() {
  return (
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="h-96 rounded-xl bg-gray-100 animate-pulse" />
        ))}
      </div>
  )
}
