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
  Package,
  TrendingUp,
  AlertTriangle,
  Plus,
  Search,
  Eye,
  Edit,
  Download,
  Calendar,
  MapPin,
  Star,
  Award,
} from "lucide-react"
import { format } from "date-fns"

const finishedGoodsData = [
  {
    id: "FG-001",
    itemCode: "RICE-BASMATI-1121-5KG",
    itemName: "Basmati Rice - Pusa 1121 (5kg Pack)",
    variety: "Pusa Basmati 1121",
    grade: "Premium",
    packSize: "5kg",
    currentStock: 15000,
    unit: "Bags",
    location: "Warehouse B - Section 1",
    reorderLevel: 2000,
    maxLevel: 25000,
    avgCost: 210,
    totalValue: 3150000,
    lastProduced: "2024-03-15",
    expiryDate: "2025-03-31",
    qualityGrade: "A+",
    moistureContent: 10.2,
    brokenGrains: 2.1,
    status: "In Stock",
    batchNumber: "FG-BATCH-2024-001",
    productionOrder: "PROD-2024-012",
  },
  {
    id: "FG-002",
    itemCode: "RICE-BASMATI-1121-25KG",
    itemName: "Basmati Rice - Pusa 1121 (25kg Pack)",
    variety: "Pusa Basmati 1121",
    grade: "Premium",
    packSize: "25kg",
    currentStock: 8500,
    unit: "Bags",
    location: "Warehouse B - Section 2",
    reorderLevel: 1500,
    maxLevel: 15000,
    avgCost: 1050,
    totalValue: 8925000,
    lastProduced: "2024-03-14",
    expiryDate: "2025-03-30",
    qualityGrade: "A+",
    moistureContent: 10.1,
    brokenGrains: 1.8,
    status: "In Stock",
    batchNumber: "FG-BATCH-2024-002",
    productionOrder: "PROD-2024-011",
  },
  {
    id: "FG-003",
    itemCode: "RICE-NONBASMATI-PR106-50KG",
    itemName: "Non-Basmati Rice - PR 106 (50kg Pack)",
    variety: "PR-106",
    grade: "Standard",
    packSize: "50kg",
    currentStock: 1200,
    unit: "Bags",
    location: "Warehouse B - Section 3",
    reorderLevel: 1000,
    maxLevel: 8000,
    avgCost: 1600,
    totalValue: 1920000,
    lastProduced: "2024-03-13",
    expiryDate: "2025-02-28",
    qualityGrade: "A",
    moistureContent: 11.5,
    brokenGrains: 3.2,
    status: "Low Stock",
    batchNumber: "FG-BATCH-2024-003",
    productionOrder: "PROD-2024-010",
  },
  {
    id: "FG-004",
    itemCode: "RICE-BASMATI-1509-10KG",
    itemName: "Basmati Rice - Pusa 1509 (10kg Pack)",
    variety: "Pusa Basmati 1509",
    grade: "Premium",
    packSize: "10kg",
    currentStock: 450,
    unit: "Bags",
    location: "Warehouse B - Section 4",
    reorderLevel: 800,
    maxLevel: 5000,
    avgCost: 420,
    totalValue: 189000,
    lastProduced: "2024-03-12",
    expiryDate: "2025-03-25",
    qualityGrade: "A",
    moistureContent: 10.8,
    brokenGrains: 2.5,
    status: "Critical",
    batchNumber: "FG-BATCH-2024-004",
    productionOrder: "PROD-2024-009",
  },
]

const productionTrends = [
  { month: "Oct", basmati: 12000, nonBasmati: 8000, total: 20000 },
  { month: "Nov", basmati: 15000, nonBasmati: 9500, total: 24500 },
  { month: "Dec", basmati: 18000, nonBasmati: 11000, total: 29000 },
  { month: "Jan", basmati: 16500, nonBasmati: 10500, total: 27000 },
  { month: "Feb", basmati: 19000, nonBasmati: 12000, total: 31000 },
  { month: "Mar", basmati: 21000, nonBasmati: 13500, total: 34500 },
]

