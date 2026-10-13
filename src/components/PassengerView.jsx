import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTransit } from '../context/TransitContext';
import { TechnicalGearSvg, CorridorBranchSvg } from './CustomIcons';
import { ArrowRight, MapPin, Clock } from 'lucide-react';

export default function PassengerView() {
  const { routes, breakdownAlert, optimizationApplied, language } = useTransit();
  const isTamil = language === 'ta';
  
  const [origin, setOrigin] = useState("Chennai Central");
  const [destination, setDestination] = useState("Tambaram");
  const [selectedRouteId, setSelectedRouteId] = useState("route-b");

  const stopsList = [
    "Chennai Central",
    "Egmore / LIC",
    "T. Nagar / Panagal Park",
    "Koyambedu",
    "Guindy / Kathipara",
    "Velachery Junction",
    "Chennai Airport",
    "Chromepet",
    "Tambaram"
  ];

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
                
                <h4 className="font-serif text-base sm:text-lg font-bold text-[#0A0A0A] mt-1">
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
                  ? "வழித்தடம் 15B இன்னும் 2 நிமிடத்தில் வரும் (42% கூட்டம் மட்டுமே, காலியிடங்கள் உள்ளன)."
                  : "Hop on Route 15B arriving in 2 mins (only 42% crowd, plenty of empty seats)."}
              </p>
            </div>

          </div>
        </div>
      )}

      {/* 2. Journey Planner: Editorial Route Selector & Corridors Ledger */}
      <div className="border border-[#0A0A0A] bg-[#FFFFFF] p-4 sm:p-6 lg:p-8 shadow-[4px_4px_0px_#0A0A0A] sm:shadow-[6px_6px_0px_#0A0A0A]">
        
        <div className="border-b border-[#0A0A0A] pb-3 sm:pb-4 mb-5 sm:mb-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 sm:gap-2">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#0A0A0A]">
              Journey Planner & Route Evaluation
            </h3>
            <p className="font-mono text-[10px] sm:text-xs text-[#6E6B65] uppercase tracking-wider mt-0.5">
              Select origin and destination to compare live corridor crowding and headways
            </p>
          </div>
          <span className="font-mono text-[10px] sm:text-xs text-[#0A0A0A]">
            CORRIDOR: 01 (CENTRAL ↔ TAMBARAM)
          </span>
        </div>

        {/* Origin / Destination Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8 font-mono text-xs">
          <div>
            <label className="block text-[9px] sm:text-[10px] uppercase tracking-widest text-[#6E6B65] mb-1">
              [ORIGIN BOARDING STOP]
            </label>
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full bg-[#FAF8F5] text-[#0A0A0A] border border-[#0A0A0A] p-2 sm:p-2.5 focus:outline-none focus:bg-[#FFFFFF]"
            >
              {stopsList.map((st, i) => (
                <option key={i} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[9px] sm:text-[10px] uppercase tracking-widest text-[#6E6B65] mb-1">
              [DESTINATION TERMINUS]
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-[#FAF8F5] text-[#0A0A0A] border border-[#0A0A0A] p-2 sm:p-2.5 focus:outline-none focus:bg-[#FFFFFF]"
            >
              {stopsList.slice().reverse().map((st, i) => (
                <option key={i} value={st}>{st}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Route Comparison Ledger */}
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-[#6E6B65] mb-2">
            CORRIDOR COMPARISON LEDGER (SELECT ROUTE TO INSPECT):
          </div>

          <div className="border border-[#0A0A0A] divide-y divide-[#0A0A0A]">
            {routes.map((route) => {
              const isRecommended = route.id === 'route-b';
              const isOvercrowded = route.crowdingPercent > 100;
              const isSelected = selectedRouteId === route.id;

              return (
                <div
                  key={route.id}
                  onClick={() => setSelectedRouteId(route.id)}
                  className={`p-3.5 sm:p-5 cursor-pointer transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 ${
                    isSelected ? 'bg-[#FAF8F5]' : 'bg-[#FFFFFF] hover:bg-[#F6F3EC]/60'
                  }`}
                >
                  {/* Left Info */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                      <span className="font-mono text-sm sm:text-base font-black text-[#0A0A0A]">
                        {route.code}
                      </span>
                      <span className="font-serif text-sm sm:text-base text-[#0A0A0A]">
                        {isTamil ? route.tamilName : route.name}
                      </span>
                      {isRecommended && (
                        <span className="font-mono text-[8px] sm:text-[9px] uppercase px-1.5 py-0.5 bg-[#0A0A0A] text-[#F6F3EC]">
                          RECOMMENDED
                        </span>
                      )}
                    </div>
                    <p className="font-mono text-[11px] sm:text-xs text-[#6E6B65]">
                      {route.id === 'route-a'
                        ? "Anna Salai direct • High crowd corridor (needs +2 extra buses)"
                        : route.id === 'route-b'
                        ? "100ft Inner Ring Rd • 58% empty seats, fast moving express"
                        : "Velachery coastal bypass • Moderate passenger flow, steady transit"}
                    </p>
                  </div>

                  {/* Right Metrics Strip: 2x2 Grid on Mobile, Flex Row on Tablet/Desktop */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:flex items-center gap-2.5 sm:gap-6 font-mono text-[11px] sm:text-xs shrink-0 w-full md:w-auto pt-2.5 md:pt-0 border-t md:border-t-0 border-[#E2DBD0]">
                    <div>
                      <span className="text-[9px] sm:text-[10px] text-[#6E6B65] block uppercase">Crowding</span>
                      <span className={`font-bold ${isOvercrowded ? 'underline' : ''}`}>
                        {route.crowdingPercent}% {isOvercrowded ? '(HEAVY)' : isRecommended ? '(SEATS)' : '(MOD)'}
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
                  <td className="py-2.5 sm:py-3 font-bold">
                    {r.crowdingPercent}% {r.crowdingPercent > 100 ? '[FULL]' : '[COMFORTABLE]'}
                  </td>
                  <td className="py-2.5 sm:py-3 font-mono text-[10px] sm:text-[11px]">
                    {r.id === 'route-a' ? (optimizationApplied ? '+2 Relief Buses Active' : 'Extra Buses Needed') : r.id === 'route-b' ? 'Seats Guaranteed' : 'Standard Headway'}
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
