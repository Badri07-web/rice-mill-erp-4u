"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Factory,
  Calculator,
  Download,
  AlertTriangle,
  Target,
} from "lucide-react"

const costCenterData = [
  {
    center: "Raw Material Procurement",
    budgeted: 15000000,
    actual: 16200000,
    variance: -1200000,
    variancePercent: -8,
    ytdBudget: 180000000,
    ytdActual: 185400000,
    category: "Direct Cost",
  },
  {
    center: "Production Operations",
    budgeted: 8500000,
    actual: 8100000,
    variance: 400000,
    variancePercent: 4.7,
    ytdBudget: 102000000,
    ytdActual: 98200000,
    category: "Direct Cost",
  },
  {
    center: "Quality Control",
    budgeted: 450000,
    actual: 520000,
    variance: -70000,
    variancePercent: -15.6,
    ytdBudget: 5400000,
    ytdActual: 5850000,
    category: "Overhead",
  },
  {
    center: "Transportation",
    budgeted: 1200000,
    actual: 1350000,
    variance: -150000,
    variancePercent: -12.5,
    ytdBudget: 14400000,
    ytdActual: 15200000,
    category: "Direct Cost",
  },
  {
    center: "Administration",
    budgeted: 850000,
    actual: 820000,
    variance: 30000,
    variancePercent: 3.5,
    ytdBudget: 10200000,
    ytdActual: 9950000,
    category: "Overhead",
  },
  {
    center: "Sales & Marketing",
    budgeted: 650000,
    actual: 720000,
    variance: -70000,
    variancePercent: -10.8,
    ytdBudget: 7800000,
    ytdActual: 8100000,
    category: "Overhead",
  },
]

const productCostAnalysis = [
  {
    product: "Basmati Rice Premium",
    unitCost: 4850,
    materialCost: 3200,
    laborCost: 450,
    overheadCost: 680,
    otherCosts: 520,
    sellingPrice: 6200,
    margin: 1350,
    marginPercent: 21.8,
    volume: 2500,
    totalRevenue: 15500000,
    totalCost: 12125000,
    totalProfit: 3375000,
  },
  {
    product: "Basmati Rice Standard",
    unitCost: 3850,
    materialCost: 2600,
    laborCost: 380,
    overheadCost: 520,
    otherCosts: 350,
    sellingPrice: 4800,
    margin: 950,
    marginPercent: 19.8,
    volume: 4200,
    totalRevenue: 20160000,
    totalCost: 16170000,
    totalProfit: 3990000,
  },
  {
    product: "Non-Basmati Rice",
    unitCost: 2850,
    materialCost: 2000,
    laborCost: 280,
    overheadCost: 380,
    otherCosts: 190,
    sellingPrice: 3600,
    margin: 750,
    marginPercent: 20.8,
    volume: 6800,
    totalRevenue: 24480000,
    totalCost: 19380000,
    totalProfit: 5100000,
  },
  {
    product: "Broken Rice",
    unitCost: 1850,
    materialCost: 1200,
    laborCost: 180,
    overheadCost: 280,
    otherCosts: 190,
    sellingPrice: 2400,
    margin: 550,
    marginPercent: 22.9,
    volume: 3200,
    totalRevenue: 7680000,
    totalCost: 5920000,
    totalProfit: 1760000,
  },
]

