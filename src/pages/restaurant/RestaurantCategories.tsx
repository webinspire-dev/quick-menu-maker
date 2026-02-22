import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Plus, GripVertical, Pencil, Trash2, ImageIcon } from "lucide-react";

const categories = [
  { id: 1, name: "Burgers", image: "🍔", products: 12, visible: true, order: 1 },
  { id: 2, name: "Pizzas", image: "🍕", products: 8, visible: true, order: 2 },
  { id: 3, name: "Salads", image: "🥗", products: 6, visible: true, order: 3 },
  { id: 4, name: "Desserts", image: "🍰", products: 5, visible: true, order: 4 },
  { id: 5, name: "Drinks", image: "🥤", products: 15, visible: false, order: 5 },
  { id: 6, name: "Sides", image: "🍟", products: 7, visible: true, order: 6 },
];

export default function RestaurantCategories() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Categories</h1>
          <p className="text-sm text-muted-foreground">Organize your menu categories</p>
        </div>
        <Button className="rounded-xl gap-2 gradient-warm text-primary-foreground border-0">
          <Plus className="w-4 h-4" /> Add Category
        </Button>
      </div>

      <div className="space-y-2">
        {categories.map((cat) => (
          <Card key={cat.id} className="rounded-2xl shadow-soft border-0">
            <CardContent className="p-4 flex items-center gap-4">
              <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab" />
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl">
                {cat.image}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{cat.name}</p>
                <p className="text-xs text-muted-foreground">{cat.products} products</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Visible</span>
                  <Switch checked={cat.visible} />
                </div>
                <Button variant="ghost" size="icon" className="rounded-xl h-8 w-8">
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-xl h-8 w-8 text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
