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
import { CreditCard, AlertTriangle, Clock, CheckCircle, Phone, Mail, FileText, Download, Search } from "lucide-react"

const outstandingInvoices = [
  {
    invoiceNumber: "INV-2024-001",
    customerName: "Rajesh Traders",
    customerType: "Distributor",
    invoiceDate: "2024-01-15",
    dueDate: "2024-02-14",
    amount: 485000,
    outstanding: 485000,
    daysOverdue: 15,
    ageGroup: "31-60 days",
    status: "Overdue",
    lastContact: "2024-02-20",
    paymentTerms: "30 days",
    creditLimit: 1000000,
    riskLevel: "Medium",
  },
  {
    invoiceNumber: "INV-2024-002",
    customerName: "Modern Rice Mills",
    customerType: "Retailer",
    invoiceDate: "2024-01-20",
    dueDate: "2024-02-19",
    amount: 325000,
    outstanding: 325000,
    daysOverdue: 10,
    ageGroup: "31-60 days",
    status: "Overdue",
    lastContact: "2024-02-25",
    paymentTerms: "30 days",
    creditLimit: 500000,
    riskLevel: "Low",
  },
  {
    invoiceNumber: "INV-2024-003",
    customerName: "Golden Grain Export",
    customerType: "Exporter",
    invoiceDate: "2024-02-01",
    dueDate: "2024-03-03",
    amount: 1250000,
    outstanding: 1250000,
    daysOverdue: 0,
    ageGroup: "Current",
    status: "Current",
    lastContact: "2024-02-28",
    paymentTerms: "30 days",
    creditLimit: 2000000,
    riskLevel: "Low",
  },
  {
    invoiceNumber: "INV-2024-004",
    customerName: "Punjab Food Corp",
    customerType: "Government",
    invoiceDate: "2024-01-10",
    dueDate: "2024-02-09",
    amount: 2150000,
    outstanding: 2150000,
    daysOverdue: 20,
    ageGroup: "31-60 days",
    status: "Overdue",
    lastContact: "2024-02-15",
    paymentTerms: "30 days",
    creditLimit: 5000000,
    riskLevel: "Low",
  },
  {
    invoiceNumber: "INV-2024-005",
    customerName: "Sharma Rice Depot",
    customerType: "Distributor",
    invoiceDate: "2024-12-15",
    dueDate: "2024-01-14",
    amount: 680000,
    outstanding: 680000,
    daysOverdue: 45,
    ageGroup: "31-60 days",
    status: "Overdue",
    lastContact: "2024-02-10",
    paymentTerms: "30 days",
    creditLimit: 800000,
    riskLevel: "High",
  },
  {
    invoiceNumber: "INV-2024-006",
    customerName: "Elite Rice Traders",
    customerType: "Retailer",
    invoiceDate: "2024-02-10",
    dueDate: "2024-03-12",
    amount: 420000,
    outstanding: 420000,
    daysOverdue: 0,
    ageGroup: "Current",
    status: "Current",
    lastContact: "2024-03-01",
    paymentTerms: "30 days",
    creditLimit: 600000,
    riskLevel: "Low",
  },
]

const agingAnalysis = [
  { ageGroup: "Current", amount: 1670000, count: 2, percentage: 31.2 },
  { ageGroup: "1-30 days", amount: 0, count: 0, percentage: 0 },
  { ageGroup: "31-60 days", amount: 3640000, count: 4, percentage: 68.0 },
  { ageGroup: "61-90 days", amount: 0, count: 0, percentage: 0 },
  { ageGroup: "90+ days", amount: 45000, count: 0, percentage: 0.8 },
]

const customerAnalysis = [
  {
    customerName: "Punjab Food Corp",
    totalOutstanding: 2150000,
    invoiceCount: 1,
    avgDaysOverdue: 20,
    creditLimit: 5000000,
    creditUtilization: 43,
    riskLevel: "Low",
    paymentHistory: "Good",
    lastPayment: "2024-01-15",
  },
  {
    customerName: "Golden Grain Export",
    totalOutstanding: 1250000,
    invoiceCount: 1,
    avgDaysOverdue: 0,
    creditLimit: 2000000,
    creditUtilization: 62.5,
    riskLevel: "Low",
    paymentHistory: "Excellent",
    lastPayment: "2024-02-01",
  },
  {
    customerName: "Sharma Rice Depot",
    totalOutstanding: 680000,
    invoiceCount: 1,
    avgDaysOverdue: 45,
    creditLimit: 800000,
    creditUtilization: 85,
    riskLevel: "High",
    paymentHistory: "Poor",
    lastPayment: "2023-12-20",
  },
  {
    customerName: "Rajesh Traders",
    totalOutstanding: 485000,
    invoiceCount: 1,
    avgDaysOverdue: 15,
    creditLimit: 1000000,
    creditUtilization: 48.5,
    riskLevel: "Medium",
    paymentHistory: "Fair",
    lastPayment: "2024-01-10",
  },
]

