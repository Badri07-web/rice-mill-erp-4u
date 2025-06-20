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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import {
  Recycle,
  TrendingUp,
  AlertTriangle,
  Plus,
  Search,
  Eye,
  Edit,
  Download,
  Calendar,
  MapPin,
  Leaf,
  TrendingDown,
} from "lucide-react"
import { format } from "date-fns"

const byproductsData = [
  {
    id: "BP-001",
    itemCode: "BRAN-RICE-001",
    itemName: "Rice Bran",
    category: "Bran",
    source: "Basmati Processing",
    currentStock: 850,
    unit: "MT",
    location: "Warehouse C - Section 1",
    reorderLevel: 200,
    maxLevel: 1500,
    avgCost: 800,
    totalValue: 680000,
    lastProduced: "2024-03-15",
    expiryDate: "2024-06-30",
    moistureContent: 8.5,
    oilContent: 18.2,
    proteinContent: 12.8,
    status: "In Stock",
    batchNumber: "BRAN-2024-001",
    applications: ["Animal Feed", "Oil Extraction"],
  },
  {
    id: "BP-002",
    itemCode: "BROKEN-RICE-001",
    itemName: "Broken Rice",
    category: "Broken Rice",
    source: "Milling Process",
    currentStock: 1200,
    unit: "MT",
    location: "Warehouse C - Section 2",
    reorderLevel: 300,
    maxLevel: 2000,
    avgCost: 1800,
    totalValue: 2160000,
    lastProduced: "2024-03-14",
    expiryDate: "2025-03-14",
    moistureContent: 11.2,
    oilContent: 0,
    proteinContent: 7.5,
    status: "In Stock",
    batchNumber: "BROKEN-2024-001",
    applications: ["Brewing", "Starch Production", "Animal Feed"],
  },
  {
    id: "BP-003",
    itemCode: "HUSK-RICE-001",
    itemName: "Rice Husk",
    category: "Husk",
    source: "Dehusking Process",
    currentStock: 2500,
    unit: "MT",
    location: "Open Storage Area",
    reorderLevel: 500,
    maxLevel: 5000,
    avgCost: 300,
    totalValue: 750000,
    lastProduced: "2024-03-15",
    expiryDate: "2024-12-31",
    moistureContent: 9.8,
    oilContent: 0,
    proteinContent: 3.2,
    status: "In Stock",
    batchNumber: "HUSK-2024-001",
    applications: ["Fuel", "Construction", "Packaging"],
  },
  {
    id: "BP-004",
    itemCode: "POLISH-RICE-001",
    itemName: "Rice Polish",
    category: "Polish",
    source: "Polishing Process",
    currentStock: 180,
    unit: "MT",
    location: "Warehouse C - Section 3",
    reorderLevel: 150,
    maxLevel: 800,
    avgCost: 1200,
    totalValue: 216000,
    lastProduced: "2024-03-13",
    expiryDate: "2024-09-30",
    moistureContent: 10.5,
    oilContent: 15.8,
    proteinContent: 14.2,
    status: "Low Stock",
    batchNumber: "POLISH-2024-001",
    applications: ["Animal Feed", "Nutritional Supplements"],
  },
  {
    id: "BP-005",
    itemCode: "TIPS-RICE-001",
    itemName: "Rice Tips",
    category: "Tips",
    source: "Grading Process",
    currentStock: 95,
    unit: "MT",
    location: "Warehouse C - Section 4",
    reorderLevel: 100,
    maxLevel: 500,
    avgCost: 2200,
    totalValue: 209000,
    lastProduced: "2024-03-12",
    expiryDate: "2025-03-12",
    moistureContent: 11.8,
    oilContent: 0,
    proteinContent: 8.1,
    status: "Critical",
    batchNumber: "TIPS-2024-001",
    applications: ["Food Processing", "Snack Manufacturing"],
  },
]

const productionYield = [
  { process: "Dehusking", input: 1000, output: 780, byproduct: "Rice Husk", byproductQty: 220, yieldRate: 22 },
  { process: "Milling", input: 780, output: 650, byproduct: "Rice Bran", byproductQty: 130, yieldRate: 16.7 },
  { process: "Polishing", input: 650, output: 620, byproduct: "Rice Polish", byproductQty: 30, yieldRate: 4.6 },
  { process: "Grading", input: 620, output: 580, byproduct: "Broken Rice", byproductQty: 40, yieldRate: 6.5 },
]

const marketPrices = [
  { product: "Rice Bran", currentPrice: 800, lastMonth: 750, trend: "+6.7%", demand: "High" },
  { product: "Broken Rice", currentPrice: 1800, lastMonth: 1850, trend: "-2.7%", demand: "Medium" },
  { product: "Rice Husk", currentPrice: 300, lastMonth: 280, trend: "+7.1%", demand: "High" },
  { product: "Rice Polish", currentPrice: 1200, lastMonth: 1150, trend: "+4.3%", demand: "Medium" },
  { product: "Rice Tips", currentPrice: 2200, lastMonth: 2100, trend: "+4.8%", demand: "Low" },
]

