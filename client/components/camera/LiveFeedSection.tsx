export function LiveFeedSection() {
  return (
    <div className="bg-sentinel-container rounded-xl p-4 border border-sentinel-border shadow-sm">
      <h3 className="text-xl font-semibold font-fira-sans text-sentinel-text mb-4">
        Live Feed
      </h3>
      
      {/* Camera Stream Container */}
      <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
        {/* Camera Feed Image */}
        <img 
          src="https://api.builder.io/api/v1/image/assets/TEMP/d31b2f457070cc65cd9136913580bbdd7e23e443?width=1414" 
          alt="Live Camera Feed" 
          className="w-full h-full object-cover"
        />
        
        {/* Live Indicator Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center gap-2">
            {/* Live Dot Indicator */}
            <div className="relative">
              <div className="w-5 h-5 bg-red-500 rounded-full opacity-70"></div>
              <div className="absolute inset-0 w-5 h-5 bg-red-500 rounded-full animate-ping"></div>
            </div>
            <span className="text-white font-medium">Streaming Live</span>
          </div>
        </div>
      </div>
    </div>
  );
}
