"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  Package,
  Truck,
  Factory,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  FileText,
  Users,
  Gauge,
  Target,
  Activity,
  BarChart3,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"

// Sample data for charts and widgets
const productionTrendData = [
  { day: "Mon", production: 285, target: 300, yield: 68.2 },
  { day: "Tue", production: 310, target: 300, yield: 69.1 },
  { day: "Wed", production: 295, target: 300, yield: 67.8 },
  { day: "Thu", production: 325, target: 300, yield: 70.2 },
  { day: "Fri", production: 340, target: 300, yield: 71.5 },
  { day: "Sat", production: 315, target: 300, yield: 68.9 },
  { day: "Sun", production: 280, target: 300, yield: 67.3 },
]

const transportationCostData = [
  { day: "Mon", ownTrucks: 12500, thirdParty: 18200 },
  { day: "Tue", ownTrucks: 13800, thirdParty: 19500 },
  { day: "Wed", ownTrucks: 11200, thirdParty: 17800 },
  { day: "Thu", ownTrucks: 14500, thirdParty: 20100 },
  { day: "Fri", ownTrucks: 15200, thirdParty: 21300 },
  { day: "Sat", ownTrucks: 13100, thirdParty: 18900 },
  { day: "Sun", ownTrucks: 10800, thirdParty: 16500 },
]

const revenueBreakdownData = [
  { name: "Government Sales", value: 65, amount: 812500, color: "#10b981" },
  { name: "Private Sales", value: 25, amount: 312500, color: "#3b82f6" },
  { name: "Byproduct Sales", value: 10, amount: 125000, color: "#f59e0b" },
]

const supplierPaymentData = [
  { name: "Paid", value: 72, color: "#10b981" },
  { name: "Pending", value: 18, color: "#f59e0b" },
  { name: "Overdue", value: 10, color: "#ef4444" },
]

const byproductData = [
  { time: "06:00", bran: 12, husk: 15, brokenRice: 8 },
  { time: "09:00", bran: 15, husk: 18, brokenRice: 10 },
  { time: "12:00", bran: 18, husk: 22, brokenRice: 12 },
  { time: "15:00", bran: 16, husk: 20, brokenRice: 11 },
  { time: "18:00", bran: 14, husk: 17, brokenRice: 9 },
]

const recentActivities = [
  {
    id: 1,
    action: "New DO Created",
    details: "DO-2024-089 for 250 MT Basmati",
    time: "2 minutes ago",
    type: "success",
  },
  {
    id: 2,
    action: "Agreement Synced",
    details: "AGR-2024-003 updated from portal",
    time: "15 minutes ago",
    type: "info",
  },
  { id: 3, action: "Payment Received", details: "₹4,25,000 from Government", time: "1 hour ago", type: "success" },
  { id: 4, action: "Maintenance Completed", details: "Hulling Machine #2 serviced", time: "2 hours ago", type: "info" },
  {
    id: 5,
    action: "Quality Test Failed",
    details: "Batch QC-2024-158 moisture high",
    time: "3 hours ago",
    type: "warning",
  },
]

