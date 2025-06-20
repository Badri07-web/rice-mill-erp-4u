"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts"
import {
  ShoppingCart,
  TrendingUp,
  Users,
  DollarSign,
  Plus,
  Search,
  Eye,
  Edit,
  FileText,
  Phone,
  Mail,
  Calendar,
  Truck,
} from "lucide-react"
import { format } from "date-fns"

const salesOrderData = [
  {
    id: "SO-001",
    orderNumber: "SO-2024-001",
    customer: "ABC Distributors",
    customerContact: "+91-98765-11111",
    customerEmail: "abc@distributors.com",
    orderDate: "2024-03-15",
    deliveryDate: "2024-03-18",
    items: [
      { product: "Basmati Rice", variety: "Pusa 1121", quantity: 500, unit: "MT", rate: 4200, amount: 2100000 },
      { product: "Non-Basmati Rice", variety: "PR-106", quantity: 300, unit: "MT", rate: 3200, amount: 960000 },
    ],
    totalQuantity: 800,
    totalAmount: 3060000,
    status: "Confirmed",
    paymentTerms: "30 Days Credit",
    deliveryLocation: "Delhi",
    salesPerson: "Rajesh Sharma",
    commission: 30600,
    gst: 550800,
    finalAmount: 3610800,
  },
  {
    id: "SO-002",
    orderNumber: "SO-2024-002",
    customer: "XYZ Trading Co.",
    customerContact: "+91-98765-22222",
    customerEmail: "xyz@trading.com",
    orderDate: "2024-03-14",
    deliveryDate: "2024-03-17",
    items: [{ product: "Basmati Rice", variety: "Pusa 1121", quantity: 200, unit: "MT", rate: 4200, amount: 840000 }],
    totalQuantity: 200,
    totalAmount: 840000,
    status: "Dispatched",
    paymentTerms: "Advance Payment",
    deliveryLocation: "Mumbai",
    salesPerson: "Priya Patel",
    commission: 8400,
    gst: 151200,
    finalAmount: 991200,
  },
  {
    id: "SO-003",
    orderNumber: "SO-2024-003",
    customer: "PQR Exports",
    customerContact: "+91-98765-33333",
    customerEmail: "pqr@exports.com",
    orderDate: "2024-03-13",
    deliveryDate: "2024-03-16",
    items: [
      { product: "Basmati Rice", variety: "Pusa 1121", quantity: 1000, unit: "MT", rate: 4300, amount: 4300000 },
      { product: "Rice Bran", variety: "Mixed", quantity: 50, unit: "MT", rate: 800, amount: 40000 },
    ],
    totalQuantity: 1050,
    totalAmount: 4340000,
    status: "Delivered",
    paymentTerms: "15 Days Credit",
    deliveryLocation: "Kolkata",
    salesPerson: "Amit Kumar",
    commission: 43400,
    gst: 781200,
    finalAmount: 5121200,
  },
]

const customerData = [
  {
    id: "CUST-001",
    name: "ABC Distributors",
    contact: "Ramesh Gupta",
    phone: "+91-98765-11111",
    email: "abc@distributors.com",
    address: "123 Market Street, Delhi",
    gstNumber: "07AAACR5055K1Z5",
    creditLimit: 5000000,
    outstandingAmount: 2500000,
    totalOrders: 45,
    totalPurchases: 125000000,
    lastOrderDate: "2024-03-15",
    paymentTerms: "30 Days",
    status: "Active",
    rating: "A",
  },
  {
    id: "CUST-002",
    name: "XYZ Trading Co.",
    contact: "Suresh Patel",
    phone: "+91-98765-22222",
    email: "xyz@trading.com",
    address: "456 Business Park, Mumbai",
    gstNumber: "27AAACX1234K1Z8",
    creditLimit: 3000000,
    outstandingAmount: 800000,
    totalOrders: 32,
    totalPurchases: 85000000,
    lastOrderDate: "2024-03-14",
    paymentTerms: "Advance",
    status: "Active",
    rating: "B+",
  },
  {
    id: "CUST-003",
    name: "PQR Exports",
    contact: "Mohan Singh",
    phone: "+91-98765-33333",
    email: "pqr@exports.com",
    address: "789 Export House, Kolkata",
    gstNumber: "19AAACQ9876K1Z2",
    creditLimit: 10000000,
    outstandingAmount: 0,
    totalOrders: 78,
    totalPurchases: 250000000,
    lastOrderDate: "2024-03-13",
    paymentTerms: "15 Days",
    status: "Active",
    rating: "A+",
  },
]

