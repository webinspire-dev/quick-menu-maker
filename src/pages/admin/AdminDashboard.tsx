import {
  Store, Users, TrendingUp, TrendingDown, DollarSign, UserMinus, Activity, ArrowUpRight, ArrowDownRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const revenueData = [
  { month: "Jul", revenue: 12400 }, { month: "Aug", revenue: 15800 },
  { month: "Sep", revenue: 14200 }, { month: "Oct", revenue: 18600 },
  { month: "Nov", revenue: 22100 }, { month: "Dec", revenue: 25800 },
  { month: "Jan", revenue: 28400 }, { month: "Feb", revenue: 31200 },
];

const kpis = [
  { title: "Total Restaurants", value: "1,284", change: "+12%", up: true, icon: Store, color: "text-primary" },
  { title: "Active Subscriptions", value: "1,048", change: "+8%", up: true, icon: Users, color: "text-[hsl(var(--admin-success))]" },
  { title: "Monthly Revenue", value: "€31,200", change: "+18%", up: true, icon: DollarSign, color: "text-[hsl(var(--admin-info))]" },
  { title: "Free Users", value: "236", change: "-3%", up: false, icon: UserMinus, color: "text-[hsl(var(--admin-warning))]" },
];

const recentRestaurants = [
  { name: "La Belle Époque", owner: "Marie Dupont", plan: "Pro", date: "Today" },
  { name: "Sushi Master", owner: "Kenji Tanaka", plan: "Basic", date: "Today" },
  { name: "Pasta Roma", owner: "Luigi Rossi", plan: "Pro", date: "Yesterday" },
  { name: "Burger Lab", owner: "Alex Smith", plan: "Free", date: "Yesterday" },
  { name: "Café Parisien", owner: "Claire Martin", plan: "Enterprise", date: "2 days ago" },
];

const activityLog = [
  { action: "New restaurant registered", detail: "La Belle Époque", time: "2 min ago", type: "success" },
  { action: "Payment failed", detail: "Taco Loco - €29/mo", time: "15 min ago", type: "error" },
  { action: "Plan upgraded", detail: "Wok Express → Pro", time: "1h ago", type: "info" },
  { action: "Restaurant suspended", detail: "Pizza Palace", time: "3h ago", type: "warning" },
  { action: "New support ticket", detail: "#1284 - QR code issue", time: "4h ago", type: "info" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Platform overview and key metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title} className="border shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">{kpi.title}</span>
                <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
              </div>
              <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
              <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${kpi.up ? "text-[hsl(var(--admin-success))]" : "text-destructive"}`}>
                {kpi.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {kpi.change} vs last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Chart + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(24, 95%, 53%)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(24, 95%, 53%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(220, 10%, 46%)" }} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(220, 10%, 46%)" }} tickFormatter={(v) => `€${v / 1000}k`} />
                <Tooltip formatter={(v: number) => [`€${v.toLocaleString()}`, "Revenue"]} />
                <Area type="monotone" dataKey="revenue" stroke="hsl(24, 95%, 53%)" fill="url(#revenueGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activityLog.map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  item.type === "success" ? "bg-[hsl(var(--admin-success))]" :
                  item.type === "error" ? "bg-destructive" :
                  item.type === "warning" ? "bg-[hsl(var(--admin-warning))]" :
                  "bg-[hsl(var(--admin-info))]"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-foreground font-medium truncate">{item.action}</p>
                  <p className="text-muted-foreground text-xs">{item.detail}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* New Restaurants + Churn */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">New Restaurants This Week</CardTitle>
              <Badge variant="secondary" className="text-xs">+5</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentRestaurants.map((r, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{r.owner}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={r.plan === "Free" ? "outline" : r.plan === "Enterprise" ? "default" : "secondary"} className="text-xs">
                      {r.plan}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-0.5">{r.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Platform Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Churn Rate", value: "2.4%", desc: "Below industry avg (5%)", good: true },
              { label: "Uptime", value: "99.97%", desc: "Last 30 days", good: true },
              { label: "Avg Response Time", value: "142ms", desc: "API performance", good: true },
              { label: "Failed Payments", value: "12", desc: "Requires attention", good: false },
              { label: "Open Tickets", value: "3", desc: "Avg resolution: 4h", good: true },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <span className={`text-sm font-semibold ${item.good ? "text-[hsl(var(--admin-success))]" : "text-destructive"}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
