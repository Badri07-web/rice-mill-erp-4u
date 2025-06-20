"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  CreditCard,
  AlertTriangle,
  Clock,
  CheckCircle,
  Calendar,
  DollarSign,
  FileText,
  Download,
  Search,
} from "lucide-react"

const payableInvoices = [
  {
    invoiceNumber: "BILL-2024-001",
    vendorName: "Punjab Grain Suppliers",
    vendorType: "Raw Material",
    invoiceDate: "2024-02-15",
    dueDate: "2024-03-17",
    amount: 2850000,
    outstanding: 2850000,
    daysUntilDue: 15,
    ageGroup: "Current",
    status: "Pending",
    paymentTerms: "30 days",
    discountAvailable: 57000,
    discountDate: "2024-02-25",
    category: "Raw Materials",
  },
  {
    invoiceNumber: "BILL-2024-002",
    vendorName: "Haryana Rice Traders",
    vendorType: "Raw Material",
    invoiceDate: "2024-02-10",
    dueDate: "2024-03-12",
    amount: 1950000,
    outstanding: 1950000,
    daysUntilDue: 10,
    ageGroup: "Current",
    status: "Approved",
    paymentTerms: "30 days",
    discountAvailable: 39000,
    discountDate: "2024-02-20",
    category: "Raw Materials",
  },
  {
    invoiceNumber: "BILL-2024-003",
    vendorName: "Modern Packaging Co",
    vendorType: "Packaging",
    invoiceDate: "2024-01-25",
    dueDate: "2024-02-24",
    amount: 485000,
    outstanding: 485000,
    daysUntilDue: -5,
    ageGroup: "Overdue",
    status: "Overdue",
    paymentTerms: "30 days",
    discountAvailable: 0,
    discountDate: "2024-02-04",
    category: "Packaging",
  },
  {
    invoiceNumber: "BILL-2024-004",
    vendorName: "Power Grid Corporation",
    vendorType: "Utilities",
    invoiceDate: "2024-02-01",
    dueDate: "2024-03-03",
    amount: 325000,
    outstanding: 325000,
    daysUntilDue: 1,
    ageGroup: "Current",
    status: "Pending",
    paymentTerms: "30 days",
    discountAvailable: 0,
    discountDate: null,
    category: "Utilities",
  },
  {
    invoiceNumber: "BILL-2024-005",
    vendorName: "Transport Solutions Ltd",
    vendorType: "Transportation",
    invoiceDate: "2024-02-20",
    dueDate: "2024-03-22",
    amount: 680000,
    outstanding: 680000,
    daysUntilDue: 20,
    ageGroup: "Current",
    status: "Pending",
    paymentTerms: "30 days",
    discountAvailable: 13600,
    discountDate: "2024-03-02",
    category: "Transportation",
  },
  {
    invoiceNumber: "BILL-2024-006",
    vendorName: "Maintenance Services Inc",
    vendorType: "Services",
    invoiceDate: "2024-01-15",
    dueDate: "2024-02-14",
    amount: 125000,
    outstanding: 125000,
    daysUntilDue: -15,
    ageGroup: "Overdue",
    status: "Overdue",
    paymentTerms: "30 days",
    discountAvailable: 0,
    discountDate: "2024-01-25",
    category: "Maintenance",
  },
]

const vendorAnalysis = [
  {
    vendorName: "Punjab Grain Suppliers",
    totalPayable: 2850000,
    invoiceCount: 1,
    avgPaymentDays: 28,
    creditRating: "A",
    paymentHistory: "Excellent",
    discountsAvailable: 57000,
    category: "Raw Materials",
    relationshipYears: 8,
  },
  {
    vendorName: "Haryana Rice Traders",
    totalPayable: 1950000,
    invoiceCount: 1,
    avgPaymentDays: 25,
    creditRating: "A",
    paymentHistory: "Good",
    discountsAvailable: 39000,
    category: "Raw Materials",
    relationshipYears: 5,
  },
  {
    vendorName: "Transport Solutions Ltd",
    totalPayable: 680000,
    invoiceCount: 1,
    avgPaymentDays: 30,
    creditRating: "B+",
    paymentHistory: "Good",
    discountsAvailable: 13600,
    category: "Transportation",
    relationshipYears: 3,
  },
  {
    vendorName: "Modern Packaging Co",
    totalPayable: 485000,
    invoiceCount: 1,
    avgPaymentDays: 35,
    creditRating: "B",
    paymentHistory: "Fair",
    discountsAvailable: 0,
    category: "Packaging",
    relationshipYears: 2,
  },
]

