import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Download, FileText } from "lucide-react"
import Image from "next/image"

export default function MyTrips() {
    const upcomingTrips = [
        {
            id: 1,
            title: "Sardinia Coastal Paradise",
            location: "Sardinia, Italy",
            image: "/sardinia-costa-smeralda-beach.png",
            date: "June 15 - June 22, 2024",
            guests: "2 Adults",
            status: "confirmed",
            bookingRef: "WW-2024-001",
            total: "€2,450",
        },
        {
            id: 2,
            title: "Mallorca Adventure Week",
            location: "Mallorca, Spain",
            image: "/mallorca-golden-beach-cliffs.png",
            date: "July 10 - July 17, 2024",
            guests: "2 Adults, 1 Child",
            status: "pending",
            bookingRef: "WW-2024-002",
            total: "€3,200",
        },
    ]

    const pastTrips = [
        {
            id: 3,
            title: "Bali Beach Retreat",
            location: "Bali, Indonesia",
            image: "/bali-beach-resort.png",
            date: "March 1 - March 8, 2024",
            guests: "2 Adults",
            status: "completed",
            bookingRef: "WW-2024-003",
            total: "€2,100",
            hasReview: false,
        },
    ]

    return (
        <div className="space-y-8">
            {/* Upcoming Trips */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Upcoming Trips</h2>
                <div className="space-y-4">
                    {upcomingTrips.map((trip) => (
                        <div key={trip.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="relative w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                                    <Image src={trip.image || "/placeholder.svg"} alt={trip.title} fill className="object-cover" />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">{trip.title}</h3>
                                            <div className="flex items-center text-gray-600 text-sm mt-1">
                                                <MapPin className="h-4 w-4 mr-1" />
                                                {trip.location}
                                            </div>
                                        </div>
                                        <Badge
                                            variant={trip.status === "confirmed" ? "default" : "secondary"}
                                            className={
                                                trip.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                                            }
                                        >
                                            {trip.status}
                                        </Badge>
                                    </div>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                        <div className="flex items-center">
                                            <Calendar className="h-4 w-4 mr-1" />
                                            {trip.date}
                                        </div>
                                        <div className="flex items-center">
                                            <Users className="h-4 w-4 mr-1" />
                                            {trip.guests}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-2">
                                        <div>
                                            <p className="text-xs text-gray-500">Booking Reference</p>
                                            <p className="font-mono text-sm font-medium">{trip.bookingRef}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-500">Total</p>
                                            <p className="text-lg font-bold text-blue-600">{trip.total}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 pt-2">
                                        <Button size="sm" variant="outline">
                                            <Download className="h-4 w-4 mr-1" />
                                            Receipt
                                        </Button>
                                        <Button size="sm" variant="outline">
                                            <FileText className="h-4 w-4 mr-1" />
                                            Voucher
                                        </Button>
                                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                            View Details
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Past Trips */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Past Trips</h2>
                <div className="space-y-4">
                    {pastTrips.map((trip) => (
                        <div key={trip.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="relative w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                                    <Image src={trip.image || "/placeholder.svg"} alt={trip.title} fill className="object-cover" />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">{trip.title}</h3>
                                            <div className="flex items-center text-gray-600 text-sm mt-1">
                                                <MapPin className="h-4 w-4 mr-1" />
                                                {trip.location}
                                            </div>
                                        </div>
                                        <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                                            {trip.status}
                                        </Badge>
                                    </div>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                        <div className="flex items-center">
                                            <Calendar className="h-4 w-4 mr-1" />
                                            {trip.date}
                                        </div>
                                        <div className="flex items-center">
                                            <Users className="h-4 w-4 mr-1" />
                                            {trip.guests}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-2">
                                        <div>
                                            <p className="text-xs text-gray-500">Booking Reference</p>
                                            <p className="font-mono text-sm font-medium">{trip.bookingRef}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-500">Total</p>
                                            <p className="text-lg font-bold text-gray-600">{trip.total}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 pt-2">
                                        <Button size="sm" variant="outline">
                                            <Download className="h-4 w-4 mr-1" />
                                            Receipt
                                        </Button>
                                        {!trip.hasReview && (
                                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                                Leave Review
                                            </Button>
                                        )}
                                        <Button size="sm" variant="outline">
                                            Book Again
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