const salesTeamData = [
  {
    id: "SP-001",
    name: "Rajesh Sharma",
    territory: "North India",
    phone: "+91-98765-44444",
    email: "rajesh@ricemill.com",
    totalSales: 45000000,
    ordersCount: 28,
    commission: 450000,
    target: 50000000,
    achievement: 90,
    customers: 15,
    status: "Active",
  },
  {
    id: "SP-002",
    name: "Priya Patel",
    territory: "West India",
    phone: "+91-98765-55555",
    email: "priya@ricemill.com",
    totalSales: 32000000,
    ordersCount: 22,
    commission: 320000,
    target: 40000000,
    achievement: 80,
    customers: 12,
    status: "Active",
  },
  {
    id: "SP-003",
    name: "Amit Kumar",
    territory: "East India",
    phone: "+91-98765-66666",
    email: "amit@ricemill.com",
    totalSales: 58000000,
    ordersCount: 35,
    commission: 580000,
    target: 60000000,
    achievement: 96.7,
    customers: 18,
    status: "Active",
  },
]

const salesAnalytics = [
  { month: "Oct", sales: 12500000, orders: 45, customers: 28 },
  { month: "Nov", sales: 15200000, orders: 52, customers: 32 },
  { month: "Dec", sales: 18800000, orders: 68, customers: 38 },
  { month: "Jan", sales: 22100000, orders: 75, customers: 42 },
  { month: "Feb", sales: 19500000, orders: 63, customers: 35 },
  { month: "Mar", sales: 25300000, orders: 85, customers: 48 },
]

