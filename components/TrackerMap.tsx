"use client";
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const createEmojiIcon = (emoji: string, size: number = 24, bgClass: string = '') => {
  return L.divIcon({
    html: `<div class="${bgClass}" style="font-size: ${size}px; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; border-radius: 50%;">${emoji}</div>`,
    className: 'custom-emoji-icon',
    iconSize: [size + 10, size + 10],
    iconAnchor: [(size + 10) / 2, (size + 10) / 2]
  });
};

const factoryIcon = createEmojiIcon('🏭');
const warehouseAIcon = createEmojiIcon('🏢');

// Geofenced Radar Icon for Shortage
const warehouseBRadar = L.divIcon({
  html: `
    <div class="relative flex items-center justify-center w-full h-full">
      <div class="absolute -inset-8 rounded-full border-2 border-red-500 bg-red-500/30 animate-ping"></div>
      <div class="absolute inset-0 flex items-center justify-center bg-red-900 rounded-full border border-red-500 z-10 shadow-[0_0_15px_rgba(239,68,68,0.8)]">
        <span class="text-xl">🚨</span>
      </div>
    </div>
  `,
  className: '',
  iconSize: [36, 36],
  iconAnchor: [18, 18]
});

// Telemetry HUD for Truck
const getTruckHUD = (speed: number, theme: string, load: string) => {
  const isDark = theme === 'dark';
  return L.divIcon({
    html: `
      <div class="relative flex items-center justify-center w-10 h-10 bg-emerald-600 rounded-full border-2 border-white shadow-[0_0_20px_rgba(5,150,105,0.8)] z-[1000]">
        <span class="text-xl">🚚</span>
        <div class="absolute -top-14 left-1/2 -translate-x-1/2 flex flex-col items-center ${isDark ? 'bg-black/90 border-emerald-900' : 'bg-white/95 border-emerald-200'} border px-2 py-1 rounded-md shadow-lg backdrop-blur-md">
          <span class="text-[9px] font-mono font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'} whitespace-nowrap">SPD: ${speed} KM/H</span>
          <span class="text-[9px] font-mono font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'} whitespace-nowrap">LOD: ${load}</span>
        </div>
      </div>
    `,
    className: '',
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });
};

function getInterpolatedLocation(p1: [number, number], p2: [number, number], ratio: number): [number, number] {
  return [
    p1[0] + (p2[0] - p1[0]) * ratio,
    p1[1] + (p2[1] - p1[1]) * ratio
  ];
}

export default function TrackerMap({ progress, status, theme = 'comfort' }: { progress: number, status: 'normal' | 'alerting' | 'rerouted', theme?: string }) {
  
  // Base Routes Definition
  const routes = {
    ai: {
      factory: [23.2599, 77.4126] as [number, number], // Bhopal
      branch: [23.4000, 77.6000] as [number, number], // Junction
      warehouseA: [23.5251, 77.8081] as [number, number], // Vidisha
      warehouseB: [23.6000, 77.5000] as [number, number], // Shortage
      load: "50T UREA",
    },
    indore: {
      factory: [22.7196, 75.8577] as [number, number],
      warehouse: [23.1765, 75.7885] as [number, number],
      load: "30T DAP",
      speed: 55
    },
    jabalpur: {
      factory: [23.1815, 79.9864] as [number, number],
      warehouse: [22.9500, 79.2000] as [number, number],
      load: "40T NPK",
      speed: 60
    }
  };

  // Logic for Main AI Route (Bhopal)
  let mainTruckLocation: [number, number];
  let mainSpeed = 65; 

  if (progress <= 50) {
    const ratio = progress / 50;
    mainTruckLocation = getInterpolatedLocation(routes.ai.factory, routes.ai.branch, ratio);
    if (status === 'alerting') mainSpeed = 0; 
  } else {
    const ratio = (progress - 50) / 50;
    if (status === 'rerouted') {
      mainTruckLocation = getInterpolatedLocation(routes.ai.branch, routes.ai.warehouseB, ratio);
      mainSpeed = 75; 
    } else {
      mainTruckLocation = getInterpolatedLocation(routes.ai.branch, routes.ai.warehouseA, ratio);
    }
  }

  // Logic for Normal Routes (Linear from 0 to 100 progress)
  const indoreTruckLocation = getInterpolatedLocation(routes.indore.factory, routes.indore.warehouse, progress / 100);
  const jabalpurTruckLocation = getInterpolatedLocation(routes.jabalpur.factory, routes.jabalpur.warehouse, progress / 100);

  // Determine Map Tile Theme
  let tileUrl = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";
  if (theme === 'dark') tileUrl = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
  else if (theme === 'light') tileUrl = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

  return (
    <MapContainer 
      center={[23.1, 77.5]} 
      zoom={7.5} 
      scrollWheelZoom={false}
      style={{ width: '100%', height: '100%', zIndex: 0 }}
      attributionControl={false}
    >
      <TileLayer url={tileUrl} />
      
      {/* ROUTE 1: Main AI Track (Bhopal) */}
      <Polyline positions={[routes.ai.factory, routes.ai.branch]} className="flow-path" pathOptions={{ color: '#10b981', weight: 4, opacity: 0.9, dashArray: '10, 15' }} />
      <Polyline positions={[routes.ai.branch, routes.ai.warehouseA]} className={status !== 'rerouted' ? "flow-path" : ""} pathOptions={{ color: status === 'rerouted' ? '#64748b' : '#10b981', weight: 4, opacity: status === 'rerouted' ? 0.3 : 0.9, dashArray: status === 'rerouted' ? '5, 10' : '10, 15' }} />
      
      {(status === 'alerting' || status === 'rerouted') && (
        <Polyline positions={[routes.ai.branch, routes.ai.warehouseB]} className={status === 'rerouted' ? "flow-path" : ""} pathOptions={{ color: '#ef4444', weight: 4, opacity: 0.9, dashArray: status === 'alerting' ? '5, 5' : '10, 15' }} />
      )}
      
      <Marker position={routes.ai.factory} icon={factoryIcon} />
      <Marker position={routes.ai.warehouseA} icon={warehouseAIcon} />
      {(status === 'alerting' || status === 'rerouted') && (
        <Marker position={routes.ai.warehouseB} icon={warehouseBRadar} />
      )}
      <Marker position={mainTruckLocation} icon={getTruckHUD(mainSpeed, theme, routes.ai.load)} zIndexOffset={1000} />

      {/* ROUTE 2: Indore to Ujjain */}
      <Polyline positions={[routes.indore.factory, routes.indore.warehouse]} className="flow-path" pathOptions={{ color: '#0ea5e9', weight: 3, opacity: 0.7, dashArray: '10, 15' }} />
      <Marker position={routes.indore.factory} icon={factoryIcon} />
      <Marker position={routes.indore.warehouse} icon={warehouseAIcon} />
      <Marker position={indoreTruckLocation} icon={getTruckHUD(routes.indore.speed, theme, routes.indore.load)} zIndexOffset={900} />

      {/* ROUTE 3: Jabalpur to Narsinghpur */}
      <Polyline positions={[routes.jabalpur.factory, routes.jabalpur.warehouse]} className="flow-path" pathOptions={{ color: '#f59e0b', weight: 3, opacity: 0.7, dashArray: '10, 15' }} />
      <Marker position={routes.jabalpur.factory} icon={factoryIcon} />
      <Marker position={routes.jabalpur.warehouse} icon={warehouseAIcon} />
      <Marker position={jabalpurTruckLocation} icon={getTruckHUD(routes.jabalpur.speed, theme, routes.jabalpur.load)} zIndexOffset={900} />

    </MapContainer>
  );
}
