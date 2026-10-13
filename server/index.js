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
  activeCorridor: "Chennai Central - Tambaram Corridor",
  weather: "Clear (Normal Traffic Watch)",
  peakHour: true,
  congestionHotspots: [
    {
      id: "hotspot-1",
      name: "Kathipara Junction & Guindy Corridor",
      tamilName: "கத்திப்பாரா சந்திப்பு & கிண்டி வழித்தடம்",
      status: "High Commuter Surge (Queue Overflows)",
      tamilStatus: "அதிக கூட்ட நெரிசல் (கூடுதல் பேருந்துகள் தேவை)",
      affectedRoutes: ["Route 29C (Anna Salai Direct)"],
      recommendation: "Deploy +2 relief buses to absorb surge",
      tamilRecommendation: "29C-க்கு +2 கூடுதல் பேருந்துகள் ஒதுக்குதல்",
      lat: 13.0067,
      lng: 80.2023,
      radius: 650
    },
    {
      id: "hotspot-2",
      name: "Velachery Main Junction",
      tamilName: "வேளச்சேரி பிரதான சந்திப்பு",
      status: "Steady Commuter Flow",
      tamilStatus: "சீரான பயணிகள் இயக்கம்",
      affectedRoutes: ["Route 21M (Express Velachery)"],
      recommendation: "Regular 15-minute headway maintained",
      tamilRecommendation: "வழக்கமான 15 நிமிட இடைவேளை தொடர்கிறது",
      lat: 12.9792,
      lng: 80.2212,
      radius: 400
    }
  ],
  breakdowns: [
    {
      busId: "TN-01-N-4429",
      routeNumber: "29C",
      routeName: "Central to Tambaram via Mount Road",
      tamilRouteName: "மத்திய நிலையம் - தாம்பரம் (மவுண்ட் ரோடு வழி)",
      location: "Near T. Nagar Panagal Park",
      tamilLocation: "தி.நகர் பனகல் பார்க் அருகில்",
      issue: "Engine Cooling System Failure",
      tamilIssue: "இயந்திர குளிர்விப்பு அமைப்பு கோளாறு",
      status: "Repairs In Progress - Passengers Evacuated to Platform",
      tamilStatus: "பழுதுபார்க்கும் பணி நடக்கிறது - பயணிகள் மேடையில்",
      backupReliefBus: "TN-01-N-8802 (Relief Express)",
      reliefETA: "5 minutes away",
      tamilReliefETA: "5 நிமிடங்களில் வந்து சேரும்",
      recommendedAlternates: ["Route 15B (Arriving 2 mins, 40% crowd)", "Route 70 Express (Arriving 4 mins, 55% crowd)"],
      tamilRecommendedAlternates: ["வழித்தடம் 15B (2 நிமிடங்களில் வரும், 40% கூட்டம்)", "வழித்தடம் 70 விரைவு (4 நிமிடங்களில் வரும், 55% கூட்டம்)"],
      timestamp: new Date().toLocaleTimeString()
    }
  ],
  routes: [
    {
      id: "route-a",
      name: "Route 29C",
      subtitle: "Chennai Central ↔ Tambaram (Mount Road Corridor)",
      tamilName: "வழித்தடம் 29C (மத்திய நிலையம் ↔ தாம்பரம்)",
      status: "OVERCROWDED (NEEDS EXTRA BUSES)",
      tamilStatus: "அதிக கூட்டம் (கூடுதல் பேருந்துகள் தேவை)",
      crowdingPercent: 128,
      demandPerHour: 420,
      busCapacity: 70,
      busesPerHour: 4,
      headwayMin: 15,
      avgWaitMin: 14,
      color: "#EF4444",
      alert: "Heavy crowding! Extra buses recommended or board Route 15B.",
      tamilAlert: "அதிக நெரிசல்! கூடுதல் பேருந்துகள் இயக்கப்படுகின்றன அல்லது 15B தேர்ந்தெடுக்கவும்.",
      stops: [
        "Chennai Central", "LIC / Anna Salai", "Thousand Lights",
        "Teynamppet", "Nandanam", "Saidapet", "Guindy",
        "Kathipara", "Airport", "Pallavaram", "Tambaram"
      ]
    },
    {
      id: "route-b",
      name: "Route 15B",
      subtitle: "Central ↔ Tambaram via 100ft Inner Ring Road (Alternate)",
      tamilName: "வழித்தடம் 15B (100 அடி உள்வட்டச் சாலை வழி)",
      status: "OPTIMAL (SEATS AVAILABLE)",
      tamilStatus: "சிறந்தது (இருக்கைகள் உள்ளன)",
      crowdingPercent: 42,
      demandPerHour: 180,
      busCapacity: 70,
      busesPerHour: 5,
      headwayMin: 12,
      avgWaitMin: 5,
      color: "#10B981",
      alert: "Fast moving, seats guaranteed, 58% empty capacity.",
      tamilAlert: "வேகமாக செல்லும், 58% காலி இருக்கைகள், சிறந்த தேர்வு.",
      stops: [
        "Chennai Central", "Egmore", "Chetpet", "Aminjikarai",
        "Koyambedu", "Ashok Nagar", "Ekkatuthangal", "Guindy Estate",
        "Pallavaram", "Chromepet", "Tambaram"
      ]
    },
    {
      id: "route-c",
      name: "Route 21M",
      subtitle: "Central ↔ Tambaram via Velachery Bypass",
      tamilName: "வழித்தடம் 21M (வேளச்சேரி புறவழிச்சாலை)",
      status: "MODERATE",
      tamilStatus: "மிதமான கூட்டம்",
      crowdingPercent: 78,
      demandPerHour: 280,
      busCapacity: 70,
      busesPerHour: 4,
      headwayMin: 15,
      avgWaitMin: 8,
      color: "#F59E0B",
      alert: "Steady flow, standard 15 min headway.",
      tamilAlert: "சீரான இயக்கம், 15 நிமிட இடைவேளை.",
      stops: [
        "Chennai Central", "Marina Beach", "Mylapore", "Adyar",
        "SRP Tools", "Velachery", "Medavakkam", "Tambaram East"
      ]
    }
  ],
  optimizationApplied: false,
  optimizationMetrics: {
    before: { avgWait: "14.2 min", maxCrowding: "128%", serviceHeadway: "15 min" },
    after: { avgWait: "6.8 min", maxCrowding: "84%", serviceHeadway: "7.5 min" },
    action: "Deployed +2 relief buses to crowded Route 29C & reallocated idle capacity from Route 15B"
  }
};