const productSales = [
  { product: "Basmati Rice", sales: 85000000, percentage: 65, color: "#8884d8" },
  { product: "Non-Basmati Rice", sales: 35000000, percentage: 27, color: "#82ca9d" },
  { product: "Rice Bran", sales: 8000000, percentage: 6, color: "#ffc658" },
  { product: "Broken Rice", sales: 2500000, percentage: 2, color: "#ff7300" },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "Confirmed":
      return <Badge className="bg-blue-100 text-blue-800">Confirmed</Badge>
    case "Dispatched":
      return <Badge className="bg-yellow-100 text-yellow-800">Dispatched</Badge>
    case "Delivered":
      return <Badge className="bg-green-100 text-green-800">Delivered</Badge>
    case "Cancelled":
      return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

function getRatingBadge(rating: string) {
  const colorMap: { [key: string]: string } = {
    "A+": "bg-green-100 text-green-800",
    A: "bg-green-100 text-green-800",
    "B+": "bg-blue-100 text-blue-800",
    B: "bg-yellow-100 text-yellow-800",
    C: "bg-red-100 text-red-800",
  }
  return <Badge className={colorMap[rating] || "bg-gray-100 text-gray-800"}>{rating}</Badge>
}

export default function SalesManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)

  const filteredOrders = salesOrderData.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sales Management</h1>
          <p className="text-muted-foreground">Manage orders, customers, and sales performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Order
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{(salesOrderData.reduce((sum, order) => sum + order.finalAmount, 0) / 10000000).toFixed(1)}Cr
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{salesOrderData.length}</div>
            <p className="text-xs text-muted-foreground">
              {salesOrderData.filter((order) => order.status !== "Delivered").length} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customerData.length}</div>
            <p className="text-xs text-muted-foreground">Active customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹
              {(
                salesOrderData.reduce((sum, order) => sum + order.finalAmount, 0) /
                salesOrderData.length /
                100000
              ).toFixed(1)}
              L
            </div>
            <p className="text-xs text-muted-foreground">Per order</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList>
          <TabsTrigger value="orders">Sales Orders</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="team">Sales Team</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by order number or customer..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="dispatched">Dispatched</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Orders Table */}
          <Card>
            <CardHeader>
              <CardTitle>Sales Orders</CardTitle>
              <CardDescription>Complete list of sales orders with details</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order Number</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Delivery Date</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sales Person</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.orderNumber}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{order.customer}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {order.customerContact}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {format(new Date(order.orderDate), "dd/MM/yyyy")}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Truck className="h-3 w-3 text-muted-foreground" />
                          {format(new Date(order.deliveryDate), "dd/MM/yyyy")}
                        </div>
                      </TableCell>
                      <TableCell>{order.totalQuantity} MT</TableCell>
                      <TableCell>₹{(order.finalAmount / 100000).toFixed(1)}L</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>{order.salesPerson}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(order)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>Order Details - {order.orderNumber}</DialogTitle>
                                <DialogDescription>Complete order information and items</DialogDescription>
                              </DialogHeader>
                              {selectedOrder && <OrderDetailsModal order={selectedOrder} />}
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Management</CardTitle>
              <CardDescription>Customer information and purchase history</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Contact Person</TableHead>
                    <TableHead>Contact Info</TableHead>
                    <TableHead>Credit Limit</TableHead>
                    <TableHead>Outstanding</TableHead>
                    <TableHead>Total Orders</TableHead>
                    <TableHead>Total Purchases</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customerData.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.contact}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            {customer.phone}
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            {customer.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>₹{(customer.creditLimit / 100000).toFixed(1)}L</TableCell>
                      <TableCell>₹{(customer.outstandingAmount / 100000).toFixed(1)}L</TableCell>
                      <TableCell>{customer.totalOrders}</TableCell>
                      <TableCell>₹{(customer.totalPurchases / 10000000).toFixed(1)}Cr</TableCell>
                      <TableCell>{getRatingBadge(customer.rating)}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">{customer.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedCustomer(customer)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>Customer Details - {customer.name}</DialogTitle>
                                <DialogDescription>Complete customer information and history</DialogDescription>
                              </DialogHeader>
                              {selectedCustomer && <CustomerDetailsModal customer={selectedCustomer} />}
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Team Performance</CardTitle>
              <CardDescription>Sales team metrics and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sales Person</TableHead>
                    <TableHead>Territory</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Total Sales</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Commission</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Achievement</TableHead>
                    <TableHead>Customers</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesTeamData.map((person) => (
                    <TableRow key={person.id}>
                      <TableCell className="font-medium">{person.name}</TableCell>
                      <TableCell>{person.territory}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            {person.phone}
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            {person.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>₹{(person.totalSales / 10000000).toFixed(1)}Cr</TableCell>
                      <TableCell>{person.ordersCount}</TableCell>
                      <TableCell>₹{(person.commission / 100000).toFixed(1)}L</TableCell>
                      <TableCell>₹{(person.target / 10000000).toFixed(1)}Cr</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{person.achievement.toFixed(1)}%</span>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${person.achievement >= 100 ? "bg-green-600" : person.achievement >= 80 ? "bg-yellow-600" : "bg-red-600"}`}
                              style={{ width: `${Math.min(person.achievement, 100)}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{person.customers}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">{person.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Sales Trend</CardTitle>
                <CardDescription>Monthly sales performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    sales: { label: "Sales (₹)", color: "hsl(var(--chart-1))" },
                    orders: { label: "Orders", color: "hsl(var(--chart-2))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesAnalytics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="sales" stroke="var(--color-sales)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Product Sales Distribution</CardTitle>
                <CardDescription>Sales by product category</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    sales: { label: "Sales (₹)" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={productSales}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ product, percentage }) => `${product} ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="sales"
                      >
                        {productSales.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {productSales.slice(0, 3).map((product, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{product.product}</p>
                        <p className="text-sm text-muted-foreground">₹{(product.sales / 10000000).toFixed(1)}Cr</p>
                      </div>
                      <Badge>{product.percentage}%</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {customerData.slice(0, 3).map((customer, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ₹{(customer.totalPurchases / 10000000).toFixed(1)}Cr
                        </p>
                      </div>
                      {getRatingBadge(customer.rating)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sales Targets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {salesTeamData.map((person, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{person.name}</span>
                        <span>{person.achievement.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${person.achievement >= 100 ? "bg-green-600" : person.achievement >= 80 ? "bg-yellow-600" : "bg-red-600"}`}
                          style={{ width: `${Math.min(person.achievement, 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function OrderDetailsModal({ order }: { order: any }) {
  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="details">Order Details</TabsTrigger>
        <TabsTrigger value="items">Items</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>

      <TabsContent value="details" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Number:</span>
                <span className="font-medium">{order.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Customer:</span>
                <span className="font-medium">{order.customer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Date:</span>
                <span className="font-medium">{format(new Date(order.orderDate), "dd/MM/yyyy")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Date:</span>
                <span className="font-medium">{format(new Date(order.deliveryDate), "dd/MM/yyyy")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                {getStatusBadge(order.status)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Contact:</span>
                <span className="font-medium">{order.customerContact}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium">{order.customerEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Location:</span>
                <span className="font-medium">{order.deliveryLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Terms:</span>
                <span className="font-medium">{order.paymentTerms}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sales Person:</span>
                <span className="font-medium">{order.salesPerson}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="items" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Variety</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.product}</TableCell>
                    <TableCell>{item.variety}</TableCell>
                    <TableCell>
                      {item.quantity} {item.unit}
                    </TableCell>
                    <TableCell>₹{item.rate.toLocaleString()}</TableCell>
                    <TableCell>₹{(item.amount / 100000).toFixed(1)}L</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="billing" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Billing Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal:</span>
              <span className="font-medium">₹{(order.totalAmount / 100000).toFixed(1)}L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Commission:</span>
              <span className="font-medium">₹{(order.commission / 1000).toFixed(1)}K</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">GST (18%):</span>
              <span className="font-medium">₹{(order.gst / 100000).toFixed(1)}L</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between font-medium text-lg">
                <span>Final Amount:</span>
                <span>₹{(order.finalAmount / 100000).toFixed(1)}L</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

function CustomerDetailsModal({ customer }: { customer: any }) {
  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="details">Customer Details</TabsTrigger>
        <TabsTrigger value="financial">Financial Info</TabsTrigger>
        <TabsTrigger value="history">Order History</TabsTrigger>
      </TabsList>

      <TabsContent value="details" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Customer Name:</span>
                <span className="font-medium">{customer.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Contact Person:</span>
                <span className="font-medium">{customer.contact}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone:</span>
                <span className="font-medium">{customer.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium">{customer.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">GST Number:</span>
                <span className="font-medium">{customer.gstNumber}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Address & Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="text-muted-foreground">Address:</span>
                <p className="font-medium mt-1">{customer.address}</p>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge className="bg-green-100 text-green-800">{customer.status}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rating:</span>
                {getRatingBadge(customer.rating)}
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Terms:</span>
                <span className="font-medium">{customer.paymentTerms}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="financial" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Financial Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Credit Limit:</span>
              <span className="font-medium">₹{(customer.creditLimit / 100000).toFixed(1)}L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Outstanding Amount:</span>
              <span className="font-medium">₹{(customer.outstandingAmount / 100000).toFixed(1)}L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Available Credit:</span>
              <span className="font-medium">
                ₹{((customer.creditLimit - customer.outstandingAmount) / 100000).toFixed(1)}L
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Purchases:</span>
              <span className="font-medium">₹{(customer.totalPurchases / 10000000).toFixed(1)}Cr</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Orders:</span>
              <span className="font-medium">{customer.totalOrders}</span>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="history" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">SO-2024-001</p>
                    <p className="text-sm text-muted-foreground">15/03/2024</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹36.1L</p>
                    <Badge className="bg-green-100 text-green-800">Delivered</Badge>
                  </div>
                </div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">SO-2024-002</p>
                    <p className="text-sm text-muted-foreground">10/03/2024</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹28.5L</p>
                    <Badge className="bg-blue-100 text-blue-800">Confirmed</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
