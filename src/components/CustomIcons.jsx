import React from 'react';
import { motion } from 'framer-motion';

// Custom Architectural Transit Compass & Crosshair SVG
export function TransitCrosshairSvg({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="20" cy="20" r="18" stroke="#0A0A0A" strokeWidth="1.2" strokeDasharray="3 3" />
      <circle cx="20" cy="20" r="8" stroke="#0A0A0A" strokeWidth="1.5" />
      <line x1="20" y1="2" x2="20" y2="10" stroke="#0A0A0A" strokeWidth="1.5" />
      <line x1="20" y1="30" x2="20" y2="38" stroke="#0A0A0A" strokeWidth="1.5" />
      <line x1="2" y1="20" x2="10" y2="20" stroke="#0A0A0A" strokeWidth="1.5" />
      <line x1="30" y1="20" x2="38" y2="20" stroke="#0A0A0A" strokeWidth="1.5" />
      <motion.circle
        cx="20"
        cy="20"
        r="3"
        fill="#0A0A0A"
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
      />
    </svg>
  );
}

// Custom Corridor Routing Micro-Interaction Schematic SVG
export function CorridorBranchSvg({ className = "w-full h-12" }) {
  return (
    <svg viewBox="0 0 320 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Route A line */}
      <path d="M 10 24 L 90 24 Q 130 10 170 10 L 310 10" stroke="#0A0A0A" strokeWidth="1.2" />
      {/* Route B line */}
      <path d="M 10 24 L 310 24" stroke="#0A0A0A" strokeWidth="1.8" strokeDasharray="4 2" />
      {/* Route C line */}
      <path d="M 10 24 L 90 24 Q 130 38 170 38 L 310 38" stroke="#0A0A0A" strokeWidth="1.2" />
      
      {/* Origin Node */}
      <circle cx="10" cy="24" r="4" fill="#0A0A0A" />
      
      {/* Terminus Nodes */}
      <circle cx="310" cy="10" r="3" fill="#0A0A0A" />
      <circle cx="310" cy="24" r="3.5" fill="#0A0A0A" />
      <circle cx="310" cy="38" r="3" fill="#0A0A0A" />

      {/* Moving Signal Pulse */}
      <motion.circle
        cx="10"
        cy="24"
        r="3"
        fill="#0A0A0A"
        animate={{
          cx: [10, 90, 170, 310],
          cy: [24, 24, 10, 10]
        }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
      />
    </svg>
  );
}

// Custom Radar Wave Micro-Interaction SVG
export function RadarWaveSvg({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="12" cy="12" r="10" stroke="#0A0A0A" strokeWidth="1" strokeDasharray="2 2" />
      <motion.circle
        cx="12"
        cy="12"
        r="4"
        stroke="#0A0A0A"
        strokeWidth="1.2"
        animate={{ r: [3, 8, 3], opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      />
      <circle cx="12" cy="12" r="2" fill="#0A0A0A" />
    </svg>
  );
}

// Custom Technical Breakdown Gear Glyph
export function TechnicalGearSvg({ className = "w-5 h-5" }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
    >
      <circle cx="12" cy="12" r="4" stroke="#0A0A0A" strokeWidth="1.5" />
      <path
        d="M12 2V5 M12 19V22 M2 12H5 M19 12H22 M4.93 4.93L7.05 7.05 M16.95 16.95L19.07 19.07 M4.93 19.07L7.05 16.95 M16.95 7.05L19.07 4.93"
        stroke="#0A0A0A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}

// Custom Water Inundation Isobar / Contour Lines SVG
export function FloodIsobarSvg({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <motion.path
        d="M2 8 C 6 6, 10 10, 14 8 C 18 6, 22 10, 24 8"
        stroke="#0A0A0A"
        strokeWidth="1.2"
        animate={{ x: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />
      <motion.path
        d="M2 13 C 6 11, 10 15, 14 13 C 18 11, 22 15, 24 13"
        stroke="#0A0A0A"
        strokeWidth="1.2"
        animate={{ x: [2, -2, 2] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />
      <path
        d="M2 18 C 6 16, 10 20, 14 18 C 18 16, 22 20, 24 18"
        stroke="#0A0A0A"
        strokeWidth="1.2"
      />
    </svg>
  );
}
