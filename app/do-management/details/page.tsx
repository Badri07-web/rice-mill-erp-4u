"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  QrCode,
  MapPin,
  Phone,
  Truck,
  Route,
  Camera,
  FileText,
  Download,
  Upload,
  Navigation,
  Clock,
  CheckCircle,
  Eye,
} from "lucide-react"
import { format } from "date-fns"

const doData = {
  doNumber: "DO-2024-089",
  qrCode: "QR-DO-2024-089",
  issueDate: "2024-03-15",
  validityDate: "2024-03-20",
  pickupLocation: "Punjab Mandi #1",
  gpsCoordinates: "30.7333, 76.7794",
  contactPerson: "Harpreet Singh",
  contactPhone: "+91-98765-43210",
  paddyVariety: "Basmati 1121",
  paddyGrade: "A+",
  moistureContent: "12.5%",
  allocatedQuantity: 250,
  collectedQuantity: 180,
  status: "In Transit",
  truck: {
    number: "PB-01-AB-1234",
    driver: "Rajesh Kumar",
    driverPhone: "+91-98765-43220",
    capacity: "10 MT",
    currentLocation: "En route to mill",
    estimatedArrival: "2024-03-16 14:30",
  },
  route: {
    distance: "245 km",
    estimatedTime: "4.5 hours",
    fuelEstimate: "35 liters",
    tollCharges: "₹450",
  },
}

const trackingData = [
  {
    time: "08:00",
    location: "Punjab Mandi #1",
    status: "Loading Started",
    description: "Truck arrived at pickup location",
    completed: true,
  },
  {
    time: "10:30",
    location: "Punjab Mandi #1",
    status: "Quality Check",
    description: "Paddy quality verification completed",
    completed: true,
  },
  {
    time: "11:45",
    location: "Punjab Mandi #1",
    status: "Loading Completed",
    description: "180 MT loaded, departure initiated",
    completed: true,
  },
  {
    time: "12:15",
    location: "Highway NH-1",
    status: "In Transit",
    description: "En route to rice mill facility",
    completed: false,
  },
  {
    time: "14:30",
    location: "Rice Mill",
    status: "Arrival Expected",
    description: "Estimated arrival at destination",
    completed: false,
  },
]

const documentsData = [
  {
    type: "Collection Receipt",
    status: "Uploaded",
    uploadDate: "2024-03-15 11:50",
    size: "2.4 MB",
    format: "PDF",
  },
  {
    type: "Quality Test Report",
    status: "Uploaded",
    uploadDate: "2024-03-15 10:35",
    size: "1.8 MB",
    format: "PDF",
  },
  {
    type: "Weight Verification",
    status: "Uploaded",
    uploadDate: "2024-03-15 11:45",
    size: "3.2 MB",
    format: "PDF",
  },
  {
    type: "Photo Evidence",
    status: "Uploaded",
    uploadDate: null,
    size: null,
    format: "ZIP",
  },
  {
    type: "Delivery Challan",
    status: "Pending",
    uploadDate: null,
    size: null,
    format: "PDF",
  },
]

