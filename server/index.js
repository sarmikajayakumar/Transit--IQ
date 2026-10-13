import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '..', 'dist');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const GROQ_API_KEY = process.env.GROQ_API_KEY || "";
const GROQ_MODEL = "openai/gpt-oss-20b";

// Supabase Database Connection
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://blnpwkcryalhyezmrmzp.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'sb_publishable_D9j_QMePAR8zqD4QH2H0wA_q_Sbplux';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Transit simulation state
let transitState = {
  activeCorridor: "Gandhipuram - Saravanampatti IT Corridor",
  weather: "Clear (Normal Traffic Watch)",
  peakHour: true,
  congestionHotspots: [
    {
      id: "hotspot-1",
      name: "Avinashi Road Flyover / Peelamedu Underpass",
      tamilName: "அவினாசி சாலை மேம்பாலம் / பீளமேடு சுரங்கப்பாதை",
      status: "Monsoon Waterlogging & Commuter Queue Overflow [SIMULATED]",
      tamilStatus: "மழைநீர் தேக்கம் & உச்ச கூட்ட நெரிசல் [மாதிரித் தரவு]",
      affectedRoutes: ["Route 70 (Airport Express)", "Route 15"],
      recommendation: "Deploy +2 relief buses and divert traffic via Trichy Road",
      tamilRecommendation: "70-க்கு +2 கூடுதல் பேருந்துகள், திருச்சி ரோடு வழி திருப்புதல்",
      lat: 11.0264,
      lng: 77.0105,
      radius: 650
    },
    {
      id: "hotspot-2",
      name: "CODISSIA Trade Fair Complex",
      tamilName: "கொடிசியா தொழிற்காட்சி அரங்கம்",
      status: "Industrial Expo Event Commuter Surge [SIMULATED]",
      tamilStatus: "தொழிற்காட்சி கூடுதல் கூட்டம் [மாதிரித் தரவு]",
      affectedRoutes: ["Route 70"],
      recommendation: "+3 Extra shuttle buses deployed to absorb passenger overflow",
      tamilRecommendation: "+3 கூடுதல் ஷட்டில் பேருந்துகள் இயக்கம்",
      lat: 11.0360,
      lng: 77.0340,
      radius: 450
    }
  ],
  breakdowns: [
    {
      busId: "TN-38-N-2914",
      routeNumber: "12",
      routeName: "Gandhipuram to Saravanampatti IT Park via Ganapathy",
      tamilRouteName: "காந்திபுரம் - சரவணம்பட்டி (கணபதி வழி)",
      location: "Near Ganapathy Signal (Sathy Road)",
      tamilLocation: "கணபதி சிக்னல் அருகில் (சத்தி ரோடு)",
      issue: "Alternator & Electrical Circuit Failure",
      tamilIssue: "ஆல்டர்னேட்டர் & மின்சுற்று கோளாறு",
      status: "Repairs In Progress - Passengers Evacuated to Platform",
      tamilStatus: "பழுதுபார்க்கும் பணி நடக்கிறது - பயணிகள் மேடையில்",
      backupReliefBus: "TN-38-N-6602 (Relief Express)",
      reliefETA: "4 minutes away",
      tamilReliefETA: "4 நிமிடங்களில் வந்து சேரும்",
      recommendedAlternates: ["Route 3A (Arriving 3 mins, 40% crowd)", "Route 70 (Arriving 5 mins, 76% crowd)"],
      tamilRecommendedAlternates: ["வழித்தடம் 3A (3 நிமிடங்களில் வரும், 40% கூட்டம்)", "வழித்தடம் 70 (5 நிமிடங்களில் வரும், 76% கூட்டம்)"],
      timestamp: new Date().toLocaleTimeString()
    }
  ],
  routes: [
    {
      id: "route-a",
      name: "Route 12",
      subtitle: "Gandhipuram ↔ Saravanampatti IT Corridor (via Sathy Road)",
      tamilName: "வழித்தடம் 12 (காந்திபுரம் ↔ சரவணம்பட்டி தகவல் தொழில்நுட்ப பாதை)",
      status: "OVERCROWDED (NEEDS EXTRA BUSES)",
      tamilStatus: "அதிக கூட்டம் (கூடுதல் பேருந்துகள் தேவை)",
      crowdingPercent: 134,
      demandPerHour: 480,
      busCapacity: 70,
      busesPerHour: 4,
      headwayMin: 15,
      avgWaitMin: 15.4,
      color: "#EF4444",
      alert: "Heavy IT rush! Extra buses recommended or board Route 3A.",
      tamilAlert: "அதிக நெரிசல்! கூடுதல் பேருந்துகள் இயக்கப்படுகின்றன அல்லது 3A தேர்ந்தெடுக்கவும்.",
      stops: [
        "Gandhipuram Central Bus Stand", "GP Signal", "Ganapathy Bus Stop",
        "Sivanandapuram", "Prozone Mall Junction", "Saravanampatti CHIL SEZ"
      ]
    },
    {
      id: "route-b",
      name: "Route 3A",
      subtitle: "Ukkadam ↔ Singanallur via Sungam & Trichy Road (Alternate)",
      tamilName: "வழித்தடம் 3A (உக்கடம் ↔ சிங்கநல்லூர் திருச்சி ரோடு வழி)",
      status: "OPTIMAL (SEATS AVAILABLE)",
      tamilStatus: "சிறந்தது (இருக்கைகள் உள்ளன)",
      crowdingPercent: 40,
      demandPerHour: 160,
      busCapacity: 70,
      busesPerHour: 5,
      headwayMin: 12,
      avgWaitMin: 5.5,
      color: "#10B981",
      alert: "Fast moving, seats guaranteed, 60% empty capacity.",
      tamilAlert: "வேகமாக செல்லும், 60% காலி இருக்கைகள், சிறந்த தேர்வு.",
      stops: [
        "Ukkadam Bus Terminal", "Town Hall Clock Tower", "Sungam Bypass",
        "Ramanathapuram Junction", "Alvernia School", "Singanallur Bus Terminal"
      ]
    },
    {
      id: "route-c",
      name: "Route 70",
      subtitle: "Gandhipuram ↔ CODISSIA & Airport via Avinashi Road",
      tamilName: "வழித்தடம் 70 (காந்திபுரம் ↔ கொடிசியா & விமான நிலையம் அவினாசி ரோடு வழி)",
      status: "MODERATE",
      tamilStatus: "மிதமான கூட்டம்",
      crowdingPercent: 76,
      demandPerHour: 310,
      busCapacity: 70,
      busesPerHour: 4,
      headwayMin: 15,
      avgWaitMin: 7.8,
      color: "#F59E0B",
      alert: "Steady flow, standard 15 min headway on Avinashi Road.",
      tamilAlert: "சீரான இயக்கம், அவினாசி சாலையில் 15 நிமிட இடைவேளை.",
      stops: [
        "Gandhipuram Central", "Lakshmi Mills", "Fun Republic Mall",
        "Peelamedu PSG Tech", "Hope College", "CODISSIA Complex", "Coimbatore Airport"
      ]
    }
  ],
  optimizationApplied: false,
  optimizationMetrics: {
    before: { avgWait: "15.4 min", maxCrowding: "134%", serviceHeadway: "15 min" },
    after: { avgWait: "6.2 min", maxCrowding: "82%", serviceHeadway: "7.5 min" },
    action: "Deployed +2 relief buses to crowded Route 12 & reallocated idle capacity from Route 3A"
  }
};

