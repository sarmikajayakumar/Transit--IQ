import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TransitProvider, useTransit } from './context/TransitContext';
import Header from './components/Header';
import EditorialHeroCanvas from './components/EditorialHeroCanvas';
import TransitMap from './components/TransitMap';
import PassengerView from './components/PassengerView';
import OperatorDashboard from './components/OperatorDashboard';
import Chatbot from './components/Chatbot';
import { MessageSquare } from 'lucide-react';
import { scrollToChat } from './lib/navigation';

function DashboardContent() {
  const { role, language } = useTransit();
  const isTamil = language === 'ta';
  const [chatDirection, setChatDirection] = useState('down');

  useEffect(() => {
    const handleScroll = () => {
      const chatEl = document.getElementById('chat-area');
      if (!chatEl) return;
      const rect = chatEl.getBoundingClientRect();
      const chatCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      
      // If chat center is below viewport center, user is above chatbot -> show down arrow (↓)
      // If chat center is above viewport center, user is below chatbot -> show up arrow (↑)
      if (chatCenter > viewportCenter) {
        setChatDirection('down');
      } else {
        setChatDirection('up');
      }
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

          {/* Right Column: AI Copilot Hub - Sticky ONLY on desktop, static on mobile without awkward jumping */}
          <div id="chat-area" className="lg:col-span-5 xl:col-span-5 lg:sticky lg:top-6 scroll-mt-6">
            <Chatbot />
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

        {/* Floating Quick Action Popup Pill with Dynamic Directional Arrow */}
        <motion.button
          onClick={scrollToChat}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-[#0A0A0A] text-[#F6F3EC] border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#6E6B65] sm:shadow-[4px_4px_0px_#6E6B65] font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-[#FFFFFF] hover:text-[#0A0A0A] transition-colors"
          title={chatDirection === 'down' ? "Scroll down to AI Assistant" : "Scroll up to AI Assistant"}
        >
          <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Chat (AI Assistant) {chatDirection === 'down' ? '↓' : '↑'}</span>
        </motion.button>

      </main>

      {/* 4. Editorial Archival Footer */}
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
