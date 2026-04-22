"use client";
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom icons using emojis inside div
const createEmojiIcon = (emoji: string, size: number = 24, bgClass: string = '') => {
  return L.divIcon({
    html: `<div class="${bgClass}" style="font-size: ${size}px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; border-radius: 50%;">${emoji}</div>`,
    className: 'custom-emoji-icon',
    iconSize: [size + 10, size + 10],
    iconAnchor: [(size + 10) / 2, (size + 10) / 2]
  });
};

const factoryIcon = createEmojiIcon('🏭');
const warehouseAIcon = createEmojiIcon('🏢');
const warehouseBIcon = createEmojiIcon('🚨', 30, 'bg-red-500/20 animate-pulse rounded-full border-2 border-red-500');
const truckIcon = createEmojiIcon('🚚');

const factoryLocation: [number, number] = [23.2599, 77.4126]; // Bhopal (Start)
const branchLocation: [number, number] = [23.4000, 77.6000]; // Junction
const warehouseALocation: [number, number] = [23.5251, 77.8081]; // Vidisha (Original Destination)
const warehouseBLocation: [number, number] = [23.6000, 77.5000]; // High Demand (New Destination)

function getInterpolatedLocation(p1: [number, number], p2: [number, number], ratio: number): [number, number] {
  return [
    p1[0] + (p2[0] - p1[0]) * ratio,
    p1[1] + (p2[1] - p1[1]) * ratio
  ];
}

export default function TrackerMap({ progress, status }: { progress: number, status: 'normal' | 'alerting' | 'rerouted' }) {
  
  let truckLocation: [number, number];

  if (progress <= 50) {
    const ratio = progress / 50;
    truckLocation = getInterpolatedLocation(factoryLocation, branchLocation, ratio);
  } else {
    const ratio = (progress - 50) / 50;
    if (status === 'rerouted') {
      truckLocation = getInterpolatedLocation(branchLocation, warehouseBLocation, ratio);
    } else {
      truckLocation = getInterpolatedLocation(branchLocation, warehouseALocation, ratio);
    }
  }

  return (
    <MapContainer 
      center={[23.45, 77.6]} 
      zoom={10} 
      scrollWheelZoom={false}
      style={{ width: '100%', height: '100%', zIndex: 0 }}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      
      {/* Base Route (Factory to Junction) */}
      <Polyline positions={[factoryLocation, branchLocation]} pathOptions={{ color: '#166534', weight: 5, opacity: 0.8 }} />
      
      {/* Route to Warehouse A */}
      <Polyline 
        positions={[branchLocation, warehouseALocation]} 
        pathOptions={{ color: status === 'rerouted' ? '#9ca3af' : '#166534', weight: 5, opacity: status === 'rerouted' ? 0.3 : 0.8, dashArray: status === 'rerouted' ? '5, 10' : '' }} 
      />
      
      {/* Route to Warehouse B (Only shows if alerting or rerouted) */}
      {(status === 'alerting' || status === 'rerouted') && (
        <Polyline 
          positions={[branchLocation, warehouseBLocation]} 
          pathOptions={{ color: '#ef4444', weight: 5, opacity: 0.8, dashArray: status === 'alerting' ? '10, 10' : '' }} 
        />
      )}
      
      <Marker position={factoryLocation} icon={factoryIcon} />
      <Marker position={warehouseALocation} icon={warehouseAIcon} />
      
      {/* Show Warehouse B with Alert icon when active */}
      {(status === 'alerting' || status === 'rerouted') && (
        <Marker position={warehouseBLocation} icon={warehouseBIcon} />
      )}
      
      <Marker position={truckLocation} icon={truckIcon} />
    </MapContainer>
  );
}
