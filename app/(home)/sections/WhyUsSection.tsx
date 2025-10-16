import { Sparkles, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function WhyUsSection() {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full text-blue-700 font-semibold mb-6">
                    <Sparkles className="w-5 h-5" />
                    <span>Why Book With Us</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    We don't just plan trips – <span className="text-blue-600">we craft experiences</span>
                </h2>

                <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                    <p>
                        We craft experiences that feel{" "}
                        <span className="font-semibold text-blue-600">personal, soulful, and real</span>. Every journey is
                        curated with care, every detail chosen with heart.
                    </p>

                    <p>
                        Whether it's a honeymoon, a beach escape, a festive city break, or a soulful island retreat – we design
                        travel that reflects <span className="font-semibold">you</span>.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center my-8 text-blue-600 font-semibold">
                        <div className="flex items-center gap-2">
                            <X className="w-5 h-5" />
                            <span>No templates</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <X className="w-5 h-5" />
                            <span>No tourist traps</span>
                        </div>
                    </div>

                    <p className="text-xl font-medium text-gray-900">Just authentic moments, tailored to your rhythm.</p>

                    <p className="text-gray-600 italic">
                        We believe travel should feel personal, vibrant, and unforgettable.
                    </p>

                    <p className="text-xl font-semibold text-blue-600 pt-4">
                        Because for us, it's not just about where you go – <br />
                        it's about how it makes you <span className="text-purple-600">feel</span>.
                    </p>
                </div>

                <div className="mt-12">
                    <Link href="/how-it-works">
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                            See How It Works
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    </section>
    );
}
