"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts"
import { Truck, Fuel, DollarSign, TrendingUp, TrendingDown, Calculator, Download, Route } from "lucide-react"

const costBreakdownData = [
  {
    category: "Fuel Costs",
    ownFleet: 1250000,
    thirdParty: 1820000,
    percentage: 42,
    trend: "+8%",
    color: "#ff6b6b",
  },
  {
    category: "Driver Wages",
    ownFleet: 850000,
    thirdParty: 0,
    percentage: 18,
    trend: "+5%",
    color: "#4ecdc4",
  },
  {
    category: "Vehicle Maintenance",
    ownFleet: 320000,
    thirdParty: 0,
    percentage: 7,
    trend: "-2%",
    color: "#45b7d1",
  },
  {
    category: "Insurance & Registration",
    ownFleet: 210000,
    thirdParty: 0,
    percentage: 4,
    trend: "0%",
    color: "#96ceb4",
  },
  {
    category: "Third Party Charges",
    ownFleet: 0,
    thirdParty: 1560000,
    percentage: 29,
    trend: "+12%",
    color: "#feca57",
  },
]

const routeCostAnalysis = [
  {
    route: "Punjab Mandi → Mill",
    distance: 245,
    avgTrips: 12,
    fuelCost: 35000,
    driverCost: 18000,
    maintenanceCost: 8500,
    thirdPartyCost: 28000,
    totalOwnCost: 61500,
    totalThirdPartyCost: 28000,
    savings: 33500,
    costPerMT: 142,
    efficiency: "High",
  },
  {
    route: "Haryana Mandi → Mill",
    distance: 180,
    avgTrips: 8,
    fuelCost: 28000,
    driverCost: 14000,
    maintenanceCost: 6200,
    thirdPartyCost: 22000,
    totalOwnCost: 48200,
    totalThirdPartyCost: 22000,
    savings: 26200,
    costPerMT: 128,
    efficiency: "High",
  },
  {
    route: "UP Mandi → Mill",
    distance: 320,
    avgTrips: 6,
    fuelCost: 45000,
    driverCost: 22000,
    maintenanceCost: 12000,
    thirdPartyCost: 36000,
    totalOwnCost: 79000,
    totalThirdPartyCost: 36000,
    savings: 43000,
    costPerMT: 165,
    efficiency: "Medium",
  },
  {
    route: "Rajasthan Mandi → Mill",
    distance: 280,
    avgTrips: 4,
    fuelCost: 40000,
    driverCost: 20000,
    maintenanceCost: 10500,
    thirdPartyCost: 32000,
    totalOwnCost: 70500,
    totalThirdPartyCost: 32000,
    savings: 38500,
    costPerMT: 158,
    efficiency: "Medium",
  },
]

const monthlyTrends = [
  { month: "Oct", ownFleet: 4850000, thirdParty: 3200000, total: 8050000, savings: 1650000 },
  { month: "Nov", ownFleet: 5200000, thirdParty: 3800000, total: 9000000, savings: 1400000 },
  { month: "Dec", ownFleet: 4800000, thirdParty: 3400000, total: 8200000, savings: 1400000 },
  { month: "Jan", ownFleet: 5800000, thirdParty: 4200000, total: 10000000, savings: 1600000 },
  { month: "Feb", ownFleet: 6100000, thirdParty: 4500000, total: 10600000, savings: 1600000 },
  { month: "Mar", ownFleet: 5900000, thirdParty: 4300000, total: 10200000, savings: 1600000 },
]

