import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, Filter, Settings, PanelLeft } from "lucide-react";

interface AlertsSidebarProps {
  onFilterChange?: (filters: AlertFilters) => void;
  onSortChange?: (sortBy: string) => void;
}

interface AlertFilters {
  severity: string[];
  deviceType: string[];
  status: string[];
}

export function AlertsSidebar({ onFilterChange, onSortChange }: AlertsSidebarProps) {
  const [severityFilters, setSeverityFilters] = useState({
    all: true,
    critical: false,
    warning: false,
    info: false,
  });

  const [expandedSections, setExpandedSections] = useState({
    severity: true,
    deviceType: false,
    status: false,
    sortBy: true,
  });

  const [selectedSort, setSelectedSort] = useState("recent");

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleSeverityChange = (type: string, checked: boolean) => {
    setSeverityFilters(prev => {
      const newFilters = { ...prev, [type]: checked };
      
      // Handle "all" logic
      if (type === "all") {
        return {
          all: checked,
          critical: false,
          warning: false,
          info: false,
        };
      } else {
        newFilters.all = false;
      }
      
      return newFilters;
    });
  };

  const handleSortSelect = (sortType: string) => {
    setSelectedSort(sortType);
    onSortChange?.(sortType);
  };

  const handleReset = () => {
    setSeverityFilters({
      all: true,
      critical: false,
      warning: false,
      info: false,
    });
    setSelectedSort("recent");
  };

  const handleApplyFilters = () => {
    // Apply filters logic here
    console.log("Applying filters");
  };

  return (
    <div className="w-72 h-full bg-black border-r border-sentinel-border">
      {/* Top section with controls */}
      <div className="p-6 space-y-4">
        {/* Filter button */}
        <div className="flex items-center justify-center gap-4">
          <Filter className="w-4 h-4 text-gray-300" />
          <span className="text-sm text-gray-300">Filters</span>
        </div>
        
        {/* Sort button */}
        <Button 
          variant="ghost" 
          className="w-full justify-center text-gray-300 hover:bg-transparent"
        >
          <ChevronDown className="w-4 h-4 mr-4" />
          Sort
        </Button>
        
        {/* Settings button */}
        <Button 
          variant="ghost" 
          className="w-full justify-center text-gray-300 hover:bg-transparent"
        >
          <Settings className="w-4 h-4 mr-4" />
          Settings
        </Button>
        
        {/* Collapse button */}
        <Button 
          variant="ghost" 
          className="w-full justify-center text-gray-300 hover:bg-transparent"
        >
          <PanelLeft className="w-4 h-4 mr-4" />
          Collapse
        </Button>
      </div>

      {/* Main filter panel */}
      <div className="mx-6 mb-6 bg-[#1E2128] rounded-lg shadow-sm">
        <div className="p-6">
          {/* Title */}
          <div className="pb-4 border-b border-sentinel-border">
            <h3 className="text-xl font-medium text-white font-fira-sans">
              Filter & Sort
            </h3>
          </div>

          {/* Severity Section */}
          <div className="py-6 border-b border-sentinel-border">
            <button
              onClick={() => toggleSection("severity")}
              className="flex items-center justify-between w-full text-left"
            >
              <h4 className="text-base font-semibold text-white font-fira-sans">
                Severity
              </h4>
              <ChevronDown className="w-4 h-4 text-gray-300" />
            </button>
            
            {expandedSections.severity && (
              <div className="mt-4 space-y-3">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="all"
                    checked={severityFilters.all}
                    onCheckedChange={(checked) => 
                      handleSeverityChange("all", checked as boolean)
                    }
                    className="border-sentinel-green data-[state=checked]:bg-sentinel-green"
                  />
                  <label htmlFor="all" className="text-sm text-gray-300">
                    All
                  </label>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="critical"
                    checked={severityFilters.critical}
                    onCheckedChange={(checked) => 
                      handleSeverityChange("critical", checked as boolean)
                    }
                    className="border-gray-500"
                  />
                  <label htmlFor="critical" className="text-sm text-gray-300">
                    Critical
                  </label>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="warning"
                    checked={severityFilters.warning}
                    onCheckedChange={(checked) => 
                      handleSeverityChange("warning", checked as boolean)
                    }
                    className="border-gray-500"
                  />
                  <label htmlFor="warning" className="text-sm text-gray-300">
                    Warning
                  </label>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="info"
                    checked={severityFilters.info}
                    onCheckedChange={(checked) => 
                      handleSeverityChange("info", checked as boolean)
                    }
                    className="border-gray-500"
                  />
                  <label htmlFor="info" className="text-sm text-gray-300">
                    Info
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Device Type Section */}
          <div className="py-6 border-b border-sentinel-border">
            <button
              onClick={() => toggleSection("deviceType")}
              className="flex items-center justify-between w-full text-left"
            >
              <h4 className="text-base font-semibold text-white font-fira-sans">
                Device Type
              </h4>
              <ChevronDown className="w-4 h-4 text-gray-300" />
            </button>
          </div>

          {/* Status Section */}
          <div className="py-6 border-b border-sentinel-border">
            <button
              onClick={() => toggleSection("status")}
              className="flex items-center justify-between w-full text-left"
            >
              <h4 className="text-base font-semibold text-white font-fira-sans">
                Status
              </h4>
              <ChevronDown className="w-4 h-4 text-gray-300" />
            </button>
          </div>

          {/* Sort By Section */}
          <div className="py-6 border-b border-sentinel-border">
            <button
              onClick={() => toggleSection("sortBy")}
              className="flex items-center justify-between w-full text-left"
            >
              <h4 className="text-base font-semibold text-white font-fira-sans">
                Sort By
              </h4>
              <ChevronDown className="w-4 h-4 text-gray-300" />
            </button>
            
            {expandedSections.sortBy && (
              <div className="mt-4 space-y-2">
                <Button
                  variant={selectedSort === "recent" ? "default" : "outline"}
                  size="sm"
                  className={`w-full justify-start text-sm ${
                    selectedSort === "recent" 
                      ? "bg-sentinel-green text-white" 
                      : "bg-black border-sentinel-border text-gray-300 hover:bg-gray-900"
                  }`}
                  onClick={() => handleSortSelect("recent")}
                >
                  Recent
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-black border-sentinel-border text-gray-300 hover:bg-gray-900 text-sm"
                  onClick={() => handleSortSelect("oldest")}
                >
                  Oldest
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-black border-sentinel-border text-gray-300 hover:bg-gray-900 text-sm"
                  onClick={() => handleSortSelect("severityHigh")}
                >
                  Severity (High to Low)
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-black border-sentinel-border text-gray-300 hover:bg-gray-900 text-sm"
                  onClick={() => handleSortSelect("severityLow")}
                >
                  Severity (Low to High)
                </Button>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="bg-black border-sentinel-border text-gray-300 hover:bg-gray-900"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              className="bg-sentinel-green hover:bg-sentinel-green/80 text-white"
              size="sm"
              onClick={handleApplyFilters}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
