

import type React from "react"

import { usePathname } from "next/navigation"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"
import { Breadcrumbs } from "@/components/breadcrumbs"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/login" || pathname === "/"

  if (isLoginPage) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    )
  }

  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <AppSidebar />
          <div className="flex-1 flex flex-col min-h-screen">
            <Header />
            <div className="flex-1 flex flex-col">
              <div className="border-b bg-background px-6 py-3">
                <Breadcrumbs />
              </div>
              <main className="flex-1 p-6 bg-gray-50/50">{children}</main>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
