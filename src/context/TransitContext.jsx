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
    busId: "TN-38-N-2914",
    routeCode: "12",
    location: "Near Ganapathy Signal (Sathy Road)",
    tamilLocation: "கணபதி சிக்னல் அருகில் (சத்தி ரோடு)",
    issue: "Alternator & Electrical Circuit Failure",
    tamilIssue: "ஆல்டர்னேட்டர் & மின்சுற்று கோளாறு",
    reliefBus: "TN-38-N-6602 (Standby Express)",
    reliefETA: "4 min",
    tamilReliefETA: "4 நிமிடங்கள்",
    alternateRoutes: ["3A (Departs in 3m)", "70 Express (Departs in 5m)"],
    tamilAlternates: ["வழித்தடம் 3A (3 நிமிடத்தில் புறப்படும்)", "வழித்தடம் 70 (5 நிமிடத்தில் புறப்படும்)"],
    passengersAffected: 48
  });

  const t = translations[language] || translations.en;

  // Function to apply AI optimization recommendation:
  // Dynamically reallocates fleet: adds +2 buses to crowded Route 12 to reduce wait times,
  // while keeping less-crowded Route 3A balanced without wasteful empty runs.
  const applyOptimization = () => {
    setOptimizationApplied(true);
    setRoutes(prev => prev.map(r => {
      if (r.id === 'route-a') {
        return {
          ...r,
          crowdingPercent: 82,
          busesPerHour: 8,
          headwayMin: 7.5,
          avgWaitMin: 6.2,
          status: "OPTIMIZED",
          statusBadge: "+2 Extra Buses Deployed [SIMULATED]",
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
            crowdingPercent: next ? 134 : 88,
            avgWaitMin: next ? 15.4 : 9.5
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
      busId: "TN-38-N-2914",
      routeCode: "12",
      location: "Near Ganapathy Signal (Sathy Road)",
      tamilLocation: "கணபதி சிக்னல் அருகில் (சத்தி ரோடு)",
      issue: "Alternator & Electrical Circuit Failure",
      tamilIssue: "ஆல்டர்னேட்டர் & மின்சுற்று கோளாறு",
      reliefBus: "TN-38-N-6602 (Standby Express)",
      reliefETA: "4 min",
      tamilReliefETA: "4 நிமிடங்கள்",
      alternateRoutes: ["3A (Departs in 3m)", "70 Express (Departs in 5m)"],
      tamilAlternates: ["வழித்தடம் 3A (3 நிமிடத்தில் புறப்படும்)", "வழித்தடம் 70 (5 நிமிடத்தில் புறப்படும்)"],
      passengersAffected: 48
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
