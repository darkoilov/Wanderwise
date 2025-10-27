// app/packages/_server/PackageCard.tsx
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Eye, MapPin, Star, Users, ArrowRight, Snowflake, Gem, Gift, Plane } from "lucide-react"
import type { TravelPackage } from "@/lib/models/Package"
import {cn, formatPrice} from "@/lib/utils"

export default function PackageCard({ pkg }: { pkg: TravelPackage }) {
    const save =
        typeof pkg.originalPrice === "number" && typeof pkg.price === "number"
            ? Math.max(0, pkg.originalPrice - pkg.price)
            : 0

    const categoryIcons: Record<string, React.ReactNode> = {
        standard: <Gem className="h-3 w-3" />,
        featured: <Star className="h-3 w-3" />,
        special: <Gift className="h-3 w-3" />,
    }

    return (
        <div className={cn(
            "overflow-hidden hover:shadow-2xl transition-all duration-300 group border-0 shadow-lg rounded-xl",
            pkg.isSeasonal && "ring-2 ring-blue-500"
        )}>
            <div className="relative h-72 overflow-hidden">
                <Image
                    src={pkg.image || "/placeholder.svg"}
                    alt={pkg.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <Badge className={pkg.isSeasonal ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" : "bg-blue-600 text-white"}>
            <span className="flex items-center gap-1">
              {categoryIcons[pkg.category]}
                {pkg.category}
            </span>
                    </Badge>
                    <Badge className="bg-white/95 text-gray-900 font-medium px-3 py-1 flex items-center gap-1">
                        <Star className="h-3 w-3 fill-current text-yellow-500" />
                        {pkg.rating}
                    </Badge>
                </div>

                {save > 0 && (
                    <div className="absolute bottom-4 left-4">
                        <Badge className="bg-blue-500 text-white font-medium px-3 py-1">
                            Save {formatPrice(save)}
                        </Badge>
                    </div>
                )}

                <div className="absolute bottom-4 right-4 text-white">
                    <div className="flex items-center text-sm font-medium">
                        <MapPin className="h-4 w-4 mr-1" />
                        {pkg.location}
                    </div>
                </div>
            </div>

            <div className="p-6 space-y-4">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {pkg.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">{pkg.description}</p>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 py-2 border-t border-gray-100">
                    <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-blue-500" />
                        <span className="font-medium">{pkg.duration}</span>
                    </div>
                    <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-blue-500" />
                        <span className="font-medium">{pkg.reviews} reviews</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    {(pkg.highlights ?? []).slice(0, 3).map((h, i) => (
                        <Badge key={i} variant="secondary" className="text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100">
                            {h}
                        </Badge>
                    ))}
                    {pkg.highlights && pkg.highlights.length > 3 && (
                        <Badge variant="secondary" className="text-xs font-medium bg-gray-100 text-gray-600">
                            +{pkg.highlights.length - 3} more
                        </Badge>
                    )}
                </div>

                <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-blue-600">{formatPrice(pkg.price)}</span>
                            {typeof pkg.originalPrice === "number" && (
                                <span className="text-lg text-gray-400 line-through">{formatPrice(pkg.originalPrice)}</span>
                            )}
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500">per person</p>
                            <div className="flex items-center text-xs text-gray-600">
                                <Star className="h-3 w-3 mr-1 fill-current text-yellow-400" />
                                {pkg.rating} ({pkg.reviews})
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Link href={`/checkout/${pkg._id}`}>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg">
                                <ArrowRight className="mr-2 h-4 w-4" />
                                Book Now
                            </Button>
                        </Link>
                        <Link href={`/packages/${pkg._id}`}>
                            <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 font-medium py-2.5 rounded-lg transition-all duration-200 bg-transparent">
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
