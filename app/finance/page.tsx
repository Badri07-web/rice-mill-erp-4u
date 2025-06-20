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
  DollarSign,
  TrendingUp,
  CreditCard,
  Receipt,
  FileText,
  Plus,
  Search,
  Eye,
  Download,
  Calendar,
  Building,
  Users,
} from "lucide-react"
import { format } from "date-fns"

const accountsReceivableData = [
  {
    id: "AR-001",
    invoiceNumber: "INV-2024-001",
    customer: "ABC Distributors",
    invoiceDate: "2024-03-01",
    dueDate: "2024-03-31",
    amount: 3610800,
    paidAmount: 0,
    balanceAmount: 3610800,
    status: "Overdue",
    daysOverdue: 15,
    salesPerson: "Rajesh Sharma",
    paymentTerms: "30 Days",
  },
  {
    id: "AR-002",
    invoiceNumber: "INV-2024-002",
    customer: "XYZ Trading Co.",
    invoiceDate: "2024-03-10",
    dueDate: "2024-03-25",
    amount: 991200,
    paidAmount: 991200,
    balanceAmount: 0,
    status: "Paid",
    daysOverdue: 0,
    salesPerson: "Priya Patel",
    paymentTerms: "Advance",
  },
  {
    id: "AR-003",
    invoiceNumber: "INV-2024-003",
    customer: "PQR Exports",
    invoiceDate: "2024-03-15",
    dueDate: "2024-03-30",
    amount: 5121200,
    paidAmount: 2560600,
    balanceAmount: 2560600,
    status: "Partial",
    daysOverdue: 0,
    salesPerson: "Amit Kumar",
    paymentTerms: "15 Days",
  },
]

const accountsPayableData = [
  {
    id: "AP-001",
    billNumber: "BILL-2024-001",
    supplier: "Punjab Farmers Co-op",
    billDate: "2024-03-05",
    dueDate: "2024-04-05",
    amount: 1400000,
    paidAmount: 0,
    balanceAmount: 1400000,
    status: "Pending",
    daysOverdue: 0,
    category: "Raw Material",
    paymentTerms: "30 Days",
  },
  {
    id: "AP-002",
    billNumber: "BILL-2024-002",
    supplier: "Transport Services Ltd",
    billDate: "2024-03-12",
    dueDate: "2024-03-27",
    amount: 125000,
    paidAmount: 125000,
    balanceAmount: 0,
    status: "Paid",
    daysOverdue: 0,
    category: "Transportation",
    paymentTerms: "15 Days",
  },
  {
    id: "AP-003",
    billNumber: "BILL-2024-003",
    supplier: "Electricity Board",
    billDate: "2024-03-01",
    dueDate: "2024-03-20",
    amount: 85000,
    paidAmount: 0,
    balanceAmount: 85000,
    status: "Overdue",
    daysOverdue: 10,
    category: "Utilities",
    paymentTerms: "20 Days",
  },
]

const cashFlowData = [
  { month: "Oct", inflow: 15200000, outflow: 12800000, net: 2400000 },
  { month: "Nov", inflow: 18500000, outflow: 14200000, net: 4300000 },
  { month: "Dec", inflow: 22100000, outflow: 16800000, net: 5300000 },
  { month: "Jan", inflow: 19800000, outflow: 15500000, net: 4300000 },
  { month: "Feb", inflow: 21500000, outflow: 17200000, net: 4300000 },
  { month: "Mar", inflow: 25300000, outflow: 19800000, net: 5500000 },
]

const expenseCategories = [
  { category: "Raw Materials", amount: 12500000, percentage: 45, color: "#8884d8" },
  { category: "Transportation", amount: 4200000, percentage: 15, color: "#82ca9d" },
  { category: "Labor", amount: 3500000, percentage: 13, color: "#ffc658" },
  { category: "Utilities", amount: 2800000, percentage: 10, color: "#ff7300" },
  { category: "Maintenance", amount: 2100000, percentage: 8, color: "#00ff00" },
  { category: "Others", amount: 2500000, percentage: 9, color: "#ff00ff" },
]

