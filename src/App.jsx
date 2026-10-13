import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TransitProvider, useTransit } from './context/TransitContext';
import Header from './components/Header';
import EditorialHeroCanvas from './components/EditorialHeroCanvas';
import TransitMap from './components/TransitMap';
import PassengerView from './components/PassengerView';
import OperatorDashboard from './components/OperatorDashboard';
import CorridorTelemetrySheet from './components/CorridorTelemetrySheet';
import { MessageSquare, ArrowDown, ArrowUp } from 'lucide-react';
import { scrollToChat } from './lib/navigation';

function DashboardContent() {
  const { role, language } = useTransit();
  const isTamil = language === 'ta';
  const [isBelowChatbot, setIsBelowChatbot] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const chatEl = document.getElementById('chat-area');
      if (!chatEl) return;
      const rect = chatEl.getBoundingClientRect();
      // When the bottom of the chatbot is above 150px from viewport top,
      // the user is scrolled below the chatbot -> show ABOVE arrowmark (↑).
      // Otherwise, the user is above or currently viewing the chatbot -> show BELOW arrowmark (↓).
      setIsBelowChatbot(rect.bottom < 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F3EC] text-[#0A0A0A] flex flex-col font-sans selection:bg-[#0A0A0A] selection:text-[#F6F3EC] overflow-x-hidden">
      
      {/* 1. Master Editorial Header */}
      <Header />

      {/* 2. Asymmetric Split-Screen Hero Canvas (Layered with lower Z-index background) */}
      <EditorialHeroCanvas />

      {/* 3. Primary Working Canvas with Generous Negative Space (at least 35% open canvas) */}
      <main className="flex-1 max-w-[1520px] w-full mx-auto px-4 sm:px-8 lg:px-14 py-8 sm:py-12 lg:py-16 space-y-10 sm:space-y-14">
        
        {/* Section Label */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#0A0A0A] pb-3 gap-2">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest font-black text-[#0A0A0A]">
              SECTION 02 / TACTICAL OPERATIONS
            </span>
            <span className="h-3 w-px bg-[#0A0A0A] hidden sm:block"></span>
            <span className="font-mono text-[10px] sm:text-xs text-[#6E6B65] uppercase">
              {role === 'passenger' ? (isTamil ? "பயணிகள் பாதை பகுப்பாய்வு" : "COMMUTER TRANSIT ADVISORY") : (isTamil ? "டிப்போ கட்டுப்பாட்டு அறை" : "CORRIDOR DISPATCH ENGINE")}
            </span>
          </div>

          <div className="font-mono text-[10px] sm:text-xs text-[#6E6B65] uppercase">
            {role === 'passenger' ? "PASSENGER MODE ACTIVE" : "DEPOT OPERATOR MODE ACTIVE"}
          </div>
        </div>

        {/* Primary Asymmetric Split Canvas: Real Google Maps (60%) & AI Copilot Hub (40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          
          {/* Left Column (7 of 12 cols = ~58% width): Real Live Google Maps View */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between font-mono text-[11px] sm:text-xs flex-wrap gap-1">
              <span className="font-bold text-[#0A0A0A] uppercase tracking-wider">
                [TACTICAL MAP CANVAS — REAL GOOGLE MAPS]
              </span>
              <span className="text-[#6E6B65]">
                CORRIDOR 01 • LIVE TELEMETRY OVERLAY
              </span>
            </div>
            <TransitMap />
          </div>

          {/* Right Column: Corridor Telemetry Sheet (Swapped with AI Assistant) */}
          <div className="lg:col-span-5 xl:col-span-5 lg:sticky lg:top-6">
            <CorridorTelemetrySheet />
          </div>

        </div>

        {/* Section Label: Extended Ledger */}
        <div className="pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#0A0A0A] pb-3 mb-6 sm:mb-8 gap-2">
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest font-black text-[#0A0A0A]">
              SECTION 03 / {role === 'passenger' ? "COMMUTER ROUTE PLANNER & DEPARTURES" : "FLEET BALANCING ENGINE"}
            </span>
            <span className="font-mono text-[10px] sm:text-xs text-[#6E6B65] uppercase">
              ACTUARIAL SIMULATION DATA
            </span>
          </div>

          {/* Role-Based Operational Workflows with Generous Margins & Negative Space */}
          <AnimatePresence mode="wait">
            <motion.div
              key={role}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              {role === 'passenger' ? (
                <PassengerView />
              ) : (
                <OperatorDashboard />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* 4. Fixed Floating Popup named "Chat" */}
      <motion.button
        onClick={scrollToChat}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50 flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-[#0A0A0A] text-[#F6F3EC] border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#6E6B65] hover:shadow-[5px_5px_0px_#0A0A0A] font-mono text-xs sm:text-sm font-bold uppercase tracking-wider cursor-pointer hover:bg-[#FFFFFF] hover:text-[#0A0A0A] transition-all group"
        title={isBelowChatbot ? (isTamil ? "AI சேட்பாட் (மேலே செல்லவும்)" : "Chat (Scroll up to AI Chatbot)") : (isTamil ? "AI சேட்பாட் (கீழே செல்லவும்)" : "Chat (Scroll down to AI Chatbot)")}
        aria-label="Fixed Chat Popup"
      >
        <MessageSquare className="w-4 h-4 stroke-[2.2] group-hover:scale-110 transition-transform text-[#F6F3EC] group-hover:text-[#0A0A0A]" />
        <span className="font-bold tracking-wider">{isTamil ? "உரையாடல் (Chat)" : "Chat"}</span>
        <span className="flex items-center pl-1 border-l border-[#F6F3EC]/40 group-hover:border-[#0A0A0A]/40">
          {isBelowChatbot ? (
            <ArrowUp className="w-4 h-4 stroke-[2.8]" />
          ) : (
            <ArrowDown className="w-4 h-4 stroke-[2.8]" />
          )}
        </span>
      </motion.button>

      {/* 5. Editorial Archival Footer */}
      <footer className="border-t border-[#0A0A0A] bg-[#FFFFFF] py-6 sm:py-8 px-4 sm:px-10 lg:px-14 text-[11px] sm:text-xs font-mono text-[#6E6B65]">
        <div className="max-w-[1520px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center sm:justify-start">
            <span className="font-bold text-[#0A0A0A]">TRANSIT.IQ</span>
            <span>•</span>
            <span className="uppercase">Coimbatore Intelligent Public Transport Optimization</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-[#0A0A0A] font-bold">SIMULATED DEMO</span>
            <span>•</span>
            <span>Groq GenAI + Route Optimizer</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <TransitProvider>
      <DashboardContent />
    </TransitProvider>
  );
}
