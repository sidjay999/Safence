import { DashboardHeader } from "./DashboardHeader";
import { DashboardSidebar } from "./DashboardSidebar";

export function Dashboard() {
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
            {/* Page Title */}
            <h1 className="text-3xl font-bold font-fira-sans text-sentinel-text mb-8">
              Live Monitoring Dashboard
            </h1>

            {/* Top Status Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Status cards will go here */}
              <div className="bg-sentinel-container rounded-xl p-6 border border-sentinel-border shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-sentinel-muted">
                    Magnetometer Voltage
                  </h3>
                  <svg
                    className="w-4 h-4 text-sentinel-text"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M9.46341 0.794651C10.9686 0.836137 12.401 1.45272 13.4657 2.51742C14.5305 3.58217 15.147 5.01454 15.1885 6.51975C15.2274 7.93091 14.7579 9.30575 13.8714 10.3964L13.6888 10.6104C13.6809 10.6193 13.6724 10.6281 13.664 10.6366L9.14147 15.1728C9.01592 15.2987 8.84554 15.3696 8.66779 15.3698C8.4899 15.3699 8.31918 15.2992 8.19343 15.1735L5.5134 12.4935C5.38762 12.3677 5.31697 12.197 5.31711 12.0191C5.31732 11.8412 5.38856 11.6703 5.51471 11.5448L9.75519 7.32322C9.85429 7.18118 9.90347 7.00986 9.89194 6.83646C9.87968 6.65185 9.80089 6.47786 9.67017 6.34701C9.53925 6.21611 9.36479 6.13744 9.18007 6.12521C9.00674 6.11376 8.83522 6.16173 8.69331 6.26065L4.44951 10.4848C4.18768 10.7451 3.76453 10.7445 3.5034 10.4835L0.823399 7.80347C0.56203 7.54211 0.561783 7.11847 0.822742 6.8567L5.34524 2.32048L5.37273 2.2943L5.58668 2.11175C6.67728 1.22523 8.05226 0.755811 9.46341 0.794651Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl font-bold text-sentinel-text">
                    3.25V
                  </span>
                  <svg
                    className="w-4 h-4 text-sentinel-text"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <circle cx="8" cy="8" r="7.5" stroke="currentColor" />
                    <path
                      d="M6.5 8.5L7.5 9.5L9.5 6.5"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-xs text-sentinel-muted mb-4">
                  Current reading from main magnetometer unit.
                </p>
                <button className="flex items-center gap-3 text-sentinel-green text-sm font-medium hover:text-sentinel-green/80 transition-colors">
                  View Details
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M5.5163 3.50631C5.76161 3.26101 6.14954 3.24588 6.41269 3.46051L6.46373 3.50631L10.4837 7.52633C10.7454 7.78796 10.7454 8.21207 10.4837 8.47371L6.46373 12.4937C6.20208 12.7554 5.77796 12.7554 5.5163 12.4937C5.25466 12.2321 5.25466 11.808 5.5163 11.5463L9.06258 8.00002L5.5163 4.45373L5.4705 4.4027C5.25587 4.13954 5.27101 3.75161 5.5163 3.50631Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>

              {/* Placeholder for other status cards */}
              <div className="bg-sentinel-container rounded-xl p-6 border border-sentinel-border shadow-sm">
                <div className="text-sm text-sentinel-muted">
                  Perimeter Fence Status
                </div>
                <div className="text-3xl font-bold text-sentinel-text mt-2">
                  Safe
                </div>
              </div>

              <div className="bg-sentinel-container rounded-xl p-6 border border-sentinel-border shadow-sm">
                <div className="text-sm text-sentinel-muted">
                  System Heartbeat
                </div>
                <div className="text-3xl font-bold text-sentinel-text mt-2">
                  Online
                </div>
              </div>
            </div>

            {/* Chart and System Status Row */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
              {/* Chart Section */}
              <div className="xl:col-span-2">
                <div className="bg-sentinel-container rounded-xl p-6 border border-sentinel-border shadow-sm">
                  <h3 className="text-xl font-semibold font-fira-sans text-sentinel-text mb-2">
                    Magnetometer Voltage Trend
                  </h3>
                  <p className="text-sm text-sentinel-muted mb-6">
                    Real-time voltage fluctuations over the last hour.
                  </p>
                  <div className="h-80 bg-sentinel-bg rounded-lg flex items-center justify-center">
                    <p className="text-sentinel-muted">
                      Chart Component Placeholder
                    </p>
                  </div>
                </div>
              </div>

              {/* System Status Overview */}
              <div>
                <h3 className="text-xl font-semibold font-fira-sans text-sentinel-text mb-6">
                  System Status Overview
                </h3>
                <div className="space-y-6">
                  {/* System status cards will go here */}
                  <div className="bg-sentinel-container rounded-xl p-6 border border-sentinel-border shadow-sm">
                    <div className="text-lg font-medium text-sentinel-text">
                      Magnetometer Unit 1
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-semibold text-sentinel-text">
                        Online
                      </span>
                    </div>
                    <p className="text-xs text-sentinel-muted mt-1">
                      Last Update: 2 minutes ago
                    </p>
                    <p className="text-xs text-sentinel-muted">
                      Device ID: MAG-001-A
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Critical Events */}
            <div>
              <h3 className="text-xl font-semibold font-fira-sans text-sentinel-text mb-6">
                Recent Critical Events
              </h3>
              <div className="space-y-4 mb-6">
                {/* Alert placeholders */}
                <div className="bg-sentinel-bg rounded-xl p-6 border border-red-500 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-5 h-5 bg-red-500 rounded-full"></div>
                      <div>
                        <h4 className="text-base font-semibold text-white">
                          Critical Alert
                        </h4>
                        <p className="text-sm text-white mt-1">
                          Unexpected voltage spike detected in Magnetometer Unit
                          1. Review system logs immediately.
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-sentinel-muted">
                        2024-07-26 14:35:01
                      </div>
                      <button className="text-sm text-sentinel-muted hover:text-sentinel-text mt-2">
                        Acknowledge
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-3 text-sentinel-green text-sm font-medium hover:text-sentinel-green/80 transition-colors">
                View All Alerts
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M5.5163 3.50631C5.76161 3.26101 6.14954 3.24588 6.41269 3.46051L6.46373 3.50631L10.4837 7.52633C10.7454 7.78796 10.7454 8.21207 10.4837 8.47371L6.46373 12.4937C6.20208 12.7554 5.77796 12.7554 5.5163 12.4937C5.25466 12.2321 5.25466 11.808 5.5163 11.5463L9.06258 8.00002L5.5163 4.45373L5.4705 4.4027C5.25587 4.13954 5.27101 3.75161 5.5163 3.50631Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-sentinel-bg border-t border-sentinel-border px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6 text-sm text-sentinel-text">
            <a href="#" className="hover:text-sentinel-green transition-colors">
              Product
            </a>
            <a href="#" className="hover:text-sentinel-green transition-colors">
              Resources
            </a>
            <a href="#" className="hover:text-sentinel-green transition-colors">
              Company
            </a>
          </div>
          <div className="flex items-center gap-4">
            {/* Social Icons */}
            <a
              href="#"
              className="text-sentinel-text opacity-80 hover:opacity-100 transition-opacity"
            >
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10.8349 5.85C10.8349 5.40974 11.0099 4.98763 11.3212 4.67633C11.6325 4.36502 12.0547 4.19 12.4949 4.19H14.1549V2.53L12.4949 2.53C11.6144 2.53 10.7702 2.88003 10.1476 3.50266C9.52491 4.12527 9.1749 4.96947 9.1749 5.85L9.1749 8.33999C9.1749 8.7984 8.80331 9.17 8.3449 9.17H6.6849L6.6849 10.83H8.3449C8.80331 10.83 9.1749 11.2016 9.1749 11.66V17.47H10.8349V11.66C10.8349 11.2016 11.2065 10.83 11.6649 10.83H13.5073L13.9223 9.17H11.6649C11.2065 9.17 10.8349 8.7984 10.8349 8.33999L10.8349 5.85Z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <a
              href="#"
              className="text-sentinel-text opacity-80 hover:opacity-100 transition-opacity"
            >
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                <path
                  d="M11.3075 3.02292C12.7327 2.2804 14.592 2.32667 16.0687 3.49061C16.1409 3.47318 16.2244 3.45102 16.3183 3.41928..."
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
