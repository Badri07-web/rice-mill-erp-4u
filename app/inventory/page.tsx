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
  Package,
  Warehouse,
  TrendingUp,
  AlertTriangle,
  Plus,
  Search,
  Eye,
  Edit,
  Download,
  Upload,
  Calendar,
  MapPin,
} from "lucide-react"
import { format } from "date-fns"

const inventoryData = [
  {
    id: "INV-001",
    itemCode: "PADDY-001",
    itemName: "Basmati Paddy",
    category: "Raw Material",
    variety: "Pusa Basmati 1121",
    currentStock: 2500,
    unit: "MT",
    location: "Warehouse A",
    reorderLevel: 500,
    maxLevel: 5000,
    avgCost: 2800,
    totalValue: 7000000,
    lastUpdated: "2024-03-15 14:30",
    supplier: "Punjab Farmers Co-op",
    expiryDate: "2024-12-31",
    qualityGrade: "A",
    moistureContent: 12.5,
    status: "In Stock",
  },
  {
    id: "INV-002",
    itemCode: "RICE-001",
    itemName: "Basmati Rice",
    category: "Finished Product",
    variety: "Pusa Basmati 1121",
    currentStock: 1800,
    unit: "MT",
    location: "Warehouse B",
    reorderLevel: 300,
    maxLevel: 3000,
    avgCost: 4200,
    totalValue: 7560000,
    lastUpdated: "2024-03-15 16:45",
    supplier: "Internal Production",
    expiryDate: "2025-03-31",
    qualityGrade: "Premium",
    moistureContent: 10.2,
    status: "In Stock",
  },
  {
    id: "INV-003",
    itemCode: "PADDY-002",
    itemName: "Non-Basmati Paddy",
    category: "Raw Material",
    variety: "PR-106",
    currentStock: 450,
    unit: "MT",
    location: "Warehouse A",
    reorderLevel: 500,
    maxLevel: 2000,
    avgCost: 2200,
    totalValue: 990000,
    lastUpdated: "2024-03-15 12:15",
    supplier: "Haryana Mandi",
    expiryDate: "2024-11-30",
    qualityGrade: "B",
    moistureContent: 13.8,
    status: "Low Stock",
  },
  {
    id: "INV-004",
    itemCode: "RICE-002",
    itemName: "Non-Basmati Rice",
    category: "Finished Product",
    variety: "PR-106",
    currentStock: 1200,
    unit: "MT",
    location: "Warehouse B",
    reorderLevel: 200,
    maxLevel: 2500,
    avgCost: 3200,
    totalValue: 3840000,
    lastUpdated: "2024-03-15 15:20",
    supplier: "Internal Production",
    expiryDate: "2025-02-28",
    qualityGrade: "Standard",
    moistureContent: 11.5,
    status: "In Stock",
  },
  {
    id: "INV-005",
    itemCode: "BRAN-001",
    itemName: "Rice Bran",
    category: "By-Product",
    variety: "Mixed",
    currentStock: 85,
    unit: "MT",
    location: "Warehouse C",
    reorderLevel: 50,
    maxLevel: 500,
    avgCost: 800,
    totalValue: 68000,
    lastUpdated: "2024-03-15 11:30",
    supplier: "Internal Production",
    expiryDate: "2024-06-30",
    qualityGrade: "Standard",
    moistureContent: 8.5,
    status: "Critical",
  },
]

const stockMovements = [
  {
    id: "MOV-001",
    date: "2024-03-15",
    itemCode: "PADDY-001",
    itemName: "Basmati Paddy",
    type: "Inward",
    quantity: 500,
    unit: "MT",
    reference: "PO-2024-045",
    location: "Warehouse A",
    reason: "Purchase Order",
    cost: 1400000,
  },
  {
    id: "MOV-002",
    date: "2024-03-15",
    itemCode: "RICE-001",
    itemName: "Basmati Rice",
    type: "Outward",
    quantity: 200,
    unit: "MT",
    reference: "SO-2024-089",
    location: "Warehouse B",
    reason: "Sales Order",
    cost: 840000,
  },
  {
    id: "MOV-003",
    date: "2024-03-14",
    itemCode: "PADDY-002",
    itemName: "Non-Basmati Paddy",
    type: "Production",
    quantity: 300,
    unit: "MT",
    reference: "PROD-2024-012",
    location: "Production Unit",
    reason: "Production Consumption",
    cost: 660000,
  },
]

