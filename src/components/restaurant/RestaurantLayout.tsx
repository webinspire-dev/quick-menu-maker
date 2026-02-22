import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Store,
  FolderOpen,
  ShoppingBag,
  ListChecks,
  ClipboardList,
  BarChart3,
  Languages,
  Palette,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  LogOut,
  Crown,
  Monitor,
  Users,
  Grid3X3,
  FileBarChart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const plan: "Free" | "Pro" | "Business" = "Pro";

const menuItems = [
  { title: "Dashboard", url: "/restaurant", icon: LayoutDashboard },
  { title: "My Restaurants", url: "/restaurant/branches", icon: Store, proOnly: true },
  { title: "Categories", url: "/restaurant/categories", icon: FolderOpen },
  { title: "Products", url: "/restaurant/products", icon: ShoppingBag },
  { title: "Option Groups", url: "/restaurant/options", icon: ListChecks },
  { title: "Orders", url: "/restaurant/orders", icon: ClipboardList, badge: 5 },
  { title: "Analytics", url: "/restaurant/analytics", icon: BarChart3 },
  { title: "Languages", url: "/restaurant/languages", icon: Languages },
  { title: "Appearance", url: "/restaurant/appearance", icon: Palette },
  { title: "Subscription", url: "/restaurant/subscription", icon: CreditCard },
  { title: "Settings", url: "/restaurant/settings", icon: Settings },
  { title: "— POS —", url: "#", icon: Monitor, separator: true },
  { title: "POS Terminals", url: "/restaurant/pos", icon: Monitor },
  { title: "Servers / Staff", url: "/restaurant/pos/servers", icon: Users },
  { title: "Tables", url: "/restaurant/pos/tables", icon: Grid3X3 },
  { title: "POS Terminal", url: "/restaurant/pos/terminal", icon: Monitor },
  { title: "POS Reports", url: "/restaurant/pos/reports", icon: FileBarChart },
];

const planColors = {
  Free: "bg-muted text-muted-foreground",
  Pro: "bg-primary/10 text-primary",
  Business: "bg-primary text-primary-foreground",
};

export function RestaurantLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-muted/30">
      {/* Sidebar */}
      <aside
        className={cn(
          "flex flex-col h-full transition-all duration-300 border-r bg-background",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo + Plan */}
        <div className="flex items-center h-16 px-4 border-b">
          {!collapsed ? (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl gradient-warm flex items-center justify-center">
                  <Store className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-bold text-sm text-foreground">MenuPro</span>
              </div>
              <Badge className={cn("text-[10px] font-semibold border-0", planColors[plan])}>
                {plan}
              </Badge>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-xl gradient-warm flex items-center justify-center mx-auto">
              <Store className="w-4 h-4 text-primary-foreground" />
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 space-y-0.5 px-2 overflow-y-auto">
          {menuItems.map((item) => {
            if (item.proOnly && plan === "Free") return null;
            if ((item as any).separator) {
              if (collapsed) return null;
              return <p key={item.title} className="px-3 pt-4 pb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{item.title.replace(/—/g, "").trim()}</p>;
            }
            const isActive =
              item.url === "/restaurant"
                ? location.pathname === "/restaurant"
                : location.pathname.startsWith(item.url);
            return (
              <NavLink
                key={item.url}
                to={item.url}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                  collapsed && "justify-center px-2",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                activeClassName=""
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span className="flex-1">{item.title}</span>}
                {!collapsed && item.badge && (
                  <Badge className="h-5 min-w-5 flex items-center justify-center text-[10px] gradient-warm text-primary-foreground border-0">
                    {item.badge}
                  </Badge>
                )}
                {!collapsed && item.proOnly && (
                  <Crown className="w-3.5 h-3.5 text-primary opacity-50" />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Restaurant Switcher */}
        {!collapsed && plan !== "Free" && (
          <div className="px-3 pb-2">
            <div className="p-3 rounded-xl bg-muted/50 border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                  LP
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate">Le Petit Bistro</p>
                  <p className="text-[10px] text-muted-foreground">Main Branch</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Collapse */}
        <div className="p-2 border-t">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm text-muted-foreground transition-colors hover:bg-muted"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 border-b bg-background flex items-center justify-between px-6 shrink-0">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search products, orders..." className="pl-9 h-9 bg-muted/50 border-0 rounded-xl" />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="rounded-xl text-xs gap-1.5">
              <Palette className="w-3.5 h-3.5" />
              Preview Menu
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
            </Button>
            <div className="w-8 h-8 rounded-full gradient-warm flex items-center justify-center text-xs font-bold text-primary-foreground">
              JD
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
