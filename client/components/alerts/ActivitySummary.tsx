import { Bomb, TriangleAlert, Info, SquareDashed } from "lucide-react";

interface ActivitySummaryProps {
  criticalCount?: number;
  warningCount?: number;
  infoCount?: number;
  pendingCount?: number;
}

export function ActivitySummary({
  criticalCount = 3,
  warningCount = 2,
  infoCount = 2,
  pendingCount = 5,
}: ActivitySummaryProps) {
  return (
    <div className="w-80 bg-[#1E2128] rounded-lg shadow-sm p-6 h-fit">
      {/* Title */}
      <div className="pb-4 border-b border-sentinel-border">
        <h3 className="text-xl font-medium text-white font-fira-sans">
          Activity Summary
        </h3>
      </div>

      {/* Summary cards */}
      <div className="space-y-4 mt-6">
        {/* Critical Alerts */}
        <div className="bg-[rgba(38,42,51,0.10)] rounded-md p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bomb className="w-5 h-5 text-red-400" />
            <span className="text-base text-gray-400">Critical Alerts</span>
          </div>
          <span className="text-lg font-semibold text-red-400">
            {criticalCount}
          </span>
        </div>

        {/* Warning Alerts */}
        <div className="bg-[rgba(38,42,51,0.10)] rounded-md p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TriangleAlert className="w-5 h-5 text-gray-400" />
            <span className="text-base text-gray-400">Warning Alerts</span>
          </div>
          <span className="text-lg font-semibold text-gray-400">
            {warningCount}
          </span>
        </div>

        {/* Informational */}
        <div className="bg-[rgba(38,42,51,0.10)] rounded-md p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-green-500" />
            <span className="text-base text-gray-400">Informational</span>
          </div>
          <span className="text-lg font-semibold text-green-500">
            {infoCount}
          </span>
        </div>

        {/* Pending Actions */}
        <div className="bg-[rgba(38,42,51,0.10)] rounded-md p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SquareDashed className="w-5 h-5 text-gray-400" />
            <span className="text-base text-gray-400">Pending Actions</span>
          </div>
          <span className="text-lg font-semibold text-gray-400">
            {pendingCount}
          </span>
        </div>
      </div>
    </div>
  );
}
