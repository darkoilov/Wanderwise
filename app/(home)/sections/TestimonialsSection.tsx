import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function TestimonialsSection() {
    const testimonials = [
        { name: "Sarah Johnson",  location: "New York, USA",   text: "The Bali trip was absolutely magical! Every detail was perfectly planned.", rating: 5, image: "/smiling-woman-profile.png" },
        { name: "Michael Chen",   location: "Toronto, Canada", text: "Best travel experience ever. The custom itinerary was exactly what we needed.", rating: 5, image: "/smiling-man-profile.png" },
        { name: "Emma Rodriguez", location: "Madrid, Spain",   text: "Professional service and unforgettable memories. Highly recommended!", rating: 5, image: "/happy-woman-profile.png" },
    ];

    return (
        <section className="py-10 bg-blue-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Travelers Say</h2>
                    <p className="text-xl text-gray-600">Real experiences from real travelers</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, index) => (
                        <Card key={index} className="p-6">
                            <CardContent className="p-0">
                                <div className="flex items-center mb-4">
                                    <Image
                                        src={t.image || "/placeholder.svg"}
                                        alt={t.name}
                                        width={48}
                                        height={48}
                                        className="rounded-full mr-4"
                                    />
                                    <div>
                                        <h4 className="font-semibold">{t.name}</h4>
                                        <p className="text-sm text-gray-600">{t.location}</p>
                                    </div>
                                </div>

                                <div className="flex mb-3">
                                    {[...Array(t.rating)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                                    ))}
                                </div>

                                <p className="text-gray-700 italic">"{t.text}"</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
