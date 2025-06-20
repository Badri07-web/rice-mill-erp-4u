"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
import { Truck, Wrench, Calendar, MapPin, Phone, FileText, Plus, Search } from "lucide-react"
import { format } from "date-fns"

const fleetData = [
  {
    id: "VH-001",
    vehicleNumber: "PB-01-AB-1234",
    model: "Tata LPT 1613",
    year: 2020,
    capacity: "10 MT",
    registrationExpiry: "2025-03-15",
    insuranceExpiry: "2024-12-20",
    lastMaintenance: "2024-02-15",
    nextMaintenance: "2024-05-15",
    driver: "Rajesh Kumar",
    driverPhone: "+91-98765-43210",
    currentLocation: "Rice Mill",
    status: "Active",
    mileage: 85000,
    fuelEfficiency: 12.5,
    maintenanceCost: 45000,
    downtime: 5,
  },
  {
    id: "VH-002",
    vehicleNumber: "HR-02-CD-5678",
    model: "Ashok Leyland 1616",
    year: 2019,
    capacity: "12 MT",
    registrationExpiry: "2025-01-10",
    insuranceExpiry: "2024-11-15",
    lastMaintenance: "2024-03-01",
    nextMaintenance: "2024-06-01",
    driver: "Suresh Singh",
    driverPhone: "+91-98765-43211",
    currentLocation: "Punjab Mandi #1",
    status: "In Transit",
    mileage: 92000,
    fuelEfficiency: 11.8,
    maintenanceCost: 52000,
    downtime: 8,
  },
  {
    id: "VH-003",
    vehicleNumber: "UP-03-EF-9012",
    model: "Mahindra Blazo X",
    year: 2021,
    capacity: "15 MT",
    registrationExpiry: "2026-06-30",
    insuranceExpiry: "2025-02-28",
    lastMaintenance: "2024-01-20",
    nextMaintenance: "2024-04-20",
    driver: "Mohan Lal",
    driverPhone: "+91-98765-43212",
    currentLocation: "Workshop",
    status: "Maintenance",
    mileage: 65000,
    fuelEfficiency: 13.2,
    maintenanceCost: 38000,
    downtime: 12,
  },
  {
    id: "VH-004",
    vehicleNumber: "RJ-04-GH-3456",
    model: "Eicher Pro 1110XP",
    year: 2022,
    capacity: "8 MT",
    registrationExpiry: "2027-08-15",
    insuranceExpiry: "2025-05-10",
    lastMaintenance: "2024-02-28",
    nextMaintenance: "2024-05-28",
    driver: "Vikram Singh",
    driverPhone: "+91-98765-43213",
    currentLocation: "Haryana Mandi #2",
    status: "Active",
    mileage: 45000,
    fuelEfficiency: 14.1,
    maintenanceCost: 28000,
    downtime: 3,
  },
]

const maintenanceHistory = [
  {
    id: "MNT-001",
    vehicleNumber: "PB-01-AB-1234",
    date: "2024-02-15",
    type: "Scheduled",
    description: "Engine oil change, brake inspection",
    cost: 8500,
    workshop: "Authorized Service Center",
    downtime: 1,
    status: "Completed",
  },
  {
    id: "MNT-002",
    vehicleNumber: "HR-02-CD-5678",
    date: "2024-03-01",
    type: "Emergency",
    description: "Tire replacement, clutch repair",
    cost: 15200,
    workshop: "Highway Service Station",
    downtime: 2,
    status: "Completed",
  },
  {
    id: "MNT-003",
    vehicleNumber: "UP-03-EF-9012",
    date: "2024-03-18",
    type: "Scheduled",
    description: "Major service, transmission check",
    cost: 22000,
    workshop: "Authorized Service Center",
    downtime: 3,
    status: "In Progress",
  },
]

const driverData = [
  {
    id: "DRV-001",
    name: "Rajesh Kumar",
    phone: "+91-98765-43210",
    license: "DL-0120110012345",
    licenseExpiry: "2026-08-15",
    experience: 8,
    rating: 4.8,
    totalTrips: 245,
    assignedVehicle: "PB-01-AB-1234",
    status: "Active",
  },
  {
    id: "DRV-002",
    name: "Suresh Singh",
    phone: "+91-98765-43211",
    license: "DL-0620110054321",
    licenseExpiry: "2025-12-20",
    experience: 12,
    rating: 4.6,
    totalTrips: 389,
    assignedVehicle: "HR-02-CD-5678",
    status: "On Trip",
  },
  {
    id: "DRV-003",
    name: "Mohan Lal",
    phone: "+91-98765-43212",
    license: "DL-0920110098765",
    licenseExpiry: "2025-06-10",
    experience: 15,
    rating: 4.9,
    totalTrips: 456,
    assignedVehicle: "UP-03-EF-9012",
    status: "On Leave",
  },
]

