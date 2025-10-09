"use client"

import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Eye, MapPin, Star, Users, ArrowRight } from "lucide-react"
import type { TravelPackage } from "@/lib/models/Package"
import { formatPrice } from "@/lib/utils"

type Props = { pkg: TravelPackage, variant?: "default" | "deal" }

export default function PackageCard({ pkg, variant = "default" }: Props) {
    const save =
        typeof pkg.originalPrice === "number" && typeof pkg.price === "number"
            ? Math.max(0, pkg.originalPrice - pkg.price)
            : 0

    const isDeal = variant === "deal" || save > 0
    const badgeClass = isDeal ? "bg-red-600" : "bg-blue-600"
    const ctaClass = isDeal ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"

    return (
        <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border-0 shadow-lg">
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
                    <Badge className={`${badgeClass} text-white font-medium px-3 py-1`}>{pkg.category}</Badge>
                    <Badge className="bg-white/95 text-gray-900 font-medium px-3 py-1">
                        <Star className="h-3 w-3 mr-1 fill-current text-yellow-500" />
                        {pkg.rating}
                    </Badge>
                </div>

                {isDeal && save > 0 && (
                    <div className="absolute bottom-4 left-4">
                        <Badge className="bg-red-500 text-white font-medium px-3 py-1">
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

            <CardContent className="p-6 space-y-4">
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
                        <Button className={`${ctaClass} text-white font-medium py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg`}>
                            <ArrowRight className="mr-2 h-4 w-4" />
                            Book Now
                        </Button>
                        <Link href={`/packages/${pkg._id}`}>
                            <Button
                                variant="outline"
                                className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 font-medium py-2.5 rounded-lg transition-all duration-200 bg-transparent"
                            >
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                            </Button>
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
















// // components/packages/PackageCard.tsx
// "use client";
//
// import Image from "next/image";
// import Link from "next/link";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Calendar, MapPin, Star, Users, Eye, ArrowRight } from "lucide-react";
//
// type Pkg = {
//     _id: string;
//     title: string;
//     image?: string;
//     location: string;
//     duration: string;
//     rating: number;
//     reviews: number;
//     price: number;
//     originalPrice?: number | null;
//     category: string;
//     highlights?: string[];
// };
//
// export default function PackageCard({ pkg }: { pkg: Pkg }) {
//     return (
//         <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border-0 shadow-lg">
//             <div className="relative h-72 overflow-hidden">
//                 <Image
//                     src={pkg.image || "/placeholder.svg"}
//                     alt={pkg.title}
//                     fill
//                     sizes="(max-width: 1024px) 100vw, 33vw"
//                     className="object-cover group-hover:scale-110 transition-transform duration-500"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
//                 <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
//                     <Badge className="bg-blue-600 text-white font-medium px-3 py-1">
//                         {pkg.category}
//                     </Badge>
//                     <Badge className="bg-white/95 text-gray-900 font-medium px-3 py-1">
//                         <Star className="h-3 w-3 mr-1 fill-current text-yellow-500" />
//                         {pkg.rating}
//                     </Badge>
//                 </div>
//                 <div className="absolute bottom-4 right-4 text-white">
//                     <div className="flex items-center text-sm font-medium">
//                         <MapPin className="h-4 w-4 mr-1" />
//                         {pkg.location}
//                     </div>
//                 </div>
//             </div>
//
//             <CardContent className="p-6 space-y-4">
//                 <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
//                     {pkg.title}
//                 </h3>
//
//                 <div className="flex items-center justify-between text-sm text-gray-600 py-2 border-t border-gray-100">
//                     <div className="flex items-center">
//                         <Calendar className="h-4 w-4 mr-1 text-blue-500" />
//                         <span className="font-medium">{pkg.duration}</span>
//                     </div>
//                     <div className="flex items-center">
//                         <Users className="h-4 w-4 mr-1 text-blue-500" />
//                         <span className="font-medium">{pkg.reviews} reviews</span>
//                     </div>
//                 </div>
//
//                 {pkg.highlights?.length ? (
//                     <div className="flex flex-wrap gap-2">
//                         {pkg.highlights.slice(0, 3).map((h, i) => (
//                             <Badge key={i} variant="secondary" className="text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100">
//                                 {h}
//                             </Badge>
//                         ))}
//                         {pkg.highlights.length > 3 && (
//                             <Badge variant="secondary" className="text-xs font-medium bg-gray-100 text-gray-600">
//                                 +{pkg.highlights.length - 3} more
//                             </Badge>
//                         )}
//                     </div>
//                 ) : null}
//
//                 <div className="pt-4 border-t border-gray-100">
//                     <div className="flex items-center justify-between mb-4">
//                         <div className="flex items-baseline gap-2">
//                             <span className="text-3xl font-bold text-blue-600">€{pkg.price}</span>
//                             {pkg.originalPrice ? (
//                                 <span className="text-lg text-gray-400 line-through">€{pkg.originalPrice}</span>
//                             ) : null}
//                         </div>
//                         <div className="text-right">
//                             <p className="text-sm text-gray-500">per person</p>
//                             <div className="flex items-center text-xs text-gray-600">
//                                 <Star className="h-3 w-3 mr-1 fill-current text-yellow-400" />
//                                 {pkg.rating} ({pkg.reviews})
//                             </div>
//                         </div>
//                     </div>
//
//                     <div className="grid grid-cols-2 gap-3">
//                         <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg">
//                             <ArrowRight className="mr-2 h-4 w-4" />
//                             Book Now
//                         </Button>
//                         <Link href={`/packages/${pkg._id}`}>
//                             <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 font-medium py-2.5 rounded-lg bg-transparent">
//                                 <Eye className="mr-2 h-4 w-4" />
//                                 Details
//                             </Button>
//                         </Link>
//                     </div>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// }
