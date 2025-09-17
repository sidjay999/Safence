import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bomb, TriangleAlert, Info } from "lucide-react";

interface AlertCardProps {
  id: string;
  severity: "critical" | "warning" | "info";
  timestamp: string;
  message: string;
  device: string;
  status?: "acknowledged" | "resolved";
  onAcknowledge?: (id: string) => void;
  onResolve?: (id: string) => void;
}

const severityConfig = {
  critical: {
    icon: Bomb,
    iconColor: "text-red-400",
    badgeClasses: "bg-red-400/20 text-white",
    borderColor: "border-sentinel-border",
  },
  warning: {
    icon: TriangleAlert,
    iconColor: "text-gray-400",
    badgeClasses: "bg-transparent text-gray-400",
    borderColor: "border-sentinel-border",
  },
  info: {
    icon: Info,
    iconColor: "text-green-500",
    badgeClasses: "bg-green-900/40 text-white",
    borderColor: "border-sentinel-border",
  },
};

export function AlertCard({
  id,
  severity,
  timestamp,
  message,
  device,
  status,
  onAcknowledge,
  onResolve,
}: AlertCardProps) {
  const config = severityConfig[severity];
  const IconComponent = config.icon;

  return (
    <div className={`w-full rounded-md border ${config.borderColor} bg-[rgba(38,42,51,0.20)] p-4`}>
      <div className="flex items-start gap-4">
        {/* Icon */}
        <IconComponent className={`w-6 h-6 ${config.iconColor} flex-shrink-0 mt-0.5`} />
        
        <div className="flex-1 min-w-0">
          {/* Header with badge and timestamp */}
          <div className="flex items-center gap-3 mb-2">
            <Badge className={`${config.badgeClasses} rounded-full text-xs font-medium`}>
              {severity.charAt(0).toUpperCase() + severity.slice(1)}
            </Badge>
            <span className="text-xs text-gray-400">{timestamp}</span>
          </div>
          
          {/* Message */}
          <p className="text-base text-white leading-relaxed mb-2">
            {message}
          </p>
          
          {/* Device */}
          <p className="text-sm text-gray-400">
            Device: {device}
          </p>
        </div>
        
        {/* Action buttons or status */}
        <div className="flex flex-col gap-2 ml-4">
          {status === "acknowledged" ? (
            <Badge className="bg-[#262A33] border border-sentinel-border text-gray-400 text-xs font-semibold">
              Acknowledged
            </Badge>
          ) : status === "resolved" ? (
            <Badge className="bg-transparent text-gray-400 text-xs font-semibold">
              Resolved
            </Badge>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                className="bg-black border-sentinel-border text-gray-400 hover:bg-gray-900 text-sm"
                onClick={() => onAcknowledge?.(id)}
              >
                Acknowledge
              </Button>
              <Button
                className="bg-sentinel-green hover:bg-sentinel-green/80 text-white text-sm"
                size="sm"
                onClick={() => onResolve?.(id)}
              >
                Resolve
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
