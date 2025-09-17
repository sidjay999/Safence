import { useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Rectangle, useMap } from "react-leaflet";
import { LatLngBoundsExpression, LatLngExpression, Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Plus, Minus, Maximize } from "lucide-react";

// Custom icons for different statuses
const safeIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const warningIcon = new Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
  iconRetinaUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const alertIcon = new Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  iconRetinaUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const getIconByStatus = (status: "safe" | "warning" | "alert") => {
  switch (status) {
    case "safe":
      return safeIcon;
    case "warning":
      return warningIcon;
    case "alert":
      return alertIcon;
    default:
      return safeIcon;
  }
};

interface Pin {
  id: string;
  position: LatLngExpression; // [lat, lng]
  status: "safe" | "warning" | "alert";
  type: "sensorNode" | "camera" | "gateway";
  name?: string;
  description?: string;
}

interface Overlay {
  type: "tampering" | "illegal";
  bounds: LatLngBoundsExpression;
  label: string;
}

interface Filters {
  safe: boolean;
  warning: boolean;
  alert: boolean;
  sensorNode: boolean;
  camera: boolean;
  gateway: boolean;
}

interface MapViewProps {
  center?: LatLngExpression; // e.g., [51.505, -0.09]
  zoom?: number;
  pins?: Pin[];
  overlays?: Overlay[];
  filters?: Filters;
  onPinClick?: (pin: Pin) => void; // Optional callback for pin interactions
}

// Component for custom map controls
function MapControls({ initialZoom }: { initialZoom: number }) {
  const map = useMap();
  const [zoomLevel, setZoomLevel] = useState(initialZoom);

  const handleZoomIn = () => {
    map.zoomIn();
    setZoomLevel(map.getZoom());
  };

  const handleZoomOut = () => {
    map.zoomOut();
    setZoomLevel(map.getZoom());
  };

  const handleMaximize = () => {
    map.setZoom(15); // Example: Zoom to a high level or implement fullscreen
  };

  return (
    <>
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
        <button
          onClick={handleMaximize}
          className="p-2 bg-sentinel-surface-dark rounded-md hover:bg-opacity-80 transition-colors"
          aria-label="Maximize map"
        >
          <Maximize className="h-5 w-5 text-white" />
        </button>
      </div>
      <div className="absolute bottom-16 right-4 flex flex-col gap-2 z-[1000]">
        <button
          onClick={handleZoomIn}
          className="p-2 bg-sentinel-surface-dark rounded-md hover:bg-opacity-80 transition-colors"
          aria-label="Zoom in"
        >
          <Plus className="h-5 w-5 text-white" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 bg-sentinel-surface-dark rounded-md hover:bg-opacity-80 transition-colors"
          aria-label="Zoom out"
        >
          <Minus className="h-5 w-5 text-white" />
        </button>
      </div>
    </>
  );
}

export default function MapView({
  center = [51.505, -0.09],
  zoom = 13,
  pins = [],
  overlays = [],
  filters = {
    safe: true,
    warning: true,
    alert: true,
    sensorNode: true,
    camera: true,
    gateway: true,
  },
  onPinClick,
}: MapViewProps) {
  // Filter pins based on status and type
  const filteredPins = useMemo(
    () =>
      pins.filter((pin) => filters[pin.status] && filters[pin.type]),
    [pins, filters]
  );

  // Get overlay color and style
  const getOverlayStyle = (type: "tampering" | "illegal") => {
    if (type === "tampering") {
      return {
        color: "#CCCCCC", // Replace with --sentinel-border if using CSS vars
        weight: 2,
        fill: false,
      };
    } else {
      return {
        color: "#FF0000", // Replace with --sentinel-alert
        weight: 2,
        fillColor: "#FF000080", // Replace with --sentinel-alert-alpha
        fillOpacity: 0.3,
      };
    }
  };

  // Cast React Leaflet components to any to avoid type friction from version mismatches
  const MapContainerAny = MapContainer as any;
  const TileLayerAny = TileLayer as any;
  const MarkerAny = Marker as any;
  const RectangleAny = Rectangle as any;

  return (
    <div className="relative w-full h-full sentinel-card rounded-lg overflow-hidden">
      <MapContainerAny
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        className="rounded-lg"
        zoomControl={false} // Disable default zoom controls for custom buttons
      >
        {/* Base tile layer - OpenStreetMap */}
        <TileLayerAny
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Custom Map Controls */}
        <MapControls initialZoom={zoom} />

        {/* Dynamic Markers */}
        {filteredPins.map((pin) => (
          <MarkerAny
            key={pin.id}
            position={pin.position}
            icon={getIconByStatus(pin.status)}
            eventHandlers={{
              click: () => onPinClick?.(pin),
            }}
          >
            <Popup>
              <div className="font-roboto">
                <h4 className="font-semibold text-sentinel-text-primary">
                  {pin.name || `Device ${pin.id}`}
                </h4>
                <p className="text-sm">
                  <span className="font-medium">Status: </span>
                  <span
                    className={`${
                      pin.status === "safe"
                        ? "text-sentinel-green"
                        : pin.status === "warning"
                        ? "text-orange-500"
                        : "text-sentinel-alert"
                    }`}
                  >
                    {pin.status.charAt(0).toUpperCase() + pin.status.slice(1)}
                  </span>
                </p>
                <p className="text-sm">
                  <span className="font-medium">Type: </span>
                  {pin.type.charAt(0).toUpperCase() + pin.type.slice(1)}
                </p>
                {pin.description && (
                  <p className="text-sm text-sentinel-text-secondary mt-2">
                    {pin.description}
                  </p>
                )}
              </div>
            </Popup>
          </MarkerAny>
        ))}

        {/* Dynamic Overlays (Rectangles) */}
        {overlays.map((overlay, index) => (
          <RectangleAny
            key={index}
            bounds={overlay.bounds}
            pathOptions={getOverlayStyle(overlay.type)}
          >
            <Popup>
              <div className="font-roboto text-sm font-semibold">
                {overlay.label}
              </div>
            </Popup>
          </RectangleAny>
        ))}
      </MapContainerAny>
    </div>
  );
}