const bankAccountsData = [
  {
    id: "BANK-001",
    accountName: "Current Account - SBI",
    accountNumber: "1234567890",
    bankName: "State Bank of India",
    branch: "Main Branch",
    balance: 8500000,
    accountType: "Current",
    status: "Active",
  },
  {
    id: "BANK-002",
    accountName: "Savings Account - HDFC",
    accountNumber: "9876543210",
    bankName: "HDFC Bank",
    branch: "Business Branch",
    balance: 2300000,
    accountType: "Savings",
    status: "Active",
  },
  {
    id: "BANK-003",
    accountName: "FD Account - ICICI",
    accountNumber: "5555666677",
    bankName: "ICICI Bank",
    branch: "Corporate Branch",
    balance: 5000000,
    accountType: "Fixed Deposit",
    status: "Active",
  },
]

const profitLossData = [
  { item: "Revenue", amount: 125000000, type: "income" },
  { item: "Cost of Goods Sold", amount: 75000000, type: "expense" },
  { item: "Gross Profit", amount: 50000000, type: "profit" },
  { item: "Operating Expenses", amount: 28000000, type: "expense" },
  { item: "EBITDA", amount: 22000000, type: "profit" },
  { item: "Depreciation", amount: 3500000, type: "expense" },
  { item: "Interest", amount: 1200000, type: "expense" },
  { item: "Net Profit", amount: 17300000, type: "profit" },
]