const warehouseData = [
  {
    id: "WH-A",
    name: "Warehouse A",
    location: "Main Complex",
    capacity: 10000,
    occupied: 7500,
    utilization: 75,
    temperature: 25,
    humidity: 60,
    items: 15,
    manager: "Ramesh Kumar",
    status: "Active",
  },
  {
    id: "WH-B",
    name: "Warehouse B",
    location: "Processing Unit",
    capacity: 8000,
    occupied: 5200,
    utilization: 65,
    temperature: 22,
    humidity: 55,
    items: 12,
    manager: "Suresh Patel",
    status: "Active",
  },
  {
    id: "WH-C",
    name: "Warehouse C",
    location: "By-Products Storage",
    capacity: 2000,
    occupied: 850,
    utilization: 42.5,
    temperature: 28,
    humidity: 65,
    items: 8,
    manager: "Mohan Singh",
    status: "Active",
  },
]

const stockLevelChart = [
  { month: "Oct", inStock: 8500, lowStock: 1200, critical: 300 },
  { month: "Nov", inStock: 9200, lowStock: 800, critical: 200 },
  { month: "Dec", inStock: 8800, lowStock: 1000, critical: 400 },
  { month: "Jan", inStock: 9500, lowStock: 600, critical: 150 },
  { month: "Feb", inStock: 9100, lowStock: 900, critical: 250 },
  { month: "Mar", inStock: 8900, lowStock: 1100, critical: 300 },
]

const categoryDistribution = [
  { name: "Raw Material", value: 2950, color: "#8884d8" },
  { name: "Finished Product", value: 3000, color: "#82ca9d" },
  { name: "By-Product", value: 85, color: "#ffc658" },
  { name: "Packaging", value: 450, color: "#ff7300" },
]

