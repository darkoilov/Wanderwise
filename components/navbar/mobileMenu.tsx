"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ChevronDown } from "lucide-react"
import NavbarUserMenu from "./navbar-user-menu"

type NavItem = { name: string; href: string }

export default function MobileMenu({
  navigation,
  exploreItems,
  resourceItems,
  isAdmin,
  adminRoutes,
  user,
}: {
  navigation: NavItem[]
  exploreItems: NavItem[]
  resourceItems: NavItem[]
  isAdmin: boolean
  adminRoutes: { name: string; href: string }[]
  user: any
}) {
  const [open, setOpen] = React.useState(false)
  const [expandedSection, setExpandedSection] = React.useState<string | null>(null)

  const topLevel = navigation.filter((item) => ["/", "/about", "/packages"].includes(item.href))

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col space-y-4 mt-6 h-full">
          {/* Top-level Navigation Links */}
          <div className="flex flex-col space-y-2">
            {topLevel.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-4 py-2.5 text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200 rounded-md"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="border-t pt-4">
            <button
              onClick={() => toggleSection("explore")}
              className="w-full flex items-center justify-between px-4 py-2.5 text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200 rounded-md"
            >
              <span>Explore</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${
                  expandedSection === "explore" ? "rotate-180" : ""
                }`}
              />
            </button>
            {expandedSection === "explore" && (
              <div className="flex flex-col space-y-2 mt-2 pl-2">
                {exploreItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-md text-sm"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="border-t pt-4">
            <button
              onClick={() => toggleSection("resources")}
              className="w-full flex items-center justify-between px-4 py-2.5 text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200 rounded-md"
            >
              <span>Resources</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${
                  expandedSection === "resources" ? "rotate-180" : ""
                }`}
              />
            </button>
            {expandedSection === "resources" && (
              <div className="flex flex-col space-y-2 mt-2 pl-2">
                {resourceItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-md text-sm"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {isAdmin && (
            <div className="border-t pt-4">
              <button
                onClick={() => toggleSection("admin")}
                className="w-full flex items-center justify-between px-4 py-2.5 text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200 rounded-md"
              >
                <span>Admin</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    expandedSection === "admin" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expandedSection === "admin" && (
                <div className="flex flex-col space-y-2 mt-2 pl-2">
                  {adminRoutes.map(({ name, href }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setOpen(false)}
                      className="px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-md text-sm"
                    >
                      {name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Mobile CTA & User Section */}
          <div className="border-t pt-4 mt-auto flex flex-col space-y-4">
            <Button className="bg-blue-600 hover:bg-blue-700 w-full transition-all duration-200">Book Now</Button>
            <div className="flex justify-center">
              <NavbarUserMenu user={user} />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
