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
  FileText,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Plus,
  Search,
  Eye,
  Edit,
  Download,
  Calendar,
  Send,
  Printer,
  CreditCard,
} from "lucide-react"
import { format } from "date-fns"

const invoicesData = [
  {
    id: "INV-001",
    invoiceNumber: "INV-2024-001",
    customer: "ABC Distributors",
    customerGST: "07AAACR5055K1Z5",
    invoiceDate: "2024-03-15",
    dueDate: "2024-04-14",
    orderNumber: "SO-2024-001",
    items: [
      { product: "Basmati Rice - 5kg", quantity: 1000, rate: 210, amount: 210000 },
      { product: "Non-Basmati Rice - 25kg", quantity: 500, rate: 1600, amount: 800000 },
    ],
    subtotal: 1010000,
    cgst: 90900,
    sgst: 90900,
    igst: 0,
    totalTax: 181800,
    totalAmount: 1191800,
    paidAmount: 0,
    balanceAmount: 1191800,
    status: "Pending",
    paymentStatus: "Unpaid",
    salesPerson: "Rajesh Sharma",
    terms: "30 Days Credit",
    notes: "Please ensure timely payment",
  },
  {
    id: "INV-002",
    invoiceNumber: "INV-2024-002",
    customer: "XYZ Trading Co.",
    customerGST: "27AAACX1234K1Z8",
    invoiceDate: "2024-03-14",
    dueDate: "2024-03-29",
    orderNumber: "SO-2024-002",
    items: [{ product: "Basmati Rice - 25kg", quantity: 200, rate: 1050, amount: 210000 }],
    subtotal: 210000,
    cgst: 18900,
    sgst: 18900,
    igst: 0,
    totalTax: 37800,
    totalAmount: 247800,
    paidAmount: 247800,
    balanceAmount: 0,
    status: "Paid",
    paymentStatus: "Paid",
    salesPerson: "Priya Patel",
    terms: "Advance Payment",
    notes: "Payment received in advance",
  },
  {
    id: "INV-003",
    invoiceNumber: "INV-2024-003",
    customer: "PQR Enterprises",
    customerGST: "19AAACR9876K1Z2",
    invoiceDate: "2024-03-13",
    dueDate: "2024-04-12",
    orderNumber: "SO-2024-003",
    items: [
      { product: "Rice Bran", quantity: 500, rate: 800, amount: 400000 },
      { product: "Broken Rice", quantity: 200, rate: 1800, amount: 360000 },
    ],
    subtotal: 760000,
    cgst: 68400,
    sgst: 68400,
    igst: 0,
    totalTax: 136800,
    totalAmount: 896800,
    paidAmount: 450000,
    balanceAmount: 446800,
    status: "Partially Paid",
    paymentStatus: "Partial",
    salesPerson: "Amit Singh",
    terms: "15 Days Credit",
    notes: "Partial payment received",
  },
  {
    id: "INV-004",
    invoiceNumber: "INV-2024-004",
    customer: "LMN Food Industries",
    customerGST: "06AAACL5678K1Z9",
    invoiceDate: "2024-03-12",
    dueDate: "2024-03-27",
    orderNumber: "SO-2024-004",
    items: [
      { product: "Premium Basmati - 1kg", quantity: 2000, rate: 85, amount: 170000 },
      { product: "Organic Rice - 5kg", quantity: 300, rate: 280, amount: 84000 },
    ],
    subtotal: 254000,
    cgst: 22860,
    sgst: 22860,
    igst: 0,
    totalTax: 45720,
    totalAmount: 299720,
    paidAmount: 0,
    balanceAmount: 299720,
    status: "Overdue",
    paymentStatus: "Overdue",
    salesPerson: "Sunita Verma",
    terms: "15 Days Credit",
    notes: "Follow up required for payment",
  },
]

const paymentHistory = [
  {
    invoiceNumber: "INV-2024-002",
    paymentDate: "2024-03-14",
    amount: 247800,
    method: "Bank Transfer",
    reference: "TXN123456789",
    status: "Cleared",
  },
  {
    invoiceNumber: "INV-2024-003",
    paymentDate: "2024-03-20",
    amount: 450000,
    method: "Cheque",
    reference: "CHQ987654321",
    status: "Cleared",
  },
]

const agingAnalysis = [
  { range: "0-30 Days", count: 15, amount: 2500000, percentage: 45 },
  { range: "31-60 Days", count: 8, amount: 1200000, percentage: 22 },
  { range: "61-90 Days", count: 5, amount: 800000, percentage: 14 },
  { range: "90+ Days", count: 3, amount: 1050000, percentage: 19 },
]

