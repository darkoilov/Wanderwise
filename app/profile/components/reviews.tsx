"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Edit, Trash2, MapPin, Calendar } from "lucide-react"
import Image from "next/image"

const dummyReviews = [
    {
        id: 1,
        packageTitle: "Bali Beach Retreat",
        location: "Bali, Indonesia",
        image: "/bali-beach-resort.png",
        rating: 5,
        date: "March 15, 2024",
        reviewText:
            "Absolutely amazing experience! The beaches were pristine, the accommodation was luxurious, and our guide was incredibly knowledgeable. Every detail was perfectly planned. Highly recommend this package to anyone looking for a tropical paradise getaway!",
        helpful: 12,
    },
    {
        id: 2,
        packageTitle: "Paris Romantic Escape",
        location: "Paris, France",
        image: "/paris-eiffel-tower.png",
        rating: 5,
        date: "February 10, 2024",
        reviewText:
            "My partner and I had the most romantic time in Paris. The itinerary was perfectly paced, allowing us to see all the major sights while also having time to explore on our own. The Seine river cruise at sunset was unforgettable!",
        helpful: 8,
    },
    {
        id: 3,
        packageTitle: "Tokyo Cultural Journey",
        location: "Tokyo, Japan",
        image: "/tokyo-temple-cherry-blossoms.png",
        rating: 4,
        date: "January 5, 2024",
        reviewText:
            "Great cultural experience with visits to temples, traditional tea ceremonies, and excellent local food. The only minor issue was the tight schedule on some days. Overall, a wonderful introduction to Japanese culture!",
        helpful: 15,
    },
]

export default function Reviews({ reviewsItems }: { reviewsItems: any[] }) {
    const reviews = reviewsItems.length > 0 ? reviewsItems : dummyReviews

    const renderStars = (rating: number) => (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`h-5 w-5 ${
                        star <= rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                    }`}
                />
            ))}
        </div>
    )

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">My Reviews</h2>
                    <p className="text-gray-600 mt-1">
                        {reviews.length} {reviews.length === 1 ? "review" : "reviews"} written
                    </p>
                </div>
            </div>

            <div className="space-y-6">
                {reviews.map((review) => (
                    <div
                        key={review.id || review._id}
                        className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                                <Image
                                    src={review.image || "/placeholder.svg"}
                                    alt={review.packageTitle}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex-1 space-y-3">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{review.packageTitle}</h3>
                                        <div className="flex items-center text-gray-600 text-sm mt-1">
                                            <MapPin className="h-4 w-4 mr-1" />
                                            {review.location}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="outline">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    {renderStars(review.rating)}
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Calendar className="h-4 w-4 mr-1" />
                                        {review.date}
                                    </div>
                                </div>

                                <p className="text-gray-700 leading-relaxed">{review.reviewText}</p>

                                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                    <Badge variant="secondary" className="text-xs">
                                        {review.helpful} people found this helpful
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {reviews.length === 0 && (
                <div className="text-center py-12">
                    <Star className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
                    <p className="text-gray-600 mb-6">Share your experiences to help other travelers!</p>
                </div>
            )}
        </div>
    )
}
