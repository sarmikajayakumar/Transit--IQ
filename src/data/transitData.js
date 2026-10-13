// =========================================================================
// TransitIQ — Coimbatore City (Tamil Nadu, India) Master Telemetry Dataset
// All crowd and demand parameters are marked as ESTIMATED / SIMULATED.
// =========================================================================

// Coimbatore City Geographical Anchor (Gandhipuram / City Center)
export const CORRIDOR_COORDINATES = {
  center: [11.0168, 76.9673],
  zoom: 12
};

export const INITIAL_ROUTES = [
  {
    id: "route-a",
    code: "12",
    name: "Route 12 (Gandhipuram ↔ Saravanampatti IT Corridor)",
    tamilName: "வழித்தடம் 12 (காந்திபுரம் ↔ சரவணம்பட்டி தகவல் தொழில்நுட்ப பாதை)",
    corridor: "Gandhipuram ↔ Saravanampatti",
    color: "#EF4444",
    status: "OVERCROWDED (NEEDS EXTRA BUSES)",
    statusBadge: "Critical Congestion [SIMULATED]",
    crowdingPercent: 134,
    demandPerHour: 480,
    busCapacity: 70,
    busesPerHour: 4,
    headwayMin: 15,
    avgWaitMin: 15.4,
    travelTimeMin: 42,
    detourTimeMin: 0,
    fare: "₹25",
    hasBreakdown: true,
    isSimulated: true,
    path: [
      [11.0168, 76.9673], // Gandhipuram Central Bus Stand
      [11.0250, 76.9740], // GP Signal / Sathy Road
      [11.0385, 76.9802], // Ganapathy Bus Stop
      [11.0550, 76.9880], // Sivanandapuram
      [11.0700, 76.9920], // Prozone Mall Junction
      [11.0827, 76.9960]  // Saravanampatti CHIL SEZ
    ],
    stops: [
      { name: "Gandhipuram Central Bus Stand", tamilName: "காந்திபுரம் மத்திய பேருந்து நிலையம்", lat: 11.0168, lng: 76.9673, crowded: "high" },
      { name: "GP Signal / Sathy Road", tamilName: "ஜி.பி சிக்னல் / சத்தி ரோடு", lat: 11.0250, lng: 76.9740, crowded: "high" },
      { name: "Ganapathy Bus Stop", tamilName: "கணபதி பேருந்து நிறுத்தம்", lat: 11.0385, lng: 76.9802, crowded: "high" },
      { name: "Sivanandapuram", tamilName: "சிவானந்தாபுரம்", lat: 11.0550, lng: 76.9880, crowded: "high" },
      { name: "Prozone Mall Junction", tamilName: "புரோஸோன் மால் சந்திப்பு", lat: 11.0700, lng: 76.9920, crowded: "high" },
      { name: "Saravanampatti (CHIL SEZ)", tamilName: "சரவணம்பட்டி தகவல் தொழில்நுட்ப பூங்கா", lat: 11.0827, lng: 76.9960, crowded: "high" }
    ]
  },
  {
    id: "route-b",
    code: "3A",
    name: "Route 3A (Ukkadam ↔ Singanallur via Trichy Road)",
    tamilName: "வழித்தடம் 3A (உக்கடம் ↔ சிங்கநல்லூர் திருச்சி ரோடு வழி)",
    corridor: "Ukkadam ↔ Singanallur",
    color: "#10B981",
    status: "OPTIMAL (SEATS AVAILABLE)",
    statusBadge: "Seats Free [SIMULATED]",
    crowdingPercent: 40,
    demandPerHour: 160,
    busCapacity: 70,
    busesPerHour: 5,
    headwayMin: 12,
    avgWaitMin: 5.5,
    travelTimeMin: 28,
    detourTimeMin: 0,
    fare: "₹20",
    hasBreakdown: false,
    isSimulated: true,
    path: [
      [10.9934, 76.9610], // Ukkadam Bus Terminal
      [10.9965, 76.9605], // Town Hall
      [10.9950, 76.9720], // Sungam Bypass
      [10.9942, 76.9890], // Ramanathapuram Junction
      [10.9980, 77.0100], // Alvernia / Trichy Road
      [10.9997, 77.0252]  // Singanallur Bus Terminal
    ],
    stops: [
      { name: "Ukkadam Bus Terminal", tamilName: "உக்கடம் பேருந்து முனையம்", lat: 10.9934, lng: 76.9610, crowded: "low" },
      { name: "Town Hall Clock Tower", tamilName: "டவுன் ஹால் மணிக்கூண்டு", lat: 10.9965, lng: 76.9605, crowded: "low" },
      { name: "Sungam Bypass", tamilName: "சுங்கம் புறவழிச்சாலை", lat: 10.9950, lng: 76.9720, crowded: "low" },
      { name: "Ramanathapuram Junction", tamilName: "ராமநாதபுரம் சந்திப்பு", lat: 10.9942, lng: 76.9890, crowded: "low" },
      { name: "Alvernia School", tamilName: "அல்வர்னியா பள்ளி", lat: 10.9980, lng: 77.0100, crowded: "low" },
      { name: "Singanallur Bus Terminal", tamilName: "சிங்கநல்லூர் பேருந்து நிலையம்", lat: 10.9997, lng: 77.0252, crowded: "low" }
    ]
  },
  {
    id: "route-c",
    code: "70",
    name: "Route 70 (Gandhipuram ↔ CODISSIA & Airport via Avinashi Road)",
    tamilName: "வழித்தடம் 70 (காந்திபுரம் ↔ கொடிசியா & விமான நிலையம் அவினாசி ரோடு வழி)",
    corridor: "Gandhipuram ↔ Airport",
    color: "#F59E0B",
    status: "MODERATE",
    statusBadge: "Standing Room [SIMULATED]",
    crowdingPercent: 76,
    demandPerHour: 310,
    busCapacity: 70,
    busesPerHour: 4,
    headwayMin: 15,
    avgWaitMin: 7.8,
    travelTimeMin: 36,
    detourTimeMin: 0,
    fare: "₹28",
    hasBreakdown: false,
    isSimulated: true,
    path: [
      [11.0168, 76.9673], // Gandhipuram
      [11.0190, 76.9850], // Lakshmi Mills
      [11.0250, 77.0020], // Fun Republic Mall
      [11.0264, 77.0105], // Peelamedu (PSG Tech)
      [11.0279, 77.0182], // Hope College
      [11.0360, 77.0340], // CODISSIA
      [11.0300, 77.0434]  // Airport
    ],
    stops: [
      { name: "Gandhipuram Central", tamilName: "காந்திபுரம் மத்திய நிலையம்", lat: 11.0168, lng: 76.9673, crowded: "moderate" },
      { name: "Lakshmi Mills", tamilName: "லட்சுமி மில்ஸ்", lat: 11.0190, lng: 78.9850, crowded: "moderate" },
      { name: "Fun Republic Mall", tamilName: "ஃபன் ரிபப்ளிக் மால்", lat: 11.0250, lng: 77.0020, crowded: "moderate" },
      { name: "Peelamedu (PSG Tech)", tamilName: "பீளமேடு பி.எஸ்.ஜி", lat: 11.0264, lng: 77.0105, crowded: "high" },
      { name: "Hope College", tamilName: "ஹோப் காலேஜ்", lat: 11.0279, lng: 77.0182, crowded: "high" },
      { name: "CODISSIA Complex", tamilName: "கொடிசியா அரங்கம்", lat: 11.0360, lng: 77.0340, crowded: "high" },
      { name: "Coimbatore Airport", tamilName: "கோவை விமான நிலையம்", lat: 11.0300, lng: 77.0434, crowded: "moderate" }
    ]
  }
];

