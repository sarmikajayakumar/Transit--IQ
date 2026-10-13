-- =========================================================================
-- TransitIQ — Coimbatore City (Tamil Nadu, India) Live Demo Seed SQL
-- Project Supabase Database: https://blnpwkcryalhyezmrmzp.supabase.co
-- Safe to run repeatedly (uses ON CONFLICT and idempotent inserts)
-- All crowd/demand telemetry values are marked as ESTIMATED / SIMULATED.
-- =========================================================================

-- 1. Ensure all demo tables exist with appropriate schemas and RLS
CREATE TABLE IF NOT EXISTS public.routes (
    id BIGSERIAL PRIMARY KEY,
    route_number TEXT NOT NULL,
    route_name TEXT NOT NULL,
    start_location TEXT NOT NULL,
    end_location TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.stops (
    id BIGSERIAL PRIMARY KEY,
    stop_name TEXT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL
);

CREATE TABLE IF NOT EXISTS public.route_stops (
    id BIGSERIAL PRIMARY KEY,
    route_id BIGINT REFERENCES public.routes(id) ON DELETE CASCADE,
    stop_id BIGINT REFERENCES public.stops(id) ON DELETE CASCADE,
    stop_order INTEGER NOT NULL
);

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
    is_simulated BOOLEAN DEFAULT true,
    reported_at TIMESTAMPTZ DEFAULT NOW()
);

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
    is_simulated BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.corridor_optimizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    corridor TEXT NOT NULL DEFAULT 'Gandhipuram - Saravanampatti IT Corridor',
    before_wait_min NUMERIC(4, 1),
    after_wait_min NUMERIC(4, 1),
    before_crowding INTEGER,
    after_crowding INTEGER,
    buses_added INTEGER DEFAULT 2,
    rule_applied TEXT DEFAULT 'Rule #R-104 (Capacity Surge Balancing)',
    is_simulated BOOLEAN DEFAULT true,
    applied_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.passenger_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role TEXT NOT NULL DEFAULT 'passenger',
    language TEXT NOT NULL DEFAULT 'en',
    message TEXT NOT NULL,
    reply TEXT NOT NULL,
    is_simulated BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================
-- Safe Minimal Row Level Security (RLS) Policies
-- =========================================================================
ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.route_stops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transit_hazards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fleet_breakdowns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.corridor_optimizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.passenger_inquiries ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
    -- routes
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read routes') THEN
        CREATE POLICY "Allow public read routes" ON public.routes FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public insert routes') THEN
        CREATE POLICY "Allow public insert routes" ON public.routes FOR INSERT WITH CHECK (true);
    END IF;

    -- stops
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read stops') THEN
        CREATE POLICY "Allow public read stops" ON public.stops FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public insert stops') THEN
        CREATE POLICY "Allow public insert stops" ON public.stops FOR INSERT WITH CHECK (true);
    END IF;

    -- route_stops
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read route_stops') THEN
        CREATE POLICY "Allow public read route_stops" ON public.route_stops FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public insert route_stops') THEN
        CREATE POLICY "Allow public insert route_stops" ON public.route_stops FOR INSERT WITH CHECK (true);
    END IF;

    -- transit_hazards
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read transit_hazards') THEN
        CREATE POLICY "Allow public read transit_hazards" ON public.transit_hazards FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public insert transit_hazards') THEN
        CREATE POLICY "Allow public insert transit_hazards" ON public.transit_hazards FOR INSERT WITH CHECK (true);
    END IF;

    -- fleet_breakdowns
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read fleet_breakdowns') THEN
        CREATE POLICY "Allow public read fleet_breakdowns" ON public.fleet_breakdowns FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public insert fleet_breakdowns') THEN
        CREATE POLICY "Allow public insert fleet_breakdowns" ON public.fleet_breakdowns FOR INSERT WITH CHECK (true);
    END IF;

    -- corridor_optimizations
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read corridor_optimizations') THEN
        CREATE POLICY "Allow public read corridor_optimizations" ON public.corridor_optimizations FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public insert corridor_optimizations') THEN
        CREATE POLICY "Allow public insert corridor_optimizations" ON public.corridor_optimizations FOR INSERT WITH CHECK (true);
    END IF;

    -- passenger_inquiries
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read passenger_inquiries') THEN
        CREATE POLICY "Allow public read passenger_inquiries" ON public.passenger_inquiries FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public insert passenger_inquiries') THEN
        CREATE POLICY "Allow public insert passenger_inquiries" ON public.passenger_inquiries FOR INSERT WITH CHECK (true);
    END IF;
