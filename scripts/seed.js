import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

// Read configuration from environment variables with safe fallbacks
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://blnpwkcryalhyezmrmzp.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || 'sb_publishable_D9j_QMePAR8zqD4QH2H0wA_q_Sbplux';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

console.log('--- Seeding Coimbatore TransitIQ Data into Supabase ---');
console.log('Target URL:', SUPABASE_URL);

// 1. Coimbatore Routes
const COIMBATORE_ROUTES = [
  { id: 1, route_number: '12', route_name: 'Gandhipuram ↔ Saravanampatti IT Park', start_location: 'Gandhipuram Central Bus Stand', end_location: 'Saravanampatti CHIL SEZ' },
  { id: 2, route_number: '3A', route_name: 'Ukkadam ↔ Singanallur Bus Terminal', start_location: 'Ukkadam Bus Terminal', end_location: 'Singanallur Bus Stand' },
  { id: 3, route_number: '70', route_name: 'Gandhipuram ↔ CODISSIA & Airport', start_location: 'Gandhipuram Central Bus Stand', end_location: 'Coimbatore International Airport' },
  { id: 4, route_number: '1', route_name: 'Ukkadam ↔ Vadavalli', start_location: 'Ukkadam Bus Terminal', end_location: 'Vadavalli Terminal' },
  { id: 5, route_number: '23C', route_name: 'Coimbatore Junction ↔ Thudiyalur', start_location: 'Coimbatore Junction Railway Station', end_location: 'Thudiyalur Bus Stand' },
  { id: 6, route_number: '90', route_name: 'Gandhipuram ↔ Sulur Aero Terminal', start_location: 'Gandhipuram Central Bus Stand', end_location: 'Sulur Aero Terminal' },
  { id: 7, route_number: '15', route_name: 'Ukkadam ↔ Peelamedu & Hope College', start_location: 'Ukkadam Bus Terminal', end_location: 'Hope College (Avinashi Road)' },
  { id: 8, route_number: '82', route_name: 'Coimbatore Junction ↔ Podanur Junction', start_location: 'Coimbatore Junction Railway Station', end_location: 'Podanur Junction' },
  { id: 9, route_number: '11A', route_name: 'Singanallur ↔ Gandhipuram via Lakshmi Mills', start_location: 'Singanallur Bus Stand', end_location: 'Gandhipuram Central Bus Stand' },
  { id: 10, route_number: '33', route_name: 'Gandhipuram ↔ Perur Temple', start_location: 'Gandhipuram Central Bus Stand', end_location: 'Perur Temple Arch' }
];

// 2. Coimbatore Stops
const COIMBATORE_STOPS = [
  { id: 1, stop_name: 'Gandhipuram Central Bus Stand', latitude: 11.0168, longitude: 76.9673 },
  { id: 2, stop_name: 'Ukkadam Bus Terminal', latitude: 10.9934, longitude: 76.9610 },
  { id: 3, stop_name: 'Singanallur Bus Terminal', latitude: 10.9997, longitude: 77.0252 },
  { id: 4, stop_name: 'Coimbatore Junction Railway Station', latitude: 10.9979, longitude: 76.9667 },
  { id: 5, stop_name: 'Peelamedu (PSG Tech)', latitude: 11.0264, longitude: 77.0105 },
  { id: 6, stop_name: 'Hope College (Avinashi Road)', latitude: 11.0279, longitude: 77.0182 },
  { id: 7, stop_name: 'CODISSIA Trade Fair Complex', latitude: 11.0360, longitude: 77.0340 },
  { id: 8, stop_name: 'Coimbatore International Airport', latitude: 11.0300, longitude: 77.0434 },
  { id: 9, stop_name: 'Saravanampatti (IT Corridor / SEZ)', latitude: 11.0827, longitude: 76.9960 },
  { id: 10, stop_name: 'Saibaba Colony (Mettupalayam Road)', latitude: 11.0298, longitude: 76.9450 },
  { id: 11, stop_name: 'Thudiyalur Bus Stand', latitude: 11.0776, longitude: 76.9385 },
  { id: 12, stop_name: 'RS Puram (DB Road)', latitude: 11.0085, longitude: 76.9485 },
  { id: 13, stop_name: 'Town Hall (Clock Tower)', latitude: 10.9965, longitude: 76.9605 },
  { id: 14, stop_name: 'Brookefields Mall', latitude: 11.0097, longitude: 76.9600 },
  { id: 15, stop_name: 'Fun Republic Mall (Peelamedu)', latitude: 11.0250, longitude: 77.0020 },
  { id: 16, stop_name: 'Vadavalli Terminal', latitude: 11.0300, longitude: 76.9015 },
  { id: 17, stop_name: 'Podanur Junction', latitude: 10.9635, longitude: 76.9950 },
  { id: 18, stop_name: 'Sulur Aero Terminal', latitude: 11.0256, longitude: 77.1265 },
  { id: 19, stop_name: 'Ganapathy Bus Stop', latitude: 11.0385, longitude: 76.9802 },
  { id: 20, stop_name: 'Ramanathapuram Junction', latitude: 10.9942, longitude: 76.9890 }
];