// Fallback response engine for Passenger and Operator in Tamil & English
function generateSmartFallback(message, role, language) {
  const msgLower = (message || "").toLowerCase();
  const isTamil = language === 'ta' || /[\u0B80-\u0BFF]/.test(message);

  if (role === 'operator') {
    if (isTamil) {
      if (msgLower.includes('breakdown') || msgLower.includes('பழுது') || msgLower.includes('என்ஜின்') || msgLower.includes('2914')) {
        return `🛠️ [டிப்போ மேலாளர் எச்சரிக்கை - கோவை வழித்தட பழுது]:
பேருந்து எண் TN-38-N-2914 (வழித்தடம் 12) கணபதி சிக்னல் (சத்தி ரோடு) அருகில் பழுதாகியுள்ளது.
- நிவாரண பேருந்து TN-38-N-6602 உடனடியாக அனுப்பப்பட்டுள்ளது (வருகை: 4 நிமிடங்கள்).
- பயணிகள் மாற்றுப் பேருந்தான 3A அல்லது 70-க்கு வழிகாட்டப்பட்டுள்ளனர்.
- பழுதுநீக்கும் மொபைல் குழு சம்பவ இடத்திற்கு விரைந்துள்ளது.`;
      }
      if (msgLower.includes('overcrowd') || msgLower.includes('undercrowd') || msgLower.includes('நெரிசல்') || msgLower.includes('ரத்து') || msgLower.includes('கூடுதல் பேருந்து') || msgLower.includes('குறைந்த')) {
        return `📊 [TransitIQ கோவை இயக்குனர் பகுப்பாய்வு - வழித்தட உகப்பாக்கம்]:
1. 🚨 அதிக கூட்டம் (OVERCROWDED): வழித்தடம் 12 (காந்திபுரம் ↔ சரவணம்பட்டி IT காரிடார்) 134% நெரிசலில் இயங்குகிறது. 480 பயணிகள்/மணி, காத்திருப்பு 15.4 நிமிடம்.
   👉 கட்டளை: உடனடியாக +2 கூடுதல் நிவாரணப் பேருந்துகளை ஒதுக்கீடு செய்! இதனால் காத்திருப்பு 6.2 நிமிடங்களாகக் குறையும்.
2. 📉 குறைந்த கூட்டம் (UNDERCROWDED): வழித்தடம் 3A (உக்கடம் ↔ சிங்காநல்லூர்) 40% நெரிசலில் 60% காலி இருக்கைகளுடன் இயங்குகிறது (160 பயணிகள்/மணி).
   👉 கட்டளை: வீணாக ஓடும் 1 பேருந்தை ரத்து செய்து, அந்த வளத்தை வழித்தடம் 12-க்கு மாற்று! இதனால் எரிபொருள் சேமிக்கப்படும், அட்டவணை 15 நிமிட இடைவெளியில் சீராக இருக்கும்.`;
      }
      return `📊 [TransitIQ கோவை இயக்குனர் பகுப்பாய்வு - வழித்தட உகப்பாக்கம்]:
- அதிக கூட்டம் உள்ள காந்திபுரம் - சரவணம்பட்டி வழித்தடம் 12-ல் உச்சநேர நெரிசல் 134% எட்டியுள்ளது (காத்திருப்பு: 15.4 நிமி). இதற்கு +2 கூடுதல் பேருந்துகள் உடனடியாகத் தேவை!
- குறைந்த கூட்டம் உள்ள உக்கடம் - சிங்காநல்லூர் வழித்தடம் 3A-ல் (40% ஆக்கிரமிப்பு) 1 வீண் பேருந்தை ரத்து செய்து, அந்த பேருந்தை நெரிசல் மிகுந்த வழித்தடம் 12-க்கு ஒதுக்க AI பரிந்துரைக்கிறது.
- இதன் மூலம் ஒட்டுமொத்த காத்திருப்பு நேரம் 15.4 நிமிடத்திலிருந்து 6.2 நிமிடங்களாகக் குறையும், நெரிசல் 82%-ஆகக் கட்டுப்படும்!`;
    } else {
      if (msgLower.includes('breakdown') || msgLower.includes('repair') || msgLower.includes('bus') || msgLower.includes('2914')) {
        return `🛠️ [Depot Commander Alert - Coimbatore Fleet Incident]:
Bus TN-38-N-2914 (Route 12) reported electrical alternator failure at Ganapathy Signal (Sathy Road).
- Standby relief unit TN-38-N-6602 dispatched immediately from Gandhipuram Depot (ETA: 4 mins).
- Automated prior broadcast sent to waiting passengers recommending Route 3A & Route 70.
- Mobile repair team deployed.`;
      }
      if (msgLower.includes('overcrowd') || msgLower.includes('undercrowd') || msgLower.includes('extra bus') || msgLower.includes('cancel') || msgLower.includes('directive') || msgLower.includes('reallocate')) {
        return `📊 [TransitIQ Capacity Reallocation Analysis - Coimbatore Network]:
1. 🚨 OVERCROWDED CORRIDOR: Route 12 (Gandhipuram ↔ Saravanampatti IT Park) is operating at 134% capacity (480 pax/hr), causing 15.4 min passenger wait times and platform overflows at Ganapathy.
   👉 DIRECTIVE: Add +2 Extra Relief Buses immediately (TN-38-N-6602 & Standby unit). Headway drops to 7.5 mins, cutting wait times to 6.2 mins.
2. 📉 UNDERCROWDED CORRIDOR: Route 3A (Ukkadam ↔ Singanallur via Trichy Road) operates at only 40% capacity with 60% empty seats (160 pax/hr).
   👉 DIRECTIVE: Cancel 1 idle scheduled departure and transfer the bus/driver to Route 12. Eliminates dead mileage and fuel burn while preserving a reliable 15-minute headway for Trichy Road commuters.`;
      }
      return `📊 [TransitIQ Coimbatore Corridor Optimization Intelligence]:
- Crowded Corridors Need Extra Buses: Route 12 (Gandhipuram ↔ Saravanampatti IT Park) reached 134% capacity with an average wait time of 15.4 minutes.
- Low Demand Corridors Need Fewer Buses: Route 3A (Ukkadam ↔ Singanallur) operates at only 40% capacity with 60% empty seating.
- Immediate AI Action: Add +2 extra buses to Route 12 and cancel 1 idle bus on Route 3A. This slashes average wait times down to 6.2 mins (↓ 60% reduction) with zero passenger stranding.`;
    }
  } else {
    // Passenger mode
    if (isTamil) {
      if (msgLower.includes('breakdown') || msgLower.includes('பழுது') || msgLower.includes('நின்று')) {
        return `⚠️ [முக்கிய பயணிகள் அறிவிப்பு - பேருந்து பழுது]:
கணபதி சிக்னல் அருகில் இயங்கி வந்த வழித்தடம் 12 (பேருந்து TN-38-N-2914) ஆல்டர்னேட்டர் கோளாறு காரணமாக நிறுத்தப்பட்டுள்ளது.
✅ கவலைப்பட வேண்டாம்! மாற்று நிவாரண பேருந்து TN-38-N-6602 இன்னும் 4 நிமிடங்களில் அங்கு வந்து சேரும்.
👉 உடனடி பயணம் செய்ய: வழித்தடம் 3A அல்லது அவினாசி சாலை வழித்தடம் 70 தேர்ந்தெடுக்கலாம்!`;
      }
      if (msgLower.includes('overcrowd') || msgLower.includes('undercrowd') || msgLower.includes('நெரிசல்') || msgLower.includes('ரத்து') || msgLower.includes('கூடுதல் பேருந்து') || msgLower.includes('குறைந்த')) {
        return `🚍 [TransitIQ பயண வழிகாட்டுதல்]:
- அதிக கூட்டம் (134%): காந்திபுரம் - சரவணம்பட்டி வழித்தடம் 12-ல் கடுமையான நெரிசல் உள்ளதால், பயணிகள் வசதிக்காக +2 கூடுதல் பேருந்துகள் இயக்கப்படுகின்றன.
- குறைந்த கூட்டம் (40%): உக்கடம் - சிங்காநல்லூர் வழித்தடம் 3A-ல் 1 வீண் பேருந்து ரத்து செய்யப்பட்டு வழித்தடம் 12-க்கு மாற்றப்பட்டுள்ளது; இருப்பினும் 15 நிமிடங்களுக்கு ஒரு முறை பேருந்து உண்டு!
👉 இருக்கை வசதியுடன் நிம்மதியாகப் பயணிக்க வழித்தடம் 3A அல்லது 70 தேர்ந்தெடுக்கலாம்.`;
      }
      if (msgLower.includes('route') || msgLower.includes('எந்த') || msgLower.includes('பேருந்து') || msgLower.includes('நேரம்') || msgLower.includes('கூட்டம்') || msgLower.includes('கோவை') || msgLower.includes('சரவணம்பட்டி')) {
        return `🚍 [TransitIQ கோவை பயண வழிகாட்டி]:
நீங்கள் கோவையில் பயணம் செய்யும்போது:
1. ⭐ சிறந்த தேர்வு (இருக்கைகள் உறுதி): வழித்தடம் 3A (உக்கடம் ↔ சிங்காநல்லூர், 40% கூட்டம் மட்டுமே, 5.5 நிமி காத்திருப்பு).
2. வழித்தடம் 70 (காந்திபுரம் ↔ கொடிசியா & விமான நிலையம், 76% கூட்டம்).
3. வழித்தடம் 12 (காந்திபுரம் ↔ சரவணம்பட்டி, 134% கூட்டம்) - இதற்கு கூடுதல் பேருந்துகள் இயக்கப்பட்டு வருகின்றன.
கூட்டம் இல்லாத சௌகரியமான பயணத்திற்கு வழித்தடம் 3A-ஐத் தேர்ந்தெடுக்கவும்!`;
      }
      return `வணக்கம்! நான் உங்கள் TransitIQ கோவை பேருந்து உதவியாளர்.
- எந்தப் பேருந்து எடுக்க வேண்டும் (சரவணம்பட்டி, பீளமேடு, உக்கடம், காந்திபுரம்)?
- கூட்டம் குறைந்த வழித்தடங்கள் எவை?
- அவினாசி சாலை மற்றும் சத்தி ரோட்டில் கூடுதல் பேருந்துகள் எங்கு இயக்கப்படுகின்றன?
- பழுதான பேருந்துக்கான நிவாரணப் பேருந்து நேரம் என்ன?
எந்தக் கேள்வியும் கேளுங்கள், உங்களுக்கு உதவ நான் தயாராக உள்ளேன்!`;
    } else {
      if (msgLower.includes('breakdown') || msgLower.includes('repair') || msgLower.includes('broke')) {
        return `⚠️ [Prior Breakdown Notice - Passenger Alert]:
Route 12 (Bus TN-38-N-2914) experienced an electrical issue near Ganapathy Signal on Sathy Road.
✅ Relief Bus TN-38-N-6602 has already been dispatched and will arrive in 4 minutes!
👉 Fast Alternate: Board Route 3A (Trichy Road) or Route 70 (Avinashi Road) arriving in 3 minutes.`;
      }
      if (msgLower.includes('overcrowd') || msgLower.includes('undercrowd') || msgLower.includes('extra bus') || msgLower.includes('cancel')) {
        return `🚍 [TransitIQ Passenger Corridor Guidance]:
- Overcrowded Route 12 (134% full): Operating with +2 extra deployed buses to absorb Saravanampatti IT commuter queues.
- Undercrowded Route 3A (40% full): 1 surplus bus cancelled and transferred to Route 12 to eliminate fuel waste while keeping steady 15-min departures.
👉 Commuter Tip: Board Route 3A or Route 70 for guaranteed seating and minimum wait times.`;
      }
      if (msgLower.includes('which bus') || msgLower.includes('suggest') || msgLower.includes('timing') || msgLower.includes('crowd') || msgLower.includes('optimize') || msgLower.includes('coimbatore')) {
        return `🚍 [TransitIQ Optimal Coimbatore Route Suggestion]:
Key Coimbatore Transit Corridors:
1. 🌟 Recommended: Route 3A (Ukkadam ↔ Singanallur, arriving in 3 mins, only 40% crowd, seats guaranteed).
2. Route 70: Gandhipuram ↔ CODISSIA & Airport (76% crowd, steady Avinashi Road transit).
3. Route 12: Overcrowded (134% IT rush) — receiving +2 extra relief buses right now.
We recommend boarding Route 3A or Route 70 to save 10+ minutes and travel comfortably!`;
      }
      return `Hello! I am your TransitIQ Coimbatore Smart Transit Assistant.
I can help you with:
- Finding the fastest & least crowded routes across Coimbatore (Gandhipuram, Saravanampatti, Ukkadam, Singanallur, Peelamedu)
- Route optimization insights (where extra buses are deployed on Avinashi Road & Sathy Road)
- Advance notification for broken-down buses with relief bus ETAs
- Live timings, fares, and optimal transfer points.
How can I assist your Coimbatore journey today?`;
    }
  }
}

