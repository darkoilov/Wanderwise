import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CtaSection() {
    return (
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-4">Ready for Your Next Adventure?</h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto">
                    Let us create a personalized travel experience that matches your dreams and exceeds your expectations
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/custom-itinerary">
                        <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8">Plan Custom Trip</Button>
                    </Link>
                    <Link href="/contact">
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 bg-transparent">
                            Get In Touch
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
