import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Globe, Lock, Crown, Sparkles } from "lucide-react";

const languages = [
  { name: "French", code: "FR", flag: "🇫🇷", default: true, active: true },
  { name: "English", code: "EN", flag: "🇬🇧", default: false, active: true },
  { name: "Arabic", code: "AR", flag: "🇸🇦", default: false, active: false },
];

export default function RestaurantLanguages() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Languages</h1>
        <p className="text-sm text-muted-foreground">Manage translations for your menu</p>
      </div>

      {/* Default Language */}
      <Card className="rounded-2xl shadow-card border-0">
        <CardContent className="p-5">
          <h3 className="text-sm font-bold text-foreground mb-3">Default Language</h3>
          <Select defaultValue="fr">
            <SelectTrigger className="rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fr">🇫🇷 French</SelectItem>
              <SelectItem value="en">🇬🇧 English</SelectItem>
              <SelectItem value="ar">🇸🇦 Arabic</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Auto Translation */}
      <Card className="rounded-2xl shadow-card border-0">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Auto Translation</p>
                <p className="text-xs text-muted-foreground">Automatically translate menu items</p>
              </div>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Language List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-foreground">Active Languages</h3>
          <Button size="sm" className="rounded-xl gap-1.5 gradient-warm text-primary-foreground border-0 text-xs">
            <Plus className="w-3.5 h-3.5" /> Add Language
          </Button>
        </div>
        {languages.map((lang) => (
          <Card key={lang.code} className="rounded-2xl shadow-soft border-0">
            <CardContent className="p-4 flex items-center gap-4">
              <span className="text-2xl">{lang.flag}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">{lang.name}</span>
                  {lang.default && (
                    <Badge className="text-[10px] border-0 bg-primary/10 text-primary">Default</Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{lang.code}</p>
              </div>
              <Switch checked={lang.active} />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upgrade Banner */}
      <Card className="rounded-2xl border-0 overflow-hidden">
        <CardContent className="p-5 gradient-warm-soft">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-warm flex items-center justify-center">
              <Crown className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-foreground">Unlock More Languages</p>
              <p className="text-xs text-muted-foreground">Free plan supports 1 language. Upgrade to Pro for multi-language menus.</p>
            </div>
            <Button size="sm" className="rounded-xl text-xs gradient-warm text-primary-foreground border-0">
              Upgrade
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
