"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import {
  TrendingUp,
  DollarSign,
  Package,
  Users,
  Calculator,
  Eye,
  MessageSquare,
  Star,
  MapPin,
  Calendar,
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { format } from "date-fns"

const availableDOs = [
  {
    doNumber: "DO-2024-085",
    location: "Punjab Mandi #1",
    variety: "Basmati 1121",
    quantity: 200,
    quality: "A+",
    currentPrice: 2150,
    marketPrice: 2100,
    deadline: "2024-03-25",
    seller: "Punjab Procurement Agency",
    sellerRating: 4.8,
    profitPotential: 2.4,
  },
  {
    doNumber: "DO-2024-086",
    location: "Haryana Mandi #2",
    variety: "PR-106",
    quantity: 150,
    quality: "A",
    currentPrice: 2050,
    marketPrice: 2000,
    deadline: "2024-03-28",
    seller: "Haryana State Corp",
    sellerRating: 4.6,
    profitPotential: 2.5,
  },
  {
    doNumber: "DO-2024-087",
    location: "UP Mandi #3",
    variety: "Basmati 1509",
    quantity: 180,
    quality: "A+",
    currentPrice: 2200,
    marketPrice: 2150,
    deadline: "2024-03-30",
    seller: "UP Procurement Board",
    sellerRating: 4.7,
    profitPotential: 2.3,
  },
]

const marketPriceData = [
  { date: "Mar 1", basmati1121: 2080, pr106: 1980, basmati1509: 2130 },
  { date: "Mar 5", basmati1121: 2100, pr106: 2000, basmati1509: 2150 },
  { date: "Mar 10", basmati1121: 2120, pr106: 2020, basmati1509: 2170 },
  { date: "Mar 15", basmati1121: 2150, pr106: 2050, basmati1509: 2200 },
  { date: "Mar 20", basmati1121: 2180, pr106: 2080, basmati1509: 2230 },
]

const tradingOpportunities = [
  {
    type: "Price Arbitrage",
    description: "Basmati 1121 price difference between regions",
    potential: "₹50/quintal",
    confidence: "High",
    timeframe: "2-3 days",
  },
  {
    type: "Quality Premium",
    description: "A+ grade commanding premium in market",
    potential: "₹30/quintal",
    confidence: "Medium",
    timeframe: "1 week",
  },
  {
    type: "Seasonal Demand",
    description: "Festival season approaching, demand increasing",
    potential: "₹40/quintal",
    confidence: "High",
    timeframe: "2 weeks",
  },
]

const recentTransactions = [
  {
    id: "TXN-001",
    doNumber: "DO-2024-080",
    buyer: "Premium Rice Mills",
    seller: "Punjab Agency",
    quantity: 200,
    price: 2120,
    profit: 4800,
    date: "2024-03-18",
    status: "Completed",
  },
  {
    id: "TXN-002",
    doNumber: "DO-2024-081",
    buyer: "Export Corp Ltd",
    seller: "Haryana Corp",
    quantity: 150,
    price: 2080,
    profit: 3750,
    date: "2024-03-17",
    status: "Completed",
  },
  {
    id: "TXN-003",
    doNumber: "DO-2024-082",
    buyer: "Local Distributor",
    seller: "UP Board",
    quantity: 180,
    price: 2160,
    profit: 5400,
    date: "2024-03-16",
    status: "Completed",
  },
]

const buyerProfiles = [
  {
    name: "Premium Rice Mills",
    rating: 4.9,
    totalTransactions: 45,
    avgOrderSize: 220,
    paymentTerms: "15 days",
    preferredVarieties: ["Basmati 1121", "Basmati 1509"],
    creditLimit: "₹50,00,000",
  },
  {
    name: "Export Corp Ltd",
    rating: 4.7,
    totalTransactions: 32,
    avgOrderSize: 180,
    paymentTerms: "30 days",
    preferredVarieties: ["Basmati 1121", "PR-106"],
    creditLimit: "₹75,00,000",
  },
  {
    name: "Local Distributor",
    rating: 4.5,
    totalTransactions: 28,
    avgOrderSize: 150,
    paymentTerms: "7 days",
    preferredVarieties: ["PR-106", "Local varieties"],
    creditLimit: "₹25,00,000",
  },
]

