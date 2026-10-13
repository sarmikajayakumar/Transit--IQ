import React from 'react';
import { motion } from 'framer-motion';
import { useTransit } from '../context/TransitContext';
import { TransitCrosshairSvg, RadarWaveSvg } from './CustomIcons';

export default function Header() {
  const { language, setLanguage, role, setRole, t, floodActive } = useTransit();
  const isTamil = language === 'ta';

  return (
    <header className="relative z-30 border-b border-[#0A0A0A] bg-[#F6F3EC]">
      <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14">
        <div className="flex flex-col md:flex-row md:items-center justify-between py-4 border-b border-[#E2DBD0] gap-4">
          
          {/* Brand Mark with Architectural Typography */}
          <div className="flex items-center gap-4">
            <TransitCrosshairSvg className="w-8 h-8 shrink-0 text-[#0A0A0A]" />
            <div>
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-[#0A0A0A]">
                  TRANSIT<span className="font-sans font-black">.IQ</span>
                </span>
                <span className="font-mono text-[10px] tracking-widest uppercase text-[#6E6B65] border border-[#0A0A0A] px-1.5 py-0.5">
                  SYS.V2.6
                </span>
              </div>
              <p className="font-mono text-[11px] text-[#6E6B65] uppercase tracking-wider mt-0.5">
                {isTamil ? "சென்னை பொதுப் போக்குவரத்து உகப்பாக்கம்" : "Corridor Telemetry & Route Optimization Engine"}
              </p>
            </div>
          </div>

          {/* Center Coordinates & Corridor Meta */}
          <div className="hidden lg:flex items-center gap-6 font-mono text-[11px] text-[#0A0A0A]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#0A0A0A] rounded-full animate-ping"></span>
              <span className="font-semibold tracking-wider uppercase">13°04'N 80°14'E</span>
            </div>
            <div className="h-4 w-px bg-[#0A0A0A]/20"></div>
            <span className="tracking-widest uppercase text-[#6E6B65]">
              {isTamil ? "மத்திய நிலையம் ↔ தாம்பரம் பாதை" : "Central ↔ Tambaram Corridor"}
            </span>
            {floodActive && (
              <span className="bg-[#0A0A0A] text-[#F6F3EC] px-2 py-0.5 text-[10px] uppercase font-mono tracking-widest flex items-center gap-1.5">
                <RadarWaveSvg className="w-3 h-3 text-[#F6F3EC]" />
                Monsoon Reroute Active
              </span>
            )}
          </div>

          {/* Right: Stark Segmented Controls */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            
            {/* Language Switcher */}
            <div className="flex items-center border border-[#0A0A0A] bg-[#F6F3EC] p-0.5">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-xs font-mono tracking-wider transition-all ${
                  language === 'en'
                    ? 'bg-[#0A0A0A] text-[#F6F3EC]'
                    : 'text-[#0A0A0A] hover:bg-[#E2DBD0]'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ta')}
                className={`px-3 py-1 text-xs font-tamil tracking-wider transition-all ${
                  language === 'ta'
                    ? 'bg-[#0A0A0A] text-[#F6F3EC]'
                    : 'text-[#0A0A0A] hover:bg-[#E2DBD0]'
                }`}
              >
                தமிழ்
              </button>
            </div>

            {/* Role Switcher */}
            <div className="flex items-center border border-[#0A0A0A] bg-[#F6F3EC] p-0.5">
              <button
                onClick={() => setRole('passenger')}
                className={`px-3.5 py-1 text-xs font-mono uppercase tracking-wider transition-all ${
                  role === 'passenger'
                    ? 'bg-[#0A0A0A] text-[#F6F3EC]'
                    : 'text-[#0A0A0A] hover:bg-[#E2DBD0]'
                }`}
              >
                {isTamil ? "பயணிகள்" : "Passenger"}
              </button>
              <button
                onClick={() => setRole('operator')}
                className={`px-3.5 py-1 text-xs font-mono uppercase tracking-wider transition-all ${
                  role === 'operator'
                    ? 'bg-[#0A0A0A] text-[#F6F3EC]'
                    : 'text-[#0A0A0A] hover:bg-[#E2DBD0]'
                }`}
              >
                {isTamil ? "இயக்குனர்" : "Operator"}
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
