import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plane } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 -z-10">
                {/* keep your background image + overlays */}
                <div className="absolute inset-0 z-0">
                    <Image src="/tropical-sunset-paradise.png" alt="Travel destination" fill className="object-cover" priority />
                    <div className="absolute inset-0 bg-black/40" />
                </div>
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="text-center text-white max-w-4xl mx-auto px-4">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                    Discover Your
                    <span className="block text-amber-400">Dream Destination</span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
                    Personalized travel experiences crafted just for you
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/packages">
                        <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8 py-4 text-lg">
                            <Plane className="mr-2 h-5 w-5" />
                            Explore Destinations
                        </Button>
                    </Link>
                    <Link href="/custom-itinerary">
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg bg-transparent">
                            Design Your Travel
                        </Button>
                    </Link>
                </div>
            </div>

            {/* scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
                <div className="animate-bounce">
                    <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
                        <div className="w-1 h-3 bg-white rounded-full"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
