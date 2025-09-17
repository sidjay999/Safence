import { useState } from "react";

export function ActivityTagging() {
  const [selectedTag, setSelectedTag] = useState<"legal" | "illegal" | null>(null);
  const [notes, setNotes] = useState("");

  const handleSaveNotes = () => {
    console.log("Saving notes:", { tag: selectedTag, notes });
    // Handle save logic here
  };

  return (
    <div className="bg-sentinel-container rounded-xl p-4 border border-sentinel-border shadow-sm h-full">
      <h3 className="text-xl font-semibold font-fira-sans text-sentinel-text mb-4">
        Activity Tagging
      </h3>
      
      {/* Tag Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-sentinel-text mb-4">
          Selected Image Status
        </label>
        
        <div className="flex gap-2 mb-4">
          {/* Legal Activity Button */}
          <button
            onClick={() => setSelectedTag("legal")}
            className={`flex items-center gap-3 px-5 py-2 rounded-md border transition-all ${
              selectedTag === "legal"
                ? "border-sentinel-green bg-sentinel-green/10 text-sentinel-green"
                : "border-sentinel-border bg-sentinel-bg text-sentinel-text opacity-50 hover:opacity-75"
            }`}
          >
            <svg className="w-4 h-4" viewBox="0 0 17 16" fill="none">
              <path d="M0.747192 7.44518L0.747192 2.64C0.747192 2.10692 0.959113 1.59582 1.33606 1.21887C1.71301 0.841926 2.22411 0.630005 2.75719 0.630005L7.56237 0.630005L7.76129 0.63982C8.22131 0.685595 8.65373 0.889094 8.9835 1.21887L14.8165 7.05196L14.8944 7.13437C15.2729 7.55486 15.4839 8.10158 15.4839 8.67L15.4813 8.78317C15.4534 9.34831 15.2172 9.88485 14.8165 10.2881L10.4052 14.6993C10.002 15.1 9.4655 15.3362 8.90036 15.3641L8.78719 15.3667C8.18091 15.3667 7.59915 15.1267 7.16914 14.6993L1.33606 8.86631C1.00628 8.53654 0.802782 8.10412 0.757008 7.6441L0.747192 7.44518Z" fill="currentColor"/>
              <circle cx="5.11723" cy="5" r="0.335" fill="currentColor"/>
            </svg>
            <span className="text-sm font-medium">Legal Activity</span>
          </button>
          
          {/* Illegal Activity Button */}
          <button
            onClick={() => setSelectedTag("illegal")}
            className={`flex items-center gap-3 px-5 py-2 rounded-md border transition-all ${
              selectedTag === "illegal"
                ? "border-red-500 bg-red-500/10 text-red-500"
                : "border-sentinel-border bg-red-500 text-white opacity-50 hover:opacity-75"
            }`}
          >
            <svg className="w-4 h-4" viewBox="0 0 17 16" fill="none">
              <path d="M0.684692 7.44518L0.684692 2.64C0.684692 2.10692 0.896613 1.59582 1.27356 1.21887C1.65051 0.841926 2.16161 0.630005 2.69469 0.630005L7.49987 0.630005L7.69879 0.63982C8.15881 0.685595 8.59123 0.889094 8.921 1.21887L14.754 7.05196L14.8319 7.13437C15.2104 7.55486 15.4214 8.10158 15.4214 8.67L15.4188 8.78317C15.3909 9.34831 15.1547 9.88485 14.754 10.2881L10.3427 14.6993C9.93954 15.1 9.403 15.3362 8.83786 15.3641L8.72469 15.3667C8.11841 15.3667 7.53665 15.1267 7.10664 14.6993L1.27356 8.86631C0.943781 8.53654 0.740282 8.10412 0.694508 7.6441L0.684692 7.44518Z" fill="currentColor"/>
              <circle cx="5.05473" cy="5" r="0.335" fill="currentColor"/>
            </svg>
            <span className="text-sm font-medium">Illegal Activity</span>
          </button>
        </div>
      </div>
      
      {/* Notes Section */}
      <div className="mb-6">
        <label className="block text-xs font-medium text-sentinel-text mb-3">
          Notes for selected image
        </label>
        
        <div className="relative">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add contextual notes about the activity..."
            rows={8}
            className="w-full p-3 bg-sentinel-bg border border-sentinel-border rounded-md text-sm text-sentinel-text placeholder:text-sentinel-muted focus:outline-none focus:ring-1 focus:ring-sentinel-green resize-none"
          />
          
          {/* Resize Handle */}
          <div className="absolute bottom-3 right-3">
            <svg className="w-3 h-3 text-sentinel-border" viewBox="0 0 12 12" fill="none">
              <path d="M13.9396 11.1672L0.740355 11.1672C0.219656 11.1672 -0.202454 11.5893 -0.202454 12.11V12.11C-0.202454 12.6307 0.219656 13.0528 0.740355 13.0528L13.9396 13.0528C14.4603 13.0528 14.8824 12.6307 14.8824 12.11C14.8824 11.5893 14.4603 11.1672 13.9396 11.1672Z" fill="currentColor"/>
              <path d="M11.7284 11.1672L6.07159 11.1672C5.55089 11.1672 5.12878 11.5893 5.12878 12.11V12.11C5.12878 12.6307 5.55089 13.0528 6.07159 13.0528L11.7284 13.0528C12.2491 13.0528 12.6713 12.6307 12.6713 12.11C12.6713 11.5893 12.2491 11.1672 11.7284 11.1672Z" fill="currentColor"/>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Save Button */}
      <button
        onClick={handleSaveNotes}
        disabled={!notes.trim()}
        className="w-full bg-sentinel-green text-white px-4 py-2 rounded-md font-medium hover:bg-sentinel-green/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Save Notes
      </button>
    </div>
  );
}