// Hourly demand simulation for Coimbatore peak rush vs lean times
export const HOURLY_DEMAND_CURVE = [
  { slot: "05:00", demandA: 65, demandB: 35, demandC: 45, peak: false },
  { slot: "06:00", demandA: 115, demandB: 60, demandC: 75, peak: false },
  { slot: "07:00", demandA: 260, demandB: 110, demandC: 160, peak: false },
  { slot: "08:00", demandA: 450, demandB: 160, demandC: 290, peak: true },  // Morning IT Rush
  { slot: "09:00", demandA: 480, demandB: 170, demandC: 310, peak: true },  // Morning IT Rush
  { slot: "10:00", demandA: 410, demandB: 150, demandC: 260, peak: true },  // Morning IT Rush
  { slot: "11:00", demandA: 200, demandB: 100, demandC: 140, peak: false },
  { slot: "12:00", demandA: 170, demandB: 85, demandC: 120, peak: false },  // Lean Noon
  { slot: "13:00", demandA: 180, demandB: 90, demandC: 125, peak: false },
  { slot: "14:00", demandA: 190, demandB: 95, demandC: 130, peak: false },
  { slot: "15:00", demandA: 220, demandB: 110, demandC: 155, peak: false },
  { slot: "16:00", demandA: 310, demandB: 140, demandC: 200, peak: false },
  { slot: "17:00", demandA: 440, demandB: 175, demandC: 285, peak: true },  // Evening Rush
  { slot: "18:00", demandA: 490, demandB: 190, demandC: 320, peak: true },  // Evening Rush
  { slot: "19:00", demandA: 460, demandB: 180, demandC: 300, peak: true },  // Evening Rush
  { slot: "20:00", demandA: 330, demandB: 130, demandC: 215, peak: false },
  { slot: "21:00", demandA: 210, demandB: 90, demandC: 135, peak: false },
  { slot: "22:00", demandA: 125, demandB: 50, demandC: 80, peak: false }
];