export default function DOTradingPage() {
  const [selectedDO, setSelectedDO] = useState<any>(null)
  const [negotiationPrice, setNegotiationPrice] = useState("")
  const [selectedBuyer, setSelectedBuyer] = useState("")

  const calculateProfit = (quantity: number, buyPrice: number, sellPrice: number) => {
    return (sellPrice - buyPrice) * quantity * 10 // Convert to quintals
  }

  const getProfitColor = (profit: number) => {
    return profit > 0 ? "text-green-600" : "text-red-600"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">DO Trading Platform</h1>
          <p className="text-muted-foreground">Trade delivery orders and maximize profit opportunities</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calculator className="h-4 w-4 mr-2" />
            Profit Calculator
          </Button>
          <Button>
            <Package className="h-4 w-4 mr-2" />
            List DO for Sale
          </Button>
        </div>
      </div>

      {/* Trading Dashboard */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available DOs</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableDOs.length}</div>
            <p className="text-xs text-muted-foreground">Ready for trading</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹42.5L</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +3.2% from last week
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit Potential</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹1.2L</div>
            <p className="text-xs text-muted-foreground">Estimated from current DOs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Buyers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{buyerProfiles.length}</div>
            <p className="text-xs text-muted-foreground">Verified buyers online</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="marketplace" className="space-y-4">
        <TabsList>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="buyers">Buyer Profiles</TabsTrigger>
        </TabsList>

        <TabsContent value="marketplace" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Market Price Trends</CardTitle>
                <CardDescription>Price movements for major paddy varieties</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={marketPriceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => `₹${value}/quintal`} />
                    <Line type="monotone" dataKey="basmati1121" stroke="#10b981" name="Basmati 1121" />
                    <Line type="monotone" dataKey="pr106" stroke="#3b82f6" name="PR-106" />
                    <Line type="monotone" dataKey="basmati1509" stroke="#f59e0b" name="Basmati 1509" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trading Opportunities</CardTitle>
                <CardDescription>Current market opportunities for profit</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {tradingOpportunities.map((opportunity, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{opportunity.type}</h4>
                      <Badge variant={opportunity.confidence === "High" ? "default" : "secondary"}>
                        {opportunity.confidence}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{opportunity.description}</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600 font-medium">{opportunity.potential}</span>
                      <span className="text-muted-foreground">{opportunity.timeframe}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Available DOs for Trading</CardTitle>
              <CardDescription>Current delivery orders available in the marketplace</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>DO Number</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Variety</TableHead>
                    <TableHead>Quantity (MT)</TableHead>
                    <TableHead>Quality</TableHead>
                    <TableHead>Current Price</TableHead>
                    <TableHead>Market Price</TableHead>
                    <TableHead>Profit Potential</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Seller</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {availableDOs.map((doItem) => (
                    <TableRow key={doItem.doNumber}>
                      <TableCell className="font-medium">{doItem.doNumber}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          {doItem.location}
                        </div>
                      </TableCell>
                      <TableCell>{doItem.variety}</TableCell>
                      <TableCell>{doItem.quantity}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{doItem.quality}</Badge>
                      </TableCell>
                      <TableCell>₹{doItem.currentPrice}/Qt</TableCell>
                      <TableCell>₹{doItem.marketPrice}/Qt</TableCell>
                      <TableCell>
                        <span className={getProfitColor(doItem.profitPotential)}>
                          {doItem.profitPotential > 0 ? "+" : ""}
                          {doItem.profitPotential}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {format(new Date(doItem.deadline), "dd/MM/yyyy")}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">{doItem.seller}</div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            {doItem.sellerRating}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedDO(doItem)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Trade DO - {doItem.doNumber}</DialogTitle>
                                <DialogDescription>Negotiate and finalize the trade</DialogDescription>
                              </DialogHeader>
                              {selectedDO && <TradingModal doItem={selectedDO} />}
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4" />
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

        <TabsContent value="opportunities" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {tradingOpportunities.map((opportunity, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{opportunity.type}</CardTitle>
                  <Badge variant={opportunity.confidence === "High" ? "default" : "secondary"}>
                    {opportunity.confidence} Confidence
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{opportunity.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Potential Profit:</span>
                      <span className="font-medium text-green-600">{opportunity.potential}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Timeframe:</span>
                      <span className="font-medium">{opportunity.timeframe}</span>
                    </div>
                  </div>
                  <Button className="w-full">Explore Opportunity</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Profit Analysis</CardTitle>
              <CardDescription>Historical profit margins by variety and region</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={marketPriceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="basmati1121" fill="#10b981" name="Basmati 1121" />
                  <Bar dataKey="pr106" fill="#3b82f6" name="PR-106" />
                  <Bar dataKey="basmati1509" fill="#f59e0b" name="Basmati 1509" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>History of completed trades and their outcomes</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>DO Number</TableHead>
                    <TableHead>Buyer</TableHead>
                    <TableHead>Seller</TableHead>
                    <TableHead>Quantity (MT)</TableHead>
                    <TableHead>Price (₹/Qt)</TableHead>
                    <TableHead>Profit</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>{transaction.doNumber}</TableCell>
                      <TableCell>{transaction.buyer}</TableCell>
                      <TableCell>{transaction.seller}</TableCell>
                      <TableCell>{transaction.quantity}</TableCell>
                      <TableCell>₹{transaction.price}</TableCell>
                      <TableCell className="text-green-600">+₹{transaction.profit.toLocaleString()}</TableCell>
                      <TableCell>{format(new Date(transaction.date), "dd/MM/yyyy")}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">{transaction.status}</Badge>
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
                <CardTitle>Total Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">127</div>
                <p className="text-sm text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Total Profit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">₹4.2L</div>
                <p className="text-sm text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">94.5%</div>
                <p className="text-sm text-muted-foreground">Completed trades</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="buyers" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-1">
            {buyerProfiles.map((buyer, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{buyer.name}</CardTitle>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{buyer.rating}</span>
                        <span className="text-sm text-muted-foreground">({buyer.totalTransactions} transactions)</span>
                      </div>
                    </div>
                    <Button>Contact Buyer</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Avg Order Size</p>
                      <p className="text-lg font-semibold">{buyer.avgOrderSize} MT</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Payment Terms</p>
                      <p className="text-lg font-semibold">{buyer.paymentTerms}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Credit Limit</p>
                      <p className="text-lg font-semibold">{buyer.creditLimit}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Preferred Varieties</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {buyer.preferredVarieties.map((variety, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {variety}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function TradingModal({ doItem }: { doItem: any }) {
  const [negotiationPrice, setNegotiationPrice] = useState(doItem.currentPrice.toString())
  const [selectedBuyer, setSelectedBuyer] = useState("")
  const [quantity, setQuantity] = useState(doItem.quantity.toString())

  const calculateProfit = () => {
    const buyPrice = doItem.currentPrice
    const sellPrice = Number.parseFloat(negotiationPrice) || 0
    const qty = Number.parseFloat(quantity) || 0
    return (sellPrice - buyPrice) * qty * 10 // Convert to quintals
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>DO Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">DO Number:</span>
              <span className="font-medium">{doItem.doNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Location:</span>
              <span className="font-medium">{doItem.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Variety:</span>
              <span className="font-medium">{doItem.variety}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Quality:</span>
              <Badge variant="outline">{doItem.quality}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Available Quantity:</span>
              <span className="font-medium">{doItem.quantity} MT</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Current Price:</span>
              <span className="font-medium">₹{doItem.currentPrice}/Qt</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trading Interface</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="buyer">Select Buyer</Label>
              <Select value={selectedBuyer} onValueChange={setSelectedBuyer}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose buyer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="premium">Premium Rice Mills</SelectItem>
                  <SelectItem value="export">Export Corp Ltd</SelectItem>
                  <SelectItem value="local">Local Distributor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="quantity">Quantity (MT)</Label>
              <Input
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity"
              />
            </div>

            <div>
              <Label htmlFor="price">Negotiation Price (₹/Qt)</Label>
              <Input
                id="price"
                value={negotiationPrice}
                onChange={(e) => setNegotiationPrice(e.target.value)}
                placeholder="Enter your price"
              />
            </div>

            <div className="border rounded-lg p-3 bg-gray-50">
              <h4 className="font-medium mb-2">Profit Calculator</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Buy Price:</span>
                  <span>₹{doItem.currentPrice}/Qt</span>
                </div>
                <div className="flex justify-between">
                  <span>Sell Price:</span>
                  <span>₹{negotiationPrice}/Qt</span>
                </div>
                <div className="flex justify-between">
                  <span>Quantity:</span>
                  <span>{quantity} MT</span>
                </div>
                <div className="flex justify-between font-medium border-t pt-1">
                  <span>Estimated Profit:</span>
                  <span className={calculateProfit() > 0 ? "text-green-600" : "text-red-600"}>
                    ₹{calculateProfit().toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2 justify-end">
        <Button variant="outline">Save Draft</Button>
        <Button>Submit Offer</Button>
      </div>
    </div>
  )
}
