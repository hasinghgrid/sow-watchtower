import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, DollarSign } from "lucide-react";

const sowOptions = [
  { id: "SOW-2023-015", name: "Visa Project", rate: 50 },
  { id: "SOW-2023-014", name: "Pepsi Campaign", rate: 45 },
  { id: "SOW-2023-013", name: "Amazon Integration", rate: 60 },
  { id: "SOW-2023-012", name: "Google Analytics", rate: 55 },
  { id: "SOW-2023-011", name: "Apple Development", rate: 52 },
];

export const CostCalculator = () => {
  const [selectedSOW, setSelectedSOW] = useState<string>("");
  const [headCount, setHeadCount] = useState<string>("");
  const [timePeriod, setTimePeriod] = useState<string>("");
  const [customRate, setCustomRate] = useState<string>("");
  const [totalCost, setTotalCost] = useState<number>(0);

  const calculateCost = () => {
    const selectedOption = sowOptions.find(sow => sow.id === selectedSOW);
    const rate = customRate ? parseFloat(customRate) : selectedOption?.rate || 0;
    const heads = parseInt(headCount) || 0;
    const hours = parseInt(timePeriod) || 0;
    
    const total = rate * heads * hours;
    setTotalCost(total);
  };

  const reset = () => {
    setSelectedSOW("");
    setHeadCount("");
    setTimePeriod("");
    setCustomRate("");
    setTotalCost(0);
  };

  return (
    <Card className="p-6 bg-surface-elevated">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-5 h-5 text-dashboard-primary" />
        <h2 className="text-xl font-semibold text-foreground">Cost Calculator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sow-select">Select SOW Contract</Label>
            <Select value={selectedSOW} onValueChange={setSelectedSOW}>
              <SelectTrigger id="sow-select">
                <SelectValue placeholder="Choose a contract..." />
              </SelectTrigger>
              <SelectContent>
                {sowOptions.map((sow) => (
                  <SelectItem key={sow.id} value={sow.id}>
                    {sow.name} (${sow.rate}/hr)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="head-count">Resource Head Count</Label>
            <Input
              id="head-count"
              type="number"
              placeholder="Number of resources"
              value={headCount}
              onChange={(e) => setHeadCount(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time-period">Time Period (Hours)</Label>
            <Input
              id="time-period"
              type="number"
              placeholder="Total hours"
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="custom-rate">Custom Rate per Hour (Optional)</Label>
            <Input
              id="custom-rate"
              type="number"
              placeholder="Override default rate"
              value={customRate}
              onChange={(e) => setCustomRate(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-surface-subtle p-6 rounded-lg border">
            <div className="text-center space-y-3">
              <DollarSign className="w-8 h-8 text-dashboard-primary mx-auto" />
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Estimated Cost</p>
                <p className="text-3xl font-bold text-dashboard-primary">
                  ${totalCost.toLocaleString()}
                </p>
              </div>
              
              {totalCost > 0 && (
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>Rate: ${customRate || sowOptions.find(s => s.id === selectedSOW)?.rate || 0}/hr</p>
                  <p>Resources: {headCount}</p>
                  <p>Hours: {timePeriod}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={calculateCost}
              className="flex-1 bg-dashboard-primary hover:bg-dashboard-primary/90 text-dashboard-primary-foreground"
              disabled={!selectedSOW || !headCount || !timePeriod}
            >
              Calculate
            </Button>
            <Button variant="outline" onClick={reset}>
              Reset
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};