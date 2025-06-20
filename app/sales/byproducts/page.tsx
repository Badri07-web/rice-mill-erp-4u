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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts"
import {
  Recycle,
  TrendingUp,
  DollarSign,
  Users,
  Plus,
  Search,
  Eye,
  Edit,
  Download,
  Calendar,
  Phone,
  Truck,
} from "lucide-react"
import { format } from "date-fns"

const byproductSalesData = [
  {
    id: "BPS-001",
    orderNumber: "BPS-2024-001",
    customer: "Poultry Feed Industries Ltd",
    customerContact: "+91-98765-44444",
    customerEmail: "purchase@poultryfeed.com",
    orderDate: "2024-03-15",
    deliveryDate: "2024-03-18",
    items: [
      { product: "Rice Bran", quantity: 500, unit: "MT", rate: 800, amount: 400000 },
      { product: "Rice Polish", quantity: 100, unit: "MT", rate: 1200, amount: 120000 },
    ],
    totalQuantity: 600,
    totalAmount: 520000,
    status: "Confirmed",
    paymentTerms: "15 Days Credit",
    deliveryLocation: "Gurgaon",
    salesPerson: "Suresh Kumar",
    commission: 5200,
    gst: 93600,
    finalAmount: 613600,
    category: "Animal Feed",
  },
  {
    id: "BPS-002",
    orderNumber: "BPS-2024-002",
    customer: "Green Energy Solutions",
    customerContact: "+91-98765-55555",
    customerEmail: "procurement@greenenergy.com",
    orderDate: "2024-03-14",
    deliveryDate: "2024-03-17",
    items: [{ product: "Rice Husk", quantity: 1000, unit: "MT", rate: 300, amount: 300000 }],
    totalQuantity: 1000,
    totalAmount: 300000,
    status: "Dispatched",
    paymentTerms: "Advance Payment",
    deliveryLocation: "Faridabad",
    salesPerson: "Rajesh Patel",
    commission: 3000,
    gst: 54000,
    finalAmount: 354000,
    category: "Fuel/Energy",
  },
  {
    id: "BPS-003",
    orderNumber: "BPS-2024-003",
    customer: "Sunrise Oil Mills",
    customerContact: "+91-98765-66666",
    customerEmail: "buying@sunriseoil.com",
    orderDate: "2024-03-13",
    deliveryDate: "2024-03-16",
    items: [{ product: "Rice Bran", quantity: 800, unit: "MT", rate: 850, amount: 680000 }],
    totalQuantity: 800,
    totalAmount: 680000,
    status: "Delivered",
    paymentTerms: "30 Days Credit",
    deliveryLocation: "Ludhiana",
    salesPerson: "Amit Singh",
    commission: 6800,
    gst: 122400,
    finalAmount: 802400,
    category: "Oil Extraction",
  },
  {
    id: "BPS-004",
    orderNumber: "BPS-2024-004",
    customer: "Craft Breweries Pvt Ltd",
    customerContact: "+91-98765-77777",
    customerEmail: "sourcing@craftbrew.com",
    orderDate: "2024-03-12",
    deliveryDate: "2024-03-15",
    items: [{ product: "Broken Rice", quantity: 200, unit: "MT", rate: 1800, amount: 360000 }],
    totalQuantity: 200,
    totalAmount: 360000,
    status: "Delivered",
    paymentTerms: "Advance Payment",
    deliveryLocation: "Bangalore",
    salesPerson: "Priya Sharma",
    commission: 3600,
    gst: 64800,
    finalAmount: 424800,
    category: "Food Processing",
  },
]

const customerSegments = [
  {
    segment: "Animal Feed Industry",
    customers: 15,
    totalSales: 12500000,
    avgOrderSize: 450,
    products: ["Rice Bran", "Rice Polish", "Broken Rice"],
    growth: "+18%",
  },
  {
    segment: "Oil Extraction",
    customers: 8,
    totalSales: 8200000,
    avgOrderSize: 650,
    products: ["Rice Bran"],
    growth: "+25%",
  },
  {
    segment: "Fuel/Energy",
    customers: 12,
    totalSales: 6800000,
    avgOrderSize: 850,
    products: ["Rice Husk"],
    growth: "+35%",
  },
  {
    segment: "Food Processing",
    customers: 6,
    totalSales: 4200000,
    avgOrderSize: 280,
    products: ["Broken Rice", "Rice Tips"],
    growth: "+12%",
  },
]

const monthlySalesTrends = [
  { month: "Oct", animalFeed: 2800000, oilExtraction: 1200000, fuel: 950000, foodProcessing: 650000 },
  { month: "Nov", animalFeed: 3200000, oilExtraction: 1450000, fuel: 1100000, foodProcessing: 720000 },
  { month: "Dec", animalFeed: 3800000, oilExtraction: 1650000, fuel: 1350000, foodProcessing: 850000 },
  { month: "Jan", animalFeed: 3500000, oilExtraction: 1580000, fuel: 1280000, foodProcessing: 780000 },
  { month: "Feb", animalFeed: 4200000, oilExtraction: 1850000, fuel: 1520000, foodProcessing: 920000 },
  { month: "Mar", animalFeed: 4500000, oilExtraction: 2100000, fuel: 1680000, foodProcessing: 1050000 },
]

