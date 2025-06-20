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
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, XCircle, Award, FileText, Calendar, TrendingUp } from "lucide-react"
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

const qualityMetrics = [
  { month: "Jan", passRate: 96, defectRate: 4, reworkRate: 2 },
  { month: "Feb", passRate: 97, defectRate: 3, reworkRate: 1.5 },
  { month: "Mar", passRate: 95, defectRate: 5, reworkRate: 2.5 },
  { month: "Apr", passRate: 98, defectRate: 2, reworkRate: 1 },
  { month: "May", passRate: 97, defectRate: 3, reworkRate: 1.5 },
  { month: "Jun", passRate: 99, defectRate: 1, reworkRate: 0.5 },
]

const testResults = [
  {
    id: "QT001",
    batchId: "B2024-001",
    product: "Basmati Rice",
    testDate: "2024-01-15",
    status: "Passed",
    moisture: 12.5,
    brokenGrains: 2.1,
    chalkiness: 1.8,
    inspector: "Raj Kumar",
  },
  {
    id: "QT002",
    batchId: "B2024-002",
    product: "Sona Masoori",
    testDate: "2024-01-15",
    status: "Failed",
    moisture: 15.2,
    brokenGrains: 8.5,
    chalkiness: 4.2,
    inspector: "Priya Singh",
  },
  {
    id: "QT003",
    batchId: "B2024-003",
    product: "IR64",
    testDate: "2024-01-14",
    status: "Passed",
    moisture: 13.1,
    brokenGrains: 3.2,
    chalkiness: 2.1,
    inspector: "Amit Sharma",
  },
]

const defectTypes = [
  { name: "Broken Grains", value: 45, color: "#FF8042" },
  { name: "Discolored", value: 25, color: "#FFBB28" },
  { name: "Foreign Matter", value: 20, color: "#00C49F" },
  { name: "Chalky Grains", value: 10, color: "#0088FE" },
]

export default function QualityControlPage() {
  const [selectedBatch, setSelectedBatch] = useState("")

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Quality Control</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            New Test
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tests">Test Results</TabsTrigger>
          <TabsTrigger value="standards">Quality Standards</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">99%</div>
                <p className="text-xs text-muted-foreground">+2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Defect Rate</CardTitle>
                <XCircle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">1%</div>
                <p className="text-xs text-muted-foreground">-2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tests Today</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">18 passed, 6 pending</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
                <Award className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">A+</div>
                <p className="text-xs text-muted-foreground">Excellent rating</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Quality Trends</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={qualityMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="passRate" stroke="#22c55e" name="Pass Rate %" />
                    <Line type="monotone" dataKey="defectRate" stroke="#ef4444" name="Defect Rate %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Defect Analysis</CardTitle>
                <CardDescription>Distribution of defect types</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={defectTypes}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {defectTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Test Results</CardTitle>
              <CardDescription>Latest quality control test results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {testResults.map((test) => (
                  <div key={test.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium leading-none">{test.id}</p>
                        <Badge variant={test.status === "Passed" ? "default" : "destructive"}>
                          {test.status === "Passed" ? (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          ) : (
                            <XCircle className="w-3 h-3 mr-1" />
                          )}
                          {test.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {test.product} - Batch: {test.batchId}
                      </p>
                      <div className="flex space-x-4 text-xs text-muted-foreground">
                        <span>Moisture: {test.moisture}%</span>
                        <span>Broken: {test.brokenGrains}%</span>
                        <span>Chalky: {test.chalkiness}%</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{test.inspector}</p>
                      <p className="text-xs text-muted-foreground">{test.testDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="standards" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Quality Standards</CardTitle>
                <CardDescription>Current quality parameters and limits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Moisture Content</Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">Max: 14%</span>
                    <Progress value={85} className="flex-1" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Broken Grains</Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">Max: 5%</span>
                    <Progress value={60} className="flex-1" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Foreign Matter</Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">Max: 1%</span>
                    <Progress value={20} className="flex-1" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Chalky Grains</Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">Max: 3%</span>
                    <Progress value={40} className="flex-1" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Create Quality Test</CardTitle>
                <CardDescription>Record new quality control test</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="batch">Batch ID</Label>
                    <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select batch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="B2024-001">B2024-001</SelectItem>
                        <SelectItem value="B2024-002">B2024-002</SelectItem>
                        <SelectItem value="B2024-003">B2024-003</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product">Product</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basmati">Basmati Rice</SelectItem>
                        <SelectItem value="sona">Sona Masoori</SelectItem>
                        <SelectItem value="ir64">IR64</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="moisture">Moisture %</Label>
                    <Input id="moisture" placeholder="12.5" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="broken">Broken %</Label>
                    <Input id="broken" placeholder="2.1" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="chalky">Chalky %</Label>
                    <Input id="chalky" placeholder="1.8" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" placeholder="Additional observations..." />
                </div>
                <Button className="w-full">Submit Test Results</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quality Reports</CardTitle>
              <CardDescription>Generate and download quality control reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Button variant="outline" className="h-24 flex-col">
                  <FileText className="h-6 w-6 mb-2" />
                  Daily QC Report
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <Calendar className="h-6 w-6 mb-2" />
                  Monthly Summary
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <TrendingUp className="h-6 w-6 mb-2" />
                  Trend Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
