"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Download,
  PrinterIcon as Print,
  Truck,
  MapPin,
  Calendar,
  Eye,
  QrCode,
  Phone,
  FileText,
  Camera,
  Route,
} from "lucide-react"
import { format } from "date-fns"

const doData = [
  {
    id: "DO-2024-001",
    date: "2024-03-15",
    location: "Punjab Mandi #1",
    paddyType: "Basmati 1121",
    grade: "A",
    allocated: 200,
    collected: 180,
    status: "In Transit",
    truck: "PB-01-AB-1234",
    driver: "Rajesh Kumar",
    deadline: "2024-03-20",
    contact: "+91-98765-43210",
    gps: "30.7333, 76.7794",
  },
  {
    id: "DO-2024-002",
    date: "2024-03-16",
    location: "Haryana Mandi #2",
    paddyType: "PR-106",
    grade: "B+",
    allocated: 150,
    collected: 150,
    status: "Completed",
    truck: "HR-02-CD-5678",
    driver: "Suresh Singh",
    deadline: "2024-03-21",
    contact: "+91-98765-43211",
    gps: "29.0588, 76.0856",
  },
  {
    id: "DO-2024-003",
    date: "2024-03-17",
    location: "UP Mandi #3",
    paddyType: "Basmati 1509",
    grade: "A+",
    allocated: 250,
    collected: 0,
    status: "Pending",
    truck: null,
    driver: null,
    deadline: "2024-03-22",
    contact: "+91-98765-43212",
    gps: "26.8467, 80.9462",
  },
  {
    id: "DO-2024-004",
    date: "2024-03-18",
    location: "Rajasthan Mandi #1",
    paddyType: "PR-114",
    grade: "B",
    allocated: 180,
    collected: 90,
    status: "Partial",
    truck: "RJ-03-EF-9012",
    driver: "Mohan Lal",
    deadline: "2024-03-23",
    contact: "+91-98765-43213",
    gps: "27.0238, 74.2179",
  },
]