const paymentSchedule = [
  {
    date: "2024-03-01",
    vendor: "Power Grid Corporation",
    amount: 325000,
    type: "Utilities",
    priority: "High",
    method: "Bank Transfer",
  },
  {
    date: "2024-03-02",
    vendor: "Transport Solutions Ltd",
    amount: 680000,
    type: "Transportation",
    priority: "Medium",
    method: "Cheque",
  },
  {
    date: "2024-03-12",
    vendor: "Haryana Rice Traders",
    amount: 1950000,
    type: "Raw Material",
    priority: "High",
    method: "Bank Transfer",
  },
  {
    date: "2024-03-17",
    vendor: "Punjab Grain Suppliers",
    amount: 2850000,
    type: "Raw Material",
    priority: "High",
    method: "Bank Transfer",
  },
]

const cashFlowProjection = [
  { week: "Week 1", outflow: 1005000, inflow: 3200000, netFlow: 2195000, cumulativeFlow: 2195000 },
  { week: "Week 2", outflow: 2630000, inflow: 2800000, netFlow: 170000, cumulativeFlow: 2365000 },
  { week: "Week 3", outflow: 1950000, inflow: 3500000, netFlow: 1550000, cumulativeFlow: 3915000 },
  { week: "Week 4", outflow: 2850000, inflow: 3100000, netFlow: 250000, cumulativeFlow: 4165000 },
]

const categoryBreakdown = [
  { category: "Raw Materials", amount: 4800000, percentage: 73.8, count: 2 },
  { category: "Transportation", amount: 680000, percentage: 10.5, count: 1 },
  { category: "Packaging", amount: 485000, percentage: 7.5, count: 1 },
  { category: "Utilities", amount: 325000, percentage: 5.0, count: 1 },
  { category: "Maintenance", amount: 125000, percentage: 1.9, count: 1 },
  { category: "Services", amount: 85000, percentage: 1.3, count: 1 },
]

