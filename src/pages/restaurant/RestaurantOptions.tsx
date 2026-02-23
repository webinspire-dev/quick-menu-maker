import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, GripVertical, Pencil, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
  name: string;
  price: string;
}

interface OptionGroup {
  name: string;
  type: "Required" | "Optional";
  selection: "Single choice" | "Multiple choice";
  min: number;
  max: number;
  options: Option[];
}

const initialGroups: OptionGroup[] = [
  {
    name: "Size", type: "Required", selection: "Single choice", min: 1, max: 1,
    options: [
      { name: "Simple", price: "0.00" },
      { name: "Big", price: "2.00" },
      { name: "Big Gratiné", price: "3.50" },
    ],
  },
  {
    name: "Extras", type: "Optional", selection: "Multiple choice", min: 0, max: 3,
    options: [
      { name: "Extra Cheese", price: "1.00" },
      { name: "Bacon", price: "1.50" },
      { name: "Avocado", price: "2.00" },
      { name: "Jalapeños", price: "0.50" },
    ],
  },
  {
    name: "Sauce", type: "Required", selection: "Single choice", min: 1, max: 1,
    options: [
      { name: "Ketchup", price: "0.00" },
      { name: "Mayo", price: "0.00" },
      { name: "BBQ", price: "0.50" },
    ],
  },
  {
    name: "Cooking", type: "Optional", selection: "Single choice", min: 0, max: 1,
    options: [
      { name: "Rare", price: "0.00" },
      { name: "Medium", price: "0.00" },
      { name: "Well Done", price: "0.00" },
    ],
  },
];

const emptyGroup: OptionGroup = {
  name: "",
  type: "Required",
  selection: "Single choice",
  min: 1,
  max: 1,
  options: [{ name: "", price: "0.00" }],
};

export default function RestaurantOptions() {
  const [groups, setGroups] = useState<OptionGroup[]>(initialGroups);
  const [panelOpen, setPanelOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [form, setForm] = useState<OptionGroup>({ ...emptyGroup, options: [{ name: "", price: "0.00" }] });

  const openNew = () => {
    setEditingIndex(null);
    setForm({ ...emptyGroup, options: [{ name: "", price: "0.00" }] });
    setPanelOpen(true);
  };

  const openEdit = (idx: number) => {
    setEditingIndex(idx);
    setForm(JSON.parse(JSON.stringify(groups[idx])));
    setPanelOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) return;
    const cleaned = { ...form, options: form.options.filter(o => o.name.trim()) };
    if (cleaned.options.length === 0) return;
    if (editingIndex !== null) {
      setGroups(g => g.map((item, i) => (i === editingIndex ? cleaned : item)));
    } else {
      setGroups(g => [...g, cleaned]);
    }
    setPanelOpen(false);
  };

  const handleDelete = (idx: number) => {
    setGroups(g => g.filter((_, i) => i !== idx));
  };

  const updateOption = (oIdx: number, field: keyof Option, value: string) => {
    setForm(f => ({
      ...f,
      options: f.options.map((o, i) => (i === oIdx ? { ...o, [field]: value } : o)),
    }));
  };

  const removeOption = (oIdx: number) => {
    setForm(f => ({ ...f, options: f.options.filter((_, i) => i !== oIdx) }));
  };

  const addOption = () => {
    setForm(f => ({ ...f, options: [...f.options, { name: "", price: "0.00" }] }));
  };

  const formatPrice = (price: string) => {
    const num = parseFloat(price);
    if (isNaN(num) || num === 0) return "€0.00";
    return `+€${num.toFixed(2)}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Option Groups</h1>
          <p className="text-sm text-muted-foreground">Manage reusable option sets for your products</p>
        </div>
        <Button onClick={openNew} className="rounded-xl gap-2 gradient-warm text-primary-foreground border-0">
          <Plus className="w-4 h-4" /> New Option Group
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {groups.map((group, idx) => (
          <Card key={idx} className="rounded-2xl shadow-card border-0">
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
                  <Button variant="ghost" size="icon" className="rounded-xl h-8 w-8" onClick={() => openEdit(idx)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-xl h-8 w-8 text-destructive" onClick={() => handleDelete(idx)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-1.5">
                {group.options.map((opt, oIdx) => (
                  <div key={oIdx} className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/50">
                    <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                    <span className="flex-1 text-sm text-foreground">{opt.name}</span>
                    <span className="text-sm font-semibold text-foreground">{formatPrice(opt.price)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Slide Panel */}
      {panelOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/30" onClick={() => setPanelOpen(false)} />
          <div className="relative w-full max-w-md bg-background shadow-xl animate-in slide-in-from-right duration-200 overflow-y-auto">
            <div className="sticky top-0 bg-background z-10 flex items-center justify-between p-5 border-b">
              <h2 className="text-lg font-bold text-foreground">
                {editingIndex !== null ? "Edit Option Group" : "New Option Group"}
              </h2>
              <Button variant="ghost" size="icon" className="rounded-xl" onClick={() => setPanelOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="p-5 space-y-5">
              <div className="space-y-2">
                <Label>Group Name</Label>
                <Input
                  placeholder="e.g. Size, Extras, Sauce"
                  className="rounded-xl"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select value={form.type} onValueChange={v => setForm(f => ({ ...f, type: v as OptionGroup["type"] }))}>
                    <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Required">Required</SelectItem>
                      <SelectItem value="Optional">Optional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Selection</Label>
                  <Select value={form.selection} onValueChange={v => setForm(f => ({ ...f, selection: v as OptionGroup["selection"] }))}>
                    <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Single choice">Single choice</SelectItem>
                      <SelectItem value="Multiple choice">Multiple choice</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Min Selections</Label>
                  <Input
                    type="number"
                    min={0}
                    className="rounded-xl"
                    value={form.min}
                    onChange={e => setForm(f => ({ ...f, min: parseInt(e.target.value) || 0 }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Max Selections</Label>
                  <Input
                    type="number"
                    min={1}
                    className="rounded-xl"
                    value={form.max}
                    onChange={e => setForm(f => ({ ...f, max: parseInt(e.target.value) || 1 }))}
                  />
                </div>
              </div>

              {/* Options */}
              <div className="space-y-3">
                <Label>Options</Label>
                {form.options.map((opt, oIdx) => (
                  <div key={oIdx} className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-muted-foreground shrink-0 cursor-grab" />
                    <Input
                      placeholder="Option name"
                      className="rounded-xl flex-1"
                      value={opt.name}
                      onChange={e => updateOption(oIdx, "name", e.target.value)}
                    />
                    <div className="relative w-24 shrink-0">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">€</span>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        className="rounded-xl pl-7"
                        value={opt.price}
                        onChange={e => updateOption(oIdx, "price", e.target.value)}
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-xl h-8 w-8 shrink-0 text-destructive"
                      onClick={() => removeOption(oIdx)}
                      disabled={form.options.length <= 1}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="rounded-xl gap-1 w-full" onClick={addOption}>
                  <Plus className="w-3.5 h-3.5" /> Add Option
                </Button>
              </div>

              <Button className="w-full rounded-xl gradient-warm text-primary-foreground border-0 mt-4" onClick={handleSave}>
                {editingIndex !== null ? "Save Changes" : "Create Option Group"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
