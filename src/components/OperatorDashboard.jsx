import React from 'react';
import { motion } from 'framer-motion';
import { useTransit } from '../context/TransitContext';
import { HOURLY_DEMAND_CURVE } from '../data/transitData';
import { TechnicalGearSvg, FloodIsobarSvg } from './CustomIcons';

export default function OperatorDashboard() {
  const {
    routes,
    floodActive,
    breakdownAlert,
    optimizationApplied,
    applyOptimization,
    revertOptimization,
    toggleFlood,
    toggleBreakdown,
    language
  } = useTransit();

  const isTamil = language === 'ta';

  return (
    <div className="space-y-8">
      
      {/* 1. AI Optimization Decision Engine (Stage 4 of Project Plan) */}
      <div className="border-2 border-[#0A0A0A] bg-[#FFFFFF] p-6 lg:p-8 shadow-[6px_6px_0px_#0A0A0A]">
        
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 border-b border-[#0A0A0A] pb-6 mb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] tracking-widest uppercase bg-[#0A0A0A] text-[#F6F3EC] px-2 py-0.5 font-bold">
                DETERMINISTIC RULE #R-104
              </span>
              <span className="font-mono text-xs text-[#6E6B65]">
                CORRIDOR CAPACITY BALANCING ALGORITHM
              </span>
            </div>
            
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#0A0A0A]">
              {isTamil
                ? "விதிமுறை: கூட்ட நெரிசல் > 100% எட்டியதால் +2 நிவாரண பேருந்துகளை இயக்க பரிந்துரை"
                : "Rule Trigger: Crowding > 100% necessitates Headway Reduction & Standby Deployment"}
            </h3>

            <p className="font-sans text-xs text-[#6E6B65] max-w-2xl">
              {isTamil
                ? "வழித்தடம் 29C-ல் 128% அதிக கூட்டம் நிலவுகிறது. சமாந்திர வழித்தடம் 15B-ல் 42% மட்டுமே கூட்டம் உள்ளதால், 2 கூடுதல் பேருந்துகளை 29C-க்கு இயக்கி பயணிகளைப் பிரிக்க கணக்கிடப்பட்டுள்ளது."
                : "Route 29C exhibits critical queue overflow (128% capacity). Parallel corridor Route 15B holds 58% surplus capacity. Optimization rule: inject 2 standby relief buses to cut wait times by 52%."}
            </p>
          </div>

          <div className="shrink-0">
            {optimizationApplied ? (
              <button
                onClick={revertOptimization}
                className="px-5 py-2.5 font-mono text-xs uppercase tracking-wider font-bold border border-[#0A0A0A] bg-[#FAF8F5] text-[#0A0A0A] hover:bg-[#E2DBD0] transition-colors"
              >
                Revert to Standard Schedule
              </button>
            ) : (
              <button
                onClick={applyOptimization}
                className="px-6 py-3 font-mono text-xs uppercase tracking-widest font-black border-2 border-[#0A0A0A] bg-[#0A0A0A] text-[#F6F3EC] hover:bg-[#333333] shadow-[4px_4px_0px_#6E6B65] transition-all flex items-center gap-2"
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

          <div className="overflow-x-auto font-mono text-xs border border-[#0A0A0A]">
            <table className="w-full text-left">
              <thead className="bg-[#FAF8F5] border-b border-[#0A0A0A] text-[10px] uppercase text-[#6E6B65]">
                <tr>
                  <th className="p-3">Corridor Parameter</th>
                  <th className="p-3">Baseline (Before)</th>
                  <th className="p-3">Optimized (After AI Dispatch)</th>
                  <th className="p-3">Net System Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2DBD0]">
                <tr>
                  <td className="p-3 font-bold">Average Passenger Waiting Time</td>
                  <td className="p-3 text-[#6E6B65]">14.2 min</td>
                  <td className="p-3 font-bold text-[#0A0A0A]">6.8 min</td>
                  <td className="p-3 font-bold text-[#16A34A]">↓ 52% Reduction</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Max Route Crowding (Route 29C)</td>
                  <td className="p-3 text-[#6E6B65]">128% (Missed Buses)</td>
                  <td className="p-3 font-bold text-[#0A0A0A]">84% (Within Seating Limit)</td>
                  <td className="p-3 font-bold text-[#16A34A]">Pass-by Queue Eliminated</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Service Headway Frequency</td>
                  <td className="p-3 text-[#6E6B65]">Every 15 min (4 buses/hr)</td>
                  <td className="p-3 font-bold text-[#0A0A0A]">Every 7.5 min (8 buses/hr)</td>
                  <td className="p-3 font-bold">Capacity Doubled</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Corridor Load Balancing</td>
                  <td className="p-3 text-[#6E6B65]">Single Corridor Bottleneck</td>
                  <td className="p-3 font-bold text-[#0A0A0A]">35% Diverted to Route 15B</td>
                  <td className="p-3 font-bold text-[#16A34A]">Optimal Network Load</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* 2. Three Routes Telemetry Ledger */}
      <div className="border border-[#0A0A0A] bg-[#FFFFFF] p-6 shadow-[6px_6px_0px_#0A0A0A]">
        <div className="border-b border-[#0A0A0A] pb-3 mb-4 flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-widest font-bold text-[#0A0A0A]">
            CORRIDOR TELEMETRY LEDGER • 3 PARALLEL SERVICES
          </span>
          <span className="font-mono text-[10px] text-[#6E6B65]">
            PASSENGER LOAD & VEHICLE METRICS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#0A0A0A] border border-[#0A0A0A] font-mono text-xs">
          {routes.map(route => {
            const isFull = route.crowdingPercent > 100;
            return (
              <div key={route.id} className="p-5 space-y-3 bg-[#FFFFFF]">
                <div className="flex items-center justify-between">
                  <span className="text-base font-black text-[#0A0A0A]">{route.code}</span>
                  <span className={`px-2 py-0.5 text-[10px] font-bold border border-[#0A0A0A] ${
                    isFull ? 'bg-[#0A0A0A] text-[#F6F3EC]' : 'bg-[#FAF8F5] text-[#0A0A0A]'
                  }`}>
                    {route.crowdingPercent}% CROWD
                  </span>
                </div>

                <div className="font-sans text-xs text-[#6E6B65]">
                  {isTamil ? route.tamilName : route.name}
                </div>

                <div className="space-y-1 pt-2 border-t border-[#E2DBD0] text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-[#6E6B65]">DEMAND:</span>
                    <span>{route.demandPerHour} pax/hr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6E6B65]">HEADWAY:</span>
                    <span>{route.headwayMin} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6E6B65]">AVG WAIT:</span>
                    <span className="font-bold">{route.avgWaitMin} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6E6B65]">FLEET FREQUENCY:</span>
                    <span>{route.busesPerHour} units/hr</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Disruption & Fleet Incident Command (Split) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
        
        {/* Flood Control */}
        <div className="border border-[#0A0A0A] bg-[#FFFFFF] p-6 shadow-[6px_6px_0px_#0A0A0A] space-y-4">
          <div className="flex items-center justify-between border-b border-[#0A0A0A] pb-3">
            <span className="font-bold uppercase tracking-wider text-[#0A0A0A]">
              MONSOON INUNDATION MANAGEMENT
            </span>
            <button
              onClick={toggleFlood}
              className={`px-2.5 py-1 text-[10px] border border-[#0A0A0A] uppercase tracking-wider ${
                floodActive ? 'bg-[#0A0A0A] text-[#F6F3EC]' : 'bg-[#FAF8F5] text-[#0A0A0A]'
              }`}
            >
              {floodActive ? "INUNDATION ACTIVE" : "ALL CLEAR"}
            </button>
          </div>

          <div className="space-y-3">
            <div className="border border-[#0A0A0A] p-3 bg-[#FAF8F5]">
              <span className="font-bold block">KATHIPARA JUNCTION & GUINDY UNDERPASS</span>
              <p className="font-sans text-xs text-[#6E6B65] mt-1">
                1.5 ft waterlogging. Anna Salai low-floor route closed. Traffic redirected to 100ft Inner Ring Road (+7 min delay).
              </p>
            </div>
            <div className="border border-[#0A0A0A] p-3 bg-[#FAF8F5]">
              <span className="font-bold block">VELACHERY LAKE ROAD / KAIVELI</span>
              <p className="font-sans text-xs text-[#6E6B65] mt-1">
                0.8 ft waterlogging. Single file traffic queue marshaled by transit police.
              </p>
            </div>
          </div>
        </div>

        {/* Breakdown Incident Control */}
        <div className="border border-[#0A0A0A] bg-[#FFFFFF] p-6 shadow-[6px_6px_0px_#0A0A0A] space-y-4">
          <div className="flex items-center justify-between border-b border-[#0A0A0A] pb-3">
            <span className="font-bold uppercase tracking-wider text-[#0A0A0A]">
              FLEET INCIDENT & RELIEF DISPATCH
            </span>
            <button
              onClick={toggleBreakdown}
              className={`px-2.5 py-1 text-[10px] border border-[#0A0A0A] uppercase tracking-wider ${
                breakdownAlert.active ? 'bg-[#0A0A0A] text-[#F6F3EC]' : 'bg-[#FAF8F5] text-[#0A0A0A]'
              }`}
            >
              {breakdownAlert.active ? "INCIDENT ACTIVE" : "FLEET 100% OPERATIONAL"}
            </button>
          </div>

          {breakdownAlert.active ? (
            <div className="border border-[#0A0A0A] p-4 bg-[#FAF8F5] space-y-2">
              <span className="font-bold block">BUS TN-01-N-4429 (ROUTE 29C)</span>
              <p className="font-sans text-xs text-[#6E6B65]">
                Engine cooling system failure near T. Nagar Panagal Park. 84 passengers queued.
              </p>
              <div className="border-t border-[#E2DBD0] pt-2 text-[11px] flex justify-between">
                <span>Relief Unit: <b>TN-01-N-8802 (ETA 5m)</b></span>
                <span>Mobile Crane Dispatched</span>
              </div>
            </div>
          ) : (
            <div className="border border-[#0A0A0A] p-6 text-center text-[#6E6B65]">
              Zero active maintenance tickets. All 15 revenue service vehicles operating normally.
            </div>
          )}
        </div>

      </div>

      {/* 4. 24-Hour Passenger Demand Curve (Architectural Histogram) */}
      <div className="border border-[#0A0A0A] bg-[#FFFFFF] p-6 shadow-[6px_6px_0px_#0A0A0A]">
        <div className="border-b border-[#0A0A0A] pb-3 mb-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest font-bold text-[#0A0A0A]">
              24-HOUR CORRIDOR DEMAND PROFILE • TWIN PEAK DISTRIBUTION
            </span>
            <p className="font-mono text-[10px] text-[#6E6B65] uppercase mt-0.5">
              Stage 2 Model: 15-minute interval demand simulation showing 8-10 AM & 5-8 PM surges
            </p>
          </div>
          <span className="font-mono text-xs text-[#0A0A0A]">
            PEAK CAPACITY: 460 PAX/HR
          </span>
        </div>

        {/* Stark Monochrome Histogram */}
        <div className="h-44 flex items-end gap-1 sm:gap-2 pt-6 pb-2 border-b border-[#0A0A0A]">
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
                <span className="font-mono text-[9px] text-[#6E6B65] mt-1 truncate">
                  {item.slot.split(':')[0]}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between font-mono text-[10px] text-[#6E6B65] uppercase pt-2">
          <span>05:00 AM (Early Run)</span>
          <span className="font-bold text-[#0A0A0A]">Morning Peak (08:00 - 10:00 AM)</span>
          <span>Midday (12:00 - 04:00 PM)</span>
          <span className="font-bold text-[#0A0A0A]">Evening Peak (05:00 - 08:00 PM)</span>
          <span>11:00 PM (Terminus)</span>
        </div>
      </div>

    </div>
  );
}
