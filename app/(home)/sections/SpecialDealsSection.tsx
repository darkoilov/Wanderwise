import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import PackageCard from "@/app/packages/components/PackageCard"; // client
import { PackageService } from "@/lib/services/packageService";

export default async function SpecialDealsSection() {
    const { packages: specialDeals } = await PackageService.getAllPackages({ page: 1, limit: 6, category: "special" });

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <Badge className="bg-blue-500 text-white mb-4 px-4 py-2 text-lg">Limited Time Offers</Badge>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Special Deals</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Exclusive discounts on premium travel packages - Book now before they're gone!
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {specialDeals.map((p) => (
                        <PackageCard key={p._id?.toString()} pkg={p as any} variant="deal" />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link href="/last-minute">
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
                            View All Last Minute Deals
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
