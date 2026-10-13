import React from 'react';
import { useTransit } from '../context/TransitContext';
import { TechnicalGearSvg, CorridorBranchSvg } from './CustomIcons';

export default function CorridorTelemetrySheet() {
  const {
    routes,
    searchedRouteId,
    setSearchedRouteId,
    searchQuery,
    breakdownAlert,
    optimizationApplied,
    language
  } = useTransit();

  const isTamil = language === 'ta';

  // Find the currently searched / selected route, default to Route 12 (route-a)
  const activeRoute = routes.find(r => r.id === searchedRouteId) || routes[0];

  const isOvercrowded = activeRoute.crowdingPercent > 100;
  const isUndercrowded = activeRoute.crowdingPercent < 50;

  // Determine dynamic fleet status for the searched route
  let corridorStatusText = "ALL VEHICLES OPERATING NORMALLY";
  let corridorTamilStatusText = "அனைத்துப் பேருந்துகளும் சீராக இயங்குகின்றன";

  if (activeRoute.id === 'route-a') {
    if (breakdownAlert.active) {
      corridorStatusText = "GANAPATHY SIGNAL (RELIEF TN-38-N-6602 EN ROUTE)";
      corridorTamilStatusText = "கணபதி சிக்னல் (நிவாரணப் பேருந்து விரைந்து வருகிறது)";
    } else {
      corridorStatusText = optimizationApplied
        ? "SATHY ROAD IT CORRIDOR (OPTIMIZED +2 RELIEF BUSES ACTIVE)"
        : "SATHY ROAD IT CORRIDOR (HEAVY IT COMMUTER OVERFLOW)";
      corridorTamilStatusText = optimizationApplied
        ? "சத்தி ரோடு (+2 கூடுதல் நிவாரணப் பேருந்துகள் இயக்கம்)"
        : "சத்தி ரோடு (அதிக கூட்ட நெரிசல் நிலவுகிறது)";
    }
  } else if (activeRoute.id === 'route-b') {
    corridorStatusText = optimizationApplied
      ? "TRICHY ROAD CORRIDOR (1 SURPLUS BUS SWITCHED TO ROUTE 12)"
      : "TRICHY ROAD CORRIDOR (60% SEATS EMPTY • LEAN SCHEDULE)";
    corridorTamilStatusText = optimizationApplied
      ? "திருச்சி ரோடு (1 பேருந்து வழித்தடம் 12-க்கு மாற்றப்பட்டது)"
      : "திருச்சி ரோடு (60% காலி இருக்கைகள் • குறைந்த நெரிசல்)";
  } else if (activeRoute.id === 'route-c') {
    corridorStatusText = "AVINASHI ROAD AIRPORT CORRIDOR (STEADY 15M HEADWAY)";
    corridorTamilStatusText = "அவினாசி சாலை (சீரான 15 நிமிட இடைவேளை)";
  }

  // Active fleet units description for searched route
  let activeFleetText = "";
  if (activeRoute.id === 'route-a') {
    activeFleetText = optimizationApplied ? "8 Buses (+2 Extra Deployed)" : "4 Buses (Needs +2 Extra)";
  } else if (activeRoute.id === 'route-b') {
    activeFleetText = optimizationApplied ? "4 Buses (1 Switched to Rte 12)" : "5 Buses (1 Available to Switch)";
  } else {
    activeFleetText = "4 Buses Scheduled (Standard)";
  }

  return (
    <div className="bg-[#FFFFFF] border-2 border-[#0A0A0A] p-4 sm:p-6 lg:p-7 shadow-[4px_4px_0px_#0A0A0A] sm:shadow-[6px_6px_0px_#0A0A0A]">
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#0A0A0A] pb-2.5 sm:pb-3 mb-3">
        <div>
          <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest font-black text-[#0A0A0A] block">
            CORRIDOR TELEMETRY SHEET
          </span>
          <span className="font-mono text-[9px] sm:text-[10px] text-[#6E6B65]">
            {isTamil ? "தேடப்பட்ட வழித்தட நேரலை தரவு" : "DYNAMIC TELEMETRY FOR SEARCHED ROUTE"}
          </span>
        </div>
        <span className="font-mono text-[9px] sm:text-[10px] text-[#0A0A0A] font-bold px-1.5 py-0.5 bg-[#FAF8F5] border border-[#0A0A0A]">
          LIVE REFRESH: 15s
        </span>
      </div>

      {/* Dynamic Route Switcher Pill Tabs */}
      <div className="mb-4 pt-1">
        <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-[#6E6B65] uppercase tracking-wider mb-1.5">
          <span>{isTamil ? "தேர்ந்தெடுக்கப்பட்ட வழித்தடம்:" : "INSPECTED ROUTE TELEMETRY:"}</span>
          <span className="font-bold text-[#0A0A0A]">ROUTE {activeRoute.code}</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 font-mono text-[10px] sm:text-[11px]">
          {routes.map(r => {
            const isRSelected = r.id === activeRoute.id;
            const isROver = r.crowdingPercent > 100;
            const isRUnder = r.crowdingPercent < 50;
            return (
              <button
                key={r.id}
                onClick={() => setSearchedRouteId(r.id)}
                className={`py-1.5 px-1 border text-center font-black transition-all ${
                  isRSelected
                    ? isROver
                      ? 'bg-[#DC2626] text-[#FFFFFF] border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A]'
                      : isRUnder
                      ? 'bg-[#CA8A04] text-[#FFFFFF] border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A]'
                      : 'bg-[#16A34A] text-[#FFFFFF] border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A]'
                    : 'bg-[#FAF8F5] text-[#0A0A0A] border-[#0A0A0A] hover:bg-[#E2DBD0]'
                }`}
                title={`Inspect telemetry for Route ${r.code}`}
              >
                Rte {r.code} {isROver ? '• RED' : isRUnder ? '• YLW' : '• GRN'}
              </button>
            );
          })}
        </div>
      </div>

      {/* Searched Corridor Header Banner */}
      <div className={`p-2.5 mb-4 border-2 border-[#0A0A0A] font-mono ${
        isOvercrowded
          ? 'bg-[#FEF2F2] border-[#DC2626] text-[#991B1B]'
          : isUndercrowded
          ? 'bg-[#FEFCE8] border-[#CA8A04] text-[#854D0E]'
          : 'bg-[#F0FDF4] border-[#16A34A] text-[#166534]'
      }`}>
        <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
          <span>{isTamil ? "காரிடார் பாதை" : "SEARCHED CORRIDOR"}</span>
          <span className="underline">{activeRoute.code}</span>
        </div>
        <div className="font-sans font-bold text-xs sm:text-sm text-[#0A0A0A] mt-0.5 truncate">
          {isTamil ? activeRoute.tamilName : activeRoute.name}
        </div>
        {searchQuery?.origin && searchQuery?.destination && (
          <div className="text-[10px] text-[#6E6B65] mt-1 font-mono truncate">
            Path: {searchQuery.origin} ➔ {searchQuery.destination}
          </div>
        )}
      </div>

      {/* High-Contrast Telemetry Metrics Rows */}
      <div className="space-y-3 font-mono">
        
        {/* Row 1: Demand */}
        <div className="flex items-baseline justify-between border-b border-[#E2DBD0] pb-2">
          <span className="text-[11px] sm:text-xs text-[#6E6B65] uppercase font-bold">
            Corridor Demand
          </span>
          <span className="text-base sm:text-lg font-bold text-[#0A0A0A]">
            {activeRoute.demandPerHour} <span className="text-[10px] sm:text-xs font-normal text-[#6E6B65]">pax/hr</span>
          </span>
        </div>

        {/* Row 2: Average Wait */}
        <div className="flex items-baseline justify-between border-b border-[#E2DBD0] pb-2">
          <span className="text-[11px] sm:text-xs text-[#6E6B65] uppercase font-bold">
            Average Waiting Time
          </span>
          <div className="text-right">
            <span className="text-lg sm:text-xl font-black text-[#0A0A0A]">
              {activeRoute.avgWaitMin} min
            </span>
            {optimizationApplied && activeRoute.id === 'route-a' && (
              <span className="block text-[9px] sm:text-[10px] text-[#16A34A] font-bold">
                (↓ 60% wait reduction applied)
              </span>
            )}
          </div>
        </div>

        {/* Row 3: Peak Crowding */}
        <div className="flex items-baseline justify-between border-b border-[#E2DBD0] pb-2">
          <span className="text-[11px] sm:text-xs text-[#6E6B65] uppercase font-bold">
            Peak Crowding %
          </span>
          <div className="text-right">
            <span className={`text-lg sm:text-xl font-black ${
              isOvercrowded
                ? 'text-[#DC2626]'
                : isUndercrowded
                ? 'text-[#CA8A04]'
                : 'text-[#16A34A]'
            }`}>
              {activeRoute.crowdingPercent}%
            </span>
            <span className={`block text-[9px] sm:text-[10px] font-bold ${
              isOvercrowded
                ? 'text-[#DC2626]'
                : isUndercrowded
                ? 'text-[#CA8A04]'
                : 'text-[#16A34A]'
            }`}>
              {isOvercrowded
                ? "[CRITICAL OVERCROWDING • RED]"
                : isUndercrowded
                ? "[UNDERCROWDED LEAN • YELLOW]"
                : "[NORMAL WITHIN CAPACITY • GREEN]"}
            </span>
          </div>
        </div>

        {/* Row 4: Active Fleet Units */}
        <div className="flex items-baseline justify-between border-b border-[#E2DBD0] pb-2">
          <span className="text-[11px] sm:text-xs text-[#6E6B65] uppercase font-bold">
            Active Fleet Units
          </span>
          <span className="text-xs sm:text-sm font-black text-[#0A0A0A]">
            {activeFleetText}
          </span>
        </div>

        {/* Row 5: Corridor Fleet Status */}
        <div className="pt-1">
          <span className="text-[10px] sm:text-[11px] text-[#6E6B65] uppercase font-bold block mb-1">
            Corridor Fleet Status:
          </span>
          <div className={`p-2 border border-[#0A0A0A] text-[10px] sm:text-[11px] font-bold ${
            isOvercrowded
              ? 'bg-[#FEF2F2] text-[#DC2626]'
              : isUndercrowded
              ? 'bg-[#FEFCE8] text-[#854D0E]'
              : 'bg-[#F0FDF4] text-[#16A34A]'
          }`}>
            {isTamil ? corridorTamilStatusText : corridorStatusText}
          </div>
        </div>

      </div>

    </div>
  );
}