export default function DODetailsPage() {
  const [uploadingDoc, setUploadingDoc] = useState<string | null>(null)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Transit":
        return <Badge className="bg-blue-100 text-blue-800">In Transit</Badge>
      case "Completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleDocumentUpload = (docType: string) => {
    setUploadingDoc(docType)
    // Simulate upload
    setTimeout(() => {
      setUploadingDoc(null)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">DO Details</h1>
          <p className="text-muted-foreground">Complete information for {doData.doNumber}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download DO
          </Button>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Print Receipt
          </Button>
          <Button>
            <Navigation className="h-4 w-4 mr-2" />
            Track Live
          </Button>
        </div>
      </div>

      {/* DO Information Card */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <QrCode className="h-6 w-6" />
                {doData.doNumber}
              </CardTitle>
              <CardDescription className="text-lg">{doData.qrCode}</CardDescription>
            </div>
            <div className="text-right">
              {getStatusBadge(doData.status)}
              <p className="text-sm text-muted-foreground mt-1">
                Valid until {format(new Date(doData.validityDate), "dd/MM/yyyy")}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Issue Date</p>
              <p className="text-lg font-semibold">{format(new Date(doData.issueDate), "dd/MM/yyyy")}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Allocated Quantity</p>
              <p className="text-lg font-semibold">{doData.allocatedQuantity} MT</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Collected Quantity</p>
              <p className="text-lg font-semibold text-green-600">{doData.collectedQuantity} MT</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Completion</p>
              <p className="text-lg font-semibold">
                {Math.round((doData.collectedQuantity / doData.allocatedQuantity) * 100)}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="info" className="space-y-4">
        <TabsList>
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
                  <MapPin className="h-5 w-5" />
                  Pickup Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-medium">{doData.pickupLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GPS Coordinates:</span>
                  <span className="font-medium">{doData.gpsCoordinates}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Contact Person:</span>
                  <span className="font-medium">{doData.contactPerson}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="font-medium flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {doData.contactPhone}
                  </span>
                </div>
                <Button className="w-full" variant="outline">
                  <MapPin className="h-4 w-4 mr-2" />
                  View on Map
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Paddy Specifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Variety:</span>
                  <span className="font-medium">{doData.paddyVariety}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Grade:</span>
                  <Badge variant="outline">{doData.paddyGrade}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Moisture Content:</span>
                  <span className="font-medium">{doData.moistureContent}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Allocated:</span>
                  <span className="font-medium">{doData.allocatedQuantity} MT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Collected:</span>
                  <span className="font-medium text-green-600">{doData.collectedQuantity} MT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Remaining:</span>
                  <span className="font-medium text-orange-600">
                    {doData.allocatedQuantity - doData.collectedQuantity} MT
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Collection Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Collection Progress</span>
                    <span>{Math.round((doData.collectedQuantity / doData.allocatedQuantity) * 100)}%</span>
                  </div>
                  <Progress value={(doData.collectedQuantity / doData.allocatedQuantity) * 100} className="h-3" />
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{doData.allocatedQuantity}</div>
                    <div className="text-sm text-muted-foreground">Allocated MT</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{doData.collectedQuantity}</div>
                    <div className="text-sm text-muted-foreground">Collected MT</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">
                      {doData.allocatedQuantity - doData.collectedQuantity}
                    </div>
                    <div className="text-sm text-muted-foreground">Remaining MT</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracking" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Transportation Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Truck Number:</span>
                  <span className="font-medium">{doData.truck.number}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Driver:</span>
                  <span className="font-medium">{doData.truck.driver}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Driver Phone:</span>
                  <span className="font-medium flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {doData.truck.driverPhone}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Capacity:</span>
                  <span className="font-medium">{doData.truck.capacity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current Location:</span>
                  <span className="font-medium">{doData.truck.currentLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ETA:</span>
                  <span className="font-medium">{doData.truck.estimatedArrival}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Route className="h-5 w-5" />
                  Route Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Distance:</span>
                  <span className="font-medium">{doData.route.distance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Time:</span>
                  <span className="font-medium">{doData.route.estimatedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fuel Estimate:</span>
                  <span className="font-medium">{doData.route.fuelEstimate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Toll Charges:</span>
                  <span className="font-medium">{doData.route.tollCharges}</span>
                </div>
                <Button className="w-full" variant="outline">
                  <Navigation className="h-4 w-4 mr-2" />
                  Live GPS Tracking
                </Button>
                <Button className="w-full" variant="outline">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Driver
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Real-time Tracking</CardTitle>
              <CardDescription>Live updates on collection and transportation progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trackingData.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div
                      className={`w-3 h-3 rounded-full mt-2 ${item.completed ? "bg-green-500" : "bg-gray-300"}`}
                    ></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{item.status}</h4>
                        <span className="text-sm text-muted-foreground">{item.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.location}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Document Management
              </CardTitle>
              <CardDescription>Upload and manage all required documents for this DO</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {documentsData.map((doc, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{doc.type}</h4>
                      <Badge variant={doc.status === "Uploaded" ? "default" : "secondary"}>{doc.status}</Badge>
                    </div>

                    {doc.status === "Uploaded" ? (
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>Uploaded: {doc.uploadDate}</p>
                        <p>
                          Size: {doc.size} | Format: {doc.format}
                        </p>
                        <div className="flex gap-2 mt-3">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">Required format: {doc.format}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => handleDocumentUpload(doc.type)}
                          disabled={uploadingDoc === doc.type}
                        >
                          {uploadingDoc === doc.type ? (
                            <>
                              <Clock className="h-4 w-4 mr-2 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Document
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Photo Evidence</CardTitle>
              <CardDescription>Visual documentation of collection process</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="border rounded-lg p-4 text-center">
                  <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium">Loading Photos</p>
                  <p className="text-xs text-muted-foreground">5 photos uploaded</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    View Gallery
                  </Button>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium">Quality Check</p>
                  <p className="text-xs text-muted-foreground">3 photos uploaded</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    View Gallery
                  </Button>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium">Weighment</p>
                  <p className="text-xs text-muted-foreground">2 photos uploaded</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    View Gallery
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
              <CardDescription>Complete timeline of events for this delivery order</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-medium">DO Created</h4>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(doData.issueDate), "dd/MM/yyyy HH:mm")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Delivery order issued for {doData.allocatedQuantity} MT
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-medium">Truck Assigned</h4>
                    <p className="text-sm text-muted-foreground">15/03/2024 07:30</p>
                    <p className="text-sm text-muted-foreground">
                      {doData.truck.number} assigned with driver {doData.truck.driver}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-medium">Arrived at Pickup</h4>
                    <p className="text-sm text-muted-foreground">15/03/2024 08:00</p>
                    <p className="text-sm text-muted-foreground">Truck reached {doData.pickupLocation}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-medium">Quality Verification</h4>
                    <p className="text-sm text-muted-foreground">15/03/2024 10:30</p>
                    <p className="text-sm text-muted-foreground">
                      Paddy quality checked - Grade {doData.paddyGrade}, Moisture {doData.moistureContent}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-medium">Loading Completed</h4>
                    <p className="text-sm text-muted-foreground">15/03/2024 11:45</p>
                    <p className="text-sm text-muted-foreground">{doData.collectedQuantity} MT loaded successfully</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-blue-500 mt-1" />
                  <div>
                    <h4 className="font-medium">In Transit</h4>
                    <p className="text-sm text-muted-foreground">15/03/2024 12:15 - Present</p>
                    <p className="text-sm text-muted-foreground">En route to rice mill facility</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-5 h-5 border-2 border-gray-300 rounded-full mt-1"></div>
                  <div>
                    <h4 className="font-medium text-muted-foreground">Expected Arrival</h4>
                    <p className="text-sm text-muted-foreground">15/03/2024 14:30</p>
                    <p className="text-sm text-muted-foreground">Estimated arrival at rice mill</p>
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