export default function FleetManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "In Transit":
        return <Badge className="bg-blue-100 text-blue-800">In Transit</Badge>
      case "Maintenance":
        return <Badge className="bg-red-100 text-red-800">Maintenance</Badge>
      case "Idle":
        return <Badge className="bg-yellow-100 text-yellow-800">Idle</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredFleet = fleetData.filter((vehicle) => {
    const matchesSearch =
      vehicle.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || vehicle.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fleet Management</h1>
          <p className="text-muted-foreground">Manage vehicles, drivers, and maintenance schedules</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Maintenance
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Vehicle
          </Button>
        </div>
      </div>

      {/* Fleet Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fleetData.length}</div>
            <p className="text-xs text-muted-foreground">
              {fleetData.filter((v) => v.status === "Active").length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance Due</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Within 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Fuel Efficiency</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.9</div>
            <p className="text-xs text-muted-foreground">km/liter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Maintenance</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹1.6L</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="vehicles" className="space-y-4">
        <TabsList>
          <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="drivers">Drivers</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="vehicles" className="space-y-4">
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
                      placeholder="Search by vehicle number or driver..."
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
                    <SelectItem value="in transit">In Transit</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="idle">Idle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Vehicle Table */}
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Fleet</CardTitle>
              <CardDescription>Complete list of vehicles with details and status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Model & Year</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Current Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Mileage</TableHead>
                    <TableHead>Fuel Efficiency</TableHead>
                    <TableHead>Next Maintenance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFleet.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell className="font-medium">{vehicle.vehicleNumber}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{vehicle.model}</div>
                          <div className="text-sm text-muted-foreground">{vehicle.year}</div>
                        </div>
                      </TableCell>
                      <TableCell>{vehicle.capacity}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{vehicle.driver}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {vehicle.driverPhone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          {vehicle.currentLocation}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(vehicle.status)}</TableCell>
                      <TableCell>{vehicle.mileage.toLocaleString()} km</TableCell>
                      <TableCell>{vehicle.fuelEfficiency} km/L</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {format(new Date(vehicle.nextMaintenance), "dd/MM/yyyy")}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedVehicle(vehicle)}>
                              <FileText className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>Vehicle Details - {vehicle.vehicleNumber}</DialogTitle>
                              <DialogDescription>Complete vehicle information and history</DialogDescription>
                            </DialogHeader>
                            {selectedVehicle && <VehicleDetailsModal vehicle={selectedVehicle} />}
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

        <TabsContent value="maintenance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Scheduled:</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">In Progress:</span>
                  <span className="font-medium">1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Overdue:</span>
                  <span className="font-medium text-red-600">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">This Month Cost:</span>
                  <span className="font-medium">₹1,63,700</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Maintenance Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-orange-50 rounded">
                  <div>
                    <p className="font-medium text-orange-800">Service Due</p>
                    <p className="text-sm text-orange-600">PB-01-AB-1234</p>
                  </div>
                  <Badge variant="secondary">15 days</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                  <div>
                    <p className="font-medium text-red-800">Insurance Expiry</p>
                    <p className="text-sm text-red-600">HR-02-CD-5678</p>
                  </div>
                  <Badge variant="destructive">30 days</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg Downtime:</span>
                  <span className="font-medium">7 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cost per Vehicle:</span>
                  <span className="font-medium">₹40,925</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Preventive vs Emergency:</span>
                  <span className="font-medium">70:30</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Maintenance History</CardTitle>
              <CardDescription>Recent maintenance activities and costs</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Maintenance ID</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Workshop</TableHead>
                    <TableHead>Downtime</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {maintenanceHistory.map((maintenance) => (
                    <TableRow key={maintenance.id}>
                      <TableCell className="font-medium">{maintenance.id}</TableCell>
                      <TableCell>{maintenance.vehicleNumber}</TableCell>
                      <TableCell>{format(new Date(maintenance.date), "dd/MM/yyyy")}</TableCell>
                      <TableCell>
                        <Badge variant={maintenance.type === "Emergency" ? "destructive" : "default"}>
                          {maintenance.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{maintenance.description}</TableCell>
                      <TableCell>₹{maintenance.cost.toLocaleString()}</TableCell>
                      <TableCell>{maintenance.workshop}</TableCell>
                      <TableCell>{maintenance.downtime} days</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            maintenance.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {maintenance.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drivers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Driver Management</CardTitle>
              <CardDescription>Driver information, performance, and assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Driver ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>License</TableHead>
                    <TableHead>License Expiry</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Total Trips</TableHead>
                    <TableHead>Assigned Vehicle</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {driverData.map((driver) => (
                    <TableRow key={driver.id}>
                      <TableCell className="font-medium">{driver.id}</TableCell>
                      <TableCell>{driver.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          {driver.phone}
                        </div>
                      </TableCell>
                      <TableCell>{driver.license}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {format(new Date(driver.licenseExpiry), "dd/MM/yyyy")}
                        </div>
                      </TableCell>
                      <TableCell>{driver.experience} years</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">{driver.rating}</span>
                          <span className="text-sm text-muted-foreground">/5</span>
                        </div>
                      </TableCell>
                      <TableCell>{driver.totalTrips}</TableCell>
                      <TableCell>{driver.assignedVehicle}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            driver.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : driver.status === "On Trip"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {driver.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Fleet Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">85%</div>
                <p className="text-sm text-muted-foreground">Average utilization</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Maintenance Cost</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">₹40,925</div>
                <p className="text-sm text-muted-foreground">Per vehicle/month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Fuel Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12.9</div>
                <p className="text-sm text-muted-foreground">km/liter average</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Downtime</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">7</div>
                <p className="text-sm text-muted-foreground">days average</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Fleet Performance Analysis</CardTitle>
              <CardDescription>Detailed analysis of fleet performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Vehicle Performance Ranking</h4>
                  <div className="space-y-3">
                    {fleetData.map((vehicle, index) => (
                      <div key={vehicle.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{vehicle.vehicleNumber}</p>
                            <p className="text-sm text-muted-foreground">{vehicle.model}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{vehicle.fuelEfficiency} km/L</p>
                          <p className="text-sm text-muted-foreground">Efficiency</p>
                        </div>
                      </div>
                    ))}
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

function VehicleDetailsModal({ vehicle }: { vehicle: any }) {
  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        <TabsTrigger value="performance">Performance</TabsTrigger>
      </TabsList>

      <TabsContent value="details" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Vehicle Number:</span>
                <span className="font-medium">{vehicle.vehicleNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Model:</span>
                <span className="font-medium">{vehicle.model}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Year:</span>
                <span className="font-medium">{vehicle.year}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Capacity:</span>
                <span className="font-medium">{vehicle.capacity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Current Mileage:</span>
                <span className="font-medium">{vehicle.mileage.toLocaleString()} km</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Documentation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Registration Expiry:</span>
                <span className="font-medium">{format(new Date(vehicle.registrationExpiry), "dd/MM/yyyy")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Insurance Expiry:</span>
                <span className="font-medium">{format(new Date(vehicle.insuranceExpiry), "dd/MM/yyyy")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Maintenance:</span>
                <span className="font-medium">{format(new Date(vehicle.lastMaintenance), "dd/MM/yyyy")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Next Maintenance:</span>
                <span className="font-medium">{format(new Date(vehicle.nextMaintenance), "dd/MM/yyyy")}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Driver Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Driver Name:</span>
              <span className="font-medium">{vehicle.driver}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Contact:</span>
              <span className="font-medium">{vehicle.driverPhone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Current Location:</span>
              <span className="font-medium">{vehicle.currentLocation}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              {getStatusBadge(vehicle.status)}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="maintenance" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Maintenance Cost:</span>
              <span className="font-medium">₹{vehicle.maintenanceCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Downtime:</span>
              <span className="font-medium">{vehicle.downtime} days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Service:</span>
              <span className="font-medium">{format(new Date(vehicle.lastMaintenance), "dd/MM/yyyy")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Next Service Due:</span>
              <span className="font-medium">{format(new Date(vehicle.nextMaintenance), "dd/MM/yyyy")}</span>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="performance" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fuel Efficiency:</span>
              <span className="font-medium">{vehicle.fuelEfficiency} km/L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Mileage:</span>
              <span className="font-medium">{vehicle.mileage.toLocaleString()} km</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Maintenance Cost/km:</span>
              <span className="font-medium">₹{(vehicle.maintenanceCost / vehicle.mileage).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Availability:</span>
              <span className="font-medium">{Math.round((1 - vehicle.downtime / 365) * 100)}%</span>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

function getStatusBadge(status: string) {
  switch (status) {
    case "Active":
      return <Badge className="bg-green-100 text-green-800">Active</Badge>
    case "In Transit":
      return <Badge className="bg-blue-100 text-blue-800">In Transit</Badge>
    case "Maintenance":
      return <Badge className="bg-red-100 text-red-800">Maintenance</Badge>
    case "Idle":
      return <Badge className="bg-yellow-100 text-yellow-800">Idle</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}