export default function InventoryManagementPage() {
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

  const filteredInventory = inventoryData.filter((item) => {
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
          <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
          <p className="text-muted-foreground">Track stock levels, movements, and warehouse operations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryData.length}</div>
            <p className="text-xs text-muted-foreground">
              {inventoryData.filter((item) => item.status === "In Stock").length} in stock
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{(inventoryData.reduce((sum, item) => sum + item.totalValue, 0) / 10000000).toFixed(1)}Cr
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
              {inventoryData.filter((item) => item.status === "Low Stock" || item.status === "Critical").length}
            </div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warehouse Utilization</CardTitle>
            <Warehouse className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(warehouseData.reduce((sum, wh) => sum + wh.utilization, 0) / warehouseData.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Average utilization</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inventory" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="movements">Stock Movements</TabsTrigger>
          <TabsTrigger value="warehouses">Warehouses</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
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
                    <SelectItem value="raw material">Raw Material</SelectItem>
                    <SelectItem value="finished product">Finished Product</SelectItem>
                    <SelectItem value="by-product">By-Product</SelectItem>
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

          {/* Inventory Table */}
          <Card>
            <CardHeader>
              <CardTitle>Inventory Items</CardTitle>
              <CardDescription>Complete inventory with stock levels and details</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item Code</TableHead>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Reorder Level</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.itemCode}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{item.itemName}</div>
                          <div className="text-sm text-muted-foreground">{item.variety}</div>
                        </div>
                      </TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {item.currentStock.toLocaleString()} {item.unit}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Max: {item.maxLevel.toLocaleString()} {item.unit}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {item.reorderLevel.toLocaleString()} {item.unit}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          {item.location}
                        </div>
                      </TableCell>
                      <TableCell>₹{(item.totalValue / 100000).toFixed(1)}L</TableCell>
                      <TableCell>{getStatusBadge(item.status, item.currentStock, item.reorderLevel)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {format(new Date(item.lastUpdated), "dd/MM HH:mm")}
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
                                <DialogTitle>Item Details - {item.itemCode}</DialogTitle>
                                <DialogDescription>Complete item information and history</DialogDescription>
                              </DialogHeader>
                              {selectedItem && <ItemDetailsModal item={selectedItem} />}
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

        <TabsContent value="movements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Stock Movements</CardTitle>
              <CardDescription>Recent inventory transactions and movements</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stockMovements.map((movement) => (
                    <TableRow key={movement.id}>
                      <TableCell>{format(new Date(movement.date), "dd/MM/yyyy")}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{movement.itemCode}</div>
                          <div className="text-sm text-muted-foreground">{movement.itemName}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            movement.type === "Inward"
                              ? "bg-green-100 text-green-800"
                              : movement.type === "Outward"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                          }
                        >
                          {movement.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {movement.quantity.toLocaleString()} {movement.unit}
                      </TableCell>
                      <TableCell className="font-medium">{movement.reference}</TableCell>
                      <TableCell>{movement.location}</TableCell>
                      <TableCell>{movement.reason}</TableCell>
                      <TableCell>₹{(movement.cost / 100000).toFixed(1)}L</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="warehouses" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {warehouseData.map((warehouse) => (
              <Card key={warehouse.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {warehouse.name}
                    <Badge className="bg-green-100 text-green-800">{warehouse.status}</Badge>
                  </CardTitle>
                  <CardDescription>{warehouse.location}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Capacity Utilization</span>
                      <span>{warehouse.utilization}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${warehouse.utilization}%` }} />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {warehouse.occupied.toLocaleString()} / {warehouse.capacity.toLocaleString()} MT
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Temperature</p>
                      <p className="font-medium">{warehouse.temperature}°C</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Humidity</p>
                      <p className="font-medium">{warehouse.humidity}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Items</p>
                      <p className="font-medium">{warehouse.items}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Manager</p>
                      <p className="font-medium">{warehouse.manager}</p>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Stock Level Trends</CardTitle>
                <CardDescription>Monthly stock level analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    inStock: { label: "In Stock", color: "hsl(var(--chart-1))" },
                    lowStock: { label: "Low Stock", color: "hsl(var(--chart-2))" },
                    critical: { label: "Critical", color: "hsl(var(--chart-3))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stockLevelChart}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="inStock" fill="var(--color-inStock)" />
                      <Bar dataKey="lowStock" fill="var(--color-lowStock)" />
                      <Bar dataKey="critical" fill="var(--color-critical)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Distribution</CardTitle>
                <CardDescription>Inventory distribution by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: { label: "Quantity (MT)" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryDistribution.map((entry, index) => (
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

          <Card>
            <CardHeader>
              <CardTitle>Inventory Insights</CardTitle>
              <CardDescription>Key metrics and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Fast Moving Items</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Basmati Rice</span>
                      <span className="text-green-600">↑ 15%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Non-Basmati Rice</span>
                      <span className="text-green-600">↑ 12%</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Slow Moving Items</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Rice Bran</span>
                      <span className="text-red-600">↓ 8%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Broken Rice</span>
                      <span className="text-red-600">↓ 5%</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Reorder Alerts</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Non-Basmati Paddy</span>
                      <Badge className="bg-yellow-100 text-yellow-800">Low</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Rice Bran</span>
                      <Badge className="bg-red-100 text-red-800">Critical</Badge>
                    </div>
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

function ItemDetailsModal({ item }: { item: any }) {
  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="stock">Stock Info</TabsTrigger>
        <TabsTrigger value="quality">Quality</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
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
                <span className="text-muted-foreground">Item Name:</span>
                <span className="font-medium">{item.itemName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category:</span>
                <span className="font-medium">{item.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Variety:</span>
                <span className="font-medium">{item.variety}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Supplier:</span>
                <span className="font-medium">{item.supplier}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Financial Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Average Cost:</span>
                <span className="font-medium">
                  ₹{item.avgCost.toLocaleString()}/{item.unit}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Value:</span>
                <span className="font-medium">₹{(item.totalValue / 100000).toFixed(1)}L</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Unit:</span>
                <span className="font-medium">{item.unit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated:</span>
                <span className="font-medium">{format(new Date(item.lastUpdated), "dd/MM/yyyy HH:mm")}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="stock" className="space-y-4">
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
              <span className="text-muted-foreground">Reorder Level:</span>
              <span className="font-medium">
                {item.reorderLevel.toLocaleString()} {item.unit}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Maximum Level:</span>
              <span className="font-medium">
                {item.maxLevel.toLocaleString()} {item.unit}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Location:</span>
              <span className="font-medium">{item.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              {getStatusBadge(item.status, item.currentStock, item.reorderLevel)}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="quality" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Quality Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Quality Grade:</span>
              <span className="font-medium">{item.qualityGrade}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Moisture Content:</span>
              <span className="font-medium">{item.moistureContent}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Expiry Date:</span>
              <span className="font-medium">{format(new Date(item.expiryDate), "dd/MM/yyyy")}</span>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="history" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Stock Movement History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Stock Received</p>
                    <p className="text-sm text-muted-foreground">PO-2024-045</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">+500 MT</p>
                    <p className="text-sm text-muted-foreground">15/03/2024</p>
                  </div>
                </div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Production Usage</p>
                    <p className="text-sm text-muted-foreground">PROD-2024-012</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-red-600">-200 MT</p>
                    <p className="text-sm text-muted-foreground">14/03/2024</p>
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

function getStatusBadge(status: string, currentStock: number, reorderLevel: number) {
  if (status === "Critical" || currentStock < reorderLevel * 0.5) {
    return <Badge className="bg-red-100 text-red-800">Critical</Badge>
  } else if (status === "Low Stock" || currentStock < reorderLevel) {
    return <Badge className="bg-yellow-100 text-yellow-800">Low Stock</Badge>
  } else {
    return <Badge className="bg-green-100 text-green-800">In Stock</Badge>
  }
}
