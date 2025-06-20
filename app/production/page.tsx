"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Factory, Gauge, AlertTriangle, CheckCircle, TrendingUp, Settings, Play, Pause, RotateCcw } from "lucide-react"

const productionData = [
  { time: "06:00", hulling: 8.5, polishing: 7.2, grading: 6.8, packaging: 6.5 },
  { time: "08:00", hulling: 9.2, polishing: 8.1, grading: 7.5, packaging: 7.2 },
  { time: "10:00", hulling: 9.8, polishing: 8.7, grading: 8.2, packaging: 7.9 },
  { time: "12:00", hulling: 8.9, polishing: 8.3, grading: 7.8, packaging: 7.6 },
  { time: "14:00", hulling: 9.5, polishing: 8.9, grading: 8.4, packaging: 8.1 },
  { time: "16:00", hulling: 9.1, polishing: 8.5, grading: 8.0, packaging: 7.8 },
]

const qualityData = [
  { name: "Grade A+", value: 45, color: "#10b981" },
  { name: "Grade A", value: 35, color: "#3b82f6" },
  { name: "Grade B+", value: 15, color: "#f59e0b" },
  { name: "Grade B", value: 5, color: "#ef4444" },
]

const equipmentData = [
  {
    id: "HM-001",
    name: "Hulling Machine #1",
    status: "Running",
    efficiency: 94,
    output: 8.5,
    temperature: 65,
    vibration: "Normal",
    lastMaintenance: "2024-02-15",
  },
  {
    id: "HM-002",
    name: "Hulling Machine #2",
    status: "Maintenance",
    efficiency: 0,
    output: 0,
    temperature: 25,
    vibration: "N/A",
    lastMaintenance: "2024-03-18",
  },
  {
    id: "PM-001",
    name: "Polishing Unit #1",
    status: "Running",
    efficiency: 91,
    output: 7.2,
    temperature: 58,
    vibration: "Normal",
    lastMaintenance: "2024-02-20",
  },
  {
    id: "GM-001",
    name: "Grading Machine",
    status: "Running",
    efficiency: 88,
    output: 6.8,
    temperature: 45,
    vibration: "High",
    lastMaintenance: "2024-02-10",
  },
  {
    id: "PL-001",
    name: "Packaging Line",
    status: "Running",
    efficiency: 96,
    output: 6.5,
    temperature: 35,
    vibration: "Normal",
    lastMaintenance: "2024-03-01",
  },
]

