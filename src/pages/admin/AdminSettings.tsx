import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function AdminSettings() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">System Settings</h1>
        <p className="text-muted-foreground text-sm">Configure platform-wide settings</p>
      </div>

      <Card className="border shadow-sm">
        <CardHeader><CardTitle className="text-base">Branding</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Platform Name</Label>
              <Input defaultValue="MenuDigital" />
            </div>
            <div className="space-y-2">
              <Label>Support Email</Label>
              <Input defaultValue="support@menudigital.com" />
            </div>
          </div>
          <Button size="sm">Save Changes</Button>
        </CardContent>
      </Card>

      <Card className="border shadow-sm">
        <CardHeader><CardTitle className="text-base">Platform Fees</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Transaction Fee (%)</Label>
              <Input type="number" defaultValue="2.5" />
            </div>
            <div className="space-y-2">
              <Label>Setup Fee (€)</Label>
              <Input type="number" defaultValue="0" />
            </div>
          </div>
          <Button size="sm">Update Fees</Button>
        </CardContent>
      </Card>

      <Card className="border shadow-sm">
        <CardHeader><CardTitle className="text-base">Feature Toggles</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "Maintenance Mode", desc: "Disable access for non-admin users", checked: false },
            { label: "New Registrations", desc: "Allow new restaurant signups", checked: true },
            { label: "Email Notifications", desc: "Send transactional emails", checked: true },
            { label: "QR Code Analytics", desc: "Track QR code scans", checked: true },
            { label: "Beta Features", desc: "Enable experimental features", checked: false },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <Switch defaultChecked={item.checked} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
