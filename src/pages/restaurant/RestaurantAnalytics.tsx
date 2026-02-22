import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, ShoppingBag, QrCode, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, LineChart, Line } from "recharts";

const revenueData = [
  { day: "Mon", revenue: 120 }, { day: "Tue", revenue: 180 },
  { day: "Wed", revenue: 150 }, { day: "Thu", revenue: 220 },
  { day: "Fri", revenue: 310 }, { day: "Sat", revenue: 420 },
  { day: "Sun", revenue: 380 },
];

const ordersData = [
  { day: "Mon", orders: 12 }, { day: "Tue", orders: 18 },
  { day: "Wed", orders: 15 }, { day: "Thu", orders: 22 },
  { day: "Fri", orders: 31 }, { day: "Sat", orders: 42 },
  { day: "Sun", orders: 38 },
];

const topProducts = [
  { name: "Classic Burger", orders: 45, pct: 90 },
  { name: "Margherita Pizza", orders: 38, pct: 76 },
  { name: "Caesar Salad", orders: 29, pct: 58 },
  { name: "Pasta Carbonara", orders: 24, pct: 48 },
  { name: "Tiramisu", orders: 18, pct: 36 },
];

const peakHours = [
  { hour: "11h", orders: 5 }, { hour: "12h", orders: 22 },
  { hour: "13h", orders: 18 }, { hour: "14h", orders: 8 },
  { hour: "18h", orders: 12 }, { hour: "19h", orders: 28 },
  { hour: "20h", orders: 35 }, { hour: "21h", orders: 25 },
  { hour: "22h", orders: 10 },
];

const kpis = [
  { label: "Revenue (Week)", value: "€1,780", change: "+18%", icon: DollarSign },
  { label: "Total Orders", value: "178", change: "+12%", icon: ShoppingBag },
  { label: "QR Scans", value: "532", change: "+24%", icon: QrCode },
  { label: "Avg. Order", value: "€16.20", change: "+5%", icon: TrendingUp },
];

export default function RestaurantAnalytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground">Track your restaurant performance</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="rounded-2xl shadow-card border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <kpi.icon className="w-5 h-5 text-primary" />
                <span className="text-xs font-medium text-emerald-600">{kpi.change}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="rounded-2xl shadow-card border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Revenue (This Week)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-card border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Peak Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={peakHours}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="hour" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl shadow-card border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Most Ordered Products</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {topProducts.map((p) => (
            <div key={p.name} className="flex items-center gap-3">
              <span className="w-32 text-sm font-medium text-foreground truncate">{p.name}</span>
              <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                <div className="h-full gradient-warm rounded-full" style={{ width: `${p.pct}%` }} />
              </div>
              <span className="text-sm font-semibold text-foreground w-12 text-right">{p.orders}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