export default function FinanceManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "Overdue":
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>
      case "Partial":
        return <Badge className="bg-blue-100 text-blue-800">Partial</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredReceivables = accountsReceivableData.filter((item) => {
    const matchesSearch =
      item.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || item.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Finance Management</h1>
          <p className="text-muted-foreground">Track financial transactions, cash flow, and profitability</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Reports
          </Button>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Generate Statement
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Transaction
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹12.5Cr</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accounts Receivable</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{(accountsReceivableData.reduce((sum, item) => sum + item.balanceAmount, 0) / 10000000).toFixed(1)}Cr
            </div>
            <p className="text-xs text-muted-foreground">
              {accountsReceivableData.filter((item) => item.status === "Overdue").length} overdue invoices
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accounts Payable</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{(accountsPayableData.reduce((sum, item) => sum + item.balanceAmount, 0) / 1000000).toFixed(1)}L
            </div>
            <p className="text-xs text-muted-foreground">
              {accountsPayableData.filter((item) => item.status === "Overdue").length} overdue bills
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Cash Flow</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹5.5Cr</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="receivables" className="space-y-4">
        <TabsList>
          <TabsTrigger value="receivables">Accounts Receivable</TabsTrigger>
          <TabsTrigger value="payables">Accounts Payable</TabsTrigger>
          <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
          <TabsTrigger value="banking">Banking</TabsTrigger>
          <TabsTrigger value="reports">Financial Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="receivables" className="space-y-4">
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
                      placeholder="Search by invoice number or customer..."
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
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                    <SelectItem value="partial">Partial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Receivables Summary */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Outstanding</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹{(accountsReceivableData.reduce((sum, item) => sum + item.balanceAmount, 0) / 10000000).toFixed(1)}Cr
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Overdue Amount</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  ₹
                  {(
                    accountsReceivableData
                      .filter((item) => item.status === "Overdue")
                      .reduce((sum, item) => sum + item.balanceAmount, 0) / 10000000
                  ).toFixed(1)}
                  Cr
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Current Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹
                  {(
                    accountsReceivableData
                      .filter((item) => item.status === "Pending")
                      .reduce((sum, item) => sum + item.balanceAmount, 0) / 10000000
                  ).toFixed(1)}
                  Cr
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Collection Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85%</div>
                <p className="text-sm text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>

          {/* Receivables Table */}
          <Card>
            <CardHeader>
              <CardTitle>Accounts Receivable</CardTitle>
              <CardDescription>Outstanding invoices and payment status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice Number</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Invoice Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Paid</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Days Overdue</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReceivables.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.invoiceNumber}</TableCell>
                      <TableCell>{item.customer}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {format(new Date(item.invoiceDate), "dd/MM/yyyy")}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {format(new Date(item.dueDate), "dd/MM/yyyy")}
                        </div>
                      </TableCell>
                      <TableCell>₹{(item.amount / 100000).toFixed(1)}L</TableCell>
                      <TableCell>₹{(item.paidAmount / 100000).toFixed(1)}L</TableCell>
                      <TableCell>₹{(item.balanceAmount / 100000).toFixed(1)}L</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>
                        {item.daysOverdue > 0 ? (
                          <Badge className="bg-red-100 text-red-800">{item.daysOverdue} days</Badge>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedTransaction(item)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Invoice Details - {item.invoiceNumber}</DialogTitle>
                                <DialogDescription>Complete invoice information</DialogDescription>
                              </DialogHeader>
                              {selectedTransaction && <InvoiceDetailsModal transaction={selectedTransaction} />}
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm">
                            <Receipt className="h-4 w-4" />
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

        <TabsContent value="payables" className="space-y-4">
          {/* Payables Summary */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Payable</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹{(accountsPayableData.reduce((sum, item) => sum + item.balanceAmount, 0) / 1000000).toFixed(1)}L
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Overdue Bills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  ₹
                  {(
                    accountsPayableData
                      .filter((item) => item.status === "Overdue")
                      .reduce((sum, item) => sum + item.balanceAmount, 0) / 1000
                  ).toFixed(0)}
                  K
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Due This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹
                  {(
                    accountsPayableData
                      .filter((item) => item.status === "Pending")
                      .reduce((sum, item) => sum + item.balanceAmount, 0) / 1000000
                  ).toFixed(1)}
                  L
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Payment Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-sm text-muted-foreground">On-time payments</p>
              </CardContent>
            </Card>
          </div>

          {/* Payables Table */}
          <Card>
            <CardHeader>
              <CardTitle>Accounts Payable</CardTitle>
              <CardDescription>Outstanding bills and payment obligations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bill Number</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Bill Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Paid</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accountsPayableData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.billNumber}</TableCell>
                      <TableCell>{item.supplier}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {format(new Date(item.billDate), "dd/MM/yyyy")}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {format(new Date(item.dueDate), "dd/MM/yyyy")}
                        </div>
                      </TableCell>
                      <TableCell>₹{(item.amount / 1000).toFixed(0)}K</TableCell>
                      <TableCell>₹{(item.paidAmount / 1000).toFixed(0)}K</TableCell>
                      <TableCell>₹{(item.balanceAmount / 1000).toFixed(0)}K</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <CreditCard className="h-4 w-4" />
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

        <TabsContent value="cashflow" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Cash Flow Trend</CardTitle>
                <CardDescription>Monthly cash inflow and outflow</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    inflow: { label: "Inflow", color: "hsl(var(--chart-1))" },
                    outflow: { label: "Outflow", color: "hsl(var(--chart-2))" },
                    net: { label: "Net Flow", color: "hsl(var(--chart-3))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={cashFlowData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="inflow" fill="var(--color-inflow)" />
                      <Bar dataKey="outflow" fill="var(--color-outflow)" />
                      <Bar dataKey="net" fill="var(--color-net)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expense Categories</CardTitle>
                <CardDescription>Breakdown of expenses by category</CardDescription>
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
                        data={expenseCategories}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ category, percentage }) => `${category} ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="amount"
                      >
                        {expenseCategories.map((entry, index) => (
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
              <CardTitle>Cash Flow Summary</CardTitle>
              <CardDescription>Current month cash flow analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2 text-green-600">Cash Inflow</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Sales Revenue:</span>
                      <span>₹22.5Cr</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Other Income:</span>
                      <span>₹2.8Cr</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total Inflow:</span>
                      <span>₹25.3Cr</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2 text-red-600">Cash Outflow</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Raw Materials:</span>
                      <span>₹12.5Cr</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Operating Expenses:</span>
                      <span>₹7.3Cr</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total Outflow:</span>
                      <span>₹19.8Cr</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2 text-blue-600">Net Cash Flow</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Opening Balance:</span>
                      <span>₹8.2Cr</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Net Flow:</span>
                      <span>₹5.5Cr</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Closing Balance:</span>
                      <span>₹13.7Cr</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="banking" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bank Accounts</CardTitle>
              <CardDescription>All bank accounts and balances</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {bankAccountsData.map((account) => (
                  <Card key={account.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="text-lg">{account.accountName}</span>
                        <Badge className="bg-green-100 text-green-800">{account.status}</Badge>
                      </CardTitle>
                      <CardDescription>
                        {account.bankName} - {account.branch}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Account Number:</span>
                        <span className="font-medium">****{account.accountNumber.slice(-4)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Account Type:</span>
                        <span className="font-medium">{account.accountType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Balance:</span>
                        <span className="font-medium text-lg">₹{(account.balance / 1000000).toFixed(1)}L</span>
                      </div>
                      <Button variant="outline" className="w-full">
                        <Eye className="h-4 w-4 mr-2" />
                        View Statement
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Total Bank Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    ₹{(bankAccountsData.reduce((sum, account) => sum + account.balance, 0) / 10000000).toFixed(1)}Cr
                  </div>
                  <p className="text-muted-foreground">Across all accounts</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Profit & Loss Statement</CardTitle>
                <CardDescription>Current month P&L summary</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {profitLossData.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span
                        className={`font-medium ${item.type === "profit" ? "text-green-600" : item.type === "expense" ? "text-red-600" : ""}`}
                      >
                        {item.item}:
                      </span>
                      <span
                        className={`font-medium ${item.type === "profit" ? "text-green-600" : item.type === "expense" ? "text-red-600" : ""}`}
                      >
                        ₹{(item.amount / 10000000).toFixed(1)}Cr
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Ratios</CardTitle>
                <CardDescription>Key financial performance indicators</CardDescription>
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
                      <span className="text-sm font-medium">Net Profit Margin</span>
                      <span className="text-sm font-medium">13.8%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "13.8%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Current Ratio</span>
                      <span className="text-sm font-medium">2.8</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "70%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">ROI</span>
                      <span className="text-sm font-medium">18.5%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: "18.5%" }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
              <CardDescription>Generate and download financial reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Button variant="outline" className="h-20 flex-col">
                  <FileText className="h-6 w-6 mb-2" />
                  Balance Sheet
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Receipt className="h-6 w-6 mb-2" />
                  P&L Statement
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <TrendingUp className="h-6 w-6 mb-2" />
                  Cash Flow Statement
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <DollarSign className="h-6 w-6 mb-2" />
                  Trial Balance
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Building className="h-6 w-6 mb-2" />
                  Asset Register
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Users className="h-6 w-6 mb-2" />
                  Ledger Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function InvoiceDetailsModal({ transaction }: { transaction: any }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Invoice Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Invoice Number:</span>
              <span className="font-medium">{transaction.invoiceNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Customer:</span>
              <span className="font-medium">{transaction.customer}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Invoice Date:</span>
              <span className="font-medium">{format(new Date(transaction.invoiceDate), "dd/MM/yyyy")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Due Date:</span>
              <span className="font-medium">{format(new Date(transaction.dueDate), "dd/MM/yyyy")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Terms:</span>
              <span className="font-medium">{transaction.paymentTerms}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Amount:</span>
              <span className="font-medium">₹{(transaction.amount / 100000).toFixed(1)}L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Paid Amount:</span>
              <span className="font-medium">₹{(transaction.paidAmount / 100000).toFixed(1)}L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Balance Amount:</span>
              <span className="font-medium">₹{(transaction.balanceAmount / 100000).toFixed(1)}L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              {getStatusBadge(transaction.status)}
            </div>
            {transaction.daysOverdue > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Days Overdue:</span>
                <Badge className="bg-red-100 text-red-800">{transaction.daysOverdue} days</Badge>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function getStatusBadge(status: string) {
  switch (status) {
    case "Paid":
      return <Badge className="bg-green-100 text-green-800">Paid</Badge>
    case "Pending":
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
    case "Overdue":
      return <Badge className="bg-red-100 text-red-800">Overdue</Badge>
    case "Partial":
      return <Badge className="bg-blue-100 text-blue-800">Partial</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}