const monthlyInvoiceTrends = [
  { month: "Oct", invoices: 45, amount: 8500000, paid: 7200000, pending: 1300000 },
  { month: "Nov", invoices: 52, amount: 9800000, paid: 8500000, pending: 1300000 },
  { month: "Dec", invoices: 48, amount: 9200000, paid: 8000000, pending: 1200000 },
  { month: "Jan", invoices: 55, amount: 10500000, paid: 9200000, pending: 1300000 },
  { month: "Feb", invoices: 58, amount: 11200000, paid: 9800000, pending: 1400000 },
  { month: "Mar", invoices: 62, amount: 12000000, paid: 10500000, pending: 1500000 },
]

const customerOutstanding = [
  { customer: "ABC Distributors", outstanding: 1191800, invoices: 3, overdue: 0 },
  { customer: "PQR Enterprises", outstanding: 446800, invoices: 2, overdue: 1 },
  { customer: "LMN Food Industries", outstanding: 299720, invoices: 1, overdue: 1 },
  { customer: "DEF Trading", outstanding: 850000, invoices: 4, overdue: 2 },
]

export default function InvoiceManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "Paid":
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>
      case "Partially Paid":
        return <Badge className="bg-blue-100 text-blue-800">Partially Paid</Badge>
      case "Overdue":
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>
      case "Cancelled":
        return <Badge className="bg-gray-100 text-gray-800">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>
      case "Unpaid":
        return <Badge className="bg-red-100 text-red-800">Unpaid</Badge>
      case "Partial":
        return <Badge className="bg-blue-100 text-blue-800">Partial</Badge>
      case "Overdue":
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredInvoices = invoicesData.filter((invoice) => {
    const matchesSearch =
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || invoice.status.toLowerCase() === statusFilter
    const matchesPayment = paymentFilter === "all" || invoice.paymentStatus.toLowerCase() === paymentFilter
    return matchesSearch && matchesStatus && matchesPayment
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoice Management</h1>
          <p className="text-muted-foreground">Manage invoices, payments, and customer accounts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Invoice
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{invoicesData.length}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{(invoicesData.reduce((sum, inv) => sum + inv.totalAmount, 0) / 1000000).toFixed(1)}L
            </div>
            <p className="text-xs text-muted-foreground">Invoice value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{(invoicesData.reduce((sum, inv) => sum + inv.balanceAmount, 0) / 1000000).toFixed(1)}L
            </div>
            <p className="text-xs text-muted-foreground">Pending payments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                (invoicesData.reduce((sum, inv) => sum + inv.paidAmount, 0) /
                  invoicesData.reduce((sum, inv) => sum + inv.totalAmount, 0)) *
                  100,
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground">Payment collection</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="invoices" className="space-y-4">
        <TabsList>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="payments">Payment History</TabsTrigger>
          <TabsTrigger value="aging">Aging Analysis</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-4">
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
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="partially paid">Partially Paid</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Payment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Payments</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="unpaid">Unpaid</SelectItem>
                    <SelectItem value="partial">Partial</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Invoices Table */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice List</CardTitle>
              <CardDescription>Complete list of invoices and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice Number</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Invoice Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Paid Amount</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{invoice.customer}</div>
                          <div className="text-sm text-muted-foreground">GST: {invoice.customerGST}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {format(new Date(invoice.invoiceDate), "dd/MM/yyyy")}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {format(new Date(invoice.dueDate), "dd/MM/yyyy")}
                        </div>
                      </TableCell>
                      <TableCell>₹{(invoice.totalAmount / 1000).toFixed(0)}K</TableCell>
                      <TableCell>₹{(invoice.paidAmount / 1000).toFixed(0)}K</TableCell>
                      <TableCell>
                        <span className={invoice.balanceAmount > 0 ? "text-red-600 font-medium" : "text-green-600"}>
                          ₹{(invoice.balanceAmount / 1000).toFixed(0)}K
                        </span>
                      </TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell>{getPaymentStatusBadge(invoice.paymentStatus)}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedInvoice(invoice)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>Invoice Details - {invoice.invoiceNumber}</DialogTitle>
                                <DialogDescription>Complete invoice information and payment details</DialogDescription>
                              </DialogHeader>
                              {selectedInvoice && <InvoiceDetailsModal invoice={selectedInvoice} />}
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Printer className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Send className="h-4 w-4" />
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

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Record of all payments received</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice Number</TableHead>
                    <TableHead>Payment Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((payment, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{payment.invoiceNumber}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {format(new Date(payment.paymentDate), "dd/MM/yyyy")}
                        </div>
                      </TableCell>
                      <TableCell>₹{(payment.amount / 1000).toFixed(0)}K</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <CreditCard className="h-3 w-3 text-muted-foreground" />
                          {payment.method}
                        </div>
                      </TableCell>
                      <TableCell>{payment.reference}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">{payment.status}</Badge>
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
                <CardTitle>Payment Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Bank Transfer</span>
                    <span className="font-medium">₹2.5L</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cheque</span>
                    <span className="font-medium">₹4.5L</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cash</span>
                    <span className="font-medium">₹0.8L</span>
                  </div>
                  <div className="flex justify-between">
                    <span>UPI/Digital</span>
                    <span className="font-medium">₹1.2L</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">INV-2024-002</p>
                        <p className="text-sm text-muted-foreground">XYZ Trading Co.</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹2.48L</p>
                        <p className="text-sm text-muted-foreground">14/03/2024</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">INV-2024-003</p>
                        <p className="text-sm text-muted-foreground">PQR Enterprises</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹4.5L</p>
                        <p className="text-sm text-muted-foreground">20/03/2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="aging" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Aging Analysis</CardTitle>
              <CardDescription>Outstanding amounts by age groups</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Age Range</TableHead>
                    <TableHead>Invoice Count</TableHead>
                    <TableHead>Outstanding Amount</TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead>Risk Level</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agingAnalysis.map((age, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{age.range}</TableCell>
                      <TableCell>{age.count}</TableCell>
                      <TableCell>₹{(age.amount / 1000000).toFixed(1)}L</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                age.percentage > 40
                                  ? "bg-red-600"
                                  : age.percentage > 20
                                    ? "bg-yellow-600"
                                    : "bg-green-600"
                              }`}
                              style={{ width: `${age.percentage * 2}%` }}
                            />
                          </div>
                          <span className="text-sm">{age.percentage}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {age.range === "0-30 Days" && <Badge className="bg-green-100 text-green-800">Low</Badge>}
                        {age.range === "31-60 Days" && <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>}
                        {age.range === "61-90 Days" && <Badge className="bg-orange-100 text-orange-800">High</Badge>}
                        {age.range === "90+ Days" && <Badge className="bg-red-100 text-red-800">Critical</Badge>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Outstanding</CardTitle>
              <CardDescription>Top customers with outstanding amounts</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Outstanding Amount</TableHead>
                    <TableHead>Invoice Count</TableHead>
                    <TableHead>Overdue Invoices</TableHead>
                    <TableHead>Action Required</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customerOutstanding.map((customer, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{customer.customer}</TableCell>
                      <TableCell>₹{(customer.outstanding / 1000).toFixed(0)}K</TableCell>
                      <TableCell>{customer.invoices}</TableCell>
                      <TableCell>
                        {customer.overdue > 0 ? (
                          <Badge className="bg-red-100 text-red-800">{customer.overdue}</Badge>
                        ) : (
                          <Badge className="bg-green-100 text-green-800">0</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {customer.overdue > 0 ? (
                          <Button size="sm" variant="outline">
                            Follow Up
                          </Button>
                        ) : (
                          <span className="text-muted-foreground">None</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Trends</CardTitle>
              <CardDescription>Monthly invoice and payment trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  amount: { label: "Invoice Amount", color: "hsl(var(--chart-1))" },
                  paid: { label: "Paid Amount", color: "hsl(var(--chart-2))" },
                  pending: { label: "Pending Amount", color: "hsl(var(--chart-3))" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyInvoiceTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="amount" stroke="var(--color-amount)" strokeWidth={2} />
                    <Line type="monotone" dataKey="paid" stroke="var(--color-paid)" strokeWidth={2} />
                    <Line type="monotone" dataKey="pending" stroke="var(--color-pending)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Collection Performance</CardTitle>
                <CardDescription>Monthly collection rates</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    rate: { label: "Collection Rate (%)", color: "hsl(var(--chart-1))" },
                  }}
                  className="h-[250px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyInvoiceTrends.map((item) => ({
                        ...item,
                        rate: Math.round((item.paid / item.amount) * 100),
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="rate" fill="var(--color-rate)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
                <CardDescription>Important financial indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">87%</div>
                      <div className="text-sm text-muted-foreground">Collection Rate</div>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">25 days</div>
                      <div className="text-sm text-muted-foreground">Avg Collection Period</div>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">₹19.4L</div>
                      <div className="text-sm text-muted-foreground">Avg Invoice Value</div>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">4</div>
                      <div className="text-sm text-muted-foreground">Overdue Invoices</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Action Items</CardTitle>
              <CardDescription>Priority actions for invoice management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-red-800">Overdue Follow-up</h4>
                    <p className="text-sm text-muted-foreground">4 invoices overdue for payment</p>
                    <p className="text-sm font-medium text-red-600">Total: ₹7.46L</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-yellow-800">Payment Reminders</h4>
                    <p className="text-sm text-muted-foreground">8 invoices due in next 7 days</p>
                    <p className="text-sm font-medium text-yellow-600">Total: ₹12.8L</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-blue-800">Credit Limit Review</h4>
                    <p className="text-sm text-muted-foreground">3 customers near credit limit</p>
                    <p className="text-sm font-medium text-blue-600">Review required</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-green-800">Collection Improvement</h4>
                    <p className="text-sm text-muted-foreground">Implement automated reminders</p>
                    <p className="text-sm font-medium text-green-600">+5% collection rate</p>
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

function InvoiceDetailsModal({ invoice }: { invoice: any }) {
  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="details">Invoice Details</TabsTrigger>
        <TabsTrigger value="items">Items</TabsTrigger>
        <TabsTrigger value="payments">Payment Info</TabsTrigger>
      </TabsList>

      <TabsContent value="details" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Invoice Number:</span>
                <span className="font-medium">{invoice.invoiceNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Number:</span>
                <span className="font-medium">{invoice.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Invoice Date:</span>
                <span className="font-medium">{format(new Date(invoice.invoiceDate), "dd/MM/yyyy")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Due Date:</span>
                <span className="font-medium">{format(new Date(invoice.dueDate), "dd/MM/yyyy")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sales Person:</span>
                <span className="font-medium">{invoice.salesPerson}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Terms:</span>
                <span className="font-medium">{invoice.terms}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Customer:</span>
                <span className="font-medium">{invoice.customer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">GST Number:</span>
                <span className="font-medium">{invoice.customerGST}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                {getStatusBadge(invoice.status)}
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Status:</span>
                {getPaymentStatusBadge(invoice.paymentStatus)}
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Notes:</span>
                <span className="font-medium text-sm">{invoice.notes}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="items" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Invoice Items</CardTitle>
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
                {invoice.items.map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.product}</TableCell>
                    <TableCell>{item.quantity.toLocaleString()}</TableCell>
                    <TableCell>₹{item.rate.toLocaleString()}</TableCell>
                    <TableCell>₹{(item.amount / 1000).toFixed(0)}K</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="payments" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal:</span>
              <span className="font-medium">₹{(invoice.subtotal / 1000).toFixed(0)}K</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">CGST:</span>
              <span className="font-medium">₹{(invoice.cgst / 1000).toFixed(0)}K</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">SGST:</span>
              <span className="font-medium">₹{(invoice.sgst / 1000).toFixed(0)}K</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Tax:</span>
              <span className="font-medium">₹{(invoice.totalTax / 1000).toFixed(0)}K</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between font-medium text-lg">
                <span>Total Amount:</span>
                <span>₹{(invoice.totalAmount / 1000).toFixed(0)}K</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Paid Amount:</span>
              <span className="font-medium text-green-600">₹{(invoice.paidAmount / 1000).toFixed(0)}K</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Balance Amount:</span>
              <span className={`font-medium ${invoice.balanceAmount > 0 ? "text-red-600" : "text-green-600"}`}>
                ₹{(invoice.balanceAmount / 1000).toFixed(0)}K
              </span>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

function getStatusBadge(status: string) {
  switch (status) {
    case "Pending":
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
    case "Paid":
      return <Badge className="bg-green-100 text-green-800">Paid</Badge>
    case "Partially Paid":
      return <Badge className="bg-blue-100 text-blue-800">Partially Paid</Badge>
    case "Overdue":
      return <Badge className="bg-red-100 text-red-800">Overdue</Badge>
    case "Cancelled":
      return <Badge className="bg-gray-100 text-gray-800">Cancelled</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

function getPaymentStatusBadge(status: string) {
  switch (status) {
    case "Paid":
      return <Badge className="bg-green-100 text-green-800">Paid</Badge>
    case "Unpaid":
      return <Badge className="bg-red-100 text-red-800">Unpaid</Badge>
    case "Partial":
      return <Badge className="bg-blue-100 text-blue-800">Partial</Badge>
    case "Overdue":
      return <Badge className="bg-red-100 text-red-800">Overdue</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}
