// Coordinates for Chennai Corridor (Chennai Central to Tambaram)
export const CORRIDOR_COORDINATES = {
  center: [13.0100, 80.2000],
  zoom: 12
};

export const INITIAL_ROUTES = [
  {
    id: "route-a",
    code: "29C",
    name: "Route 29C (Anna Salai Direct)",
    tamilName: "வழித்தடம் 29C (அண்ணா சாலை வழி)",
    corridor: "Central ↔ Tambaram",
    color: "#EF4444",
    status: "OVERCROWDED",
    statusBadge: "Critical Congestion",
    crowdingPercent: 128,
    demandPerHour: 420,
    busCapacity: 70,
    busesPerHour: 4,
    headwayMin: 15,
    avgWaitMin: 14.2,
    travelTimeMin: 58,
    detourTimeMin: 7,
    fare: "₹30",
    hasFlood: true,
    hasBreakdown: true,
    path: [
      [13.0827, 80.2707], // Central
      [13.0645, 80.2612], // LIC
      [13.0520, 80.2505], // Thousand Lights
      [13.0410, 80.2450], // Teynampet
      [13.0280, 80.2410], // Nandanam
      [13.0180, 80.2220], // Saidapet
      [13.0067, 80.2023], // Kathipara (Flooded/Detoured)
      [12.9820, 80.1650], // Airport
      [12.9675, 80.1491], // Pallavaram
      [12.9249, 80.1260]  // Tambaram
    ],
    stops: [
      { name: "Chennai Central", tamilName: "சென்னை மத்திய நிலையம்", lat: 13.0827, lng: 80.2707, crowded: "high" },
      { name: "LIC / Anna Salai", tamilName: "எல்.ஐ.சி / அண்ணா சாலை", lat: 13.0645, lng: 80.2612, crowded: "high" },
      { name: "Thousand Lights", tamilName: "ஆயிரம் விளக்கு", lat: 13.0520, lng: 80.2505, crowded: "high" },
      { name: "Teynampet", tamilName: "தேனாம்பேட்டை", lat: 13.0410, lng: 80.2450, crowded: "high" },
      { name: "Nandanam", tamilName: "நந்தனம்", lat: 13.0280, lng: 80.2410, crowded: "high" },
      { name: "Saidapet", tamilName: "சைதாப்பேட்டை", lat: 13.0180, lng: 80.2220, crowded: "high" },
      { name: "Guindy / Kathipara", tamilName: "கிண்டி / கத்திப்பாரா", lat: 13.0067, lng: 80.2023, crowded: "flooded" },
      { name: "Chennai Airport", tamilName: "சென்னை விமான நிலையம்", lat: 12.9820, lng: 80.1650, crowded: "moderate" },
      { name: "Pallavaram", tamilName: "பல்லாவரம்", lat: 12.9675, lng: 80.1491, crowded: "high" },
      { name: "Tambaram Terminal", tamilName: "தாம்பரம் முனையம்", lat: 12.9249, lng: 80.1260, crowded: "high" }
    ]
  },
  {
    id: "route-b",
    code: "15B",
    name: "Route 15B (100ft Inner Ring Road)",
    tamilName: "வழித்தடம் 15B (100 அடி உள்வட்டச் சாலை)",
    corridor: "Central ↔ Tambaram",
    color: "#10B981",
    status: "OPTIMAL",
    statusBadge: "Seats Available",
    crowdingPercent: 42,
    demandPerHour: 180,
    busCapacity: 70,
    busesPerHour: 5,
    headwayMin: 12,
    avgWaitMin: 5.2,
    travelTimeMin: 46,
    detourTimeMin: 0,
    fare: "₹28",
    hasFlood: false,
    hasBreakdown: false,
    path: [
      [13.0827, 80.2707], // Central
      [13.0732, 80.2609], // Egmore
      [13.0725, 80.2390], // Chetpet
      [13.0700, 80.2150], // Aminjikarai
      [13.0690, 80.1948], // Koyambedu
      [13.0360, 80.2110], // Ashok Nagar
      [13.0210, 80.2030], // Ekkatuthangal
      [12.9820, 80.1650], // Airport
      [12.9516, 80.1402], // Chromepet
      [12.9249, 80.1260]  // Tambaram
    ],
    stops: [
      { name: "Chennai Central", tamilName: "சென்னை மத்திய நிலையம்", lat: 13.0827, lng: 80.2707, crowded: "low" },
      { name: "Egmore", tamilName: "எழும்பூர்", lat: 13.0732, lng: 80.2609, crowded: "low" },
      { name: "Chetpet", tamilName: "சேத்துப்பட்டு", lat: 13.0725, lng: 80.2390, crowded: "low" },
      { name: "Aminjikarai", tamilName: "அமிஞ்சிக்கரை", lat: 13.0700, lng: 80.2150, crowded: "low" },
      { name: "Koyambedu", tamilName: "கோயம்பேடு", lat: 13.0690, lng: 80.1948, crowded: "low" },
      { name: "Ashok Nagar", tamilName: "அசோக் நகர்", lat: 13.0360, lng: 80.2110, crowded: "low" },
      { name: "Ekkatuthangal", tamilName: "ஈக்காட்டுத்தாங்கல்", lat: 13.0210, lng: 80.2030, crowded: "low" },
      { name: "Chennai Airport", tamilName: "விமான நிலையம்", lat: 12.9820, lng: 80.1650, crowded: "low" },
      { name: "Chromepet", tamilName: "குரோம்பேட்டை", lat: 12.9516, lng: 80.1402, crowded: "low" },
      { name: "Tambaram Terminal", tamilName: "தாம்பரம் முனையம்", lat: 12.9249, lng: 80.1260, crowded: "low" }
    ]
  },
  {
    id: "route-c",
    code: "21M",
    name: "Route 21M (Velachery Coastal Bypass)",
    tamilName: "வழித்தடம் 21M (வேளச்சேரி புறவழிச்சாலை)",
    corridor: "Central ↔ Tambaram",
    color: "#F59E0B",
    status: "MODERATE",
    statusBadge: "Standing Room",
    crowdingPercent: 78,
    demandPerHour: 280,
    busCapacity: 70,
    busesPerHour: 4,
    headwayMin: 15,
    avgWaitMin: 8.0,
    travelTimeMin: 52,
    detourTimeMin: 3,
    fare: "₹32",
    hasFlood: true,
    hasBreakdown: false,
    path: [
      [13.0827, 80.2707], // Central
      [13.0500, 80.2824], // Marina Beach
      [13.0336, 80.2678], // Mylapore
      [13.0064, 80.2575], // Adyar
      [12.9910, 80.2450], // SRP Tools OMR
      [12.9792, 80.2212], // Velachery Lake (Minor Waterlogging)
      [12.9180, 80.1910], // Medavakkam
      [12.9249, 80.1260]  // Tambaram East
    ],
    stops: [
      { name: "Chennai Central", tamilName: "சென்னை மத்திய நிலையம்", lat: 13.0827, lng: 80.2707, crowded: "moderate" },
      { name: "Marina Beach", tamilName: "மெரினா கடற்கரை", lat: 13.0500, lng: 80.2824, crowded: "moderate" },
      { name: "Mylapore", tamilName: "மயிலாப்பூர்", lat: 13.0336, lng: 80.2678, crowded: "moderate" },
      { name: "Adyar Depot", tamilName: "அடையாறு டிப்போ", lat: 13.0064, lng: 80.2575, crowded: "moderate" },
      { name: "SRP Tools (OMR)", tamilName: "எஸ்.ஆர்.பி டூல்ஸ்", lat: 12.9910, lng: 80.2450, crowded: "moderate" },
      { name: "Velachery Lake Road", tamilName: "வேளச்சேரி ஏரி சாலை", lat: 12.9792, lng: 80.2212, crowded: "flooded" },
      { name: "Medavakkam", tamilName: "மேடவாக்கம்", lat: 12.9180, lng: 80.1910, crowded: "moderate" },
      { name: "Tambaram East", tamilName: "கிழக்கு தாம்பரம்", lat: 12.9249, lng: 80.1260, crowded: "moderate" }
    ]
  }
];

