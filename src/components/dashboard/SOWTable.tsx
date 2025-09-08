import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "./StatusBadge";
import { Search, Upload, Filter } from "lucide-react";

interface SOWContract {
  id: string;
  name: string;
  client: string;
  startDate: string;
  endDate: string;
  status: "active" | "expiring" | "expired" | "completed";
  headCount: number;
  costPerHour: number;
  totalCost?: number;
}

const mockContracts: SOWContract[] = [
  {
    id: "SOW-2023-015",
    name: "SOW-2023-015",
    client: "Visa",
    startDate: "2023-06-15",
    endDate: "2023-12-15", 
    status: "expiring",
    headCount: 10,
    costPerHour: 50,
  },
  {
    id: "SOW-2023-014",
    name: "SOW-2023-014", 
    client: "Pepsi",
    startDate: "2023-05-10",
    endDate: "2024-05-10",
    status: "active",
    headCount: 8,
    costPerHour: 45,
  },
  {
    id: "SOW-2023-013",
    name: "SOW-2023-013",
    client: "Amazon", 
    startDate: "2023-04-01",
    endDate: "2023-10-01",
    status: "completed",
    headCount: 12,
    costPerHour: 60,
  },
  {
    id: "SOW-2023-012",
    name: "SOW-2023-012",
    client: "Google",
    startDate: "2023-03-15", 
    endDate: "2023-09-15",
    status: "expired",
    headCount: 9,
    costPerHour: 55,
  },
  {
    id: "SOW-2023-011",
    name: "SOW-2023-011",
    client: "Apple",
    startDate: "2023-02-20",
    endDate: "2023-08-20", 
    status: "completed",
    headCount: 7,
    costPerHour: 52,
  },
];

export const SOWTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("recent");

  const filteredContracts = mockContracts.filter((contract) => {
    const matchesSearch = contract.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || contract.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedContracts = [...filteredContracts].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "date":
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      case "recent":
      default:
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    }
  });

  return (
    <Card className="p-6 bg-surface-elevated">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold text-foreground">SOW Contracts</h2>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search contracts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 min-w-[200px]"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="expiring">Expiring</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[130px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recent</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="date">Date</SelectItem>
            </SelectContent>
          </Select>
          
          <Button className="bg-dashboard-primary hover:bg-dashboard-primary/90 text-dashboard-primary-foreground">
            <Upload className="w-4 h-4 mr-2" />
            Upload SOW
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Name</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Client</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Start Date</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">End Date</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Head Count</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Cost/hr</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedContracts.map((contract) => (
              <tr key={contract.id} className="border-b border-border/50 hover:bg-surface-subtle transition-colors">
                <td className="py-4 px-4 font-medium text-foreground">{contract.name}</td>
                <td className="py-4 px-4 text-foreground">{contract.client}</td>
                <td className="py-4 px-4 text-muted-foreground">{contract.startDate}</td>
                <td className="py-4 px-4 text-muted-foreground">{contract.endDate}</td>
                <td className="py-4 px-4">
                  <StatusBadge status={contract.status} />
                </td>
                <td className="py-4 px-4 text-foreground">{contract.headCount}</td>
                <td className="py-4 px-4 text-foreground">${contract.costPerHour}</td>
                <td className="py-4 px-4">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="text-dashboard-primary border-dashboard-primary hover:bg-dashboard-primary/10">
                      View
                    </Button>
                    <Button size="sm" className="bg-status-active hover:bg-status-active/90 text-white">
                      Update
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};