// Transit Data Endpoint
app.get('/api/transit-data', (req, res) => {
  res.json({
    success: true,
    data: transitState
  });
});

// Simulation Actions Endpoint
app.post('/api/simulate', (req, res) => {
  const { action } = req.body;

  if (action === 'apply_optimization') {
    transitState.optimizationApplied = true;
    transitState.routes[0].crowdingPercent = 82;
    transitState.routes[0].busesPerHour = 8;
    transitState.routes[0].headwayMin = 7.5;
    transitState.routes[0].avgWaitMin = 6.2;
    transitState.routes[0].status = "OPTIMIZED (+2 EXTRA BUSES)";
    transitState.routes[0].tamilStatus = "மேம்படுத்தப்பட்டது (+2 கூடுதல் பேருந்துகள்)";
    transitState.routes[0].color = "#10B981";

    if (transitState.routes[1]) {
      transitState.routes[1].crowdingPercent = 52;
      transitState.routes[1].busesPerHour = 4;
      transitState.routes[1].headwayMin = 15;
      transitState.routes[1].avgWaitMin = 6.5;
      transitState.routes[1].status = "BALANCED (-1 IDLE BUS CANCELLED/TRANSFERRED)";
      transitState.routes[1].tamilStatus = "சீரமைக்கப்பட்டது (-1 வீண் பேருந்து ரத்து/மாற்றம்)";
      transitState.routes[1].color = "#16A34A";
    }
  } else if (action === 'reset_optimization') {
    transitState.optimizationApplied = false;
    transitState.routes[0].crowdingPercent = 134;
    transitState.routes[0].busesPerHour = 4;
    transitState.routes[0].headwayMin = 15;
    transitState.routes[0].avgWaitMin = 15.4;
    transitState.routes[0].status = "OVERCROWDED (NEEDS EXTRA BUSES)";
    transitState.routes[0].tamilStatus = "அதிக கூட்டம் (கூடுதல் பேருந்துகள் தேவை)";
    transitState.routes[0].color = "#EF4444";

    if (transitState.routes[1]) {
      transitState.routes[1].crowdingPercent = 40;
      transitState.routes[1].busesPerHour = 5;
      transitState.routes[1].headwayMin = 12;
      transitState.routes[1].avgWaitMin = 5.5;
      transitState.routes[1].status = "UNDERCROWDED (SEATS AVAILABLE)";
      transitState.routes[1].tamilStatus = "குறைந்த கூட்டம் (இருக்கைகள் உள்ளன)";
      transitState.routes[1].color = "#10B981";
    }
  } else if (action === 'resolve_breakdown') {
    transitState.breakdowns = [];
  } else if (action === 'trigger_breakdown') {
    transitState.breakdowns = [
      {
        busId: "TN-38-N-2914",
        routeNumber: "12",
        routeName: "Gandhipuram to Saravanampatti IT Park via Ganapathy",
        tamilRouteName: "காந்திபுரம் - சரவணம்பட்டி (கணபதி வழி)",
        location: "Near Ganapathy Signal (Sathy Road)",
        tamilLocation: "கணபதி சிக்னல் அருகில் (சத்தி ரோடு)",
        issue: "Alternator & Electrical Circuit Failure",
        tamilIssue: "ஆல்டர்னேட்டர் & மின்சுற்று கோளாறு",
        status: "Repairs In Progress - Passengers Evacuated to Platform",
        tamilStatus: "பழுதுபார்க்கும் பணி நடக்கிறது - பயணிகள் மேடையில்",
        backupReliefBus: "TN-38-N-6602 (Relief Express)",
        reliefETA: "4 minutes away",
        tamilReliefETA: "4 நிமிடங்களில் வந்து சேரும்",
        recommendedAlternates: ["Route 3A (Arriving 3 mins, 40% crowd)", "Route 70 (Arriving 5 mins, 76% crowd)"],
        tamilRecommendedAlternates: ["வழித்தடம் 3A (3 நிமிடங்களில் வரும், 40% கூட்டம்)", "வழித்தடம் 70 (5 நிமிடங்களில் வரும், 76% கூட்டம்)"],
        timestamp: new Date().toLocaleTimeString()
      }
    ];
  }

  res.json({
    success: true,
    data: transitState
  });
});

