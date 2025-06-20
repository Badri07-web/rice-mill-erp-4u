"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Truck, Fuel, DollarSign, Route, Clock, AlertTriangle, TrendingUp, Navigation } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

const fleetData = [
  { type: "Own Trucks", count: 12, active: 10, maintenance: 2, utilization: 83 },
  { type: "Third-party", count: 8, active: 6, maintenance: 0, utilization: 75 },
]

const fuelConsumptionData = [
  { day: "Mon", ownTrucks: 450, thirdParty: 320 },
  { day: "Tue", ownTrucks: 520, thirdParty: 380 },
  { day: "Wed", ownTrucks: 480, thirdParty: 340 },
  { day: "Thu", ownTrucks: 580, thirdParty: 420 },
  { day: "Fri", ownTrucks: 610, thirdParty: 450 },
  { day: "Sat", ownTrucks: 490, thirdParty: 360 },
  { day: "Sun", ownTrucks: 380, thirdParty: 280 },
]

const costAnalysisData = [
  { category: "Fuel", ownTruck: 12500, thirdParty: 18200 },
  { category: "Maintenance", ownTruck: 3200, thirdParty: 0 },
  { category: "Driver Wages", ownTruck: 8500, thirdParty: 0 },
  { category: "Insurance", ownTruck: 2100, thirdParty: 0 },
  { category: "Service Charges", ownTruck: 0, thirdParty: 15600 },
]

const routeOptimizationData = [
  { route: "Punjab-Mill", distance: 245, time: 4.5, fuel: 35, cost: 2800, trips: 12 },
  { route: "Haryana-Mill", distance: 180, time: 3.2, fuel: 28, cost: 2200, trips: 8 },
  { route: "UP-Mill", distance: 320, time: 5.8, fuel: 45, cost: 3600, trips: 6 },
  { route: "Rajasthan-Mill", distance: 280, time: 5.1, fuel: 40, cost: 3200, trips: 4 },
]

const activeTrips = [
  {
    tripId: "TRP-001",
    truck: "PB-01-AB-1234",
    driver: "Rajesh Kumar",
    route: "Punjab Mandi #1 → Mill",
    status: "In Transit",
    progress: 65,
    eta: "14:30",
    doNumbers: ["DO-2024-089", "DO-2024-090"],
  },
  {
    tripId: "TRP-002",
    truck: "HR-02-CD-5678",
    driver: "Suresh Singh",
    route: "Haryana Mandi #2 → Mill",
    status: "Loading",
    progress: 25,
    eta: "16:45",
    doNumbers: ["DO-2024-091"],
  },
  {
    tripId: "TRP-003",
    truck: "UP-03-EF-9012",
    driver: "Mohan Lal",
    route: "UP Mandi #3 → Mill",
    status: "Completed",
    progress: 100,
    eta: "Arrived",
    doNumbers: ["DO-2024-088"],
  },
]

