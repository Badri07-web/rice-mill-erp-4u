"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Route, Truck, MapPin, Clock, Navigation, Phone, CalendarIcon, Plus, Search, Star } from "lucide-react"
import { format } from "date-fns"

const tripData = [
  {
    id: "TRP-001",
    tripNumber: "TRP-2024-001",
    vehicle: "PB-01-AB-1234",
    driver: "Rajesh Kumar",
    driverPhone: "+91-98765-43210",
    route: "Punjab Mandi #1 → Rice Mill",
    startLocation: "Punjab Mandi #1",
    endLocation: "Rice Mill",
    distance: 245,
    estimatedTime: 4.5,
    actualTime: 4.8,
    startTime: "2024-03-15 08:00",
    endTime: "2024-03-15 12:48",
    status: "Completed",
    fuelConsumed: 35,
    fuelCost: 2800,
    tollCharges: 450,
    driverWages: 800,
    totalCost: 4050,
    doNumbers: ["DO-2024-089", "DO-2024-090"],
    cargoWeight: 18,
    driverRating: 4.8,
    onTimeDelivery: true,
  },
  {
    id: "TRP-002",
    tripNumber: "TRP-2024-002",
    vehicle: "HR-02-CD-5678",
    driver: "Suresh Singh",
    driverPhone: "+91-98765-43211",
    route: "Haryana Mandi #2 → Rice Mill",
    startLocation: "Haryana Mandi #2",
    endLocation: "Rice Mill",
    distance: 180,
    estimatedTime: 3.2,
    actualTime: null,
    startTime: "2024-03-15 14:30",
    endTime: null,
    status: "In Transit",
    fuelConsumed: null,
    fuelCost: 2200,
    tollCharges: 320,
    driverWages: 600,
    totalCost: 3120,
    doNumbers: ["DO-2024-091"],
    cargoWeight: 12,
    driverRating: 4.6,
    onTimeDelivery: null,
  },
  {
    id: "TRP-003",
    tripNumber: "TRP-2024-003",
    vehicle: "UP-03-EF-9012",
    driver: "Mohan Lal",
    driverPhone: "+91-98765-43212",
    route: "UP Mandi #3 → Rice Mill",
    startLocation: "UP Mandi #3",
    endLocation: "Rice Mill",
    distance: 320,
    estimatedTime: 5.8,
    actualTime: 6.2,
    startTime: "2024-03-14 09:15",
    endTime: "2024-03-14 15:27",
    status: "Completed",
    fuelConsumed: 45,
    fuelCost: 3600,
    tollCharges: 580,
    driverWages: 1000,
    totalCost: 5180,
    doNumbers: ["DO-2024-088"],
    cargoWeight: 15,
    driverRating: 4.9,
    onTimeDelivery: false,
  },
]

const plannedTrips = [
  {
    id: "PLN-001",
    date: "2024-03-16",
    route: "Rajasthan Mandi #1 → Rice Mill",
    vehicle: "RJ-04-GH-3456",
    driver: "Vikram Singh",
    doNumbers: ["DO-2024-092", "DO-2024-093"],
    estimatedDistance: 280,
    estimatedTime: 5.1,
    estimatedCost: 4200,
    status: "Scheduled",
  },
  {
    id: "PLN-002",
    date: "2024-03-17",
    route: "Punjab Mandi #2 → Rice Mill",
    vehicle: "PB-01-AB-1234",
    driver: "Rajesh Kumar",
    doNumbers: ["DO-2024-094"],
    estimatedDistance: 220,
    estimatedTime: 4.0,
    estimatedCost: 3500,
    status: "Planned",
  },
]

const driverPerformance = [
  {
    driver: "Rajesh Kumar",
    totalTrips: 45,
    onTimeDeliveries: 43,
    avgRating: 4.8,
    fuelEfficiency: 12.5,
    totalDistance: 11250,
    totalEarnings: 36000,
  },
  {
    driver: "Suresh Singh",
    totalTrips: 38,
    onTimeDeliveries: 35,
    avgRating: 4.6,
    fuelEfficiency: 11.8,
    totalDistance: 9500,
    totalEarnings: 30400,
  },
  {
    driver: "Mohan Lal",
    totalTrips: 52,
    onTimeDeliveries: 48,
    avgRating: 4.9,
    fuelEfficiency: 13.2,
    totalDistance: 13000,
    totalEarnings: 41600,
  },
]

