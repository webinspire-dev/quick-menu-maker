import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Monitor, Plus, Pencil, Trash2, Power, PowerOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface POSTerminal {
  id: string;
  name: string;
  area: string;
  assignedServer: string;
  status: "Active" | "Disabled";
  lastSession: string;
  ordersToday: number;
  revenueToday: string;
}

const initialTerminals: POSTerminal[] = [
  { id: "1", name: "POS 1 – Main Hall", area: "Main Room", assignedServer: "Ahmed K.", status: "Active", lastSession: "14:32", ordersToday: 24, revenueToday: "€892.50" },
  { id: "2", name: "POS 2 – Terrace", area: "Terrace", assignedServer: "Marie L.", status: "Active", lastSession: "14:28", ordersToday: 18, revenueToday: "€654.00" },
  { id: "3", name: "POS 3 – Bar", area: "Bar", assignedServer: "—", status: "Disabled", lastSession: "Yesterday", ordersToday: 0, revenueToday: "€0.00" },
];

export default function POSManagement() {
  const [terminals, setTerminals] = useState(initialTerminals);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editTerminal, setEditTerminal] = useState<POSTerminal | null>(null);

  const openNew = () => { setEditTerminal(null); setSheetOpen(true); };
  const openEdit = (t: POSTerminal) => { setEditTerminal(t); setSheetOpen(true); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">POS Terminals</h1>
          <p className="text-sm text-muted-foreground">Manage your point-of-sale devices</p>
        </div>
        <Button onClick={openNew} className="rounded-xl gap-2 gradient-warm text-primary-foreground border-0">
          <Plus className="w-4 h-4" /> Add Terminal
        </Button>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Active Terminals", value: terminals.filter(t => t.status === "Active").length, icon: Monitor },
          { label: "Total Orders Today", value: terminals.reduce((s, t) => s + t.ordersToday, 0), icon: Power },
          { label: "Total Revenue Today", value: `€${terminals.reduce((s, t) => s + parseFloat(t.revenueToday.replace("€", "").replace(",", "")), 0).toFixed(2)}`, icon: Power },
        ].map((kpi) => (
          <Card key={kpi.label} className="rounded-2xl shadow-card border-0">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <kpi.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{kpi.label}</p>
                <p className="text-xl font-bold text-foreground">{kpi.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card className="rounded-2xl shadow-card border-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Terminal</TableHead>
                <TableHead>Area</TableHead>
                <TableHead>Assigned Server</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Session</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {terminals.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-semibold">{t.name}</TableCell>
                  <TableCell>{t.area}</TableCell>
                  <TableCell>{t.assignedServer}</TableCell>
                  <TableCell>
                    <Badge className={cn("border-0 text-xs", t.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground")}>
                      {t.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{t.lastSession}</TableCell>
                  <TableCell className="font-semibold">{t.ordersToday}</TableCell>
                  <TableCell className="font-semibold">{t.revenueToday}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(t)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{editTerminal ? "Edit Terminal" : "New Terminal"}</SheetTitle>
          </SheetHeader>
          <div className="space-y-5 mt-6">
            <div className="space-y-2">
              <Label>Terminal Name</Label>
              <Input placeholder="POS 1 – Main Hall" defaultValue={editTerminal?.name} className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>Assigned Area</Label>
              <Select defaultValue={editTerminal?.area || ""}>
                <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select area" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Main Room">Main Room</SelectItem>
                  <SelectItem value="Terrace">Terrace</SelectItem>
                  <SelectItem value="Bar">Bar</SelectItem>
                  <SelectItem value="VIP">VIP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Login Password</Label>
              <Input type="password" placeholder="Unique POS password" className="rounded-xl" />
              <p className="text-xs text-muted-foreground">Servers use this to log into this terminal</p>
            </div>
            <div className="space-y-2">
              <Label>Assigned Server (Optional)</Label>
              <Select>
                <SelectTrigger className="rounded-xl"><SelectValue placeholder="Any server" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ahmed">Ahmed K.</SelectItem>
                  <SelectItem value="marie">Marie L.</SelectItem>
                  <SelectItem value="jean">Jean P.</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
              <div>
                <p className="text-sm font-medium">Active</p>
                <p className="text-xs text-muted-foreground">Enable this terminal</p>
              </div>
              <Switch defaultChecked={editTerminal?.status === "Active"} />
            </div>
            <Button className="w-full rounded-xl gradient-warm text-primary-foreground border-0" onClick={() => setSheetOpen(false)}>
              {editTerminal ? "Save Changes" : "Create Terminal"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
