import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Calendar, Users, ArrowRight, Filter, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {PackageService} from "@/lib/services/packageService";
import PackageCard from "@/app/packages/components/PackageCard";

export default async function PackagesPage() {
  const { packages } = await PackageService.getAllPackages({ page: 1, limit: 500 })
  console.log("packages page", packages)
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
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

      {/* Filters Section */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="font-medium text-gray-700">Filter by:</span>
            </div>
            <div className="flex flex-wrap gap-4 flex-1">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="beach">Beach</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                  <SelectItem value="adventure">Adventure</SelectItem>
                </SelectContent>
              </Select>

              <Select>
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

              <Select>
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

              <Input placeholder="Search destinations..." className="w-[200px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
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

      {/* CTA Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Let us create a completely personalized itinerary tailored to your specific interests, budget, and travel
            style.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
            Create Custom Itinerary
          </Button>
        </div>
      </section>
    </div>
  )
}
