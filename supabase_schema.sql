-- =========================================================================
-- TransitIQ — Supabase Database Schema
-- Project: https://blnpwkcryalhyezmrmzp.supabase.co
-- =========================================================================

-- 1. Transit Road Hazards & Flood Inundation Table
CREATE TABLE IF NOT EXISTS public.transit_hazards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    tamil_name TEXT,
    severity TEXT NOT NULL DEFAULT 'high',
    water_depth TEXT,
    affected_routes TEXT[],
    detour_action TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    is_active BOOLEAN DEFAULT true,
    reported_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Fleet Mechanical Breakdowns & Relief Units Table
CREATE TABLE IF NOT EXISTS public.fleet_breakdowns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bus_id TEXT NOT NULL,
    route_code TEXT NOT NULL,
    location TEXT NOT NULL,
    tamil_location TEXT,
    issue TEXT NOT NULL,
    status TEXT DEFAULT 'Repairs In Progress',
    relief_bus TEXT,
    relief_eta TEXT,
    passengers_affected INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ
);

-- 3. Corridor Optimization Log Table
CREATE TABLE IF NOT EXISTS public.corridor_optimizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    corridor TEXT NOT NULL DEFAULT 'Chennai Central - Tambaram',
    before_wait_min NUMERIC(4, 1),
    after_wait_min NUMERIC(4, 1),
    before_crowding INTEGER,
    after_crowding INTEGER,
    buses_added INTEGER DEFAULT 2,
    rule_applied TEXT DEFAULT 'Rule #R-104 (Capacity Surge Balancing)',
    applied_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Passenger & Operator AI Chat Inquiries Table
CREATE TABLE IF NOT EXISTS public.passenger_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role TEXT NOT NULL DEFAULT 'passenger',
    language TEXT NOT NULL DEFAULT 'en',
    message TEXT NOT NULL,
    reply TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================
-- Row Level Security (RLS) Policies (Enable Public Read and Write)
-- =========================================================================

ALTER TABLE public.transit_hazards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fleet_breakdowns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.corridor_optimizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.passenger_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read transit_hazards" ON public.transit_hazards FOR SELECT USING (true);
CREATE POLICY "Allow public insert transit_hazards" ON public.transit_hazards FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read fleet_breakdowns" ON public.fleet_breakdowns FOR SELECT USING (true);
CREATE POLICY "Allow public insert fleet_breakdowns" ON public.fleet_breakdowns FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read corridor_optimizations" ON public.corridor_optimizations FOR SELECT USING (true);
CREATE POLICY "Allow public insert corridor_optimizations" ON public.corridor_optimizations FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read passenger_inquiries" ON public.passenger_inquiries FOR SELECT USING (true);
CREATE POLICY "Allow public insert passenger_inquiries" ON public.passenger_inquiries FOR INSERT WITH CHECK (true);

-- Insert Initial Seed Data for Chennai Corridor Hazards
INSERT INTO public.transit_hazards (name, tamil_name, severity, water_depth, affected_routes, detour_action, latitude, longitude)
VALUES 
  ('Kathipara Junction & Guindy Underpass', 'கத்திப்பாரா சந்திப்பு & கிண்டி சுரங்கப்பாதை', 'high', '1.5 Feet Inundation', ARRAY['Route 29C'], 'Diverted via 100ft Inner Ring Road (+7 mins)', 13.0067, 80.2023),
  ('Velachery Lake Road / Kaiveli', 'வேளச்சேரி ஏரி சாலை / கைவேலி', 'medium', '0.8 Feet Waterlogging', ARRAY['Route 21M'], 'Single lane active with traffic police marshaling', 12.9792, 80.2212)
ON CONFLICT DO NOTHING;