const vehicleWiseCosts = [
  {
    vehicleNumber: "PB-01-AB-1234",
    type: "Own",
    model: "Tata 1618",
    fuelCost: 125000,
    maintenanceCost: 28000,
    driverCost: 35000,
    totalCost: 188000,
    trips: 24,
    distance: 5880,
    costPerKm: 32,
    utilization: 85,
  },
  {
    vehicleNumber: "HR-02-CD-5678",
    type: "Own",
    model: "Ashok Leyland 1616",
    fuelCost: 118000,
    maintenanceCost: 22000,
    driverCost: 35000,
    totalCost: 175000,
    trips: 20,
    distance: 3600,
    costPerKm: 49,
    utilization: 78,
  },
  {
    vehicleNumber: "UP-03-EF-9012",
    type: "Third Party",
    model: "Tata 1618",
    fuelCost: 0,
    maintenanceCost: 0,
    driverCost: 0,
    totalCost: 192000,
    trips: 18,
    distance: 5760,
    costPerKm: 33,
    utilization: 82,
  },
]

const costOptimizationSuggestions = [
  {
    category: "Route Optimization",
    suggestion: "Consolidate Punjab routes to reduce empty return trips",
    potentialSaving: 85000,
    implementation: "Easy",
    timeline: "1 month",
    impact: "High",
  },
  {
    category: "Fuel Management",
    suggestion: "Install GPS tracking for fuel monitoring",
    potentialSaving: 125000,
    implementation: "Medium",
    timeline: "2 months",
    impact: "High",
  },
  {
    category: "Maintenance",
    suggestion: "Implement preventive maintenance schedule",
    potentialSaving: 65000,
    implementation: "Easy",
    timeline: "Immediate",
    impact: "Medium",
  },
  {
    category: "Driver Training",
    suggestion: "Fuel-efficient driving training program",
    potentialSaving: 95000,
    implementation: "Easy",
    timeline: "1 month",
    impact: "Medium",
  },
]