export const HOURLY_DEMAND_CURVE = [
  { slot: "05:00", demandA: 60, demandB: 40, demandC: 45, peak: false },
  { slot: "06:00", demandA: 110, demandB: 70, demandC: 80, peak: false },
  { slot: "07:00", demandA: 240, demandB: 120, demandC: 150, peak: false },
  { slot: "08:00", demandA: 420, demandB: 180, demandC: 280, peak: true },  // Peak 1
  { slot: "09:00", demandA: 440, demandB: 195, demandC: 295, peak: true },  // Peak 1
  { slot: "10:00", demandA: 380, demandB: 160, demandC: 240, peak: true },  // Peak 1
  { slot: "11:00", demandA: 190, demandB: 110, demandC: 140, peak: false },
  { slot: "12:00", demandA: 160, demandB: 95, demandC: 120, peak: false },
  { slot: "13:00", demandA: 175, demandB: 100, demandC: 130, peak: false },
  { slot: "14:00", demandA: 180, demandB: 105, demandC: 135, peak: false },
  { slot: "15:00", demandA: 210, demandB: 120, demandC: 150, peak: false },
  { slot: "16:00", demandA: 290, demandB: 150, demandC: 190, peak: false },
  { slot: "17:00", demandA: 410, demandB: 185, demandC: 275, peak: true },  // Peak 2
  { slot: "18:00", demandA: 460, demandB: 200, demandC: 310, peak: true },  // Peak 2
  { slot: "19:00", demandA: 430, demandB: 190, demandC: 290, peak: true },  // Peak 2
  { slot: "20:00", demandA: 320, demandB: 140, demandC: 210, peak: false },
  { slot: "21:00", demandA: 200, demandB: 100, demandC: 130, peak: false },
  { slot: "22:00", demandA: 120, demandB: 60, demandC: 75, peak: false }
];