export default function AccountsPayablePage() {
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "Approved":
        return <Badge className="bg-blue-100 text-blue-800">Approved</Badge>
      case "Overdue":
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>
      case "Paid":
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge className="bg-red-100 text-red-800">High</Badge>
      case "Medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case "Low":
        return <Badge className="bg-green-100 text-green-800">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const getCreditRatingBadge = (rating: string) => {
    switch (rating) {
      case "A":
        return <Badge className="bg-green-100 text-green-800">A</Badge>
      case "A-":
        return <Badge className="bg-green-100 text-green-800">A-</Badge>
      case "B+":
        return <Badge className="bg-blue-100 text-blue-800">B+</Badge>
      case "B":
        return <Badge className="bg-yellow-100 text-yellow-800">B</Badge>
      case "B-":
        return <Badge className="bg-orange-100 text-orange-800">B-</Badge>
      default:
        return <Badge variant="outline">{rating}</Badge>
    }
  }

  const filteredInvoices = payableInvoices.filter((invoice) => {
    const matchesStatus = filterStatus === "all" || invoice.status.toLowerCase() === filterStatus.toLowerCase()
    const matchesCategory = filterCategory === "all" || invoice.category.toLowerCase() === filterCategory.toLowerCase()
    const matchesSearch =
      searchTerm === "" ||
      invoice.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesStatus && matchesCategory && matchesSearch
  })

  const totalPayable = payableInvoices.reduce((sum, invoice) => sum + invoice.outstanding, 0)
  const overdueAmount = payableInvoices
    .filter((inv) => inv.status === "Overdue")
    .reduce((sum, invoice) => sum + invoice.outstanding, 0)
  const totalDiscounts = payableInvoices.reduce((sum, invoice) => sum + invoice.discountAvailable, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Accounts Payable</h1>
          <p className="text-muted-foreground">Manage vendor payments and cash flow</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <DollarSign className="h-4 w-4 mr-2" />
            Make Payment
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payable</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(totalPayable / 10000000).toFixed(1)}Cr</div>
            <p className="text-xs text-muted-foreground">{payableInvoices.length} invoices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Amount</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">₹{(overdueAmount / 100000).toFixed(1)}L</div>
            <p className="text-xs text-muted-foreground">
              {((overdueAmount / totalPayable) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Discounts</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹{(totalDiscounts / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">Early payment savings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Payment Days</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">29 days</div>
            <p className="text-xs text-muted-foreground">Industry avg: 32 days</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="payables" className="space-y-4">
        <TabsList>
          <TabsTrigger value="payables">Payable Invoices</TabsTrigger>
          <TabsTrigger value="vendors">Vendor Analysis</TabsTrigger>
          <TabsTrigger value="schedule">Payment Schedule</TabsTrigger>
          <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="payables" className="space-y-4">
          {/* Filters */}
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search invoices or vendors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="raw materials">Raw Materials</SelectItem>
                <SelectItem value="transportation">Transportation</SelectItem>
                <SelectItem value="packaging">Packaging</SelectItem>
                <SelectItem value="utilities">Utilities</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Payable Invoices</CardTitle>
              <CardDescription>All pending vendor payments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Invoice Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Days Until Due</TableHead>
                    <TableHead>Discount Available</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                      <TableCell>{invoice.vendorName}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{invoice.category}</Badge>
                      </TableCell>
                      <TableCell>{invoice.invoiceDate}</TableCell>
                      <TableCell>{invoice.dueDate}</TableCell>
                      <TableCell>₹{(invoice.amount / 100000).toFixed(1)}L</TableCell>
                      <TableCell
                        className={
                          invoice.daysUntilDue < 0 ? "text-red-600" : invoice.daysUntilDue <= 5 ? "text-yellow-600" : ""
                        }
                      >
                        {invoice.daysUntilDue < 0
                          ? `${Math.abs(invoice.daysUntilDue)} overdue`
                          : `${invoice.daysUntilDue} days`}
                      </TableCell>
                      <TableCell className="text-green-600">
                        {invoice.discountAvailable > 0 ? `₹${(invoice.discountAvailable / 1000).toFixed(0)}K` : "-"}
                      </TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <DollarSign className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <FileText className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Calendar className="h-3 w-3" />
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

        <TabsContent value="vendors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vendor Analysis</CardTitle>
              <CardDescription>Vendor payment analysis and relationship management</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Total Payable</TableHead>
                    <TableHead>Invoices</TableHead>
                    <TableHead>Avg Payment Days</TableHead>
                    <TableHead>Credit Rating</TableHead>
                    <TableHead>Payment History</TableHead>
                    <TableHead>Available Discounts</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Relationship</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vendorAnalysis.map((vendor, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{vendor.vendorName}</TableCell>
                      <TableCell>₹{(vendor.totalPayable / 100000).toFixed(1)}L</TableCell>
                      <TableCell>{vendor.invoiceCount}</TableCell>
                      <TableCell>{vendor.avgPaymentDays} days</TableCell>
                      <TableCell>{getCreditRatingBadge(vendor.creditRating)}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            vendor.paymentHistory === "Excellent"
                              ? "bg-green-100 text-green-800"
                              : vendor.paymentHistory === "Good"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {vendor.paymentHistory}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-green-600">
                        {vendor.discountsAvailable > 0 ? `₹${(vendor.discountsAvailable / 1000).toFixed(0)}K` : "-"}
                      </TableCell>
                      <TableCell>{vendor.category}</TableCell>
                      <TableCell>{vendor.relationshipYears} years</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Top Vendors by Amount</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {vendorAnalysis
                    .sort((a, b) => b.totalPayable - a.totalPayable)
                    .slice(0, 3)
                    .map((vendor, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-sm">{vendor.vendorName}</span>
                        <span className="font-medium">₹{(vendor.totalPayable / 100000).toFixed(1)}L</span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Discount Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {vendorAnalysis
                    .filter((vendor) => vendor.discountsAvailable > 0)
                    .map((vendor, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-sm">{vendor.vendorName}</span>
                        <span className="font-medium text-green-600">
                          ₹{(vendor.discountsAvailable / 1000).toFixed(0)}K
                        </span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vendor Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Excellent Rating</span>
                    <span className="font-medium">2 vendors</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Good Rating</span>
                    <span className="font-medium">2 vendors</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Payment Days</span>
                    <span className="font-medium">29.5 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Schedule</CardTitle>
              <CardDescription>Upcoming payments and cash flow planning</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment Date</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentSchedule.map((payment, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{payment.date}</TableCell>
                      <TableCell>{payment.vendor}</TableCell>
                      <TableCell>₹{(payment.amount / 100000).toFixed(1)}L</TableCell>
                      <TableCell>
                        <Badge variant="outline">{payment.type}</Badge>
                      </TableCell>
                      <TableCell>{getPriorityBadge(payment.priority)}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <DollarSign className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Calendar className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle>This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹10.1L</div>
                <p className="text-xs text-muted-foreground">1 payment due</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Next Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹26.3L</div>
                <p className="text-xs text-muted-foreground">1 payment due</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹64.2L</div>
                <p className="text-xs text-muted-foreground">6 payments due</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Overdue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">₹6.1L</div>
                <p className="text-xs text-muted-foreground">2 payments overdue</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cashflow" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cash Flow Projection</CardTitle>
              <CardDescription>Weekly cash flow analysis and projections</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  outflow: { label: "Outflow", color: "hsl(var(--chart-1))" },
                  inflow: { label: "Inflow", color: "hsl(var(--chart-2))" },
                  netFlow: { label: "Net Flow", color: "hsl(var(--chart-3))" },
                  cumulativeFlow: { label: "Cumulative", color: "hsl(var(--chart-4))" },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={cashFlowProjection}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="outflow" fill="var(--color-outflow)" />
                    <Bar dataKey="inflow" fill="var(--color-inflow)" />
                    <Line type="monotone" dataKey="netFlow" stroke="var(--color-netFlow)" strokeWidth={2} />
                    <Line
                      type="monotone"
                      dataKey="cumulativeFlow"
                      stroke="var(--color-cumulativeFlow)"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle>Net Cash Flow</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">₹41.7L</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cash Position</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹4.17Cr</div>
                <p className="text-xs text-muted-foreground">End of month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Working Capital</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹2.8Cr</div>
                <p className="text-xs text-muted-foreground">Available</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cash Ratio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.85</div>
                <p className="text-xs text-muted-foreground">Healthy ratio</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
                <CardDescription>Payables by expense category</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    amount: { label: "Amount (₹)" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryBreakdown}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ category, percentage }) => `${category} ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="amount"
                      >
                        {categoryBreakdown.map((entry, index) => (
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
                <CardTitle>Payment Trends</CardTitle>
                <CardDescription>Monthly payment analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    amount: { label: "Amount (₹)", color: "hsl(var(--chart-1))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryBreakdown}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" angle={-45} textAnchor="end" height={100} />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="amount" fill="var(--color-amount)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Category Analysis</CardTitle>
              <CardDescription>Detailed breakdown by expense categories</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead>Invoice Count</TableHead>
                    <TableHead>Avg Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categoryBreakdown.map((category, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{category.category}</TableCell>
                      <TableCell>₹{(category.amount / 100000).toFixed(1)}L</TableCell>
                      <TableCell>{category.percentage}%</TableCell>
                      <TableCell>{category.count}</TableCell>
                      <TableCell>₹{(category.amount / category.count / 100000).toFixed(1)}L</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
