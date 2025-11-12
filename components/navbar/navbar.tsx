// components/navbar/navbar.tsx (Server Component)
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plane, ChevronDown, Settings } from "lucide-react"
import { auth } from "@/lib/auth"
import NavbarUserMenu from "./navbar-user-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import MobileMenu from "./mobileMenu"

export default async function Navbar() {
  const session = await auth()
  const user = session?.user || null
  const isAdmin = !!(user && (user as any).role === "admin")

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "About2", href: "/about2" },
    { name: "Packages", href: "/packages" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Custom Itinerary", href: "/custom-itinerary" },
    { name: "Blog", href: "/blog" },
    // { name: "Testimonials", href: "/testimonials" },
    { name: "Contact", href: "/contact" },
  ]

  const adminRoutes = [
    { name: "Packages", href: "/admin/packages" },
    { name: "Blog", href: "/admin/blog" },
  ]

  // Keep Home, About, Packages as top-level visible links
  const topLevel = navigation.filter((item) => ["/", "/about", "/about2", "/packages", "/blog", "/contact"].includes(item.href))

  // Group others into Explore / Resources
  const exploreItems = navigation.filter((item) => ["/how-it-works", "/custom-itinerary"].includes(item.href))

  return (
    <nav
      id="mainNav"
      className="sticky top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 z-50 shadow-sm"
    >
      <div className="px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-blue-600 p-2 rounded-lg transition-transform duration-300 group-hover:scale-105">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-600">
              WanderWise
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {topLevel.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 hover:bg-blue-50 rounded-md"
              >
                {item.name}
              </Link>
            ))}

            {/* Explore Dropdown (remaining "explore" pages) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 hover:bg-blue-50 rounded-md focus:outline-none">
                  <span>Explore</span>
                  <ChevronDown className="h-4 w-4 transition-transform duration-300" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-2 py-1.5">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2 pb-2">
                    Discover & Plan
                  </p>
                  {exploreItems.map(({ name, href }) => (
                    <DropdownMenuItem key={href} asChild className="rounded-md transition-colors duration-150">
                      <Link href={href} className="cursor-pointer">
                        {name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

           
            {/* Admin dropdown (if admin) */}
            {isAdmin && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 hover:bg-blue-50 rounded-md focus:outline-none">
                    <Settings className="h-4 w-4" />
                    <span>Admin</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-2 py-1.5">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2 pb-2">Management</p>
                    {adminRoutes.map(({ name, href }) => (
                      <DropdownMenuItem key={href} asChild className="rounded-md transition-colors duration-150">
                        <Link href={href} className="cursor-pointer">
                          {name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Desktop CTA & User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Book Now
            </Button>
            <NavbarUserMenu user={user} />
          </div>

          {/* Mobile Hamburger / Drawer (Client Component) */}
          <MobileMenu
            navigation={navigation}
            exploreItems={exploreItems}
            isAdmin={isAdmin}
            adminRoutes={adminRoutes}
            user={user}
          />
        </div>
      </div>
    </nav>
  )
}
