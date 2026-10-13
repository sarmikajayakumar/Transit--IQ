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
      
      {/* 1. AI Optimization Decision Engine */}
      <div className="border-2 border-[#0A0A0A] bg-[#FFFFFF] p-4 sm:p-6 lg:p-8 shadow-[4px_4px_0px_#0A0A0A] sm:shadow-[6px_6px_0px_#0A0A0A]">
        
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 sm:gap-6 border-b border-[#0A0A0A] pb-4 sm:pb-6 mb-4 sm:mb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase bg-[#0A0A0A] text-[#F6F3EC] px-1.5 sm:px-2 py-0.5 font-bold">
                DETERMINISTIC RULE #R-104
              </span>
              <span className="font-mono text-[10px] sm:text-xs text-[#6E6B65]">
                CORRIDOR CAPACITY BALANCING ALGORITHM
              </span>
            </div>
            
            <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-normal text-[#0A0A0A]">
              {isTamil
                ? "விதிமுறை: கூட்ட நெரிசல் > 100% எட்டியதால் +2 கூடுதல் பேருந்துகளை இயக்க பரிந்துரை"
                : "Rule Trigger: Crowding > 100% necessitates Extra Bus Allocation & Headway Reduction"}
            </h3>

            <p className="font-sans text-xs text-[#6E6B65] max-w-2xl leading-relaxed">
              {isTamil
                ? "வழித்தடம் 29C-ல் 128% அதிக கூட்டம் நிலவுகிறது (கூடுதல் பேருந்துகள் தேவை). சமாந்திர வழித்தடம் 15B-ல் 42% மட்டுமே கூட்டம் உள்ளதால் (குறைந்த பேருந்துகள் போதும்), 2 கூடுதல் பேருந்துகளை 29C-க்கு இயக்கி நெரிசலைச் சமன் செய்கிறது."
                : "Route 29C exhibits critical passenger overcrowding (128% capacity, needs extra buses). Parallel corridor Route 15B has light demand (42% capacity, needs fewer buses). Optimization rule: deploy 2 extra buses to Route 29C while maintaining efficient low-frequency allocation on Route 15B."}
            </p>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            {optimizationApplied ? (
              <button
                onClick={revertOptimization}
                className="w-full sm:w-auto px-4 sm:px-5 py-2.5 font-mono text-[11px] sm:text-xs uppercase tracking-wider font-bold border border-[#0A0A0A] bg-[#FAF8F5] text-[#0A0A0A] hover:bg-[#E2DBD0] transition-colors"
              >
                Revert to Standard Schedule
              </button>
            ) : (
              <button
                onClick={applyOptimization}
                className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 font-mono text-[11px] sm:text-xs uppercase tracking-widest font-black border-2 border-[#0A0A0A] bg-[#0A0A0A] text-[#F6F3EC] hover:bg-[#333333] shadow-[3px_3px_0px_#6E6B65] sm:shadow-[4px_4px_0px_#6E6B65] transition-all flex items-center justify-center gap-2"
              >
                <span>⚡ EXECUTE AI RECOMMENDATION (+2 BUSES)</span>
              </button>
            )}
          </div>
        </div>

        {/* Before vs After Tabular Comparison Matrix */}
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-[#6E6B65] mb-2">
            BEFORE VS AFTER OPTIMIZATION TELEMETRY MATRIX:
          </div>

          <div className="overflow-x-auto no-scrollbar font-mono text-xs border border-[#0A0A0A]">
            <table className="w-full text-left min-w-[540px]">
              <thead className="bg-[#FAF8F5] border-b border-[#0A0A0A] text-[9px] sm:text-[10px] uppercase text-[#6E6B65]">
                <tr>
                  <th className="p-2.5 sm:p-3">Corridor Parameter</th>
                  <th className="p-2.5 sm:p-3">Baseline (Before)</th>
                  <th className="p-2.5 sm:p-3">Optimized (After Balancing)</th>
                  <th className="p-2.5 sm:p-3">Net System Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2DBD0] text-[11px] sm:text-xs">
                <tr>
                  <td className="p-2.5 sm:p-3 font-bold">Average Passenger Waiting Time</td>
                  <td className="p-2.5 sm:p-3 text-[#6E6B65]">14.2 min</td>
                  <td className="p-2.5 sm:p-3 font-bold text-[#0A0A0A]">6.8 min</td>
                  <td className="p-2.5 sm:p-3 font-bold text-[#16A34A]">↓ 52% Wait Reduction</td>
                </tr>
                <tr>
                  <td className="p-2.5 sm:p-3 font-bold">High Crowding Route (29C)</td>
                  <td className="p-2.5 sm:p-3 text-[#6E6B65]">128% (Needs Extra Buses)</td>
                  <td className="p-2.5 sm:p-3 font-bold text-[#0A0A0A]">84% (+2 Extra Relief Buses)</td>
                  <td className="p-2.5 sm:p-3 font-bold text-[#16A34A]">Crowding Reduced by 44%</td>
                </tr>
                <tr>
                  <td className="p-2.5 sm:p-3 font-bold">Low Crowding Route (15B)</td>
                  <td className="p-2.5 sm:p-3 text-[#6E6B65]">42% (Low Demand Corridor)</td>
                  <td className="p-2.5 sm:p-3 font-bold text-[#0A0A0A]">42% (Lean Fleet Maintained)</td>
                  <td className="p-2.5 sm:p-3 font-bold text-[#16A34A]">Zero Wasted / Empty Runs</td>
                </tr>
                <tr>
                  <td className="p-2.5 sm:p-3 font-bold">Service Headway Frequency</td>
                  <td className="p-2.5 sm:p-3 text-[#6E6B65]">Every 15 min (4 buses/hr)</td>
                  <td className="p-2.5 sm:p-3 font-bold text-[#0A0A0A]">Every 7.5 min (8 buses/hr)</td>
                  <td className="p-2.5 sm:p-3 font-bold">Capacity Doubled on Bottleneck</td>
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
            CORRIDOR TELEMETRY LEDGER • 3 PARALLEL SERVICES
          </span>
          <span className="font-mono text-[9px] sm:text-[10px] text-[#6E6B65]">
            PASSENGER LOAD & FLEET ALLOCATION
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#0A0A0A] border border-[#0A0A0A] font-mono text-xs">
          {routes.map(route => {
            const isFull = route.crowdingPercent > 100;
            const needsExtra = route.id === 'route-a';
            return (
              <div key={route.id} className="p-4 sm:p-5 space-y-2.5 sm:space-y-3 bg-[#FFFFFF]">
                <div className="flex items-center justify-between">
                  <span className="text-base font-black text-[#0A0A0A]">{route.code}</span>
                  <span className={`px-2 py-0.5 text-[9px] sm:text-[10px] font-bold border border-[#0A0A0A] ${
                    isFull ? 'bg-[#0A0A0A] text-[#F6F3EC]' : 'bg-[#FAF8F5] text-[#0A0A0A]'
                  }`}>
                    {route.crowdingPercent}% CROWD
                  </span>
                </div>

                <div className="font-sans text-xs text-[#6E6B65]">
                  {isTamil ? route.tamilName : route.name}
                </div>

                <div className="space-y-1 pt-2 border-t border-[#E2DBD0] text-[10px] sm:text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-[#6E6B65]">DEMAND:</span>
                    <span>{route.demandPerHour} pax/hr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6E6B65]">FLEET ALLOCATION:</span>
                    <span className="font-bold">{needsExtra ? (optimizationApplied ? '8 units (+2 Extra)' : '4 units (Needs Extra)') : '4-5 units (Low Capacity)'}</span>
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
              <span className="font-bold block text-[11px] sm:text-xs">HIGH DEMAND: ROUTE 29C (ANNA SALAI)</span>
              <p className="font-sans text-xs text-[#6E6B65] mt-1 leading-relaxed">
                Passenger crowding at 128%. Triggering AI dispatch automatically allocates 2 standby buses, dropping headway from 15 mins to 7.5 mins.
              </p>
            </div>
            <div className="border border-[#0A0A0A] p-2.5 sm:p-3 bg-[#FAF8F5]">
              <span className="font-bold block text-[11px] sm:text-xs">LOW DEMAND: ROUTE 15B (INNER RING RD)</span>
              <p className="font-sans text-xs text-[#6E6B65] mt-1 leading-relaxed">
                Passenger occupancy at 42%. Operates on lean fleet schedule to conserve fuel and prevent empty runs while preserving 5-minute passenger wait times.
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
              <span className="font-bold block text-[11px] sm:text-xs">BUS TN-01-N-4429 (ROUTE 29C)</span>
              <p className="font-sans text-xs text-[#6E6B65] leading-relaxed">
                Engine cooling system failure near T. Nagar Panagal Park. 84 passengers queued.
              </p>
              <div className="border-t border-[#E2DBD0] pt-2 text-[10px] sm:text-[11px] flex justify-between">
                <span>Relief Unit: <b>TN-01-N-8802 (ETA 5m)</b></span>
                <span>Mobile Crane Dispatched</span>
              </div>
            </div>
          ) : (
            <div className="border border-[#0A0A0A] p-6 text-center text-[#6E6B65] text-xs">
              Zero active maintenance tickets. All 15 revenue service vehicles operating normally.
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
