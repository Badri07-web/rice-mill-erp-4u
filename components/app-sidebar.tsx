"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  LayoutDashboard,
  FileText,
  Package,
  Truck,
  Factory,
  Warehouse,
  ShoppingCart,
  DollarSign,
  BarChart3,
  Settings,
  ChevronDown,
  User,
  Wheat,
} from "lucide-react"

const navigationItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/dashboard",
    roles: ["admin", "manager", "operator", "accounts"],
  },
  {
    title: "Paddy Agreements",
    icon: FileText,
    roles: ["admin", "manager"],
    items: [
      { title: "Agreement Overview", url: "/agreements" },
      { title: "Agreement Details", url: "/agreements/details" },
      { title: "Government Portal Sync", url: "/agreements/sync" },
    ],
  },
  {
    title: "DO Management",
    icon: Package,
    roles: ["admin", "manager", "operator"],
    items: [
      { title: "DO Registry", url: "/do-management" },
      { title: "DO Details", url: "/do-management/details" },
      { title: "DO Trading Platform", url: "/do-management/trading" },
    ],
  },
  {
    title: "Transportation",
    icon: Truck,
    roles: ["admin", "manager"],
    items: [
      { title: "Transportation Dashboard", url: "/transportation" },
      { title: "Fleet Management", url: "/transportation/fleet" },
      { title: "Trip Management", url: "/transportation/trips" },
      { title: "Cost Analysis", url: "/transportation/analytics" },
    ],
  },
  {
    title: "Production",
    icon: Factory,
    roles: ["admin", "manager", "operator"],
    items: [
      { title: "Production Dashboard", url: "/production" },
      { title: "Production Planning", url: "/production/planning" },
      { title: "Quality Control", url: "/production/quality" },
    ],
  },
  {
    title: "Inventory",
    icon: Warehouse,
    roles: ["admin", "manager", "operator"],
    items: [
      { title: "Inventory Dashboard", url: "/inventory" },
      { title: "Raw Material Inventory", url: "/inventory/raw-materials" },
      { title: "Finished Goods Inventory", url: "/inventory/finished-goods" },
      { title: "Byproducts Inventory", url: "/inventory/byproducts" },
    ],
  },
  {
    title: "Sales",
    icon: ShoppingCart,
    roles: ["admin", "manager", "accounts"],
    items: [
      { title: "Sales Dashboard", url: "/sales" },
      { title: "Government Sales", url: "/sales/government" },
      { title: "Byproduct Sales", url: "/sales/byproducts" },
      { title: "Invoice Management", url: "/sales/invoices" },
    ],
  },
  {
    title: "Finance",
    icon: DollarSign,
    roles: ["admin", "manager", "accounts"],
    items: [
      { title: "Financial Dashboard", url: "/finance" },
      { title: "Accounts Receivable", url: "/finance/receivables" },
      { title: "Accounts Payable", url: "/finance/payables" },
      { title: "Cost Accounting", url: "/finance/cost-accounting" },
    ],
  },
  {
    title: "Reports & Analytics",
    icon: BarChart3,
    roles: ["admin", "manager", "accounts"],
    items: [
      { title: "Report Center", url: "/reports" },
      { title: "Analytics Dashboard", url: "/reports/analytics" },
    ],
  },
  {
    title: "Administration",
    icon: Settings,
    roles: ["admin"],
    items: [
      { title: "User Management", url: "/admin/users" },
      { title: "System Settings", url: "/admin/settings" },
      { title: "Audit & Compliance", url: "/admin/audit" },
    ],
  },
]

export function AppSidebar() {
  const [userRole, setUserRole] = useState<string>("")
  const pathname = usePathname()

  useEffect(() => {
    const role = localStorage.getItem("userRole") || "operator"
    setUserRole(role)
  }, [])

  const filteredNavigation = navigationItems.filter((item) => item.roles.includes(userRole))

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="bg-green-600 p-2 rounded-lg">
            <Wheat className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Rice Mill ERP</h2>
            <p className="text-xs text-muted-foreground capitalize">{userRole} Panel</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredNavigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible defaultOpen={pathname.startsWith(item.items[0]?.url.split("/")[1] || "")}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="w-full">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                          <ChevronDown className="ml-auto h-4 w-4" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                                <Link href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url!}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <User className="h-4 w-4" />
              <span className="capitalize">{userRole} User</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
