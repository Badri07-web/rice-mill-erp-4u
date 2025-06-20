"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MapPin, Calendar, FileText, Download, Eye, CheckCircle, Clock, Phone } from "lucide-react"
import { format } from "date-fns"

const agreementData = {
  id: "AGR-2024-001",
  status: "Active",
  date: "2024-01-15",
  supplier: "Punjab State Procurement Agency",
  mspRate: 2100,
  validity: "2024-12-31",
  govRefNumber: "GOV-PB-2024-001",
  totalQuantity: 5000,
  collectedQuantity: 3400,
  completionPercentage: 68,
  complianceStatus: "Compliant",
  location: "Punjab",
  paddyType: "Basmati 1121",
  terms: "Standard government procurement terms with quality specifications",
}

const doBreakdownData = [
  {
    doNumber: "DO-2024-001",
    date: "2024-01-20",
    pickupLocation: "Amritsar Mandi #1",
    coordinates: "31.6340, 74.8723",
    variety: "Basmati 1121",
    allocated: 200,
    collected: 200,
    deadline: "2024-01-25",
    status: "Completed",
    truck: "PB-01-AB-1234",
    driver: "Rajesh Kumar",
    contact: "+91-98765-43210",
  },
  {
    doNumber: "DO-2024-002",
    date: "2024-01-22",
    pickupLocation: "Ludhiana Mandi #2",
    coordinates: "30.9010, 75.8573",
    variety: "Basmati 1121",
    allocated: 250,
    collected: 250,
    deadline: "2024-01-27",
    status: "Completed",
    truck: "PB-02-CD-5678",
    driver: "Suresh Singh",
    contact: "+91-98765-43211",
  },
  {
    doNumber: "DO-2024-003",
    date: "2024-01-25",
    pickupLocation: "Jalandhar Mandi #1",
    coordinates: "31.3260, 75.5762",
    variety: "Basmati 1121",
    allocated: 180,
    collected: 180,
    deadline: "2024-01-30",
    status: "Completed",
    truck: "PB-03-EF-9012",
    driver: "Mohan Lal",
    contact: "+91-98765-43212",
  },
  {
    doNumber: "DO-2024-004",
    date: "2024-02-01",
    pickupLocation: "Patiala Mandi #3",
    coordinates: "30.3398, 76.3869",
    variety: "Basmati 1121",
    allocated: 220,
    collected: 150,
    deadline: "2024-02-06",
    status: "Partial",
    truck: "PB-04-GH-3456",
    driver: "Vikram Singh",
    contact: "+91-98765-43213",
  },
  {
    doNumber: "DO-2024-005",
    date: "2024-02-05",
    pickupLocation: "Bathinda Mandi #2",
    coordinates: "30.2110, 74.9455",
    variety: "Basmati 1121",
    allocated: 200,
    collected: 0,
    deadline: "2024-02-10",
    status: "Pending",
    truck: null,
    driver: null,
    contact: "+91-98765-43214",
  },
]

const timelineData = [
  {
    date: "2024-01-15",
    event: "Agreement Created",
    description: "Initial agreement signed with Punjab State Procurement Agency",
    status: "completed",
  },
  {
    date: "2024-01-18",
    event: "Portal Sync",
    description: "Agreement synchronized with government procurement portal",
    status: "completed",
  },
  {
    date: "2024-01-20",
    event: "First DO Issued",
    description: "DO-2024-001 issued for Amritsar Mandi #1",
    status: "completed",
  },
  {
    date: "2024-02-01",
    event: "Mid-term Review",
    description: "68% completion achieved, on track for target",
    status: "completed",
  },
  {
    date: "2024-02-15",
    event: "Quality Audit",
    description: "Scheduled quality compliance audit",
    status: "upcoming",
  },
]

