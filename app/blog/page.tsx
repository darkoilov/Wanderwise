// app/blog/page.tsx
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import BlogCard, { type BlogPost } from "./components/BlogCard"
import FeaturedBlogCard from "./components/FeaturedBlogCard"

const categories = [
  "All",
  "Destinations",
  "Travel Tips",
  "Solo Travel",
  "Food & Culture",
  "Budget Travel",
  "Photography",
  "Sustainable Travel",
]

async function getData(): Promise<{
  featured: BlogPost | null
  posts: BlogPost[]
}> {
  // Try backend first (adjust endpoint/path later)
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/blog?limit=12`, {
      next: { revalidate: 300 },
    })
    if (res.ok) {
      const json = await res.json()
      if (Array.isArray(json?.data)) {
        const [first, ...rest] = json.data
        return { featured: first ?? null, posts: rest ?? [] }
      }
      return { featured: json?.featured ?? null, posts: json?.posts ?? [] }
    }
  } catch {
  }

  const featuredPost: BlogPost = {
    id: 1,
    title: "The Ultimate Guide to Solo Travel in Southeast Asia",
    excerpt:
        "Discover the secrets to safe, affordable, and unforgettable solo adventures across Thailand, Vietnam, Cambodia, and beyond.",
    image: "/solo-traveler-temple-southeast-asia.png",
    author: "Sarah Mitchell",
    date: "March 15, 2024",
    readTime: "12 min read",
    category: "Solo Travel",
    tags: ["Southeast Asia", "Solo Travel", "Budget Travel", "Safety Tips"],
  }

  const blogPosts: BlogPost[] = [
    {
      id: 2,
      title: "10 Hidden Gems in Japan You've Never Heard Of",
      excerpt:
          "Beyond Tokyo and Kyoto lies a Japan filled with secret temples, hidden hot springs, and untouched natural beauty.",
      image: "/hidden-temple-cherry-blossoms.png",
      author: "Sarah Mitchell",
      date: "March 10, 2024",
      readTime: "8 min read",
      category: "Destinations",
      tags: ["Japan", "Hidden Gems", "Culture"],
    },
    {
      id: 3,
      title: "How to Pack Light for a 3-Week European Adventure",
      excerpt:
          "Master the art of minimalist packing with our comprehensive guide to traveling Europe with just a carry-on.",
      image: "/placeholder.svg?height=250&width=400",
      author: "Sarah Mitchell",
      date: "March 5, 2024",
      readTime: "6 min read",
      category: "Travel Tips",
      tags: ["Packing", "Europe", "Budget Travel"],
    },
    {
      id: 4,
      title: "The Best Street Food Markets Around the World",
      excerpt:
          "From Bangkok's floating markets to Istanbul's spice bazaars, explore the world's most incredible street food scenes.",
      image: "/placeholder.svg?height=250&width=400",
      author: "Sarah Mitchell",
      date: "February 28, 2024",
      readTime: "10 min read",
      category: "Food & Culture",
      tags: ["Street Food", "Culture", "Asia", "Markets"],
    },
    {
      id: 5,
      title: "Sustainable Travel: How to Explore Responsibly",
      excerpt:
          "Learn how to minimize your environmental impact while maximizing your travel experiences with these eco-friendly tips.",
      image: "/placeholder.svg?height=250&width=400",
      author: "Sarah Mitchell",
      date: "February 20, 2024",
      readTime: "7 min read",
      category: "Sustainable Travel",
      tags: ["Sustainability", "Eco Travel", "Conservation"],
    },
    {
      id: 6,
      title: "Photography Tips for Travel Beginners",
      excerpt:
          "Capture stunning travel memories with these essential photography techniques and equipment recommendations.",
      image: "/placeholder.svg?height=250&width=400",
      author: "Sarah Mitchell",
      date: "February 15, 2024",
      readTime: "9 min read",
      category: "Photography",
      tags: ["Photography", "Travel Tips", "Equipment"],
    },
    {
      id: 7,
      title: "Budget Travel: How to See the World for Less",
      excerpt:
          "Discover proven strategies to travel more while spending less, from finding cheap flights to free accommodations.",
      image: "/placeholder.svg?height=250&width=400",
      author: "Sarah Mitchell",
      date: "February 10, 2024",
      readTime: "11 min read",
      category: "Budget Travel",
      tags: ["Budget Travel", "Money Saving", "Backpacking"],
    },
  ]

  return { featured: featuredPost, posts: blogPosts }
}

export const revalidate = 300

export default async function BlogPage() {
  const { featured, posts } = await getData()

  return (
      <div className="min-h-screen">
        {/* Hero */}
        <section className="relative py-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">Travel Blog</h1>
              <p className="text-xl mb-8 text-blue-100">
                Stories, tips, and inspiration from around the world to fuel your wanderlust
              </p>
            </div>
          </div>
        </section>

        {/* Search & filters (UI only for now) */}
        <section className="py-8 bg-gray-50 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex items-center gap-2">
                <Search className="h-5 w-5 text-gray-600" />
                <Input placeholder="Search articles..." className="w-[300px]" />
              </div>
              <div className="flex flex-wrap gap-4 flex-1">
                {/* Category */}
                <div className="flex gap-2 flex-wrap">
                  {categories.map((c) => (
                      <Badge key={c} variant={c === "All" ? "default" : "secondary"} className="cursor-pointer">
                        {c}
                      </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured */}
        {featured && (
            <section className="py-16">
              <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                  <div className="mb-8">
                    <Badge className="bg-blue-600 text-white mb-4">Featured Article</Badge>
                  </div>
                  <FeaturedBlogCard post={featured} />
                </div>
              </div>
            </section>
        )}

        {/* Latest posts */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Latest Articles</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((p) => (
                    <BlogCard key={String(p._id ?? p.id)} post={p} />
                ))}
              </div>

              <div className="text-center mt-12">
                <Button variant="outline" size="lg" className="px-8">
                  Load More Articles
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter (unchanged) */}
        <section className="py-10 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Never Miss an Adventure</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
              Subscribe to our newsletter for the latest travel tips, destination guides, and exclusive deals.
            </p>
            <div className="max-w-md mx-auto flex gap-2">
              <Input type="email" placeholder="Your email address" className="bg-white text-gray-900" />
              <Button className="bg-white text-blue-600 hover:bg-gray-100">Subscribe</Button>
            </div>
          </div>
        </section>
      </div>
  )
}
