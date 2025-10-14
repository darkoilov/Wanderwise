// app/packages/components/PackagesFilters.tsx
"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { Filter } from "lucide-react"

const CATEGORIES = ["all","standard","featured","special","lastminute","Winter Special","JetSet December"] as const

export default function PackagesFilters() {
    const router = useRouter()
    const sp = useSearchParams()

    const setParam = useCallback((key: string, value: string) => {
        const params = new URLSearchParams(sp?.toString() || "")
        if (value === "all" || value === "") params.delete(key)
        else params.set(key, value)
        router.push(`?${params.toString()}`, { scroll: false })
    }, [router, sp])

    const category = sp.get("category") ?? "all"
    const duration = sp.get("duration") ?? "all"
    const priceRange = sp.get("priceRange") ?? "all"
    const search = sp.get("search") ?? ""

    return (
        <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-600" />
                <span className="font-medium text-gray-700">Filter by:</span>
            </div>

            <div className="flex flex-wrap gap-4 flex-1">
                {/* Category */}
                <Select value={category} onValueChange={(v) => setParam("category", v)}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        {CATEGORIES.map((c) => (
                            <SelectItem key={c} value={c}>{c === "all" ? "All Categories" : c}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Duration */}
                <Select value={duration} onValueChange={(v) => setParam("duration", v)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Duration" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Any Duration</SelectItem>
                        <SelectItem value="short">1-7 days</SelectItem>
                        <SelectItem value="medium">8-14 days</SelectItem>
                        <SelectItem value="long">15+ days</SelectItem>
                    </SelectContent>
                </Select>

                {/* Price */}
                <Select value={priceRange} onValueChange={(v) => setParam("priceRange", v)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Price Range" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Any Price</SelectItem>
                        <SelectItem value="budget">Under €1,500</SelectItem>
                        <SelectItem value="mid">€1,500 - €2,500</SelectItem>
                        <SelectItem value="luxury">€2,500+</SelectItem>
                    </SelectContent>
                </Select>

                {/* Search */}
                <Input
                    placeholder="Search destinations..."
                    className="w-[220px]"
                    defaultValue={search}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") setParam("search", (e.target as HTMLInputElement).value.trim())
                    }}
                    onBlur={(e) => setParam("search", e.target.value.trim())}
                />
            </div>
        </div>
    )
}
