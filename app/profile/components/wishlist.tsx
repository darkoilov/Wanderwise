// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Heart, MapPin, Calendar, Star, Trash2 } from "lucide-react"
// import Image from "next/image"
//
// export default function Wishlist() {
//     const savedPackages = [
//         {
//             id: 1,
//             title: "Porto & Douro Valley Wine Experience",
//             location: "Porto, Portugal",
//             image: "/porto-riverside-azulejo-tiles.png",
//             duration: "7 Days, 6 Nights",
//             price: "€2,299",
//             originalPrice: "€2,899",
//             rating: 4.9,
//             reviews: 156,
//             savedDate: "2 days ago",
//         },
//         {
//             id: 2,
//             title: "South Africa Safari & Cape Town",
//             location: "South Africa",
//             image: "/south-africa-safari-table-mountain.png",
//             duration: "10 Days, 9 Nights",
//             price: "€3,799",
//             originalPrice: "€4,499",
//             rating: 5.0,
//             reviews: 203,
//             savedDate: "1 week ago",
//         },
//         {
//             id: 3,
//             title: "Rhodes Ancient Treasures",
//             location: "Rhodes, Greece",
//             image: "/rhodes-ancient-ruins-turquoise-bay.png",
//             duration: "6 Days, 5 Nights",
//             price: "€1,899",
//             originalPrice: "€2,399",
//             rating: 4.8,
//             reviews: 127,
//             savedDate: "2 weeks ago",
//         },
//     ]
//
//     return (
//         <div className="space-y-6">
//             <div className="flex items-center justify-between">
//                 <div>
//                     <h2 className="text-2xl font-bold text-gray-900">Saved Packages</h2>
//                     <p className="text-gray-600 mt-1">
//                         {savedPackages.length} {savedPackages.length === 1 ? "package" : "packages"} saved
//                     </p>
//                 </div>
//             </div>
//
//             <div className="grid gap-6">
//                 {savedPackages.map((pkg) => (
//                     <div key={pkg.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
//                         <div className="flex flex-col md:flex-row gap-4">
//                             <div className="relative w-full md:w-64 h-48 rounded-lg overflow-hidden flex-shrink-0">
//                                 <Image src={pkg.image || "/placeholder.svg"} alt={pkg.title} fill className="object-cover" />
//                                 <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors group">
//                                     <Heart className="h-5 w-5 fill-red-500 text-red-500 group-hover:scale-110 transition-transform" />
//                                 </button>
//                             </div>
//
//                             <div className="flex-1 flex flex-col justify-between">
//                                 <div>
//                                     <div className="flex items-start justify-between mb-2">
//                                         <div>
//                                             <h3 className="text-xl font-semibold text-gray-900 mb-1">{pkg.title}</h3>
//                                             <div className="flex items-center text-gray-600 text-sm">
//                                                 <MapPin className="h-4 w-4 mr-1" />
//                                                 {pkg.location}
//                                             </div>
//                                         </div>
//                                     </div>
//
//                                     <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
//                                         <div className="flex items-center">
//                                             <Calendar className="h-4 w-4 mr-1" />
//                                             {pkg.duration}
//                                         </div>
//                                         <div className="flex items-center">
//                                             <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
//                                             <span className="font-medium">{pkg.rating}</span>
//                                             <span className="text-gray-400 ml-1">({pkg.reviews} reviews)</span>
//                                         </div>
//                                     </div>
//
//                                     <Badge variant="secondary" className="text-xs">
//                                         Saved {pkg.savedDate}
//                                     </Badge>
//                                 </div>
//
//                                 <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
//                                     <div className="flex items-baseline gap-2">
//                                         <span className="text-2xl font-bold text-blue-600">{pkg.price}</span>
//                                         <span className="text-sm text-gray-400 line-through">{pkg.originalPrice}</span>
//                                         <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
//                                             Save €{Number.parseInt(pkg.originalPrice.slice(1)) - Number.parseInt(pkg.price.slice(1))}
//                                         </Badge>
//                                     </div>
//                                     <div className="flex gap-2">
//                                         <Button
//                                             size="sm"
//                                             variant="outline"
//                                             className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
//                                         >
//                                             <Trash2 className="h-4 w-4 mr-1" />
//                                             Remove
//                                         </Button>
//                                         <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
//                                             Book Now
//                                         </Button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//
//             {savedPackages.length === 0 && (
//                 <div className="text-center py-12">
//                     <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">No saved packages yet</h3>
//                     <p className="text-gray-600 mb-6">Start exploring and save packages you love!</p>
//                     <Button className="bg-blue-600 hover:bg-blue-700">Browse Packages</Button>
//                 </div>
//             )}
//         </div>
//     )
// }



