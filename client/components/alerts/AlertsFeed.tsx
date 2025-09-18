import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCard } from "./AlertCard";
import { Search, SquareDashed, CloudUpload, RotateCcw, CircleX } from "lucide-react";

interface Alert {
  id: string;
  severity: "critical" | "warning" | "info";
  timestamp: string;
  message: string;
  device: string;
  status?: "acknowledged" | "resolved";
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    severity: "critical",
    timestamp: "2024-07-26 14:20:15",
    message: "Perimeter breach detected in Sector 7, near main gate. Immediate action required.",
    device: "Sensor Array 007",
  },
  {
    id: "2",
    severity: "warning",
    timestamp: "2024-07-26 14:15:30",
    message: "Voltage anomaly detected on Fence Line 3. Potential tampering.",
    device: "Fence Monitor 3",
  },
  {
    id: "3",
    severity: "info",
    timestamp: "2024-07-26 14:10:05",
    message: "Device firmware update completed successfully on Camera 12.",
    device: "Camera 012",
    status: "acknowledged",
  },
  {
    id: "4",
    severity: "critical",
    timestamp: "2024-07-26 14:05:40",
    message: "Unauthorized drone detected near restricted airspace. Initiating countermeasures.",
    device: "Airspace Radar",
  },
  {
    id: "5",
    severity: "warning",
    timestamp: "2024-07-26 13:58:10",
    message: "High traffic volume detected on network segment A. Investigate for DDoS activity.",
    device: "Network IDS",
  },
  {
    id: "6",
    severity: "info",
    timestamp: "2024-07-26 13:50:00",
    message: "Routine system diagnostic complete. No critical issues found.",
    device: "Main Server",
    status: "resolved",
  },
  {
    id: "7",
    severity: "critical",
    timestamp: "2024-07-26 13:45:22",
    message: "Power grid instability in Sector 2. Switching to backup power.",
    device: "Power Grid Monitor",
  },
];

export function AlertsFeed() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAcknowledge = (id: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === id ? { ...alert, status: "acknowledged" } : alert
      )
    );
  };

  const handleResolve = (id: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === id ? { ...alert, status: "resolved" } : alert
      )
    );
  };

  const handleSelectAll = () => {
    console.log("Select all alerts");
  };

  const handleExportData = () => {
    console.log("Export data");
  };

  const handleRefreshFeed = () => {
    console.log("Refresh feed");
  };

  const handleClearAllCritical = () => {
    console.log("Clear all critical alerts");
  };

  const filteredAlerts = alerts.filter(alert =>
    alert.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alert.device.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 bg-sentinel-bg text-white">
      {/* Header */}
      <div className="p-8 pb-6">
        <h1 className="text-2xl font-semibold text-white font-fira-sans mb-8">
          Alerts & Notifications
        </h1>
        
        {/* Action buttons */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="sm"
            className="bg-black border-sentinel-border text-gray-300 hover:bg-gray-900"
            onClick={handleSelectAll}
          >
            <SquareDashed className="w-4 h-4 mr-2" />
            Select All
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="bg-black border-sentinel-border text-gray-300 hover:bg-gray-900"
            onClick={handleExportData}
          >
            <CloudUpload className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="bg-black border-sentinel-border text-gray-300 hover:bg-gray-900"
            onClick={handleRefreshFeed}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Refresh Feed
          </Button>
          
          <Button
            variant="destructive"
            size="sm"
            className="bg-red-500 hover:bg-red-600 text-white ml-auto"
            onClick={handleClearAllCritical}
          >
            <CircleX className="w-4 h-4 mr-2" />
            Clear All Critical
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="px-8 pb-8">
        <div className="bg-[#1E2128] rounded-lg shadow-sm p-6">
          {/* Feed header */}
          <div className="flex items-center justify-between pb-6 border-b border-sentinel-border mb-6">
            <h2 className="text-xl font-medium text-white font-fira-sans">
              Real-time Alert Feed
            </h2>
            
            {/* Search bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search alerts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 h-10 pl-10 pr-4 text-sm bg-black border border-sentinel-border rounded-md text-gray-300 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-sentinel-green"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>
          </div>

          {/* Alert list */}
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
            {filteredAlerts.map((alert) => (
              <AlertCard
                key={alert.id}
                {...alert}
                onAcknowledge={handleAcknowledge}
                onResolve={handleResolve}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
