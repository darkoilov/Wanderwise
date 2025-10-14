import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Video, FileText, CheckCircle2, Plane, ArrowRight, MessageCircle, Sparkles } from "lucide-react"
import Link from "next/link"

export default function HowItWorksPage() {
    const steps = [
        {
            number: 1,
            icon: MapPin,
            title: "Choose your destination",
            description:
                "Browse our handpicked destinations – our absolute favorites from the past two years – or tell us your dream destination using our inspiration form.",
            gradient: "from-blue-400 via-blue-500 to-blue-600",
            lightBg: "bg-blue-50/50",
            accentColor: "text-blue-600",
        },
        {
            number: 2,
            icon: Video,
            title: "Let's meet",
            description:
                "We'll schedule a relaxed video call (via Microsoft Teams) to get to know each other. You tell us your ideas, preferences, and travel style – and we'll share our insights and suggestions.",
            gradient: "from-purple-400 via-purple-500 to-purple-600",
            lightBg: "bg-purple-50/50",
            accentColor: "text-purple-600",
        },
        {
            number: 3,
            icon: FileText,
            title: "We design your dream trip",
            description:
                "Based on our conversation, we'll create a personalized travel plan – including activities, restaurants, transfers, and accommodations that match your vibe.",
            gradient: "from-pink-400 via-pink-500 to-pink-600",
            lightBg: "bg-pink-50/50",
            accentColor: "text-pink-600",
        },
        {
            number: 4,
            icon: CheckCircle2,
            title: "Final touches & confirmation",
            description:
                "Once you're happy with the plan, we'll finalize everything together. After that, you'll receive a beautifully designed travel brochure with all the details, tips, must-sees, and hidden gems.",
            gradient: "from-emerald-400 via-emerald-500 to-emerald-600",
            lightBg: "bg-emerald-50/50",
            accentColor: "text-emerald-600",
        },
        {
            number: 5,
            icon: Plane,
            title: "Pack your bags & take off",
            description: "Your journey begins! And we'll be just a message away if you need anything along the way.",
            gradient: "from-orange-400 via-orange-500 to-orange-600",
            lightBg: "bg-orange-50/50",
            accentColor: "text-orange-600",
        },
    ]

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-24 bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden">
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center text-white">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-semibold mb-6 border border-white/30">
                            <Sparkles className="w-5 h-5" />
                            <span>Simple & Personal Process</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6">
                            How It <span className="text-white drop-shadow-lg">Works</span>
                        </h1>

                        <p className="text-xl md:text-2xl leading-relaxed text-white/90">
                            From choosing your destination to taking off – here's how we turn your travel dreams into reality, one
                            personalized step at a time.
                        </p>
                    </div>
                </div>
            </section>

            {/* Steps Section - Modern Cards */}
            <section className="py-20 -mt-12 relative z-10">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        {steps.map((step, index) => {
                            const Icon = step.icon
                            const isEven = index % 2 === 0

                            return (
                                <div key={step.number} className="mb-16 last:mb-0">
                                    <div
                                        className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-12 items-center`}
                                    >
                                        {/* Number + Icon */}
                                        <div className="flex-shrink-0 relative group">
                                            <div
                                                className={`relative w-32 h-32 rounded-3xl bg-gradient-to-br ${step.gradient} shadow-2xl group-hover:scale-110 transition-transform duration-300 flex items-center justify-center`}
                                            >
                                                <Icon className="w-16 h-16 text-white" strokeWidth={1.5} />
                                                <div className="absolute -top-4 -right-4 bg-white text-gray-900 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shadow-lg border-4 border-white">
                                                    {step.number}
                                                </div>
                                            </div>

                                            {/* Connecting line for desktop */}
                                            {index !== steps.length - 1 && (
                                                <div
                                                    className={`hidden lg:block absolute ${isEven ? "left-full" : "right-full"} top-1/2 ${isEven ? "ml-6" : "mr-6"} w-12 h-1 bg-gradient-to-r ${isEven ? step.gradient : `${steps[index + 1].gradient} rotate-180`} opacity-20`}
                                                />
                                            )}
                                        </div>

                                        {/* Content Card */}
                                        <Card
                                            className={`flex-1 ${step.lightBg} border-2 border-gray-100 hover:border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 p-8 lg:p-10 rounded-2xl backdrop-blur-sm`}
                                        >
                                            <div className="space-y-4">
                                                <h3 className={`text-3xl font-bold ${step.accentColor}`}>{step.title}</h3>
                                                <p className="text-gray-700 text-lg leading-relaxed">{step.description}</p>
                                            </div>
                                        </Card>
                                    </div>

                                    {/* Mobile connector */}
                                    {index !== steps.length - 1 && (
                                        <div className="lg:hidden flex justify-center my-6">
                                            <div className={`w-1 h-12 bg-gradient-to-b ${step.gradient} opacity-30 rounded-full`} />
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Summary Cards */}
            <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">What You Get</h2>
                            <p className="text-xl text-gray-600">Everything we provide for your perfect journey</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            <Card className="p-6 bg-white border-2 border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                                    <Video className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Personal Consultation</h3>
                                <p className="text-gray-600 text-sm">
                                    1-on-1 video call to understand your travel dreams and preferences
                                </p>
                            </Card>

                            <Card className="p-6 bg-white border-2 border-purple-100 hover:border-purple-300 hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                                    <FileText className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Custom Itinerary</h3>
                                <p className="text-gray-600 text-sm">
                                    Detailed day-by-day plan with activities, restaurants, and hidden gems
                                </p>
                            </Card>

                            <Card className="p-6 bg-white border-2 border-pink-100 hover:border-pink-300 hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                                    <MessageCircle className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">24/7 Support</h3>
                                <p className="text-gray-600 text-sm">We're always available if you need help during your journey</p>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute inset-0">
                    <div className="absolute top-10 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                        <MessageCircle className="w-10 h-10" />
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Journey?</h2>
                    <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto opacity-95">
                        Let's have a conversation about your dream destination. No commitments, just ideas and inspiration.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/packages">
                            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold">
                                Browse Destinations
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-6 text-lg font-semibold bg-transparent"
                            >
                                <MessageCircle className="mr-2 h-5 w-5" />
                                Get In Touch
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
