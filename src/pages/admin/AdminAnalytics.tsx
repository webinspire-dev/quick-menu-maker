import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, Users, BarChart3 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const revenueData = [
  { month: "Sep", mrr: 18200 }, { month: "Oct", mrr: 21400 },
  { month: "Nov", mrr: 24100 }, { month: "Dec", mrr: 26800 },
  { month: "Jan", mrr: 28400 }, { month: "Feb", mrr: 31200 },
];

const growthData = [
  { month: "Sep", restaurants: 980 }, { month: "Oct", restaurants: 1050 },
  { month: "Nov", restaurants: 1120 }, { month: "Dec", restaurants: 1180 },
  { month: "Jan", restaurants: 1230 }, { month: "Feb", restaurants: 1284 },
];

const kpis = [
  { title: "MRR", value: "€31,200", change: "+18%", icon: DollarSign },
  { title: "Growth Rate", value: "4.4%", change: "+0.8%", icon: TrendingUp },
  { title: "Conversion Rate", value: "12.3%", change: "+2.1%", icon: BarChart3 },
  { title: "ARPU", value: "€24.30", change: "+€1.20", icon: Users },
];

export default function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground text-sm">Platform performance metrics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <Card key={k.title} className="border shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{k.title}</span>
                <k.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">{k.value}</p>
              <p className="text-xs text-[hsl(var(--admin-success))] font-medium mt-1">{k.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border shadow-sm">
          <CardHeader><CardTitle className="text-base">Monthly Recurring Revenue</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(24, 95%, 53%)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(24, 95%, 53%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={(v) => `€${v / 1000}k`} tick={{ fontSize: 12 }} />
                <Tooltip formatter={(v: number) => [`€${v.toLocaleString()}`, "MRR"]} />
                <Area type="monotone" dataKey="mrr" stroke="hsl(24, 95%, 53%)" fill="url(#mrrGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader><CardTitle className="text-base">Restaurant Growth</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="restaurants" stroke="hsl(142, 71%, 45%)" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
