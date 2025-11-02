import Link from "next/link";
import { Button } from "@/components/ui/button";
import {ArrowRight, Snowflake} from "lucide-react";
import { PackageService } from "@/lib/services/packageService";
import PackageCard from "@/app/packages/components/PackageCard";

export default async function StandardSection() {
    const standard = await PackageService.getAllPackages({limit: 6, category: "standard"});

    return (
        <section className="py-10">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full mb-4">
                        <Snowflake className="h-5 w-5" />
                        <span className="font-semibold">Limited Time Offers</span>
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Seasonal Packages</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Special packages designed for this season. Book now and save on your dream winter getaway!
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {standard?.packages?.map((p) => (
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
    );
}
