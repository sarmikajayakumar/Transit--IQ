import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useTransit } from '../context/TransitContext';
import { CORRIDOR_COORDINATES } from '../data/transitData';
import { Layers, ExternalLink, Navigation, Crosshair } from 'lucide-react';
import { RadarWaveSvg } from './CustomIcons';

const GOOGLE_MAP_LAYERS = {
  google_traffic: {
    name: "Live Traffic",
    tamilName: "நேரலை போக்குவரத்து",
    url: "https://mt{s}.google.com/vt/lyrs=m,traffic&x={x}&y={y}&z={z}",
    subdomains: ['0', '1', '2', '3'],
    maxZoom: 20,
    attribution: "Map data © Google Maps • Live Traffic"
  },
  google_roadmap: {
    name: "Roadmap",
    tamilName: "சாலை வரைபடம்",
    url: "https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
    subdomains: ['0', '1', '2', '3'],
    maxZoom: 20,
    attribution: "Map data © Google Maps"
  },
  google_satellite: {
    name: "Satellite",
    tamilName: "செயற்கைக்கோள்",
    url: "https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
    subdomains: ['0', '1', '2', '3'],
    maxZoom: 20,
    attribution: "Imagery © Google Maps"
  },
  google_terrain: {
    name: "Terrain",
    tamilName: "நிலப்பரப்பு",
    url: "https://mt{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}",
    subdomains: ['0', '1', '2', '3'],
    maxZoom: 20,
    attribution: "Terrain data © Google Maps"
  }
};

