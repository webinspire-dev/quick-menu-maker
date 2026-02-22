import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreVertical, ArrowRightLeft, Copy, Trash2, Store } from "lucide-react";

const branches = [
  { name: "Le Petit Bistro – Centre", status: "Active", orders: 23, revenue: "€342", logo: "LP" },
  { name: "Le Petit Bistro – Gare", status: "Active", orders: 18, revenue: "€275", logo: "LP" },
  { name: "Le Petit Bistro – Mall", status: "Closed", orders: 0, revenue: "€0", logo: "LP" },
];

export default function RestaurantBranches() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Restaurants</h1>
          <p className="text-sm text-muted-foreground">Manage your restaurant branches</p>
        </div>
        <Button className="rounded-xl gap-2 gradient-warm text-primary-foreground border-0">
          <Plus className="w-4 h-4" /> Add Branch
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {branches.map((branch) => (
          <Card key={branch.name} className="rounded-2xl shadow-card border-0 hover:shadow-elevated transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    {branch.logo}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{branch.name}</p>
                    <Badge className={`text-[10px] border-0 mt-1 ${branch.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"}`}>
                      {branch.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 rounded-xl bg-muted/50">
                  <p className="text-lg font-bold text-foreground">{branch.orders}</p>
                  <p className="text-[10px] text-muted-foreground">Orders Today</p>
                </div>
                <div className="p-3 rounded-xl bg-muted/50">
                  <p className="text-lg font-bold text-foreground">{branch.revenue}</p>
                  <p className="text-[10px] text-muted-foreground">Revenue</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1 rounded-xl text-xs gap-1.5">
                  <ArrowRightLeft className="w-3 h-3" /> Switch
                </Button>
                <Button size="sm" variant="outline" className="rounded-xl text-xs gap-1.5">
                  <Copy className="w-3 h-3" /> Duplicate
                </Button>
                <Button size="sm" variant="ghost" className="rounded-xl text-xs text-destructive">
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