const productPerformance = [
  { product: "Rice Bran", sales: 18500000, volume: 2300, margin: 22, trend: "+15%" },
  { product: "Rice Husk", sales: 8200000, volume: 2800, margin: 18, trend: "+28%" },
  { product: "Broken Rice", sales: 6800000, volume: 380, margin: 25, trend: "+8%" },
  { product: "Rice Polish", sales: 3200000, volume: 280, margin: 20, trend: "+12%" },
  { product: "Rice Tips", sales: 1800000, volume: 85, margin: 30, trend: "+5%" },
]

export default function ByproductSalesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  const getStatusBadge = (status: string) => {
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

  const getCategoryBadge = (category: string) => {
    const colorMap: { [key: string]: string } = {
      "Animal Feed": "bg-green-100 text-green-800",
      "Oil Extraction": "bg-blue-100 text-blue-800",
      "Fuel/Energy": "bg-orange-100 text-orange-800",
      "Food Processing": "bg-purple-100 text-purple-800",
    }
    return <Badge className={colorMap[category] || "bg-gray-100 text-gray-800"}>{category}</Badge>
  }

  const filteredOrders = byproductSalesData.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || order.category.toLowerCase().includes(categoryFilter)
    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Byproduct Sales</h1>
          <p className="text-muted-foreground">Manage sales of rice processing byproducts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
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
              ₹{(byproductSalesData.reduce((sum, order) => sum + order.finalAmount, 0) / 1000000).toFixed(1)}L
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <Recycle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{byproductSalesData.length}</div>
            <p className="text-xs text-muted-foreground">
              {byproductSalesData.filter((order) => order.status !== "Delivered").length} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customerSegments.reduce((sum, segment) => sum + segment.customers, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Across all segments</p>
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
                byproductSalesData.reduce((sum, order) => sum + order.finalAmount, 0) /
                byproductSalesData.length /
                1000
              ).toFixed(0)}
              K
            </div>
            <p className="text-xs text-muted-foreground">Per order</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList>
          <TabsTrigger value="orders">Sales Orders</TabsTrigger>
          <TabsTrigger value="customers">Customer Segments</TabsTrigger>
          <TabsTrigger value="products">Product Performance</TabsTrigger>
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
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="animal feed">Animal Feed</SelectItem>
                    <SelectItem value="oil extraction">Oil Extraction</SelectItem>
                    <SelectItem value="fuel">Fuel/Energy</SelectItem>
                    <SelectItem value="food processing">Food Processing</SelectItem>
                  </SelectContent>
                </Select>
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
              <CardTitle>Byproduct Sales Orders</CardTitle>
              <CardDescription>Complete list of byproduct sales orders</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order Number</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Category</TableHead>
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
                      <TableCell>{getCategoryBadge(order.category)}</TableCell>
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
                      <TableCell>₹{(order.finalAmount / 1000).toFixed(0)}K</TableCell>
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
                                <DialogDescription>Complete byproduct order information</DialogDescription>
                              </DialogHeader>
                              {selectedOrder && <ByproductOrderDetailsModal order={selectedOrder} />}
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

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Segments</CardTitle>
              <CardDescription>Analysis by customer industry segments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Segment</TableHead>
                    <TableHead>Customers</TableHead>
                    <TableHead>Total Sales</TableHead>
                    <TableHead>Avg Order Size</TableHead>
                    <TableHead>Main Products</TableHead>
                    <TableHead>Growth</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customerSegments.map((segment, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{segment.segment}</TableCell>
                      <TableCell>{segment.customers}</TableCell>
                      <TableCell>₹{(segment.totalSales / 1000000).toFixed(1)}L</TableCell>
                      <TableCell>{segment.avgOrderSize} MT</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {segment.products.slice(0, 2).map((product, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {product}
                            </Badge>
                          ))}
                          {segment.products.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{segment.products.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-green-600 font-medium">{segment.growth}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Customer Segments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Animal Feed Industry</span>
                    <span className="font-medium">₹12.5L</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Oil Extraction</span>
                    <span className="font-medium">₹8.2L</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fuel/Energy</span>
                    <span className="font-medium">₹6.8L</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Food Processing</span>
                    <span className="font-medium">₹4.2L</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Growth Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-green-800">Fuel/Energy Sector</h4>
                    <p className="text-sm text-muted-foreground">Highest growth at +35%</p>
                    <p className="text-sm font-medium text-green-600">Expand rice husk sales</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-blue-800">Oil Extraction</h4>
                    <p className="text-sm text-muted-foreground">Strong growth at +25%</p>
                    <p className="text-sm font-medium text-blue-600">Premium rice bran market</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
              <CardDescription>Sales performance by byproduct type</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Sales Value</TableHead>
                    <TableHead>Volume Sold</TableHead>
                    <TableHead>Profit Margin</TableHead>
                    <TableHead>Growth Trend</TableHead>
                    <TableHead>Market Share</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productPerformance.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{product.product}</TableCell>
                      <TableCell>₹{(product.sales / 1000000).toFixed(1)}L</TableCell>
                      <TableCell>{product.volume.toLocaleString()} MT</TableCell>
                      <TableCell>{product.margin}%</TableCell>
                      <TableCell>
                        <span className="text-green-600 font-medium">{product.trend}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${(product.sales / 18500000) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm">{Math.round((product.sales / 18500000) * 100)}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Best Performing Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Rice Bran</span>
                    <span className="font-medium">₹18.5L</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rice Husk</span>
                    <span className="font-medium">₹8.2L</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Broken Rice</span>
                    <span className="font-medium">₹6.8L</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Highest Margins</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Rice Tips</span>
                    <span className="font-medium">30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Broken Rice</span>
                    <span className="font-medium">25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rice Bran</span>
                    <span className="font-medium">22%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Growth Leaders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Rice Husk</span>
                    <span className="font-medium text-green-600">+28%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rice Bran</span>
                    <span className="font-medium text-green-600">+15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rice Polish</span>
                    <span className="font-medium text-green-600">+12%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Trends by Category</CardTitle>
              <CardDescription>Monthly sales performance by customer segment</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  animalFeed: { label: "Animal Feed", color: "hsl(var(--chart-1))" },
                  oilExtraction: { label: "Oil Extraction", color: "hsl(var(--chart-2))" },
                  fuel: { label: "Fuel/Energy", color: "hsl(var(--chart-3))" },
                  foodProcessing: { label: "Food Processing", color: "hsl(var(--chart-4))" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlySalesTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="animalFeed" stroke="var(--color-animalFeed)" strokeWidth={2} />
                    <Line type="monotone" dataKey="oilExtraction" stroke="var(--color-oilExtraction)" strokeWidth={2} />
                    <Line type="monotone" dataKey="fuel" stroke="var(--color-fuel)" strokeWidth={2} />
                    <Line
                      type="monotone"
                      dataKey="foodProcessing"
                      stroke="var(--color-foodProcessing)"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Product</CardTitle>
                <CardDescription>Product-wise revenue contribution</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    sales: { label: "Sales (₹)", color: "hsl(var(--chart-1))" },
                  }}
                  className="h-[250px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={productPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="product" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="sales" fill="var(--color-sales)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
                <CardDescription>Important performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">₹38.5L</div>
                      <div className="text-sm text-muted-foreground">Total Revenue</div>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">3,845 MT</div>
                      <div className="text-sm text-muted-foreground">Volume Sold</div>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">23%</div>
                      <div className="text-sm text-muted-foreground">Avg Margin</div>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">+18%</div>
                      <div className="text-sm text-muted-foreground">YoY Growth</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Market Insights</CardTitle>
              <CardDescription>Strategic insights and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-green-800">Opportunity</h4>
                    <p className="text-sm text-muted-foreground">Fuel/Energy sector showing 35% growth</p>
                    <p className="text-sm font-medium text-green-600">Expand rice husk production</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-blue-800">Value Addition</h4>
                    <p className="text-sm text-muted-foreground">Process rice bran into oil</p>
                    <p className="text-sm font-medium text-blue-600">40% higher margins possible</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-purple-800">Market Expansion</h4>
                    <p className="text-sm text-muted-foreground">Export broken rice to brewing industry</p>
                    <p className="text-sm font-medium text-purple-600">25% price premium</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-orange-800">Partnership</h4>
                    <p className="text-sm text-muted-foreground">Direct contracts with feed mills</p>
                    <p className="text-sm font-medium text-orange-600">Reduce intermediary costs</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ByproductOrderDetailsModal({ order }: { order: any }) {
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
                <span className="text-muted-foreground">Category:</span>
                <Badge className="bg-blue-100 text-blue-800">{order.category}</Badge>
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
                  <TableHead>Quantity</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.product}</TableCell>
                    <TableCell>
                      {item.quantity} {item.unit}
                    </TableCell>
                    <TableCell>₹{item.rate.toLocaleString()}</TableCell>
                    <TableCell>₹{(item.amount / 1000).toFixed(0)}K</TableCell>
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
              <span className="font-medium">₹{(order.totalAmount / 1000).toFixed(0)}K</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Commission:</span>
              <span className="font-medium">₹{(order.commission / 1000).toFixed(1)}K</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">GST (18%):</span>
              <span className="font-medium">₹{(order.gst / 1000).toFixed(0)}K</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between font-medium text-lg">
                <span>Final Amount:</span>
                <span>₹{(order.finalAmount / 1000).toFixed(0)}K</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

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
