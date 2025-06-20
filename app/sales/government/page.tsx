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
  Building2,
  FileText,
  TrendingUp,
  Calendar,
  Plus,
  Search,
  Eye,
  Edit,
  Download,
  Phone,
  Mail,
  MapPin,
  Award,
} from "lucide-react"
import { format } from "date-fns"

const governmentContractsData = [
  {
    id: "GOV-001",
    contractNumber: "PDS-2024-001",
    scheme: "Public Distribution System",
    department: "Food & Civil Supplies",
    state: "Punjab",
    contactPerson: "Rajesh Kumar",
    phone: "+91-98765-11111",
    email: "rajesh@foodsupply.gov.in",
    contractDate: "2024-01-15",
    deliveryPeriod: "Jan 2024 - Dec 2024",
    totalQuantity: 50000,
    deliveredQuantity: 12500,
    pendingQuantity: 37500,
    riceVariety: "Non-Basmati",
    grade: "FAQ",
    rate: 3200,
    totalValue: 160000000,
    paidAmount: 40000000,
    pendingAmount: 120000000,
    status: "Active",
    nextDelivery: "2024-04-15",
    specifications: "As per FCI norms",
  },
  {
    id: "GOV-002",
    contractNumber: "MDM-2024-002",
    scheme: "Mid Day Meal",
    department: "Education Department",
    state: "Haryana",
    contactPerson: "Priya Sharma",
    phone: "+91-98765-22222",
    email: "priya@education.gov.in",
    contractDate: "2024-02-01",
    deliveryPeriod: "Feb 2024 - Nov 2024",
    totalQuantity: 25000,
    deliveredQuantity: 8500,
    pendingQuantity: 16500,
    riceVariety: "Non-Basmati",
    grade: "FAQ",
    rate: 3100,
    totalValue: 77500000,
    paidAmount: 26350000,
    pendingAmount: 51150000,
    status: "Active",
    nextDelivery: "2024-04-10",
    specifications: "Fortified rice as per guidelines",
  },
  {
    id: "GOV-003",
    contractNumber: "ARMY-2024-003",
    scheme: "Defence Supplies",
    department: "Defence Canteen",
    state: "Delhi",
    contactPerson: "Col. Amit Singh",
    phone: "+91-98765-33333",
    email: "amit@defence.gov.in",
    contractDate: "2024-03-01",
    deliveryPeriod: "Mar 2024 - Aug 2024",
    totalQuantity: 15000,
    deliveredQuantity: 3000,
    pendingQuantity: 12000,
    riceVariety: "Basmati",
    grade: "Premium",
    rate: 4500,
    totalValue: 67500000,
    paidAmount: 13500000,
    pendingAmount: 54000000,
    status: "Active",
    nextDelivery: "2024-04-05",
    specifications: "Premium quality Basmati",
  },
]

const monthlyDeliveries = [
  { month: "Oct", pds: 8500, mdm: 3200, defence: 1800, total: 13500 },
  { month: "Nov", pds: 9200, mdm: 3800, defence: 2100, total: 15100 },
  { month: "Dec", pds: 10500, mdm: 4200, defence: 2500, total: 17200 },
  { month: "Jan", pds: 11200, mdm: 4500, defence: 2800, total: 18500 },
  { month: "Feb", pds: 12000, mdm: 5000, defence: 3200, total: 20200 },
  { month: "Mar", pds: 12500, mdm: 5500, defence: 3000, total: 21000 },
]

const schemeWiseData = [
  { scheme: "PDS", contracts: 15, quantity: 125000, value: 400000000 },
  { scheme: "Mid Day Meal", contracts: 8, quantity: 45000, value: 139500000 },
  { scheme: "Defence", contracts: 5, quantity: 25000, value: 112500000 },
  { scheme: "ICDS", contracts: 3, quantity: 15000, value: 46500000 },
]

