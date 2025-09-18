export default function MapLegend() {
  return (
    <div className="w-50 sentinel-card rounded-lg p-3">
      <h3 className="text-sentinel-text-primary font-roboto text-base font-semibold mb-4">
        Map Legend
      </h3>
      
      <div className="space-y-3">
        {/* Safe Devices */}
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 border border-sentinel-text-primary rounded-full"></div>
          <span className="text-sentinel-text-primary font-roboto text-sm">Safe Devices</span>
        </div>
        
        {/* Warning Devices */}
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 border border-sentinel-text-primary rounded-full"></div>
          <span className="text-sentinel-text-primary font-roboto text-sm">Warning Devices</span>
        </div>
        
        {/* Alert Devices */}
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 border border-sentinel-alert rounded-full"></div>
          <span className="text-sentinel-text-primary font-roboto text-sm">Alert Devices</span>
        </div>
        
        {/* Tampering Zone */}
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 border-2 border-sentinel-border rounded-md bg-transparent"></div>
          <span className="text-sentinel-text-primary font-roboto text-sm">Tampering Zone</span>
        </div>
        
        {/* Illegal Activity */}
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 border-2 border-sentinel-alert rounded-md bg-sentinel-alert-alpha"></div>
          <span className="text-sentinel-text-primary font-roboto text-sm">Illegal Activity</span>
        </div>
      </div>
    </div>
  );
}