const collectionTrends = [
  { month: "Oct", outstanding: 4200000, collected: 3800000, collectionRate: 90.5 },
  { month: "Nov", outstanding: 4800000, collected: 4200000, collectionRate: 87.5 },
  { month: "Dec", outstanding: 5200000, collected: 4500000, collectionRate: 86.5 },
  { month: "Jan", outstanding: 5800000, collected: 4900000, collectionRate: 84.5 },
  { month: "Feb", outstanding: 6100000, collected: 5200000, collectionRate: 85.2 },
  { month: "Mar", outstanding: 5350000, collected: 5800000, collectionRate: 108.4 },
]

const followUpActions = [
  {
    invoiceNumber: "INV-2024-005",
    customerName: "Sharma Rice Depot",
    amount: 680000,
    daysOverdue: 45,
    action: "Legal Notice",
    priority: "High",
    assignedTo: "Legal Team",
    dueDate: "2024-03-05",
    status: "Pending",
    notes: "Customer has payment issues, considering legal action",
  },
  {
    invoiceNumber: "INV-2024-001",
    customerName: "Rajesh Traders",
    amount: 485000,
    daysOverdue: 15,
    action: "Phone Call",
    priority: "Medium",
    assignedTo: "Sales Team",
    dueDate: "2024-03-02",
    status: "Completed",
    notes: "Customer promised payment by end of week",
  },
  {
    invoiceNumber: "INV-2024-004",
    customerName: "Punjab Food Corp",
    amount: 2150000,
    daysOverdue: 20,
    action: "Email Reminder",
    priority: "Medium",
    assignedTo: "Accounts Team",
    dueDate: "2024-03-01",
    status: "Completed",
    notes: "Government payment process, expecting payment soon",
  },
]