// 3. Route Stops Links
const COIMBATORE_ROUTE_STOPS = [
  { id: 1, route_id: 1, stop_id: 1, stop_order: 1 },
  { id: 2, route_id: 1, stop_id: 19, stop_order: 2 },
  { id: 3, route_id: 1, stop_id: 9, stop_order: 3 },
  { id: 4, route_id: 2, stop_id: 2, stop_order: 1 },
  { id: 5, route_id: 2, stop_id: 13, stop_order: 2 },
  { id: 6, route_id: 2, stop_id: 20, stop_order: 3 },
  { id: 7, route_id: 2, stop_id: 3, stop_order: 4 },
  { id: 8, route_id: 3, stop_id: 1, stop_order: 1 },
  { id: 9, route_id: 3, stop_id: 15, stop_order: 2 },
  { id: 10, route_id: 3, stop_id: 5, stop_order: 3 },
  { id: 11, route_id: 3, stop_id: 6, stop_order: 4 },
  { id: 12, route_id: 3, stop_id: 7, stop_order: 5 },
  { id: 13, route_id: 3, stop_id: 8, stop_order: 6 },
  { id: 14, route_id: 4, stop_id: 2, stop_order: 1 },
  { id: 15, route_id: 4, stop_id: 13, stop_order: 2 },
  { id: 16, route_id: 4, stop_id: 12, stop_order: 3 },
  { id: 17, route_id: 4, stop_id: 16, stop_order: 4 },
  { id: 18, route_id: 5, stop_id: 4, stop_order: 1 },
  { id: 19, route_id: 5, stop_id: 14, stop_order: 2 },
  { id: 20, route_id: 5, stop_id: 10, stop_order: 3 },
  { id: 21, route_id: 5, stop_id: 11, stop_order: 4 }
];

// 4. Hazards & Weather Alerts
const COIMBATORE_HAZARDS = [
  {
    name: 'Avinashi Road Flyover / Peelamedu Underpass',
    tamil_name: 'அவினாசி சாலை மேம்பாலம் / பீளமேடு சுரங்கப்பாதை',
    severity: 'high',
    water_depth: 'Heavy Monsoon Waterlogging (1.4 ft)',
    affected_routes: ['Route 70', 'Route 15'],
    detour_action: 'Diverted via Trichy Road / Singanallur (+8 mins)',
    latitude: 11.0264,
    longitude: 77.0105,
    is_active: true
  },
  {
    name: 'CODISSIA Trade Fair Complex Event Surge',
    tamil_name: 'கொடிசியா தொழிற்காட்சி அரங்கம் கூட்ட நெரிசல்',
    severity: 'medium',
    water_depth: 'Industrial Expo Peak Commuter Surge',
    affected_routes: ['Route 70'],
    detour_action: '+3 Extra Shuttle buses deployed to absorb passenger overflow',
    latitude: 11.0360,
    longitude: 77.0340,
    is_active: true
  },
  {
    name: 'Ukkadam Bus Terminal Flyover Construction Detour',
    tamil_name: 'உக்கடம் பேருந்து நிலைய மேம்பால பணி மாற்றுப்பாதை',
    severity: 'medium',
    water_depth: 'Single Lane Chokepoint (Slow Moving)',
    affected_routes: ['Route 3A', 'Route 1'],
    detour_action: 'Traffic police single-lane marshaling active',
    latitude: 10.9934,
    longitude: 76.9610,
    is_active: true
  }
];

// 5. Fleet Breakdowns
const COIMBATORE_BREAKDOWNS = [
  {
    bus_id: 'TN-38-N-2914',
    route_code: '12',
    location: 'Ganapathy Signal (Sathy Road)',
    tamil_location: 'கணபதி சிக்னல் (சத்தி ரோடு)',
    issue: 'Alternator & Electrical Circuit Failure',
    status: 'Repairs In Progress - Passengers Evacuated',
    relief_bus: 'TN-38-N-6602',
    relief_eta: '4 mins',
    passengers_affected: 48
  },
  {
    bus_id: 'TN-38-N-1845',
    route_code: '70',
    location: 'Hope College Junction (Avinashi Road)',
    tamil_location: 'ஹோப் காலேஜ் சந்திப்பு (அவினாசி சாலை)',
    issue: 'Radiator Overheating (Under Observation)',
    status: 'Standby Unit Dispatched',
    relief_bus: 'TN-38-N-9021',
    relief_eta: '6 mins',
    passengers_affected: 34
  }
];

