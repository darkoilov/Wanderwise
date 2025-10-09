"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Plane, Star, Clock } from "lucide-react"
import { AddPackageForm } from "@/app/admin/packages/components/add-package-form"
import {PackageList} from "@/app/admin/packages/components/package-list";

type Category = "standard" | "featured" | "special" | "lastminute"
type UIPackage = {
    id: string
    title: string
    destination: string
    price: number
    duration: string
    category: Category
    image: string
    description: string
    order: number
    isVisible: boolean
}

export default function AdminDashboardClient({
                                                 initialPackages,
                                                 kpis,
                                             }: {
    initialPackages: UIPackage[]
    kpis: { total: number; featured: number; special: number; lastminute: number }
}) {
    const [activeTab, setActiveTab] = useState<"all" | Category>("all")

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="border-b bg-white">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <p className="text-gray-600 mt-1">Manage your travel packages</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Packages</CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{kpis.total}</div>
                            <p className="text-xs text-muted-foreground">&nbsp;</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Featured</CardTitle>
                            <Star className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{kpis.featured}</div>
                            <p className="text-xs text-muted-foreground">Currently featured</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Special Offers</CardTitle>
                            <Plane className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{kpis.special}</div>
                            <p className="text-xs text-muted-foreground">Active promotions</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Last Minute</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{kpis.lastminute}</div>
                            <p className="text-xs text-muted-foreground">Urgent deals</p>
                        </CardContent>
                    </Card>
                </div>

                <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="space-y-6">
                    <TabsList className="grid w-full grid-cols-5 lg:w-[600px]">
                        <TabsTrigger value="all">All Packages</TabsTrigger>
                        <TabsTrigger value="standard">Standard</TabsTrigger>
                        <TabsTrigger value="featured">Featured</TabsTrigger>
                        <TabsTrigger value="special">Special</TabsTrigger>
                        <TabsTrigger value="add">Add New</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="space-y-4">
                        <PackageList category="all" initialPackages={initialPackages} />
                    </TabsContent>

                    <TabsContent value="standard" className="space-y-4">
                        <PackageList category="standard" initialPackages={initialPackages} />
                    </TabsContent>

                    <TabsContent value="featured" className="space-y-4">
                        <PackageList category="featured" initialPackages={initialPackages} />
                    </TabsContent>

                    <TabsContent value="special" className="space-y-4">
                        <PackageList category="special" initialPackages={initialPackages} />
                    </TabsContent>

                    <TabsContent value="add" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Add New Package</CardTitle>
                                <CardDescription>Create a new travel package</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <AddPackageForm />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