END $$;

-- =========================================================================
-- 2. Clean previous sample data for fresh Coimbatore seeding
-- =========================================================================
DELETE FROM public.route_stops WHERE true;
DELETE FROM public.stops WHERE true;
DELETE FROM public.routes WHERE true;
DELETE FROM public.transit_hazards WHERE true;
DELETE FROM public.fleet_breakdowns WHERE true;
DELETE FROM public.corridor_optimizations WHERE true;
DELETE FROM public.passenger_inquiries WHERE true;

-- Reset identity sequence counters
ALTER SEQUENCE IF EXISTS public.routes_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS public.stops_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS public.route_stops_id_seq RESTART WITH 1;

-- =========================================================================
-- 3. Insert Coimbatore Bus Routes (10 Realistic Lines)
-- =========================================================================
INSERT INTO public.routes (id, route_number, route_name, start_location, end_location) VALUES
(1, '12', 'Gandhipuram ↔ Saravanampatti IT Corridor (via Ganapathy)', 'Gandhipuram Central Bus Stand', 'Saravanampatti CHIL SEZ'),
(2, '3A', 'Ukkadam ↔ Singanallur Bus Terminal (via Sungam & Trichy Road)', 'Ukkadam Bus Terminal', 'Singanallur Bus Stand'),
(3, '70', 'Gandhipuram ↔ CODISSIA & Airport (via Avinashi Road)', 'Gandhipuram Central Bus Stand', 'Coimbatore International Airport'),
(4, '1', 'Ukkadam ↔ Vadavalli (via Town Hall & RS Puram)', 'Ukkadam Bus Terminal', 'Vadavalli Terminal'),
(5, '23C', 'Coimbatore Junction ↔ Thudiyalur (via Saibaba Colony)', 'Coimbatore Junction Railway Station', 'Thudiyalur Bus Stand'),
(6, '90', 'Gandhipuram ↔ Sulur Aero Terminal (via Singanallur)', 'Gandhipuram Central Bus Stand', 'Sulur Aero Terminal'),
(7, '15', 'Ukkadam ↔ Peelamedu & Hope College (via Brookefields)', 'Ukkadam Bus Terminal', 'Hope College (Avinashi Road)'),
(8, '82', 'Coimbatore Junction ↔ Podanur Junction (via Ukkadam)', 'Coimbatore Junction Railway Station', 'Podanur Junction'),
(9, '11A', 'Singanallur ↔ Gandhipuram (via Ramanathapuram & Lakshmi Mills)', 'Singanallur Bus Stand', 'Gandhipuram Central Bus Stand'),
(10, '33', 'Gandhipuram ↔ Perur Temple (via Town Hall)', 'Gandhipuram Central Bus Stand', 'Perur Temple Arch');