export const LIVE_BUSES = [
  {
    id: "bus-1",
    regNo: "TN-38-N-2914",
    routeCode: "12",
    currentLocation: "Ganapathy Signal (Sathy Road)",
    tamilLocation: "கணபதி சிக்னல் (சத்தி ரோடு)",
    status: "BROKEN_DOWN",
    occupancy: "136% (Overcrowded) [SIMULATED]",
    speed: 0,
    lat: 11.0385,
    lng: 76.9802,
    nextStop: "Sivanandapuram",
    driver: "A. Selvanathan",
    heading: "Northbound to Saravanampatti"
  },
  {
    id: "bus-2",
    regNo: "TN-38-N-6602",
    routeCode: "12 (Relief)",
    currentLocation: "Gandhipuram Depot Exit",
    tamilLocation: "காந்திபுரம் டிப்போ நுழைவு",
    status: "EN_ROUTE_RELIEF",
    occupancy: "0% (Empty Relief) [SIMULATED]",
    speed: 36,
    lat: 11.0250,
    lng: 76.9740,
    nextStop: "Ganapathy Signal Relief Point (ETA 4 min)",
    driver: "M. Karthikeyan",
    heading: "Northbound"
  },
  {
    id: "bus-3",
    regNo: "TN-38-N-4112",
    routeCode: "3A",
    currentLocation: "Sungam Bypass Flyover",
    tamilLocation: "சுங்கம் பைபாஸ் மேம்பாலம்",
    status: "ON_TIME",
    occupancy: "38% (Seats Free) [SIMULATED]",
    speed: 44,
    lat: 10.9950,
    lng: 76.9720,
    nextStop: "Ramanathapuram (ETA 3 min)",
    driver: "R. Soundararajan",
    heading: "Eastbound"
  },
  {
    id: "bus-4",
    regNo: "TN-38-N-5580",
    routeCode: "3A",
    currentLocation: "Ramanathapuram Signal",
    tamilLocation: "ராமநாதபுரம் சிக்னல்",
    status: "ON_TIME",
    occupancy: "42% (Comfortable) [SIMULATED]",
    speed: 40,
    lat: 10.9942,
    lng: 76.9890,
    nextStop: "Singanallur Terminal (ETA 5 min)",
    driver: "K. Balamurugan",
    heading: "Eastbound"
  },
  {
    id: "bus-5",
    regNo: "TN-38-N-7201",
    routeCode: "70",
    currentLocation: "Hope College Junction",
    tamilLocation: "ஹோப் காலேஜ் சந்திப்பு",
    status: "ON_TIME",
    occupancy: "76% (Moderate) [SIMULATED]",
    speed: 38,
    lat: 11.0279,
    lng: 77.0182,
    nextStop: "CODISSIA (ETA 4 min)",
    driver: "P. Loganathan",
    heading: "Eastbound to Airport"
  }
];

export const ACTIVE_HAZARDS = [
  {
    id: "hazard-1",
    type: "HIGH_DENSITY_SURGE",
    name: "Avinashi Road Flyover / Peelamedu Underpass",
    tamilName: "அவினாசி சாலை மேம்பாலம் / பீளமேடு சுரங்கப்பாதை",
    waterDepth: "Monsoon Waterlogging (1.4 ft) [SIMULATED]",
    tamilDepth: "மழைநீர் தேக்கம் (1.4 அடி) [மாதிரித் தரவு]",
    impact: "Slow moving traffic with lane restriction — requires extra buses",
    tamilImpact: "மெதுவான போக்குவரத்து நெரிசல் — கூடுதல் பேருந்துகள் தேவை",
    detourAction: "Deploy +2 relief buses to Route 12 & divert airport commuters via Trichy Road",
    tamilDetour: "வழித்தடம் 12-க்கு +2 கூடுதல் பேருந்துகள் இயக்கம், பயணிகளை திருச்சி ரோடு வழி திருப்புதல்",
    lat: 11.0264,
    lng: 77.0105,
    severity: "high"
  },
  {
    id: "hazard-2",
    type: "MODERATE_QUEUE",
    name: "CODISSIA Trade Fair Complex Event Surge",
    tamilName: "கொடிசியா தொழிற்காட்சி அரங்கம் கூட்ட நெரிசல்",
    waterDepth: "Industrial Expo Passenger Overflow [SIMULATED]",
    tamilDepth: "தொழிற்காட்சி கூடுதல் கூட்டம் [மாதிரித் தரவு]",
    impact: "Passenger overflow on Avinashi Road",
    tamilImpact: "அவினாசி சாலையில் கூடுதல் பயணிகள் நெரிசல்",
    detourAction: "+3 Extra shuttle buses deployed to absorb passenger overflow",
    tamilDetour: "+3 கூடுதல் ஷட்டில் பேருந்துகள் இயக்கம்",
    lat: 11.0360,
    lng: 77.0340,
    severity: "medium"
  }
];
