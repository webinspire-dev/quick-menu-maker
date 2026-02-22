import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Store,
  CreditCard,
  BarChart3,
  Settings,
  Users,
  FileText,
  HeadphonesIcon,
  Receipt,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Bell,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const menuItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Restaurants", url: "/admin/restaurants", icon: Store },
  { title: "Subscriptions", url: "/admin/subscriptions", icon: Receipt },
  { title: "Payments", url: "/admin/payments", icon: CreditCard },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  { title: "Support Tickets", url: "/admin/support", icon: HeadphonesIcon, badge: 3 },
  { title: "System Settings", url: "/admin/settings", icon: Settings },
  { title: "Logs", url: "/admin/logs", icon: FileText },
  { title: "Admin Users", url: "/admin/users", icon: Users },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-muted/30">
      {/* Dark Sidebar */}
      <aside
        className={cn(
          "flex flex-col h-full transition-all duration-300 border-r",
          collapsed ? "w-16" : "w-64"
        )}
        style={{
          backgroundColor: "hsl(var(--sidebar-background))",
          borderColor: "hsl(var(--sidebar-border))",
        }}
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b" style={{ borderColor: "hsl(var(--sidebar-border))" }}>
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Store className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-sm" style={{ color: "hsl(0 0% 95%)" }}>
                MenuAdmin
              </span>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center mx-auto">
              <Store className="w-4 h-4 text-primary-foreground" />
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.url || 
              (item.url !== "/admin" && location.pathname.startsWith(item.url));
            return (
              <NavLink
                key={item.url}
                to={item.url}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all group",
                  collapsed && "justify-center px-2"
                )}
                activeClassName=""
                style={{
                  backgroundColor: isActive ? "hsl(var(--sidebar-accent))" : "transparent",
                  color: isActive ? "hsl(0 0% 95%)" : "hsl(var(--sidebar-foreground))",
                }}
              >
                <item.icon className={cn("w-5 h-5 shrink-0", isActive && "text-primary")} />
                {!collapsed && (
                  <span className="flex-1">{item.title}</span>
                )}
                {!collapsed && item.badge && (
                  <Badge className="h-5 min-w-5 flex items-center justify-center text-[10px] bg-primary text-primary-foreground border-0">
                    {item.badge}
                  </Badge>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Collapse toggle */}
        <div className="p-2 border-t" style={{ borderColor: "hsl(var(--sidebar-border))" }}>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-[hsl(220,25%,15%)]"
            style={{ color: "hsl(var(--sidebar-foreground))" }}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 border-b bg-background flex items-center justify-between px-6 shrink-0">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search restaurants, users..." className="pl-9 h-9 bg-muted/50 border-0" />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
            </Button>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
              SA
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
