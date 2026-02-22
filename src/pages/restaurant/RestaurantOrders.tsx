import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Printer, Eye, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const orders = [
  {
    id: "#1284", time: "14:32", customer: "Table 4", items: [
      { name: "Classic Burger", options: "Big, Extra Cheese, BBQ", qty: 1, price: "€15.50" },
      { name: "French Fries", options: "Large", qty: 1, price: "€5.50" },
    ],
    total: "€21.00", status: "Pending",
  },
  {
    id: "#1283", time: "14:28", customer: "Table 2", items: [
      { name: "Margherita Pizza", options: "", qty: 2, price: "€22.00" },
    ],
    total: "€22.00", status: "Preparing",
  },
  {
    id: "#1282", time: "14:15", customer: "Table 7", items: [
      { name: "Caesar Salad", options: "No croutons", qty: 1, price: "€9.50" },
      { name: "Pasta Carbonara", options: "", qty: 1, price: "€13.50" },
    ],
    total: "€23.00", status: "Ready",
  },
  {
    id: "#1281", time: "13:58", customer: "Takeaway", items: [
      { name: "Tiramisu", options: "", qty: 3, price: "€21.00" },
    ],
    total: "€21.00", status: "Completed",
  },
];

const statusColors: Record<string, string> = {
  Pending: "bg-primary/10 text-primary",
  Preparing: "bg-amber-100 text-amber-700",
  Ready: "bg-emerald-100 text-emerald-700",
  Completed: "bg-muted text-muted-foreground",
};

const statusOptions = ["Pending", "Preparing", "Ready", "Completed"];

export default function RestaurantOrders() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Orders</h1>
          <p className="text-sm text-muted-foreground">Live order management</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-sm text-emerald-600">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Live
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="rounded-2xl shadow-card border-0">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-foreground">{order.id}</span>
                      <Badge className={cn("text-[10px] border-0", statusColors[order.status])}>
                        {order.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                      <Clock className="w-3 h-3" /> {order.time}
                      <span>•</span>
                      <span>{order.customer}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue={order.status}>
                    <SelectTrigger className="w-32 rounded-xl h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon" className="rounded-xl h-8 w-8">
                    <Printer className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {item.qty}x {item.name}
                      </p>
                      {item.options && (
                        <p className="text-xs text-muted-foreground">{item.options}</p>
                      )}
                    </div>
                    <span className="text-sm font-semibold text-foreground">{item.price}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="text-lg font-bold text-foreground">{order.total}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
