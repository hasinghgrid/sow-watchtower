import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  variant?: "default" | "primary" | "success" | "warning";
  className?: string;
}

const variantStyles = {
  default: "bg-surface-elevated",
  primary: "bg-dashboard-primary/5 border-dashboard-primary/20",
  success: "bg-status-active-bg border-status-active/20",
  warning: "bg-status-expiring-bg border-status-expiring/20",
};

export const StatCard = ({ 
  title, 
  value, 
  subtitle, 
  variant = "default",
  className 
}: StatCardProps) => {
  return (
    <Card className={cn(
      "p-6 border transition-all duration-200 hover:shadow-lg",
      variantStyles[variant],
      className
    )}>
      <div className="text-center space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="text-3xl font-bold text-foreground">{value}</div>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </Card>
  );
};