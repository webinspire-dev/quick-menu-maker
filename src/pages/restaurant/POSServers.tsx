import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface Server {
  id: string;
  name: string;
  email: string;
  role: "Server" | "Manager" | "Cashier";
  assignedPOS: string;
  canDiscount: boolean;
  canCancel: boolean;
  status: "Active" | "Inactive";
  ordersToday: number;
  salesToday: string;
}

const servers: Server[] = [
  { id: "1", name: "Ahmed K.", email: "ahmed@resto.com", role: "Server", assignedPOS: "POS 1 – Main Hall", canDiscount: false, canCancel: false, status: "Active", ordersToday: 12, salesToday: "€445.00" },
  { id: "2", name: "Marie L.", email: "marie@resto.com", role: "Manager", assignedPOS: "POS 2 – Terrace", canDiscount: true, canCancel: true, status: "Active", ordersToday: 18, salesToday: "€654.00" },
  { id: "3", name: "Jean P.", email: "jean@resto.com", role: "Cashier", assignedPOS: "POS 1 – Main Hall", canDiscount: true, canCancel: false, status: "Inactive", ordersToday: 0, salesToday: "€0.00" },
];

const roleColors: Record<string, string> = {
  Server: "bg-primary/10 text-primary",
  Manager: "bg-emerald-100 text-emerald-700",
  Cashier: "bg-blue-100 text-blue-700",
};

export default function POSServers() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editServer, setEditServer] = useState<Server | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Servers & Staff</h1>
          <p className="text-sm text-muted-foreground">Manage POS staff and permissions</p>
        </div>
        <Button onClick={() => { setEditServer(null); setSheetOpen(true); }} className="rounded-xl gap-2 gradient-warm text-primary-foreground border-0">
          <Plus className="w-4 h-4" /> Add Server
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="rounded-2xl shadow-card border-0">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Users className="w-5 h-5 text-primary" /></div>
            <div><p className="text-xs text-muted-foreground">Active Staff</p><p className="text-xl font-bold text-foreground">{servers.filter(s => s.status === "Active").length}</p></div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-card border-0">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center"><Users className="w-5 h-5 text-emerald-600" /></div>
            <div><p className="text-xs text-muted-foreground">Total Orders (Staff)</p><p className="text-xl font-bold text-foreground">{servers.reduce((s, sv) => s + sv.ordersToday, 0)}</p></div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-card border-0">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center"><Users className="w-5 h-5 text-blue-600" /></div>
            <div><p className="text-xs text-muted-foreground">Total Sales (Staff)</p><p className="text-xl font-bold text-foreground">€1,099.00</p></div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl shadow-card border-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Assigned POS</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Cancel</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Sales</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {servers.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>
                    <div>
                      <p className="font-semibold">{s.name}</p>
                      <p className="text-xs text-muted-foreground">{s.email}</p>
                    </div>
                  </TableCell>
                  <TableCell><Badge className={cn("border-0 text-xs", roleColors[s.role])}>{s.role}</Badge></TableCell>
                  <TableCell className="text-sm">{s.assignedPOS}</TableCell>
                  <TableCell>{s.canDiscount ? <Badge className="bg-emerald-100 text-emerald-700 border-0 text-xs">Yes</Badge> : <Badge className="bg-muted text-muted-foreground border-0 text-xs">No</Badge>}</TableCell>
                  <TableCell>{s.canCancel ? <Badge className="bg-emerald-100 text-emerald-700 border-0 text-xs">Yes</Badge> : <Badge className="bg-muted text-muted-foreground border-0 text-xs">No</Badge>}</TableCell>
                  <TableCell><Badge className={cn("border-0 text-xs", s.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground")}>{s.status}</Badge></TableCell>
                  <TableCell className="font-semibold">{s.ordersToday}</TableCell>
                  <TableCell className="font-semibold">{s.salesToday}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditServer(s); setSheetOpen(true); }}><Pencil className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader><SheetTitle>{editServer ? "Edit Server" : "Add Server"}</SheetTitle></SheetHeader>
          <div className="space-y-5 mt-6">
            <div className="space-y-2"><Label>Full Name</Label><Input placeholder="Ahmed K." defaultValue={editServer?.name} className="rounded-xl" /></div>
            <div className="space-y-2"><Label>Email (Optional)</Label><Input type="email" placeholder="ahmed@resto.com" defaultValue={editServer?.email} className="rounded-xl" /></div>
            <div className="space-y-2"><Label>Password</Label><Input type="password" placeholder="Login password" className="rounded-xl" /></div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select defaultValue={editServer?.role || "Server"}>
                <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Server">Server</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Cashier">Cashier</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Assigned POS</Label>
              <Select defaultValue={editServer?.assignedPOS || ""}>
                <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select POS" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="POS 1 – Main Hall">POS 1 – Main Hall</SelectItem>
                  <SelectItem value="POS 2 – Terrace">POS 2 – Terrace</SelectItem>
                  <SelectItem value="POS 3 – Bar">POS 3 – Bar</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3 p-4 rounded-xl bg-muted/50">
              <p className="text-sm font-semibold">Permissions</p>
              <div className="flex items-center justify-between"><Label className="text-sm">Can apply discount</Label><Switch defaultChecked={editServer?.canDiscount} /></div>
              <div className="flex items-center justify-between"><Label className="text-sm">Can cancel orders</Label><Switch defaultChecked={editServer?.canCancel} /></div>
            </div>
            <Button className="w-full rounded-xl gradient-warm text-primary-foreground border-0" onClick={() => setSheetOpen(false)}>
              {editServer ? "Save Changes" : "Add Server"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