export default function TripManagementPage() {
  const [selectedTrip, setSelectedTrip] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [newTripData, setNewTripData] = useState({
    vehicle: "",
    driver: "",
    route: "",
    doNumbers: "",
    scheduledDate: new Date(),
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "In Transit":
        return <Badge className="bg-blue-100 text-blue-800">In Transit</Badge>
      case "Scheduled":
        return <Badge className="bg-yellow-100 text-yellow-800">Scheduled</Badge>
      case "Planned":
        return <Badge className="bg-purple-100 text-purple-800">Planned</Badge>
      case "Delayed":
        return <Badge className="bg-red-100 text-red-800">Delayed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredTrips = tripData.filter((trip) => {
    const matchesSearch =
      trip.tripNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || trip.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Trip Management</h1>
          <p className="text-muted-foreground">Plan, track, and analyze transportation trips</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Navigation className="h-4 w-4 mr-2" />
            Live Tracking
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Plan New Trip
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Plan New Trip</DialogTitle>
                <DialogDescription>Create a new trip schedule</DialogDescription>
              </DialogHeader>
              <TripPlanningModal />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Trip Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Trips</CardTitle>
            <Route className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tripData.filter((trip) => trip.status === "In Transit").length}</div>
            <p className="text-xs text-muted-foreground">Currently on road</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tripData.filter((trip) => trip.status === "Completed").length}</div>
            <p className="text-xs text-muted-foreground">Successful deliveries</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On-time Delivery</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Distance</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">745 km</div>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Trips</TabsTrigger>
          <TabsTrigger value="planned">Planned Trips</TabsTrigger>
          <TabsTrigger value="history">Trip History</TabsTrigger>
          <TabsTrigger value="performance">Driver Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
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
                      placeholder="Search by trip number, driver, or vehicle..."
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
                    <SelectItem value="in transit">In Transit</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="delayed">Delayed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Active Trips Table */}
          <Card>
            <CardHeader>
              <CardTitle>Trip List</CardTitle>
              <CardDescription>Current and recent trips with real-time status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Trip Number</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>DOs</TableHead>
                    <TableHead>Distance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Start Time</TableHead>
                    <TableHead>Est. Arrival</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTrips.map((trip) => (
                    <TableRow key={trip.id}>
                      <TableCell className="font-medium">{trip.tripNumber}</TableCell>
                      <TableCell>{trip.vehicle}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{trip.driver}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {trip.driverPhone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{trip.startLocation}</div>
                          <div className="text-muted-foreground">↓</div>
                          <div>{trip.endLocation}</div>
                        </div>
                      </TableCell>
                      <TableCell>{trip.doNumbers.join(", ")}</TableCell>
                      <TableCell>{trip.distance} km</TableCell>
                      <TableCell>{getStatusBadge(trip.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          {format(new Date(trip.startTime), "HH:mm")}
                        </div>
                      </TableCell>
                      <TableCell>
                        {trip.status === "In Transit" ? (
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            {format(
                              new Date(new Date(trip.startTime).getTime() + trip.estimatedTime * 60 * 60 * 1000),
                              "HH:mm",
                            )}
                          </div>
                        ) : trip.endTime ? (
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            {format(new Date(trip.endTime), "HH:mm")}
                          </div>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedTrip(trip)}>
                                <Navigation className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>Trip Details - {trip.tripNumber}</DialogTitle>
                                <DialogDescription>Complete trip information and tracking</DialogDescription>
                              </DialogHeader>
                              {selectedTrip && <TripDetailsModal trip={selectedTrip} />}
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm">
                            <Phone className="h-4 w-4" />
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

        <TabsContent value="planned" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Planned Trips</CardTitle>
              <CardDescription>Upcoming scheduled trips and route planning</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>DOs</TableHead>
                    <TableHead>Est. Distance</TableHead>
                    <TableHead>Est. Time</TableHead>
                    <TableHead>Est. Cost</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plannedTrips.map((trip) => (
                    <TableRow key={trip.id}>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3 text-muted-foreground" />
                          {format(new Date(trip.date), "dd/MM/yyyy")}
                        </div>
                      </TableCell>
                      <TableCell>{trip.route}</TableCell>
                      <TableCell>{trip.vehicle}</TableCell>
                      <TableCell>{trip.driver}</TableCell>
                      <TableCell>{trip.doNumbers.join(", ")}</TableCell>
                      <TableCell>{trip.estimatedDistance} km</TableCell>
                      <TableCell>{trip.estimatedTime} hrs</TableCell>
                      <TableCell>₹{trip.estimatedCost.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(trip.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Route className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Clock className="h-4 w-4" />
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

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Trip History</CardTitle>
              <CardDescription>Completed trips with performance analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Trip Number</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Distance</TableHead>
                    <TableHead>Time Taken</TableHead>
                    <TableHead>Fuel Used</TableHead>
                    <TableHead>Total Cost</TableHead>
                    <TableHead>On Time</TableHead>
                    <TableHead>Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tripData
                    .filter((trip) => trip.status === "Completed")
                    .map((trip) => (
                      <TableRow key={trip.id}>
                        <TableCell className="font-medium">{trip.tripNumber}</TableCell>
                        <TableCell>{format(new Date(trip.startTime), "dd/MM/yyyy")}</TableCell>
                        <TableCell>{trip.route}</TableCell>
                        <TableCell>{trip.driver}</TableCell>
                        <TableCell>{trip.distance} km</TableCell>
                        <TableCell>{trip.actualTime} hrs</TableCell>
                        <TableCell>{trip.fuelConsumed}L</TableCell>
                        <TableCell>₹{trip.totalCost.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge
                            className={trip.onTimeDelivery ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                          >
                            {trip.onTimeDelivery ? "Yes" : "No"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            {trip.driverRating}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Driver Performance</CardTitle>
              <CardDescription>Performance metrics and analytics for drivers</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Driver</TableHead>
                    <TableHead>Total Trips</TableHead>
                    <TableHead>On-time Deliveries</TableHead>
                    <TableHead>Success Rate</TableHead>
                    <TableHead>Avg Rating</TableHead>
                    <TableHead>Fuel Efficiency</TableHead>
                    <TableHead>Total Distance</TableHead>
                    <TableHead>Total Earnings</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {driverPerformance.map((driver, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{driver.driver}</TableCell>
                      <TableCell>{driver.totalTrips}</TableCell>
                      <TableCell>{driver.onTimeDeliveries}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{Math.round((driver.onTimeDeliveries / driver.totalTrips) * 100)}%</span>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${(driver.onTimeDeliveries / driver.totalTrips) * 100}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {driver.avgRating}
                        </div>
                      </TableCell>
                      <TableCell>{driver.fuelEfficiency} km/L</TableCell>
                      <TableCell>{driver.totalDistance.toLocaleString()} km</TableCell>
                      <TableCell>₹{driver.totalEarnings.toLocaleString()}</TableCell>
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

function TripPlanningModal() {
  const [tripData, setTripData] = useState({
    vehicle: "",
    driver: "",
    route: "",
    doNumbers: "",
    scheduledDate: new Date(),
  })

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="vehicle">Vehicle</Label>
          <Select value={tripData.vehicle} onValueChange={(value) => setTripData({ ...tripData, vehicle: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select vehicle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PB-01-AB-1234">PB-01-AB-1234</SelectItem>
              <SelectItem value="HR-02-CD-5678">HR-02-CD-5678</SelectItem>
              <SelectItem value="UP-03-EF-9012">UP-03-EF-9012</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="driver">Driver</Label>
          <Select value={tripData.driver} onValueChange={(value) => setTripData({ ...tripData, driver: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select driver" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rajesh">Rajesh Kumar</SelectItem>
              <SelectItem value="suresh">Suresh Singh</SelectItem>
              <SelectItem value="mohan">Mohan Lal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="route">Route</Label>
          <Select value={tripData.route} onValueChange={(value) => setTripData({ ...tripData, route: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select route" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="punjab-mill">Punjab Mandi → Mill</SelectItem>
              <SelectItem value="haryana-mill">Haryana Mandi → Mill</SelectItem>
              <SelectItem value="up-mill">UP Mandi → Mill</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="doNumbers">DO Numbers</Label>
          <Input
            id="doNumbers"
            placeholder="DO-2024-001, DO-2024-002"
            value={tripData.doNumbers}
            onChange={(e) => setTripData({ ...tripData, doNumbers: e.target.value })}
          />
        </div>
      </div>

      <div>
        <Label>Scheduled Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(tripData.scheduledDate, "PPP")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={tripData.scheduledDate}
              onSelect={(date) => date && setTripData({ ...tripData, scheduledDate: date })}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Schedule Trip</Button>
      </div>
    </div>
  )
}

function TripDetailsModal({ trip }: { trip: any }) {
  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="tracking">Tracking</TabsTrigger>
        <TabsTrigger value="costs">Costs</TabsTrigger>
        <TabsTrigger value="performance">Performance</TabsTrigger>
      </TabsList>

      <TabsContent value="details" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Trip Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Trip Number:</span>
                <span className="font-medium">{trip.tripNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Vehicle:</span>
                <span className="font-medium">{trip.vehicle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Driver:</span>
                <span className="font-medium">{trip.driver}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Route:</span>
                <span className="font-medium">{trip.route}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Distance:</span>
                <span className="font-medium">{trip.distance} km</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Start Time:</span>
                <span className="font-medium">{format(new Date(trip.startTime), "dd/MM/yyyy HH:mm")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">End Time:</span>
                <span className="font-medium">
                  {trip.endTime ? format(new Date(trip.endTime), "dd/MM/yyyy HH:mm") : "In Progress"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Time:</span>
                <span className="font-medium">{trip.estimatedTime} hrs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Actual Time:</span>
                <span className="font-medium">{trip.actualTime ? `${trip.actualTime} hrs` : "In Progress"}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Cargo Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">DO Numbers:</span>
              <span className="font-medium">{trip.doNumbers.join(", ")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cargo Weight:</span>
              <span className="font-medium">{trip.cargoWeight} MT</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              {getStatusBadge(trip.status)}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="tracking" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Live Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Map integration would be displayed here</p>
                <p className="text-sm text-muted-foreground">Current location: {trip.startLocation}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="costs" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Cost Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fuel Cost:</span>
              <span className="font-medium">₹{trip.fuelCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Toll Charges:</span>
              <span className="font-medium">₹{trip.tollCharges.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Driver Wages:</span>
              <span className="font-medium">₹{trip.driverWages.toLocaleString()}</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between font-medium">
                <span>Total Cost:</span>
                <span>₹{trip.totalCost.toLocaleString()}</span>
              </div>
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
              <span className="text-muted-foreground">On-time Delivery:</span>
              <Badge className={trip.onTimeDelivery ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                {trip.onTimeDelivery ? "Yes" : "No"}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Driver Rating:</span>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{trip.driverRating}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fuel Efficiency:</span>
              <span className="font-medium">
                {trip.fuelConsumed ? (trip.distance / trip.fuelConsumed).toFixed(1) : "N/A"} km/L
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cost per km:</span>
              <span className="font-medium">₹{(trip.totalCost / trip.distance).toFixed(2)}</span>
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
    case "Scheduled":
      return <Badge className="bg-yellow-100 text-yellow-800">Scheduled</Badge>
    case "Planned":
      return <Badge className="bg-purple-100 text-purple-800">Planned</Badge>
    case "Delayed":
      return <Badge className="bg-red-100 text-red-800">Delayed</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}
