"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Eye, EyeOff, Bookmark } from "lucide-react"
import { BlogPostList } from "@/app/admin/blog/components/BlogPostList"
import { AddBlogPostForm } from "@/app/admin/blog/components/AddBlogPostForm"

export type UIBlogPost = {
    id: string
    title: string
    excerpt?: string
    image?: string
    author: string
    category: string
    tags: string[]
    readTime?: number
    publishedAt: Date | null
    order: number
    isVisible: boolean
}

export default function AdminBlogDashboardClient({
                                                     initialPosts,
                                                     kpis,
                                                 }: {
    initialPosts: UIBlogPost[]
    kpis: { total: number; published: number; drafts: number; byCategory: Record<string, number> }
}) {
    const [activeTab, setActiveTab] = useState<"all" | "published" | "drafts" | "add">("all")

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="border-b bg-white">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-3xl font-bold">Blog Admin</h1>
                    <p className="text-gray-600 mt-1">Manage your blog posts</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{kpis.total}</div>
                            <p className="text-xs text-muted-foreground">&nbsp;</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Published</CardTitle>
                            <Eye className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{kpis.published}</div>
                            <p className="text-xs text-muted-foreground">Visible & dated</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{kpis.drafts}</div>
                            <p className="text-xs text-muted-foreground">Hidden or undated</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Categories</CardTitle>
                            <Bookmark className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-muted-foreground space-y-1">
                                {Object.entries(kpis.byCategory).map(([name, n]) => (
                                    <div key={name} className="flex justify-between">
                                        <span>{name}</span>
                                        <span className="font-medium text-foreground">{n}</span>
                                    </div>
                                ))}
                                {Object.keys(kpis.byCategory).length === 0 && <span>N/A</span>}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
                        <TabsTrigger value="all">All Posts</TabsTrigger>
                        <TabsTrigger value="published">Published</TabsTrigger>
                        <TabsTrigger value="drafts">Drafts</TabsTrigger>
                        <TabsTrigger value="add">Add New</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="space-y-4">
                        <BlogPostList filter="all" initialPosts={initialPosts} />
                    </TabsContent>

                    <TabsContent value="published" className="space-y-4">
                        <BlogPostList filter="published" initialPosts={initialPosts} />
                    </TabsContent>

                    <TabsContent value="drafts" className="space-y-4">
                        <BlogPostList filter="drafts" initialPosts={initialPosts} />
                    </TabsContent>

                    <TabsContent value="add" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Add New Post</CardTitle>
                                <CardDescription>Create a new blog post</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <AddBlogPostForm />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
