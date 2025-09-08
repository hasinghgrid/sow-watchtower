import { BarChart3 } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentAlerts } from "@/components/dashboard/RecentAlerts";
import { SOWTable } from "@/components/dashboard/SOWTable";
import { CostCalculator } from "@/components/dashboard/CostCalculator";

export default function SOWDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-dashboard-primary" />
          <h1 className="text-3xl font-bold text-foreground">SOW Analysis Dashboard</h1>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total SOWs"
            value="12"
            subtitle="Active contracts"
            variant="primary"
          />
          <StatCard
            title="Expiring Soon"
            value="3"
            subtitle="Within 3 months"
            variant="warning"
          />
          <StatCard
            title="Completed"
            value="5"
            subtitle="Closed contracts"
            variant="success"
          />
        </div>

        {/* Recent Alerts */}
        <RecentAlerts />

        {/* SOW Contracts Table */}
        <SOWTable />

        {/* Cost Calculator */}
        <CostCalculator />
      </div>
    </div>
  );
}