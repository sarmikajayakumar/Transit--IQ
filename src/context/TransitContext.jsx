import React, { createContext, useContext, useState } from 'react';
import { INITIAL_ROUTES, LIVE_BUSES, ACTIVE_HAZARDS } from '../data/transitData';
import { translations } from '../translations/i18n';

const TransitContext = createContext();

export function TransitProvider({ children }) {
  const [language, setLanguage] = useState('en'); // 'en' | 'ta'
  const [role, setRole] = useState('passenger'); // 'passenger' | 'operator'
  
  const [routes, setRoutes] = useState(INITIAL_ROUTES);
  const [buses, setBuses] = useState(LIVE_BUSES);
  const [hazards, setHazards] = useState(ACTIVE_HAZARDS);
  
  const [peakSurgeActive, setPeakSurgeActive] = useState(true);
  const [optimizationApplied, setOptimizationApplied] = useState(false);
  
  const [breakdownAlert, setBreakdownAlert] = useState({
    active: true,
    busId: "TN-01-N-4429",
    routeCode: "29C",
    location: "Near T. Nagar Panagal Park",
    tamilLocation: "தி.நகர் பனகல் பார்க் அருகில்",
    issue: "Engine Cooling System Failure",
    tamilIssue: "இயந்திர குளிர்விப்பு அமைப்பு கோளாறு",
    reliefBus: "TN-01-N-8802 (Standby Express)",
    reliefETA: "5 min",
    tamilReliefETA: "5 நிமிடங்கள்",
    alternateRoutes: ["15B (Departs in 2m)", "70 Express (Departs in 4m)"],
    tamilAlternates: ["வழித்தடம் 15B (2 நிமிடத்தில் புறப்படும்)", "வழித்தடம் 70 (4 நிமிடத்தில் புறப்படும்)"],
    passengersAffected: 84
  });

  const t = translations[language] || translations.en;

  // Function to apply AI optimization recommendation:
  // Dynamically reallocates fleet: adds +2 buses to crowded Route 29C to reduce wait times,
  // while keeping less-crowded Route 15B balanced without wasteful empty runs.
  const applyOptimization = () => {
    setOptimizationApplied(true);
    setRoutes(prev => prev.map(r => {
      if (r.id === 'route-a') {
        return {
          ...r,
          crowdingPercent: 84,
          busesPerHour: 8,
          headwayMin: 7.5,
          avgWaitMin: 6.8,
          status: "OPTIMIZED",
          statusBadge: "+2 Extra Buses Deployed",
          color: "#10B981"
        };
      }
      return r;
    }));
  };

  const revertOptimization = () => {
    setOptimizationApplied(false);
    setRoutes(INITIAL_ROUTES);
  };

  const togglePeakSurge = () => {
    setPeakSurgeActive(prev => {
      const next = !prev;
      setRoutes(curr => curr.map(r => {
        if (r.id === 'route-a') {
          return {
            ...r,
            crowdingPercent: next ? 128 : 88,
            avgWaitMin: next ? 14.2 : 9.5
          };
        }
        return r;
      }));
      return next;
    });
  };

  const toggleBreakdown = () => {
    setBreakdownAlert(prev => ({
      ...prev,
      active: !prev.active
    }));
  };

  const resetAll = () => {
    setRoutes(INITIAL_ROUTES);
    setBuses(LIVE_BUSES);
    setHazards(ACTIVE_HAZARDS);
    setPeakSurgeActive(true);
    setOptimizationApplied(false);
    setBreakdownAlert({
      active: true,
      busId: "TN-01-N-4429",
      routeCode: "29C",
      location: "Near T. Nagar Panagal Park",
      tamilLocation: "தி.நகர் பனகல் பார்க் அருகில்",
      issue: "Engine Cooling System Failure",
      tamilIssue: "இயந்திர குளிர்விப்பு அமைப்பு கோளாறு",
      reliefBus: "TN-01-N-8802 (Standby Express)",
      reliefETA: "5 min",
      tamilReliefETA: "5 நிமிடங்கள்",
      alternateRoutes: ["15B (Departs in 2m)", "70 Express (Departs in 4m)"],
      tamilAlternates: ["வழித்தடம் 15B (2 நிமிடத்தில் புறப்படும்)", "வழித்தடம் 70 (4 நிமிடத்தில் புறப்படும்)"],
      passengersAffected: 84
    });
  };

  return (
    <TransitContext.Provider
      value={{
        language,
        setLanguage,
        role,
        setRole,
        routes,
        buses,
        hazards,
        peakSurgeActive,
        togglePeakSurge,
        breakdownAlert,
        toggleBreakdown,
        optimizationApplied,
        applyOptimization,
        revertOptimization,
        resetAll,
        t
      }}
    >
      {children}
    </TransitContext.Provider>
  );
}

export function useTransit() {
  const context = useContext(TransitContext);
  if (!context) {
    throw new Error("useTransit must be used within a TransitProvider");
  }
  return context;
}
