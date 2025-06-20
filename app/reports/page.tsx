"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import {
  FileText,
  Download,
  CalendarIcon,
  TrendingUp,
  BarChart3,
  Activity,
  Users,
  Truck,
  DollarSign,
  Target,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import { format } from "date-fns"

const salesReportData = [
  { month: "Jan", sales: 22100000, target: 25000000, orders: 75, customers: 42 },
  { month: "Feb", sales: 19500000, target: 25000000, orders: 63, customers: 35 },
  { month: "Mar", sales: 25300000, target: 25000000, orders: 85, customers: 48 },
  { month: "Apr", sales: 28200000, target: 30000000, orders: 92, customers: 52 },
  { month: "May", sales: 31500000, target: 30000000, orders: 105, customers: 58 },
  { month: "Jun", sales: 29800000, target: 30000000, orders: 98, customers: 55 },
]

const productPerformanceData = [
  { product: "Basmati Rice", sales: 85000000, quantity: 2500, margin: 35, growth: 12 },
  { product: "Non-Basmati Rice", sales: 35000000, quantity: 1800, margin: 28, growth: 8 },
  { product: "Rice Bran", sales: 8000000, quantity: 800, margin: 45, growth: -5 },
  { product: "Broken Rice", sales: 2500000, quantity: 450, margin: 22, growth: 15 },
]

const customerAnalyticsData = [
  { segment: "Premium", customers: 25, revenue: 95000000, avgOrder: 3800000 },
  { segment: "Standard", customers: 45, revenue: 65000000, avgOrder: 1444444 },
  { segment: "Economy", customers: 35, revenue: 25000000, avgOrder: 714286 },
]

const operationalMetrics = [
  { metric: "Production Efficiency", value: 92, target: 95, unit: "%" },
  { metric: "Inventory Turnover", value: 8.5, target: 10, unit: "times/year" },
  { metric: "Order Fulfillment", value: 96, target: 98, unit: "%" },
  { metric: "Transportation Cost", value: 4.2, target: 4.0, unit: "% of sales" },
  { metric: "Quality Rejection", value: 1.8, target: 2.0, unit: "%" },
  { metric: "Customer Satisfaction", value: 4.6, target: 4.5, unit: "/5" },
]

const financialSummary = [
  { category: "Revenue", q1: 67000000, q2: 89500000, q3: 95200000, q4: 98300000 },
  { category: "Gross Profit", q1: 26800000, q2: 35800000, q3: 38080000, q4: 39320000 },
  { category: "Operating Expenses", q1: 18760000, q2: 25060000, q3: 26656000, q4: 27524000 },
  { category: "Net Profit", q1: 8040000, q2: 10740000, q3: 11424000, q4: 11796000 },
]

const inventoryAnalytics = [
  { item: "Basmati Paddy", current: 2500, optimal: 3000, turnover: 12, value: 7000000 },
  { item: "Non-Basmati Paddy", current: 450, optimal: 800, turnover: 15, value: 990000 },
  { item: "Basmati Rice", current: 1800, optimal: 2000, turnover: 18, value: 7560000 },
  { item: "Non-Basmati Rice", current: 1200, optimal: 1500, turnover: 20, value: 3840000 },
]

const complianceReports = [
  { report: "GST Returns", status: "Filed", dueDate: "2024-03-20", lastFiled: "2024-03-18" },
  { report: "Income Tax", status: "Pending", dueDate: "2024-03-31", lastFiled: "2024-02-28" },
  { report: "Labor Compliance", status: "Filed", dueDate: "2024-03-25", lastFiled: "2024-03-22" },
  { report: "Environmental Clearance", status: "Filed", dueDate: "2024-04-15", lastFiled: "2024-03-10" },
  { report: "Food Safety Audit", status: "Due", dueDate: "2024-03-30", lastFiled: "2023-12-30" },
]

