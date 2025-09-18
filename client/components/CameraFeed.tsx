import { DashboardHeader } from "./DashboardHeader";
import { DashboardSidebar } from "./DashboardSidebar";
import { LiveFeedSection } from "./camera/LiveFeedSection";
import { ActivityTagging } from "./camera/ActivityTagging";
import { ImageGallery } from "./camera/ImageGallery";

export function CameraFeed() {
  return (
    <div className="min-h-screen bg-sentinel-bg text-sentinel-text">
      {/* Header */}
      <DashboardHeader />
      
      {/* Main Layout */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <DashboardSidebar />
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold font-fira-sans text-sentinel-text mb-2">
                Camera and Image Panel
              </h1>
              <p className="text-lg text-sentinel-muted max-w-2xl">
                Monitor live camera feeds, review historical images, and categorize activities for rapid incident response.
              </p>
            </div>
            
            {/* Live Feed and Activity Tagging Row */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
              {/* Live Feed Section */}
              <div className="xl:col-span-2">
                <LiveFeedSection />
              </div>
              
              {/* Activity Tagging Panel */}
              <div>
                <ActivityTagging />
              </div>
            </div>
            
            {/* Image Gallery */}
            <ImageGallery />
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-sentinel-bg border-t border-sentinel-border px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6 text-sm text-sentinel-text">
            <a href="#" className="hover:text-sentinel-green transition-colors">Product</a>
            <a href="#" className="hover:text-sentinel-green transition-colors">Resources</a>
            <a href="#" className="hover:text-sentinel-green transition-colors">Company</a>
          </div>
          <div className="flex items-center gap-4">
            {/* Social Icons */}
            <a href="#" className="text-sentinel-text opacity-80 hover:opacity-100 transition-opacity">
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                <path d="M10.8349 5.85C10.8349 5.40974 11.0099 4.98763 11.3212 4.67633C11.6325 4.36502 12.0547 4.19 12.4949 4.19H14.1549V2.53L12.4949 2.53C11.6144 2.53 10.7702 2.88003 10.1476 3.50266C9.52491 4.12527 9.1749 4.96947 9.1749 5.85L9.1749 8.33999C9.1749 8.7984 8.80331 9.17 8.3449 9.17H6.6849L6.6849 10.83H8.3449C8.80331 10.83 9.1749 11.2016 9.1749 11.66V17.47H10.8349V11.66C10.8349 11.2016 11.2065 10.83 11.6649 10.83H13.5073L13.9223 9.17H11.6649C11.2065 9.17 10.8349 8.7984 10.8349 8.33999L10.8349 5.85Z" fill="currentColor"/>
              </svg>
            </a>
            <a href="#" className="text-sentinel-text opacity-80 hover:opacity-100 transition-opacity">
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                <path d="M11.3075 3.02292C12.7327 2.2804 14.592 2.32667 16.0687 3.49061C16.1409 3.47318 16.2244 3.45102 16.3183 3.41928..." fill="currentColor"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
