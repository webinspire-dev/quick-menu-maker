import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Plus, GripVertical, Pencil, Trash2, X, ImageIcon } from "lucide-react";

interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  products: number;
  visible: boolean;
  order: number;
}

const initialCategories: Category[] = [
  { id: 1, name: "Burgers", description: "Delicious burgers", image: "🍔", products: 12, visible: true, order: 1 },
  { id: 2, name: "Pizzas", description: "Fresh pizzas", image: "🍕", products: 8, visible: true, order: 2 },
  { id: 3, name: "Salads", description: "Healthy salads", image: "🥗", products: 6, visible: true, order: 3 },
  { id: 4, name: "Desserts", description: "Sweet treats", image: "🍰", products: 5, visible: true, order: 4 },
  { id: 5, name: "Drinks", description: "Refreshing drinks", image: "🥤", products: 15, visible: false, order: 5 },
  { id: 6, name: "Sides", description: "Tasty sides", image: "🍟", products: 7, visible: true, order: 6 },
];

export default function RestaurantCategories() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [panelOpen, setPanelOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [form, setForm] = useState({ name: "", description: "", image: "", visible: true });

  const openAdd = () => {
    setEditingCategory(null);
    setForm({ name: "", description: "", image: "", visible: true });
    setPanelOpen(true);
  };

  const openEdit = (cat: Category) => {
    setEditingCategory(cat);
    setForm({ name: cat.name, description: cat.description, image: cat.image, visible: cat.visible });
    setPanelOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editingCategory) {
      setCategories(prev => prev.map(c => c.id === editingCategory.id ? { ...c, ...form } : c));
    } else {
      const newCat: Category = {
        id: Date.now(),
        name: form.name,
        description: form.description,
        image: form.image || "📁",
        products: 0,
        visible: form.visible,
        order: categories.length + 1,
      };
      setCategories(prev => [...prev, newCat]);
    }
    setPanelOpen(false);
  };

  const handleDelete = (id: number) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  const toggleVisible = (id: number) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, visible: !c.visible } : c));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Categories</h1>
          <p className="text-sm text-muted-foreground">Organize your menu categories</p>
        </div>
        <Button onClick={openAdd} className="rounded-xl gap-2 gradient-warm text-primary-foreground border-0">
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
                  <Switch checked={cat.visible} onCheckedChange={() => toggleVisible(cat.id)} />
                </div>
                <Button variant="ghost" size="icon" className="rounded-xl h-8 w-8" onClick={() => openEdit(cat)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-xl h-8 w-8 text-destructive" onClick={() => handleDelete(cat.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Slide Panel */}
      {panelOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setPanelOpen(false)} />
          <div className="relative w-full max-w-md bg-background shadow-xl animate-in slide-in-from-right duration-300 flex flex-col">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-semibold text-foreground">
                {editingCategory ? "Edit Category" : "Add Category"}
              </h2>
              <Button variant="ghost" size="icon" className="rounded-xl" onClick={() => setPanelOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Category Image</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors">
                  {form.image ? (
                    <span className="text-5xl">{form.image}</span>
                  ) : (
                    <>
                      <ImageIcon className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Click to upload image</p>
                    </>
                  )}
                </div>
                <Input
                  placeholder="Or enter an emoji (e.g. 🍔)"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="rounded-xl"
                />
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label>Category Name <span className="text-destructive">*</span></Label>
                <Input
                  placeholder="e.g. Burgers"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="rounded-xl"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Short description of this category"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="rounded-xl resize-none"
                  rows={3}
                />
              </div>

              {/* Visibility */}
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                <div>
                  <p className="text-sm font-medium text-foreground">Visible on menu</p>
                  <p className="text-xs text-muted-foreground">Show this category to customers</p>
                </div>
                <Switch checked={form.visible} onCheckedChange={(v) => setForm({ ...form, visible: v })} />
              </div>
            </div>

            <div className="p-6 border-t flex gap-3">
              <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setPanelOpen(false)}>
                Cancel
              </Button>
              <Button className="flex-1 rounded-xl gradient-warm text-primary-foreground border-0" onClick={handleSave}>
                {editingCategory ? "Save Changes" : "Add Category"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