export default function TransitMap() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layersGroupRef = useRef(null);
  const currentTileLayerRef = useRef(null);

  const [activeLayer, setActiveLayer] = useState('google_traffic');
  const { routes, buses, hazards, breakdownAlert, optimizationApplied, language } = useTransit();
  const isTamil = language === 'ta';

  useEffect(() => {
    if (activeLayer === 'google_embed' || !mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: CORRIDOR_COORDINATES.center,
        zoom: CORRIDOR_COORDINATES.zoom,
        zoomControl: true,
        attributionControl: false
      });

      layersGroupRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    if (currentTileLayerRef.current) {
      map.removeLayer(currentTileLayerRef.current);
    }

    const layerConfig = GOOGLE_MAP_LAYERS[activeLayer] || GOOGLE_MAP_LAYERS.google_traffic;
    const tileLayer = L.tileLayer(layerConfig.url, {
      subdomains: layerConfig.subdomains,
      maxZoom: layerConfig.maxZoom,
      attribution: layerConfig.attribution
    }).addTo(map);
    currentTileLayerRef.current = tileLayer;

    const layerGroup = layersGroupRef.current;
    layerGroup.clearLayers();

    // 1. Draw Route Polylines in high contrast
    routes.forEach(route => {
      const polyline = L.polyline(route.path, {
        color: route.id === 'route-a' ? '#0A0A0A' : route.id === 'route-b' ? '#16A34A' : '#D97706',
        weight: route.id === 'route-a' ? 5 : 3.5,
        opacity: 0.9
      }).addTo(layerGroup);

      const title = isTamil ? route.tamilName : route.name;
      polyline.bindPopup(`
        <div style="font-family: inherit; font-size: 13px; line-height: 1.5; color: #0A0A0A;">
          <strong style="font-size: 14px; text-transform: uppercase;">${title}</strong><br/>
          <span>Crowd Level: <b>${route.crowdingPercent}%</b></span><br/>
          <span>Average Wait: <b>${route.avgWaitMin} min</b></span><br/>
          <span>Frequency: <b>Every ${route.headwayMin} min</b></span><br/>
          <span>Fleet Density: <b>${route.busesPerHour} buses/hr</b></span>
        </div>
      `);
    });

    // 2. Draw High-Density Commuter Hotspot Rings
    hazards.forEach(hazard => {
      const surgeCircle = L.circle([hazard.lat, hazard.lng], {
        color: '#0A0A0A',
        fillColor: '#0A0A0A',
        fillOpacity: 0.15,
        radius: hazard.severity === 'high' ? 650 : 400,
        weight: 1.5,
        dashArray: '3, 3'
      }).addTo(layerGroup);

      const hazardTitle = isTamil ? hazard.tamilName : hazard.name;
      const hazardDepth = isTamil ? hazard.tamilDepth : hazard.waterDepth;
      const hazardDetour = isTamil ? hazard.tamilDetour : hazard.detourAction;

      surgeCircle.bindPopup(`
        <div style="font-family: inherit; font-size: 13px; color: #0A0A0A;">
          <span style="background: #0A0A0A; color: #F6F3EC; font-weight: bold; padding: 2px 6px; font-size: 10px; font-family: monospace;">HIGH CONGESTION ZONE</span>
          <h4 style="margin: 6px 0 2px; font-weight: bold;">${hazardTitle}</h4>
          <p style="margin: 0; font-family: monospace;">Density: ${hazardDepth}</p>
          <p style="margin: 4px 0 0; color: #6E6B65; font-size: 12px;">Recommendation: ${hazardDetour}</p>
        </div>
      `);
    });

    // 3. Draw Bus Stops
    routes.forEach(route => {
      route.stops.forEach((stop, idx) => {
        const stopName = isTamil ? stop.tamilName : stop.name;
        const isHighDemandStop = stop.crowded === 'high';

        const stopIcon = L.divIcon({
          className: 'custom-stop-marker',
          html: `<div style="
            width: 10px;
            height: 10px;
            background: ${isHighDemandStop ? '#0A0A0A' : '#FFFFFF'};
            border: 2px solid #0A0A0A;
            border-radius: 50%;
            box-shadow: 2px 2px 0px #0A0A0A;
          "></div>`,
          iconSize: [10, 10],
          iconAnchor: [5, 5]
        });

        const marker = L.marker([stop.lat, stop.lng], { icon: stopIcon }).addTo(layerGroup);
        marker.bindPopup(`
          <div style="font-size: 12px; font-family: inherit; color: #0A0A0A;">
            <b style="font-size: 13px;">${stopName}</b><br/>
            <span>Route: <b>${route.code}</b> (#${idx + 1} of ${route.stops.length})</span><br/>
            <span>Passenger Density: <b>${isHighDemandStop ? 'High (Extra Buses Needed)' : 'Optimal'}</b></span>
          </div>
        `);
      });
    });

    // 4. Draw Live Moving Buses
    buses.forEach(bus => {
      const isBroken = bus.status === 'BROKEN_DOWN' && breakdownAlert.active;
      const isRelief = bus.status === 'EN_ROUTE_RELIEF';

      const busIcon = L.divIcon({
        className: 'custom-bus-marker',
        html: `
          <div style="
            display: flex;
            align-items: center;
            justify-content: center;
            background: ${isBroken ? '#0A0A0A' : isRelief ? '#0A0A0A' : '#FFFFFF'};
            color: ${isBroken || isRelief ? '#F6F3EC' : '#0A0A0A'};
            padding: 3px 8px;
            font-size: 10px;
            font-family: monospace;
            font-weight: 700;
            border: 1.5px solid #0A0A0A;
            box-shadow: 3px 3px 0px #0A0A0A;
            white-space: nowrap;
          ">
            ${isBroken ? '⚠️ ' : isRelief ? '🚑 ' : '🚍 '} ${bus.regNo} (${bus.routeCode})
          </div>
        `,
        iconSize: [110, 24],
        iconAnchor: [55, 12]
      });

      const marker = L.marker([bus.lat, bus.lng], { icon: busIcon }).addTo(layerGroup);
      const locText = isTamil ? bus.tamilLocation : bus.currentLocation;

      marker.bindPopup(`
        <div style="font-family: inherit; font-size: 13px; color: #0A0A0A;">
          <strong style="font-size: 14px; font-family: monospace;">BUS: ${bus.regNo}</strong>
          <span style="font-size: 10px; margin-left: 4px; padding: 1px 6px; border: 1px solid #0A0A0A; font-family: monospace;">
            ${isBroken ? 'MECHANICAL BREAKDOWN' : isRelief ? 'RELIEF DISPATCH' : 'IN REVENUE SERVICE'}
          </span>
          <div style="margin-top: 6px; color: #6E6B65; font-size: 12px;">
            <span>Current: <b>${locText}</b></span><br/>
            <span>Occupancy: <b>${bus.occupancy}</b></span><br/>
            <span>Speed: <b>${bus.speed} km/h</b></span><br/>
            <span>Heading: <b>${bus.heading}</b></span>
          </div>
          ${isBroken ? `
            <div style="margin-top: 6px; padding: 4px 6px; border: 1px solid #0A0A0A; background: #FAF8F5; font-size: 11px;">
              <strong>Relief bus TN-01-N-8802</strong> dispatched (ETA 5 mins)!
            </div>
          ` : ''}
        </div>
      `);
    });

  }, [activeLayer, routes, buses, hazards, breakdownAlert, optimizationApplied, language]);

  const focusLocation = (coords, zoom = 14) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(coords, zoom, { duration: 1.2 });
    }
  };

  return (
    <div className="relative border border-[#0A0A0A] bg-[#FFFFFF] shadow-[6px_6px_0px_#0A0A0A]">
      
      {/* Top Map Toolbar: Layer Selector & External Link */}
      <div className="bg-[#FAF8F5] px-4 py-3 border-b border-[#0A0A0A] flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Layer Selector */}
        <div className="flex items-center flex-wrap gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#6E6B65] mr-1">
            Google Maps Layer:
          </span>

          <button
            onClick={() => setActiveLayer('google_traffic')}
            className={`px-3 py-1 font-mono text-xs uppercase tracking-wider border transition-all ${
              activeLayer === 'google_traffic'
                ? 'bg-[#0A0A0A] text-[#F6F3EC] border-[#0A0A0A]'
                : 'bg-transparent text-[#0A0A0A] border-[#0A0A0A] hover:bg-[#E2DBD0]'
            }`}
          >
            {isTamil ? "நேரலை டிராஃபிக்" : "Live Traffic"}
          </button>

          <button
            onClick={() => setActiveLayer('google_roadmap')}
            className={`px-3 py-1 font-mono text-xs uppercase tracking-wider border transition-all ${
              activeLayer === 'google_roadmap'
                ? 'bg-[#0A0A0A] text-[#F6F3EC] border-[#0A0A0A]'
                : 'bg-transparent text-[#0A0A0A] border-[#0A0A0A] hover:bg-[#E2DBD0]'
            }`}
          >
            {isTamil ? "சாலை" : "Roadmap"}
          </button>

          <button
            onClick={() => setActiveLayer('google_satellite')}
            className={`px-3 py-1 font-mono text-xs uppercase tracking-wider border transition-all ${
              activeLayer === 'google_satellite'
                ? 'bg-[#0A0A0A] text-[#F6F3EC] border-[#0A0A0A]'
                : 'bg-transparent text-[#0A0A0A] border-[#0A0A0A] hover:bg-[#E2DBD0]'
            }`}
          >
            {isTamil ? "செயற்கைக்கோள்" : "Satellite"}
          </button>

          <button
            onClick={() => setActiveLayer('google_terrain')}
            className={`px-3 py-1 font-mono text-xs uppercase tracking-wider border transition-all ${
              activeLayer === 'google_terrain'
                ? 'bg-[#0A0A0A] text-[#F6F3EC] border-[#0A0A0A]'
                : 'bg-transparent text-[#0A0A0A] border-[#0A0A0A] hover:bg-[#E2DBD0]'
            }`}
          >
            {isTamil ? "நிலப்பரப்பு" : "Terrain"}
          </button>

          <button
            onClick={() => setActiveLayer('google_embed')}
            className={`px-3 py-1 font-mono text-xs uppercase tracking-wider border transition-all ${
              activeLayer === 'google_embed'
                ? 'bg-[#0A0A0A] text-[#F6F3EC] border-[#0A0A0A]'
                : 'bg-transparent text-[#0A0A0A] border-[#0A0A0A] hover:bg-[#E2DBD0]'
            }`}
          >
            {isTamil ? "கூகுள் நேரலை பிரேம்" : "Live Frame"}
          </button>
        </div>

        {/* External Link */}
        <a
          href="https://www.google.com/maps/dir/Chennai+Central,+Kannappar+Thidal,+Periamet,+Chennai,+Tamil+Nadu/Tambaram,+Chennai,+Tamil+Nadu"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 font-mono text-xs uppercase tracking-wider border border-[#0A0A0A] bg-[#0A0A0A] text-[#F6F3EC] hover:bg-transparent hover:text-[#0A0A0A] transition-all flex items-center gap-1.5"
        >
          <span>{isTamil ? "கூகுள் மேப்ஸில் திற" : "Open in Google Maps"}</span>
          <ExternalLink className="w-3 h-3" />
        </a>

      </div>

      {/* Quick Jump Hotspot Bar */}
      <div className="bg-[#FFFFFF] px-4 py-2 border-b border-[#0A0A0A] flex items-center gap-2 overflow-x-auto font-mono text-[11px]">
        <span className="text-[#6E6B65] uppercase shrink-0">Focus:</span>
        <button
          onClick={() => focusLocation([13.0067, 80.2023], 15)}
          className="px-2 py-0.5 border border-[#0A0A0A] hover:bg-[#F6F3EC] whitespace-nowrap transition-colors"
        >
          [Kathipara Hotspot]
        </button>
        <button
          onClick={() => focusLocation([13.0410, 80.2450], 16)}
          className="px-2 py-0.5 border border-[#0A0A0A] hover:bg-[#F6F3EC] whitespace-nowrap transition-colors"
        >
          [T. Nagar Breakdown (29C)]
        </button>
        <button
          onClick={() => focusLocation([13.0827, 80.2707], 15)}
          className="px-2 py-0.5 border border-[#0A0A0A] hover:bg-[#F6F3EC] whitespace-nowrap transition-colors"
        >
          [Chennai Central]
        </button>
        <button
          onClick={() => focusLocation([12.9249, 80.1260], 15)}
          className="px-2 py-0.5 border border-[#0A0A0A] hover:bg-[#F6F3EC] whitespace-nowrap transition-colors"
        >
          [Tambaram Terminal]
        </button>
        <button
          onClick={() => focusLocation(CORRIDOR_COORDINATES.center, CORRIDOR_COORDINATES.zoom)}
          className="px-2 py-0.5 border border-[#0A0A0A] hover:bg-[#F6F3EC] text-[#6E6B65] whitespace-nowrap transition-colors"
        >
          [Reset]
        </button>
      </div>

      {/* Map View */}
      {activeLayer === 'google_embed' ? (
        <div className="w-full h-[460px] sm:h-[540px] relative bg-[#EEE9DE]">
          <iframe
            title="Google Maps Live Corridor"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://maps.google.com/maps?q=Chennai%20Central%20to%20Tambaram&t=&z=12&ie=UTF8&iwloc=&output=embed"
          />
        </div>
      ) : (
        <div className="relative">
          {/* Map Overlay Route Code Bar */}
          <div className="absolute top-3 left-3 z-[1000] bg-[#FFFFFF] border border-[#0A0A0A] px-3 py-1.5 text-xs font-mono shadow-[3px_3px_0px_#0A0A0A] flex items-center gap-3">
            <span className="font-bold">ROUTES:</span>
            <span>29C (Anna Salai)</span>
            <span className="text-[#6E6B65]">|</span>
            <span className="font-bold text-[#16A34A]">15B (Ring Rd)</span>
            <span className="text-[#6E6B65]">|</span>
            <span>21M (Velachery)</span>
          </div>

          <div
            ref={mapContainerRef}
            className="w-full h-[460px] sm:h-[540px] z-10"
            style={{ width: '100%' }}
          />
        </div>
      )}

    </div>
  );
}
