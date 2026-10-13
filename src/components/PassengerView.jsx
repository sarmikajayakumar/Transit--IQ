import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTransit } from '../context/TransitContext';
import { TechnicalGearSvg, FloodIsobarSvg } from './CustomIcons';
import { ArrowRight, MapPin, Clock } from 'lucide-react';

export default function PassengerView() {
  const { routes, floodActive, breakdownAlert, language } = useTransit();
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
    "Velachery Lake Road",
    "Chennai Airport",
    "Chromepet",
    "Tambaram"
  ];

  return (
    <div className="space-y-8">
      
      {/* 1. Prior Breakdown Warning Banner (High contrast editorial alert) */}
      {breakdownAlert.active && (
        <div className="border-2 border-[#0A0A0A] bg-[#FFFFFF] p-5 shadow-[6px_6px_0px_#0A0A0A]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 border border-[#0A0A0A] bg-[#0A0A0A] text-[#F6F3EC] flex items-center justify-center shrink-0">
                <TechnicalGearSvg className="w-5 h-5 invert" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-[10px] tracking-widest uppercase bg-[#0A0A0A] text-[#F6F3EC] px-2 py-0.5 font-bold">
                    PRIOR NOTICE • MECHANICAL BREAKDOWN
                  </span>
                  <span className="font-mono text-xs text-[#0A0A0A] font-bold">
                    BUS #{breakdownAlert.busId} (ROUTE {breakdownAlert.routeCode})
                  </span>
                </div>
                
                <h4 className="font-serif text-lg font-bold text-[#0A0A0A] mt-1">
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
            <div className="bg-[#FAF8F5] border border-[#0A0A0A] p-3 shrink-0 md:max-w-xs font-mono text-xs">
              <span className="font-bold uppercase tracking-wider block text-[10px] text-[#0A0A0A]">
                RECOMMENDED ACTION:
              </span>
              <p className="mt-1 text-[#0A0A0A]">
                {isTamil
                  ? "வழித்தடம் 15B இன்னும் 2 நிமிடத்தில் வரும் (42% கூட்டம் மட்டுமே)."
                  : "Hop on Route 15B arriving in 2 mins (only 42% crowd, plenty of seats)."}
              </p>
            </div>

          </div>
        </div>
      )}

      {/* 2. Flood & Roadblock Hazard Advisory */}
      {floodActive && (
        <div className="border border-[#0A0A0A] bg-[#FAF8F5] p-4 flex items-start gap-4">
          <FloodIsobarSvg className="w-6 h-6 shrink-0 mt-0.5" />
          <div className="flex-1 font-mono text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold uppercase tracking-wider text-[#0A0A0A]">
                MONSOON INUNDATION DETOUR ADVISORY:
              </span>
              <span className="text-[#6E6B65]">
                KATHIPARA & GUINDY UNDERPASS (1.5 FT WATER)
              </span>
            </div>
            <p className="font-sans text-xs text-[#0A0A0A] mt-1">
              {isTamil
                ? "வழித்தடம் 29C அண்ணா சாலை நேரடிப் பாதை மூடப்பட்டு 100 அடி உள்வட்டச் சாலை வழியே இயக்கப்படுகிறது (+7 நிமி). குறைந்த நெரிசலில் செல்ல வழித்தடம் 15B சிறந்தது."
                : "Route 29C buses detoured via 100ft Inner Ring Road (+7 min delay). Route 15B runs smoothly on elevated corridors free of waterlogging."}
            </p>
          </div>
        </div>
      )}

      {/* 3. Journey Planner: Editorial Route Selector & Corridors Ledger */}
      <div className="border border-[#0A0A0A] bg-[#FFFFFF] p-6 lg:p-8 shadow-[6px_6px_0px_#0A0A0A]">
        
        <div className="border-b border-[#0A0A0A] pb-4 mb-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h3 className="font-serif text-2xl text-[#0A0A0A]">
              Journey Planner & Route Evaluation
            </h3>
            <p className="font-mono text-xs text-[#6E6B65] uppercase tracking-wider mt-0.5">
              Select origin and destination to compare live corridor crowding and headways
            </p>
          </div>
          <span className="font-mono text-xs text-[#0A0A0A]">
            CORRIDOR: 01 (CENTRAL ↔ TAMBARAM)
          </span>
        </div>

        {/* Origin / Destination Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 font-mono text-xs">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#6E6B65] mb-1">
              [ORIGIN BOARDING STOP]
            </label>
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full bg-[#FAF8F5] text-[#0A0A0A] border border-[#0A0A0A] p-2.5 focus:outline-none focus:bg-[#FFFFFF]"
            >
              {stopsList.map((st, i) => (
                <option key={i} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#6E6B65] mb-1">
              [DESTINATION TERMINUS]
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-[#FAF8F5] text-[#0A0A0A] border border-[#0A0A0A] p-2.5 focus:outline-none focus:bg-[#FFFFFF]"
            >
              {stopsList.slice().reverse().map((st, i) => (
                <option key={i} value={st}>{st}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Route Comparison Ledger (Editorial Ledger table instead of generic 3-card grid) */}
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
                  className={`p-4 sm:p-5 cursor-pointer transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    isSelected ? 'bg-[#FAF8F5]' : 'bg-[#FFFFFF] hover:bg-[#F6F3EC]/60'
                  }`}
                >
                  {/* Left Info */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-base font-black text-[#0A0A0A]">
                        {route.code}
                      </span>
                      <span className="font-serif text-base text-[#0A0A0A]">
                        {isTamil ? route.tamilName : route.name}
                      </span>
                      {isRecommended && (
                        <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 bg-[#0A0A0A] text-[#F6F3EC]">
                          RECOMMENDED
                        </span>
                      )}
                    </div>
                    <p className="font-mono text-xs text-[#6E6B65]">
                      {route.id === 'route-a'
                        ? "Anna Salai direct • Detoured around Kathipara underpass (+7m)"
                        : route.id === 'route-b'
                        ? "100ft Inner Ring Rd • 58% empty seats, no waterlogging"
                        : "Velachery coastal bypass • Single lane crawl near lake road"}
                    </p>
                  </div>

                  {/* Right Metrics Strip */}
                  <div className="flex items-center gap-6 font-mono text-xs shrink-0">
                    <div>
                      <span className="text-[10px] text-[#6E6B65] block uppercase">Crowding</span>
                      <span className={`font-bold ${isOvercrowded ? 'underline' : ''}`}>
                        {route.crowdingPercent}% {isOvercrowded ? '(FULL)' : isRecommended ? '(SEATS)' : '(MODERATE)'}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-[#6E6B65] block uppercase">Est. Wait</span>
                      <span className="font-bold">{route.avgWaitMin} min</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-[#6E6B65] block uppercase">Transit Time</span>
                      <span className="font-bold">
                        {route.travelTimeMin + (route.hasFlood && floodActive ? route.detourTimeMin : 0)} min
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-[#6E6B65] block uppercase">Fare</span>
                      <span className="font-bold">{route.fare}</span>
                    </div>

                    <div className="w-5 text-right font-mono">
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
      <div className="border border-[#0A0A0A] bg-[#FFFFFF] p-6 shadow-[6px_6px_0px_#0A0A0A]">
        <div className="border-b border-[#0A0A0A] pb-3 mb-4 flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-widest font-bold text-[#0A0A0A]">
            UPCOMING DEPARTURE TIMETABLE • SLOT 08:30 AM
          </span>
          <span className="font-mono text-[10px] text-[#6E6B65]">
            FREQUENCY: EVERY 7.5 - 15 MINS
          </span>
        </div>

        <div className="overflow-x-auto font-mono text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#0A0A0A] text-[#6E6B65] uppercase text-[10px]">
                <th className="pb-2">Route</th>
                <th className="pb-2">Path</th>
                <th className="pb-2">Next Departure</th>
                <th className="pb-2">Headway</th>
                <th className="pb-2">Crowd Density</th>
                <th className="pb-2">Weather Condition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2DBD0]">
              {routes.map(r => (
                <tr key={r.id} className="hover:bg-[#FAF8F5]">
                  <td className="py-3 font-bold">{r.code}</td>
                  <td className="py-3 font-sans text-xs">{isTamil ? r.tamilName : r.name}</td>
                  <td className="py-3">
                    {r.id === 'route-b' ? 'In 2 min (08:32)' : r.id === 'route-c' ? 'In 6 min (08:36)' : 'In 12 min (08:42)'}
                  </td>
                  <td className="py-3">Every {r.headwayMin}m</td>
                  <td className="py-3 font-bold">
                    {r.crowdingPercent}% {r.crowdingPercent > 100 ? '[FULL]' : '[COMFORTABLE]'}
                  </td>
                  <td className="py-3">
                    {r.hasFlood && floodActive ? 'Detoured' : 'Clear'}
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
