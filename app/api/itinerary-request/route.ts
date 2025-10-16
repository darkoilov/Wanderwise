import { NextResponse } from "next/server"
import { z } from "zod"
import { sendItineraryRequestEmail } from "@/lib/mail"

const schema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().optional().nullable(),
    travelers: z.string().min(1),
    budget: z.string().min(1),
    destinations: z.string().min(1),
    accommodation: z.string().optional().nullable(),
    travelStyle: z.string().optional().nullable(),
    specialRequests: z.string().optional().nullable(),
    startDate: z.string().optional().nullable(), // ISO date string
    endDate: z.string().optional().nullable(),
    interests: z.array(z.string()).default([]),
})

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const data = schema.parse(body)

        await sendItineraryRequestEmail(data)

        return NextResponse.json({ ok: true })
    } catch (err: any) {
        // Don’t leak internals to client
        console.error("Itinerary request error:", err)
        return NextResponse.json({ ok: false, error: "Unable to submit request." }, { status: 400 })
    }
}
