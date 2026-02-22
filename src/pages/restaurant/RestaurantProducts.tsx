import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Pencil, Trash2, X, Upload, GripVertical, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const products = [
  { id: 1, name: "Classic Burger", category: "Burgers", price: "€12.00", status: "Active", featured: true, image: "🍔" },
  { id: 2, name: "Margherita Pizza", category: "Pizzas", price: "€11.00", status: "Active", featured: false, image: "🍕" },
  { id: 3, name: "Caesar Salad", category: "Salads", price: "€9.50", status: "Active", featured: true, image: "🥗" },
  { id: 4, name: "Pasta Carbonara", category: "Pizzas", price: "€13.50", status: "Draft", featured: false, image: "🍝" },
  { id: 5, name: "Tiramisu", category: "Desserts", price: "€7.00", status: "Active", featured: false, image: "🍰" },
  { id: 6, name: "French Fries", category: "Sides", price: "€4.50", status: "Active", featured: false, image: "🍟" },
];

const optionGroups = [
  { name: "Size", type: "Required", options: ["Simple", "Big (+2€)", "Big Gratiné (+3.5€)"] },
  { name: "Extras", type: "Optional", options: ["Extra Cheese (+1€)", "Bacon (+1.5€)", "Avocado (+2€)"] },
];

export default function RestaurantProducts() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  return (
    <div className="flex gap-0 h-[calc(100vh-7rem)]">
      {/* Main Table */}
      <div className={cn("flex-1 flex flex-col space-y-4 transition-all", panelOpen && "pr-0")}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Products</h1>
            <p className="text-sm text-muted-foreground">{products.length} products in your menu</p>
          </div>
          <Button onClick={() => setPanelOpen(true)} className="rounded-xl gap-2 gradient-warm text-primary-foreground border-0">
            <Plus className="w-4 h-4" /> Add Product
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-9 rounded-xl bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-40 rounded-xl">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="burgers">Burgers</SelectItem>
              <SelectItem value="pizzas">Pizzas</SelectItem>
              <SelectItem value="salads">Salads</SelectItem>
              <SelectItem value="desserts">Desserts</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <Card className="rounded-2xl shadow-card border-0 flex-1 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b">
                <TableHead className="w-12"></TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} className="group">
                  <TableCell>
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-xl">
                      {product.image}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-foreground">{product.name}</span>
                      {product.featured && <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{product.category}</TableCell>
                  <TableCell className="font-semibold text-foreground">{product.price}</TableCell>
                  <TableCell>
                    <Badge className={cn(
                      "text-[10px] border-0",
                      product.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                    )}>
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="rounded-xl h-8 w-8" onClick={() => setPanelOpen(true)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-xl h-8 w-8 text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Slide Panel */}
      {panelOpen && (
        <div className="w-[480px] shrink-0 border-l bg-background overflow-y-auto ml-4 animate-in slide-in-from-right-4">
          <div className="sticky top-0 z-10 bg-background border-b px-6 py-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">Add Product</h2>
            <Button variant="ghost" size="icon" onClick={() => setPanelOpen(false)} className="rounded-xl">
              <X className="w-5 h-5" />
            </Button>
          </div>
          <div className="p-6 space-y-6">
            {/* Image Upload */}
            <div className="border-2 border-dashed border-muted rounded-2xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Drop image here</p>
              <p className="text-xs text-muted-foreground">or click to browse</p>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <Label className="text-xs font-semibold">Product Name</Label>
                <Input placeholder="e.g. Classic Burger" className="rounded-xl mt-1.5" />
              </div>
              <div>
                <Label className="text-xs font-semibold">Description</Label>
                <Textarea placeholder="Describe your product..." className="rounded-xl mt-1.5 min-h-[80px]" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-semibold">Base Price (€)</Label>
                  <Input type="number" placeholder="0.00" className="rounded-xl mt-1.5" />
                </div>
                <div>
                  <Label className="text-xs font-semibold">Category</Label>
                  <Select>
                    <SelectTrigger className="rounded-xl mt-1.5">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="burgers">Burgers</SelectItem>
                      <SelectItem value="pizzas">Pizzas</SelectItem>
                      <SelectItem value="salads">Salads</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                <div>
                  <p className="text-sm font-semibold text-foreground">Featured Product</p>
                  <p className="text-xs text-muted-foreground">Show on top of menu</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                <div>
                  <p className="text-sm font-semibold text-foreground">Discount</p>
                  <p className="text-xs text-muted-foreground">Apply percentage off</p>
                </div>
                <div className="flex items-center gap-2">
                  <Input type="number" placeholder="0" className="w-16 rounded-xl h-8 text-sm" />
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                <div>
                  <p className="text-sm font-semibold text-foreground">Status</p>
                  <p className="text-xs text-muted-foreground">Active or Draft</p>
                </div>
                <Select defaultValue="active">
                  <SelectTrigger className="w-24 rounded-xl h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Option Groups Section */}
            <div>
              <h3 className="text-sm font-bold text-foreground mb-3">Option Groups</h3>
              <div className="space-y-3">
                {optionGroups.map((group) => (
                  <div key={group.name} className="p-4 rounded-xl border bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                        <span className="text-sm font-semibold text-foreground">{group.name}</span>
                      </div>
                      <Badge className={cn("text-[10px] border-0", group.type === "Required" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground")}>
                        {group.type}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {group.options.map((opt) => (
                        <Badge key={opt} variant="outline" className="text-[10px] rounded-lg">
                          {opt}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full rounded-xl text-sm gap-1.5">
                  <Plus className="w-3.5 h-3.5" /> Attach Option Group
                </Button>
              </div>
            </div>

            {/* Save */}
            <div className="flex gap-3 pt-2">
              <Button className="flex-1 rounded-xl gradient-warm text-primary-foreground border-0">
                Save Product
              </Button>
              <Button variant="outline" className="rounded-xl" onClick={() => setPanelOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
