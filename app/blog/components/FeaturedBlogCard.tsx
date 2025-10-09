// components/blog/FeaturedBlogCard.tsx
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, ArrowRight, Tag } from "lucide-react"
import type { BlogPost } from "./BlogCard"

export default function FeaturedBlogCard({ post }: { post: BlogPost }) {
    const href = post.slug ? `/blog/${post.slug}` : `/blog/${post._id ?? post.id}`
    return (
        <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-auto">
                    <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover"
                    />
                </div>

                <CardContent className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        {post.category && <Badge variant="secondary">{post.category}</Badge>}
                        {post.date && (
                            <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {post.date}
                            </div>
                        )}
                        {post.readTime && (
                            <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {post.readTime}
                            </div>
                        )}
                    </div>

                    <h2 className="text-3xl font-bold mb-4 hover:text-blue-600 transition-colors">
                        <Link href={href}>{post.title}</Link>
                    </h2>

                    <p className="text-gray-600 mb-6 text-lg">{post.excerpt}</p>

                    {post.tags?.length ? (
                        <div className="flex flex-wrap gap-2 mb-6">
                            {post.tags.map((tag, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                    <Tag className="h-3 w-3 mr-1" />
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    ) : null}

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-600" />
                            <span className="text-sm text-gray-600">By {post.author ?? "Editorial Team"}</span>
                        </div>
                        <Link href={href}>
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                Read More
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </div>
        </Card>
    )
}
