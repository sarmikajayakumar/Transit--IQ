import React from 'react';
import { motion } from 'framer-motion';
import { useTransit } from '../context/TransitContext';
import { CorridorBranchSvg, TransitCrosshairSvg, RadarWaveSvg, TechnicalGearSvg, FloodIsobarSvg } from './CustomIcons';
import { MessageSquare } from 'lucide-react';
import { scrollToChat } from '../lib/navigation';

export default function EditorialHeroCanvas() {
  const {
    routes,
    language,
    floodActive,
    toggleFlood,
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
        <div className="absolute -top-6 -left-10 text-[18vw] font-serif font-black tracking-tighter text-[#0A0A0A]/[0.03] leading-none whitespace-nowrap">
          TRANSIT.IQ
        </div>
        <div className="absolute -bottom-10 right-0 text-[14vw] font-mono font-bold tracking-widest text-[#0A0A0A]/[0.025] leading-none whitespace-nowrap">
          13.0827°N 80.2707°E
        </div>

        {/* Architectural Hairline Grid Rules */}
        <div className="absolute inset-0 grid grid-cols-6 pointer-events-none">
          <div className="border-r border-[#0A0A0A]/[0.04] h-full"></div>
          <div className="border-r border-[#0A0A0A]/[0.04] h-full"></div>
          <div className="border-r border-[#0A0A0A]/[0.04] h-full"></div>
          <div className="border-r border-[#0A0A0A]/[0.04] h-full"></div>
          <div className="border-r border-[#0A0A0A]/[0.04] h-full"></div>
          <div className="h-full"></div>
        </div>

        {/* Ambient SVG Corridor Path in the Background */}
        <div className="absolute bottom-6 left-1/4 w-1/2 opacity-20">
          <CorridorBranchSvg className="w-full h-10" />
        </div>
      </div>

      {/* =========================================================================
          LAYER 10: FOREGROUND PRIMARY TYPOGRAPHY & ASYMMETRIC SPLIT-SCREEN
          ========================================================================= */}
      <div className="relative z-10 max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 py-10 lg:py-14">
        
        {/* Asymmetric Split Layout (58% / 42%) with generous negative space */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* LEFT COLUMN (7 of 12 cols = ~58% width): Editorial Statement & Tactical Controls */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Metadata Kicker */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] tracking-widest uppercase bg-[#0A0A0A] text-[#F6F3EC] px-2 py-0.5 font-semibold">
                  SIMULATED DATA DEMO
                </span>
                <span className="h-px w-8 bg-[#0A0A0A]/40"></span>
                <span className="font-mono text-[11px] tracking-widest uppercase text-[#6E6B65]">
                  CORRIDOR 01 • CHENNAI CENTRAL ↔ TAMBARAM
                </span>
              </div>

              {/* Chat Popup Trigger Button */}
              <button
                onClick={scrollToChat}
                className="font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 px-3 py-1 bg-[#FFFFFF] border border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#F6F3EC] transition-all cursor-pointer"
                title="Jump to Chat Area"
              >
                <MessageSquare className="w-3 h-3" />
                <span>{isTamil ? "உரையாடல் பகுதி" : "Chat"} ↓</span>
              </button>
            </div>

            {/* Primary High-Contrast Typography */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#0A0A0A] font-normal leading-[1.08] tracking-tight"
            >
              Public Transit <span className="italic font-light">Demand</span> & Route Optimization.
            </motion.h1>

            {/* Bilingual Subtitle */}
            <p className="text-sm sm:text-base text-[#6E6B65] max-w-2xl leading-relaxed">
              {isTamil ? (
                <span className="font-tamil">
                  நெரிசலான நேரங்களில் பயணிகள் தேவையை முன்கூட்டியே கணித்து, மாற்றுப்பாதைகள் மற்றும் கூடுதல் பேருந்துகளை நிகழ்நேரத்தில் இயக்கும் செயற்கை நுண்ணறிவு தளம்.
                </span>
              ) : (
                "Continuous telemetry detecting corridor overcrowding, waterlogged flood detours, and mechanical failures — dynamically balancing passenger capacity with zero guesswork."
              )}
            </p>

            {/* Interactive Simulation Controls (Not generic cards, stark technical switches) */}
            <div className="pt-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#6E6B65]">
                  Scenario Simulation Matrix:
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                
                {/* Peak Surge */}
                <button
                  onClick={togglePeakSurge}
                  className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider border transition-all flex items-center gap-2 ${
                    peakSurgeActive
                      ? 'bg-[#0A0A0A] text-[#F6F3EC] border-[#0A0A0A]'
                      : 'bg-transparent text-[#0A0A0A] border-[#0A0A0A] hover:bg-[#E2DBD0]'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${peakSurgeActive ? 'bg-[#F6F3EC]' : 'bg-[#0A0A0A]'}`}></span>
                  <span>{isTamil ? "உச்ச நெரிசல்" : "Peak Surge"}: {peakSurgeActive ? "ON" : "OFF"}</span>
                </button>

                {/* Flood Detour */}
                <button
                  onClick={toggleFlood}
                  className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider border transition-all flex items-center gap-2 ${
                    floodActive
                      ? 'bg-[#0A0A0A] text-[#F6F3EC] border-[#0A0A0A]'
                      : 'bg-transparent text-[#0A0A0A] border-[#0A0A0A] hover:bg-[#E2DBD0]'
                  }`}
                >
                  <FloodIsobarSvg className={`w-3.5 h-3.5 ${floodActive ? 'invert' : ''}`} />
                  <span>{isTamil ? "வெள்ள அபாயம்" : "Monsoon Flood"}: {floodActive ? "ACTIVE" : "CLEAR"}</span>
                </button>

                {/* Breakdown Toggle */}
                <button
                  onClick={toggleBreakdown}
                  className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider border transition-all flex items-center gap-2 ${
                    breakdownAlert.active
                      ? 'bg-[#0A0A0A] text-[#F6F3EC] border-[#0A0A0A]'
                      : 'bg-transparent text-[#0A0A0A] border-[#0A0A0A] hover:bg-[#E2DBD0]'
                  }`}
                >
                  <TechnicalGearSvg className={`w-3.5 h-3.5 ${breakdownAlert.active ? 'invert' : ''}`} />
                  <span>{isTamil ? "பேருந்து பழுது" : "Breakdown Alert"}: {breakdownAlert.active ? "ACTIVE" : "RESOLVED"}</span>
                </button>

                {/* Optimization Trigger */}
                <button
                  onClick={optimizationApplied ? revertOptimization : applyOptimization}
                  className={`px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider font-semibold border transition-all flex items-center gap-2 ${
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
                  className="px-2.5 py-1.5 font-mono text-xs border border-[#0A0A0A]/40 text-[#6E6B65] hover:text-[#0A0A0A] hover:border-[#0A0A0A] transition-colors"
                  title="Reset simulation parameters"
                >
                  RESET
                </button>

                {/* Jump to Chat */}
                <button
                  onClick={scrollToChat}
                  className="px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider font-bold border border-[#0A0A0A] bg-[#0A0A0A] text-[#F6F3EC] hover:bg-[#FFFFFF] hover:text-[#0A0A0A] transition-all flex items-center gap-1.5 shadow-[2px_2px_0px_#0A0A0A] cursor-pointer"
                  title="Scroll to Chat Area"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat ↓</span>
                </button>

              </div>
            </div>

          </div>

          {/* RIGHT COLUMN (5 of 12 cols = ~42% width): Stark High-Contrast Telemetry Ledger */}
          <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#0A0A0A] p-6 lg:p-7 shadow-[6px_6px_0px_#0A0A0A]">
            
            <div className="flex items-center justify-between border-b border-[#0A0A0A] pb-3 mb-5">
              <span className="font-mono text-xs uppercase tracking-widest font-bold text-[#0A0A0A]">
                CORRIDOR TELEMETRY SHEET
              </span>
              <span className="font-mono text-[10px] text-[#6E6B65]">
                LIVE REFRESH: 15s
              </span>
            </div>

            {/* High-contrast metrics rows (No generic cards, architectural tabular layout) */}
            <div className="space-y-4 font-mono">
              
              <div className="flex items-baseline justify-between border-b border-[#E2DBD0] pb-2">
                <span className="text-xs text-[#6E6B65] uppercase">Corridor Demand</span>
                <span className="text-lg font-bold text-[#0A0A0A]">
                  880 <span className="text-xs font-normal text-[#6E6B65]">pax/hr</span>
                </span>
              </div>

              <div className="flex items-baseline justify-between border-b border-[#E2DBD0] pb-2">
                <span className="text-xs text-[#6E6B65] uppercase">Average Waiting Time</span>
                <div className="text-right">
                  <span className={`text-xl font-black ${optimizationApplied ? 'text-[#0A0A0A]' : 'text-[#0A0A0A]'}`}>
                    {avgWait} min
                  </span>
                  {optimizationApplied && (
                    <span className="block text-[10px] text-[#6E6B65]">
                      (↓ 52% reduction applied)
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-baseline justify-between border-b border-[#E2DBD0] pb-2">
                <span className="text-xs text-[#6E6B65] uppercase">Peak Crowding %</span>
                <div className="text-right">
                  <span className={`text-xl font-black ${maxCrowd > 100 ? 'text-[#0A0A0A]' : 'text-[#0A0A0A]'}`}>
                    {maxCrowd}%
                  </span>
                  <span className="block text-[10px] text-[#6E6B65]">
                    {maxCrowd > 100 ? "[CRITICAL OVERCROWDING]" : "[WITHIN CAPACITY]"}
                  </span>
                </div>
              </div>

              <div className="flex items-baseline justify-between border-b border-[#E2DBD0] pb-2">
                <span className="text-xs text-[#6E6B65] uppercase">Active Fleet Units</span>
                <span className="text-lg font-bold text-[#0A0A0A]">
                  {optimizationApplied ? "17 Buses (2 Relief)" : "15 Buses Scheduled"}
                </span>
              </div>

              <div className="flex items-baseline justify-between pt-1">
                <span className="text-xs text-[#6E6B65] uppercase">Disruption Status</span>
                <span className="text-xs font-bold text-[#0A0A0A] uppercase">
                  {floodActive ? "Kathipara Flooded (1.5 ft)" : "All Corridors Clear"}
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
