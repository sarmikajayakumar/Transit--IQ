import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTransit } from '../context/TransitContext';
import { TechnicalGearSvg, CorridorBranchSvg } from './CustomIcons';
import { ArrowRight, MapPin, Clock, Search, ArrowRightLeft, Sparkles, CheckCircle2 } from 'lucide-react';

export default function PassengerView() {
  const { routes, breakdownAlert, optimizationApplied, language } = useTransit();
  const isTamil = language === 'ta';
  
  const [origin, setOrigin] = useState("Gandhipuram Central Bus Stand");
  const [destination, setDestination] = useState("Saravanampatti (CHIL SEZ)");
  const [selectedRouteId, setSelectedRouteId] = useState("route-a");

  // Search input state with interactive autocomplete
  const [originInput, setOriginInput] = useState("Gandhipuram Central Bus Stand");
  const [destInput, setDestInput] = useState("Saravanampatti (CHIL SEZ)");
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);
  const [hasSearched, setHasSearched] = useState(true);

  const stopsList = [
    "Gandhipuram Central Bus Stand",
    "GP Signal / Sathy Road",
    "Ganapathy Bus Stop",
    "Sivanandapuram",
    "Prozone Mall Junction",
    "Saravanampatti (CHIL SEZ)",
    "Ukkadam Bus Terminal",
    "Town Hall Clock Tower",
    "Sungam Bypass",
    "Ramanathapuram Junction",
    "Alvernia School",
    "Singanallur Bus Terminal",
    "Lakshmi Mills",
    "Fun Republic Mall",
    "Peelamedu (PSG Tech)",
    "Hope College (Avinashi Road)",
    "CODISSIA Complex",
    "Coimbatore International Airport",
    "Coimbatore Junction Railway Station",
    "Saibaba Colony",
    "Thudiyalur Bus Stand",
    "RS Puram",
    "Brookefields Mall",
    "Vadavalli Terminal"
  ];

  // Filter autocomplete suggestions based on keystrokes
  const filteredOrigins = useMemo(() => {
    return stopsList.filter(s => s.toLowerCase().includes(originInput.toLowerCase()));
  }, [originInput]);

  const filteredDests = useMemo(() => {
    return stopsList.filter(s => s.toLowerCase().includes(destInput.toLowerCase()));
  }, [destInput]);

  // Swap boarding and destination
  const handleSwapStops = () => {
    const temp = originInput;
    setOriginInput(destInput);
    setDestInput(temp);
    setOrigin(destInput);
    setDestination(temp);
  };

  // Perform route search: computes match score & optimal route
  const handleSearchRoutes = (e) => {
    if (e) e.preventDefault();
    setOrigin(originInput);
    setDestination(destInput);
    setHasSearched(true);
    setShowOriginSuggestions(false);
    setShowDestSuggestions(false);
  };

  // Identify direct or nearby routes connecting origin & destination
  const routeEvaluation = useMemo(() => {
    const orig = (origin || "").toLowerCase();
    const dest = (destination || "").toLowerCase();

    // Score routes based on stop containment and crowd optimization
    const scoredRoutes = routes.map(route => {
      const stopNames = route.stops.map(s => s.name.toLowerCase());
      const hasOrigin = stopNames.some(s => s.includes(orig) || orig.includes(s));
      const hasDest = stopNames.some(s => s.includes(dest) || dest.includes(s));
      const directMatch = hasOrigin && hasDest;
      const partialMatch = hasOrigin || hasDest;

      // Score: direct match gets high priority, lower crowd gets extra bonus
      let score = 0;
      if (directMatch) score += 100;
      else if (partialMatch) score += 40;
      else score += 10;

      // Favor comfortable seating over critical overcrowding
      if (route.crowdingPercent <= 50) score += 25;
      else if (route.crowdingPercent <= 80) score += 15;
      else score -= 10;

      return {
        ...route,
        directMatch,
        partialMatch,
        score
      };
    });

    // Sort descending by score
    scoredRoutes.sort((a, b) => b.score - a.score);
    const optimalRoute = scoredRoutes[0] || routes[0];

    return {
      scoredRoutes,
      optimalRoute
    };
  }, [origin, destination, routes]);

  const { scoredRoutes, optimalRoute } = routeEvaluation;

  return (
    <div className="space-y-6 sm:space-y-8">
      
      {/* 1. Prior Breakdown Warning Banner */}
      {breakdownAlert.active && (
        <div className="border-2 border-[#0A0A0A] bg-[#FFFFFF] p-4 sm:p-5 shadow-[4px_4px_0px_#0A0A0A] sm:shadow-[6px_6px_0px_#0A0A0A]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
            
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 border border-[#0A0A0A] bg-[#0A0A0A] text-[#F6F3EC] flex items-center justify-center shrink-0">
                <TechnicalGearSvg className="w-4 h-4 sm:w-5 sm:h-5 invert" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <span className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase bg-[#0A0A0A] text-[#F6F3EC] px-1.5 sm:px-2 py-0.5 font-bold">
                    PRIOR NOTICE • MECHANICAL BREAKDOWN
                  </span>
                  <span className="font-mono text-[11px] sm:text-xs text-[#0A0A0A] font-bold">
                    BUS #{breakdownAlert.busId} ({breakdownAlert.routeCode})
                  </span>
                </div>
                
                <h4 className="font-display text-base sm:text-lg font-semibold text-[#0A0A0A] mt-1">
                  {isTamil
                    ? `${breakdownAlert.tamilLocation} — ${breakdownAlert.tamilIssue}`
                    : `${breakdownAlert.location} — ${breakdownAlert.issue}`}
                </h4>

                <p className="font-sans text-xs text-[#6E6B65] mt-0.5">
                  {isTamil
                    ? `நிவாரண மாற்றுப் பேருந்து ${breakdownAlert.reliefBus} இன்னும் ${breakdownAlert.tamilReliefETA} வந்து சேரும்.`
                    : `Relief standby unit ${breakdownAlert.reliefBus} en route, ETA ${breakdownAlert.reliefETA}.`}
                </p>
              </div>
            </div>

            {/* Direct Recommendation Box */}
            <div className="bg-[#FAF8F5] border border-[#0A0A0A] p-2.5 sm:p-3 shrink-0 md:max-w-xs font-mono text-xs">
              <span className="font-bold uppercase tracking-wider block text-[9px] sm:text-[10px] text-[#0A0A0A]">
                RECOMMENDED ACTION:
              </span>
              <p className="mt-1 text-[#0A0A0A] text-[11px] sm:text-xs">
                {isTamil
                  ? "வழித்தடம் 3A இன்னும் 3 நிமிடத்தில் வரும் (40% கூட்டம் மட்டுமே, காலியிடங்கள் உள்ளன)."
                  : "Hop on Route 3A arriving in 3 mins (only 40% crowd, plenty of empty seats)."}
              </p>
            </div>

          </div>
        </div>
      )}

      {/* 2. Journey Planner: Searchable Stops with Optimal Route Recommendation */}
      <div className="border border-[#0A0A0A] bg-[#FFFFFF] p-4 sm:p-6 lg:p-8 shadow-[4px_4px_0px_#0A0A0A] sm:shadow-[6px_6px_0px_#0A0A0A]">
        
        <div className="border-b border-[#0A0A0A] pb-3 sm:pb-4 mb-5 sm:mb-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 sm:gap-2">
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0A0A0A]">
              Journey Planner & Route Evaluation
            </h3>
            <p className="font-mono text-[10px] sm:text-xs text-[#6E6B65] uppercase tracking-wider mt-0.5">
              Search origin and destination to find the most optimal bus route with live crowding & headways
            </p>
          </div>
          <span className="font-mono text-[10px] sm:text-xs text-[#0A0A0A]">
            CORRIDOR: 01 (GANDHIPURAM ↔ SARAVANAMPATTI)
          </span>
        </div>

        {/* Search Input Controls Bar */}
        <form onSubmit={handleSearchRoutes} className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-end">
            
            {/* Origin Search Field */}
            <div className="md:col-span-5 relative font-mono text-xs">
              <label className="block text-[9px] sm:text-[10px] uppercase tracking-widest text-[#6E6B65] mb-1.5 font-bold">
                [ORIGIN BOARDING STOP]
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={originInput}
                  onChange={(e) => {
                    setOriginInput(e.target.value);
                    setShowOriginSuggestions(true);
                  }}
                  onFocus={() => setShowOriginSuggestions(true)}
                  placeholder="Type origin stop (e.g., Gandhipuram)..."
                  className="w-full bg-[#FAF8F5] text-[#0A0A0A] border border-[#0A0A0A] px-3 py-2.5 pl-8 focus:outline-none focus:bg-[#FFFFFF] text-xs font-sans font-medium"
                />
                <MapPin className="w-3.5 h-3.5 text-[#6E6B65] absolute left-2.5 top-3" />
              </div>

              {/* Origin Autocomplete Suggestions Dropdown */}
              {showOriginSuggestions && filteredOrigins.length > 0 && (
                <div className="absolute z-50 left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-[#FFFFFF] border border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] divide-y divide-[#E2DBD0]">
                  {filteredOrigins.map((stop, idx) => (
                    <div
                      key={idx}
                      onMouseDown={() => {
                        setOriginInput(stop);
                        setShowOriginSuggestions(false);
                      }}
                      className="px-3 py-2 text-xs hover:bg-[#FAF8F5] cursor-pointer flex items-center justify-between text-[#0A0A0A]"
                    >
                      <span className="font-sans">{stop}</span>
                      <span className="text-[9px] text-[#6E6B65] font-mono">Select</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Swap Button (Desktop & Mobile) */}
            <div className="md:col-span-1 flex justify-center pb-0.5">
              <button
                type="button"
                onClick={handleSwapStops}
                className="p-2 border border-[#0A0A0A] bg-[#FAF8F5] hover:bg-[#0A0A0A] hover:text-[#FFFFFF] transition-all shadow-[2px_2px_0px_#0A0A0A]"
                title="Swap Boarding & Destination"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Destination Search Field */}
            <div className="md:col-span-4 relative font-mono text-xs">
              <label className="block text-[9px] sm:text-[10px] uppercase tracking-widest text-[#6E6B65] mb-1.5 font-bold">
                [DESTINATION TERMINUS]
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={destInput}
                  onChange={(e) => {
                    setDestInput(e.target.value);
                    setShowDestSuggestions(true);
                  }}
                  onFocus={() => setShowDestSuggestions(true)}
                  placeholder="Type destination stop (e.g., Saravanampatti)..."
                  className="w-full bg-[#FAF8F5] text-[#0A0A0A] border border-[#0A0A0A] px-3 py-2.5 pl-8 focus:outline-none focus:bg-[#FFFFFF] text-xs font-sans font-medium"
                />
                <MapPin className="w-3.5 h-3.5 text-[#6E6B65] absolute left-2.5 top-3" />
              </div>

              {/* Destination Autocomplete Suggestions Dropdown */}
              {showDestSuggestions && filteredDests.length > 0 && (
                <div className="absolute z-50 left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-[#FFFFFF] border border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] divide-y divide-[#E2DBD0]">
                  {filteredDests.map((stop, idx) => (
                    <div
                      key={idx}
                      onMouseDown={() => {
                        setDestInput(stop);
                        setShowDestSuggestions(false);
                      }}
                      className="px-3 py-2 text-xs hover:bg-[#FAF8F5] cursor-pointer flex items-center justify-between text-[#0A0A0A]"
                    >
                      <span className="font-sans">{stop}</span>
                      <span className="text-[9px] text-[#6E6B65] font-mono">Select</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Find Optimal Route Search Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-2.5 px-3 bg-[#0A0A0A] text-[#F6F3EC] border border-[#0A0A0A] hover:bg-[#333333] transition-all font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_#6E6B65]"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Find Route</span>
              </button>
            </div>

          </div>
        </form>

        {/* 3. Optimal Bus Route Recommendation Card (Shown after search) */}
        {optimalRoute && (
          <div className="mb-6 p-4 sm:p-5 border-2 border-[#0A0A0A] bg-[#FAF8F5] shadow-[3px_3px_0px_#0A0A0A]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#0A0A0A] pb-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="p-1 bg-[#0A0A0A] text-[#F6F3EC]">
                  <Sparkles className="w-4 h-4" />
                </span>
                <div>
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-[#0A0A0A] block">
                    {isTamil ? "பயணிகளுக்கான சிறந்த உகந்த வழித்தடம்" : "OPTIMAL COMMUTER RECOMMENDATION"}
                  </span>
                  <h4 className="font-display text-base sm:text-lg font-bold text-[#0A0A0A]">
                    {optimalRoute.name}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="px-2 py-0.5 border border-[#0A0A0A] bg-[#FFFFFF] font-bold">
                  {isTamil ? "கட்டணம்" : "Fare"}: {optimalRoute.fare}
                </span>
                <span className="px-2 py-0.5 border border-[#0A0A0A] bg-[#0A0A0A] text-[#F6F3EC] font-bold">
                  {isTamil ? "காத்திருப்பு" : "Wait"}: {optimalRoute.avgWaitMin} min
                </span>
              </div>
            </div>

            <p className="font-sans text-xs text-[#0A0A0A] leading-relaxed mb-3">
              {isTamil
                ? `நீங்கள் தேர்ந்தெடுத்த '${origin}' முதல் '${destination}' வரை செல்ல வழித்தடம் ${optimalRoute.code} மிகவும் உகந்தது. ஆக்கிரமிப்பு: ${optimalRoute.crowdingPercent}%, பயண நேரம்: ${optimalRoute.travelTimeMin} நிமிடங்கள்.`
                : `For your journey from '${origin}' to '${destination}', Route ${optimalRoute.code} provides the optimal balance of frequency (every ${optimalRoute.headwayMin}m) and crowding (${optimalRoute.crowdingPercent}% occupancy). Average transit time is ${optimalRoute.travelTimeMin} mins.`}
            </p>

            {/* Quick Stop Path Badges */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar font-mono text-[10px] pt-1">
              <span className="text-[#6E6B65] uppercase shrink-0 font-bold">Stops:</span>
              {optimalRoute.stops.map((stop, sIdx) => (
                <span
                  key={sIdx}
                  className={`px-2 py-0.5 border shrink-0 ${
                    stop.name.toLowerCase().includes(origin.toLowerCase()) || stop.name.toLowerCase().includes(destination.toLowerCase())
                      ? 'bg-[#0A0A0A] text-[#F6F3EC] border-[#0A0A0A] font-bold'
                      : 'bg-[#FFFFFF] text-[#0A0A0A] border-[#0A0A0A]'
                  }`}
                >
                  {stop.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Route Comparison Ledger */}
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-[#6E6B65] mb-2 flex items-center justify-between">
            <span>ALL CORRIDOR COMPARISONS (CLICK TO INSPECT):</span>
            <span className="text-[#0A0A0A] font-bold">MATCHES FOR: {origin} → {destination}</span>
          </div>

          <div className="border border-[#0A0A0A] divide-y divide-[#0A0A0A]">
            {scoredRoutes.map((route) => {
              const isRecommended = route.id === optimalRoute.id;
              const isOvercrowded = route.crowdingPercent > 100;
              const isSelected = selectedRouteId === route.id;

              return (
                <div
                  key={route.id}
                  onClick={() => setSelectedRouteId(route.id)}
                  className={`p-3.5 sm:p-5 cursor-pointer transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 border-l-4 ${
                    isOvercrowded
                      ? 'border-l-[#DC2626] bg-[#FEF2F2]/40 hover:bg-[#FEF2F2]/70'
                      : route.crowdingPercent < 50
                      ? 'border-l-[#CA8A04] bg-[#FEFCE8]/40 hover:bg-[#FEFCE8]/70'
                      : 'border-l-[#16A34A] bg-[#F0FDF4]/40 hover:bg-[#F0FDF4]/70'
                  } ${isSelected ? 'ring-2 ring-[#0A0A0A]' : ''}`}
                >
                  {/* Left Info */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                      <span className="font-mono text-sm sm:text-base font-black text-[#0A0A0A]">
                        {route.code}
                      </span>
                      <span className="font-sans font-semibold text-sm sm:text-base text-[#0A0A0A]">
                        {isTamil ? route.tamilName : route.name}
                      </span>
                      {isRecommended && (
                        <span className="font-mono text-[8px] sm:text-[9px] uppercase px-1.5 py-0.5 bg-[#0A0A0A] text-[#F6F3EC] font-bold">
                          ★ RECOMMENDED
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <p className="font-mono text-[11px] sm:text-xs text-[#6E6B65]">
                        {route.id === 'route-a'
                          ? "Sathy Road direct • IT Corridor"
                          : route.id === 'route-b'
                          ? "Trichy Road • 60% empty seats, fast express"
                          : "Avinashi Road • Steady flow, balanced transit"}
                      </p>
                      {route.id === 'route-a' && (
                        <span className="px-1.5 py-0.5 bg-[#DC2626] text-[#FFFFFF] font-mono text-[9px] font-black uppercase shadow-[1px_1px_0px_#0A0A0A]">
                          🚨 RED BLOCK • OVERCROWDED (134%) • NEEDS +2 BUSES
                        </span>
                      )}
                      {route.id === 'route-b' && (
                        <span className="px-1.5 py-0.5 bg-[#CA8A04] text-[#FFFFFF] font-mono text-[9px] font-black uppercase shadow-[1px_1px_0px_#0A0A0A]">
                          📉 YELLOW BLOCK • UNDERCROWDED (40%) • 1 BUS TO SWITCH
                        </span>
                      )}
                      {route.id === 'route-c' && (
                        <span className="px-1.5 py-0.5 bg-[#16A34A] text-[#FFFFFF] font-mono text-[9px] font-black uppercase shadow-[1px_1px_0px_#0A0A0A]">
                          ✅ GREEN BLOCK • NORMAL CROWD (76%) • BALANCED
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right Metrics Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:flex items-center gap-2.5 sm:gap-6 font-mono text-[11px] sm:text-xs shrink-0 w-full md:w-auto pt-2.5 md:pt-0 border-t md:border-t-0 border-[#E2DBD0]">
                    <div>
                      <span className="text-[9px] sm:text-[10px] text-[#6E6B65] block uppercase">Crowding</span>
                      <span className={`font-mono text-xs font-black px-2 py-0.5 border ${
                        isOvercrowded
                          ? 'bg-[#DC2626] text-[#FFFFFF] border-[#DC2626]'
                          : route.crowdingPercent < 50
                          ? 'bg-[#CA8A04] text-[#FFFFFF] border-[#CA8A04]'
                          : 'bg-[#16A34A] text-[#FFFFFF] border-[#16A34A]'
                      }`}>
                        {route.crowdingPercent}% {isOvercrowded ? 'RED (HIGH)' : route.crowdingPercent < 50 ? 'YELLOW (LOW)' : 'GREEN (NORM)'}
                      </span>
                    </div>

                    <div>
                      <span className="text-[9px] sm:text-[10px] text-[#6E6B65] block uppercase">Est. Wait</span>
                      <span className="font-bold">{route.avgWaitMin} min</span>
                    </div>

                    <div>
                      <span className="text-[9px] sm:text-[10px] text-[#6E6B65] block uppercase">Transit Time</span>
                      <span className="font-bold">
                        {route.travelTimeMin} min
                      </span>
                    </div>

                    <div>
                      <span className="text-[9px] sm:text-[10px] text-[#6E6B65] block uppercase">Fare</span>
                      <span className="font-bold">{route.fare}</span>
                    </div>

                    <div className="hidden md:block w-4 text-right font-mono">
                      {isSelected ? "→" : ""}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* 4. Live Schedule & Departure Ledger */}
      <div className="border border-[#0A0A0A] bg-[#FFFFFF] p-4 sm:p-6 shadow-[4px_4px_0px_#0A0A0A] sm:shadow-[6px_6px_0px_#0A0A0A]">
        <div className="border-b border-[#0A0A0A] pb-3 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest font-bold text-[#0A0A0A]">
            UPCOMING DEPARTURE TIMETABLE • SLOT 08:30 AM
          </span>
          <span className="font-mono text-[9px] sm:text-[10px] text-[#6E6B65]">
            FREQUENCY: EVERY 7.5 - 15 MINS
          </span>
        </div>

        <div className="overflow-x-auto no-scrollbar font-mono text-[11px] sm:text-xs">
          <table className="w-full text-left min-w-[500px]">
            <thead>
              <tr className="border-b border-[#0A0A0A] text-[#6E6B65] uppercase text-[9px] sm:text-[10px]">
                <th className="pb-2">Route</th>
                <th className="pb-2">Path</th>
                <th className="pb-2">Next Departure</th>
                <th className="pb-2">Headway</th>
                <th className="pb-2">Crowd Density</th>
                <th className="pb-2">Optimization Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2DBD0]">
              {routes.map(r => (
                <tr key={r.id} className="hover:bg-[#FAF8F5]">
                  <td className="py-2.5 sm:py-3 font-bold">{r.code}</td>
                  <td className="py-2.5 sm:py-3 font-sans text-xs">{isTamil ? r.tamilName : r.name}</td>
                  <td className="py-2.5 sm:py-3">
                    {r.id === 'route-b' ? 'In 2 min (08:32)' : r.id === 'route-c' ? 'In 6 min (08:36)' : 'In 12 min (08:42)'}
                  </td>
                  <td className="py-2.5 sm:py-3">Every {r.headwayMin}m</td>
                  <td className="py-2.5 sm:py-3">
                    <span className={`px-2 py-0.5 font-mono text-[10px] font-black border ${
                      r.crowdingPercent > 100
                        ? 'bg-[#FEF2F2] text-[#DC2626] border-[#DC2626]'
                        : r.crowdingPercent < 50
                        ? 'bg-[#FEFCE8] text-[#854D0E] border-[#CA8A04]'
                        : 'bg-[#F0FDF4] text-[#16A34A] border-[#16A34A]'
                    }`}>
                      {r.crowdingPercent}% {r.crowdingPercent > 100 ? '🚨 RED (HIGH)' : r.crowdingPercent < 50 ? '📉 YELLOW (LOW)' : '✅ GREEN (NORMAL)'}
                    </span>
                  </td>
                  <td className="py-2.5 sm:py-3 font-mono text-[10px] sm:text-[11px]">
                    {r.id === 'route-a' ? (
                      <span className="px-2 py-0.5 bg-[#FEF2F2] text-[#DC2626] border border-[#DC2626] font-black">
                        {optimizationApplied ? '✅ +2 Relief Buses Deployed' : '👉 +2 Extra Buses Needed'}
                      </span>
                    ) : r.id === 'route-b' ? (
                      <span className="px-2 py-0.5 bg-[#FEFCE8] text-[#854D0E] border border-[#CA8A04] font-black">
                        {optimizationApplied ? '✅ 1 Bus Switched to Rte 12' : '👉 1 Bus to Switch to Rte 12'}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-[#F0FDF4] text-[#16A34A] border border-[#16A34A] font-bold">
                        Normal Steady Service
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
