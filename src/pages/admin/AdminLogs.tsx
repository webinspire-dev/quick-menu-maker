import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const logs = [
  { time: "14:23:45", level: "INFO", message: "New restaurant registered: La Belle Époque", user: "system" },
  { time: "14:20:12", level: "WARN", message: "Payment retry failed for Taco Loco (attempt 3/3)", user: "stripe-webhook" },
  { time: "14:15:30", level: "INFO", message: "Plan upgraded: Wok Express → Pro", user: "li@wokexpress.cn" },
  { time: "14:10:05", level: "ERROR", message: "Email delivery failed: template 'welcome' not found", user: "mailer" },
  { time: "13:58:22", level: "INFO", message: "Admin login from 192.168.1.1", user: "admin@menudigital.com" },
  { time: "13:45:10", level: "INFO", message: "Restaurant suspended: Pizza Palace", user: "admin@menudigital.com" },
  { time: "13:30:00", level: "INFO", message: "Daily backup completed successfully", user: "cron" },
  { time: "13:15:44", level: "WARN", message: "Rate limit exceeded for API key: sk_live_***", user: "api-gateway" },
];

export default function AdminLogs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">System Logs</h1>
        <p className="text-muted-foreground text-sm">Real-time platform activity logs</p>
      </div>

      <Card className="border shadow-sm overflow-hidden">
        <div className="bg-foreground/5 p-3 font-mono text-xs space-y-0.5">
          {logs.map((log, i) => (
            <div key={i} className="flex items-start gap-3 py-1.5 px-2 rounded hover:bg-muted/50">
              <span className="text-muted-foreground shrink-0">{log.time}</span>
              <Badge
                variant={log.level === "ERROR" ? "destructive" : log.level === "WARN" ? "outline" : "secondary"}
                className="text-[10px] px-1.5 py-0 shrink-0"
              >
                {log.level}
              </Badge>
              <span className="text-foreground flex-1">{log.message}</span>
              <span className="text-muted-foreground shrink-0">{log.user}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
