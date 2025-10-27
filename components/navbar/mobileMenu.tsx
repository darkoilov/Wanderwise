"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, FileText, Package as PackageIcon } from "lucide-react"
import NavbarUserMenu from "./navbar-user-menu"

type NavItem = { name: string; href: string }
type AdminIconKey = "package" | "fileText"
type AdminRoute = { name: string; href: string; icon: AdminIconKey }

const ADMIN_ICONS: Record<AdminIconKey, React.ComponentType<{ className?: string }>> = {
    package: PackageIcon,
    fileText: FileText,
}

export default function MobileMenu({
                                       navigation,
                                       isAdmin,
                                       adminRoutes,
                                       user,
                                   }: {
    navigation: NavItem[]
    isAdmin: boolean
    adminRoutes: AdminRoute[]
    user: any
}) {
    const [open, setOpen] = React.useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                    <Menu className="h-6 w-6" />
                </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-6 mt-6">
                    {/* Mobile Navigation Links */}
                    <div className="flex flex-col space-y-4">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-lg"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Admin Links for Mobile */}
                    {isAdmin && (
                        <div className="border-t pt-4">
                            <p className="text-sm font-semibold text-gray-500 mb-3">Admin</p>
                            <div className="flex flex-col space-y-3">
                                {adminRoutes.map(({ name, href, icon }) => {
                                    const Icon = ADMIN_ICONS[icon] // resolve string -> component
                                    return (
                                        <Link
                                            key={href}
                                            href={href}
                                            onClick={() => setOpen(false)}
                                            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                                        >
                                            <Icon className="h-4 w-4" />
                                            <span>{name}</span>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {/* Mobile CTA & User Section */}
                    <div className="border-t pt-4 flex flex-col space-y-4">
                        <Button className="bg-blue-600 hover:bg-blue-700 w-full">Book Now</Button>
                        <div className="flex justify-center">
                            <NavbarUserMenu user={user} />
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
