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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
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
  Calendar,
  MapPin,
  Droplets,
} from "lucide-react"
import { format } from "date-fns"

const rawMaterialsData = [
  {
    id: "RM-001",
    itemCode: "PADDY-BASMATI-1121",
    itemName: "Basmati Paddy - Pusa 1121",
    variety: "Pusa Basmati 1121",
    currentStock: 2500,
    unit: "MT",
    location: "Warehouse A - Section 1",
    reorderLevel: 500,
    maxLevel: 5000,
    avgCost: 2800,
    totalValue: 7000000,
    lastReceived: "2024-03-15",
    supplier: "Punjab Farmers Co-op",
    expiryDate: "2024-12-31",
    qualityGrade: "A",
    moistureContent: 12.5,
    foreignMatter: 1.2,
    damagedGrains: 2.1,
    status: "In Stock",
    batchNumber: "BATCH-2024-001",
    receiptNumber: "GRN-2024-045",
  },
  {
    id: "RM-002",
    itemCode: "PADDY-NONBASMATI-PR106",
    itemName: "Non-Basmati Paddy - PR 106",
    variety: "PR-106",
    currentStock: 450,
    unit: "MT",
    location: "Warehouse A - Section 2",
    reorderLevel: 500,
    maxLevel: 2000,
    avgCost: 2200,
    totalValue: 990000,
    lastReceived: "2024-03-12",
    supplier: "Haryana Mandi",
    expiryDate: "2024-11-30",
    qualityGrade: "B",
    moistureContent: 13.8,
    foreignMatter: 2.1,
    damagedGrains: 3.2,
    status: "Low Stock",
    batchNumber: "BATCH-2024-002",
    receiptNumber: "GRN-2024-042",
  },
  {
    id: "RM-003",
    itemCode: "PADDY-BASMATI-1509",
    itemName: "Basmati Paddy - Pusa 1509",
    variety: "Pusa Basmati 1509",
    currentStock: 1800,
    unit: "MT",
    location: "Warehouse A - Section 3",
    reorderLevel: 400,
    maxLevel: 3000,
    avgCost: 2650,
    totalValue: 4770000,
    lastReceived: "2024-03-10",
    supplier: "UP Farmers Union",
    expiryDate: "2025-01-15",
    qualityGrade: "A",
    moistureContent: 12.8,
    foreignMatter: 1.5,
    damagedGrains: 1.8,
    status: "In Stock",
    batchNumber: "BATCH-2024-003",
    receiptNumber: "GRN-2024-038",
  },
  {
    id: "RM-004",
    itemCode: "PADDY-NONBASMATI-SARYU52",
    itemName: "Non-Basmati Paddy - Saryu 52",
    variety: "Saryu 52",
    currentStock: 120,
    unit: "MT",
    location: "Warehouse A - Section 4",
    reorderLevel: 300,
    maxLevel: 1500,
    avgCost: 2100,
    totalValue: 252000,
    lastReceived: "2024-03-08",
    supplier: "Bihar Cooperative",
    expiryDate: "2024-10-30",
    qualityGrade: "C",
    moistureContent: 14.2,
    foreignMatter: 2.8,
    damagedGrains: 4.1,
    status: "Critical",
    batchNumber: "BATCH-2024-004",
    receiptNumber: "GRN-2024-035",
  },
]

const qualityParameters = [
  { parameter: "Moisture Content", standard: "≤ 14%", tolerance: "± 0.5%" },
  { parameter: "Foreign Matter", standard: "≤ 2%", tolerance: "± 0.3%" },
  { parameter: "Damaged Grains", standard: "≤ 3%", tolerance: "± 0.5%" },
  { parameter: "Chalky Grains", standard: "≤ 6%", tolerance: "± 1%" },
  { parameter: "Red Grains", standard: "≤ 1.5%", tolerance: "± 0.2%" },
  { parameter: "Immature Grains", standard: "≤ 2%", tolerance: "± 0.3%" },
]