export default function TransportationDashboard() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Transit":
        return <Badge className="bg-blue-100 text-blue-800">In Transit</Badge>
      case "Loading":
        return <Badge className="bg-yellow-100 text-yellow-800">Loading</Badge>
      case "Completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "Delayed":
        return <Badge className="bg-red-100 text-red-800">Delayed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transportation Dashboard</h1>
          <p className="text-muted-foreground">Fleet management and route optimization</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Route className="h-4 w-4 mr-2" />
            Optimize Routes
          </Button>
          <Button variant="outline">
            <Navigation className="h-4 w-4 mr-2" />
            Live Tracking
          </Button>
          <Button>
            <Truck className="h-4 w-4 mr-2" />
            Schedule Trip
          </Button>
        </div>
      </div>

      {/* Fleet Overview KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fleet</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">20</div>
            <p className="text-xs text-muted-foreground">12 own + 8 third-party</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Trips</CardTitle>
            <Route className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeTrips.filter((trip) => trip.status !== "Completed").length}</div>
            <p className="text-xs text-muted-foreground">
              {activeTrips.filter((trip) => trip.status === "In Transit").length} in transit
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fuel Consumption</CardTitle>
            <Fuel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,240L</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                -8% from last week
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transportation Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹85,400</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="fleet">Fleet Status</TabsTrigger>
          <TabsTrigger value="routes">Route Optimization</TabsTrigger>
          <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Fleet Utilization</CardTitle>
                <CardDescription>Own trucks vs third-party utilization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fleetData.map((fleet, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{fleet.type}</span>
                        <span>
                          {fleet.active}/{fleet.count} active ({fleet.utilization}%)
                        </span>
                      </div>
                      <Progress value={fleet.utilization} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Daily Fuel Consumption</CardTitle>
                <CardDescription>Fuel usage comparison over the week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={fuelConsumptionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value}L`} />
                    <Bar dataKey="ownTrucks" fill="#10b981" name="Own Trucks" />
                    <Bar dataKey="thirdParty" fill="#3b82f6" name="Third Party" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Active Trips</CardTitle>
              <CardDescription>Real-time status of ongoing transportation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeTrips.map((trip) => (
                  <div key={trip.tripId} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium">{trip.tripId}</h4>
                        <p className="text-sm text-muted-foreground">{trip.route}</p>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(trip.status)}
                        <p className="text-sm text-muted-foreground mt-1">ETA: {trip.eta}</p>
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-3 mb-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Truck</p>
                        <p className="font-medium">{trip.truck}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Driver</p>
                        <p className="font-medium">{trip.driver}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">DOs</p>
                        <p className="font-medium">{trip.doNumbers.join(", ")}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{trip.progress}%</span>
                      </div>
                      <Progress value={trip.progress} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fleet" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Own Fleet</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12</div>
                <div className="space-y-2 mt-4">
                  <div className="flex justify-between text-sm">
                    <span>Active:</span>
                    <span className="text-green-600">10</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Maintenance:</span>
                    <span className="text-orange-600">2</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Utilization:</span>
                    <span>83%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Third-party</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">8</div>
                <div className="space-y-2 mt-4">
                  <div className="flex justify-between text-sm">
                    <span>Active:</span>
                    <span className="text-green-600">6</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Available:</span>
                    <span className="text-blue-600">2</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Utilization:</span>
                    <span>75%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Maintenance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600">2</div>
                <div className="space-y-2 mt-4">
                  <div className="flex justify-between text-sm">
                    <span>Scheduled:</span>
                    <span>1</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Emergency:</span>
                    <span>1</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Avg Downtime:</span>
                    <span>2.5 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">94%</div>
                <div className="space-y-2 mt-4">
                  <div className="flex justify-between text-sm">
                    <span>On-time Delivery:</span>
                    <span>96%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Fuel Efficiency:</span>
                    <span>12.5 km/L</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Driver Rating:</span>
                    <span>4.7/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Fleet Alerts</CardTitle>
              <CardDescription>Important notifications and maintenance alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="font-medium text-red-800">Emergency Maintenance Required</p>
                    <p className="text-sm text-red-600">PB-05-GH-7890 - Engine overheating detected</p>
                  </div>
                </div>
                <Badge variant="destructive">Critical</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="font-medium text-orange-800">Scheduled Maintenance Due</p>
                    <p className="text-sm text-orange-600">HR-02-CD-5678 - Service due in 2 days</p>
                  </div>
                </div>
                <Badge variant="secondary">Warning</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Fuel className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="font-medium text-yellow-800">Fuel Efficiency Alert</p>
                    <p className="text-sm text-yellow-600">UP-03-EF-9012 - Below average fuel efficiency</p>
                  </div>
                </div>
                <Badge variant="outline">Info</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="routes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Route Optimization</CardTitle>
              <CardDescription>Analyze and optimize transportation routes for efficiency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {routeOptimizationData.map((route, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium">{route.route}</h4>
                        <p className="text-sm text-muted-foreground">{route.trips} trips this month</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Route className="h-4 w-4 mr-1" />
                        Optimize
                      </Button>
                    </div>

                    <div className="grid gap-3 md:grid-cols-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Distance</p>
                        <p className="font-medium">{route.distance} km</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Time</p>
                        <p className="font-medium">{route.time} hrs</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Fuel</p>
                        <p className="font-medium">{route.fuel}L</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Cost</p>
                        <p className="font-medium">₹{route.cost}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Traffic & Weather Integration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-3">
                  <h4 className="font-medium mb-2">Current Conditions</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Punjab Route:</span>
                      <Badge className="bg-green-100 text-green-800">Clear</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Haryana Route:</span>
                      <Badge className="bg-yellow-100 text-yellow-800">Light Traffic</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>UP Route:</span>
                      <Badge className="bg-red-100 text-red-800">Heavy Traffic</Badge>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-3">
                  <h4 className="font-medium mb-2">Weather Alerts</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Rain Expected:</span>
                      <span>Punjab (Evening)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fog Warning:</span>
                      <span>UP (Morning)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delivery Time Optimization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>On-time Delivery Rate</span>
                      <span>96%</span>
                    </div>
                    <Progress value={96} />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Average Delay</span>
                      <span>15 minutes</span>
                    </div>
                    <Progress value={25} />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Route Efficiency</span>
                      <span>88%</span>
                    </div>
                    <Progress value={88} />
                  </div>
                </div>

                <Button className="w-full">
                  <Navigation className="h-4 w-4 mr-2" />
                  Optimize All Routes
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="costs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cost Comparison: Own vs Third-party</CardTitle>
              <CardDescription>Detailed breakdown of transportation costs</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={costAnalysisData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                  <Bar dataKey="ownTruck" fill="#10b981" name="Own Trucks" />
                  <Bar dataKey="thirdParty" fill="#ef4444" name="Third Party" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Cost</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">₹85,400</div>
                <p className="text-sm text-muted-foreground">This week</p>
                <div className="mt-2 text-sm">
                  <span className="text-green-600">-12% from last week</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cost per MT</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">₹142</div>
                <p className="text-sm text-muted-foreground">Average cost</p>
                <div className="mt-2 text-sm">
                  <span className="text-green-600">-5% improvement</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Fuel Cost</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">₹45,200</div>
                <p className="text-sm text-muted-foreground">53% of total cost</p>
                <div className="mt-2 text-sm">
                  <span className="text-red-600">+8% from last week</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">₹12,800</div>
                <p className="text-sm text-muted-foreground">Own vs third-party</p>
                <div className="mt-2 text-sm">
                  <span className="text-green-600">15% cost reduction</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Cost Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={fuelConsumptionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="ownTrucks" stroke="#10b981" name="Own Trucks" />
                    <Line type="monotone" dataKey="thirdParty" stroke="#ef4444" name="Third Party" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Optimization Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="border rounded-lg p-3">
                  <h4 className="font-medium text-green-800">Route Consolidation</h4>
                  <p className="text-sm text-muted-foreground">Combine Punjab routes</p>
                  <p className="text-sm font-medium text-green-600">Save ₹8,500/month</p>
                </div>

                <div className="border rounded-lg p-3">
                  <h4 className="font-medium text-blue-800">Fuel Efficiency</h4>
                  <p className="text-sm text-muted-foreground">Driver training program</p>
                  <p className="text-sm font-medium text-blue-600">Save ₹5,200/month</p>
                </div>

                <div className="border rounded-lg p-3">
                  <h4 className="font-medium text-orange-800">Maintenance Schedule</h4>
                  <p className="text-sm text-muted-foreground">Preventive maintenance</p>
                  <p className="text-sm font-medium text-orange-600">Save ₹3,800/month</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
