import React from 'react';
import { motion } from 'framer-motion';
import { useTransit } from '../context/TransitContext';
import { HOURLY_DEMAND_CURVE } from '../data/transitData';
import { TechnicalGearSvg, CorridorBranchSvg } from './CustomIcons';

export default function OperatorDashboard() {
  const {
    routes,
    breakdownAlert,
    optimizationApplied,
    applyOptimization,
    revertOptimization,
    toggleBreakdown,
    language
  } = useTransit();

  const isTamil = language === 'ta';

  return (
    <div className="space-y-6 sm:space-y-8">
      
      {/* 1. AI Optimization Decision Engine: Overcrowded vs Undercrowded Telemetry */}
      <div className="border-2 border-[#0A0A0A] bg-[#FFFFFF] p-4 sm:p-6 lg:p-8 shadow-[4px_4px_0px_#0A0A0A] sm:shadow-[6px_6px_0px_#0A0A0A]">
        
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 sm:gap-6 border-b border-[#0A0A0A] pb-4 sm:pb-6 mb-4 sm:mb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase bg-[#0A0A0A] text-[#F6F3EC] px-1.5 sm:px-2 py-0.5 font-bold">
                DETERMINISTIC RULE #R-104 & #R-105
              </span>
              <span className="font-mono text-[10px] sm:text-xs text-[#6E6B65]">
                CAPACITY REALLOCATION: OVERCROWDED & UNDERCROWDED CORRIDOR ENGINE
              </span>
            </div>
            
            <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-semibold text-[#0A0A0A]">
              {isTamil
                ? "முடிவு: நெரிசல் மிகுந்த வழித்தடத்திற்கு கூடுதல் பேருந்து (+2) & கூட்டம் குறைந்த வழித்தடத்தில் பேருந்து ரத்து/குறைப்பு (-1)"
                : "Fleet Directive: Add Extra Buses (+2) to Overcrowded Route & Cancel Idle Bus (-1) on Undercrowded Route"}
            </h3>

            <p className="font-sans text-xs text-[#6E6B65] max-w-2xl leading-relaxed">
              {isTamil
                ? "நேரலை பகுப்பாய்வு: காந்திபுரம் - சரவணம்பட்டி வழித்தடம் 12-ல் 134% கடுமையான கூட்ட நெரிசல் நிலவுகிறது (கூடுதல் பேருந்துகள் தேவை). மாறாக, உக்கடம் - சிங்காநல்லூர் வழித்தடம் 3A-ல் 40% மட்டுமே கூட்டம் உள்ளதால் 60% இருக்கைகள் காலியாக இயங்குகின்றன (குறைந்த பேருந்துகள் போதும்). எனவே, வழித்தடம் 3A-ல் 1 தேவையற்ற பேருந்தை ரத்து செய்து, அதனை நெரிசல் மிகுந்த வழித்தடம் 12-க்கு மாற்றி சமன் செய்ய AI பரிந்துரைக்கிறது."
                : "Real-time corridor analytics: Route 12 (Gandhipuram ↔ Saravanampatti IT Park) is OVERCROWDED at 134% capacity (needs extra buses). Conversely, Route 3A (Ukkadam ↔ Singanallur) is UNDERCROWDED at 40% capacity with 60% empty seats (needs fewer buses). AI Directive: Cancel 1 idle scheduled departure on undercrowded Route 3A and reallocate +2 relief buses to overcrowded Route 12 to eliminate passenger stranding while stopping fuel waste."}
            </p>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            {optimizationApplied ? (
              <button
                onClick={revertOptimization}
                className="w-full sm:w-auto px-4 sm:px-5 py-2.5 font-mono text-[11px] sm:text-xs uppercase tracking-wider font-bold border border-[#0A0A0A] bg-[#FAF8F5] text-[#0A0A0A] hover:bg-[#E2DBD0] transition-colors"
              >
                Revert to Baseline Schedule
              </button>
            ) : (
              <button
                onClick={applyOptimization}
                className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 font-mono text-[11px] sm:text-xs uppercase tracking-widest font-black border-2 border-[#0A0A0A] bg-[#0A0A0A] text-[#F6F3EC] hover:bg-[#333333] shadow-[3px_3px_0px_#6E6B65] sm:shadow-[4px_4px_0px_#6E6B65] transition-all flex items-center justify-center gap-2"
              >
                <span>⚡ EXECUTE BALANCING (+2 EXTRA BUSES / -1 CANCELLED BUS)</span>
              </button>
            )}
          </div>
        </div>

        {/* High-Visibility Highlight Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-[#FAF8F5] border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] mb-5">
          <div className="flex items-center gap-2 p-2 bg-[#FEF2F2] border-2 border-[#DC2626]">
            <span className="px-2 py-0.5 bg-[#DC2626] text-white font-mono text-[10px] font-black uppercase tracking-wider">
              🚨 CROWDING TOO HIGH
            </span>
            <span className="font-mono text-xs font-bold text-[#991B1B]">
              Route 12 (134%) ➔ <span className="bg-[#FEF08A] px-1.5 py-0.5 text-[#0A0A0A] border border-[#0A0A0A] font-black">+2 EXTRA BUSES NEEDED</span>
            </span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-[#F0FDF4] border-2 border-[#16A34A]">
            <span className="px-2 py-0.5 bg-[#16A34A] text-white font-mono text-[10px] font-black uppercase tracking-wider">
              📉 CROWDING TOO LOW
            </span>
            <span className="font-mono text-xs font-bold text-[#166534]">
              Route 3A (40%) ➔ <span className="bg-[#BBF7D0] px-1.5 py-0.5 text-[#0A0A0A] border border-[#0A0A0A] font-black">1 BUS TO SWITCH TO ROUTE 12</span>
            </span>
          </div>
        </div>

        {/* 2 Dedicated Side-by-Side Live Analytical Alert Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
          
          {/* Card A: OVERCROWDED ROUTE ANALYSIS & DIRECTIVE */}
          <div className="border-2 border-[#DC2626] bg-[#FEF2F2]/60 p-4 sm:p-5 relative shadow-[4px_4px_0px_#DC2626]">
            {/* Highlight Badge for Crowding Too High */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="font-mono text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-2.5 py-1 bg-[#DC2626] text-[#FFFFFF] shadow-[2px_2px_0px_#0A0A0A] flex items-center gap-1.5">
                <span>🚨 CROWDING STATUS:</span>
                <span className="underline">TOO HIGH (134% OVERCROWDED)</span>
              </span>
              <span className="font-mono text-xs font-black px-2 py-0.5 bg-[#FEF08A] text-[#991B1B] border border-[#DC2626]">
                CRITICAL OVERLOAD: 480 PAX/HR
              </span>
            </div>
            
            <h4 className="font-display text-base sm:text-lg font-bold text-[#0A0A0A] mt-1">
              Route 12: Gandhipuram ↔ Saravanampatti IT Park
            </h4>

            <div className="mt-3 space-y-2.5 text-xs font-sans">
              {/* HIGHLIGHT: Extra Buses Needed */}
              <div className="p-3 bg-[#FEF08A] border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] font-mono">
                <div className="flex items-center gap-1.5 font-black text-[11px] sm:text-xs uppercase tracking-wider text-[#991B1B]">
                  <span>⚡ FLEET DEMAND HIGHLIGHT:</span>
                </div>
                <div className="text-sm sm:text-base font-black text-[#0A0A0A] mt-0.5">
                  👉 +2 EXTRA RELIEF BUSES NEEDED IMMEDIATELY
                </div>
                <div className="text-[11px] text-[#451A03] font-sans font-medium mt-1">
                  {isTamil
                    ? "பயணிகள் நெரிசலைத் தவிர்க்க TN-38-N-6602 மற்றும் ரிசர்வ் பேருந்தை உடனடியாக இயக்க வேண்டும்."
                    : "Deploy standby units TN-38-N-6602 + Standby Depot unit to cut headway to 7.5 min and drop wait times from 15.4m to 6.2m."}
                </div>
              </div>

              <div className="p-2.5 bg-[#FFFFFF] border border-[#0A0A0A]">
                <span className="font-mono text-[10px] uppercase font-bold text-[#6E6B65] block">ANALYSIS & JUSTIFICATION:</span>
                <p className="text-[#0A0A0A] leading-relaxed mt-0.5">
                  • <b>Passenger Surge:</b> 480 passengers/hour during morning IT rush on Sathy Road against a 280 pax capacity.
                  <br />• <b>Long Wait Time:</b> Commuters facing 15.4 minutes delay at GP Signal and Ganapathy Stop.
                  <br />• <b>Impact of Extra Buses:</b> Slashes average waiting time from 15.4 mins down to 6.2 mins and reduces passenger crowding to 82%.
                </p>
              </div>
            </div>
          </div>

          {/* Card B: UNDERCROWDED ROUTE ANALYSIS & DIRECTIVE */}
          <div className="border-2 border-[#16A34A] bg-[#F0FDF4]/60 p-4 sm:p-5 relative shadow-[4px_4px_0px_#16A34A]">
            {/* Highlight Badge for Crowding Too Low */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="font-mono text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-2.5 py-1 bg-[#16A34A] text-[#FFFFFF] shadow-[2px_2px_0px_#0A0A0A] flex items-center gap-1.5">
                <span>📉 CROWDING STATUS:</span>
                <span className="underline">TOO LOW (40% UNDERCROWDED)</span>
              </span>
              <span className="font-mono text-xs font-black px-2 py-0.5 bg-[#BBF7D0] text-[#166534] border border-[#16A34A]">
                60% SEATS EMPTY (SURPLUS CAPACITY)
              </span>
            </div>
            
            <h4 className="font-display text-base sm:text-lg font-bold text-[#0A0A0A] mt-1">
              Route 3A: Ukkadam ↔ Singanallur (Trichy Road)
            </h4>

            <div className="mt-3 space-y-2.5 text-xs font-sans">
              {/* HIGHLIGHT: Less Crowded Buses to Switch */}
              <div className="p-3 bg-[#BBF7D0] border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] font-mono">
                <div className="flex items-center gap-1.5 font-black text-[11px] sm:text-xs uppercase tracking-wider text-[#166534]">
                  <span>🔄 FLEET REALLOCATION HIGHLIGHT:</span>
                </div>
                <div className="text-sm sm:text-base font-black text-[#0A0A0A] mt-0.5">
                  👉 1 LESS-CROWDED BUS AVAILABLE TO SWITCH TO OVERCROWDED ROUTE
                </div>
                <div className="text-[11px] text-[#14532D] font-sans font-medium mt-1">
                  {isTamil
                    ? "வழித்தடம் 3A-ல் வீணாக ஓடும் 1 பேருந்தை ரத்து செய்து, அதனை அதிக நெரிசல் உள்ள வழித்தடம் 12-க்கு நேரடியாக மாற்றலாம்."
                    : "Cancel 1 idle departure on Route 3A and reassign the bus & driver directly to overcrowded Route 12 to eliminate fuel waste while preserving 15-minute headway."}
                </div>
              </div>

              <div className="p-2.5 bg-[#FFFFFF] border border-[#0A0A0A]">
                <span className="font-mono text-[10px] uppercase font-bold text-[#6E6B65] block">ANALYSIS & JUSTIFICATION:</span>
                <p className="text-[#0A0A0A] leading-relaxed mt-0.5">
                  • <b>Under-utilization:</b> Operating at only 40% passenger occupancy with 60% empty seats (wasteful diesel burn).
                  <br />• <b>Service Preservation:</b> Cancelling 1 departure maintains a comfortable 15-minute headway with guaranteed seating.
                  <br />• <b>Operational Benefit:</b> Frees up 1 driver and 1 vehicle to directly resolve the crisis bottleneck on Route 12.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Before vs After Tabular Comparison Matrix */}
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-[#6E6B65] mb-2">
            BEFORE VS AFTER OPTIMIZATION TELEMETRY MATRIX (COIMBATORE CORRIDORS):
          </div>

          <div className="overflow-x-auto no-scrollbar font-mono text-xs border border-[#0A0A0A]">
            <table className="w-full text-left min-w-[540px]">
              <thead className="bg-[#FAF8F5] border-b border-[#0A0A0A] text-[9px] sm:text-[10px] uppercase text-[#6E6B65]">
                <tr>
                  <th className="p-2.5 sm:p-3">Corridor Parameter</th>
                  <th className="p-2.5 sm:p-3">Baseline (Before Balancing)</th>
                  <th className="p-2.5 sm:p-3">Optimized (After Extra Bus & Cancellation)</th>
                  <th className="p-2.5 sm:p-3">Net System Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2DBD0] text-[11px] sm:text-xs">
                <tr>
                  <td className="p-2.5 sm:p-3 font-bold">
                    Route 12 (Gandhipuram ↔ Saravanampatti)
                    <span className="block text-[10px] font-mono text-[#DC2626]">Corridor: Sathy Road IT Rush</span>
                  </td>
                  <td className="p-2.5 sm:p-3">
                    <span className="px-2 py-1 bg-[#FEF08A] text-[#991B1B] border border-[#DC2626] font-bold block sm:inline">
                      ⚠️ CROWDING TOO HIGH (134%) • +2 EXTRA BUSES NEEDED
                    </span>
                  </td>
                  <td className="p-2.5 sm:p-3">
                    <span className="px-2 py-1 bg-[#DCFCE7] text-[#166534] border border-[#16A34A] font-bold block sm:inline">
                      ✅ +2 EXTRA BUSES DEPLOYED (Crowd Drops to 82%)
                    </span>
                  </td>
                  <td className="p-2.5 sm:p-3 font-bold text-[#16A34A]">Wait cut from 15.4m to 6.2m (↓ 60%)</td>
                </tr>
                <tr>
                  <td className="p-2.5 sm:p-3 font-bold">
                    Route 3A (Ukkadam ↔ Singanallur)
                    <span className="block text-[10px] font-mono text-[#16A34A]">Corridor: Trichy Road Lean</span>
                  </td>
                  <td className="p-2.5 sm:p-3">
                    <span className="px-2 py-1 bg-[#BBF7D0] text-[#166534] border border-[#16A34A] font-bold block sm:inline">
                      🌿 CROWDING TOO LOW (40%) • 1 BUS TO SWITCH
                    </span>
                  </td>
                  <td className="p-2.5 sm:p-3">
                    <span className="px-2 py-1 bg-[#FEF08A] text-[#0A0A0A] border border-[#0A0A0A] font-bold block sm:inline">
                      🔄 1 BUS SWITCHED TO OVERCROWDED ROUTE 12
                    </span>
                  </td>
                  <td className="p-2.5 sm:p-3 font-bold text-[#16A34A]">Zero empty runs • 18L fuel saved/day</td>
                </tr>
                <tr>
                  <td className="p-2.5 sm:p-3 font-bold">Average Passenger Waiting Time</td>
                  <td className="p-2.5 sm:p-3 text-[#6E6B65]">15.4 min average bottleneck</td>
                  <td className="p-2.5 sm:p-3 font-bold text-[#0A0A0A]">6.2 min citywide average</td>
                  <td className="p-2.5 sm:p-3 font-bold text-[#16A34A]">↓ 58% Commuter Wait Reduction</td>
                </tr>
                <tr>
                  <td className="p-2.5 sm:p-3 font-bold">Corridor Service Headway Frequency</td>
                  <td className="p-2.5 sm:p-3 text-[#6E6B65]">Every 15 min on critical line</td>
                  <td className="p-2.5 sm:p-3 font-bold text-[#0A0A0A]">Every 7.5 min on Route 12</td>
                  <td className="p-2.5 sm:p-3 font-bold">Bottleneck Dissolved</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* 2. Three Routes Telemetry Ledger */}
      <div className="border border-[#0A0A0A] bg-[#FFFFFF] p-4 sm:p-6 shadow-[4px_4px_0px_#0A0A0A] sm:shadow-[6px_6px_0px_#0A0A0A]">
        <div className="border-b border-[#0A0A0A] pb-3 mb-4 flex items-center justify-between">
          <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest font-bold text-[#0A0A0A]">
            COIMBATORE CORRIDOR TELEMETRY LEDGER • 3 PARALLEL SERVICES
          </span>
          <span className="font-mono text-[9px] sm:text-[10px] text-[#6E6B65]">
            PASSENGER LOAD & FLEET ALLOCATION
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#0A0A0A] border border-[#0A0A0A] font-mono text-xs">
          {routes.map(route => {
            const isOvercrowded = route.crowdingPercent > 100;
            const isUndercrowded = route.crowdingPercent < 50;
            return (
              <div key={route.id} className="p-4 sm:p-5 space-y-2.5 sm:space-y-3 bg-[#FFFFFF]">
                <div className="flex items-center justify-between">
                  <span className="text-base font-black text-[#0A0A0A]">{route.code}</span>
                  <span className={`px-2 py-0.5 text-[9px] sm:text-[10px] font-black border border-[#0A0A0A] ${
                    isOvercrowded
                      ? 'bg-[#DC2626] text-[#FFFFFF] shadow-[2px_2px_0px_#0A0A0A]'
                      : isUndercrowded
                      ? 'bg-[#16A34A] text-[#FFFFFF] shadow-[2px_2px_0px_#0A0A0A]'
                      : 'bg-[#FAF8F5] text-[#0A0A0A]'
                  }`}>
                    {route.crowdingPercent}% {isOvercrowded ? '🔥 CROWDING TOO HIGH' : isUndercrowded ? '🌿 CROWDING TOO LOW' : 'BALANCED'}
                  </span>
                </div>

                <div className="font-sans text-xs text-[#6E6B65]">
                  {isTamil ? route.tamilName : route.name}
                </div>

                {/* Highlighted Fleet Allocation Action Box */}
                <div className={`p-2 border border-[#0A0A0A] font-mono text-[10px] sm:text-[11px] ${
                  route.id === 'route-a'
                    ? 'bg-[#FEF08A] text-[#0A0A0A]'
                    : route.id === 'route-b'
                    ? 'bg-[#BBF7D0] text-[#0A0A0A]'
                    : 'bg-[#FAF8F5] text-[#0A0A0A]'
                }`}>
                  <div className="flex justify-between items-center">
                    <span className="font-black uppercase text-[9px] sm:text-[10px]">
                      {route.id === 'route-a' ? '⚡ FLEET DEMAND:' : route.id === 'route-b' ? '🔄 REALLOCATION:' : 'FLEET ALLOCATION:'}
                    </span>
                    <span className="font-black text-[10px] sm:text-[11px]">
                      {route.id === 'route-a'
                        ? (optimizationApplied ? '8 units (+2 Extra Deployed)' : '👉 +2 EXTRA BUSES NEEDED')
                        : route.id === 'route-b'
                        ? (optimizationApplied ? '4 units (1 Switched to Rte 12)' : '👉 1 BUS TO SWITCH TO RTE 12')
                        : '4 units (Standard)'}
                    </span>
                  </div>
                </div>

                <div className="space-y-1 pt-1 border-t border-[#E2DBD0] text-[10px] sm:text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-[#6E6B65]">DEMAND:</span>
                    <span>{route.demandPerHour} pax/hr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6E6B65]">AVG WAIT:</span>
                    <span className="font-bold">{route.avgWaitMin} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6E6B65]">HEADWAY:</span>
                    <span>{route.headwayMin} min</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Dynamic Optimization & Fleet Incident Command (Split) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 font-mono text-xs">
        
        {/* Dynamic Capacity Management Control */}
        <div className="border border-[#0A0A0A] bg-[#FFFFFF] p-4 sm:p-6 shadow-[4px_4px_0px_#0A0A0A] sm:shadow-[6px_6px_0px_#0A0A0A] space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between border-b border-[#0A0A0A] pb-3">
            <span className="font-bold uppercase tracking-wider text-[#0A0A0A] text-[11px] sm:text-xs">
              DYNAMIC CAPACITY BALANCING LOGIC
            </span>
            <span className="px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] border border-[#0A0A0A] bg-[#0A0A0A] text-[#F6F3EC] uppercase tracking-wider">
              AUTO-BALANCING
            </span>
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            <div className="border border-[#0A0A0A] p-2.5 sm:p-3 bg-[#FAF8F5]">
              <span className="font-bold block text-[11px] sm:text-xs text-[#DC2626]">OVERCROWDED: ROUTE 12 (SARAVANAMPATTI IT CORRIDOR)</span>
              <p className="font-sans text-xs text-[#6E6B65] mt-1 leading-relaxed">
                Crowding exceeds 134% during morning and evening rush. System deploys +2 extra relief buses, cutting wait times by 60% and absorbing queue overflows at Ganapathy and Sivanandapuram.
              </p>
            </div>
            <div className="border border-[#0A0A0A] p-2.5 sm:p-3 bg-[#FAF8F5]">
              <span className="font-bold block text-[11px] sm:text-xs text-[#16A34A]">UNDERCROWDED: ROUTE 3A (TRICHY ROAD CORRIDOR)</span>
              <p className="font-sans text-xs text-[#6E6B65] mt-1 leading-relaxed">
                Occupancy sits at only 40% with 60% empty seating. System cancels 1 redundant departure and transfers resources without compromising regular 15-minute passenger frequency.
              </p>
            </div>
          </div>
        </div>

        {/* Breakdown Incident Control */}
        <div className="border border-[#0A0A0A] bg-[#FFFFFF] p-4 sm:p-6 shadow-[4px_4px_0px_#0A0A0A] sm:shadow-[6px_6px_0px_#0A0A0A] space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between border-b border-[#0A0A0A] pb-3">
            <span className="font-bold uppercase tracking-wider text-[#0A0A0A] text-[11px] sm:text-xs">
              FLEET INCIDENT & RELIEF DISPATCH
            </span>
            <button
              onClick={toggleBreakdown}
              className={`px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] border border-[#0A0A0A] uppercase tracking-wider ${
                breakdownAlert.active ? 'bg-[#0A0A0A] text-[#F6F3EC]' : 'bg-[#FAF8F5] text-[#0A0A0A]'
              }`}
            >
              {breakdownAlert.active ? "INCIDENT ACTIVE" : "FLEET 100% OPERATIONAL"}
            </button>
          </div>

          {breakdownAlert.active ? (
            <div className="border border-[#0A0A0A] p-3 sm:p-4 bg-[#FAF8F5] space-y-2">
              <span className="font-bold block text-[11px] sm:text-xs">BUS TN-38-N-2914 (ROUTE 12)</span>
              <p className="font-sans text-xs text-[#6E6B65] leading-relaxed">
                Alternator & electrical circuit failure near Ganapathy Signal on Sathy Road. 48 passengers queued.
              </p>
              <div className="border-t border-[#E2DBD0] pt-2 text-[10px] sm:text-[11px] flex justify-between">
                <span>Relief Unit: <b>TN-38-N-6602 (ETA 4m)</b></span>
                <span>Mobile Crane Dispatched</span>
              </div>
            </div>
          ) : (
            <div className="border border-[#0A0A0A] p-6 text-center text-[#6E6B65] text-xs">
              Zero active maintenance tickets. All revenue service vehicles operating normally.
            </div>
          )}
        </div>

      </div>

      {/* 4. 24-Hour Passenger Demand Curve (Architectural Histogram) */}
      <div className="border border-[#0A0A0A] bg-[#FFFFFF] p-4 sm:p-6 shadow-[4px_4px_0px_#0A0A0A] sm:shadow-[6px_6px_0px_#0A0A0A]">
        <div className="border-b border-[#0A0A0A] pb-3 mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5">
          <div>
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest font-bold text-[#0A0A0A]">
              24-HOUR CORRIDOR DEMAND PROFILE • TWIN PEAK DISTRIBUTION
            </span>
            <p className="font-mono text-[9px] sm:text-[10px] text-[#6E6B65] uppercase mt-0.5">
              15-minute interval demand simulation showing 8-10 AM & 5-8 PM surges requiring extra buses
            </p>
          </div>
          <span className="font-mono text-[10px] sm:text-xs text-[#0A0A0A]">
            PEAK: 460 PAX/HR
          </span>
        </div>

        {/* Stark Monochrome Histogram */}
        <div className="h-36 sm:h-44 flex items-end gap-1 sm:gap-2 pt-4 sm:pt-6 pb-2 border-b border-[#0A0A0A]">
          {HOURLY_DEMAND_CURVE.map((item, idx) => {
            const heightPercent = Math.min((item.demandA / 460) * 100, 100);
            return (
              <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                <div className="w-full flex items-end justify-center h-full">
                  <div
                    className={`w-full transition-all ${
                      item.peak ? 'bg-[#0A0A0A]' : 'bg-[#E2DBD0] group-hover:bg-[#0A0A0A]'
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>
                <span className="font-mono text-[8px] sm:text-[9px] text-[#6E6B65] mt-1 truncate">
                  {item.slot.split(':')[0]}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between font-mono text-[9px] sm:text-[10px] text-[#6E6B65] uppercase pt-2 gap-1">
          <span>05:00 AM (Early Run)</span>
          <span className="font-bold text-[#0A0A0A]">Morning Peak (Extra Buses)</span>
          <span>Midday (Low Buses)</span>
          <span className="font-bold text-[#0A0A0A]">Evening Peak (Extra Buses)</span>
          <span>11:00 PM (Terminus)</span>
        </div>
      </div>

    </div>
  );
}