const stockMovementChart = [
  { month: "Oct", received: 1200, consumed: 800, closing: 2100 },
  { month: "Nov", received: 1500, consumed: 900, closing: 2700 },
  { month: "Dec", received: 800, consumed: 1200, closing: 2300 },
  { month: "Jan", received: 2000, consumed: 1100, closing: 3200 },
  { month: "Feb", received: 1800, consumed: 1300, closing: 3700 },
  { month: "Mar", received: 1200, consumed: 1000, closing: 3900 },
]

export default function RawMaterialsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [varietyFilter, setVarietyFilter] = useState("all")
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

  const getQualityBadge = (grade: string) => {
    const colorMap: { [key: string]: string } = {
      A: "bg-green-100 text-green-800",
      B: "bg-blue-100 text-blue-800",
      C: "bg-yellow-100 text-yellow-800",
    }
    return <Badge className={colorMap[grade] || "bg-gray-100 text-gray-800"}>{grade}</Badge>
  }

  const filteredMaterials = rawMaterialsData.filter((item) => {
    const matchesSearch =
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.itemCode.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesVariety = varietyFilter === "all" || item.variety.toLowerCase().includes(varietyFilter)
    const matchesStatus = statusFilter === "all" || item.status.toLowerCase() === statusFilter
    return matchesSearch && matchesVariety && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Raw Materials</h1>
          <p className="text-muted-foreground">Manage paddy inventory and quality parameters</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Receipt
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stock</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {rawMaterialsData.reduce((sum, item) => sum + item.currentStock, 0).toLocaleString()} MT
            </div>
            <p className="text-xs text-muted-foreground">Across all varieties</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{(rawMaterialsData.reduce((sum, item) => sum + item.totalValue, 0) / 10000000).toFixed(1)}Cr
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
              {rawMaterialsData.filter((item) => item.status === "Low Stock" || item.status === "Critical").length}
            </div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Quality Grade</CardTitle>
            <Warehouse className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">A-</div>
            <p className="text-xs text-muted-foreground">Overall quality rating</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inventory" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="quality">Quality Control</TabsTrigger>
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
                <Select value={varietyFilter} onValueChange={setVarietyFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Variety" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Varieties</SelectItem>
                    <SelectItem value="basmati">Basmati</SelectItem>
                    <SelectItem value="non-basmati">Non-Basmati</SelectItem>
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

          {/* Raw Materials Table */}
          <Card>
            <CardHeader>
              <CardTitle>Raw Materials Inventory</CardTitle>
              <CardDescription>Complete paddy inventory with quality parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item Code</TableHead>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Variety</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Quality Grade</TableHead>
                    <TableHead>Moisture %</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Received</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMaterials.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.itemCode}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{item.itemName}</div>
                          <div className="text-sm text-muted-foreground">Batch: {item.batchNumber}</div>
                        </div>
                      </TableCell>
                      <TableCell>{item.variety}</TableCell>
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
                      <TableCell>{getQualityBadge(item.qualityGrade)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Droplets className="h-3 w-3 text-muted-foreground" />
                          {item.moistureContent}%
                        </div>
                      </TableCell>
                      <TableCell>₹{(item.totalValue / 100000).toFixed(1)}L</TableCell>
                      <TableCell>{getStatusBadge(item.status, item.currentStock, item.reorderLevel)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {format(new Date(item.lastReceived), "dd/MM/yyyy")}
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
                                <DialogTitle>Raw Material Details - {item.itemCode}</DialogTitle>
                                <DialogDescription>Complete item information and quality parameters</DialogDescription>
                              </DialogHeader>
                              {selectedItem && <RawMaterialDetailsModal item={selectedItem} />}
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

        <TabsContent value="quality" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quality Standards</CardTitle>
              <CardDescription>Standard quality parameters for raw materials</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parameter</TableHead>
                    <TableHead>Standard</TableHead>
                    <TableHead>Tolerance</TableHead>
                    <TableHead>Current Avg</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {qualityParameters.map((param, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{param.parameter}</TableCell>
                      <TableCell>{param.standard}</TableCell>
                      <TableCell>{param.tolerance}</TableCell>
                      <TableCell>
                        {param.parameter === "Moisture Content" && "13.1%"}
                        {param.parameter === "Foreign Matter" && "1.9%"}
                        {param.parameter === "Damaged Grains" && "2.8%"}
                        {param.parameter === "Chalky Grains" && "4.2%"}
                        {param.parameter === "Red Grains" && "1.1%"}
                        {param.parameter === "Immature Grains" && "1.6%"}
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">Within Limits</Badge>
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
                <CardTitle>Quality Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Grade A</span>
                    </div>
                    <span className="font-medium">60%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>Grade B</span>
                    </div>
                    <span className="font-medium">30%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span>Grade C</span>
                    </div>
                    <span className="font-medium">10%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Quality Tests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">BATCH-2024-001</p>
                        <p className="text-sm text-muted-foreground">Basmati Paddy - Pusa 1121</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Grade A</Badge>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">BATCH-2024-002</p>
                        <p className="text-sm text-muted-foreground">Non-Basmati Paddy - PR 106</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">Grade B</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Stock Movement Analysis</CardTitle>
              <CardDescription>Monthly raw material movement trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  received: { label: "Received", color: "hsl(var(--chart-1))" },
                  consumed: { label: "Consumed", color: "hsl(var(--chart-2))" },
                  closing: { label: "Closing Stock", color: "hsl(var(--chart-3))" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stockMovementChart}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="received" fill="var(--color-received)" />
                    <Bar dataKey="consumed" fill="var(--color-consumed)" />
                    <Bar dataKey="closing" fill="var(--color-closing)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Top Suppliers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Punjab Farmers Co-op</span>
                    <span className="font-medium">2,500 MT</span>
                  </div>
                  <div className="flex justify-between">
                    <span>UP Farmers Union</span>
                    <span className="font-medium">1,800 MT</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Haryana Mandi</span>
                    <span className="font-medium">450 MT</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Variety Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Pusa Basmati 1121</span>
                    <span className="font-medium">52%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pusa Basmati 1509</span>
                    <span className="font-medium">37%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>PR-106</span>
                    <span className="font-medium">9%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saryu 52</span>
                    <span className="font-medium">2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Storage Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Warehouse A Utilization</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Storage Cost</span>
                    <span className="font-medium">₹45/MT/Month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wastage Rate</span>
                    <span className="font-medium">0.8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function RawMaterialDetailsModal({ item }: { item: any }) {
  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="quality">Quality</TabsTrigger>
        <TabsTrigger value="stock">Stock Info</TabsTrigger>
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
                <span className="text-muted-foreground">Variety:</span>
                <span className="font-medium">{item.variety}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Supplier:</span>
                <span className="font-medium">{item.supplier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Batch Number:</span>
                <span className="font-medium">{item.batchNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Receipt Number:</span>
                <span className="font-medium">{item.receiptNumber}</span>
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
                <span className="text-muted-foreground">Last Received:</span>
                <span className="font-medium">{format(new Date(item.lastReceived), "dd/MM/yyyy")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Expiry Date:</span>
                <span className="font-medium">{format(new Date(item.expiryDate), "dd/MM/yyyy")}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="quality" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Quality Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Quality Grade:</span>
              <Badge
                className={
                  item.qualityGrade === "A"
                    ? "bg-green-100 text-green-800"
                    : item.qualityGrade === "B"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                }
              >
                {item.qualityGrade}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Moisture Content:</span>
              <span className="font-medium flex items-center gap-1">
                <Droplets className="h-3 w-3" />
                {item.moistureContent}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Foreign Matter:</span>
              <span className="font-medium">{item.foreignMatter}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Damaged Grains:</span>
              <span className="font-medium">{item.damagedGrains}%</span>
            </div>
          </CardContent>
        </Card>
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
              <span className="font-medium flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {item.location}
              </span>
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
                    <p className="text-sm text-muted-foreground">{item.receiptNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">+{item.currentStock} MT</p>
                    <p className="text-sm text-muted-foreground">{format(new Date(item.lastReceived), "dd/MM/yyyy")}</p>
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
