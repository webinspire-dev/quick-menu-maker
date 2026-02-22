import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Shield } from "lucide-react";

const admins = [
  { name: "Super Admin", email: "admin@menudigital.com", role: "Super Admin", lastLogin: "Feb 22, 2026 14:23", status: "Active" },
  { name: "Sarah Johnson", email: "sarah@menudigital.com", role: "Admin", lastLogin: "Feb 22, 2026 10:15", status: "Active" },
  { name: "Mohamed Ali", email: "mohamed@menudigital.com", role: "Support", lastLogin: "Feb 21, 2026 18:45", status: "Active" },
  { name: "Emma Wilson", email: "emma@menudigital.com", role: "Viewer", lastLogin: "Feb 18, 2026 09:00", status: "Inactive" },
];

export default function AdminUsers() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Users</h1>
          <p className="text-muted-foreground text-sm">Manage platform administrators</p>
        </div>
        <Button size="sm" className="gap-2"><Plus className="w-4 h-4" /> Add Admin</Button>
      </div>

      <Card className="border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {admins.map((a) => (
              <TableRow key={a.email}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                      {a.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{a.name}</p>
                      <p className="text-xs text-muted-foreground">{a.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={a.role === "Super Admin" ? "default" : "secondary"} className="text-xs gap-1">
                    {a.role === "Super Admin" && <Shield className="w-3 h-3" />}
                    {a.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{a.lastLogin}</TableCell>
                <TableCell>
                  <Badge variant={a.status === "Active" ? "outline" : "secondary"} className="text-xs">
                    {a.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="text-xs">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
