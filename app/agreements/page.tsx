"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CalendarIcon, Download, Eye, RefreshCw, Search, Plus } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

const agreementsData = [
  {
    id: "AGR-2024-001",
    date: "2024-01-15",
    quantity: 5000,
    doCount: 25,
    status: "Active",
    msp: 2100,
    validity: "2024-12-31",
    location: "Punjab",
    type: "Basmati",
    completion: 68,
  },
  {
    id: "AGR-2024-002",
    date: "2024-02-01",
    quantity: 3500,
    doCount: 18,
    status: "Completed",
    msp: 2050,
    validity: "2024-11-30",
    location: "Haryana",
    type: "Non-Basmati",
    completion: 100,
  },
  {
    id: "AGR-2024-003",
    date: "2024-02-15",
    quantity: 4200,
    doCount: 21,
    status: "Active",
    msp: 2100,
    validity: "2024-12-15",
    location: "UP",
    type: "Basmati",
    completion: 45,
  },
  {
    id: "AGR-2024-004",
    date: "2024-03-01",
    quantity: 2800,
    doCount: 14,
    status: "Expired",
    msp: 2000,
    validity: "2024-08-31",
    location: "Rajasthan",
    type: "Non-Basmati",
    completion: 85,
  },
]

export default function AgreementsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})

  const filteredAgreements = agreementsData.filter((agreement) => {
    const matchesSearch =
      agreement.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agreement.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || agreement.status.toLowerCase() === statusFilter
    const matchesType = typeFilter === "all" || agreement.type.toLowerCase() === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "Completed":
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>
      case "Expired":
        return <Badge className="bg-red-100 text-red-800">Expired</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Paddy Agreement Overview</h1>
          <p className="text-muted-foreground">Manage government paddy procurement agreements</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync Portal
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Agreement
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Agreements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">2 active, 1 completed, 1 expired</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Quantity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15,500 MT</div>
            <p className="text-xs text-muted-foreground">Across all agreements</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active DOs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78</div>
            <p className="text-xs text-muted-foreground">Delivery orders pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">74.5%</div>
            <p className="text-xs text-muted-foreground">Overall progress</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by ID or location..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="basmati">Basmati</SelectItem>
                <SelectItem value="non-basmati">Non-Basmati</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Date Range
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="range" selected={dateRange} onSelect={setDateRange} numberOfMonths={2} />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* Agreements Table */}
      <Card>
        <CardHeader>
          <CardTitle>Agreement List</CardTitle>
          <CardDescription>
            {filteredAgreements.length} of {agreementsData.length} agreements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agreement ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Quantity (MT)</TableHead>
                <TableHead>DOs</TableHead>
                <TableHead>MSP (₹/Qt)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Completion</TableHead>
                <TableHead>Validity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAgreements.map((agreement) => (
                <TableRow key={agreement.id}>
                  <TableCell className="font-medium">{agreement.id}</TableCell>
                  <TableCell>{format(new Date(agreement.date), "dd/MM/yyyy")}</TableCell>
                  <TableCell>{agreement.location}</TableCell>
                  <TableCell>{agreement.type}</TableCell>
                  <TableCell>{agreement.quantity.toLocaleString()}</TableCell>
                  <TableCell>{agreement.doCount}</TableCell>
                  <TableCell>₹{agreement.msp}</TableCell>
                  <TableCell>{getStatusBadge(agreement.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: `${agreement.completion}%` }} />
                      </div>
                      <span className="text-sm">{agreement.completion}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{format(new Date(agreement.validity), "dd/MM/yyyy")}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>Agreement Details - {agreement.id}</DialogTitle>
                            <DialogDescription>
                              Complete information about the paddy procurement agreement
                            </DialogDescription>
                          </DialogHeader>
                          <AgreementDetailsModal agreement={agreement} />
                        </DialogContent>
                      </Dialog>

                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function AgreementDetailsModal({ agreement }: { agreement: any }) {
  return (
    <div className="space-y-6">
      {/* Agreement Information */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Agreement Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Government Ref:</span>
              <span className="font-medium">GOV-{agreement.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Agreement Date:</span>
              <span className="font-medium">{format(new Date(agreement.date), "dd/MM/yyyy")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Validity:</span>
              <span className="font-medium">{format(new Date(agreement.validity), "dd/MM/yyyy")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Quantity:</span>
              <span className="font-medium">{agreement.quantity.toLocaleString()} MT</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">MSP Rate:</span>
              <span className="font-medium">₹{agreement.msp}/Quintal</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Location:</span>
              <span className="font-medium">{agreement.location}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Progress Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Overall Completion</span>
                <span>{agreement.completion}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: `${agreement.completion}%` }} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Total DOs:</span>
                <div className="font-medium">{agreement.doCount}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Completed:</span>
                <div className="font-medium">{Math.floor((agreement.doCount * agreement.completion) / 100)}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Collected:</span>
                <div className="font-medium">{Math.floor((agreement.quantity * agreement.completion) / 100)} MT</div>
              </div>
              <div>
                <span className="text-muted-foreground">Remaining:</span>
                <div className="font-medium">
                  {agreement.quantity - Math.floor((agreement.quantity * agreement.completion) / 100)} MT
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* DO Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>DO Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>DO Number</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Variety</TableHead>
                <TableHead>Allocated (MT)</TableHead>
                <TableHead>Collected (MT)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Deadline</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }, (_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    DO-{agreement.id.split("-")[2]}-{String(i + 1).padStart(3, "0")}
                  </TableCell>
                  <TableCell>{format(new Date(Date.now() + i * 86400000), "dd/MM/yyyy")}</TableCell>
                  <TableCell>
                    {agreement.location} Mandi {i + 1}
                  </TableCell>
                  <TableCell>{agreement.type}</TableCell>
                  <TableCell>{(agreement.quantity / agreement.doCount).toFixed(0)}</TableCell>
                  <TableCell>
                    {Math.floor((agreement.quantity / agreement.doCount) * (agreement.completion / 100))}
                  </TableCell>
                  <TableCell>
                    {i < 3 ? (
                      <Badge className="bg-green-100 text-green-800">Completed</Badge>
                    ) : (
                      <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                    )}
                  </TableCell>
                  <TableCell>{format(new Date(Date.now() + (i + 7) * 86400000), "dd/MM/yyyy")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
