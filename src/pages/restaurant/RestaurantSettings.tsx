import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Store, MapPin, Clock, Phone, Globe, Trash2 } from "lucide-react";

export default function RestaurantSettings() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your restaurant details</p>
      </div>

      {/* Restaurant Info */}
      <Card className="rounded-2xl shadow-card border-0">
        <CardContent className="p-5 space-y-4">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Store className="w-4 h-4" /> Restaurant Info
          </h3>
          <div>
            <Label className="text-xs font-semibold">Restaurant Name</Label>
            <Input defaultValue="Le Petit Bistro" className="rounded-xl mt-1.5" />
          </div>
          <div>
            <Label className="text-xs font-semibold">Description</Label>
            <Textarea defaultValue="Authentic French cuisine in the heart of the city." className="rounded-xl mt-1.5" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-semibold">Phone</Label>
              <Input defaultValue="+33 1 23 45 67 89" className="rounded-xl mt-1.5" />
            </div>
            <div>
              <Label className="text-xs font-semibold">Website</Label>
              <Input defaultValue="www.lepetitbistro.fr" className="rounded-xl mt-1.5" />
            </div>
          </div>
          <div>
            <Label className="text-xs font-semibold">Address</Label>
            <Input defaultValue="12 Rue de la Paix, 75002 Paris" className="rounded-xl mt-1.5" />
          </div>
        </CardContent>
      </Card>

      {/* Opening Hours */}
      <Card className="rounded-2xl shadow-card border-0">
        <CardContent className="p-5 space-y-4">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Clock className="w-4 h-4" /> Opening Hours
          </h3>
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
            <div key={day} className="flex items-center gap-3">
              <span className="w-24 text-sm text-foreground">{day}</span>
              <Input defaultValue="11:00" className="w-20 rounded-xl h-8 text-xs" />
              <span className="text-xs text-muted-foreground">to</span>
              <Input defaultValue="22:00" className="w-20 rounded-xl h-8 text-xs" />
              <Switch defaultChecked />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Currency / Timezone */}
      <Card className="rounded-2xl shadow-card border-0">
        <CardContent className="p-5 space-y-4">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Globe className="w-4 h-4" /> Regional
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-semibold">Currency</Label>
              <Select defaultValue="eur">
                <SelectTrigger className="rounded-xl mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="eur">€ EUR</SelectItem>
                  <SelectItem value="usd">$ USD</SelectItem>
                  <SelectItem value="gbp">£ GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs font-semibold">Timezone</Label>
              <Select defaultValue="cet">
                <SelectTrigger className="rounded-xl mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cet">CET (Paris)</SelectItem>
                  <SelectItem value="gmt">GMT (London)</SelectItem>
                  <SelectItem value="est">EST (New York)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="rounded-2xl border-destructive/30 border">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-destructive">Delete Restaurant</p>
              <p className="text-xs text-muted-foreground">This action cannot be undone.</p>
            </div>
            <Button variant="destructive" size="sm" className="rounded-xl gap-1.5 text-xs">
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </Button>
          </div>
        </CardContent>
      </Card>

      <Button className="w-full rounded-xl gradient-warm text-primary-foreground border-0">
        Save Settings
      </Button>
    </div>
  );
}