export const LIVE_BUSES = [
  {
    id: "bus-1",
    regNo: "TN-01-N-4429",
    routeCode: "29C",
    currentLocation: "T. Nagar Panagal Park",
    tamilLocation: "தி.நகர் பனகல் பார்க்",
    status: "BROKEN_DOWN",
    occupancy: "132% (Overcrowded)",
    speed: 0,
    lat: 13.0410,
    lng: 80.2450,
    nextStop: "Saidapet",
    driver: "M. Kumar",
    heading: "Southbound"
  },
  {
    id: "bus-2",
    regNo: "TN-01-N-8802",
    routeCode: "29C (Relief)",
    currentLocation: "Nandanam Signal",
    tamilLocation: "நந்தனம் சிக்னல்",
    status: "EN_ROUTE_RELIEF",
    occupancy: "0% (Empty Relief)",
    speed: 38,
    lat: 13.0310,
    lng: 80.2420,
    nextStop: "T. Nagar Relief Point (ETA 5 min)",
    driver: "K. Selvam",
    heading: "Southbound"
  },
  {
    id: "bus-3",
    regNo: "TN-01-N-7215",
    routeCode: "15B",
    currentLocation: "Koyambedu Flyover",
    tamilLocation: "கோயம்பேடு மேம்பாலம்",
    status: "ON_TIME",
    occupancy: "38% (Seats Free)",
    speed: 42,
    lat: 13.0690,
    lng: 80.1948,
    nextStop: "Ashok Nagar (ETA 3 min)",
    driver: "R. Venkatesh",
    heading: "Southbound"
  },
  {
    id: "bus-4",
    regNo: "TN-01-N-3190",
    routeCode: "15B",
    currentLocation: "Ekkatuthangal Metro",
    tamilLocation: "ஈக்காட்டுத்தாங்கல் மெட்ரோ",
    status: "ON_TIME",
    occupancy: "45% (Comfortable)",
    speed: 40,
    lat: 13.0210,
    lng: 80.2030,
    nextStop: "Guindy Industrial (ETA 4 min)",
    driver: "S. Murugan",
    heading: "Southbound"
  },
  {
    id: "bus-5",
    regNo: "TN-01-N-6641",
    routeCode: "21M",
    currentLocation: "Velachery Bypass",
    tamilLocation: "வேளச்சேரி புறவழிச்சாலை",
    status: "SLOW_WATERLOG",
    occupancy: "82% (Standing)",
    speed: 18,
    lat: 12.9792,
    lng: 80.2212,
    nextStop: "Medavakkam (ETA 8 min)",
    driver: "P. Rajesh",
    heading: "Southbound"
  }
];

export const ACTIVE_HAZARDS = [
  {
    id: "hazard-1",
    type: "SEVERE_FLOOD",
    name: "Kathipara Junction & Guindy Underpass",
    tamilName: "கத்திப்பாரா சந்திப்பு & கிண்டி சுரங்கப்பாதை",
    waterDepth: "1.5 Feet Inundation",
    tamilDepth: "1.5 அடி மழைநீர் தேக்கம்",
    impact: "Anna Salai direct corridor closed to low-floor buses",
    tamilImpact: "அண்ணா சாலை நேரடிப் பாதை மூடப்பட்டு மாற்றுப்பாதை அமல்",
    detourAction: "Rerouted via 100ft Inner Ring Road (+7 min delay)",
    tamilDetour: "100 அடி உள்வட்டச் சாலை வழியே மாற்றம் (+7 நிமி)",
    lat: 13.0067,
    lng: 80.2023,
    severity: "high"
  },
  {
    id: "hazard-2",
    type: "WATERLOGGING",
    name: "Velachery Lake Road / Kaiveli",
    tamilName: "வேளச்சேரி ஏரி சாலை / கைவேலி",
    waterDepth: "0.8 Feet Waterlogging",
    tamilDepth: "0.8 அடி மழைநீர்",
    impact: "One-lane crawl; marshaled by transit wardens",
    tamilImpact: "ஒரு வழித்தடத்தில் மெதுவாக இயக்கம்",
    detourAction: "Single file queue, +3 min travel time",
    tamilDetour: "வரிசை முறை இயக்கம், +3 நிமி கூடுதல் நேரம்",
    lat: 12.9792,
    lng: 80.2212,
    severity: "medium"
  }
];
