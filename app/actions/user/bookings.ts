// app/actions/user/bookings.ts
"use server"

import { auth } from "@/lib/auth"
import { BookingService } from "@/lib/services/bookingService"

export async function getUpcomingBookingsAction() {
    const session = await auth()
    if (!session?.user?.id) return { success: false, message: "Unauthorized", items: [] }

    const items = await BookingService.getUserBookings(session.user.id, "confirmed")
    return { success: true, items }
}

export async function getPastBookingsAction() {
    const session = await auth()
    if (!session?.user?.id) return { success: false, message: "Unauthorized", items: [] }

    const items = await BookingService.getUserBookings(session.user.id, "completed")
    return { success: true, items }
}