export default function DashboardPage() {
  const [userRole, setUserRole] = useState<string>("")

  useEffect(() => {
    const role = localStorage.getItem("userRole") || "operator"
    setUserRole(role)
  }, [])

  const getDashboardContent = () => {
    switch (userRole) {
      case "admin":
        return <ExecutiveDashboard />
      case "manager":
        return <ManagerDashboard />
      case "operator":
        return <OperationalDashboard />
      case "accounts":
        return <AccountsDashboard />
      default:
        return <OperationalDashboard />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {userRole === "admin"
              ? "Executive Dashboard"
              : userRole === "manager"
                ? "Manager Dashboard"
                : userRole === "operator"
                  ? "Operations Dashboard"
                  : "Financial Dashboard"}
          </h1>
          <p className="text-muted-foreground">
            {userRole === "admin"
              ? "Complete overview of rice mill operations"
              : userRole === "manager"
                ? "Production & Financial Overview"
                : userRole === "operator"
                  ? "Production Line & Quality Control"
                  : "Financial Overview & Compliance"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Create New DO
          </Button>
          <Button variant="outline">
            <Truck className="h-4 w-4 mr-2" />
            Schedule Transportation
          </Button>
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button variant="outline">
            <CheckCircle className="h-4 w-4 mr-2" />
            Enter Quality Test
          </Button>
        </div>
      </div>

      {getDashboardContent()}
    </div>
  )
}

function ExecutiveDashboard() {
  return (
    <>
      {/* Production KPIs - Top Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Rice Production</CardTitle>
            <Factory className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">325 MT</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8.3% from yesterday
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yield Percentage</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68.5%</div>
            <p className="text-xs text-muted-foreground">Rice/Paddy Ratio</p>
            <Progress value={68.5} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Byproduct Generation</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Bran:</span>
                <span className="font-medium">18 MT</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Husk:</span>
                <span className="font-medium">22 MT</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Broken Rice:</span>
                <span className="font-medium">12 MT</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Equipment Utilization</CardTitle>
            <Gauge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">4/5 machines active</span>
            </p>
            <Progress value={92} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Financial Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹12,50,000</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +15.2% from yesterday
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing Charges</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-green-600">₹4,75,000</div>
            <p className="text-xs text-muted-foreground">Collected</p>
            <div className="text-lg font-bold text-orange-600">₹6,00,000</div>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Byproduct Sales</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹85,000</div>
            <p className="text-xs text-muted-foreground">Today's revenue</p>
            <div className="text-sm text-green-600 mt-1">Bran: ₹45K | Husk: ₹40K</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transportation Cost</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-green-600">₹13,800</div>
            <p className="text-xs text-muted-foreground">Own trucks</p>
            <div className="text-lg font-bold text-red-600">₹19,500</div>
            <p className="text-xs text-muted-foreground">Third-party</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Production Trends</CardTitle>
            <CardDescription>Daily production vs target with yield percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productionTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="target" fill="#e2e8f0" name="Target (MT)" />
                <Bar yAxisId="left" dataKey="production" fill="#10b981" name="Actual (MT)" />
                <Line yAxisId="right" type="monotone" dataKey="yield" stroke="#f59e0b" name="Yield %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Breakdown</CardTitle>
            <CardDescription>Today's revenue by segment</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={revenueBreakdownData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {revenueBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name, props) => [`₹${props.payload.amount.toLocaleString()}`, name]} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Transportation Cost Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Transportation Cost Comparison</CardTitle>
          <CardDescription>Own trucks vs third-party costs over the last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={transportationCostData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
              <Bar dataKey="ownTrucks" fill="#10b981" name="Own Trucks" />
              <Bar dataKey="thirdParty" fill="#ef4444" name="Third Party" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Procurement Status */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active DOs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7 / 22</div>
            <p className="text-xs text-muted-foreground">Active / Total</p>
            <Progress value={32} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Collection</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">560 MT</div>
            <p className="text-xs text-muted-foreground">Paddy pending collection</p>
            <div className="text-sm text-orange-600 mt-1">15 locations</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Agreement Compliance</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">Overall completion</p>
            <Progress value={87} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Supplier Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={120}>
              <RechartsPieChart>
                <Pie
                  data={supplierPaymentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={20}
                  outerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {supplierPaymentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="text-xs space-y-1 mt-2">
              <div className="flex justify-between">
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>Paid
                </span>
                <span>72%</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></div>Pending
                </span>
                <span>18%</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>Overdue
                </span>
                <span>10%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Byproduct Generation Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Byproduct Generation Trends</CardTitle>
          <CardDescription>Hourly byproduct generation throughout the day</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={byproductData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="bran" stackId="1" stroke="#10b981" fill="#10b981" name="Bran (MT)" />
              <Area type="monotone" dataKey="husk" stackId="1" stroke="#3b82f6" fill="#3b82f6" name="Husk (MT)" />
              <Area
                type="monotone"
                dataKey="brokenRice"
                stackId="1"
                stroke="#f59e0b"
                fill="#f59e0b"
                name="Broken Rice (MT)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bottom Row - Alerts and Activities */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Operational Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div>
                <p className="font-medium text-red-800">Equipment Maintenance Due</p>
                <p className="text-sm text-red-600">Rice Polisher #2 scheduled for maintenance in 2 days</p>
              </div>
              <Badge variant="destructive">Critical</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div>
                <p className="font-medium text-orange-800">Quality Failure</p>
                <p className="text-sm text-orange-600">Batch #237 failed moisture test - 15.2% (limit: 14%)</p>
              </div>
              <Badge variant="secondary">Warning</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium text-yellow-800">Stock Level Warning</p>
                <p className="text-sm text-yellow-600">Raw paddy below reorder level - 45 MT remaining</p>
              </div>
              <Badge variant="outline">Info</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div>
                <p className="font-medium text-red-800">Payment Delay</p>
                <p className="text-sm text-red-600">Govt. invoice #456 overdue by 10 days - ₹2,85,000</p>
              </div>
              <Badge variant="destructive">Urgent</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              Recent Activity Feed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === "success"
                        ? "bg-green-500"
                        : activity.type === "warning"
                          ? "bg-orange-500"
                          : "bg-blue-500"
                    }`}
                  ></div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.details}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
            <Button className="justify-start" variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Create New DO
            </Button>
            <Button className="justify-start" variant="outline">
              <Truck className="h-4 w-4 mr-2" />
              Schedule Transportation
            </Button>
            <Button className="justify-start" variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Generate Reports
            </Button>
            <Button className="justify-start" variant="outline">
              <CheckCircle className="h-4 w-4 mr-2" />
              Enter Quality Test
            </Button>
            <Button className="justify-start" variant="outline">
              <Package className="h-4 w-4 mr-2" />
              Add New Agreement
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

function ManagerDashboard() {
  return (
    <>
      {/* Manager KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Production</CardTitle>
            <Factory className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">325 MT</div>
            <Progress value={108} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">108% of target achieved</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quality Score</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-green-600">+2.1% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing Margin</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹2,850/MT</div>
            <p className="text-xs text-green-600">+5.2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Equipment Efficiency</CardTitle>
            <Gauge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">91%</div>
            <p className="text-xs text-muted-foreground">4 machines running optimally</p>
          </CardContent>
        </Card>
      </div>

      {/* Production and Financial Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Production Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productionTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="production" fill="#10b981" />
                <Bar dataKey="target" fill="#e2e8f0" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={revenueBreakdownData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {revenueBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Compliance and Audit Shortcuts */}
      <Card>
        <CardHeader>
          <CardTitle>Management Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            <Button className="justify-start" variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Compliance Reports
            </Button>
            <Button className="justify-start" variant="outline">
              <Activity className="h-4 w-4 mr-2" />
              Audit Logs
            </Button>
            <Button className="justify-start" variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Team Performance
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

function OperationalDashboard() {
  return (
    <>
      {/* Operator KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Production Line Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Hulling Machine #1</span>
              <Badge className="bg-green-100 text-green-800">Running</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Polishing Unit #1</span>
              <Badge className="bg-green-100 text-green-800">Running</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Grading Machine</span>
              <Badge className="bg-red-100 text-red-800">Maintenance</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Packaging Line</span>
              <Badge className="bg-green-100 text-green-800">Running</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quality Checkpoints</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Moisture Content</span>
              <Badge variant="outline">12.5%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Broken Rice %</span>
              <Badge variant="outline">3.2%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Foreign Matter</span>
              <Badge className="bg-green-100 text-green-800">0.1%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Color Grade</span>
              <Badge className="bg-green-100 text-green-800">A+</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Targets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm">
                <span>Production Target</span>
                <span>325/300 MT</span>
              </div>
              <Progress value={108} className="mt-1" />
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Quality Tests</span>
                <span>24/30</span>
              </div>
              <Progress value={80} className="mt-1" />
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Packaging</span>
                <span>650/600 bags</span>
              </div>
              <Progress value={108} className="mt-1" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Equipment Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle>Equipment Monitoring</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Hulling Machine #1</h4>
              <div className="mt-2 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Efficiency:</span>
                  <span className="text-green-600">94%</span>
                </div>
                <div className="flex justify-between">
                  <span>Temperature:</span>
                  <span>65°C</span>
                </div>
                <div className="flex justify-between">
                  <span>Output:</span>
                  <span>8.5 MT/h</span>
                </div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Polishing Unit #1</h4>
              <div className="mt-2 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Efficiency:</span>
                  <span className="text-green-600">91%</span>
                </div>
                <div className="flex justify-between">
                  <span>Temperature:</span>
                  <span>58°C</span>
                </div>
                <div className="flex justify-between">
                  <span>Output:</span>
                  <span>7.2 MT/h</span>
                </div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Grading Machine</h4>
              <div className="mt-2 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Status:</span>
                  <Badge className="bg-red-100 text-red-800">Maintenance</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Last Service:</span>
                  <span>2024-02-10</span>
                </div>
                <div className="flex justify-between">
                  <span>Next Service:</span>
                  <span>2024-03-20</span>
                </div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Packaging Line</h4>
              <div className="mt-2 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Efficiency:</span>
                  <span className="text-green-600">96%</span>
                </div>
                <div className="flex justify-between">
                  <span>Speed:</span>
                  <span>25 bags/min</span>
                </div>
                <div className="flex justify-between">
                  <span>Output:</span>
                  <span>6.5 MT/h</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

function AccountsDashboard() {
  return (
    <>
      {/* Financial KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding Receivables</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹12,45,000</div>
            <p className="text-xs text-muted-foreground">Avg collection: 28 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payables</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹8,75,000</div>
            <p className="text-xs text-muted-foreground">Due in 15 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹3,25,000</div>
            <p className="text-xs text-green-600">+8.2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cash Flow</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹5,85,000</div>
            <p className="text-xs text-muted-foreground">Available balance</p>
          </CardContent>
        </Card>
      </div>

      {/* Financial Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={revenueBreakdownData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {revenueBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={supplierPaymentData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {supplierPaymentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Compliance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-4">
            <Button className="justify-start" variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              GST Returns
            </Button>
            <Button className="justify-start" variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Financial Reports
            </Button>
            <Button className="justify-start" variant="outline">
              <DollarSign className="h-4 w-4 mr-2" />
              Tax Calculations
            </Button>
            <Button className="justify-start" variant="outline">
              <CheckCircle className="h-4 w-4 mr-2" />
              Audit Trail
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
