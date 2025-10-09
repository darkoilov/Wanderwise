// app/profile/page.tsx
import { getWishlistAction } from "@/app/actions/user/wishlist"
import ProfileTabs from "./components/ProfileTabs"
import {getMyReviewsAction} from "@/app/actions/user/reviews";
import {getUserProfileAction} from "@/app/actions/user/profile";

type Tab = "trips" | "wishlist" | "reviews" | "payments" | "settings"

export default async function ProfilePage() {
    const wishlistRes = await getWishlistAction()
    const wishlistItems = wishlistRes.success ? wishlistRes.items : []
    const reviewsRes = await getMyReviewsAction()
    const reviewsItems = reviewsRes.success ? reviewsRes.items : []
    const profileRes = await getUserProfileAction()
    const profile = profileRes.success ? profileRes.user : null

    const tabs = [
        { id: "trips" as Tab, label: "My Trips", icon: "Plane" },
        { id: "wishlist" as Tab, label: "Wishlist", icon: "Heart" },
        { id: "reviews" as Tab, label: "Reviews", icon: "Star" },
        { id: "payments" as Tab, label: "Payment Methods", icon: "CreditCard" },
        { id: "settings" as Tab, label: "Account Settings", icon: "Settings" },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                    <p className="text-gray-600 mt-2">Manage your account and bookings</p>
                </div>

                <ProfileTabs tabs={tabs} wishlistItems={wishlistItems} reviewsItems={reviewsItems} profile={profile}/>
            </div>
        </div>
    )
}
