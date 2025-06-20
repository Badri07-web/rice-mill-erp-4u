"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

export function Breadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  const breadcrumbItems = [{ label: "Home", href: "/dashboard", icon: Home }]

  let currentPath = ""
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const label = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

    breadcrumbItems.push({
      label,
      href: currentPath,
    })
  })

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
      {breadcrumbItems.map((item, index) => (
        <div key={item.href} className="flex items-center">
          {index > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
          {index === breadcrumbItems.length - 1 ? (
            <span className="font-medium text-foreground flex items-center">
              {item.icon && <item.icon className="h-4 w-4 mr-1" />}
              {item.label}
            </span>
          ) : (
            <Link href={item.href} className="hover:text-foreground flex items-center">
              {item.icon && <item.icon className="h-4 w-4 mr-1" />}
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}
