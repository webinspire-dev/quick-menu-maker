import { useState } from "react";
import {
  Search, Filter, MoreHorizontal, Eye, Ban, Trash2, Download, ChevronDown,
  X, QrCode, UtensilsCrossed, CreditCard, TrendingUp, ArrowUpDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface Restaurant {
  id: number;
  name: string;
  owner: string;
  email: string;
  plan: string;
  status: "Active" | "Suspended" | "Trial";
  created: string;
  revenue: string;
  qrScans: number;
  menuItems: number;
}

const restaurants: Restaurant[] = [
  { id: 1, name: "La Belle Époque", owner: "Marie Dupont", email: "marie@belleepoque.fr", plan: "Pro", status: "Active", created: "2025-08-12", revenue: "€2,340", qrScans: 4520, menuItems: 48 },
  { id: 2, name: "Sushi Master", owner: "Kenji Tanaka", email: "kenji@sushimaster.jp", plan: "Enterprise", status: "Active", created: "2025-06-03", revenue: "€5,120", qrScans: 12300, menuItems: 86 },
  { id: 3, name: "Burger Lab", owner: "Alex Smith", email: "alex@burgerlab.com", plan: "Free", status: "Trial", created: "2026-02-18", revenue: "€0", qrScans: 120, menuItems: 12 },
  { id: 4, name: "Pasta Roma", owner: "Luigi Rossi", email: "luigi@pastaroma.it", plan: "Pro", status: "Active", created: "2025-09-22", revenue: "€1,890", qrScans: 3200, menuItems: 34 },
  { id: 5, name: "Taco Loco", owner: "Carlos Garcia", email: "carlos@tacoloco.mx", plan: "Basic", status: "Suspended", created: "2025-04-15", revenue: "€680", qrScans: 890, menuItems: 22 },
  { id: 6, name: "Wok Express", owner: "Li Wei", email: "li@wokexpress.cn", plan: "Pro", status: "Active", created: "2025-11-08", revenue: "€1,560", qrScans: 2800, menuItems: 56 },
  { id: 7, name: "Café Parisien", owner: "Claire Martin", email: "claire@cafeparisien.fr", plan: "Enterprise", status: "Active", created: "2025-03-20", revenue: "€8,420", qrScans: 18500, menuItems: 92 },
  { id: 8, name: "Pizza Palace", owner: "Marco Bianchi", email: "marco@pizzapalace.it", plan: "Basic", status: "Suspended", created: "2025-07-30", revenue: "€340", qrScans: 450, menuItems: 18 },
];

const paymentHistory = [
  { date: "Feb 2026", amount: "€29", status: "Paid" },
  { date: "Jan 2026", amount: "€29", status: "Paid" },
  { date: "Dec 2025", amount: "€29", status: "Paid" },
  { date: "Nov 2025", amount: "€29", status: "Failed" },
];

export default function AdminRestaurants() {
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  const filtered = restaurants.filter((r) => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.owner.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase());
    const matchPlan = planFilter === "all" || r.plan === planFilter;
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    return matchSearch && matchPlan && matchStatus;
  });

  const statusColor = (s: string) => {
    if (s === "Active") return "bg-[hsl(var(--admin-success))]/10 text-[hsl(var(--admin-success))]";
    if (s === "Suspended") return "bg-destructive/10 text-destructive";
    return "bg-[hsl(var(--admin-warning))]/10 text-[hsl(var(--admin-warning))]";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Restaurants</h1>
          <p className="text-muted-foreground text-sm">{restaurants.length} restaurants registered</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="w-4 h-4" /> Export
        </Button>
      </div>

      {/* Filters */}
      <Card className="border shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, owner, or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
            <Select value={planFilter} onValueChange={setPlanFilter}>
              <SelectTrigger className="w-36 h-9">
                <SelectValue placeholder="Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="Free">Free</SelectItem>
                <SelectItem value="Basic">Basic</SelectItem>
                <SelectItem value="Pro">Pro</SelectItem>
                <SelectItem value="Enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-36 h-9">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Suspended">Suspended</SelectItem>
                <SelectItem value="Trial">Trial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Restaurant</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((r) => (
              <TableRow key={r.id} className="cursor-pointer" onClick={() => setSelectedRestaurant(r)}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{r.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm">{r.owner}</TableCell>
                <TableCell>
                  <Badge variant={r.plan === "Free" ? "outline" : r.plan === "Enterprise" ? "default" : "secondary"} className="text-xs">
                    {r.plan}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColor(r.status)}`}>
                    {r.status}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{r.created}</TableCell>
                <TableCell className="text-sm font-medium">{r.revenue}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); setSelectedRestaurant(r); }}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={(e) => e.stopPropagation()}>
                      <Ban className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Detail Panel */}
      <Dialog open={!!selectedRestaurant} onOpenChange={() => setSelectedRestaurant(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {selectedRestaurant && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">
                    {selectedRestaurant.name.charAt(0)}
                  </div>
                  <div>
                    <DialogTitle className="text-xl">{selectedRestaurant.name}</DialogTitle>
                    <p className="text-sm text-muted-foreground">{selectedRestaurant.email}</p>
                  </div>
                </div>
              </DialogHeader>

              <Separator />

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: QrCode, label: "QR Scans", value: selectedRestaurant.qrScans.toLocaleString() },
                  { icon: UtensilsCrossed, label: "Menu Items", value: selectedRestaurant.menuItems },
                  { icon: CreditCard, label: "Revenue", value: selectedRestaurant.revenue },
                  { icon: TrendingUp, label: "Plan", value: selectedRestaurant.plan },
                ].map((s, i) => (
                  <div key={i} className="p-3 rounded-lg bg-muted/50 text-center">
                    <s.icon className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-lg font-bold text-foreground">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Owner</p>
                  <p className="font-medium text-foreground">{selectedRestaurant.owner}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColor(selectedRestaurant.status)}`}>
                    {selectedRestaurant.status}
                  </span>
                </div>
                <div>
                  <p className="text-muted-foreground">Created</p>
                  <p className="font-medium text-foreground">{selectedRestaurant.created}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Plan</p>
                  <Badge variant="secondary">{selectedRestaurant.plan}</Badge>
                </div>
              </div>

              <Separator />

              {/* Payment History */}
              <div>
                <h4 className="font-semibold text-sm mb-3 text-foreground">Payment History</h4>
                <div className="space-y-2">
                  {paymentHistory.map((p, i) => (
                    <div key={i} className="flex items-center justify-between text-sm py-1.5">
                      <span className="text-muted-foreground">{p.date}</span>
                      <span className="font-medium text-foreground">{p.amount}</span>
                      <span className={`text-xs font-medium ${p.status === "Paid" ? "text-[hsl(var(--admin-success))]" : "text-destructive"}`}>
                        {p.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">Upgrade Plan</Button>
                <Button variant="outline" size="sm" className="flex-1 text-[hsl(var(--admin-warning))]">
                  <Ban className="w-4 h-4 mr-1" /> Suspend
                </Button>
                <Button variant="outline" size="sm" className="flex-1 text-destructive">
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