export default function ReportsAnalyticsPage() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(2024, 0, 1),
    to: new Date(2024, 2, 31),
  })
  const [reportType, setReportType] = useState("sales")
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">Comprehensive business intelligence and reporting</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
          <Button variant="outline">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Schedule Reports
          </Button>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Custom Report
          </Button>
        </div>
      </div>

      {/* Report Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Report Filters</CardTitle>
          <CardDescription>Configure report parameters and date ranges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <Label htmlFor="reportType">Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Sales Report</SelectItem>
                  <SelectItem value="financial">Financial Report</SelectItem>
                  <SelectItem value="operational">Operational Report</SelectItem>
                  <SelectItem value="inventory">Inventory Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="period">Period</Label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Date Range</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? format(dateRange.from, "dd/MM/yyyy") : "Select date"}
                    {" - "}
                    {dateRange.to ? format(dateRange.to, "dd/MM/yyyy") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="range"
                    selected={{ from: dateRange.from, to: dateRange.to }}
                    onSelect={(range) => range && setDateRange(range)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-end">
              <Button className="w-full">
                <BarChart3 className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Executive Dashboard</TabsTrigger>
          <TabsTrigger value="sales">Sales Analytics</TabsTrigger>
          <TabsTrigger value="financial">Financial Reports</TabsTrigger>
          <TabsTrigger value="operational">Operational Metrics</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          {/* KPI Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹35.0Cr</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  +15.2% from last quarter
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Net Profit Margin</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">13.8%</div>
                <p className="text-xs text-muted-foreground">Target: 15%</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.6/5</div>
                <p className="text-xs text-muted-foreground">Based on 250 reviews</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Operational Efficiency</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-xs text-muted-foreground">Target: 95%</p>
              </CardContent>
            </Card>
          </div>

          {/* Executive Summary Charts */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue vs Target</CardTitle>
                <CardDescription>Monthly performance against targets</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    sales: { label: "Sales", color: "hsl(var(--chart-1))" },
                    target: { label: "Target", color: "hsl(var(--chart-2))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesReportData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="sales" fill="var(--color-sales)" />
                      <Bar dataKey="target" fill="var(--color-target)" opacity={0.5} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Segments</CardTitle>
                <CardDescription>Revenue distribution by customer segment</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    revenue: { label: "Revenue (₹)" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={customerAnalyticsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ segment, revenue }) => `${segment}: ₹${(revenue / 10000000).toFixed(1)}Cr`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="revenue"
                      >
                        {customerAnalyticsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={`hsl(${index * 120}, 70%, 50%)`} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Key Metrics Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Key Performance Indicators</CardTitle>
              <CardDescription>Critical business metrics at a glance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {operationalMetrics.map((metric, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{metric.metric}</h4>
                      {metric.value >= metric.target ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold">
                        {metric.value}
                        {metric.unit}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Target: {metric.target}
                        {metric.unit}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className={`h-2 rounded-full ${metric.value >= metric.target ? "bg-green-600" : "bg-yellow-600"}`}
                        style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Sales Trend Analysis</CardTitle>
                <CardDescription>Monthly sales performance and growth</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    sales: { label: "Sales (₹)", color: "hsl(var(--chart-1))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesReportData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="sales"
                        stroke="var(--color-sales)"
                        fill="var(--color-sales)"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Product Performance</CardTitle>
                <CardDescription>Sales and margin analysis by product</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {productPerformanceData.map((product, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{product.product}</h4>
                        <Badge
                          className={product.growth > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                        >
                          {product.growth > 0 ? "+" : ""}
                          {product.growth}%
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Sales</p>
                          <p className="font-medium">₹{(product.sales / 10000000).toFixed(1)}Cr</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Quantity</p>
                          <p className="font-medium">{product.quantity} MT</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Margin</p>
                          <p className="font-medium">{product.margin}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Customer Analytics</CardTitle>
              <CardDescription>Customer segmentation and behavior analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {customerAnalyticsData.map((segment, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-3">{segment.segment} Customers</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Count:</span>
                        <span className="font-medium">{segment.customers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Revenue:</span>
                        <span className="font-medium">₹{(segment.revenue / 10000000).toFixed(1)}Cr</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Avg Order:</span>
                        <span className="font-medium">₹{(segment.avgOrder / 100000).toFixed(1)}L</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quarterly Financial Performance</CardTitle>
              <CardDescription>Revenue, profit, and expense trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  q1: { label: "Q1", color: "hsl(var(--chart-1))" },
                  q2: { label: "Q2", color: "hsl(var(--chart-2))" },
                  q3: { label: "Q3", color: "hsl(var(--chart-3))" },
                  q4: { label: "Q4", color: "hsl(var(--chart-4))" },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={financialSummary}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="q1" fill="var(--color-q1)" />
                    <Bar dataKey="q2" fill="var(--color-q2)" />
                    <Bar dataKey="q3" fill="var(--color-q3)" />
                    <Bar dataKey="q4" fill="var(--color-q4)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Profit Margins</CardTitle>
                <CardDescription>Margin analysis across quarters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Gross Profit Margin</span>
                      <span className="text-sm font-medium">40%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "40%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Operating Margin</span>
                      <span className="text-sm font-medium">22%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "22%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Net Profit Margin</span>
                      <span className="text-sm font-medium">13.8%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: "13.8%" }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Ratios</CardTitle>
                <CardDescription>Key financial health indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current Ratio:</span>
                    <span className="font-medium">2.8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quick Ratio:</span>
                    <span className="font-medium">1.9</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Debt-to-Equity:</span>
                    <span className="font-medium">0.35</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ROI:</span>
                    <span className="font-medium">18.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ROE:</span>
                    <span className="font-medium">22.3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Asset Turnover:</span>
                    <span className="font-medium">1.4</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="operational" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Analysis</CardTitle>
                <CardDescription>Stock levels and turnover rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inventoryAnalytics.map((item, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{item.item}</h4>
                        <Badge
                          className={
                            item.current >= item.optimal * 0.8
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {Math.round((item.current / item.optimal) * 100)}%
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Current</p>
                          <p className="font-medium">{item.current} MT</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Turnover</p>
                          <p className="font-medium">{item.turnover}x</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Value</p>
                          <p className="font-medium">₹{(item.value / 1000000).toFixed(1)}L</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Production Metrics</CardTitle>
                <CardDescription>Manufacturing efficiency and quality</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium mb-2">Production Efficiency</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold">92%</span>
                      <Badge className="bg-yellow-100 text-yellow-800">Target: 95%</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "92%" }} />
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium mb-2">Quality Score</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold">98.2%</span>
                      <Badge className="bg-green-100 text-green-800">Target: 98%</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "98.2%" }} />
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium mb-2">Capacity Utilization</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold">87%</span>
                      <Badge className="bg-blue-100 text-blue-800">Optimal: 85%</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "87%" }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Transportation Analytics</CardTitle>
              <CardDescription>Fleet performance and logistics efficiency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="p-4 border rounded-lg text-center">
                  <Truck className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <h4 className="font-medium">Fleet Utilization</h4>
                  <p className="text-2xl font-bold">85%</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <Target className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <h4 className="font-medium">On-time Delivery</h4>
                  <p className="text-2xl font-bold">94%</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <DollarSign className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <h4 className="font-medium">Cost per km</h4>
                  <p className="text-2xl font-bold">₹18.5</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <Activity className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                  <h4 className="font-medium">Fuel Efficiency</h4>
                  <p className="text-2xl font-bold">12.9 km/L</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Status</CardTitle>
              <CardDescription>Regulatory compliance and filing status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceReports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          report.status === "Filed"
                            ? "bg-green-500"
                            : report.status === "Pending"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      />
                      <div>
                        <h4 className="font-medium">{report.report}</h4>
                        <p className="text-sm text-muted-foreground">
                          Due: {format(new Date(report.dueDate), "dd/MM/yyyy")} | Last Filed:{" "}
                          {format(new Date(report.lastFiled), "dd/MM/yyyy")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={
                          report.status === "Filed"
                            ? "bg-green-100 text-green-800"
                            : report.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {report.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600">92%</div>
                  <p className="text-muted-foreground">Overall compliance rate</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pending Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-600">3</div>
                  <p className="text-muted-foreground">Items requiring attention</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Next Due Date</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold">30 Mar</div>
                  <p className="text-muted-foreground">Food Safety Audit</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
