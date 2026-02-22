import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Plus, Users, Armchair } from "lucide-react";
import { cn } from "@/lib/utils";

interface TableItem {
  id: string;
  number: number;
  area: string;
  seats: number;
  status: "Available" | "Occupied" | "Reserved";
  server?: string;
  orderTotal?: string;
}

const tables: TableItem[] = [
  { id: "1", number: 1, area: "Main", seats: 4, status: "Available" },
  { id: "2", number: 2, area: "Main", seats: 2, status: "Occupied", server: "Ahmed K.", orderTotal: "€34.50" },
  { id: "3", number: 3, area: "Main", seats: 6, status: "Reserved" },
  { id: "4", number: 4, area: "Main", seats: 4, status: "Occupied", server: "Marie L.", orderTotal: "€21.00" },
  { id: "5", number: 5, area: "Terrace", seats: 2, status: "Available" },
  { id: "6", number: 6, area: "Terrace", seats: 4, status: "Occupied", server: "Ahmed K.", orderTotal: "€55.00" },
  { id: "7", number: 7, area: "Terrace", seats: 8, status: "Available" },
  { id: "8", number: 8, area: "VIP", seats: 6, status: "Reserved" },
  { id: "9", number: 9, area: "VIP", seats: 4, status: "Available" },
  { id: "10", number: 10, area: "Bar", seats: 2, status: "Occupied", server: "Jean P.", orderTotal: "€18.00" },
  { id: "11", number: 11, area: "Bar", seats: 2, status: "Available" },
  { id: "12", number: 12, area: "Bar", seats: 2, status: "Available" },
];

const statusColors: Record<string, { bg: string; text: string; border: string }> = {
  Available: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  Occupied: { bg: "bg-primary/5", text: "text-primary", border: "border-primary/20" },
  Reserved: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
};

const areas = ["All", "Main", "Terrace", "VIP", "Bar"];

export default function POSTables() {
  const [selectedArea, setSelectedArea] = useState("All");
  const [sheetOpen, setSheetOpen] = useState(false);
  const filtered = selectedArea === "All" ? tables : tables.filter(t => t.area === selectedArea);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tables</h1>
          <p className="text-sm text-muted-foreground">Table layout and live status</p>
        </div>
        <Button onClick={() => setSheetOpen(true)} className="rounded-xl gap-2 gradient-warm text-primary-foreground border-0">
          <Plus className="w-4 h-4" /> Add Table
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Tables", value: tables.length, color: "bg-primary/10 text-primary" },
          { label: "Available", value: tables.filter(t => t.status === "Available").length, color: "bg-emerald-100 text-emerald-700" },
          { label: "Occupied", value: tables.filter(t => t.status === "Occupied").length, color: "bg-primary/10 text-primary" },
          { label: "Reserved", value: tables.filter(t => t.status === "Reserved").length, color: "bg-amber-100 text-amber-700" },
        ].map(k => (
          <Card key={k.label} className="rounded-2xl shadow-card border-0">
            <CardContent className="p-4 text-center">
              <p className="text-xs text-muted-foreground">{k.label}</p>
              <p className="text-2xl font-bold text-foreground mt-1">{k.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Area filter */}
      <div className="flex gap-2">
        {areas.map(a => (
          <Button key={a} variant={selectedArea === a ? "default" : "outline"} size="sm" className={cn("rounded-xl", selectedArea === a && "gradient-warm text-primary-foreground border-0")} onClick={() => setSelectedArea(a)}>
            {a}
          </Button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filtered.map(table => {
          const sc = statusColors[table.status];
          return (
            <Card key={table.id} className={cn("rounded-2xl border-2 cursor-pointer transition-all hover:shadow-card", sc.bg, sc.border)}>
              <CardContent className="p-4 text-center space-y-2">
                <div className={cn("text-2xl font-bold", sc.text)}>
                  {table.number}
                </div>
                <Badge className={cn("border-0 text-[10px]", sc.bg, sc.text)}>
                  {table.status}
                </Badge>
                <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                  <Armchair className="w-3 h-3" /> {table.seats} seats
                </div>
                {table.server && (
                  <p className="text-xs text-muted-foreground">{table.server}</p>
                )}
                {table.orderTotal && (
                  <p className={cn("text-sm font-bold", sc.text)}>{table.orderTotal}</p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader><SheetTitle>Add Table</SheetTitle></SheetHeader>
          <div className="space-y-5 mt-6">
            <div className="space-y-2"><Label>Table Number</Label><Input type="number" placeholder="13" className="rounded-xl" /></div>
            <div className="space-y-2">
              <Label>Area</Label>
              <Select><SelectTrigger className="rounded-xl"><SelectValue placeholder="Select area" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Main">Main</SelectItem>
                  <SelectItem value="Terrace">Terrace</SelectItem>
                  <SelectItem value="VIP">VIP</SelectItem>
                  <SelectItem value="Bar">Bar</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>Number of Seats</Label><Input type="number" placeholder="4" className="rounded-xl" /></div>
            <Button className="w-full rounded-xl gradient-warm text-primary-foreground border-0" onClick={() => setSheetOpen(false)}>Add Table</Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
