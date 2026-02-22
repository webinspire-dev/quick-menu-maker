import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, GripVertical, Pencil, Trash2, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";

const optionGroups = [
  {
    name: "Size", type: "Required", selection: "Single choice", min: 1, max: 1,
    options: [
      { name: "Simple", price: "€0.00" },
      { name: "Big", price: "+€2.00" },
      { name: "Big Gratiné", price: "+€3.50" },
    ],
  },
  {
    name: "Extras", type: "Optional", selection: "Multiple choice", min: 0, max: 3,
    options: [
      { name: "Extra Cheese", price: "+€1.00" },
      { name: "Bacon", price: "+€1.50" },
      { name: "Avocado", price: "+€2.00" },
      { name: "Jalapeños", price: "+€0.50" },
    ],
  },
  {
    name: "Sauce", type: "Required", selection: "Single choice", min: 1, max: 1,
    options: [
      { name: "Ketchup", price: "€0.00" },
      { name: "Mayo", price: "€0.00" },
      { name: "BBQ", price: "+€0.50" },
    ],
  },
  {
    name: "Cooking", type: "Optional", selection: "Single choice", min: 0, max: 1,
    options: [
      { name: "Rare", price: "€0.00" },
      { name: "Medium", price: "€0.00" },
      { name: "Well Done", price: "€0.00" },
    ],
  },
];

export default function RestaurantOptions() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Option Groups</h1>
          <p className="text-sm text-muted-foreground">Manage reusable option sets for your products</p>
        </div>
        <Button className="rounded-xl gap-2 gradient-warm text-primary-foreground border-0">
          <Plus className="w-4 h-4" /> New Option Group
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {optionGroups.map((group) => (
          <Card key={group.name} className="rounded-2xl shadow-card border-0">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-bold text-foreground">{group.name}</h3>
                    <Badge className={cn(
                      "text-[10px] border-0",
                      group.type === "Required" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                    )}>
                      {group.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{group.selection}</span>
                    <span>•</span>
                    <span>Min: {group.min} / Max: {group.max}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="rounded-xl h-8 w-8">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-xl h-8 w-8 text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-1.5">
                {group.options.map((opt) => (
                  <div key={opt.name} className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/50">
                    <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                    <span className="flex-1 text-sm text-foreground">{opt.name}</span>
                    <span className="text-sm font-semibold text-foreground">{opt.price}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
