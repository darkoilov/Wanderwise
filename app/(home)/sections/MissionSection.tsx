import { Target, Globe, Award } from "lucide-react";

export default function MissionSection() {
    return (
        <section className="py-10">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
                    <p className="text-xl text-gray-700 leading-relaxed mb-12">
                        To inspire and enable meaningful travel experiences that create lasting connections between travelers and
                        the destinations they visit, while supporting local communities and promoting sustainable tourism practices.
                    </p>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-blue-50 p-6 rounded-xl">
                            <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                            <h3 className="font-semibold text-lg mb-2">Personalized Experiences</h3>
                            <p className="text-gray-600 text-sm">Every journey tailored to your unique preferences and dreams</p>
                        </div>
                        <div className="bg-green-50 p-6 rounded-xl">
                            <Globe className="h-12 w-12 text-green-600 mx-auto mb-4" />
                            <h3 className="font-semibold text-lg mb-2">Sustainable Tourism</h3>
                            <p className="text-gray-600 text-sm">Supporting local communities and protecting our planet</p>
                        </div>
                        <div className="bg-purple-50 p-6 rounded-xl">
                            <Award className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                            <h3 className="font-semibold text-lg mb-2">Expert Guidance</h3>
                            <p className="text-gray-600 text-sm">Years of experience creating unforgettable adventures</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
