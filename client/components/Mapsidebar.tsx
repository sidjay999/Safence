import { ChevronLeft } from "lucide-react";

interface Filters {
  safe: boolean;
  warning: boolean;
  alert: boolean;
  sensorNode: boolean;
  camera: boolean;
  gateway: boolean;
}

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

export default function Mapsidebar({ isCollapsed, onToggleCollapse, filters, onFilterChange }: SidebarProps) {
  const handleFilterChange = (filter: keyof Filters) => {
    onFilterChange({ ...filters, [filter]: !filters[filter] });
  };

  const handleApplyFilters = () => {
    // Trigger filter application (e.g., update map based on filters)
    // This could dispatch an action, call an API, or pass filters to the parent
    console.log("Applied filters:", filters);
  };

  if (isCollapsed) {
    return (
      <div className="w-16 min-h-full sentinel-bg border-r border-sentinel-border flex flex-col items-center justify-end p-3">
        <button
          onClick={onToggleCollapse}
          className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-800 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 text-sentinel-text-primary rotate-180" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-64 min-h-full sentinel-bg border-r border-sentinel-border flex flex-col">
      {/* Device Filters Section */}
      <div className="flex-1 p-4">
        <div className="sentinel-card rounded-lg p-4">
          <h2 className="text-sentinel-text-primary font-fira text-xl font-semibold mb-6">
            Device Filters
          </h2>

          {/* Status Section */}
          <div className="mb-6">
            <h3 className="text-sentinel-text-secondary font-roboto text-sm font-medium mb-3">
              Status
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.safe}
                  onChange={() => handleFilterChange("safe")}
                  className="hidden"
                />
                <div
                  className={`w-4 h-4 rounded-sm border-0 flex items-center justify-center ${
                    filters.safe ? "bg-sentinel-green" : "bg-gray-600"
                  }`}
                >
                  {filters.safe && (
                    <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2.14999 6L4.62499 8.475L9.84999 3.25"
                        stroke="#E7FFF3"
                        strokeWidth="0.66"
                        strokeMiterlimit="10"
                        strokeLinecap="square"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-sentinel-text-primary font-roboto text-sm">Safe</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.warning}
                  onChange={() => handleFilterChange("warning")}
                  className="hidden"
                />
                <div
                  className={`w-4 h-4 rounded-sm border-0 flex items-center justify-center ${
                    filters.warning ? "bg-sentinel-green" : "bg-gray-600"
                  }`}
                >
                  {filters.warning && (
                    <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2.14999 6L4.62499 8.475L9.84999 3.25"
                        stroke="#E7FFF3"
                        strokeWidth="0.66"
                        strokeMiterlimit="10"
                        strokeLinecap="square"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-sentinel-text-primary font-roboto text-sm">Warning</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.alert}
                  onChange={() => handleFilterChange("alert")}
                  className="hidden"
                />
                <div
                  className={`w-4 h-4 rounded-sm border-0 flex items-center justify-center ${
                    filters.alert ? "bg-sentinel-green" : "bg-gray-600"
                  }`}
                >
                  {filters.alert && (
                    <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2.14999 6L4.62499 8.475L9.84999 3.25"
                        stroke="#E7FFF3"
                        strokeWidth="0.66"
                        strokeMiterlimit="10"
                        strokeLinecap="square"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-sentinel-text-primary font-roboto text-sm">Alert</span>
              </label>
            </div>
          </div>

          {/* Device Type Section */}
          <div className="mb-6">
            <h3 className="text-sentinel-text-secondary font-roboto text-sm font-medium mb-3">
              Device Type
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.sensorNode}
                  onChange={() => handleFilterChange("sensorNode")}
                  className="hidden"
                />
                <div
                  className={`w-4 h-4 rounded-sm border-0 flex items-center justify-center ${
                    filters.sensorNode ? "bg-sentinel-green" : "bg-gray-600"
                  }`}
                >
                  {filters.sensorNode && (
                    <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2.14999 6L4.62499 8.475L9.84999 3.25"
                        stroke="#E7FFF3"
                        strokeWidth="0.66"
                        strokeMiterlimit="10"
                        strokeLinecap="square"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-sentinel-text-primary font-roboto text-sm">Sensor Node</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.camera}
                  onChange={() => handleFilterChange("camera")}
                  className="hidden"
                />
                <div
                  className={`w-4 h-4 rounded-sm border-0 flex items-center justify-center ${
                    filters.camera ? "bg-sentinel-green" : "bg-gray-600"
                  }`}
                >
                  {filters.camera && (
                    <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2.14999 6L4.62499 8.475L9.84999 3.25"
                        stroke="#E7FFF3"
                        strokeWidth="0.66"
                        strokeMiterlimit="10"
                        strokeLinecap="square"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-sentinel-text-primary font-roboto text-sm">Camera</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.gateway}
                  onChange={() => handleFilterChange("gateway")}
                  className="hidden"
                />
                <div
                  className={`w-4 h-4 rounded-sm border-0 flex items-center justify-center ${
                    filters.gateway ? "bg-sentinel-green" : "bg-gray-600"
                  }`}
                >
                  {filters.gateway && (
                    <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2.14999 6L4.62499 8.475L9.84999 3.25"
                        stroke="#E7FFF3"
                        strokeWidth="0.66"
                        strokeMiterlimit="10"
                        strokeLinecap="square"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-sentinel-text-primary font-roboto text-sm">Gateway</span>
              </label>
            </div>
          </div>

          {/* Apply Filters Button */}
          <button
            onClick={handleApplyFilters}
            className="w-full bg-sentinel-green text-white font-roboto text-sm font-medium py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Collapse Button */}
      <div className="p-3 border-t border-sentinel-border">
        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center gap-2 p-2 rounded-md hover:bg-gray-800 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 text-sentinel-text-primary" />
          <span className="text-sentinel-text-primary font-roboto text-sm">Collapse</span>
        </button>
      </div>
    </div>
  );
}