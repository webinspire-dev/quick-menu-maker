import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Plus, Edit2 } from "lucide-react";

const plans = [
  { name: "Free", price: "€0", users: 236, revenue: "€0", color: "bg-muted" },
  { name: "Basic", price: "€9/mo", users: 312, revenue: "€2,808", color: "bg-[hsl(var(--admin-info))]" },
  { name: "Pro", price: "€29/mo", users: 548, revenue: "€15,892", color: "bg-primary" },
  { name: "Enterprise", price: "€99/mo", users: 188, revenue: "€18,612", color: "bg-[hsl(var(--admin-success))]" },
];

const revenuePerPlan = [
  { plan: "Free", revenue: 0, users: 236 },
  { plan: "Basic", revenue: 2808, users: 312 },
  { plan: "Pro", revenue: 15892, users: 548 },
  { plan: "Enterprise", revenue: 18612, users: 188 },
];

export default function AdminSubscriptions() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Subscriptions</h1>
          <p className="text-muted-foreground text-sm">Manage plans and pricing</p>
        </div>
        <Button size="sm" className="gap-2"><Plus className="w-4 h-4" /> New Plan</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((p) => (
          <Card key={p.name} className="border shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="outline" className="text-xs">{p.name}</Badge>
                <Button variant="ghost" size="icon" className="h-7 w-7"><Edit2 className="w-3.5 h-3.5" /></Button>
              </div>
              <p className="text-2xl font-bold text-foreground">{p.price}</p>
              <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                <p>{p.users} active users</p>
                <p className="font-medium text-foreground">{p.revenue} MRR</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border shadow-sm">
        <CardHeader><CardTitle className="text-base">Revenue per Plan</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenuePerPlan}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="plan" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={(v) => `€${v / 1000}k`} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v: number) => [`€${v.toLocaleString()}`, "Revenue"]} />
              <Bar dataKey="revenue" fill="hsl(24, 95%, 53%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