export default function AccountsReceivablePage() {
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterCustomerType, setFilterCustomerType] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Current":
        return <Badge className="bg-green-100 text-green-800">Current</Badge>
      case "Overdue":
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>
      case "Paid":
        return <Badge className="bg-blue-100 text-blue-800">Paid</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
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
        return <Badge className="bg-red-100 text-red-800">High</Badge>
      case "Medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case "Low":
        return <Badge className="bg-green-100 text-green-800">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const getActionStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "Overdue":
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredInvoices = outstandingInvoices.filter((invoice) => {
    const matchesStatus = filterStatus === "all" || invoice.status.toLowerCase() === filterStatus.toLowerCase()
    const matchesCustomerType =
      filterCustomerType === "all" || invoice.customerType.toLowerCase() === filterCustomerType.toLowerCase()
    const matchesSearch =
      searchTerm === "" ||
      invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesStatus && matchesCustomerType && matchesSearch
  })

  const totalOutstanding = outstandingInvoices.reduce((sum, invoice) => sum + invoice.outstanding, 0)
  const overdueAmount = outstandingInvoices
    .filter((inv) => inv.status === "Overdue")
    .reduce((sum, invoice) => sum + invoice.outstanding, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Accounts Receivable</h1>
          <p className="text-muted-foreground">Manage outstanding invoices and customer payments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Generate Statement
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Outstanding</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(totalOutstanding / 10000000).toFixed(1)}Cr</div>
            <p className="text-xs text-muted-foreground">{outstandingInvoices.length} invoices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Amount</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">₹{(overdueAmount / 10000000).toFixed(1)}Cr</div>
            <p className="text-xs text-muted-foreground">
              {((overdueAmount / totalOutstanding) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Days Outstanding</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18 days</div>
            <p className="text-xs text-muted-foreground">Industry avg: 25 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85.2%</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="outstanding" className="space-y-4">
        <TabsList>
          <TabsTrigger value="outstanding">Outstanding Invoices</TabsTrigger>
          <TabsTrigger value="aging">Aging Analysis</TabsTrigger>
          <TabsTrigger value="customers">Customer Analysis</TabsTrigger>
          <TabsTrigger value="collections">Collections</TabsTrigger>
          <TabsTrigger value="followup">Follow-up Actions</TabsTrigger>
        </TabsList>

        <TabsContent value="outstanding" className="space-y-4">
          {/* Filters */}
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search invoices or customers..."
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
                <SelectItem value="current">Current</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCustomerType} onValueChange={setFilterCustomerType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Customer Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="distributor">Distributor</SelectItem>
                <SelectItem value="retailer">Retailer</SelectItem>
                <SelectItem value="exporter">Exporter</SelectItem>
                <SelectItem value="government">Government</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Outstanding Invoices</CardTitle>
              <CardDescription>All pending customer payments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Invoice Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Days Overdue</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                      <TableCell>{invoice.customerName}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{invoice.customerType}</Badge>
                      </TableCell>
                      <TableCell>{invoice.invoiceDate}</TableCell>
                      <TableCell>{invoice.dueDate}</TableCell>
                      <TableCell>₹{(invoice.amount / 100000).toFixed(1)}L</TableCell>
                      <TableCell className={invoice.daysOverdue > 0 ? "text-red-600" : ""}>
                        {invoice.daysOverdue > 0 ? invoice.daysOverdue : "-"}
                      </TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell>{getRiskBadge(invoice.riskLevel)}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Phone className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Mail className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <FileText className="h-3 w-3" />
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

        <TabsContent value="aging" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Aging Analysis</CardTitle>
                <CardDescription>Outstanding amounts by age groups</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    amount: { label: "Amount (₹)" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={agingAnalysis}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="ageGroup" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="amount" fill="hsl(var(--chart-1))" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Aging Distribution</CardTitle>
                <CardDescription>Percentage breakdown by age groups</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: { label: "Percentage" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={agingAnalysis}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ ageGroup, percentage }) => `${ageGroup} ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="amount"
                      >
                        {agingAnalysis.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={`hsl(${index * 72}, 70%, 50%)`} />
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
              <CardTitle>Detailed Aging Report</CardTitle>
              <CardDescription>Breakdown of outstanding amounts by age groups</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Age Group</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Invoice Count</TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead>Collection Priority</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agingAnalysis.map((age, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{age.ageGroup}</TableCell>
                      <TableCell>₹{(age.amount / 100000).toFixed(1)}L</TableCell>
                      <TableCell>{age.count}</TableCell>
                      <TableCell>{age.percentage}%</TableCell>
                      <TableCell>
                        {age.ageGroup === "Current" && <Badge className="bg-green-100 text-green-800">Low</Badge>}
                        {age.ageGroup === "1-30 days" && (
                          <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
                        )}
                        {age.ageGroup === "31-60 days" && <Badge className="bg-orange-100 text-orange-800">High</Badge>}
                        {age.ageGroup === "61-90 days" && <Badge className="bg-red-100 text-red-800">Critical</Badge>}
                        {age.ageGroup === "90+ days" && <Badge className="bg-red-100 text-red-800">Urgent</Badge>}
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
              <CardTitle>Customer Analysis</CardTitle>
              <CardDescription>Outstanding amounts and risk assessment by customer</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Outstanding</TableHead>
                    <TableHead>Invoices</TableHead>
                    <TableHead>Avg Days Overdue</TableHead>
                    <TableHead>Credit Limit</TableHead>
                    <TableHead>Utilization</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Payment History</TableHead>
                    <TableHead>Last Payment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customerAnalysis.map((customer, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{customer.customerName}</TableCell>
                      <TableCell>₹{(customer.totalOutstanding / 100000).toFixed(1)}L</TableCell>
                      <TableCell>{customer.invoiceCount}</TableCell>
                      <TableCell className={customer.avgDaysOverdue > 0 ? "text-red-600" : ""}>
                        {customer.avgDaysOverdue > 0 ? customer.avgDaysOverdue : "-"}
                      </TableCell>
                      <TableCell>₹{(customer.creditLimit / 100000).toFixed(1)}L</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${customer.creditUtilization >= 80 ? "bg-red-600" : customer.creditUtilization >= 60 ? "bg-yellow-600" : "bg-green-600"}`}
                              style={{ width: `${customer.creditUtilization}%` }}
                            />
                          </div>
                          <span className="text-sm">{customer.creditUtilization}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{getRiskBadge(customer.riskLevel)}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            customer.paymentHistory === "Excellent"
                              ? "bg-green-100 text-green-800"
                              : customer.paymentHistory === "Good"
                                ? "bg-blue-100 text-blue-800"
                                : customer.paymentHistory === "Fair"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                          }
                        >
                          {customer.paymentHistory}
                        </Badge>
                      </TableCell>
                      <TableCell>{customer.lastPayment}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>High Risk Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {customerAnalysis
                    .filter((customer) => customer.riskLevel === "High")
                    .map((customer, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{customer.customerName}</h4>
                          <Badge className="bg-red-100 text-red-800">High Risk</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Outstanding: ₹{(customer.totalOutstanding / 100000).toFixed(1)}L</span>
                          <span>Overdue: {customer.avgDaysOverdue} days</span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Outstanding Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {customerAnalysis
                    .sort((a, b) => b.totalOutstanding - a.totalOutstanding)
                    .slice(0, 3)
                    .map((customer, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-sm">{customer.customerName}</span>
                        <span className="font-medium">₹{(customer.totalOutstanding / 100000).toFixed(1)}L</span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Credit Utilization Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {customerAnalysis
                    .filter((customer) => customer.creditUtilization >= 80)
                    .map((customer, index) => (
                      <div key={index} className="p-2 bg-red-50 rounded-lg">
                        <p className="text-sm font-medium text-red-800">{customer.customerName}</p>
                        <p className="text-xs text-red-600">{customer.creditUtilization}% utilized</p>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="collections" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Collection Performance</CardTitle>
              <CardDescription>Monthly collection trends and efficiency</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  outstanding: { label: "Outstanding", color: "hsl(var(--chart-1))" },
                  collected: { label: "Collected", color: "hsl(var(--chart-2))" },
                  collectionRate: { label: "Collection Rate %", color: "hsl(var(--chart-3))" },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={collectionTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar yAxisId="left" dataKey="outstanding" fill="var(--color-outstanding)" />
                    <Bar yAxisId="left" dataKey="collected" fill="var(--color-collected)" />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="collectionRate"
                      stroke="var(--color-collectionRate)"
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
                <CardTitle>Collection Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">85.2%</div>
                <p className="text-xs text-muted-foreground">Current month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Collection Period</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32 days</div>
                <p className="text-xs text-muted-foreground">Industry avg: 35 days</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bad Debt Provision</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.1%</div>
                <p className="text-xs text-muted-foreground">Of total receivables</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Collection Target</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">90%</div>
                <p className="text-xs text-muted-foreground">Monthly target</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="followup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Follow-up Actions</CardTitle>
              <CardDescription>Scheduled collection activities and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Days Overdue</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {followUpActions.map((action, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{action.invoiceNumber}</TableCell>
                      <TableCell>{action.customerName}</TableCell>
                      <TableCell>₹{(action.amount / 100000).toFixed(1)}L</TableCell>
                      <TableCell className="text-red-600">{action.daysOverdue}</TableCell>
                      <TableCell>{action.action}</TableCell>
                      <TableCell>{getPriorityBadge(action.priority)}</TableCell>
                      <TableCell>{action.assignedTo}</TableCell>
                      <TableCell>{action.dueDate}</TableCell>
                      <TableCell>{getActionStatusBadge(action.status)}</TableCell>
                      <TableCell className="max-w-xs truncate">{action.notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Pending Actions</CardTitle>
                <CardDescription>Actions requiring immediate attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {followUpActions
                    .filter((action) => action.status === "Pending")
                    .map((action, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{action.customerName}</h4>
                          {getPriorityBadge(action.priority)}
                        </div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Action: {action.action}</span>
                          <span>Due: {action.dueDate}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{action.notes}</p>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Collection Strategy</CardTitle>
                <CardDescription>Recommended actions by age group</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-green-800">Current (0-30 days)</h4>
                    <p className="text-sm text-muted-foreground">Send payment reminders 3 days before due date</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-yellow-800">31-60 days</h4>
                    <p className="text-sm text-muted-foreground">Phone calls and email follow-ups</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-red-800">60+ days</h4>
                    <p className="text-sm text-muted-foreground">Legal notices and collection agencies</p>
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
