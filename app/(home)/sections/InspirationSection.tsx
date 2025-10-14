import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function InspirationSection() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Travel Inspiration</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">Stories, tips, and guides from our latest adventures</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="overflow-hidden hover:shadow-xl transition-shadow rounded-xl border bg-white">
                            <div className="relative h-48">
                                <Image
                                    src={`/generic-placeholder-graphic.png?height=200&width=400`}
                                    alt="Blog post"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 33vw"
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <Badge className="mb-3">Travel Tips</Badge>
                                <h3 className="text-xl font-semibold mb-2">10 Hidden Gems in Europe</h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    Discover the secret spots that most tourists never see...
                                </p>
                                <Link href="/blog" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                                    Read More →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link href="/blog">
                        <Button variant="outline" size="lg" className="px-8 bg-transparent">
                            View All Articles
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
