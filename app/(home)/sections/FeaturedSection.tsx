import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { PackageService } from "@/lib/services/packageService";
import PackageCard from "@/app/packages/components/PackageCard";

export default async function FeaturedSection() {
    const featured = await PackageService.getAllPackages({ limit: 6, category: "featured" });

    return (
        <>
            {featured?.packages?.length ?
                <section className="py-10">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Travel Packages</h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Handpicked destinations and carefully curated experiences for the modern traveler
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {featured?.packages?.map((p) => (
                                <PackageCard key={p._id?.toString()} pkg={p as any} variant="deal" />
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <Link href="/packages">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="px-8 bg-transparent border-blue-200 text-blue-600 hover:bg-blue-50"
                                >
                                    View All Packages
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
                :
                <></>
            }
        </>
    );
}