const qualityMetrics = [
  { month: "Oct", gradeA: 85, gradeB: 12, gradeC: 3 },
  { month: "Nov", gradeA: 88, gradeB: 10, gradeC: 2 },
  { month: "Dec", gradeA: 90, gradeB: 8, gradeC: 2 },
  { month: "Jan", gradeA: 87, gradeB: 11, gradeC: 2 },
  { month: "Feb", gradeA: 92, gradeB: 7, gradeC: 1 },
  { month: "Mar", gradeA: 94, gradeB: 5, gradeC: 1 },
]

export default function FinishedGoodsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [varietyFilter, setVarietyFilter] = useState("all")
  const [gradeFilter, setGradeFilter] = useState("all")
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

  const getGradeBadge = (grade: string) => {
    const colorMap: { [key: string]: string } = {
      "A+": "bg-green-100 text-green-800",
      A: "bg-blue-100 text-blue-800",
      B: "bg-yellow-100 text-yellow-800",
      C: "bg-red-100 text-red-800",
    }
    return <Badge className={colorMap[grade] || "bg-gray-100 text-gray-800"}>{grade}</Badge>
  }

  const getQualityIcon = (grade: string) => {
    if (grade === "Premium") return <Award className="h-4 w-4 text-yellow-500" />
    return <Star className="h-4 w-4 text-blue-500" />
  }

  const filteredGoods = finishedGoodsData.filter((item) => {
    const matchesSearch =
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.itemCode.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesVariety = varietyFilter === "all" || item.variety.toLowerCase().includes(varietyFilter)
    const matchesGrade = gradeFilter === "all" || item.grade.toLowerCase() === gradeFilter
    return matchesSearch && matchesVariety && matchesGrade
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Finished Goods</h1>
          <p className="text-muted-foreground">Manage processed rice inventory and quality</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Production
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
              {finishedGoodsData.reduce((sum, item) => sum + item.currentStock, 0).toLocaleString()} Bags
            </div>
            <p className="text-xs text-muted-foreground">All pack sizes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{(finishedGoodsData.reduce((sum, item) => sum + item.totalValue, 0) / 10000000).toFixed(1)}Cr
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
              {finishedGoodsData.filter((item) => item.status === "Low Stock" || item.status === "Critical").length}
            </div>
            <p className="text-xs text-muted-foreground">Need production</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quality Rate</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">Grade A+ products</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inventory" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="production">Production Trends</TabsTrigger>
          <TabsTrigger value="quality">Quality Analysis</TabsTrigger>
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
                <Select value={gradeFilter} onValueChange={setGradeFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Grades</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Finished Goods Table */}
          <Card>
            <CardHeader>
              <CardTitle>Finished Goods Inventory</CardTitle>
              <CardDescription>Processed rice products ready for sale</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item Code</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Variety & Grade</TableHead>
                    <TableHead>Pack Size</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Quality</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Produced</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGoods.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.itemCode}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{item.itemName}</div>
                          <div className="text-sm text-muted-foreground">Batch: {item.batchNumber}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getQualityIcon(item.grade)}
                          <div>
                            <div className="font-medium">{item.variety}</div>
                            <div className="text-sm text-muted-foreground">{item.grade}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{item.packSize}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {item.currentStock.toLocaleString()} {item.unit}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Reorder: {item.reorderLevel.toLocaleString()}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{item.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getGradeBadge(item.qualityGrade)}</TableCell>
                      <TableCell>₹{(item.totalValue / 100000).toFixed(1)}L</TableCell>
                      <TableCell>{getStatusBadge(item.status, item.currentStock, item.reorderLevel)}</TableCell>
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
                                <DialogTitle>Product Details - {item.itemCode}</DialogTitle>
                                <DialogDescription>Complete product information and specifications</DialogDescription>
                              </DialogHeader>
                              {selectedItem && <FinishedGoodDetailsModal item={selectedItem} />}
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
              <CardTitle>Production Trends</CardTitle>
              <CardDescription>Monthly production output by variety</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  basmati: { label: "Basmati", color: "hsl(var(--chart-1))" },
                  nonBasmati: { label: "Non-Basmati", color: "hsl(var(--chart-2))" },
                  total: { label: "Total", color: "hsl(var(--chart-3))" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={productionTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="basmati" fill="var(--color-basmati)" />
                    <Bar dataKey="nonBasmati" fill="var(--color-nonBasmati)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Top Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Basmati 1121 (5kg)</span>
                    <span className="font-medium">15,000 bags</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Basmati 1121 (25kg)</span>
                    <span className="font-medium">8,500 bags</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Non-Basmati PR106</span>
                    <span className="font-medium">1,200 bags</span>
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
                    <span>Overall Efficiency</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Yield Rate</span>
                    <span className="font-medium">68%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wastage Rate</span>
                    <span className="font-medium">2.1%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pack Size Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>5kg Packs</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>25kg Packs</span>
                    <span className="font-medium">35%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>50kg Packs</span>
                    <span className="font-medium">20%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quality" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quality Grade Trends</CardTitle>
              <CardDescription>Monthly quality distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  gradeA: { label: "Grade A+/A", color: "hsl(var(--chart-1))" },
                  gradeB: { label: "Grade B", color: "hsl(var(--chart-2))" },
                  gradeC: { label: "Grade C", color: "hsl(var(--chart-3))" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={qualityMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="gradeA" stroke="var(--color-gradeA)" strokeWidth={2} />
                    <Line type="monotone" dataKey="gradeB" stroke="var(--color-gradeB)" strokeWidth={2} />
                    <Line type="monotone" dataKey="gradeC" stroke="var(--color-gradeC)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Quality Standards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Moisture Content (Max)</span>
                    <span className="font-medium">12%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Broken Grains (Max)</span>
                    <span className="font-medium">5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Foreign Matter (Max)</span>
                    <span className="font-medium">0.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Chalky Grains (Max)</span>
                    <span className="font-medium">6%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Quality Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Grade A+ Products</span>
                    <Badge className="bg-green-100 text-green-800">94%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Grade A Products</span>
                    <Badge className="bg-blue-100 text-blue-800">5%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Grade B Products</span>
                    <Badge className="bg-yellow-100 text-yellow-800">1%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Rejection Rate</span>
                    <Badge className="bg-red-100 text-red-800">0.2%</Badge>
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

function FinishedGoodDetailsModal({ item }: { item: any }) {
  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="quality">Quality</TabsTrigger>
        <TabsTrigger value="production">Production</TabsTrigger>
        <TabsTrigger value="packaging">Packaging</TabsTrigger>
      </TabsList>

      <TabsContent value="details" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
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
                <span className="text-muted-foreground">Variety:</span>
                <span className="font-medium">{item.variety}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Grade:</span>
                <span className="font-medium flex items-center gap-1">
                  {getQualityIcon(item.grade)}
                  {item.grade}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pack Size:</span>
                <span className="font-medium">{item.packSize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Batch Number:</span>
                <span className="font-medium">{item.batchNumber}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stock & Financial Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Current Stock:</span>
                <span className="font-medium">
                  {item.currentStock.toLocaleString()} {item.unit}
                </span>
              </div>
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
                <span className="text-muted-foreground">Location:</span>
                <span className="font-medium flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {item.location}
                </span>
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
                  item.qualityGrade === "A+"
                    ? "bg-green-100 text-green-800"
                    : item.qualityGrade === "A"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                }
              >
                {item.qualityGrade}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Moisture Content:</span>
              <span className="font-medium">{item.moistureContent}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Broken Grains:</span>
              <span className="font-medium">{item.brokenGrains}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Foreign Matter:</span>
              <span className="font-medium">0.3%</span>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="production" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Production Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Production Order:</span>
              <span className="font-medium">{item.productionOrder}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Produced:</span>
              <span className="font-medium">{format(new Date(item.lastProduced), "dd/MM/yyyy")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Production Line:</span>
              <span className="font-medium">Line 1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Yield Rate:</span>
              <span className="font-medium">68%</span>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="packaging" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Packaging Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pack Size:</span>
              <span className="font-medium">{item.packSize}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Packaging Material:</span>
              <span className="font-medium">BOPP Bag</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Bags per Pallet:</span>
              <span className="font-medium">
                {item.packSize === "5kg"
                  ? "40"
                  : item.packSize === "10kg"
                    ? "25"
                    : item.packSize === "25kg"
                      ? "16"
                      : "8"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shelf Life:</span>
              <span className="font-medium">12 months</span>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

function getQualityIcon(grade: string) {
  if (grade === "Premium") return <Award className="h-4 w-4 text-yellow-500" />
  return <Star className="h-4 w-4 text-blue-500" />
}