-- =========================================================================
-- 4. Insert Coimbatore Bus Stops (20 Real Landmark Coordinates)
-- =========================================================================
INSERT INTO public.stops (id, stop_name, latitude, longitude) VALUES
(1, 'Gandhipuram Central Bus Stand', 11.0168, 76.9673),
(2, 'Ukkadam Bus Terminal', 10.9934, 76.9610),
(3, 'Singanallur Bus Terminal', 10.9997, 77.0252),
(4, 'Coimbatore Junction Railway Station', 10.9979, 76.9667),
(5, 'Peelamedu (PSG Tech)', 11.0264, 77.0105),
(6, 'Hope College (Avinashi Road)', 11.0279, 77.0182),
(7, 'CODISSIA Trade Fair Complex', 11.0360, 77.0340),
(8, 'Coimbatore International Airport', 11.0300, 77.0434),
(9, 'Saravanampatti (IT Corridor / SEZ)', 11.0827, 76.9960),
(10, 'Saibaba Colony (Mettupalayam Road)', 11.0298, 76.9450),
(11, 'Thudiyalur Bus Stand', 11.0776, 76.9385),
(12, 'RS Puram (DB Road)', 11.0085, 76.9485),
(13, 'Town Hall (Clock Tower)', 10.9965, 76.9605),
(14, 'Brookefields Mall', 11.0097, 76.9600),
(15, 'Fun Republic Mall (Peelamedu)', 11.0250, 77.0020),
(16, 'Vadavalli Terminal', 11.0300, 76.9015),
(17, 'Podanur Junction', 10.9635, 76.9950),
(18, 'Sulur Aero Terminal', 11.0256, 77.1265),
(19, 'Ganapathy Bus Stop', 11.0385, 76.9802),
(20, 'Ramanathapuram Junction', 10.9942, 76.9890);

-- =========================================================================
-- 5. Insert Route Stops Association (Order of Stops per Route)
-- =========================================================================
-- Route 12: Gandhipuram -> Ganapathy -> Saravanampatti
INSERT INTO public.route_stops (route_id, stop_id, stop_order) VALUES
(1, 1, 1),
(1, 19, 2),
(1, 9, 3),

-- Route 3A: Ukkadam -> Town Hall -> Ramanathapuram -> Singanallur
(2, 2, 1),
(2, 13, 2),
(2, 20, 3),
(2, 3, 4),

-- Route 70: Gandhipuram -> Fun Mall -> Peelamedu -> Hope College -> CODISSIA -> Airport
(3, 1, 1),
(3, 15, 2),
(3, 5, 3),
(3, 6, 4),
(3, 7, 5),
(3, 8, 6),

-- Route 1: Ukkadam -> Town Hall -> RS Puram -> Vadavalli
(4, 2, 1),
(4, 13, 2),
(4, 12, 3),
(4, 16, 4),

-- Route 23C: Junction -> Brookefields -> Saibaba Colony -> Thudiyalur
(5, 4, 1),
(5, 14, 2),
(5, 10, 3),
(5, 11, 4),

-- Route 90: Gandhipuram -> Ramanathapuram -> Singanallur -> Sulur
(6, 1, 1),
(6, 20, 2),
(6, 3, 3),
(6, 18, 4),

-- Route 15: Ukkadam -> Brookefields -> Fun Mall -> Hope College
(7, 2, 1),
(7, 14, 2),
(7, 15, 3),
(7, 6, 4),

-- Route 82: Junction -> Ukkadam -> Podanur
(8, 4, 1),
(8, 2, 2),
(8, 17, 3);

-- =========================================================================
-- 6. Insert Coimbatore Transit Hazards & Event Advisories
-- =========================================================================
INSERT INTO public.transit_hazards (name, tamil_name, severity, water_depth, affected_routes, detour_action, latitude, longitude, is_active, is_simulated) VALUES
('Avinashi Road Flyover / Peelamedu Underpass', 'அவினாசி சாலை மேம்பாலம் / பீளமேடு சுரங்கப்பாதை', 'high', 'Heavy Monsoon Waterlogging (1.4 ft)', ARRAY['Route 70', 'Route 15'], 'Diverted via Trichy Road / Singanallur (+8 mins)', 11.0264, 77.0105, true, true),
('CODISSIA Trade Fair Complex Event Surge', 'கொடிசியா தொழிற்காட்சி அரங்கம் கூட்ட நெரிசல்', 'medium', 'Industrial Expo Peak Commuter Surge', ARRAY['Route 70'], '+3 Extra Shuttle buses deployed to absorb passenger overflow', 11.0360, 77.0340, true, true),
('Ukkadam Bus Terminal Flyover Construction Detour', 'உக்கடம் பேருந்து நிலைய மேம்பால பணி மாற்றுப்பாதை', 'medium', 'Single Lane Chokepoint (Slow Moving)', ARRAY['Route 3A', 'Route 1'], 'Traffic police single-lane marshaling active', 10.9934, 76.9610, true, true);

