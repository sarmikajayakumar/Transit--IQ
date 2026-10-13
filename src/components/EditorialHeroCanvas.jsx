import React from 'react';
import { motion } from 'framer-motion';
import { useTransit } from '../context/TransitContext';
import { CorridorBranchSvg, TransitCrosshairSvg, RadarWaveSvg, TechnicalGearSvg } from './CustomIcons';
import { MessageSquare } from 'lucide-react';
import { scrollToChat } from '../lib/navigation';

export default function EditorialHeroCanvas() {
  const {
    routes,
    language,
    peakSurgeActive,
    togglePeakSurge,
    breakdownAlert,
    toggleBreakdown,
    optimizationApplied,
    applyOptimization,
    revertOptimization,
    resetAll
  } = useTransit();

  const isTamil = language === 'ta';
  const maxCrowd = Math.max(...routes.map(r => r.crowdingPercent));
  const avgWait = (routes.reduce((acc, r) => acc + r.avgWaitMin, 0) / routes.length).toFixed(1);

  return (
    <section className="relative overflow-hidden border-b border-[#0A0A0A] bg-[#F6F3EC]">
      
      {/* =========================================================================
          LAYER 0: CANVAS UNDERBELLY (Lower Z-Index Background Elements)
          ========================================================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        {/* Massive Architectural Ghost Typography */}
        <div className="absolute -top-6 -left-10 text-[22vw] sm:text-[18vw] font-display font-black tracking-tighter text-[#0A0A0A]/[0.03] leading-none whitespace-nowrap">
          TRANSIT.IQ
        </div>
        <div className="absolute -bottom-10 right-0 text-[18vw] sm:text-[14vw] font-mono font-bold tracking-widest text-[#0A0A0A]/[0.025] leading-none whitespace-nowrap">
          13.0827°N 80.2707°E
        </div>

        {/* Architectural Hairline Grid Rules */}
        <div className="absolute inset-0 grid grid-cols-3 sm:grid-cols-6 pointer-events-none">
          <div className="border-r border-[#0A0A0A]/[0.04] h-full"></div>
          <div className="border-r border-[#0A0A0A]/[0.04] h-full"></div>
          <div className="border-r border-[#0A0A0A]/[0.04] h-full"></div>
          <div className="border-r border-[#0A0A0A]/[0.04] h-full hidden sm:block"></div>
          <div className="border-r border-[#0A0A0A]/[0.04] h-full hidden sm:block"></div>
          <div className="h-full hidden sm:block"></div>
        </div>

        {/* Ambient SVG Corridor Path in the Background */}
        <div className="absolute bottom-6 left-1/4 w-1/2 opacity-20">
          <CorridorBranchSvg className="w-full h-10" />
        </div>
      </div>

      {/* =========================================================================
          LAYER 10: FOREGROUND PRIMARY TYPOGRAPHY & ASYMMETRIC SPLIT-SCREEN
          ========================================================================= */}
      <div className="relative z-10 max-w-[1520px] mx-auto px-4 sm:px-10 lg:px-14 py-8 sm:py-10 lg:py-14">
        
        {/* Asymmetric Split Layout with generous negative space */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* LEFT COLUMN (7 of 12 cols = ~58% width): Editorial Statement & Tactical Controls */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            
            {/* Metadata Kicker */}
            <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-3">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <span className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase bg-[#0A0A0A] text-[#F6F3EC] px-1.5 sm:px-2 py-0.5 font-semibold">
                  SIMULATED DATA DEMO
                </span>
                <span className="h-px w-6 sm:w-8 bg-[#0A0A0A]/40 hidden sm:block"></span>
                <span className="font-mono text-[10px] sm:text-[11px] tracking-widest uppercase text-[#6E6B65]">
                  CORRIDOR 01 • CHENNAI CENTRAL ↔ TAMBARAM
                </span>
              </div>

              {/* Chat Popup Trigger Button */}
              <button
                onClick={scrollToChat}
                className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 px-2.5 sm:px-3 py-1 bg-[#FFFFFF] border border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#F6F3EC] transition-all cursor-pointer"
                title="Jump to Chat Area"
              >
                <MessageSquare className="w-3 h-3" />
                <span>{isTamil ? "உரையாடல்" : "Chat"} ↓</span>
              </button>
            </div>

            {/* Primary High-Contrast Typography */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#0A0A0A] font-bold leading-[1.15] sm:leading-[1.1] tracking-tight"
            >
              Public Transit <span className="font-light text-[#6E6B65]">Demand</span> & Route Optimization.
            </motion.h1>

            {/* Bilingual Subtitle */}
            <p className="text-xs sm:text-sm md:text-base text-[#6E6B65] max-w-2xl leading-relaxed">
              {isTamil ? (
                <span className="font-tamil">
                  அறிவார்ந்த வழித்தட தேர்வு மற்றும் நிகழ்நேர பேருந்து மேலாண்மை: அதிக நெரிசல் உள்ள பகுதிகளுக்கு கூடுதல் பேருந்துகளை அனுப்பி, கூட்டம் குறைந்த வழித்தடங்களில் பேருந்துகளைக் குறைத்து தேவையின் அடிப்படையில் சீராக இயக்குகிறது.
                </span>
              ) : (
                "Intelligent route optimization and dynamic fleet balancing: real-time telemetry detects high-congestion corridors to deploy extra buses where passenger demand surges, while scaling down bus allocation in less-crowded areas to eliminate idle capacity."
              )}
            </p>

            {/* Interactive Simulation Controls */}
            <div className="pt-1 sm:pt-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#6E6B65]">
                  Scenario Simulation Matrix:
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                
                {/* Peak Surge */}
                <button
                  onClick={togglePeakSurge}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 font-mono text-[11px] sm:text-xs uppercase tracking-wider border transition-all flex items-center gap-1.5 sm:gap-2 ${
                    peakSurgeActive
                      ? 'bg-[#0A0A0A] text-[#F6F3EC] border-[#0A0A0A]'
                      : 'bg-transparent text-[#0A0A0A] border-[#0A0A0A] hover:bg-[#E2DBD0]'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${peakSurgeActive ? 'bg-[#F6F3EC]' : 'bg-[#0A0A0A]'}`}></span>
                  <span>{isTamil ? "உச்ச நெரிசல்" : "Peak Surge"}: {peakSurgeActive ? "ON" : "OFF"}</span>
                </button>

                {/* Breakdown Toggle */}
                <button
                  onClick={toggleBreakdown}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 font-mono text-[11px] sm:text-xs uppercase tracking-wider border transition-all flex items-center gap-1.5 sm:gap-2 ${
                    breakdownAlert.active
                      ? 'bg-[#0A0A0A] text-[#F6F3EC] border-[#0A0A0A]'
                      : 'bg-transparent text-[#0A0A0A] border-[#0A0A0A] hover:bg-[#E2DBD0]'
                  }`}
                >
                  <TechnicalGearSvg className={`w-3 sm:w-3.5 h-3 sm:h-3.5 ${breakdownAlert.active ? 'invert' : ''}`} />
                  <span>{isTamil ? "பேருந்து பழுது" : "Breakdown Alert"}: {breakdownAlert.active ? "ACTIVE" : "RESOLVED"}</span>
                </button>

                {/* Optimization Trigger */}
                <button
                  onClick={optimizationApplied ? revertOptimization : applyOptimization}
                  className={`px-3 sm:px-3.5 py-1 sm:py-1.5 font-mono text-[11px] sm:text-xs uppercase tracking-wider font-semibold border transition-all flex items-center gap-1.5 sm:gap-2 ${
                    optimizationApplied
                      ? 'bg-[#0A0A0A] text-[#F6F3EC] border-[#0A0A0A]'
                      : 'bg-[#F6F3EC] text-[#0A0A0A] border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#F6F3EC]'
                  }`}
                >
                  <span>⚡ {optimizationApplied ? (isTamil ? "மேம்படுத்தப்பட்டது (+2)" : "AI Optimized (+2 Buses)") : (isTamil ? "AI மேம்பாடு இயக்கு" : "Apply AI Fleet Dispatch")}</span>
                </button>

                {/* Reset */}
                <button
                  onClick={resetAll}
                  className="px-2 sm:px-2.5 py-1 sm:py-1.5 font-mono text-[11px] sm:text-xs border border-[#0A0A0A]/40 text-[#6E6B65] hover:text-[#0A0A0A] hover:border-[#0A0A0A] transition-colors"
                  title="Reset simulation parameters"
                >
                  RESET
                </button>

                {/* Jump to Chat */}
                <button
                  onClick={scrollToChat}
                  className="px-3 sm:px-3.5 py-1 sm:py-1.5 font-mono text-[11px] sm:text-xs uppercase tracking-wider font-bold border border-[#0A0A0A] bg-[#0A0A0A] text-[#F6F3EC] hover:bg-[#FFFFFF] hover:text-[#0A0A0A] transition-all flex items-center gap-1.5 shadow-[2px_2px_0px_#0A0A0A] cursor-pointer"
                  title="Scroll to Chat Area"
                >
                  <MessageSquare className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                  <span>Chat ↓</span>
                </button>

              </div>
            </div>

          </div>

          {/* RIGHT COLUMN (5 of 12 cols = ~42% width): Stark High-Contrast Telemetry Ledger */}
          <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#0A0A0A] p-4 sm:p-6 lg:p-7 shadow-[4px_4px_0px_#0A0A0A] sm:shadow-[6px_6px_0px_#0A0A0A]">
            
            <div className="flex items-center justify-between border-b border-[#0A0A0A] pb-2.5 sm:pb-3 mb-4 sm:mb-5">
              <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest font-bold text-[#0A0A0A]">
                CORRIDOR TELEMETRY SHEET
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] text-[#6E6B65]">
                LIVE REFRESH: 15s
              </span>
            </div>

            {/* High-contrast metrics rows */}
            <div className="space-y-3 sm:space-y-4 font-mono">
              
              <div className="flex items-baseline justify-between border-b border-[#E2DBD0] pb-2">
                <span className="text-[11px] sm:text-xs text-[#6E6B65] uppercase">Corridor Demand</span>
                <span className="text-base sm:text-lg font-bold text-[#0A0A0A]">
                  880 <span className="text-[10px] sm:text-xs font-normal text-[#6E6B65]">pax/hr</span>
                </span>
              </div>

              <div className="flex items-baseline justify-between border-b border-[#E2DBD0] pb-2">
                <span className="text-[11px] sm:text-xs text-[#6E6B65] uppercase">Average Waiting Time</span>
                <div className="text-right">
                  <span className="text-lg sm:text-xl font-black text-[#0A0A0A]">
                    {avgWait} min
                  </span>
                  {optimizationApplied && (
                    <span className="block text-[9px] sm:text-[10px] text-[#6E6B65]">
                      (↓ 52% reduction applied)
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-baseline justify-between border-b border-[#E2DBD0] pb-2">
                <span className="text-[11px] sm:text-xs text-[#6E6B65] uppercase">Peak Crowding %</span>
                <div className="text-right">
                  <span className="text-lg sm:text-xl font-black text-[#0A0A0A]">
                    {maxCrowd}%
                  </span>
                  <span className="block text-[9px] sm:text-[10px] text-[#6E6B65]">
                    {maxCrowd > 100 ? "[CRITICAL OVERCROWDING]" : "[WITHIN CAPACITY]"}
                  </span>
                </div>
              </div>

              <div className="flex items-baseline justify-between border-b border-[#E2DBD0] pb-2">
                <span className="text-[11px] sm:text-xs text-[#6E6B65] uppercase">Active Fleet Units</span>
                <span className="text-base sm:text-lg font-bold text-[#0A0A0A]">
                  {optimizationApplied ? "17 Buses (+2 Extra)" : "15 Buses Scheduled"}
                </span>
              </div>

              <div className="flex items-baseline justify-between pt-1">
                <span className="text-[11px] sm:text-xs text-[#6E6B65] uppercase">Corridor Fleet Status</span>
                <span className="text-[11px] sm:text-xs font-bold text-[#0A0A0A] uppercase">
                  {breakdownAlert.active ? "Panagal Park (Relief En Route)" : "All Routes Flowing"}
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
