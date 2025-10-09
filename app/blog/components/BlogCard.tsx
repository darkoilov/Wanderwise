// components/blog/BlogCard.tsx
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, ArrowRight } from "lucide-react"

export type BlogPost = {
    _id?: string | number
    slug?: string
    id?: string | number
    title: string
    excerpt: string
    image?: string | null
    author?: string
    date?: string
    readTime?: string
    category?: string
    tags?: string[]
}

type Props = { post: BlogPost }

export default function BlogCard({ post }: Props) {
    const href = post.slug ? `/blog/${post.slug}` : `/blog/${post._id ?? post.id}`
    return (
        <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {post.category && (
                    <div className="absolute top-4 left-4">
                        <Badge className="bg-white text-gray-900">{post.category}</Badge>
                    </div>
                )}
            </div>

            <CardContent className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    {post.date && (
                        <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {post.date}
                        </div>
                    )}
                    {post.readTime && (
                        <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                        </div>
                    )}
                </div>

                <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    <Link href={href}>{post.title}</Link>
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

                {post.tags?.length ? (
                    <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 2).map((tag, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                                {tag}
                            </Badge>
                        ))}
                        {post.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                                +{post.tags.length - 2}
                            </Badge>
                        )}
                    </div>
                ) : null}

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <User className="h-3 w-3 text-gray-600" />
                        <span className="text-xs text-gray-600">{post.author ?? "Editorial Team"}</span>
                    </div>
                    <Link href={href}>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                            Read More
                            <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
