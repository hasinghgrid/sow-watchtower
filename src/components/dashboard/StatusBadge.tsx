import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "active" | "expiring" | "expired" | "completed";
  className?: string;
}

const statusConfig = {
  active: {
    label: "Active",
    className: "bg-status-active-bg text-status-active border-status-active/20",
  },
  expiring: {
    label: "Expiring Soon", 
    className: "bg-status-expiring-bg text-status-expiring border-status-expiring/20",
  },
  expired: {
    label: "Expired",
    className: "bg-status-expired-bg text-status-expired border-status-expired/20",
  },
  completed: {
    label: "Completed",
    className: "bg-status-completed-bg text-status-completed border-status-completed/20",
  },
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];
  
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
};