
//resend provider
// 100 mails per day free

// lib/mail.ts
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY!)
const appUrl = process.env.NEXTAUTH_URL

// If you haven't verified a domain yet, this MUST be onboarding@resend.dev
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