export default function DOManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [selectedDOs, setSelectedDOs] = useState<string[]>([])

  const filteredDOs = doData.filter((doItem) => {
    const matchesSearch =
      doItem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doItem.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doItem.paddyType.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || doItem.status.toLowerCase() === statusFilter
    const matchesLocation = locationFilter === "all" || doItem.location.toLowerCase().includes(locationFilter)

    return matchesSearch && matchesStatus && matchesLocation
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "In Transit":
        return <Badge className="bg-blue-100 text-blue-800">In Transit</Badge>
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "Partial":
        return <Badge className="bg-orange-100 text-orange-800">Partial</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedDOs(filteredDOs.map((doItem) => doItem.id))
    } else {
      setSelectedDOs([])
    }
  }

  const handleSelectDO = (doId: string, checked: boolean) => {
    if (checked) {
      setSelectedDOs([...selectedDOs, doId])
    } else {
      setSelectedDOs(selectedDOs.filter((id) => id !== doId))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">DO Registry</h1>
          <p className="text-muted-foreground">Manage delivery orders and paddy collection</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Route className="h-4 w-4 mr-2" />
            Generate Routes
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Create DO
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total DOs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{doData.length}</div>
            <p className="text-xs text-muted-foreground">
              {doData.filter((d) => d.status === "Pending").length} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Allocated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{doData.reduce((sum, d) => sum + d.allocated, 0)} MT</div>
            <p className="text-xs text-muted-foreground">Across all DOs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Collected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{doData.reduce((sum, d) => sum + d.collected, 0)} MT</div>
            <p className="text-xs text-muted-foreground">
              {Math.round(
                (doData.reduce((sum, d) => sum + d.collected, 0) / doData.reduce((sum, d) => sum + d.allocated, 0)) *
                  100,
              )}
              % completion
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Trucks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{doData.filter((d) => d.truck && d.status !== "Completed").length}</div>
            <p className="text-xs text-muted-foreground">Currently assigned</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by DO ID, location, or paddy type..."
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
                <SelectItem value="in transit">In Transit</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="punjab">Punjab</SelectItem>
                <SelectItem value="haryana">Haryana</SelectItem>
                <SelectItem value="up">UP</SelectItem>
                <SelectItem value="rajasthan">Rajasthan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedDOs.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">{selectedDOs.length} DO(s) selected</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Truck className="h-4 w-4 mr-2" />
                  Assign Truck
                </Button>
                <Button variant="outline" size="sm">
                  <Route className="h-4 w-4 mr-2" />
                  Create Route
                </Button>
                <Button variant="outline" size="sm">
                  <Print className="h-4 w-4 mr-2" />
                  Print Selected
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* DO Table */}
      <Card>
        <CardHeader>
          <CardTitle>Delivery Orders</CardTitle>
          <CardDescription>
            {filteredDOs.length} of {doData.length} DOs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox checked={selectedDOs.length === filteredDOs.length} onCheckedChange={handleSelectAll} />
                </TableHead>
                <TableHead>DO Number</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Paddy Type</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Allocated</TableHead>
                <TableHead>Collected</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Truck</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDOs.map((doItem) => (
                <TableRow key={doItem.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedDOs.includes(doItem.id)}
                      onCheckedChange={(checked) => handleSelectDO(doItem.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{doItem.id}</TableCell>
                  <TableCell>{format(new Date(doItem.date), "dd/MM/yyyy")}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      {doItem.location}
                    </div>
                  </TableCell>
                  <TableCell>{doItem.paddyType}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{doItem.grade}</Badge>
                  </TableCell>
                  <TableCell>{doItem.allocated} MT</TableCell>
                  <TableCell>{doItem.collected} MT</TableCell>
                  <TableCell>{getStatusBadge(doItem.status)}</TableCell>
                  <TableCell>
                    {doItem.truck ? (
                      <div className="text-sm">
                        <div className="font-medium">{doItem.truck}</div>
                        <div className="text-muted-foreground">{doItem.driver}</div>
                      </div>
                    ) : (
                      <Badge variant="outline">Unassigned</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      {format(new Date(doItem.deadline), "dd/MM/yyyy")}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>DO Details - {doItem.id}</DialogTitle>
                          <DialogDescription>Complete information and tracking for delivery order</DialogDescription>
                        </DialogHeader>
                        <DODetailsModal doItem={doItem} />
                      </DialogContent>
                    </Dialog>
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

function DODetailsModal({ doItem }: { doItem: any }) {
  return (
    <Tabs defaultValue="info" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="info">Information</TabsTrigger>
        <TabsTrigger value="tracking">Tracking</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="timeline">Timeline</TabsTrigger>
      </TabsList>

      <TabsContent value="info" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                DO Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">DO Number:</span>
                <span className="font-medium">{doItem.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Issue Date:</span>
                <span className="font-medium">{format(new Date(doItem.date), "dd/MM/yyyy")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Validity:</span>
                <span className="font-medium">{format(new Date(doItem.deadline), "dd/MM/yyyy")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location:</span>
                <span className="font-medium">{doItem.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">GPS Coordinates:</span>
                <span className="font-medium">{doItem.gps}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Contact:</span>
                <span className="font-medium flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {doItem.contact}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Paddy Specifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Variety:</span>
                <span className="font-medium">{doItem.paddyType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Grade:</span>
                <Badge variant="outline">{doItem.grade}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Allocated Quantity:</span>
                <span className="font-medium">{doItem.allocated} MT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Collected Quantity:</span>
                <span className="font-medium">{doItem.collected} MT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Remaining:</span>
                <span className="font-medium">{doItem.allocated - doItem.collected} MT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                {getStatusBadge(doItem.status)}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="tracking" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Transportation Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {doItem.truck ? (
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Truck Number:</span>
                    <span className="font-medium">{doItem.truck}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Driver:</span>
                    <span className="font-medium">{doItem.driver}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current Status:</span>
                    {getStatusBadge(doItem.status)}
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Route:</span>
                    <span className="font-medium">Mill → {doItem.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Distance:</span>
                    <span className="font-medium">245 km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ETA:</span>
                    <span className="font-medium">4.5 hours</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Truck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No truck assigned yet</p>
                <Button className="mt-4">Assign Truck</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="documents" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Documentation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Collection Receipt</h4>
                <p className="text-sm text-muted-foreground mb-3">Weight verification and quality check receipt</p>
                <Button variant="outline" size="sm">
                  <Camera className="h-4 w-4 mr-2" />
                  Upload Receipt
                </Button>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Quality Test Report</h4>
                <p className="text-sm text-muted-foreground mb-3">Moisture, purity, and grade verification</p>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  View Report
                </Button>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Weight Documents</h4>
                <p className="text-sm text-muted-foreground mb-3">Weighbridge slips and certificates</p>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Photo Evidence</h4>
                <p className="text-sm text-muted-foreground mb-3">Collection and loading photographs</p>
                <Button variant="outline" size="sm">
                  <Camera className="h-4 w-4 mr-2" />
                  View Photos
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="timeline" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Collection Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">DO Created</p>
                  <p className="text-sm text-muted-foreground">{format(new Date(doItem.date), "dd/MM/yyyy HH:mm")}</p>
                </div>
              </div>

              {doItem.truck && (
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Truck Assigned</p>
                    <p className="text-sm text-muted-foreground">
                      {doItem.truck} - {doItem.driver}
                    </p>
                  </div>
                </div>
              )}

              {doItem.status === "In Transit" && (
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Collection Started</p>
                    <p className="text-sm text-muted-foreground">Truck dispatched to collection point</p>
                  </div>
                </div>
              )}

              {doItem.status === "Completed" && (
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Collection Completed</p>
                    <p className="text-sm text-muted-foreground">{doItem.collected} MT collected successfully</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

function getStatusBadge(status: string) {
  switch (status) {
    case "Completed":
      return <Badge className="bg-green-100 text-green-800">Completed</Badge>
    case "In Transit":
      return <Badge className="bg-blue-100 text-blue-800">In Transit</Badge>
    case "Pending":
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
    case "Partial":
      return <Badge className="bg-orange-100 text-orange-800">Partial</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}