export default function ProductionPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Running":
        return <Badge className="bg-green-100 text-green-800">Running</Badge>
      case "Maintenance":
        return <Badge className="bg-red-100 text-red-800">Maintenance</Badge>
      case "Idle":
        return <Badge className="bg-yellow-100 text-yellow-800">Idle</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getVibrationBadge = (vibration: string) => {
    switch (vibration) {
      case "Normal":
        return <Badge className="bg-green-100 text-green-800">Normal</Badge>
      case "High":
        return <Badge className="bg-orange-100 text-orange-800">High</Badge>
      case "Critical":
        return <Badge className="bg-red-100 text-red-800">Critical</Badge>
      default:
        return <Badge variant="outline">{vibration}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Production Dashboard</h1>
          <p className="text-muted-foreground">Real-time production monitoring and control</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button>
            <TrendingUp className="h-4 w-4 mr-2" />
            Analytics
          </Button>
        </div>
      </div>

      {/* Production KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Production</CardTitle>
            <Factory className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28.5 MT</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5.2% from yesterday
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Efficiency</CardTitle>
            <Gauge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92.3%</div>
            <Progress value={92.3} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quality Score</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.7%</div>
            <p className="text-xs text-green-600">Above target (90%)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Equipment</CardTitle>
            <Factory className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4/5</div>
            <p className="text-xs text-muted-foreground">1 under maintenance</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
          <TabsTrigger value="quality">Quality</TabsTrigger>
          <TabsTrigger value="process">Process Flow</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Hourly Production Rate</CardTitle>
                <CardDescription>Production output by process stage</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={productionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="hulling" stroke="#10b981" name="Hulling" />
                    <Line type="monotone" dataKey="polishing" stroke="#3b82f6" name="Polishing" />
                    <Line type="monotone" dataKey="grading" stroke="#f59e0b" name="Grading" />
                    <Line type="monotone" dataKey="packaging" stroke="#ef4444" name="Packaging" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quality Distribution</CardTitle>
                <CardDescription>Rice grade distribution today</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={qualityData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {qualityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Production Targets */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Production Targets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Daily Target</span>
                    <span>28.5/35 MT</span>
                  </div>
                  <Progress value={81.4} />
                  <p className="text-xs text-muted-foreground">81.4% completed</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Quality Tests</span>
                    <span>24/30</span>
                  </div>
                  <Progress value={80} />
                  <p className="text-xs text-muted-foreground">80% completed</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Packaging</span>
                    <span>570/700 bags</span>
                  </div>
                  <Progress value={81.4} />
                  <p className="text-xs text-muted-foreground">81.4% completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="equipment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Equipment Status</CardTitle>
              <CardDescription>Real-time monitoring of production equipment</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Equipment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Efficiency</TableHead>
                    <TableHead>Output (MT/h)</TableHead>
                    <TableHead>Temperature (°C)</TableHead>
                    <TableHead>Vibration</TableHead>
                    <TableHead>Last Maintenance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {equipmentData.map((equipment) => (
                    <TableRow key={equipment.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{equipment.name}</div>
                          <div className="text-sm text-muted-foreground">{equipment.id}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(equipment.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${equipment.efficiency}%` }}
                            />
                          </div>
                          <span className="text-sm">{equipment.efficiency}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{equipment.output}</TableCell>
                      <TableCell>
                        <span className={equipment.temperature > 70 ? "text-red-600" : "text-green-600"}>
                          {equipment.temperature}°C
                        </span>
                      </TableCell>
                      <TableCell>{getVibrationBadge(equipment.vibration)}</TableCell>
                      <TableCell>{equipment.lastMaintenance}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {equipment.status === "Running" ? (
                            <Button variant="ghost" size="sm">
                              <Pause className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button variant="ghost" size="sm">
                              <Play className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Equipment Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Equipment Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <p className="font-medium text-red-800">Hulling Machine #2 - Maintenance Required</p>
                  <p className="text-sm text-red-600">Scheduled maintenance overdue by 3 days</p>
                </div>
                <Badge variant="destructive">Critical</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div>
                  <p className="font-medium text-orange-800">Grading Machine - High Vibration</p>
                  <p className="text-sm text-orange-600">Vibration levels above normal threshold</p>
                </div>
                <Badge variant="secondary">Warning</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-medium text-yellow-800">Polishing Unit #1 - Temperature Alert</p>
                  <p className="text-sm text-yellow-600">Operating temperature slightly elevated</p>
                </div>
                <Badge variant="outline">Info</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Moisture Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12.3%</div>
                <p className="text-xs text-green-600">Within limits (≤14%)</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Broken Rice</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.2%</div>
                <p className="text-xs text-green-600">Below target (≤5%)</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Foreign Matter</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0.1%</div>
                <p className="text-xs text-green-600">Excellent (≤0.5%)</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Color Grade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">A+</div>
                <p className="text-xs text-green-600">Premium quality</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quality Test Results</CardTitle>
              <CardDescription>Recent quality control test results</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Batch ID</TableHead>
                    <TableHead>Test Time</TableHead>
                    <TableHead>Moisture %</TableHead>
                    <TableHead>Broken %</TableHead>
                    <TableHead>Foreign Matter %</TableHead>
                    <TableHead>Color Grade</TableHead>
                    <TableHead>Overall Grade</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">QC-2024-156</TableCell>
                    <TableCell>14:30</TableCell>
                    <TableCell>12.1%</TableCell>
                    <TableCell>2.8%</TableCell>
                    <TableCell>0.1%</TableCell>
                    <TableCell>A+</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">A+</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">Passed</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">QC-2024-157</TableCell>
                    <TableCell>15:00</TableCell>
                    <TableCell>13.2%</TableCell>
                    <TableCell>3.5%</TableCell>
                    <TableCell>0.2%</TableCell>
                    <TableCell>A</TableCell>
                    <TableCell>
                      <Badge className="bg-blue-100 text-blue-800">A</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">Passed</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">QC-2024-158</TableCell>
                    <TableCell>15:30</TableCell>
                    <TableCell>14.8%</TableCell>
                    <TableCell>4.2%</TableCell>
                    <TableCell>0.3%</TableCell>
                    <TableCell>B+</TableCell>
                    <TableCell>
                      <Badge className="bg-orange-100 text-orange-800">B+</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-red-100 text-red-800">Failed</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="process" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Production Process Flow</CardTitle>
              <CardDescription>Real-time status of each production stage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Process Flow Diagram */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Factory className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Paddy Intake</h3>
                      <p className="text-sm text-muted-foreground">Raw material receiving</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">45.2 MT</div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="w-px h-8 bg-gray-300"></div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Settings className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Cleaning & Sorting</h3>
                      <p className="text-sm text-muted-foreground">Impurity removal</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">42.8 MT</div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="w-px h-8 bg-gray-300"></div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Gauge className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Hulling Process</h3>
                      <p className="text-sm text-muted-foreground">Husk removal</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">35.6 MT</div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="w-px h-8 bg-gray-300"></div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Polishing Stage</h3>
                      <p className="text-sm text-muted-foreground">Surface polishing</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">32.1 MT</div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="w-px h-8 bg-gray-300"></div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <Factory className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Grading & Packaging</h3>
                      <p className="text-sm text-muted-foreground">Final processing</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">28.5 MT</div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
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
