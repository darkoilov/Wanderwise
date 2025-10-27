import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { Footer } from "@/components/footer"
import Navbar from "@/components/navbar/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WanderWise - Personalized Travel Experiences",
  description: "Discover extraordinary destinations with personalized travel experiences crafted just for you. Expert local knowledge, custom itineraries, and unforgettable memories.",
  keywords: "travel, vacation, custom itinerary, travel packages, personalized travel, adventure, destinations",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
