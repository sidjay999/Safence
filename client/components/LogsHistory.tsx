import { useState } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { Footer } from "./Footer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { ChevronLeft, ChevronRight, Search, Filter, FileText, PanelLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogEvent {
  id: string;
  timestamp: string;
  type: string;
  deviceId: string;
  status: "Normal" | "Critical" | "Info" | "Warning";
}

const sampleData: LogEvent[] = [
  {
    id: "EVNT-001-20240701-1",
    timestamp: "2024-07-01 10:30:15",
    type: "Sensor Reading",
    deviceId: "MAG-007",
    status: "Normal"
  },
  {
    id: "EVNT-002-20240701-2",
    timestamp: "2024-07-01 10:35:40",
    type: "Tamper Alert",
    deviceId: "FENC-003",
    status: "Critical"
  },
  {
    id: "EVNT-003-20240701-3",
    timestamp: "2024-07-01 10:45:00",
    type: "System Heartbeat",
    deviceId: "CTRL-001",
    status: "Info"
  },
  {
    id: "EVNT-004-20240701-4",
    timestamp: "2024-07-01 10:50:22",
    type: "Device Offline",
    deviceId: "CAM-005",
    status: "Warning"
  },
  {
    id: "EVNT-005-20240701-5",
    timestamp: "2024-07-01 11:00:05",
    type: "Sensor Reading",
    deviceId: "MAG-007",
    status: "Normal"
  },
  {
    id: "EVNT-006-20240701-6",
    timestamp: "2024-07-01 11:15:30",
    type: "Illegal Activity",
    deviceId: "CAM-002",
    status: "Critical"
  },
  {
    id: "EVNT-007-20240701-7",
    timestamp: "2024-07-01 11:20:10",
    type: "Over-voltage",
    deviceId: "FENC-001",
    status: "Critical"
  },
  {
    id: "EVNT-008-20240701-8",
    timestamp: "2024-07-01 11:25:55",
    type: "Firmware Update",
    deviceId: "ESP-010",
    status: "Info"
  },
  {
    id: "EVNT-009-20240701-9",
    timestamp: "2024-07-01 11:30:00",
    type: "Device Online",
    deviceId: "CAM-005",
    status: "Normal"
  },
  {
    id: "EVNT-010-20240701-10",
    timestamp: "2024-07-01 11:40:18",
    type: "Configuration Change",
    deviceId: "LORA-004",
    status: "Info"
  }
];

function StatusBadge({ status }: { status: LogEvent["status"] }) {
  const getStatusStyles = (status: LogEvent["status"]) => {
    switch (status) {
      case "Critical":
        return "bg-red-500 text-white hover:bg-red-600";
      case "Warning":
        return "border border-sentinel-border bg-transparent text-sentinel-text hover:bg-sentinel-border/20";
      case "Info":
        return "bg-[#262A33] text-sentinel-text hover:bg-[#262A33]/80";
      case "Normal":
        return "border border-sentinel-border bg-transparent text-sentinel-text hover:bg-sentinel-border/20";
      default:
        return "border border-sentinel-border bg-transparent text-sentinel-text";
    }
  };

  return (
    <Badge className={cn("text-xs font-semibold", getStatusStyles(status))}>
      {status}
    </Badge>
  );
}

export function LogsHistory() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-sentinel-bg">
      <DashboardHeader />
      
      <div className="flex">
        {/* Collapsible Sidebar */}
        <div 
          className={cn(
            "transition-all duration-300 bg-sentinel-bg border-r border-sentinel-border",
            isCollapsed ? "w-0" : "w-64"
          )}
        >
          <div className={cn(
            "h-[calc(100vh-64px)] flex flex-col justify-end p-4",
            isCollapsed && "hidden"
          )}>
            <Button
              onClick={() => setIsCollapsed(true)}
              className="w-full bg-sentinel-green hover:bg-sentinel-green/90 text-white"
            >
              <PanelLeft className="w-4 h-4 mr-2" />
              Collapse
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="p-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-semibold font-fira-sans text-sentinel-text mb-6">
                Logs and History
              </h1>
              
              {/* Search and Action Bar */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-sentinel-muted" />
                  <Input
                    placeholder="Search event ID, device, type..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-sentinel-bg border-sentinel-border text-sentinel-text placeholder:text-sentinel-muted"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="border-sentinel-border bg-sentinel-bg text-sentinel-text hover:bg-sentinel-border/20"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  
                  <Button className="bg-sentinel-green hover:bg-sentinel-green/90 text-white">
                    <FileText className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                  
                  <Button className="bg-sentinel-green hover:bg-sentinel-green/90 text-white">
                    <FileText className="w-4 h-4 mr-2" />
                    Export PDF
                  </Button>
                </div>
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-[#1E2128] rounded-lg border border-sentinel-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-sentinel-border hover:bg-transparent">
                    <TableHead className="bg-[#171A1F] text-sentinel-muted font-medium py-4 px-4 w-[280px]">
                      Event ID
                    </TableHead>
                    <TableHead className="bg-[#171A1F] text-sentinel-muted font-medium py-4 px-4 w-[280px]">
                      Timestamp
                    </TableHead>
                    <TableHead className="bg-[#171A1F] text-sentinel-muted font-medium py-4 px-4 w-[210px]">
                      Type
                    </TableHead>
                    <TableHead className="bg-[#171A1F] text-sentinel-muted font-medium py-4 px-4 w-[210px]">
                      Device ID
                    </TableHead>
                    <TableHead className="bg-[#171A1F] text-sentinel-muted font-medium py-4 px-4 w-[140px] text-right">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleData.map((event, index) => (
                    <TableRow
                      key={event.id}
                      className={cn(
                        "border-b border-sentinel-border hover:bg-transparent",
                        index % 2 === 0 ? "bg-[#1E2128]" : "bg-[#171A1F]"
                      )}
                    >
                      <TableCell className="text-sentinel-text py-4 px-4 font-normal">
                        {event.id}
                      </TableCell>
                      <TableCell className="text-sentinel-text py-4 px-4 font-normal">
                        {event.timestamp}
                      </TableCell>
                      <TableCell className="text-sentinel-text py-4 px-4 font-normal">
                        {event.type}
                      </TableCell>
                      <TableCell className="text-sentinel-text py-4 px-4 font-normal">
                        {event.deviceId}
                      </TableCell>
                      <TableCell className="py-4 px-4 text-right">
                        <div className="flex justify-end">
                          <StatusBadge status={event.status} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <Button
                variant="outline"
                className="border-sentinel-border bg-sentinel-bg text-sentinel-text hover:bg-sentinel-border/20"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              <span className="text-sm text-sentinel-muted">
                Showing 1-10 of 10 events
              </span>
              
              <Button
                variant="outline"
                className="border-sentinel-border bg-sentinel-bg text-sentinel-text hover:bg-sentinel-border/20"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Collapsed Sidebar Expand Button */}
        {isCollapsed && (
          <div className="fixed bottom-4 left-4">
            <Button
              onClick={() => setIsCollapsed(false)}
              className="bg-sentinel-green hover:bg-sentinel-green/90 text-white"
              size="sm"
            >
              <PanelLeft className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
