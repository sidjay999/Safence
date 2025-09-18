import { useState } from "react";

interface ImageItem {
  id: string;
  src: string;
  timestamp: string;
  status: "legal" | "illegal" | "unreviewed";
}

const mockImages: ImageItem[] = [
  {
    id: "1",
    src: "https://api.builder.io/api/v1/image/assets/TEMP/f2601503c582613ffce2fbc97ffa3df3c542e7c7?width=402",
    timestamp: "2024-07-26 10:30 AM",
    status: "illegal"
  },
  {
    id: "2", 
    src: "https://api.builder.io/api/v1/image/assets/TEMP/393e5cfe00339a40bf981095b507c8dfece3690d?width=402",
    timestamp: "2024-07-26 09:15 AM",
    status: "legal"
  },
  {
    id: "3",
    src: "https://api.builder.io/api/v1/image/assets/TEMP/8dbfa234476509da945cedda518596e3f8e83c84?width=402",
    timestamp: "2024-07-25 04:00 PM", 
    status: "unreviewed"
  },
  {
    id: "4",
    src: "https://api.builder.io/api/v1/image/assets/TEMP/50323ec7717a665812a457b5f72df2224557fce4?width=402",
    timestamp: "2024-07-25 01:00 PM",
    status: "legal"
  },
  {
    id: "5",
    src: "https://api.builder.io/api/v1/image/assets/TEMP/7645adb3fc6e19ea5b66b58bec91fc1ef00ae7e6?width=402",
    timestamp: "2024-07-24 11:30 AM",
    status: "illegal"
  },
  {
    id: "6",
    src: "https://api.builder.io/api/v1/image/assets/TEMP/b966d4104e0b3d795e71ea0f18bcc23a2214989d?width=402",
    timestamp: "2024-07-24 08:45 AM",
    status: "unreviewed"
  }
];

export function ImageGallery() {
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "illegal":
        return "bg-red-500 text-white";
      case "legal":
        return "bg-transparent text-sentinel-text/90 border border-sentinel-border";
      case "unreviewed":
        return "bg-sentinel-border text-sentinel-text";
      default:
        return "bg-sentinel-border text-sentinel-text";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "illegal":
        return "Illegal";
      case "legal":
        return "Legal";
      case "unreviewed":
        return "Unreviewed";
      default:
        return "Unknown";
    }
  };

  const filteredImages = mockImages.filter(image => 
    image.timestamp.toLowerCase().includes(searchFilter.toLowerCase()) ||
    image.status.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="bg-sentinel-container rounded-xl p-4 border border-sentinel-border shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold font-fira-sans text-sentinel-text">
          Image Gallery
        </h3>
        
        {/* Search Filter */}
        <div className="relative w-80">
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Filter by date, status, or keyword..."
            className="w-full pl-10 pr-4 py-2 bg-sentinel-bg border border-sentinel-border rounded-md text-sm text-sentinel-text placeholder:text-sentinel-muted focus:outline-none focus:ring-1 focus:ring-sentinel-green"
          />
          <svg 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-sentinel-muted"
            viewBox="0 0 16 16" 
            fill="none"
          >
            <path d="M10.6225 10.6224C10.8678 10.3771 11.2557 10.362 11.5189 10.5767L11.57 10.6224L14.4776 13.5301L14.5241 13.5811C14.7385 13.8443 14.7228 14.2323 14.4776 14.4775C14.2324 14.7227 13.8444 14.7384 13.5812 14.524L13.5302 14.4775L10.6225 11.5699L10.5768 11.5188C10.3621 11.2556 10.3772 10.8677 10.6225 10.6224Z" fill="currentColor"/>
            <path d="M12.02 7.33C12.02 4.73979 9.92027 2.64 7.33005 2.64C4.73984 2.64 2.64005 4.73979 2.64005 7.33C2.64005 9.92022 4.73984 12.02 7.33005 12.02C9.92027 12.02 12.02 9.92022 12.02 7.33ZM13.36 7.33C13.36 10.6603 10.6604 13.36 7.33005 13.36C3.99977 13.36 1.30005 10.6603 1.30005 7.33C1.30005 3.99973 3.99977 1.3 7.33005 1.3C10.6604 1.3 13.36 3.99973 13.36 7.33Z" fill="currentColor"/>
          </svg>
        </div>
      </div>
      
      {/* Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filteredImages.map((image) => (
          <div
            key={image.id}
            onClick={() => setSelectedImage(selectedImage === image.id ? null : image.id)}
            className={`relative group cursor-pointer rounded-lg border-2 transition-all ${
              selectedImage === image.id 
                ? "border-sentinel-green shadow-lg" 
                : "border-sentinel-border hover:border-sentinel-green/50"
            }`}
          >
            {/* Image Container */}
            <div className="aspect-video rounded-lg overflow-hidden">
              <img 
                src={image.src} 
                alt={`Camera capture ${image.timestamp}`}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay with timestamp and status */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="text-xs text-white/90 mb-1">
                    {image.timestamp}
                  </div>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(image.status)}`}>
                    {getStatusLabel(image.status)}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Always visible status tag for mobile */}
            <div className="absolute bottom-2 left-2 sm:opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(image.status)}`}>
                {getStatusLabel(image.status)}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty State */}
      {filteredImages.length === 0 && (
        <div className="text-center py-12 text-sentinel-muted">
          <p>No images found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
}
