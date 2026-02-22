import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Crown, Zap, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free", price: "€0", period: "/mo", icon: Zap, current: false,
    features: [
      { name: "1 Restaurant", included: true },
      { name: "1 Language", included: true },
      { name: "Up to 20 Products", included: true },
      { name: "Basic QR Code", included: true },
      { name: "Multi-location", included: false },
      { name: "Advanced Analytics", included: false },
      { name: "Remove Branding", included: false },
      { name: "Priority Support", included: false },
    ],
  },
  {
    name: "Pro", price: "€29", period: "/mo", icon: Crown, current: true,
    features: [
      { name: "Multiple Restaurants", included: true },
      { name: "Multi-language", included: true },
      { name: "Unlimited Products", included: true },
      { name: "Custom QR Code", included: true },
      { name: "Multi-location", included: true },
      { name: "Advanced Analytics", included: true },
      { name: "Remove Branding", included: true },
      { name: "Priority Support", included: false },
    ],
  },
  {
    name: "Business", price: "€79", period: "/mo", icon: Building2, current: false,
    features: [
      { name: "Everything in Pro", included: true },
      { name: "API Access", included: true },
      { name: "Custom Domain", included: true },
      { name: "Dedicated Manager", included: true },
      { name: "SLA 99.9%", included: true },
      { name: "White Label", included: true },
      { name: "Priority Support", included: true },
      { name: "Custom Integrations", included: true },
    ],
  },
];

const billingHistory = [
  { date: "Feb 1, 2026", amount: "€29.00", status: "Paid", invoice: "#INV-2026-02" },
  { date: "Jan 1, 2026", amount: "€29.00", status: "Paid", invoice: "#INV-2026-01" },
  { date: "Dec 1, 2025", amount: "€29.00", status: "Paid", invoice: "#INV-2025-12" },
];

export default function RestaurantSubscription() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Subscription</h1>
        <p className="text-sm text-muted-foreground">Manage your plan and billing</p>
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <Card key={plan.name} className={cn(
            "rounded-2xl border-0 transition-shadow",
            plan.current ? "shadow-glow ring-2 ring-primary" : "shadow-card"
          )}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    plan.current ? "gradient-warm" : "bg-muted"
                  )}>
                    <plan.icon className={cn("w-5 h-5", plan.current ? "text-primary-foreground" : "text-muted-foreground")} />
                  </div>
                  <span className="font-bold text-foreground">{plan.name}</span>
                </div>
                {plan.current && <Badge className="text-[10px] border-0 bg-primary/10 text-primary">Current</Badge>}
              </div>
              <div className="mb-5">
                <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </div>
              <div className="space-y-2.5 mb-6">
                {plan.features.map((f) => (
                  <div key={f.name} className="flex items-center gap-2 text-sm">
                    {f.included ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <X className="w-4 h-4 text-muted-foreground/40" />
                    )}
                    <span className={f.included ? "text-foreground" : "text-muted-foreground/50"}>{f.name}</span>
                  </div>
                ))}
              </div>
              <Button className={cn(
                "w-full rounded-xl",
                plan.current
                  ? "bg-muted text-muted-foreground hover:bg-muted"
                  : "gradient-warm text-primary-foreground border-0"
              )} disabled={plan.current}>
                {plan.current ? "Current Plan" : "Upgrade"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Billing History */}
      <Card className="rounded-2xl shadow-card border-0">
        <CardContent className="p-5">
          <h3 className="text-base font-bold text-foreground mb-4">Billing History</h3>
          <div className="space-y-2">
            {billingHistory.map((b) => (
              <div key={b.invoice} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                <div>
                  <p className="text-sm font-semibold text-foreground">{b.invoice}</p>
                  <p className="text-xs text-muted-foreground">{b.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-foreground">{b.amount}</span>
                  <Badge className="text-[10px] border-0 bg-emerald-100 text-emerald-700">{b.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
