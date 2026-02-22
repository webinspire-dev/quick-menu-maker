import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { DollarSign, ShoppingCart, TrendingUp, Users, Download, FileText, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const dailyRevenue = [
  { day: "Mon", revenue: 1240 }, { day: "Tue", revenue: 1580 },
  { day: "Wed", revenue: 1120 }, { day: "Thu", revenue: 1890 },
  { day: "Fri", revenue: 2450 }, { day: "Sat", revenue: 2780 },
  { day: "Sun", revenue: 2100 },
];

const posSales = [
  { pos: "POS 1 – Main", orders: 45, revenue: "€2,340", avg: "€52.00" },
  { pos: "POS 2 – Terrace", orders: 32, revenue: "€1,654", avg: "€51.69" },
  { pos: "POS 3 – Bar", orders: 28, revenue: "€890", avg: "€31.79" },
];

const serverSales = [
  { name: "Ahmed K.", orders: 38, revenue: "€1,890", tips: "€124.00" },
  { name: "Marie L.", orders: 42, revenue: "€2,120", tips: "€165.00" },
  { name: "Jean P.", orders: 25, revenue: "€874", tips: "€68.00" },
];

const peakHours = [
  { hour: "11:00", orders: 8 }, { hour: "12:00", orders: 22 },
  { hour: "13:00", orders: 28 }, { hour: "14:00", orders: 15 },
  { hour: "15:00", orders: 6 }, { hour: "16:00", orders: 4 },
  { hour: "17:00", orders: 5 }, { hour: "18:00", orders: 12 },
  { hour: "19:00", orders: 25 }, { hour: "20:00", orders: 32 },
  { hour: "21:00", orders: 20 }, { hour: "22:00", orders: 10 },
];

export default function POSReports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">POS Reports</h1>
          <p className="text-sm text-muted-foreground">Sales tracking & end-of-day reports</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2">
            <Input type="date" className="rounded-xl h-9 text-sm w-36" defaultValue="2026-02-22" />
            <span className="text-muted-foreground text-sm">to</span>
            <Input type="date" className="rounded-xl h-9 text-sm w-36" defaultValue="2026-02-22" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="rounded-xl h-9 w-36"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All POS</SelectItem>
              <SelectItem value="pos1">POS 1</SelectItem>
              <SelectItem value="pos2">POS 2</SelectItem>
              <SelectItem value="pos3">POS 3</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="rounded-xl gap-1.5">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
          <Button variant="outline" size="sm" className="rounded-xl gap-1.5">
            <FileText className="w-4 h-4" /> Z Report
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Sales Today", value: "€4,884.00", icon: DollarSign, change: "+12.5%", color: "bg-primary/10 text-primary" },
          { label: "Total Orders", value: "105", icon: ShoppingCart, change: "+8.2%", color: "bg-emerald-100 text-emerald-600" },
          { label: "Avg Order Value", value: "€46.51", icon: TrendingUp, change: "+3.1%", color: "bg-blue-100 text-blue-600" },
          { label: "Active Servers", value: "3", icon: Users, change: "", color: "bg-amber-100 text-amber-600" },
        ].map(kpi => (
          <Card key={kpi.label} className="rounded-2xl shadow-card border-0">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", kpi.color)}>
                  <kpi.icon className="w-5 h-5" />
                </div>
                {kpi.change && <Badge className="bg-emerald-100 text-emerald-700 border-0 text-xs">{kpi.change}</Badge>}
              </div>
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
              <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-2xl shadow-card border-0">
          <CardHeader><CardTitle className="text-base">Daily Revenue</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={dailyRevenue}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="day" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={v => `€${v}`} />
                <Tooltip formatter={(v: number) => [`€${v}`, "Revenue"]} />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-card border-0">
          <CardHeader><CardTitle className="text-base">Peak Hours</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={peakHours}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="hour" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3, fill: "hsl(var(--primary))" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Sales by POS */}
      <Card className="rounded-2xl shadow-card border-0">
        <CardHeader><CardTitle className="text-base">Sales by POS Terminal</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Terminal</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Avg Order</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posSales.map(p => (
                <TableRow key={p.pos}>
                  <TableCell className="font-semibold">{p.pos}</TableCell>
                  <TableCell>{p.orders}</TableCell>
                  <TableCell className="font-semibold">{p.revenue}</TableCell>
                  <TableCell>{p.avg}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Sales by Server */}
      <Card className="rounded-2xl shadow-card border-0">
        <CardHeader><CardTitle className="text-base">Sales by Server</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Server</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Tips</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {serverSales.map(s => (
                <TableRow key={s.name}>
                  <TableCell className="font-semibold">{s.name}</TableCell>
                  <TableCell>{s.orders}</TableCell>
                  <TableCell className="font-semibold">{s.revenue}</TableCell>
                  <TableCell>{s.tips}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
