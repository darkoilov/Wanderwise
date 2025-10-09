// lib/validation/booking.ts
import { z } from "zod"

export const bookingRequestSchema = z.object({
    packageId: z.string().min(1),
    customerInfo: z.object({
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().min(3),
        travelers: z.number().int().min(1).max(20),
        specialRequests: z.string().max(2000).optional(),
    }),
    travelDates: z.object({
        startDate: z.string().datetime(),
        endDate: z.string().datetime(),
    }),
})
