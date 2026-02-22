import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const tickets = [
  { id: "#1284", subject: "QR code not scanning", restaurant: "Burger Lab", priority: "High", status: "Open", date: "Feb 22" },
  { id: "#1283", subject: "Payment not reflected", restaurant: "Pasta Roma", priority: "Medium", status: "In Progress", date: "Feb 21" },
  { id: "#1282", subject: "Menu editing bug", restaurant: "Wok Express", priority: "Low", status: "Open", date: "Feb 21" },
  { id: "#1281", subject: "Account access issue", restaurant: "Café Parisien", priority: "High", status: "Resolved", date: "Feb 20" },
  { id: "#1280", subject: "Feature request: multi-language", restaurant: "Sushi Master", priority: "Low", status: "Resolved", date: "Feb 19" },
];

export default function AdminSupport() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Support Tickets</h1>
        <p className="text-muted-foreground text-sm">Manage customer support requests</p>
      </div>

      <Card className="border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticket</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Restaurant</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((t) => (
              <TableRow key={t.id}>
                <TableCell className="font-mono text-sm">{t.id}</TableCell>
                <TableCell className="font-medium">{t.subject}</TableCell>
                <TableCell className="text-sm">{t.restaurant}</TableCell>
                <TableCell>
                  <Badge variant={t.priority === "High" ? "destructive" : t.priority === "Medium" ? "default" : "secondary"} className="text-xs">
                    {t.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={t.status === "Open" ? "outline" : t.status === "Resolved" ? "secondary" : "default"} className="text-xs">
                    {t.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{t.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
