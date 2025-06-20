"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Factory, Target, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const productionPlan = [
  { month: "Jan", planned: 2400, actual: 2200, efficiency: 92 },
  { month: "Feb", planned: 2600, actual: 2500, efficiency: 96 },
  { month: "Mar", planned: 2800, actual: 2650, efficiency: 95 },
  { month: "Apr", planned: 3000, actual: 2900, efficiency: 97 },
  { month: "May", planned: 3200, actual: 3100, efficiency: 97 },
  { month: "Jun", planned: 3400, actual: 3250, efficiency: 96 },
]

const capacityData = [
  { name: "Mill 1", capacity: 100, utilized: 85 },
  { name: "Mill 2", capacity: 100, utilized: 92 },
  { name: "Mill 3", capacity: 100, utilized: 78 },
  { name: "Mill 4", capacity: 100, utilized: 88 },
]

const demandForecast = [
  { product: "Basmati Rice", demand: 1200, supply: 1100, gap: -100 },
  { product: "Sona Masoori", demand: 800, supply: 850, gap: 50 },
  { product: "IR64", demand: 600, supply: 580, gap: -20 },
  { product: "Broken Rice", demand: 400, supply: 420, gap: 20 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function ProductionPlanningPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Production Planning</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Target className="mr-2 h-4 w-4" />
            Create Plan
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="capacity">Capacity Planning</TabsTrigger>
          <TabsTrigger value="demand">Demand Forecast</TabsTrigger>
          <TabsTrigger value="schedule">Production Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Target</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,400 MT</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Production</CardTitle>
                <Factory className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,250 MT</div>
                <p className="text-xs text-muted-foreground">96% of target</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Efficiency Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">96%</div>
                <p className="text-xs text-muted-foreground">+2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Mills</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4/4</div>
                <p className="text-xs text-muted-foreground">All operational</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Production vs Target</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={productionPlan}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="planned" fill="#8884d8" name="Planned" />
                    <Bar dataKey="actual" fill="#82ca9d" name="Actual" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Mill Capacity Utilization</CardTitle>
                <CardDescription>Current utilization across all mills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {capacityData.map((mill) => (
                    <div key={mill.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">{mill.name}</Label>
                        <span className="text-sm text-muted-foreground">{mill.utilized}%</span>
                      </div>
                      <Progress value={mill.utilized} className="w-full" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="capacity" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Capacity Planning</CardTitle>
                <CardDescription>Plan production capacity for upcoming periods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="period">Planning Period</Label>
                    <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="target">Target Production (MT)</Label>
                    <Input id="target" placeholder="3400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product">Product Mix</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select product focus" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basmati">Basmati Focus</SelectItem>
                      <SelectItem value="sona">Sona Masoori Focus</SelectItem>
                      <SelectItem value="mixed">Mixed Production</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Update Capacity Plan</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resource Allocation</CardTitle>
                <CardDescription>Allocate resources across production lines</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={capacityData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="utilized"
                    >
                      {capacityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="demand" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Demand Forecast Analysis</CardTitle>
              <CardDescription>Analyze demand patterns and supply gaps</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {demandForecast.map((item) => (
                  <div key={item.product} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{item.product}</p>
                      <p className="text-sm text-muted-foreground">
                        Demand: {item.demand} MT | Supply: {item.supply} MT
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {item.gap < 0 ? (
                        <Badge variant="destructive">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Shortage: {Math.abs(item.gap)} MT
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Surplus: {item.gap} MT
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Production Schedule</CardTitle>
              <CardDescription>Detailed production schedule for the next 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium">
                  <div>Mon</div>
                  <div>Tue</div>
                  <div>Wed</div>
                  <div>Thu</div>
                  <div>Fri</div>
                  <div>Sat</div>
                  <div>Sun</div>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 35 }, (_, i) => (
                    <div key={i} className="aspect-square p-2 border rounded-lg text-xs">
                      <div className="font-medium">{(i % 30) + 1}</div>
                      {i % 7 !== 0 && (
                        <div className="mt-1 space-y-1">
                          <div className="bg-blue-100 text-blue-800 px-1 rounded text-xs">Mill 1</div>
                          <div className="bg-green-100 text-green-800 px-1 rounded text-xs">Mill 2</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
