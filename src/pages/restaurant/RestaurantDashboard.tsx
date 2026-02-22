import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, FolderOpen, ClipboardList, DollarSign, QrCode, Plus, Eye, ArrowUpRight, TrendingUp } from "lucide-react";

const kpis = [
  { label: "Total Products", value: "48", change: "+3", icon: ShoppingBag, color: "text-primary" },
  { label: "Categories", value: "8", change: "+1", icon: FolderOpen, color: "text-blue-500" },
  { label: "Orders Today", value: "23", change: "+12%", icon: ClipboardList, color: "text-emerald-500" },
  { label: "Revenue Today", value: "€342", change: "+18%", icon: DollarSign, color: "text-amber-500" },
  { label: "QR Scans", value: "156", change: "+24%", icon: QrCode, color: "text-violet-500" },
];

const recentOrders = [
  { id: "#1284", items: "Burger + Fries", total: "€14.50", status: "Preparing", time: "2 min ago" },
  { id: "#1283", items: "Pizza Margherita", total: "€11.00", status: "Ready", time: "8 min ago" },
  { id: "#1282", items: "Caesar Salad x2", total: "€19.00", status: "Completed", time: "15 min ago" },
  { id: "#1281", items: "Pasta Carbonara", total: "€13.50", status: "Completed", time: "22 min ago" },
];

const topProducts = [
  { name: "Classic Burger", orders: 45, revenue: "€540" },
  { name: "Margherita Pizza", orders: 38, revenue: "€418" },
  { name: "Caesar Salad", orders: 29, revenue: "€275" },
  { name: "Pasta Carbonara", orders: 24, revenue: "€324" },
];

const statusColors: Record<string, string> = {
  Preparing: "bg-amber-100 text-amber-700",
  Ready: "bg-emerald-100 text-emerald-700",
  Completed: "bg-muted text-muted-foreground",
  Pending: "bg-primary/10 text-primary",
};

export default function RestaurantDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="rounded-2xl shadow-card border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center ${kpi.color}`}>
                  <kpi.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-emerald-600 flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" /> {kpi.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{kpi.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Button className="rounded-xl gap-2 gradient-warm text-primary-foreground border-0 shadow-glow hover:opacity-90">
          <Plus className="w-4 h-4" /> Add Product
        </Button>
        <Button variant="outline" className="rounded-xl gap-2">
          <FolderOpen className="w-4 h-4" /> Add Category
        </Button>
        <Button variant="outline" className="rounded-xl gap-2">
          <QrCode className="w-4 h-4" /> Generate QR
        </Button>
        <Button variant="outline" className="rounded-xl gap-2">
          <Eye className="w-4 h-4" /> Preview Menu
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card className="rounded-2xl shadow-card border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Recent Orders</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs text-primary gap-1">
                View All <ArrowUpRight className="w-3 h-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">{order.id}</span>
                    <Badge className={`text-[10px] border-0 ${statusColors[order.status]}`}>{order.status}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{order.items}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">{order.total}</p>
                  <p className="text-[10px] text-muted-foreground">{order.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="rounded-2xl shadow-card border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Most Ordered Products</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topProducts.map((product, i) => (
              <div key={product.name} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                <span className="w-7 h-7 rounded-lg gradient-warm flex items-center justify-center text-xs font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.orders} orders</p>
                </div>
                <span className="text-sm font-semibold text-foreground">{product.revenue}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