// 6. Optimizations
const COIMBATORE_OPTIMIZATIONS = [
  {
    corridor: 'Gandhipuram - Saravanampatti IT Corridor',
    before_wait_min: 15.4,
    after_wait_min: 6.2,
    before_crowding: 134,
    after_crowding: 82,
    buses_added: 2,
    rule_applied: 'Rule #R-104 (Capacity Surge Balancing)'
  },
  {
    corridor: 'Ukkadam - Singanallur Trichy Road Corridor',
    before_wait_min: 12.0,
    after_wait_min: 5.5,
    before_crowding: 40,
    after_crowding: 48,
    buses_added: 1,
    rule_applied: 'Rule #R-102 (Headway Streamlining)'
  }
];

// 7. Chat Inquiries
const COIMBATORE_INQUIRIES = [
  {
    role: 'passenger',
    language: 'en',
    message: 'Which bus should I take to reach Saravanampatti IT Park from Gandhipuram?',
    reply: 'Take Route 12! Extra relief buses have been deployed due to peak morning IT surge, bringing average wait time down to 6.2 mins. Alternatively, board Route 70 for Avinashi road connection.'
  },
  {
    role: 'passenger',
    language: 'ta',
    message: 'காந்திபுரத்திலிருந்து சரவணம்பட்டி ஐடி பார்க் செல்ல எந்த பேருந்து சிறந்தது?',
    reply: 'வழித்தடம் 12-ஐப் பயன்படுத்தவும்! உச்சநேர கூட்ட நெரிசலைக் குறைக்க 2 கூடுதல் பேருந்துகள் இயக்கப்படுவதால் காத்திருப்பு நேரம் 6 நிமிடங்களாக குறைக்கப்பட்டுள்ளது.'
  },
  {
    role: 'operator',
    language: 'en',
    message: 'Corridor demand status for Route 12 at Ganapathy Signal?',
    reply: 'Critical peak demand detected: 134% occupancy. Standby relief bus TN-38-N-6602 deployed to absorb passenger overflow. Reallocate low-capacity buses from Route 3A.'
  },
  {
    role: 'operator',
    language: 'ta',
    message: 'உக்கடம் - சிங்காநல்லூர் வழித்தடம் 3A நிலை என்ன?',
    reply: 'வழித்தடம் 3A-ல் 40% மட்டுமே கூட்டம் உள்ளது (இருக்கைகள் காலியாக உள்ளன). இங்குள்ள உதிரிப் பேருந்துகளை அதிக நெரிசல் உள்ள வழித்தடம் 12-க்கு மாற்றி இயக்கலாம்.'
  }
];

async function seedTable(tableName, rows) {
  try {
    const { data, error } = await supabase.from(tableName).upsert(rows, { onConflict: 'id' });
    if (error) {
      console.warn(`  [!] Error inserting into ${tableName}:`, error.message, error.hint || '');
      return { table: tableName, success: false, error: error.message };
    }
    console.log(`  [✓] Successfully upserted ${rows.length} rows into '${tableName}'`);
    return { table: tableName, success: true, count: rows.length };
  } catch (err) {
    console.warn(`  [!] Exception inserting into ${tableName}:`, err.message);
    return { table: tableName, success: false, error: err.message };
  }
}

async function verifyCounts() {
  console.log('\n--- Row Count Verification Across Tables ---');
  const tables = ['routes', 'stops', 'route_stops', 'transit_hazards', 'fleet_breakdowns', 'corridor_optimizations', 'passenger_inquiries'];
  for (const t of tables) {
    try {
      const { count, error } = await supabase.from(t).select('*', { count: 'exact', head: true });
      if (error) {
        console.log(`Table '${t}': Status - RLS or Schema restricted (${error.message})`);
      } else {
        console.log(`Table '${t}': ${count} live rows`);
      }
    } catch (e) {
      console.log(`Table '${t}': Error reading count`);
    }
  }
}

async function runSeed() {
  console.log('Seeding Coimbatore master tables...');
  await seedTable('routes', COIMBATORE_ROUTES);
  await seedTable('stops', COIMBATORE_STOPS);
  await seedTable('route_stops', COIMBATORE_ROUTE_STOPS);
  await seedTable('transit_hazards', COIMBATORE_HAZARDS);
  await seedTable('fleet_breakdowns', COIMBATORE_BREAKDOWNS);
  await seedTable('corridor_optimizations', COIMBATORE_OPTIMIZATIONS);
  await seedTable('passenger_inquiries', COIMBATORE_INQUIRIES);

  await verifyCounts();
  console.log('\nSeed process finished.');
}

runSeed();