export default function TransportationCostAnalysisPage() {
  const [timeFilter, setTimeFilter] = useState("monthly")
  const [routeFilter, setRouteFilter] = useState("all")

  const getEfficiencyBadge = (efficiency: string) => {
    switch (efficiency) {
      case "High":
        return <Badge className="bg-green-100 text-green-800">High</Badge>
      case "Medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case "Low":
        return <Badge className="bg-red-100 text-red-800">Low</Badge>
      default:
        return <Badge variant="outline">{efficiency}</Badge>
    }
  }

  const getImplementationBadge = (implementation: string) => {
    switch (implementation) {
      case "Easy":
        return <Badge className="bg-green-100 text-green-800">Easy</Badge>
      case "Medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case "Hard":
        return <Badge className="bg-red-100 text-red-800">Hard</Badge>
      default:
        return <Badge variant="outline">{implementation}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transportation Cost Analysis</h1>
          <p className="text-muted-foreground">Detailed cost breakdown and optimization insights</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Calculator className="h-4 w-4 mr-2" />
            Cost Calculator
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transportation Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹1.02Cr</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost per MT</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹148</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingDown className="h-3 w-3 mr-1 text-green-500" />
              -5% improvement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fuel Efficiency</CardTitle>
            <Fuel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5 km/L</div>
            <p className="text-xs text-muted-foreground">Fleet average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Potential Savings</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹3.7L</div>
            <p className="text-xs text-muted-foreground">Monthly optimization</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="breakdown" className="space-y-4">
        <TabsList>
          <TabsTrigger value="breakdown">Cost Breakdown</TabsTrigger>
          <TabsTrigger value="routes">Route Analysis</TabsTrigger>
          <TabsTrigger value="vehicles">Vehicle Performance</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="breakdown" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Cost Distribution</CardTitle>
                <CardDescription>Breakdown by cost categories</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: { label: "Amount (₹)" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={costBreakdownData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ category, percentage }) => `${category} ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="ownFleet"
                      >
                        {costBreakdownData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Cost Trends</CardTitle>
                <CardDescription>Transportation cost trends over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    ownFleet: { label: "Own Fleet", color: "hsl(var(--chart-1))" },
                    thirdParty: { label: "Third Party", color: "hsl(var(--chart-2))" },
                    savings: { label: "Savings", color: "hsl(var(--chart-3))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="ownFleet" stroke="var(--color-ownFleet)" strokeWidth={2} />
                      <Line type="monotone" dataKey="thirdParty" stroke="var(--color-thirdParty)" strokeWidth={2} />
                      <Line type="monotone" dataKey="savings" stroke="var(--color-savings)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Detailed Cost Breakdown</CardTitle>
              <CardDescription>Category-wise cost analysis with trends</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cost Category</TableHead>
                    <TableHead>Own Fleet</TableHead>
                    <TableHead>Third Party</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead>Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {costBreakdownData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.category}</TableCell>
                      <TableCell>₹{(item.ownFleet / 1000).toFixed(0)}K</TableCell>
                      <TableCell>₹{(item.thirdParty / 1000).toFixed(0)}K</TableCell>
                      <TableCell>₹{((item.ownFleet + item.thirdParty) / 1000).toFixed(0)}K</TableCell>
                      <TableCell>{item.percentage}%</TableCell>
                      <TableCell>
                        <span
                          className={`flex items-center gap-1 ${item.trend.startsWith("+") ? "text-red-600" : item.trend.startsWith("-") ? "text-green-600" : "text-gray-600"}`}
                        >
                          {item.trend.startsWith("+") ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : item.trend.startsWith("-") ? (
                            <TrendingDown className="h-3 w-3" />
                          ) : null}
                          {item.trend}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="routes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Route-wise Cost Analysis</CardTitle>
              <CardDescription>Detailed cost comparison by routes</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Route</TableHead>
                    <TableHead>Distance</TableHead>
                    <TableHead>Avg Trips</TableHead>
                    <TableHead>Own Fleet Cost</TableHead>
                    <TableHead>Third Party Cost</TableHead>
                    <TableHead>Savings</TableHead>
                    <TableHead>Cost per MT</TableHead>
                    <TableHead>Efficiency</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {routeCostAnalysis.map((route, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-1">
                          <Route className="h-3 w-3 text-muted-foreground" />
                          {route.route}
                        </div>
                      </TableCell>
                      <TableCell>{route.distance} km</TableCell>
                      <TableCell>{route.avgTrips}/month</TableCell>
                      <TableCell>₹{(route.totalOwnCost / 1000).toFixed(0)}K</TableCell>
                      <TableCell>₹{(route.totalThirdPartyCost / 1000).toFixed(0)}K</TableCell>
                      <TableCell className="text-green-600 font-medium">
                        ₹{(route.savings / 1000).toFixed(0)}K
                      </TableCell>
                      <TableCell>₹{route.costPerMT}</TableCell>
                      <TableCell>{getEfficiencyBadge(route.efficiency)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Most Economical Routes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Haryana → Mill</span>
                    <span className="font-medium">₹128/MT</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Punjab → Mill</span>
                    <span className="font-medium">₹142/MT</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rajasthan → Mill</span>
                    <span className="font-medium">₹158/MT</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Highest Savings Routes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>UP → Mill</span>
                    <span className="font-medium text-green-600">₹43K</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rajasthan → Mill</span>
                    <span className="font-medium text-green-600">₹38.5K</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Punjab → Mill</span>
                    <span className="font-medium text-green-600">₹33.5K</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Route Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Fuel Efficiency</span>
                    <span className="font-medium">12.5 km/L</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Load Factor</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Empty Return %</span>
                    <span className="font-medium">15%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vehicles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle-wise Performance</CardTitle>
              <CardDescription>Individual vehicle cost and performance analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vehicle Number</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>Fuel Cost</TableHead>
                    <TableHead>Maintenance</TableHead>
                    <TableHead>Total Cost</TableHead>
                    <TableHead>Cost per KM</TableHead>
                    <TableHead>Utilization</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vehicleWiseCosts.map((vehicle, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{vehicle.vehicleNumber}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            vehicle.type === "Own" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                          }
                        >
                          {vehicle.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{vehicle.model}</TableCell>
                      <TableCell>₹{(vehicle.fuelCost / 1000).toFixed(0)}K</TableCell>
                      <TableCell>₹{(vehicle.maintenanceCost / 1000).toFixed(0)}K</TableCell>
                      <TableCell>₹{(vehicle.totalCost / 1000).toFixed(0)}K</TableCell>
                      <TableCell>₹{vehicle.costPerKm}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${vehicle.utilization >= 80 ? "bg-green-600" : vehicle.utilization >= 60 ? "bg-yellow-600" : "bg-red-600"}`}
                              style={{ width: `${vehicle.utilization}%` }}
                            />
                          </div>
                          <span className="text-sm">{vehicle.utilization}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Best Performing Vehicles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>PB-01-AB-1234</span>
                    <span className="font-medium">₹32/km</span>
                  </div>
                  <div className="flex justify-between">
                    <span>UP-03-EF-9012</span>
                    <span className="font-medium">₹33/km</span>
                  </div>
                  <div className="flex justify-between">
                    <span>HR-02-CD-5678</span>
                    <span className="font-medium">₹49/km</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Maintenance Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-2 bg-red-50 rounded-lg">
                    <p className="text-sm font-medium text-red-800">High Maintenance Cost</p>
                    <p className="text-xs text-red-600">HR-02-CD-5678 - ₹49/km</p>
                  </div>
                  <div className="p-2 bg-yellow-50 rounded-lg">
                    <p className="text-sm font-medium text-yellow-800">Service Due</p>
                    <p className="text-xs text-yellow-600">PB-01-AB-1234 - 2 days</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fleet Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Avg Fuel Efficiency</span>
                    <span className="font-medium">12.5 km/L</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Utilization</span>
                    <span className="font-medium">81.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Maintenance Cost/km</span>
                    <span className="font-medium">₹8.5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cost Optimization Recommendations</CardTitle>
              <CardDescription>Actionable suggestions to reduce transportation costs</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Suggestion</TableHead>
                    <TableHead>Potential Saving</TableHead>
                    <TableHead>Implementation</TableHead>
                    <TableHead>Timeline</TableHead>
                    <TableHead>Impact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {costOptimizationSuggestions.map((suggestion, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{suggestion.category}</TableCell>
                      <TableCell>{suggestion.suggestion}</TableCell>
                      <TableCell className="text-green-600 font-medium">
                        ₹{(suggestion.potentialSaving / 1000).toFixed(0)}K/month
                      </TableCell>
                      <TableCell>{getImplementationBadge(suggestion.implementation)}</TableCell>
                      <TableCell>{suggestion.timeline}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            suggestion.impact === "High"
                              ? "bg-green-100 text-green-800"
                              : suggestion.impact === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                          }
                        >
                          {suggestion.impact}
                        </Badge>
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
                <CardTitle>Quick Wins</CardTitle>
                <CardDescription>Immediate cost reduction opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-green-800">Preventive Maintenance</h4>
                    <p className="text-sm text-muted-foreground">Implement scheduled maintenance</p>
                    <p className="text-sm font-medium text-green-600">Save ₹65K/month</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-blue-800">Driver Training</h4>
                    <p className="text-sm text-muted-foreground">Fuel-efficient driving practices</p>
                    <p className="text-sm font-medium text-blue-600">Save ₹95K/month</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Long-term Strategies</CardTitle>
                <CardDescription>Strategic initiatives for cost optimization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-purple-800">Route Consolidation</h4>
                    <p className="text-sm text-muted-foreground">Optimize delivery routes</p>
                    <p className="text-sm font-medium text-purple-600">Save ₹85K/month</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-orange-800">GPS Tracking</h4>
                    <p className="text-sm text-muted-foreground">Real-time fuel monitoring</p>
                    <p className="text-sm font-medium text-orange-600">Save ₹125K/month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>ROI Analysis</CardTitle>
              <CardDescription>Return on investment for optimization initiatives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">₹3.7L</div>
                  <div className="text-sm text-muted-foreground">Total Monthly Savings</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">₹44.4L</div>
                  <div className="text-sm text-muted-foreground">Annual Savings</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">15%</div>
                  <div className="text-sm text-muted-foreground">Cost Reduction</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">6 months</div>
                  <div className="text-sm text-muted-foreground">Payback Period</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