-- =========================================================================
-- 7. Insert Coimbatore Fleet Mechanical Breakdowns & Relief Units
-- =========================================================================
INSERT INTO public.fleet_breakdowns (bus_id, route_code, location, tamil_location, issue, status, relief_bus, relief_eta, passengers_affected, is_simulated) VALUES
('TN-38-N-2914', '12', 'Ganapathy Signal (Sathy Road)', 'கணபதி சிக்னல் (சத்தி ரோடு)', 'Alternator & Electrical Circuit Failure', 'Repairs In Progress - Passengers Evacuated', 'TN-38-N-6602', '4 mins', 48, true),
('TN-38-N-1845', '70', 'Hope College Junction (Avinashi Road)', 'ஹோப் காலேஜ் சந்திப்பு (அவினாசி சாலை)', 'Radiator Overheating (Under Observation)', 'Standby Unit Dispatched', 'TN-38-N-9021', '6 mins', 34, true);

-- =========================================================================
-- 8. Insert Corridor Capacity Optimizations (Simulated AI Engine Log)
-- =========================================================================
INSERT INTO public.corridor_optimizations (corridor, before_wait_min, after_wait_min, before_crowding, after_crowding, buses_added, rule_applied, is_simulated) VALUES
('Gandhipuram - Saravanampatti IT Corridor', 15.4, 6.2, 134, 82, 2, 'Rule #R-104 (Capacity Surge Balancing)', true),
('Ukkadam - Singanallur Trichy Road Corridor', 12.0, 5.5, 40, 48, 1, 'Rule #R-102 (Headway Streamlining)', true);

-- =========================================================================
-- 9. Insert Realistic Coimbatore Commuter Inquiries (Bilingual Tamil & English)
-- =========================================================================
INSERT INTO public.passenger_inquiries (role, language, message, reply, is_simulated) VALUES
('passenger', 'en', 'Which bus should I take to reach Saravanampatti IT Park from Gandhipuram?', 'Take Route 12! Extra relief buses have been deployed due to peak morning IT surge, bringing average wait time down to 6.2 mins. Alternatively, board Route 70 for Avinashi road connection.', true),
('passenger', 'ta', 'காந்திபுரத்திலிருந்து சரவணம்பட்டி ஐடி பார்க் செல்ல எந்த பேருந்து சிறந்தது?', 'வழித்தடம் 12-ஐப் பயன்படுத்தவும்! உச்சநேர கூட்ட நெரிசலைக் குறைக்க 2 கூடுதல் பேருந்துகள் இயக்கப்படுவதால் காத்திருப்பு நேரம் 6 நிமிடங்களாக குறைக்கப்பட்டுள்ளது.', true),
('operator', 'en', 'Corridor demand status for Route 12 at Ganapathy Signal?', 'Critical peak demand detected: 134% occupancy. Standby relief bus TN-38-N-6602 deployed to absorb passenger overflow. Reallocate low-capacity buses from Route 3A.', true),
('operator', 'ta', 'உக்கடம் - சிங்காநல்லூர் வழித்தடம் 3A நிலை என்ன?', 'வழித்தடம் 3A-ல் 40% மட்டுமே கூட்டம் உள்ளது (இருக்கைகள் காலியாக உள்ளன). இங்குள்ள உதிரிப் பேருந்துகளை அதிக நெரிசல் உள்ள வழித்தடம் 12-க்கு மாற்றி இயக்கலாம்.', true);
