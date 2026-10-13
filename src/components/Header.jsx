import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTransit } from '../context/TransitContext';
import { TransitCrosshairSvg, RadarWaveSvg } from './CustomIcons';
import { checkSupabaseConnection } from '../lib/supabaseClient';
import { MessageSquare } from 'lucide-react';
import { scrollToChat } from '../lib/navigation';

export default function Header() {
  const { language, setLanguage, role, setRole, optimizationApplied } = useTransit();
  const [supabaseOnline, setSupabaseOnline] = useState(true);
  const isTamil = language === 'ta';

  useEffect(() => {
    checkSupabaseConnection().then(status => {
      setSupabaseOnline(status);
    });
  }, []);

  return (
    <header className="relative z-30 border-b border-[#0A0A0A] bg-[#F6F3EC]">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-10 lg:px-14">
        <div className="flex flex-col md:flex-row md:items-center justify-between py-3 sm:py-4 border-b border-[#E2DBD0] gap-3 sm:gap-4">
          
          {/* Brand Mark with Architectural Typography */}
          <div className="flex items-center gap-3 sm:gap-4">
            <TransitCrosshairSvg className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 text-[#0A0A0A]" />
            <div>
              <div className="flex items-baseline gap-2 sm:gap-3">
                <span className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-[#0A0A0A]">
                  TRANSIT<span className="font-bold text-[#6E6B65]">.IQ</span>
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase text-[#6E6B65] border border-[#0A0A0A] px-1 sm:px-1.5 py-0.5">
                  SYS.V2.6
                </span>
              </div>
              <p className="font-mono text-[10px] sm:text-[11px] text-[#6E6B65] uppercase tracking-wider mt-0.5">
                {isTamil ? "சென்னை பொதுப் போக்குவரத்து உகப்பாக்கம்" : "Corridor Telemetry & Route Optimization Engine"}
              </p>
            </div>
          </div>

          {/* Center Coordinates & Supabase DB Status */}
          <div className="hidden lg:flex items-center gap-5 font-mono text-[11px] text-[#0A0A0A]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#0A0A0A] rounded-full animate-ping"></span>
              <span className="font-semibold tracking-wider uppercase">13°04'N 80°14'E</span>
            </div>
            
            <div className="h-4 w-px bg-[#0A0A0A]/20"></div>

            {/* Supabase Connection Live Badge */}
            <div 
              className="flex items-center gap-1.5 border border-[#0A0A0A] px-2 py-0.5 bg-[#FFFFFF] shadow-[2px_2px_0px_#0A0A0A] cursor-help"
              title="Connected to Supabase DB: blnpwkcryalhyezmrmzp.supabase.co"
            >
              <span className={`w-2 h-2 rounded-full ${supabaseOnline ? 'bg-[#16A34A] animate-pulse' : 'bg-[#DC2626]'}`}></span>
              <span className="font-bold text-[10px] uppercase tracking-wider">
                SUPABASE: {supabaseOnline ? 'CONNECTED' : 'DISCONNECTED'}
              </span>
            </div>

            <span className="bg-[#0A0A0A] text-[#F6F3EC] px-2 py-0.5 text-[10px] uppercase font-mono tracking-widest flex items-center gap-1.5">
              <RadarWaveSvg className="w-3 h-3 text-[#F6F3EC]" />
              {optimizationApplied ? (isTamil ? "AI பேருந்து உகப்பாக்கம் (+2)" : "AI Fleet Optimized (+2)") : (isTamil ? "டைனமிக் வழித்தட சமநிலை" : "Dynamic Route Balancing")}
            </span>
          </div>

          {/* Right: Stark Segmented Controls */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-3 self-start md:self-auto">
            
            {/* Language Switcher */}
            <div className="flex items-center border border-[#0A0A0A] bg-[#F6F3EC] p-0.5">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-mono tracking-wider transition-all ${
                  language === 'en'
                    ? 'bg-[#0A0A0A] text-[#F6F3EC]'
                    : 'text-[#0A0A0A] hover:bg-[#E2DBD0]'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ta')}
                className={`px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-tamil tracking-wider transition-all ${
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
                className={`px-2.5 sm:px-3.5 py-1 text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all ${
                  role === 'passenger'
                    ? 'bg-[#0A0A0A] text-[#F6F3EC]'
                    : 'text-[#0A0A0A] hover:bg-[#E2DBD0]'
                }`}
              >
                {isTamil ? "பயணிகள்" : "Passenger"}
              </button>
              <button
                onClick={() => setRole('operator')}
                className={`px-2.5 sm:px-3.5 py-1 text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all ${
                  role === 'operator'
                    ? 'bg-[#0A0A0A] text-[#F6F3EC]'
                    : 'text-[#0A0A0A] hover:bg-[#E2DBD0]'
                }`}
              >
                {isTamil ? "இயக்குனர்" : "Operator"}
              </button>
            </div>

            {/* Chat Action Button / Popup trigger */}
            <button
              onClick={scrollToChat}
              className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1 sm:py-1.5 text-[11px] sm:text-xs font-mono uppercase tracking-wider font-bold border border-[#0A0A0A] bg-[#0A0A0A] text-[#F6F3EC] hover:bg-[#FFFFFF] hover:text-[#0A0A0A] transition-all shadow-[2px_2px_0px_#0A0A0A] cursor-pointer"
              title="Go to AI Assistant Chat"
            >
              <MessageSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>{isTamil ? "உரையாடல்" : "Chat"}</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
