import { useState } from "react";

export function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`${isCollapsed ? "w-16" : "w-64"} h-full bg-sentinel-bg border-r border-sentinel-border flex flex-col transition-all duration-300`}
    >
      {/* Sidebar content would go here - for now keeping minimal */}
      <div className="flex-1"></div>

      {/* Collapse Button */}
      <div className="p-3">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center gap-4 bg-sentinel-green text-white px-4 py-2 rounded-md hover:bg-sentinel-green/90 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 17 16" fill="none">
            <path
              d="M13.86 3.30999C13.86 2.93996 13.5601 2.63999 13.19 2.63999L3.81005 2.63999C3.44002 2.63999 3.14005 2.93996 3.14005 3.30999L3.14005 12.69C3.14005 13.06 3.44002 13.36 3.81005 13.36L13.19 13.36C13.5601 13.36 13.86 13.06 13.86 12.69L13.86 3.30999ZM15.2 12.69C15.2 13.8001 14.3002 14.7 13.19 14.7L3.81005 14.7C2.69996 14.7 1.80005 13.8001 1.80005 12.69L1.80005 3.30999C1.80005 2.1999 2.69996 1.29999 3.81005 1.29999L13.19 1.29999C14.3002 1.29999 15.2 2.1999 15.2 3.30999L15.2 12.69Z"
              fill="currentColor"
            />
            <path
              d="M5.83008 14.03L5.83008 1.96999C5.83008 1.59996 6.13005 1.29999 6.50008 1.29999C6.87011 1.29999 7.17008 1.59996 7.17008 1.96999L7.17008 14.03C7.17008 14.4 6.87011 14.7 6.50008 14.7C6.13005 14.7 5.83008 14.4 5.83008 14.03Z"
              fill="currentColor"
            />
          </svg>
          {!isCollapsed && (
            <span className="text-sm font-medium">Collapse</span>
          )}
        </button>
      </div>
    </div>
  );
}
