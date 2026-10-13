import React from 'react';
import { useTransit } from '../context/TransitContext';
import { AlertCircle, CloudRain, Users, Wrench, RefreshCw, Zap } from 'lucide-react';

export default function SimulatedBanner() {
  const {
    t,
    language,
    floodActive,
    toggleFlood,
    peakSurgeActive,
    togglePeakSurge,
    breakdownAlert,
    toggleBreakdown,
    resetAll,
    optimizationApplied,
    applyOptimization,
    revertOptimization
  } = useTransit();

  return (
    <div className="bg-gradient-to-r from-amber-500/10 via-blue-500/10 to-teal-500/10 border-b border-amber-500/20 px-4 py-2 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        
        {/* Banner Label */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold tracking-wide uppercase text-[10px] border border-amber-500/30">
            <AlertCircle className="w-3 h-3" />
            {t.simulatedBanner}
          </span>
          <span className="text-slate-300 font-medium hidden sm:inline">
            {t.simulatedSub}
          </span>
        </div>

        {/* Live Simulation Playground Toggles */}
        <div className="flex items-center flex-wrap gap-1.5">
          <span className="text-[11px] text-slate-400 font-semibold mr-1">
            {t.simControls.title}:
          </span>

          {/* Peak surge toggle */}
          <button
            onClick={togglePeakSurge}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1 border ${
              peakSurgeActive
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/30 hover:bg-rose-500/30'
                : 'bg-transit-card text-slate-400 border-transit-border hover:text-white'
            }`}
            title="Toggle peak hour crowd surge (8:00 - 10:00 AM)"
          >
            <Users className="w-3 h-3" />
            {peakSurgeActive ? (language === 'ta' ? "உச்ச நெரிசல்: ஆன்" : "Peak Surge: ON") : (language === 'ta' ? "உச்ச நெரிசல்: ஆஃப்" : "Peak Surge: OFF")}
          </button>

          {/* Flood Inundation toggle */}
          <button
            onClick={toggleFlood}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1 border ${
              floodActive
                ? 'bg-sky-500/20 text-sky-300 border-sky-500/30 hover:bg-sky-500/30'
                : 'bg-transit-card text-slate-400 border-transit-border hover:text-white'
            }`}
            title="Toggle flood roadblocks on Kathipara & Guindy"
          >
            <CloudRain className="w-3 h-3" />
            {floodActive ? (language === 'ta' ? "வெள்ள அபாயம்: ஆன்" : "Monsoon Flood: ACTIVE") : (language === 'ta' ? "வெள்ளம்: இல்லை" : "Flood: CLEAR")}
          </button>

          {/* Bus Breakdown toggle */}
          <button
            onClick={toggleBreakdown}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1 border ${
              breakdownAlert.active
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/30 hover:bg-amber-500/30'
                : 'bg-transit-card text-slate-400 border-transit-border hover:text-white'
            }`}
            title="Simulate bus mechanical breakdown and relief dispatch"
          >
            <Wrench className="w-3 h-3" />
            {breakdownAlert.active ? (language === 'ta' ? "பழுது எச்சரிக்கை: ஆன்" : "Breakdown Alert: ON") : (language === 'ta' ? "பழுது: தீர்க்கப்பட்டது" : "Breakdown: RESOLVED")}
          </button>

          {/* Quick AI Optimize toggle */}
          <button
            onClick={optimizationApplied ? revertOptimization : applyOptimization}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all flex items-center gap-1 border shadow-sm ${
              optimizationApplied
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                : 'bg-blue-600 hover:bg-blue-500 text-white border-blue-500'
            }`}
          >
            <Zap className="w-3 h-3" />
            {optimizationApplied ? (language === 'ta' ? "AI மேம்பாடு அமலில் உள்ளது" : "AI Optimized (+2 Buses)") : (language === 'ta' ? "AI பரிந்துரையை இயக்கு" : "Apply AI Optimization")}
          </button>

          {/* Reset */}
          <button
            onClick={resetAll}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border border-transit-border"
            title={t.simControls.reset}
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        </div>

      </div>
    </div>
  );
}