const utilizationData = [
  { category: "Animal Feed", quantity: 1200, percentage: 45, color: "#8884d8" },
  { category: "Oil Extraction", quantity: 450, percentage: 17, color: "#82ca9d" },
  { category: "Fuel/Energy", quantity: 650, percentage: 24, color: "#ffc658" },
  { category: "Construction", quantity: 250, percentage: 9, color: "#ff7300" },
  { category: "Food Processing", quantity: 130, percentage: 5, color: "#00ff00" },
]

const monthlyProduction = [
  { month: "Oct", bran: 120, broken: 180, husk: 220, polish: 25, tips: 35 },
  { month: "Nov", bran: 135, broken: 195, husk: 245, polish: 28, tips: 38 },
  { month: "Dec", bran: 150, broken: 210, husk: 280, polish: 32, tips: 42 },
  { month: "Jan", bran: 140, broken: 200, husk: 260, polish: 30, tips: 40 },
  { month: "Feb", bran: 160, broken: 220, husk: 290, polish: 35, tips: 45 },
  { month: "Mar", bran: 155, broken: 215, husk: 275, polish: 33, tips: 43 },
]

export default function ByproductsInventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedItem, setSelectedItem] = useState<any>(null)

  const getStatusBadge = (status: string, currentStock: number, reorderLevel: number) => {
    if (status === "Critical" || currentStock < reorderLevel * 0.5) {
      return <Badge className="bg-red-100 text-red-800">Critical</Badge>
    } else if (status === "Low Stock" || currentStock < reorderLevel) {
      return <Badge className="bg-yellow-100 text-yellow-800">Low Stock</Badge>
    } else {
      return <Badge className="bg-green-100 text-green-800">In Stock</Badge>
    }
  }

  const getDemandBadge = (demand: string) => {
    switch (demand) {
      case "High":
        return <Badge className="bg-green-100 text-green-800">High</Badge>
      case "Medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case "Low":
        return <Badge className="bg-red-100 text-red-800">Low</Badge>
      default:
        return <Badge variant="outline">{demand}</Badge>
    }
  }

  const filteredByproducts = byproductsData.filter((item) => {
    const matchesSearch =
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.itemCode.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || item.category.toLowerCase() === categoryFilter
    const matchesStatus = statusFilter === "all" || item.status.toLowerCase() === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Byproducts Inventory</h1>
          <p className="text-muted-foreground">Manage rice processing byproducts and waste utilization</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Byproduct
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Byproducts</CardTitle>
            <Recycle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {byproductsData.reduce((sum, item) => sum + item.currentStock, 0).toLocaleString()} MT
            </div>
            <p className="text-xs text-muted-foreground">All categories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{(byproductsData.reduce((sum, item) => sum + item.totalValue, 0) / 1000000).toFixed(1)}L
            </div>
            <p className="text-xs text-muted-foreground">Current inventory value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {byproductsData.filter((item) => item.status === "Low Stock" || item.status === "Critical").length}
            </div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilization Rate</CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">Waste to value conversion</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inventory" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="production">Production Yield</TabsTrigger>
          <TabsTrigger value="market">Market Analysis</TabsTrigger>
          <TabsTrigger value="utilization">Utilization</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
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
                      placeholder="Search by item name or code..."
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
                    <SelectItem value="bran">Bran</SelectItem>
                    <SelectItem value="broken rice">Broken Rice</SelectItem>
                    <SelectItem value="husk">Husk</SelectItem>
                    <SelectItem value="polish">Polish</SelectItem>
                    <SelectItem value="tips">Tips</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="in stock">In Stock</SelectItem>
                    <SelectItem value="low stock">Low Stock</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Byproducts Table */}
          <Card>
            <CardHeader>
              <CardTitle>Byproducts Inventory</CardTitle>
              <CardDescription>Rice processing byproducts and their utilization</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item Code</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Source Process</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Applications</TableHead>
                    <TableHead>Last Produced</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredByproducts.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.itemCode}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{item.itemName}</div>
                          <div className="text-sm text-muted-foreground">Batch: {item.batchNumber}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-blue-100 text-blue-800">{item.category}</Badge>
                      </TableCell>
                      <TableCell>{item.source}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {item.currentStock.toLocaleString()} {item.unit}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Reorder: {item.reorderLevel.toLocaleString()} {item.unit}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{item.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>₹{(item.totalValue / 1000).toFixed(0)}K</TableCell>
                      <TableCell>{getStatusBadge(item.status, item.currentStock, item.reorderLevel)}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {item.applications.slice(0, 2).map((app, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {app}
                            </Badge>
                          ))}
                          {item.applications.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{item.applications.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {format(new Date(item.lastProduced), "dd/MM/yyyy")}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedItem(item)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>Byproduct Details - {item.itemCode}</DialogTitle>
                                <DialogDescription>Complete byproduct information and specifications</DialogDescription>
                              </DialogHeader>
                              {selectedItem && <ByproductDetailsModal item={selectedItem} />}
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

        <TabsContent value="production" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Production Yield Analysis</CardTitle>
              <CardDescription>Byproduct generation from rice processing</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Process</TableHead>
                    <TableHead>Input (MT)</TableHead>
                    <TableHead>Main Output (MT)</TableHead>
                    <TableHead>Byproduct</TableHead>
                    <TableHead>Byproduct Qty (MT)</TableHead>
                    <TableHead>Yield Rate (%)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productionYield.map((process, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{process.process}</TableCell>
                      <TableCell>{process.input}</TableCell>
                      <TableCell>{process.output}</TableCell>
                      <TableCell>{process.byproduct}</TableCell>
                      <TableCell className="font-medium text-green-600">{process.byproductQty}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${process.yieldRate * 4}%` }}
                            />
                          </div>
                          <span className="text-sm">{process.yieldRate}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Byproduct Production</CardTitle>
              <CardDescription>Production trends by byproduct type</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  bran: { label: "Rice Bran", color: "hsl(var(--chart-1))" },
                  broken: { label: "Broken Rice", color: "hsl(var(--chart-2))" },
                  husk: { label: "Rice Husk", color: "hsl(var(--chart-3))" },
                  polish: { label: "Rice Polish", color: "hsl(var(--chart-4))" },
                  tips: { label: "Rice Tips", color: "hsl(var(--chart-5))" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyProduction}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="bran" fill="var(--color-bran)" />
                    <Bar dataKey="broken" fill="var(--color-broken)" />
                    <Bar dataKey="husk" fill="var(--color-husk)" />
                    <Bar dataKey="polish" fill="var(--color-polish)" />
                    <Bar dataKey="tips" fill="var(--color-tips)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Highest Yield Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Rice Husk</span>
                    <span className="font-medium">22%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rice Bran</span>
                    <span className="font-medium">16.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Broken Rice</span>
                    <span className="font-medium">6.5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Production Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Overall Yield</span>
                    <span className="font-medium">49.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Waste Utilization</span>
                    <span className="font-medium">94%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Value Recovery</span>
                    <span className="font-medium">₹38L/month</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quality Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Grade A Byproducts</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Moisture Control</span>
                    <span className="font-medium">98%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contamination Rate</span>
                    <span className="font-medium">0.5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="market" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Market Price Analysis</CardTitle>
              <CardDescription>Current market prices and trends for byproducts</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Current Price</TableHead>
                    <TableHead>Last Month</TableHead>
                    <TableHead>Trend</TableHead>
                    <TableHead>Market Demand</TableHead>
                    <TableHead>Revenue Potential</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {marketPrices.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.product}</TableCell>
                      <TableCell>₹{item.currentPrice.toLocaleString()}/MT</TableCell>
                      <TableCell>₹{item.lastMonth.toLocaleString()}/MT</TableCell>
                      <TableCell>
                        <span
                          className={`flex items-center gap-1 ${item.trend.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                        >
                          {item.trend.startsWith("+") ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          {item.trend}
                        </span>
                      </TableCell>
                      <TableCell>{getDemandBadge(item.demand)}</TableCell>
                      <TableCell>
                        ₹
                        {(
                          (item.currentPrice *
                            byproductsData.find((bp) => bp.itemName === item.product)?.currentStock || 0) / 100000
                        ).toFixed(1)}
                        L
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
                <CardTitle>Price Trends</CardTitle>
                <CardDescription>6-month price movement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Rice Husk</p>
                        <p className="text-sm text-muted-foreground">High demand for fuel applications</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">+7.1%</p>
                        <p className="text-sm text-muted-foreground">₹300/MT</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Rice Bran</p>
                        <p className="text-sm text-muted-foreground">Oil extraction demand rising</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">+6.7%</p>
                        <p className="text-sm text-muted-foreground">₹800/MT</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Market Opportunities</CardTitle>
                <CardDescription>Emerging applications and markets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-blue-800">Biofuel Market</h4>
                    <p className="text-sm text-muted-foreground">Rice husk for biomass energy</p>
                    <p className="text-sm font-medium text-blue-600">Potential: ₹15L/month</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-green-800">Organic Fertilizer</h4>
                    <p className="text-sm text-muted-foreground">Composted rice bran</p>
                    <p className="text-sm font-medium text-green-600">Potential: ₹8L/month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="utilization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Utilization Distribution</CardTitle>
              <CardDescription>How byproducts are being utilized</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  quantity: { label: "Quantity (MT)" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={utilizationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ category, percentage }) => `${category} ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="quantity"
                    >
                      {utilizationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Top Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Animal Feed</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fuel/Energy</span>
                    <span className="font-medium">24%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Oil Extraction</span>
                    <span className="font-medium">17%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue by Application</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Animal Feed</span>
                    <span className="font-medium">₹18.5L</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Oil Extraction</span>
                    <span className="font-medium">₹12.2L</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fuel/Energy</span>
                    <span className="font-medium">₹7.8L</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sustainability Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Waste Reduction</span>
                    <span className="font-medium">94%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Carbon Footprint</span>
                    <span className="font-medium">-25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Circular Economy</span>
                    <span className="font-medium">₹38L value</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Utilization Optimization</CardTitle>
              <CardDescription>Recommendations for better byproduct utilization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-green-800">Value Addition</h4>
                    <p className="text-sm text-muted-foreground">Process rice bran into oil</p>
                    <p className="text-sm font-medium text-green-600">+40% value increase</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-blue-800">New Markets</h4>
                    <p className="text-sm text-muted-foreground">Export broken rice to brewing industry</p>
                    <p className="text-sm font-medium text-blue-600">+25% price premium</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-purple-800">Technology Upgrade</h4>
                    <p className="text-sm text-muted-foreground">Pelletize rice husk for fuel</p>
                    <p className="text-sm font-medium text-purple-600">+60% efficiency</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-orange-800">Partnership</h4>
                    <p className="text-sm text-muted-foreground">Direct supply to feed manufacturers</p>
                    <p className="text-sm font-medium text-orange-600">+15% margin</p>
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

function ByproductDetailsModal({ item }: { item: any }) {
  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="composition">Composition</TabsTrigger>
        <TabsTrigger value="applications">Applications</TabsTrigger>
        <TabsTrigger value="market">Market Info</TabsTrigger>
      </TabsList>

      <TabsContent value="details" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Item Code:</span>
                <span className="font-medium">{item.itemCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Product Name:</span>
                <span className="font-medium">{item.itemName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category:</span>
                <span className="font-medium">{item.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Source Process:</span>
                <span className="font-medium">{item.source}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Batch Number:</span>
                <span className="font-medium">{item.batchNumber}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stock Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Current Stock:</span>
                <span className="font-medium">
                  {item.currentStock.toLocaleString()} {item.unit}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location:</span>
                <span className="font-medium">{item.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Average Cost:</span>
                <span className="font-medium">
                  ₹{item.avgCost.toLocaleString()}/{item.unit}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Value:</span>
                <span className="font-medium">₹{(item.totalValue / 1000).toFixed(0)}K</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Produced:</span>
                <span className="font-medium">{format(new Date(item.lastProduced), "dd/MM/yyyy")}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="composition" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Chemical Composition</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Moisture Content:</span>
              <span className="font-medium">{item.moistureContent}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Oil Content:</span>
              <span className="font-medium">{item.oilContent}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Protein Content:</span>
              <span className="font-medium">{item.proteinContent}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Expiry Date:</span>
              <span className="font-medium">{format(new Date(item.expiryDate), "dd/MM/yyyy")}</span>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="applications" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {item.applications.map((app: string, index: number) => (
                <div key={index} className="p-3 border rounded-lg">
                  <h4 className="font-medium">{app}</h4>
                  <p className="text-sm text-muted-foreground">
                    {app === "Animal Feed" && "High protein content suitable for livestock"}
                    {app === "Oil Extraction" && "Rich oil content for edible oil production"}
                    {app === "Fuel" && "High calorific value for biomass energy"}
                    {app === "Construction" && "Lightweight aggregate for building materials"}
                    {app === "Packaging" && "Biodegradable packaging material"}
                    {app === "Brewing" && "Fermentation substrate for alcohol production"}
                    {app === "Starch Production" && "High starch content for industrial use"}
                    {app === "Food Processing" && "Food grade ingredient for processing"}
                    {app === "Snack Manufacturing" && "Base material for snack products"}
                    {app === "Nutritional Supplements" && "Rich in vitamins and minerals"}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="market" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Market Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Current Market Price:</span>
              <span className="font-medium">₹{item.avgCost.toLocaleString()}/MT</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Market Demand:</span>
              <Badge className="bg-green-100 text-green-800">High</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Revenue Potential:</span>
              <span className="font-medium">₹{(item.totalValue / 100000).toFixed(1)}L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Price Trend:</span>
              <span className="font-medium text-green-600">+5.2%</span>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
