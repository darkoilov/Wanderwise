
//resend provider
// 100 mails per day free

// lib/mail.ts
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY!)
const appUrl = process.env.NEXTAUTH_URL

const from = process.env.EMAIL_FROM ?? "WanderWise <onboarding@resend.dev>"

export async function sendPasswordResetEmail(to: string, token: string, minutes = 60) {
    const url = `${appUrl}/auth/reset-password?token=${encodeURIComponent(token)}`
    return resend.emails.send({
        from, // e.g. "WanderWise <onboarding@resend.dev>"
        to,   // your real email or delivered@resend.dev for testing
        subject: "Reset your WanderWise password",
        html: `
      <div style="font-family:system-ui,Segoe UI,Roboto,sans-serif">
        <h2>Reset your password</h2>
        <p>This link expires in ${minutes} minutes.</p>
        <p><a href="${url}" style="display:inline-block;padding:10px 16px;border-radius:8px;background:#2563eb;color:#fff;text-decoration:none">Reset password</a></p>
        <p>Or copy and paste this link: <a href="${url}">${url}</a></p>
        <p>If you didn’t request this, just ignore this email.</p>
      </div>
    `,
    })
}


type ItineraryPayload = {
    name: string
    email: string
    phone?: string | null
    travelers: string
    budget: string
    destinations: string
    accommodation?: string | null
    travelStyle?: string | null
    specialRequests?: string | null
    startDate?: string | null // ISO
    endDate?: string | null   // ISO
    interests: string[]
}

const itineraryInbox = process.env.ITINERARY_INBOX!

export async function sendItineraryRequestEmail(data: ItineraryPayload) {
    const nice = (v?: string | null) => (v ? v : "—")
    const badge = (s: string) => `<span style="display:inline-block;padding:2px 8px;border-radius:999px;background:#eef2ff;border:1px solid #c7d2fe;">${s}</span>`

    const html = `
    <div style="font-family:system-ui,Segoe UI,Roboto,sans-serif;max-width:640px">
      <h2 style="margin:0 0 12px">🧭 New Custom Itinerary Request</h2>
      <p style="margin:0 0 16px;color:#374151">Submitted via WanderWise</p>

      <table style="width:100%;border-collapse:collapse">
        <tbody>
          <tr><td style="padding:8px 0;width:180px;color:#6b7280">Name</td><td style="padding:8px 0">${nice(data.name)}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Email</td><td style="padding:8px 0"><a href="mailto:${nice(data.email)}">${nice(data.email)}</a></td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Phone</td><td style="padding:8px 0">${nice(data.phone)}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Travelers</td><td style="padding:8px 0">${nice(data.travelers)}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Budget</td><td style="padding:8px 0">${nice(data.budget)}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Departure</td><td style="padding:8px 0">${nice(data.startDate?.slice(0,10))}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Return</td><td style="padding:8px 0">${nice(data.endDate?.slice(0,10))}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Destinations</td><td style="padding:8px 0">${nice(data.destinations)}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Accommodation</td><td style="padding:8px 0">${nice(data.accommodation)}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Travel Style</td><td style="padding:8px 0">${nice(data.travelStyle)}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Interests</td>
              <td style="padding:8px 0">${data.interests.length ? data.interests.map(badge).join(" ") : "—"}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;vertical-align:top">Special Requests</td>
              <td style="padding:8px 0;white-space:pre-wrap">${nice(data.specialRequests)}</td></tr>
        </tbody>
      </table>
    </div>
  `

    return resend.emails.send({
        from,
        to: itineraryInbox,
        replyTo: data.email,
        subject: `New Itinerary Request • ${data.destinations || "No destination"} • ${data.name}`,
        html,
    })
}


// import { Resend } from "resend"
//
// const resend = new Resend(process.env.RESEND_API_KEY!)
// const from = process.env.EMAIL_FROM ?? "WanderWise <no-reply@your-domain.com>"
// const appUrl = process.env.NEXTAUTH_URL
//
// export async function sendPasswordResetEmail(to: string, token: string, minutes = 60) {
//     const url = `${appUrl}/auth/reset-password?token=${encodeURIComponent(token)}`
//
//     await resend.emails.send({
//         from,
//         to,
//         subject: "Reset your WanderWise password",
//         html: `
//       <div style="font-family:system-ui,Segoe UI,Roboto,sans-serif">
//         <h2>Reset your password</h2>
//         <p>This link expires in ${minutes} minutes.</p>
//         <p><a href="${url}" style="display:inline-block;padding:10px 16px;border-radius:8px;background:#2563eb;color:#fff;text-decoration:none">Reset password</a></p>
//         <p>Or copy and paste: <a href="${url}">${url}</a></p>
//         <p>If you didn't request this, just ignore this email.</p>
//       </div>
//     `,
//     })
// }
