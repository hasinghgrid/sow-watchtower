import { Card } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface Alert {
  id: string;
  type: "warning" | "error" | "success";
  message: string;
  contract: string;
}

const alerts: Alert[] = [
  {
    id: "1",
    type: "warning",
    message: "SOW-2023-015 expires in 45 days.",
    contract: "Contract Expiring:",
  },
  {
    id: "2", 
    type: "error",
    message: "SOW-2023-008 expired 15 days ago.",
    contract: "Contract Expired:",
  },
  {
    id: "3",
    type: "success", 
    message: "SOW-2023-011 has been updated.",
    contract: "Contract Updated:",
  },
];

const alertConfig = {
  warning: {
    icon: AlertTriangle,
    className: "bg-alert-warning-bg border-l-alert-warning text-alert-warning",
    iconColor: "text-alert-warning",
  },
  error: {
    icon: XCircle,
    className: "bg-alert-error-bg border-l-alert-error text-alert-error", 
    iconColor: "text-alert-error",
  },
  success: {
    icon: CheckCircle,
    className: "bg-alert-success-bg border-l-alert-success text-alert-success",
    iconColor: "text-alert-success",
  },
};

export const RecentAlerts = () => {
  return (
    <Card className="p-6 bg-surface-elevated">
      <h2 className="text-lg font-semibold text-foreground mb-4">Recent Alerts</h2>
      <div className="space-y-3">
        {alerts.map((alert) => {
          const config = alertConfig[alert.type];
          const Icon = config.icon;
          
          return (
            <div
              key={alert.id}
              className={`p-4 border-l-4 rounded-r-lg ${config.className}`}
            >
              <div className="flex items-start gap-3">
                <Icon className={`w-5 h-5 mt-0.5 ${config.iconColor}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{alert.contract}</p>
                  <p className="text-sm opacity-90">{alert.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};