import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, AlertTriangle, RotateCcw, CheckCircle } from "lucide-react";

const payments = [
  { id: "INV-001", restaurant: "La Belle Époque", amount: "€29", date: "Feb 22, 2026", status: "Paid", method: "Visa •••• 4242" },
  { id: "INV-002", restaurant: "Sushi Master", amount: "€99", date: "Feb 22, 2026", status: "Paid", method: "Mastercard •••• 8888" },
  { id: "INV-003", restaurant: "Taco Loco", amount: "€29", date: "Feb 21, 2026", status: "Failed", method: "Visa •••• 1234" },
  { id: "INV-004", restaurant: "Wok Express", amount: "€29", date: "Feb 20, 2026", status: "Paid", method: "Visa •••• 5678" },
  { id: "INV-005", restaurant: "Pizza Palace", amount: "€9", date: "Feb 20, 2026", status: "Refunded", method: "Mastercard •••• 9012" },
  { id: "INV-006", restaurant: "Café Parisien", amount: "€99", date: "Feb 19, 2026", status: "Paid", method: "Amex •••• 3456" },
];

const kpis = [
  { title: "Total Collected", value: "€31,200", icon: DollarSign, color: "text-[hsl(var(--admin-success))]" },
  { title: "Failed Payments", value: "12", icon: AlertTriangle, color: "text-destructive" },
  { title: "Refunds", value: "€340", icon: RotateCcw, color: "text-[hsl(var(--admin-warning))]" },
  { title: "Success Rate", value: "97.2%", icon: CheckCircle, color: "text-[hsl(var(--admin-info))]" },
];

export default function AdminPayments() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Payments</h1>
        <p className="text-muted-foreground text-sm">Payment history and transactions</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <Card key={k.title} className="border shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{k.title}</span>
                <k.icon className={`w-5 h-5 ${k.color}`} />
              </div>
              <p className="text-2xl font-bold text-foreground">{k.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border shadow-sm">
        <CardHeader><CardTitle className="text-base">Recent Transactions</CardTitle></CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Restaurant</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-mono text-sm">{p.id}</TableCell>
                <TableCell className="font-medium">{p.restaurant}</TableCell>
                <TableCell className="font-medium">{p.amount}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{p.date}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{p.method}</TableCell>
                <TableCell>
                  <Badge variant={p.status === "Paid" ? "default" : p.status === "Failed" ? "destructive" : "outline"} className="text-xs">
                    {p.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {p.status === "Paid" && <Button variant="ghost" size="sm" className="text-xs">Refund</Button>}
                  {p.status === "Failed" && <Button variant="ghost" size="sm" className="text-xs">Retry</Button>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