// Supabase Status Endpoint
app.get('/api/supabase/status', async (req, res) => {
  try {
    const health = await fetch(`${SUPABASE_URL}/auth/v1/health`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    });
    res.json({
      connected: health.ok,
      projectUrl: SUPABASE_URL,
      projectId: 'blnpwkcryalhyezmrmzp',
      status: health.ok ? 'online' : 'error'
    });
  } catch (err) {
    res.json({
      connected: false,
      error: err.message,
      projectUrl: SUPABASE_URL,
      status: 'offline'
    });
  }
});

// High-Fidelity Text-to-Speech Endpoint supporting authentic Tamil & English
app.get('/api/tts', async (req, res) => {
  const { text, lang = 'ta' } = req.query;
  if (!text || !text.trim()) {
    return res.status(400).send("Text query is required");
  }

  try {
    // Strip markdown formatting, emojis, brackets and symbols that hinder speech synthesis
    const cleanText = text
      .replace(/[*_#`~[\]()>]/g, ' ')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) {
      return res.status(400).send("Cleaned text is empty");
    }

    // Split text into chunks <= 150 chars to adhere to upstream TTS limits
    const sentences = cleanText.match(/[^.!?\n]+[.!?\n]*/g) || [cleanText];
    const chunks = [];
    let cur = "";

    for (const s of sentences) {
      if ((cur + " " + s).trim().length <= 150) {
        cur = (cur + " " + s).trim();
      } else {
        if (cur) chunks.push(cur);
        if (s.length > 150) {
          const words = s.split(' ');
          let wChunk = "";
          for (const w of words) {
            if ((wChunk + " " + w).trim().length <= 150) {
              wChunk = (wChunk + " " + w).trim();
            } else {
              if (wChunk) chunks.push(wChunk);
              wChunk = w;
            }
          }
          if (wChunk) chunks.push(wChunk);
          cur = "";
        } else {
          cur = s.trim();
        }
      }
    }
    if (cur) chunks.push(cur);

    // Limit to max 3 chunks for swift and responsive speech output
    const safeChunks = chunks.slice(0, 3);

    const buffers = await Promise.all(
      safeChunks.map(async (chunk) => {
        const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(chunk)}&tl=${encodeURIComponent(lang)}&client=tw-ob`;
        const resp = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });
        if (!resp.ok) throw new Error(`Upstream TTS returned ${resp.status}`);
        return Buffer.from(await resp.arrayBuffer());
      })
    );

    const combinedBuffer = Buffer.concat(buffers);
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Length', combinedBuffer.length);
    res.setHeader('Cache-Control', 'public, max-age=3600');
    return res.send(combinedBuffer);
  } catch (err) {
    console.error("TTS endpoint error:", err.message);
    return res.status(500).json({ error: "TTS generation failed", details: err.message });
  }
});

// Chatbot API Endpoint
app.post('/api/chat', async (req, res) => {
  const { message, role = 'passenger', language = 'en' } = req.body;

  if (!message || message.trim() === '') {
    return res.status(400).json({ error: 'Message cannot be empty' });
  }

  const isTamil = language === 'ta' || /[\u0B80-\u0BFF]/.test(message);

  // System prompt tailored according to role and language
  const systemPrompt = role === 'operator'
    ? `You are TransitIQ Depot Operations AI, an intelligent transit dispatch & fleet management copilot for bus operators and depot managers in Coimbatore City.
CURRENT LIVE CONTEXT:
- Corridor: Gandhipuram ↔ Saravanampatti IT Corridor (3 parallel routes: Route 12, Route 3A, Route 70).
- Route 12 status: Overcrowded (134% capacity, 15.4 min wait). Needs +2 extra buses to reduce headway and wait times.
- Route 3A status: Optimal (40% capacity, 5.5 min wait, empty seats). Needs fewer buses to prevent running empty vehicles.
- Route 70 status: Moderate (76% capacity, 7.8 min wait on Avinashi Road).
- Active Breakdown: Bus TN-38-N-2914 on Route 12 suffered electrical failure at Ganapathy Signal on Sathy Road. Standby relief bus TN-38-N-6602 dispatched (4 mins away).
- Recommendation Rule: Crowding >100% requires adding 2 buses to crowded routes, reducing wait to 6.2 mins and crowding to 82%.

YOUR INSTRUCTIONS:
- You are addressing the BUS OPERATOR / DEPOT MANAGER.
- Provide data-driven, operational advice on scheduling, headways, bus additions to crowded sectors, and mechanical breakdown dispatch in Coimbatore.
- Emphasize the core route optimization rule: crowded areas need extra buses, and less-crowded areas need low buses to balance overall fleet efficiency.
- If language is Tamil (${isTamil ? 'YES' : 'NO'}), answer thoroughly and naturally in TAMIL (தமிழ்).
- Keep responses professional, clear, concise (3-5 sentences), and cite the simulation figures. Always mention that data is simulated for the project demo.`
    : `You are TransitIQ Passenger Assistant, a friendly and accurate AI helper for public transit passengers in Coimbatore City.
CURRENT LIVE CONTEXT:
- Corridor: Coimbatore City (Gandhipuram, Saravanampatti, Ukkadam, Singanallur, Peelamedu, Hope College, CODISSIA, Airport).
- Route 12: Highly crowded (134% full), long wait (15.4 mins) — receiving extra relief buses.
- Route 3A: Best route! Less crowded (only 40% full, plenty of seats), arrives every 5-12 mins.
- Route 70: Moderate crowd (76%), steady transit along Avinashi Road.
- Bus Breakdown Alert: Bus TN-38-N-2914 (Route 12) is broken down at Ganapathy Signal. Tell passenger NOT to worry: Relief bus TN-38-N-6602 arrives in 4 mins, or they can hop on Route 3A or Route 70 immediately.

YOUR INSTRUCTIONS:
- You are addressing a PASSENGER.
- Be helpful, polite, reassuring, and give direct guidance on which bus to take, how to avoid crowds, and breakdown relief options in Coimbatore.
- If language is Tamil (${isTamil ? 'YES' : 'NO'}), answer fluently and politely in TAMIL (தமிழ்).
- Keep answers under 4 sentences with clear bullet points. Mention simulated transit intelligence.`;

  if (!GROQ_API_KEY) {
    const fallback = generateSmartFallback(message, role, language);
    return res.json({ reply: fallback, source: "TransitIQ Local Intelligence Engine" });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        temperature: 0.3,
        max_tokens: 450
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!response.ok) {
      console.warn("Groq API error, falling back to smart engine:", response.statusText);
      const fallback = generateSmartFallback(message, role, language);
      return res.json({ reply: fallback, source: "TransitIQ Local Intelligence Engine" });
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content;
    if (reply) {
      return res.json({ reply, source: "TransitIQ Groq GenAI" });
    } else {
      const fallback = generateSmartFallback(message, role, language);
      return res.json({ reply: fallback, source: "TransitIQ Local Intelligence Engine" });
    }
  } catch (err) {
    console.warn("Groq API request failed or timed out, utilizing smart fallback:", err.message);
    const fallback = generateSmartFallback(message, role, language);
    return res.json({ reply: fallback, source: "TransitIQ Local Intelligence Engine" });
  }
});

// Serve frontend assets built in dist (supports both root and /Transit--IQ base path)
app.use('/Transit--IQ', express.static(distPath));
app.use(express.static(distPath));

// Wildcard fallback to index.html for SPA
app.get('/Transit--IQ/*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`TransitIQ server running on port ${PORT} -> http://localhost:${PORT}`);
});
