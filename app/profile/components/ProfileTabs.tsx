"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import MyTrips from "@/app/profile/components/my-trips"
import Wishlist from "@/app/profile/components/wishlist"
import PaymentMethods from "@/app/profile/components/payment-methods"
import Reviews from "@/app/profile/components/reviews"
import AccountSettings from "@/app/profile/components/account-settings"
import { Plane, Heart, Star, CreditCard, Settings } from "lucide-react"

type Tab = "trips" | "wishlist" | "reviews" | "payments" | "settings"

const icons = {
    Plane,
    Heart,
    Star,
    CreditCard,
    Settings,
}

export default function ProfileTabs({
                                        tabs,
                                        wishlistItems,
                                        reviewsItems,
                                        profile
                                    }: {
    tabs: { id: Tab; label: string; icon: keyof typeof icons }[]
    wishlistItems: any[]
}) {
    const [activeTab, setActiveTab] = useState<Tab>("trips")

    const renderContent = () => {
        switch (activeTab) {
            case "trips":
                return <MyTrips />
            case "wishlist":
                return <Wishlist wishlistItems={wishlistItems} />
            case "reviews":
                return <Reviews reviewsItems={reviewsItems}/>
            case "payments":
                return <PaymentMethods />
            case "settings":
                return <AccountSettings profile={profile}/>
            default:
                return <MyTrips />
        }
    }

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
                <Card>
                    <CardContent className="p-4">
                        <nav className="space-y-2">
                            {tabs.map((tab) => {
                                const Icon = icons[tab.icon]
                                return (
                                    <Button
                                        key={tab.id}
                                        variant={activeTab === tab.id ? "default" : "ghost"}
                                        className={`w-full justify-start ${
                                            activeTab === tab.id
                                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                                : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                                        }`}
                                        onClick={() => setActiveTab(tab.id)}
                                    >
                                        <Icon className="mr-3 h-5 w-5" />
                                        {tab.label}
                                    </Button>
                                )
                            })}
                        </nav>
                    </CardContent>
                </Card>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
                <Card>
                    <CardContent className="p-6">{renderContent()}</CardContent>
                </Card>
            </main>
        </div>
    )
}