export default function AgreementDetailsPage() {
  const [selectedDO, setSelectedDO] = useState<any>(null)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "Partial":
        return <Badge className="bg-orange-100 text-orange-800">Partial</Badge>
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "In Transit":
        return <Badge className="bg-blue-100 text-blue-800">In Transit</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getComplianceColor = (status: string) => {
    return status === "Compliant" ? "text-green-600" : "text-red-600"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agreement Details</h1>
          <p className="text-muted-foreground">Complete information for {agreementData.id}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download Agreement
          </Button>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button>
            <CheckCircle className="h-4 w-4 mr-2" />
            Sync Portal
          </Button>
        </div>
      </div>

      {/* Agreement Header Card */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{agreementData.id}</CardTitle>
              <CardDescription className="text-lg">{agreementData.supplier}</CardDescription>
            </div>
            <div className="text-right">
              <Badge className="bg-green-100 text-green-800 text-lg px-3 py-1">{agreementData.status}</Badge>
              <p className="text-sm text-muted-foreground mt-1">
                Valid until {format(new Date(agreementData.validity), "dd/MM/yyyy")}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Agreement Date</p>
              <p className="text-lg font-semibold">{format(new Date(agreementData.date), "dd/MM/yyyy")}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">MSP Rate</p>
              <p className="text-lg font-semibold">₹{agreementData.mspRate}/Quintal</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Quantity</p>
              <p className="text-lg font-semibold">{agreementData.totalQuantity.toLocaleString()} MT</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Completion</p>
              <p className="text-lg font-semibold">{agreementData.completionPercentage}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="dos">DO Breakdown</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Agreement Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Government Reference:</span>
                  <span className="font-medium">{agreementData.govRefNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-medium">{agreementData.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Paddy Type:</span>
                  <span className="font-medium">{agreementData.paddyType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Compliance Status:</span>
                  <span className={`font-medium ${getComplianceColor(agreementData.complianceStatus)}`}>
                    {agreementData.complianceStatus}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Terms & Conditions:</span>
                  <p className="text-sm mt-1">{agreementData.terms}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Progress Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Completion</span>
                    <span>{agreementData.completionPercentage}%</span>
                  </div>
                  <Progress value={agreementData.completionPercentage} className="h-3" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Total Quantity:</span>
                    <div className="font-medium text-lg">{agreementData.totalQuantity.toLocaleString()} MT</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Collected:</span>
                    <div className="font-medium text-lg text-green-600">
                      {agreementData.collectedQuantity.toLocaleString()} MT
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Remaining:</span>
                    <div className="font-medium text-lg text-orange-600">
                      {(agreementData.totalQuantity - agreementData.collectedQuantity).toLocaleString()} MT
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total DOs:</span>
                    <div className="font-medium text-lg">{doBreakdownData.length}</div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Key Metrics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Average Collection per DO:</span>
                      <span className="font-medium">
                        {Math.round(agreementData.collectedQuantity / doBreakdownData.length)} MT
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Collection Efficiency:</span>
                      <span className="font-medium text-green-600">94.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Days Remaining:</span>
                      <span className="font-medium">
                        {Math.ceil(
                          (new Date(agreementData.validity).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                        )}{" "}
                        days
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="dos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>DO Breakdown</CardTitle>
              <CardDescription>Detailed breakdown of all delivery orders under this agreement</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>DO Number</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Pickup Location</TableHead>
                    <TableHead>Variety</TableHead>
                    <TableHead>Allocated (MT)</TableHead>
                    <TableHead>Collected (MT)</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Truck</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {doBreakdownData.map((doItem) => (
                    <TableRow key={doItem.doNumber}>
                      <TableCell className="font-medium">{doItem.doNumber}</TableCell>
                      <TableCell>{format(new Date(doItem.date), "dd/MM/yyyy")}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          {doItem.pickupLocation}
                        </div>
                      </TableCell>
                      <TableCell>{doItem.variety}</TableCell>
                      <TableCell>{doItem.allocated}</TableCell>
                      <TableCell>
                        <span className={doItem.collected === doItem.allocated ? "text-green-600" : "text-orange-600"}>
                          {doItem.collected}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {format(new Date(doItem.deadline), "dd/MM/yyyy")}
                        </div>
                      </TableCell>
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
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedDO(doItem)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>DO Details - {doItem.doNumber}</DialogTitle>
                              <DialogDescription>Complete information for delivery order</DialogDescription>
                            </DialogHeader>
                            {selectedDO && <DODetailsModal doItem={selectedDO} />}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Compliance Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium text-green-800">Quality Standards</p>
                    <p className="text-sm text-green-600">All batches meet MSP quality requirements</p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium text-green-800">Documentation</p>
                    <p className="text-sm text-green-600">All required documents submitted</p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium text-green-800">Payment Terms</p>
                    <p className="text-sm text-green-600">Payments processed within agreed timeline</p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>

                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="font-medium text-yellow-800">Collection Timeline</p>
                    <p className="text-sm text-yellow-600">2 DOs pending within deadline</p>
                  </div>
                  <Clock className="h-5 w-5 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Audit Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Last Audit Date</p>
                  <p className="text-lg font-semibold">15/01/2024</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Audit Score</p>
                  <p className="text-lg font-semibold text-green-600">98.5/100</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Next Audit</p>
                  <p className="text-lg font-semibold">15/02/2024</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Compliance Officer</p>
                  <p className="text-lg font-semibold">Rajesh Sharma</p>
                </div>
                <Button className="w-full" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  View Audit Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Agreement Timeline</CardTitle>
              <CardDescription>Key milestones and events for this agreement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {timelineData.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div
                      className={`w-3 h-3 rounded-full mt-2 ${
                        item.status === "completed" ? "bg-green-500" : "bg-gray-300"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{item.event}</h4>
                        <span className="text-sm text-muted-foreground">
                          {format(new Date(item.date), "dd/MM/yyyy")}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function DODetailsModal({ doItem }: { doItem: any }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">DO Number:</span>
            <span className="font-medium">{doItem.doNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Issue Date:</span>
            <span className="font-medium">{format(new Date(doItem.date), "dd/MM/yyyy")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Deadline:</span>
            <span className="font-medium">{format(new Date(doItem.deadline), "dd/MM/yyyy")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Location:</span>
            <span className="font-medium">{doItem.pickupLocation}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">GPS:</span>
            <span className="font-medium">{doItem.coordinates}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Variety:</span>
            <span className="font-medium">{doItem.variety}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Allocated:</span>
            <span className="font-medium">{doItem.allocated} MT</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Collected:</span>
            <span className="font-medium">{doItem.collected} MT</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Status:</span>
            {getStatusBadge(doItem.status)}
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Contact:</span>
            <span className="font-medium flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {doItem.contact}
            </span>
          </div>
        </div>
      </div>

      {doItem.truck && (
        <div className="border-t pt-4">
          <h4 className="font-medium mb-3">Transportation Details</h4>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Truck:</span>
              <span className="font-medium">{doItem.truck}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Driver:</span>
              <span className="font-medium">{doItem.driver}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function getStatusBadge(status: string) {
  switch (status) {
    case "Completed":
      return <Badge className="bg-green-100 text-green-800">Completed</Badge>
    case "Partial":
      return <Badge className="bg-orange-100 text-orange-800">Partial</Badge>
    case "Pending":
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
    case "In Transit":
      return <Badge className="bg-blue-100 text-blue-800">In Transit</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}
