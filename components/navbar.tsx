// components/navbar.tsx (Server Component)
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {FileText, Package, Plane, Settings} from "lucide-react"
import { auth } from "@/lib/auth"
import NavbarUserMenu from "./navbar-user-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu"
import {DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

export default async function Navbar() {
  const session = await auth()
  const user = session?.user || null

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Packages", href: "/packages" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Custom Itinerary", href: "/custom-itinerary" },
    { name: "Blog", href: "/blog" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Contact", href: "/contact" },
  ]

  const adminRoutes = [
    { name: "Packages", href: "/admin/packages", icon: Package },
    { name: "Blog", href: "/admin/blog", icon: FileText },
  ]

  return (
      <nav id="mainNav" className="sticky top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50 ">
        <div className="px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">WanderWise</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                  <Link
                      key={item.name}
                      href={item.href}
                      className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    {item.name}
                  </Link>
              ))}
              {user && user?.role === "admin" && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors focus:outline-none">
                        <Settings className="h-4 w-4" />
                        <span>Admin</span>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                      {adminRoutes.map(({ name, href, icon: Icon }) => (
                          <DropdownMenuItem key={href} asChild>
                            <Link href={href} className="cursor-pointer">
                              <Icon className="mr-2 h-4 w-4" />
                              {name}
                            </Link>
                          </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
              )}
            </div>

            {/* Desktop CTA & User Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Book Now
              </Button>

              {/* User Menu */}
              <NavbarUserMenu user={user} />
            </div>
          </div>
        </div>
      </nav>
  )
}