const monthlyTrends = [
  { month: "Apr", totalCost: 25800000, directCost: 20100000, overhead: 5700000, revenue: 32500000, profit: 6700000 },
  { month: "May", totalCost: 26200000, directCost: 20400000, overhead: 5800000, revenue: 33200000, profit: 7000000 },
  { month: "Jun", totalCost: 25900000, directCost: 20200000, overhead: 5700000, revenue: 32800000, profit: 6900000 },
  { month: "Jul", totalCost: 27100000, directCost: 21200000, overhead: 5900000, revenue: 34100000, profit: 7000000 },
  { month: "Aug", totalCost: 26800000, directCost: 20900000, overhead: 5900000, revenue: 33800000, profit: 7000000 },
  { month: "Sep", totalCost: 27500000, directCost: 21400000, overhead: 6100000, revenue: 34500000, profit: 7000000 },
  { month: "Oct", totalCost: 28200000, directCost: 22000000, overhead: 6200000, revenue: 35200000, profit: 7000000 },
  { month: "Nov", totalCost: 27800000, directCost: 21600000, overhead: 6200000, revenue: 34800000, profit: 7000000 },
  { month: "Dec", totalCost: 28500000, directCost: 22200000, overhead: 6300000, revenue: 35500000, profit: 7000000 },
  { month: "Jan", totalCost: 29100000, directCost: 22700000, overhead: 6400000, revenue: 36100000, profit: 7000000 },
  { month: "Feb", totalCost: 28800000, directCost: 22400000, overhead: 6400000, revenue: 35800000, profit: 7000000 },
  { month: "Mar", totalCost: 29500000, directCost: 23000000, overhead: 6500000, revenue: 36500000, profit: 7000000 },
]

const costDriverAnalysis = [
  {
    driver: "Raw Material Prices",
    impact: "High",
    currentTrend: "Increasing",
    monthlyChange: 8.5,
    yearlyChange: 12.3,
    mitigation: "Long-term contracts, bulk purchasing",
    riskLevel: "High",
  },
  {
    driver: "Labor Costs",
    impact: "Medium",
    currentTrend: "Stable",
    monthlyChange: 2.1,
    yearlyChange: 8.5,
    mitigation: "Automation, skill development",
    riskLevel: "Medium",
  },
  {
    driver: "Energy Costs",
    impact: "Medium",
    currentTrend: "Increasing",
    monthlyChange: 5.2,
    yearlyChange: 15.8,
    mitigation: "Solar power, energy efficiency",
    riskLevel: "High",
  },
  {
    driver: "Transportation Fuel",
    impact: "Medium",
    currentTrend: "Volatile",
    monthlyChange: -2.3,
    yearlyChange: 18.2,
    mitigation: "Route optimization, fuel hedging",
    riskLevel: "High",
  },
  {
    driver: "Packaging Materials",
    impact: "Low",
    currentTrend: "Stable",
    monthlyChange: 1.2,
    yearlyChange: 4.5,
    mitigation: "Bulk procurement, alternative materials",
    riskLevel: "Low",
  },
]

const costOptimizationOpportunities = [
  {
    opportunity: "Raw Material Waste Reduction",
    currentCost: 2400000,
    potentialSaving: 360000,
    savingPercent: 15,
    implementation: "Process optimization",
    timeline: "3 months",
    investment: 150000,
    roi: 240,
    priority: "High",
  },
  {
    opportunity: "Energy Efficiency Improvements",
    currentCost: 1800000,
    potentialSaving: 270000,
    savingPercent: 15,
    implementation: "Equipment upgrade",
    timeline: "6 months",
    investment: 800000,
    roi: 34,
    priority: "Medium",
  },
  {
    opportunity: "Labor Productivity Enhancement",
    currentCost: 3600000,
    potentialSaving: 432000,
    savingPercent: 12,
    implementation: "Training & automation",
    timeline: "4 months",
    investment: 200000,
    roi: 216,
    priority: "High",
  },
  {
    opportunity: "Transportation Route Optimization",
    currentCost: 1350000,
    potentialSaving: 202500,
    savingPercent: 15,
    implementation: "GPS tracking & planning",
    timeline: "2 months",
    investment: 50000,
    roi: 405,
    priority: "High",
  },
]

