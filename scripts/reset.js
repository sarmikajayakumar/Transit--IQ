import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://blnpwkcryalhyezmrmzp.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || 'sb_publishable_D9j_QMePAR8zqD4QH2H0wA_q_Sbplux';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

console.log('--- Resetting Demo Data in Supabase ---');

async function resetTables() {
  const tables = ['route_stops', 'stops', 'routes', 'transit_hazards', 'fleet_breakdowns', 'corridor_optimizations', 'passenger_inquiries'];
  for (const t of tables) {
    try {
      const { error } = await supabase.from(t).delete().neq('id', 0);
      if (error) {
        console.warn(`[!] Table '${t}' reset note:`, error.message);
      } else {
        console.log(`[✓] Table '${t}' cleared.`);
      }
    } catch (e) {
      console.warn(`[!] Table '${t}' clear error:`, e.message);
    }
  }
}

resetTables().then(() => {
  console.log('Reset completed. Run "npm run seed" or "node scripts/seed.js" to re-seed.');
});
