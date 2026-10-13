import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const SUPABASE_URL = (rawUrl && typeof rawUrl === 'string' && rawUrl.trim()) ? rawUrl.trim() : 'https://blnpwkcryalhyezmrmzp.supabase.co';
export const SUPABASE_ANON_KEY = (rawKey && typeof rawKey === 'string' && rawKey.trim()) ? rawKey.trim() : 'sb_publishable_D9j_QMePAR8zqD4QH2H0wA_q_Sbplux';

let client = null;
try {
  if (SUPABASE_URL && SUPABASE_ANON_KEY && SUPABASE_URL.startsWith('http')) {
    client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
} catch (err) {
  console.warn('Supabase client initialization warning:', err.message);
}

export const supabase = client;
export const isSupabaseConfigured = Boolean(client);

/**
 * Verifies live connection to Supabase project
 */
export async function checkSupabaseConnection() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_URL.startsWith('http')) {
    return false;
  }
  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/health`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    return res.ok;
  } catch (err) {
    console.warn('Supabase health check failed:', err);
    return false;
  }
}

/**
 * Log passenger or operator chat interactions into Supabase
 */
export async function logChatInteraction(payload) {
  if (!supabase) return;
  try {
    const { error } = await supabase.from('passenger_inquiries').insert([
      {
        message: payload.message,
        reply: payload.reply,
        role: payload.role,
        language: payload.language,
        timestamp: new Date().toISOString()
      }
    ]);
    if (error && error.code !== 'PGRST205') {
      console.warn('Supabase chat log error:', error.message);
    }
  } catch (err) {
    // Non-blocking
  }
}

/**
 * Log fleet breakdown alerts into Supabase
 */
export async function logFleetBreakdown(breakdown) {
  if (!supabase) return;
  try {
    const { error } = await supabase.from('fleet_breakdowns').insert([
      {
        bus_id: breakdown.busId,
        route_code: breakdown.routeCode,
        location: breakdown.location,
        issue: breakdown.issue,
        relief_bus: breakdown.reliefBus,
        relief_eta: breakdown.reliefETA,
        timestamp: new Date().toISOString()
      }
    ]);
    if (error && error.code !== 'PGRST205') {
      console.warn('Supabase breakdown log error:', error.message);
    }
  } catch (err) {
    // Non-blocking
  }
}

/**
 * Log AI corridor optimization events
 */
export async function logOptimizationEvent(metrics) {
  if (!supabase) return;
  try {
    const { error } = await supabase.from('corridor_optimizations').insert([
      {
        corridor: 'Chennai Central - Tambaram',
        before_wait_min: 14.2,
        after_wait_min: 6.8,
        before_crowding: 128,
        after_crowding: 84,
        buses_added: 2,
        timestamp: new Date().toISOString()
      }
    ]);
    if (error && error.code !== 'PGRST205') {
      console.warn('Supabase optimization log error:', error.message);
    }
  } catch (err) {
    // Non-blocking
  }
}