export default function CostAnalysisPage() {
  const [timeFilter, setTimeFilter] = useState("monthly")
  const [costCenterFilter, setCostCenterFilter] = useState("all")

  const getVarianceBadge = (variance: number) => {
    if (variance > 0) {
      return <Badge className="bg-green-100 text-green-800">Favorable</Badge>
    } else if (variance < 0) {
      return <Badge className="bg-red-100 text-red-800">Unfavorable</Badge>
    }
    return <Badge variant="outline">On Target</Badge>
  }

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "High":
        return <Badge className="bg-red-100 text-red-800">High Risk</Badge>
      case "Medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>
      case "Low":
        return <Badge className="bg-green-100 text-green-800">Low Risk</Badge>
      default:
        return <Badge variant="outline">{risk}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge className="bg-red-100 text-red-800">High Priority</Badge>
      case "Medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium Priority</Badge>
      case "Low":
        return <Badge className="bg-green-100 text-green-800">Low Priority</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cost Analysis</h1>
          <p className="text-muted-foreground">Comprehensive cost management and optimization insights</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Calculator className="h-4 w-4 mr-2" />
            Cost Calculator
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹2.95Cr</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-red-500" />
              +5.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost per MT</CardTitle>
            <Factory className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹3,285</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingDown className="h-3 w-3 mr-1 text-green-500" />
              -2.1% improvement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gross Margin</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">19.2%</div>
            <p className="text-xs text-muted-foreground">Target: 22%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost Variance</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">-₹10.6L</div>
            <p className="text-xs text-muted-foreground">Unfavorable variance</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="centers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="centers">Cost Centers</TabsTrigger>
          <TabsTrigger value="products">Product Costing</TabsTrigger>
          <TabsTrigger value="trends">Cost Trends</TabsTrigger>
          <TabsTrigger value="drivers">Cost Drivers</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="centers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cost Center Performance</CardTitle>
              <CardDescription>Budget vs Actual analysis by cost centers</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cost Center</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Budgeted</TableHead>
                    <TableHead>Actual</TableHead>
                    <TableHead>Variance</TableHead>
                    <TableHead>Variance %</TableHead>
                    <TableHead>YTD Budget</TableHead>
                    <TableHead>YTD Actual</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {costCenterData.map((center, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{center.center}</TableCell>
                      <TableCell>
                        <Badge variant={center.category === "Direct Cost" ? "default" : "secondary"}>
                          {center.category}
                        </Badge>
                      </TableCell>
                      <TableCell>₹{(center.budgeted / 100000).toFixed(1)}L</TableCell>
                      <TableCell>₹{(center.actual / 100000).toFixed(1)}L</TableCell>
                      <TableCell className={center.variance > 0 ? "text-green-600" : "text-red-600"}>
                        ₹{Math.abs(center.variance / 100000).toFixed(1)}L
                      </TableCell>
                      <TableCell className={center.variancePercent > 0 ? "text-green-600" : "text-red-600"}>
                        {center.variancePercent > 0 ? "+" : ""}
                        {center.variancePercent}%
                      </TableCell>
                      <TableCell>₹{(center.ytdBudget / 10000000).toFixed(1)}Cr</TableCell>
                      <TableCell>₹{(center.ytdActual / 10000000).toFixed(1)}Cr</TableCell>
                      <TableCell>{getVarianceBadge(center.variance)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Cost Distribution</CardTitle>
                <CardDescription>Current month cost breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: { label: "Amount (₹)" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={costCenterData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ center, actual }) =>
                          `${center.split(" ")[0]} ${((actual / costCenterData.reduce((sum, item) => sum + item.actual, 0)) * 100).toFixed(1)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="actual"
                      >
                        {costCenterData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={`hsl(${index * 60}, 70%, 50%)`} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Variance Analysis</CardTitle>
                <CardDescription>Budget variance by cost centers</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    variance: { label: "Variance (₹)", color: "hsl(var(--chart-1))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={costCenterData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="center" angle={-45} textAnchor="end" height={100} />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="variance" fill="var(--color-variance)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Cost Analysis</CardTitle>
              <CardDescription>Detailed cost breakdown by product lines</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Unit Cost</TableHead>
                    <TableHead>Material</TableHead>
                    <TableHead>Labor</TableHead>
                    <TableHead>Overhead</TableHead>
                    <TableHead>Other</TableHead>
                    <TableHead>Selling Price</TableHead>
                    <TableHead>Margin</TableHead>
                    <TableHead>Margin %</TableHead>
                    <TableHead>Volume (MT)</TableHead>
                    <TableHead>Total Profit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productCostAnalysis.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{product.product}</TableCell>
                      <TableCell>₹{product.unitCost}</TableCell>
                      <TableCell>₹{product.materialCost}</TableCell>
                      <TableCell>₹{product.laborCost}</TableCell>
                      <TableCell>₹{product.overheadCost}</TableCell>
                      <TableCell>₹{product.otherCosts}</TableCell>
                      <TableCell>₹{product.sellingPrice}</TableCell>
                      <TableCell className="text-green-600">₹{product.margin}</TableCell>
                      <TableCell className="font-medium">{product.marginPercent}%</TableCell>
                      <TableCell>{product.volume}</TableCell>
                      <TableCell className="text-green-600 font-medium">
                        ₹{(product.totalProfit / 100000).toFixed(1)}L
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
                <CardTitle>Most Profitable Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {productCostAnalysis
                    .sort((a, b) => b.totalProfit - a.totalProfit)
                    .slice(0, 3)
                    .map((product, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-sm">{product.product}</span>
                        <span className="font-medium text-green-600">
                          ₹{(product.totalProfit / 100000).toFixed(1)}L
                        </span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Highest Margin Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {productCostAnalysis
                    .sort((a, b) => b.marginPercent - a.marginPercent)
                    .slice(0, 3)
                    .map((product, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-sm">{product.product}</span>
                        <span className="font-medium">{product.marginPercent}%</span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Volume Leaders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {productCostAnalysis
                    .sort((a, b) => b.volume - a.volume)
                    .slice(0, 3)
                    .map((product, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-sm">{product.product}</span>
                        <span className="font-medium">{product.volume} MT</span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cost Trends Analysis</CardTitle>
              <CardDescription>Monthly cost and profitability trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  totalCost: { label: "Total Cost", color: "hsl(var(--chart-1))" },
                  directCost: { label: "Direct Cost", color: "hsl(var(--chart-2))" },
                  overhead: { label: "Overhead", color: "hsl(var(--chart-3))" },
                  revenue: { label: "Revenue", color: "hsl(var(--chart-4))" },
                  profit: { label: "Profit", color: "hsl(var(--chart-5))" },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="directCost" stackId="cost" fill="var(--color-directCost)" />
                    <Bar dataKey="overhead" stackId="cost" fill="var(--color-overhead)" />
                    <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={3} />
                    <Line type="monotone" dataKey="profit" stroke="var(--color-profit)" strokeWidth={2} />
                  </ComposedChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle>Cost Growth Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">+14.3%</div>
                <p className="text-xs text-muted-foreground">Year over year</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Direct Cost Ratio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-muted-foreground">Of total costs</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Overhead Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">22%</div>
                <p className="text-xs text-muted-foreground">Industry avg: 25%</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Volatility</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">Medium</div>
                <p className="text-xs text-muted-foreground">Seasonal variation</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="drivers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cost Driver Analysis</CardTitle>
              <CardDescription>Key factors influencing cost structure</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cost Driver</TableHead>
                    <TableHead>Impact Level</TableHead>
                    <TableHead>Current Trend</TableHead>
                    <TableHead>Monthly Change</TableHead>
                    <TableHead>Yearly Change</TableHead>
                    <TableHead>Mitigation Strategy</TableHead>
                    <TableHead>Risk Level</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {costDriverAnalysis.map((driver, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{driver.driver}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            driver.impact === "High"
                              ? "bg-red-100 text-red-800"
                              : driver.impact === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }
                        >
                          {driver.impact}
                        </Badge>
                      </TableCell>
                      <TableCell>{driver.currentTrend}</TableCell>
                      <TableCell className={driver.monthlyChange > 0 ? "text-red-600" : "text-green-600"}>
                        {driver.monthlyChange > 0 ? "+" : ""}
                        {driver.monthlyChange}%
                      </TableCell>
                      <TableCell className={driver.yearlyChange > 0 ? "text-red-600" : "text-green-600"}>
                        {driver.yearlyChange > 0 ? "+" : ""}
                        {driver.yearlyChange}%
                      </TableCell>
                      <TableCell>{driver.mitigation}</TableCell>
                      <TableCell>{getRiskBadge(driver.riskLevel)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>High Impact Drivers</CardTitle>
                <CardDescription>Factors requiring immediate attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {costDriverAnalysis
                    .filter((driver) => driver.impact === "High")
                    .map((driver, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{driver.driver}</h4>
                          {getRiskBadge(driver.riskLevel)}
                        </div>
                        <p className="text-sm text-muted-foreground">{driver.mitigation}</p>
                        <div className="flex justify-between text-xs mt-2">
                          <span>
                            Monthly: {driver.monthlyChange > 0 ? "+" : ""}
                            {driver.monthlyChange}%
                          </span>
                          <span>
                            Yearly: {driver.yearlyChange > 0 ? "+" : ""}
                            {driver.yearlyChange}%
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Driver Impact</CardTitle>
                <CardDescription>Relative impact on total costs</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    impact: { label: "Impact Score" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={costDriverAnalysis.map((d) => ({
                        ...d,
                        impactScore: d.impact === "High" ? 3 : d.impact === "Medium" ? 2 : 1,
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="driver" angle={-45} textAnchor="end" height={100} />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="impactScore" fill="hsl(var(--chart-1))" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cost Optimization Opportunities</CardTitle>
              <CardDescription>Identified opportunities for cost reduction</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Opportunity</TableHead>
                    <TableHead>Current Cost</TableHead>
                    <TableHead>Potential Saving</TableHead>
                    <TableHead>Saving %</TableHead>
                    <TableHead>Implementation</TableHead>
                    <TableHead>Timeline</TableHead>
                    <TableHead>Investment</TableHead>
                    <TableHead>ROI %</TableHead>
                    <TableHead>Priority</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {costOptimizationOpportunities.map((opportunity, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{opportunity.opportunity}</TableCell>
                      <TableCell>₹{(opportunity.currentCost / 100000).toFixed(1)}L</TableCell>
                      <TableCell className="text-green-600 font-medium">
                        ₹{(opportunity.potentialSaving / 100000).toFixed(1)}L
                      </TableCell>
                      <TableCell>{opportunity.savingPercent}%</TableCell>
                      <TableCell>{opportunity.implementation}</TableCell>
                      <TableCell>{opportunity.timeline}</TableCell>
                      <TableCell>₹{(opportunity.investment / 100000).toFixed(1)}L</TableCell>
                      <TableCell className="font-medium">{opportunity.roi}%</TableCell>
                      <TableCell>{getPriorityBadge(opportunity.priority)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Wins</CardTitle>
                <CardDescription>High ROI, low investment opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {costOptimizationOpportunities
                    .filter((opp) => opp.roi > 200)
                    .map((opportunity, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{opportunity.opportunity}</h4>
                          <Badge className="bg-green-100 text-green-800">ROI: {opportunity.roi}%</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Saving: ₹{(opportunity.potentialSaving / 100000).toFixed(1)}L</span>
                          <span>Timeline: {opportunity.timeline}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Optimization Summary</CardTitle>
                <CardDescription>Total potential impact</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      ₹
                      {(
                        costOptimizationOpportunities.reduce((sum, opp) => sum + opp.potentialSaving, 0) / 100000
                      ).toFixed(1)}
                      L
                    </div>
                    <div className="text-sm text-muted-foreground">Total Monthly Savings</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      ₹
                      {(
                        (costOptimizationOpportunities.reduce((sum, opp) => sum + opp.potentialSaving, 0) * 12) /
                        10000000
                      ).toFixed(1)}
                      Cr
                    </div>
                    <div className="text-sm text-muted-foreground">Annual Savings Potential</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {(
                        (costOptimizationOpportunities.reduce((sum, opp) => sum + opp.potentialSaving, 0) / 29500000) *
                        100
                      ).toFixed(1)}
                      %
                    </div>
                    <div className="text-sm text-muted-foreground">Cost Reduction Potential</div>
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