export default function GovernmentSalesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [schemeFilter, setSchemeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedContract, setSelectedContract] = useState<any>(null)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "Completed":
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "Cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getSchemeBadge = (scheme: string) => {
    const colorMap: { [key: string]: string } = {
      "Public Distribution System": "bg-blue-100 text-blue-800",
      "Mid Day Meal": "bg-green-100 text-green-800",
      "Defence Supplies": "bg-purple-100 text-purple-800",
      ICDS: "bg-orange-100 text-orange-800",
    }
    return <Badge className={colorMap[scheme] || "bg-gray-100 text-gray-800"}>{scheme}</Badge>
  }

  const filteredContracts = governmentContractsData.filter((contract) => {
    const matchesSearch =
      contract.contractNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesScheme = schemeFilter === "all" || contract.scheme.toLowerCase().includes(schemeFilter)
    const matchesStatus = statusFilter === "all" || contract.status.toLowerCase() === statusFilter
    return matchesSearch && matchesScheme && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Government Sales</h1>
          <p className="text-muted-foreground">Manage government contracts and scheme deliveries</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Contract
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Contracts</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{governmentContractsData.length}</div>
            <p className="text-xs text-muted-foreground">Across multiple schemes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contract Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{(governmentContractsData.reduce((sum, contract) => sum + contract.totalValue, 0) / 10000000).toFixed(0)}
              Cr
            </div>
            <p className="text-xs text-muted-foreground">Current fiscal year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Deliveries</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {governmentContractsData.reduce((sum, contract) => sum + contract.pendingQuantity, 0).toLocaleString()} MT
            </div>
            <p className="text-xs text-muted-foreground">To be delivered</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payment Pending</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹
              {(governmentContractsData.reduce((sum, contract) => sum + contract.pendingAmount, 0) / 10000000).toFixed(
                0,
              )}
              Cr
            </div>
            <p className="text-xs text-muted-foreground">Outstanding amount</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="contracts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="contracts">Active Contracts</TabsTrigger>
          <TabsTrigger value="deliveries">Delivery Schedule</TabsTrigger>
          <TabsTrigger value="schemes">Scheme Analysis</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="contracts" className="space-y-4">
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
                      placeholder="Search by contract number or department..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <Select value={schemeFilter} onValueChange={setSchemeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Scheme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Schemes</SelectItem>
                    <SelectItem value="pds">PDS</SelectItem>
                    <SelectItem value="mid day meal">Mid Day Meal</SelectItem>
                    <SelectItem value="defence">Defence</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Contracts Table */}
          <Card>
            <CardHeader>
              <CardTitle>Government Contracts</CardTitle>
              <CardDescription>Active government supply contracts and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contract Number</TableHead>
                    <TableHead>Scheme</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Contact Person</TableHead>
                    <TableHead>Total Quantity</TableHead>
                    <TableHead>Delivered</TableHead>
                    <TableHead>Pending</TableHead>
                    <TableHead>Contract Value</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Next Delivery</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContracts.map((contract) => (
                    <TableRow key={contract.id}>
                      <TableCell className="font-medium">{contract.contractNumber}</TableCell>
                      <TableCell>{getSchemeBadge(contract.scheme)}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{contract.department}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {contract.state}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{contract.contactPerson}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {contract.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{contract.totalQuantity.toLocaleString()} MT</TableCell>
                      <TableCell>
                        <div className="text-green-600 font-medium">
                          {contract.deliveredQuantity.toLocaleString()} MT
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-orange-600 font-medium">
                          {contract.pendingQuantity.toLocaleString()} MT
                        </div>
                      </TableCell>
                      <TableCell>₹{(contract.totalValue / 10000000).toFixed(1)}Cr</TableCell>
                      <TableCell>{getStatusBadge(contract.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {format(new Date(contract.nextDelivery), "dd/MM/yyyy")}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedContract(contract)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>Contract Details - {contract.contractNumber}</DialogTitle>
                                <DialogDescription>
                                  Complete contract information and delivery schedule
                                </DialogDescription>
                              </DialogHeader>
                              {selectedContract && <ContractDetailsModal contract={selectedContract} />}
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
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

        <TabsContent value="deliveries" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deliveries</CardTitle>
              <CardDescription>Scheduled deliveries for the next 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {governmentContractsData.map((contract) => (
                  <div key={contract.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{contract.contractNumber}</h4>
                          {getSchemeBadge(contract.scheme)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {contract.department} - {contract.state}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span>Pending: {contract.pendingQuantity.toLocaleString()} MT</span>
                          <span>Rate: ₹{contract.rate.toLocaleString()}/MT</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">Next Delivery</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(contract.nextDelivery), "dd/MM/yyyy")}
                        </div>
                        <Button size="sm" className="mt-2">
                          Schedule
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schemes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheme-wise Performance</CardTitle>
              <CardDescription>Analysis by government schemes</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Scheme</TableHead>
                    <TableHead>Active Contracts</TableHead>
                    <TableHead>Total Quantity</TableHead>
                    <TableHead>Contract Value</TableHead>
                    <TableHead>Avg Rate</TableHead>
                    <TableHead>Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schemeWiseData.map((scheme, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{scheme.scheme}</TableCell>
                      <TableCell>{scheme.contracts}</TableCell>
                      <TableCell>{scheme.quantity.toLocaleString()} MT</TableCell>
                      <TableCell>₹{(scheme.value / 10000000).toFixed(1)}Cr</TableCell>
                      <TableCell>₹{Math.round(scheme.value / scheme.quantity).toLocaleString()}/MT</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-600 h-2 rounded-full" style={{ width: "75%" }} />
                          </div>
                          <span className="text-sm">75%</span>
                        </div>
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
              <CardTitle>Monthly Delivery Trends</CardTitle>
              <CardDescription>Scheme-wise delivery performance</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  pds: { label: "PDS", color: "hsl(var(--chart-1))" },
                  mdm: { label: "Mid Day Meal", color: "hsl(var(--chart-2))" },
                  defence: { label: "Defence", color: "hsl(var(--chart-3))" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyDeliveries}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="pds" fill="var(--color-pds)" />
                    <Bar dataKey="mdm" fill="var(--color-mdm)" />
                    <Bar dataKey="defence" fill="var(--color-defence)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing States</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Punjab</span>
                    <span className="font-medium">₹160Cr</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Haryana</span>
                    <span className="font-medium">₹77.5Cr</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delhi</span>
                    <span className="font-medium">₹67.5Cr</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Received</span>
                    <span className="font-medium text-green-600">₹79.9Cr</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending</span>
                    <span className="font-medium text-orange-600">₹225.2Cr</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Collection Rate</span>
                    <span className="font-medium">26%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delivery Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>On-time Delivery</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quality Compliance</span>
                    <span className="font-medium">98%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Customer Satisfaction</span>
                    <span className="font-medium">4.8/5</span>
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

function ContractDetailsModal({ contract }: { contract: any }) {
  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="details">Contract Details</TabsTrigger>
        <TabsTrigger value="delivery">Delivery Schedule</TabsTrigger>
        <TabsTrigger value="payments">Payments</TabsTrigger>
        <TabsTrigger value="compliance">Compliance</TabsTrigger>
      </TabsList>

      <TabsContent value="details" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Contract Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Contract Number:</span>
                <span className="font-medium">{contract.contractNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Scheme:</span>
                <span className="font-medium">{contract.scheme}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Department:</span>
                <span className="font-medium">{contract.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">State:</span>
                <span className="font-medium">{contract.state}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Contract Date:</span>
                <span className="font-medium">{format(new Date(contract.contractDate), "dd/MM/yyyy")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Period:</span>
                <span className="font-medium">{contract.deliveryPeriod}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Contact Person:</span>
                <span className="font-medium">{contract.contactPerson}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone:</span>
                <span className="font-medium flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {contract.phone}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  {contract.email}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Product Specifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Rice Variety:</span>
              <span className="font-medium">{contract.riceVariety}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Grade:</span>
              <span className="font-medium">{contract.grade}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Specifications:</span>
              <span className="font-medium">{contract.specifications}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Rate:</span>
              <span className="font-medium">₹{contract.rate.toLocaleString()}/MT</span>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="delivery" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Delivery Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold">{contract.totalQuantity.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Quantity (MT)</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">{contract.deliveredQuantity.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Delivered (MT)</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{contract.pendingQuantity.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Pending (MT)</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Delivery Progress</span>
                <span>{Math.round((contract.deliveredQuantity / contract.totalQuantity) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${(contract.deliveredQuantity / contract.totalQuantity) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Next Delivery:</span>
              <span className="font-medium">{format(new Date(contract.nextDelivery), "dd/MM/yyyy")}</span>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="payments" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold">₹{(contract.totalValue / 10000000).toFixed(1)}Cr</div>
                <div className="text-sm text-muted-foreground">Total Value</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  ₹{(contract.paidAmount / 10000000).toFixed(1)}Cr
                </div>
                <div className="text-sm text-muted-foreground">Paid Amount</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  ₹{(contract.pendingAmount / 10000000).toFixed(1)}Cr
                </div>
                <div className="text-sm text-muted-foreground">Pending Amount</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Payment Progress</span>
                <span>{Math.round((contract.paidAmount / contract.totalValue) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(contract.paidAmount / contract.totalValue) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="compliance" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Compliance Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Quality Standards</span>
                <Badge className="bg-green-100 text-green-800">Compliant</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Delivery Timeline</span>
                <Badge className="bg-green-100 text-green-800">On Track</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Documentation</span>
                <Badge className="bg-green-100 text-green-800">Complete</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Packaging Standards</span>
                <Badge className="bg-green-100 text-green-800">Compliant</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