// app/profile/components/wishlist.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Calendar, Star, Trash2 } from "lucide-react"
import Image from "next/image"

const dummyPackages = [
    {
        id: 1,
        title: "Porto & Douro Valley Wine Experience",
        location: "Porto, Portugal",
        image: "/porto-riverside-azulejo-tiles.png",
        duration: "7 Days, 6 Nights",
        price: "€2,299",
        originalPrice: "€2,899",
        rating: 4.9,
        reviews: 156,
        savedDate: "2 days ago",
    },
    {
        id: 2,
        title: "South Africa Safari & Cape Town",
        location: "South Africa",
        image: "/south-africa-safari-table-mountain.png",
        duration: "10 Days, 9 Nights",
        price: "€3,799",
        originalPrice: "€4,499",
        rating: 5.0,
        reviews: 203,
        savedDate: "1 week ago",
    },
    {
        id: 3,
        title: "Rhodes Ancient Treasures",
        location: "Rhodes, Greece",
        image: "/rhodes-ancient-ruins-turquoise-bay.png",
        duration: "6 Days, 5 Nights",
        price: "€1,899",
        originalPrice: "€2,399",
        rating: 4.8,
        reviews: 127,
        savedDate: "2 weeks ago",
    },
]

export default function Wishlist({ wishlistItems }: { wishlistItems: any[] }) {
    // if DB has wishlistItems, use them, otherwise fallback to dummy
    const savedPackages = wishlistItems.length > 0 ? wishlistItems : dummyPackages

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Saved Packages</h2>
                    <p className="text-gray-600 mt-1">
                        {savedPackages.length}{" "}
                        {savedPackages.length === 1 ? "package" : "packages"} saved
                    </p>
                </div>
            </div>

            <div className="grid gap-6">
                {savedPackages.map((pkg: any) => (
                    <div
                        key={pkg.id || pkg._id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative w-full md:w-64 h-48 rounded-lg overflow-hidden flex-shrink-0">
                                <Image
                                    src={pkg.image || "/placeholder.svg"}
                                    alt={pkg.title}
                                    fill
                                    className="object-cover"
                                />
                                <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors group">
                                    <Heart className="h-5 w-5 fill-red-500 text-red-500 group-hover:scale-110 transition-transform" />
                                </button>
                            </div>

                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                                {pkg.title}
                                            </h3>
                                            <div className="flex items-center text-gray-600 text-sm">
                                                <MapPin className="h-4 w-4 mr-1" />
                                                {pkg.location}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                        <div className="flex items-center">
                                            <Calendar className="h-4 w-4 mr-1" />
                                            {pkg.duration}
                                        </div>
                                        <div className="flex items-center">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                                            <span className="font-medium">{pkg.rating}</span>
                                            <span className="text-gray-400 ml-1">
                        ({pkg.reviews} reviews)
                      </span>
                                        </div>
                                    </div>

                                    <Badge variant="secondary" className="text-xs">
                                        Saved {pkg.savedDate || "recently"}
                                    </Badge>
                                </div>

                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                    <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-blue-600">
                      {pkg.price}
                    </span>
                                        <span className="text-sm text-gray-400 line-through">
                      {pkg.originalPrice}
                    </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                                        >
                                            <Trash2 className="h-4 w-4 mr-1" />
                                            Remove
                                        </Button>
                                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                            Book Now
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
