import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Palette, Type, RectangleHorizontal, Eye, Store } from "lucide-react";

const colorOptions = [
  { name: "Orange", value: "#f97316" },
  { name: "Red", value: "#ef4444" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Green", value: "#22c55e" },
  { name: "Purple", value: "#8b5cf6" },
  { name: "Pink", value: "#ec4899" },
];

export default function RestaurantAppearance() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Appearance</h1>
          <p className="text-sm text-muted-foreground">Customize how your digital menu looks</p>
        </div>
        <Button variant="outline" className="rounded-xl gap-2">
          <Eye className="w-4 h-4" /> Live Preview
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Settings */}
        <div className="space-y-4">
          {/* Logo Upload */}
          <Card className="rounded-2xl shadow-card border-0">
            <CardContent className="p-5">
              <Label className="text-xs font-bold mb-3 block">Restaurant Logo</Label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center">
                  <Store className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <Button variant="outline" size="sm" className="rounded-xl gap-1.5 text-xs">
                    <Upload className="w-3.5 h-3.5" /> Upload Logo
                  </Button>
                  <p className="text-[10px] text-muted-foreground mt-1">PNG, JPG. Max 2MB</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cover Image */}
          <Card className="rounded-2xl shadow-card border-0">
            <CardContent className="p-5">
              <Label className="text-xs font-bold mb-3 block">Cover Image</Label>
              <div className="border-2 border-dashed border-muted rounded-2xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">Drop cover image here</p>
                <p className="text-xs text-muted-foreground">Recommended: 1200×400px</p>
              </div>
            </CardContent>
          </Card>

          {/* Primary Color */}
          <Card className="rounded-2xl shadow-card border-0">
            <CardContent className="p-5">
              <Label className="text-xs font-bold mb-3 block">Primary Color</Label>
              <div className="flex gap-2">
                {colorOptions.map((c) => (
                  <button
                    key={c.value}
                    className="w-10 h-10 rounded-xl border-2 border-transparent hover:border-foreground/20 transition-colors"
                    style={{ backgroundColor: c.value }}
                    title={c.name}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Font & Button Style */}
          <Card className="rounded-2xl shadow-card border-0">
            <CardContent className="p-5 space-y-4">
              <div>
                <Label className="text-xs font-bold mb-1.5 block">Font Style</Label>
                <Select defaultValue="inter">
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inter">Inter</SelectItem>
                    <SelectItem value="poppins">Poppins</SelectItem>
                    <SelectItem value="dm-sans">DM Sans</SelectItem>
                    <SelectItem value="playfair">Playfair Display</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs font-bold mb-1.5 block">Button Style</Label>
                <Select defaultValue="rounded">
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rounded">Rounded</SelectItem>
                    <SelectItem value="pill">Pill</SelectItem>
                    <SelectItem value="square">Square</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full rounded-xl gradient-warm text-primary-foreground border-0">
            Save Changes
          </Button>
        </div>

        {/* Live Preview */}
        <Card className="rounded-2xl shadow-card border-0 sticky top-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Eye className="w-4 h-4" /> Menu Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-2xl border bg-background overflow-hidden">
              {/* Preview Header */}
              <div className="h-24 gradient-warm relative">
                <div className="absolute -bottom-6 left-4 w-12 h-12 rounded-xl bg-background shadow-card flex items-center justify-center">
                  <Store className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="pt-8 px-4 pb-4">
                <h3 className="font-bold text-foreground text-sm">Le Petit Bistro</h3>
                <p className="text-[10px] text-muted-foreground">French Restaurant • ⭐ 4.8</p>

                <div className="flex gap-2 mt-3 overflow-x-auto">
                  {["Burgers", "Pizzas", "Salads", "Desserts"].map((c, i) => (
                    <span key={c} className={`text-[10px] px-3 py-1.5 rounded-full shrink-0 ${i === 0 ? "gradient-warm text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      {c}
                    </span>
                  ))}
                </div>

                <div className="mt-3 space-y-2">
                  {["Classic Burger", "Double Cheese"].map((item) => (
                    <div key={item} className="flex items-center gap-2 p-2 rounded-xl bg-muted/50">
                      <div className="w-10 h-10 rounded-lg bg-muted" />
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-foreground">{item}</p>
                        <p className="text-[10px] text-muted-foreground">€12.00</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
