"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function PackageCarousel({
  title,
  images,
}: {
  title: string
  images: string[]
}) {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((p) => (p + 1) % images.length)
  const prev = () => setCurrent((p) => (p - 1 + images.length) % images.length)

  return (
    <div className="relative max-w-5xl mx-auto">
      <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
        <Image
          src={images[current] || "/placeholder.svg"}
          alt={`${title} - Image ${current + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 1200px) 100vw, 1200px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        <button
          onClick={prev}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>
        <button
          onClick={next}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <ChevronRight className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      <div className="flex justify-center gap-3 mt-6">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-4 h-4 rounded-full transition-all duration-200 ${
              i === current ? "bg-blue-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