// Fallback response engine for Passenger and Operator in Tamil & English
function generateSmartFallback(message, role, language) {
  const msgLower = (message || "").toLowerCase();
  const isTamil = language === 'ta' || /[\u0B80-\u0BFF]/.test(message);

  if (role === 'operator') {
    if (isTamil) {
      if (msgLower.includes('breakdown') || msgLower.includes('பழுது') || msgLower.includes('என்ஜின்')) {
        return `🛠️ [டிப்போ மேலாளர் எச்சரிக்கை - பழுது தகவல்]:
பேருந்து எண் TN-01-N-4429 (வழித்தடம் 29C) தி.நகர் பனகல் பார்க் அருகில் பழுதாகியுள்ளது.
- நிவாரண பேருந்து TN-01-N-8802 உடனே அனுப்பப்பட்டுள்ளது (வருகை: 5 நிமிடங்கள்).
- பயணிகள் மாற்றுப் பேருந்தான 15B-க்கு வழிகாட்டப்பட்டுள்ளனர்.
- பழுதுநீக்கும் மொபைல் குழு சம்பவ இடத்திற்கு விரைந்துள்ளது.`;
      }
      return `📊 [TransitIQ இயக்குனர் பகுப்பாய்வு - வழித்தட உகப்பாக்கம்]:
- அதிக கூட்டம் உள்ள வழித்தடம் 29C-ல் உச்சநேர நெரிசல் 128% எட்டியுள்ளது (காத்திருப்பு: 14 நிமி). இதற்கு +2 கூடுதல் பேருந்துகள் உடனடியாகத் தேவை!
- குறைந்த கூட்டம் உள்ள வழித்தடம் 15B-ல் (42% ஆக்கிரமிப்பு) பேருந்துகளைக் குறைத்து/சீரமைத்து, அந்த கூடுதல் பேருந்துகளை நெரிசல் மிகுந்த 29C வழித்தடத்திற்கு ஒதுக்க AI பரிந்துரைக்கிறது.
- இதன் மூலம் ஒட்டுமொத்த காத்திருப்பு நேரம் 14 நிமிடத்திலிருந்து 6.8 நிமிடங்களாகக் குறையும், நெரிசல் 84%-ஆகக் கட்டுப்படும்!`;
    } else {
      if (msgLower.includes('breakdown') || msgLower.includes('repair') || msgLower.includes('bus')) {
        return `🛠️ [Depot Commander Alert - Fleet Incident]:
Bus TN-01-N-4429 (Route 29C) reported engine cooling failure at T. Nagar Panagal Park.
- Relief bus TN-01-N-8802 dispatched immediately (ETA: 5 mins).
- Automated prior broadcast sent to waiting passengers recommending Route 15B.
- Mobile breakdown crane unit en route.`;
      }
      return `📊 [TransitIQ Corridor Optimization Intelligence]:
- Crowded Corridors Need Extra Buses: Route 29C reached 128% capacity with an average wait time of 14.2 minutes.
- Low Demand Corridors Need Fewer Buses: Route 15B operates at only 42% capacity with ample seating.
- Immediate AI Action: Reallocate and deploy 2 extra buses to Route 29C while maintaining efficient low-frequency allocation on Route 15B. This slashes average wait times by 52% (down to 6.8 mins).`;
    }
  } else {
    // Passenger mode
    if (isTamil) {
      if (msgLower.includes('breakdown') || msgLower.includes('பழுது') || msgLower.includes('நின்று')) {
        return `⚠️ [முக்கிய பயணிகள் அறிவிப்பு - பேருந்து பழுது]:
தி.நகர் பனகல் பார்க் அருகில் இயங்கி வந்த வழித்தடம் 29C (பேருந்து TN-01-N-4429) இயந்திரக் கோளாறு காரணமாக நிறுத்தப்பட்டுள்ளது.
✅ கவலைப்பட வேண்டாம்! மாற்று நிவாரண பேருந்து TN-01-N-8802 இன்னும் 5 நிமிடங்களில் அங்கு வந்து சேரும்.
👉 உடனடி பயணம் செய்ய: வழித்தடம் 15B (2 நிமிடங்களில் வரும், இருக்கைகள் காலியாக உள்ளன) தேர்ந்தெடுக்கலாம்!`;
      }
      if (msgLower.includes('route') || msgLower.includes('எந்த') || msgLower.includes('பேருந்து') || msgLower.includes('நேரம்') || msgLower.includes('கூட்டம்')) {
        return `🚍 [TransitIQ பயண வழிகாட்டி]:
நீங்கள் சென்னை மத்திய நிலையத்திலிருந்து தாம்பரம் செல்ல விரும்பினால்:
1. ⭐ சிறந்த தேர்வு: வழித்தடம் 15B (இன்னும் 2 நிமிடங்களில் வரும், 42% கூட்டம் மட்டுமே, காலியிடங்கள் உள்ளன).
2. வழித்தடம் 21M: இன்னும் 6 நிமிடங்களில் வரும் (78% கூட்டம், வேளச்சேரி வழி).
3. வழித்தடம் 29C: அதிக நெரிசல் (128% கூட்டம்) - இதற்கு கூடுதல் பேருந்துகள் இயக்கப்பட்டு வருகின்றன.
கூட்டம் இல்லாத சௌகரியமான பயணத்திற்கு வழித்தடம் 15B-ஐத் தேர்ந்தெடுக்கவும்!`;
      }
      return `வணக்கம்! நான் உங்கள் TransitIQ பேருந்து உதவியாளர்.
- எந்தப் பேருந்து எடுக்க வேண்டும்?
- கூட்டம் குறைந்த வழித்தடங்கள் எவை?
- நெரிசலைத் தவிர்க்க கூடுதல் பேருந்துகள் எங்கு இயக்கப்படுகின்றன?
- பழுதான பேருந்துக்கான நிவாரணப் பேருந்து நேரம் என்ன?
எந்தக் கேள்வியும் கேளுங்கள், உங்களுக்கு உதவ நான் தயாராக உள்ளேன்!`;
    } else {
      if (msgLower.includes('breakdown') || msgLower.includes('repair') || msgLower.includes('broke')) {
        return `⚠️ [Prior Breakdown Notice - Passenger Alert]:
Route 29C (Bus TN-01-N-4429) experienced an engine issue near T. Nagar Panagal Park.
✅ Relief Bus TN-01-N-8802 has already been dispatched and will arrive in 5 minutes!
👉 Fast Alternate: Board Route 15B arriving in 2 minutes (42% occupancy, plenty of seats available).`;
      }
      if (msgLower.includes('which bus') || msgLower.includes('suggest') || msgLower.includes('timing') || msgLower.includes('crowd') || msgLower.includes('optimize')) {
        return `🚍 [TransitIQ Optimal Route Suggestion]:
For traveling Central ↔ Tambaram:
1. 🌟 Recommended: Route 15B (Arriving in 2 mins, only 42% crowd, smooth road, seats guaranteed).
2. Route 21M: Arriving in 6 mins (78% crowd, steady transit).
3. Route 29C: Overcrowded (128% capacity) — receiving extra relief buses.
We recommend boarding Route 15B to save 12 minutes of waiting and travel in comfort!`;
      }
      return `Hello! I am your TransitIQ Smart Passenger Assistant.
I can help you with:
- Finding the fastest & least crowded bus routes
- Route optimization insights (where extra buses are deployed)
- Advance notification for broken-down buses with relief bus ETAs
- Live timings, fares, and optimal transfer points.
How can I assist your journey today?`;
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
    transitState.routes[0].crowdingPercent = 84;
    transitState.routes[0].busesPerHour = 8;
    transitState.routes[0].headwayMin = 7.5;
    transitState.routes[0].avgWaitMin = 6.8;
    transitState.routes[0].status = "OPTIMIZED (+2 EXTRA BUSES)";
    transitState.routes[0].tamilStatus = "மேம்படுத்தப்பட்டது (+2 கூடுதல் பேருந்துகள்)";
    transitState.routes[0].color = "#10B981";
  } else if (action === 'reset_optimization') {
    transitState.optimizationApplied = false;
    transitState.routes[0].crowdingPercent = 128;
    transitState.routes[0].busesPerHour = 4;
    transitState.routes[0].headwayMin = 15;
    transitState.routes[0].avgWaitMin = 14;
    transitState.routes[0].status = "OVERCROWDED (NEEDS EXTRA BUSES)";
    transitState.routes[0].tamilStatus = "அதிக கூட்டம் (கூடுதல் பேருந்துகள் தேவை)";
    transitState.routes[0].color = "#EF4444";
  } else if (action === 'resolve_breakdown') {
    transitState.breakdowns = [];
  } else if (action === 'trigger_breakdown') {
    transitState.breakdowns = [
      {
        busId: "TN-01-N-4429",
        routeNumber: "29C",
        routeName: "Central to Tambaram via Mount Road",
        tamilRouteName: "மத்திய நிலையம் - தாம்பரம் (மவுண்ட் ரோடு வழி)",
        location: "Near T. Nagar Panagal Park",
        tamilLocation: "தி.நகர் பனகல் பார்க் அருகில்",
        issue: "Engine Cooling System Failure",
        tamilIssue: "இயந்திர குளிர்விப்பு அமைப்பு கோளாறு",
        status: "Repairs In Progress - Passengers Evacuated to Platform",
        tamilStatus: "பழுதுபார்க்கும் பணி நடக்கிறது - பயணிகள் மேடையில்",
        backupReliefBus: "TN-01-N-8802 (Relief Express)",
        reliefETA: "5 minutes away",
        tamilReliefETA: "5 நிமிடங்களில் வந்து சேரும்",
        recommendedAlternates: ["Route 15B (Arriving 2 mins, 40% crowd)", "Route 70 Express (Arriving 4 mins, 55% crowd)"],
        tamilRecommendedAlternates: ["வழித்தடம் 15B (2 நிமிடங்களில் வரும், 40% கூட்டம்)", "வழித்தடம் 70 விரைவு (4 நிமிடங்களில் வரும், 55% கூட்டம்)"],
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
    ? `You are TransitIQ Depot Operations AI, an intelligent transit dispatch & fleet management copilot for bus operators and depot managers.
CURRENT LIVE CONTEXT:
- Corridor: Chennai Central ↔ Tambaram (3 parallel routes: Route 29C, Route 15B, Route 21M).
- Route 29C status: Overcrowded (128% capacity, 14 min wait). Needs +2 extra buses to reduce headway and wait times.
- Route 15B status: Optimal (42% capacity, 5 min wait, empty seats). Needs fewer buses to prevent running empty vehicles.
- Route 21M status: Moderate (78% capacity, 8 min wait).
- Active Breakdown: Bus TN-01-N-4429 on Route 29C suffered engine failure at T. Nagar Panagal park. Relief bus TN-01-N-8802 dispatched (5 mins away).
- Recommendation Rule: Crowding >100% requires adding 2 buses to crowded routes, reducing wait to 6.8 mins and crowding to 84%.

YOUR INSTRUCTIONS:
- You are addressing the BUS OPERATOR / DEPOT MANAGER.
- Provide data-driven, operational advice on scheduling, headways, bus additions to crowded sectors, and mechanical breakdown dispatch.
- Emphasize the core route optimization rule: crowded areas need extra buses, and less-crowded areas need low buses to balance overall fleet efficiency.
- If language is Tamil (${isTamil ? 'YES' : 'NO'}), answer thoroughly and naturally in TAMIL (தமிழ்).
- Keep responses professional, clear, concise (3-5 sentences), and cite the simulation figures. Always mention that data is simulated for the project demo.`
    : `You are TransitIQ Passenger Assistant, a friendly and accurate AI helper for public transit passengers.
CURRENT LIVE CONTEXT:
- Corridor: Chennai Central ↔ Tambaram.
- Route 29C: Highly crowded (128% full), long wait (14 mins) — receiving extra relief buses.
- Route 15B: Best route! Less crowded (only 42% full, plenty of seats), arrives every 5-12 mins.
- Route 21M: Moderate crowd (78%), steady transit.
- Bus Breakdown Alert: Bus TN-01-N-4429 (Route 29C) is broken down at T. Nagar. Tell passenger NOT to worry: Relief bus TN-01-N-8802 arrives in 5 mins, or they can hop on Route 15B immediately (arriving in 2 mins).

YOUR INSTRUCTIONS:
- You are addressing a PASSENGER.
- Be helpful, polite, reassuring, and give direct guidance on which bus to take, how to avoid crowds, and breakdown relief options.
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

// Serve frontend assets built in dist
app.use(express.static(distPath));

// Wildcard fallback to index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`TransitIQ server running on port ${PORT} -> http://localhost:${PORT}`);
});
