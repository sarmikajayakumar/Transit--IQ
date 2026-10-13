-- =========================================================================
-- TransitIQ — Seed Script for Existing Supabase Tables
-- Targets: routes, stops, route_stops, crowding_reports, disruptions
-- Does NOT drop, recreate, or modify table schemas.
-- Does NOT duplicate existing route (id=1, route_number='101').
-- Uses only permitted crowd levels: 'low', 'medium', 'high'.
-- Uses only permitted disruption severity: 'low', 'medium', 'high'.
-- Uses only permitted disruption status: 'active', 'resolved'.
-- =========================================================================

-- -------------------------------------------------------------------------
-- STEP 1: Insert Missing Coimbatore Bus Routes (Excluding existing '101')
-- Sourced from: src/data/transitData.js & scripts/seed.js
-- -------------------------------------------------------------------------
INSERT INTO public.routes (route_number, route_name, start_location, end_location)
SELECT r.route_number, r.route_name, r.start_location, r.end_location
FROM (VALUES
  ('12', 'Gandhipuram ↔ Saravanampatti IT Corridor (via Ganapathy)', 'Gandhipuram Central Bus Stand', 'Saravanampatti CHIL SEZ'),
  ('3A', 'Ukkadam ↔ Singanallur Bus Terminal (via Sungam & Trichy Road)', 'Ukkadam Bus Terminal', 'Singanallur Bus Stand'),
  ('70', 'Gandhipuram ↔ CODISSIA & Airport (via Avinashi Road)', 'Gandhipuram Central Bus Stand', 'Coimbatore International Airport'),
  ('1', 'Ukkadam ↔ Vadavalli (via Town Hall & RS Puram)', 'Ukkadam Bus Terminal', 'Vadavalli Terminal'),
  ('23C', 'Coimbatore Junction ↔ Thudiyalur (via Saibaba Colony)', 'Coimbatore Junction Railway Station', 'Thudiyalur Bus Stand'),
  ('90', 'Gandhipuram ↔ Sulur Aero Terminal (via Singanallur)', 'Gandhipuram Central Bus Stand', 'Sulur Aero Terminal'),
  ('15', 'Ukkadam ↔ Peelamedu & Hope College (via Brookefields)', 'Ukkadam Bus Terminal', 'Hope College (Avinashi Road)'),
  ('82', 'Coimbatore Junction ↔ Podanur Junction (via Ukkadam)', 'Coimbatore Junction Railway Station', 'Podanur Junction'),
  ('11A', 'Singanallur ↔ Gandhipuram (via Ramanathapuram & Lakshmi Mills)', 'Singanallur Bus Stand', 'Gandhipuram Central Bus Stand'),
  ('33', 'Gandhipuram ↔ Perur Temple (via Town Hall)', 'Gandhipuram Central Bus Stand', 'Perur Temple Arch')
) AS r(route_number, route_name, start_location, end_location)
WHERE NOT EXISTS (
  SELECT 1 FROM public.routes existing WHERE existing.route_number = r.route_number
);

-- -------------------------------------------------------------------------
-- STEP 2: Insert Coimbatore Bus Stops (Real landmark coordinates)
-- Sourced from: src/data/transitData.js & scripts/seed.js
-- -------------------------------------------------------------------------
INSERT INTO public.stops (stop_name, latitude, longitude)
SELECT s.stop_name, s.latitude, s.longitude
FROM (VALUES
  ('Gandhipuram Central Bus Stand', 11.0168, 76.9673),
  ('Ukkadam Bus Terminal', 10.9934, 76.9610),
  ('Singanallur Bus Terminal', 10.9997, 77.0252),
  ('Coimbatore Junction Railway Station', 10.9979, 76.9667),
  ('Peelamedu (PSG Tech)', 11.0264, 77.0105),
  ('Hope College (Avinashi Road)', 11.0279, 77.0182),
  ('CODISSIA Trade Fair Complex', 11.0360, 77.0340),
  ('Coimbatore International Airport', 11.0300, 77.0434),
  ('Saravanampatti (IT Corridor / SEZ)', 11.0827, 76.9960),
  ('Saibaba Colony (Mettupalayam Road)', 11.0298, 76.9450),
  ('Thudiyalur Bus Stand', 11.0776, 76.9385),
  ('RS Puram (DB Road)', 11.0085, 76.9485),
  ('Town Hall (Clock Tower)', 10.9965, 76.9605),
  ('Brookefields Mall', 11.0097, 76.9600),
  ('Fun Republic Mall (Peelamedu)', 11.0250, 77.0020),
  ('Vadavalli Terminal', 11.0300, 76.9015),
  ('Podanur Junction', 10.9635, 76.9950),
  ('Sulur Aero Terminal', 11.0256, 77.1265),
  ('Ganapathy Bus Stop', 11.0385, 76.9802),
  ('Ramanathapuram Junction', 10.9942, 76.9890)
) AS s(stop_name, latitude, longitude)
WHERE NOT EXISTS (
  SELECT 1 FROM public.stops existing WHERE existing.stop_name = s.stop_name
);

-- -------------------------------------------------------------------------
-- STEP 3: Insert Route Stops (Links routes to stops in order)
-- Sourced from: src/data/transitData.js & scripts/seed.js
-- Uses dynamic foreign key resolution (guaranteed valid route_id and stop_id)
-- -------------------------------------------------------------------------
INSERT INTO public.route_stops (route_id, stop_id, stop_order)
SELECT r.id, s.id, rs.stop_order
FROM (VALUES
  -- Route 12: Gandhipuram -> Ganapathy -> Saravanampatti
  ('12', 'Gandhipuram Central Bus Stand', 1),
  ('12', 'Ganapathy Bus Stop', 2),
  ('12', 'Saravanampatti (IT Corridor / SEZ)', 3),

  -- Route 3A: Ukkadam -> Town Hall -> Ramanathapuram -> Singanallur
  ('3A', 'Ukkadam Bus Terminal', 1),
  ('3A', 'Town Hall (Clock Tower)', 2),
  ('3A', 'Ramanathapuram Junction', 3),
  ('3A', 'Singanallur Bus Terminal', 4),

  -- Route 70: Gandhipuram -> Fun Mall -> Peelamedu -> Hope College -> CODISSIA -> Airport
  ('70', 'Gandhipuram Central Bus Stand', 1),
  ('70', 'Fun Republic Mall (Peelamedu)', 2),
  ('70', 'Peelamedu (PSG Tech)', 3),
  ('70', 'Hope College (Avinashi Road)', 4),
  ('70', 'CODISSIA Trade Fair Complex', 5),
  ('70', 'Coimbatore International Airport', 6),

  -- Route 1: Ukkadam -> Town Hall -> RS Puram -> Vadavalli
  ('1', 'Ukkadam Bus Terminal', 1),
  ('1', 'Town Hall (Clock Tower)', 2),
  ('1', 'RS Puram (DB Road)', 3),
  ('1', 'Vadavalli Terminal', 4),

  -- Route 23C: Junction -> Brookefields -> Saibaba Colony -> Thudiyalur
  ('23C', 'Coimbatore Junction Railway Station', 1),
  ('23C', 'Brookefields Mall', 2),
  ('23C', 'Saibaba Colony (Mettupalayam Road)', 3),
  ('23C', 'Thudiyalur Bus Stand', 4),

  -- Route 90: Gandhipuram -> Ramanathapuram -> Singanallur -> Sulur
  ('90', 'Gandhipuram Central Bus Stand', 1),
  ('90', 'Ramanathapuram Junction', 2),
  ('90', 'Singanallur Bus Terminal', 3),
  ('90', 'Sulur Aero Terminal', 4),

  -- Route 15: Ukkadam -> Brookefields -> Fun Mall -> Hope College
  ('15', 'Ukkadam Bus Terminal', 1),
  ('15', 'Brookefields Mall', 2),
  ('15', 'Fun Republic Mall (Peelamedu)', 3),
  ('15', 'Hope College (Avinashi Road)', 4),

  -- Route 82: Junction -> Ukkadam -> Podanur
  ('82', 'Coimbatore Junction Railway Station', 1),
  ('82', 'Ukkadam Bus Terminal', 2),
  ('82', 'Podanur Junction', 3)
) AS rs(route_number, stop_name, stop_order)
JOIN public.routes r ON r.route_number = rs.route_number
JOIN public.stops s ON s.stop_name = rs.stop_name
WHERE NOT EXISTS (
  SELECT 1 FROM public.route_stops existing
  WHERE existing.route_id = r.id AND existing.stop_id = s.id AND existing.stop_order = rs.stop_order
);

-- -------------------------------------------------------------------------
-- STEP 4: Insert Crowding Reports (Permitted values: 'low', 'medium', 'high')
-- Sourced from: src/data/transitData.js
-- Route 12 (134% peak IT rush) -> 'high'
-- Route 3A (40% seat surplus) -> 'low'
-- Route 70 (76% balanced transit) -> 'medium'
-- -------------------------------------------------------------------------
INSERT INTO public.crowding_reports (route_id, stop_id, crowd_level, reported_at)
SELECT r.id, s.id, cr.crowd_level, cr.reported_at
FROM (VALUES
  -- Route 12: Overcrowded Sathy Road & IT Corridor
  ('12', 'Gandhipuram Central Bus Stand', 'high', NOW() - INTERVAL '12 minutes'),
  ('12', 'Ganapathy Bus Stop', 'high', NOW() - INTERVAL '8 minutes'),
  ('12', 'Saravanampatti (IT Corridor / SEZ)', 'high', NOW() - INTERVAL '5 minutes'),

  -- Route 3A: Undercrowded Trichy Road Corridor
  ('3A', 'Ukkadam Bus Terminal', 'low', NOW() - INTERVAL '25 minutes'),
  ('3A', 'Town Hall (Clock Tower)', 'low', NOW() - INTERVAL '18 minutes'),
  ('3A', 'Ramanathapuram Junction', 'low', NOW() - INTERVAL '10 minutes'),
  ('3A', 'Singanallur Bus Terminal', 'low', NOW() - INTERVAL '4 minutes'),

  -- Route 70: Moderate / Balanced Avinashi Road Corridor
  ('70', 'Gandhipuram Central Bus Stand', 'medium', NOW() - INTERVAL '30 minutes'),
  ('70', 'Fun Republic Mall (Peelamedu)', 'medium', NOW() - INTERVAL '22 minutes'),
  ('70', 'Peelamedu (PSG Tech)', 'high', NOW() - INTERVAL '15 minutes'),
  ('70', 'Hope College (Avinashi Road)', 'high', NOW() - INTERVAL '11 minutes'),
  ('70', 'CODISSIA Trade Fair Complex', 'high', NOW() - INTERVAL '7 minutes'),
  ('70', 'Coimbatore International Airport', 'medium', NOW() - INTERVAL '2 minutes'),

  -- Route 1 & 23C: Steady Commuter Flow
  ('1', 'Ukkadam Bus Terminal', 'medium', NOW() - INTERVAL '14 minutes'),
  ('1', 'RS Puram (DB Road)', 'low', NOW() - INTERVAL '9 minutes'),
  ('1', 'Vadavalli Terminal', 'low', NOW() - INTERVAL '3 minutes'),
  ('23C', 'Coimbatore Junction Railway Station', 'medium', NOW() - INTERVAL '20 minutes'),
  ('23C', 'Saibaba Colony (Mettupalayam Road)', 'low', NOW() - INTERVAL '13 minutes'),
  ('23C', 'Thudiyalur Bus Stand', 'low', NOW() - INTERVAL '6 minutes')
) AS cr(route_number, stop_name, crowd_level, reported_at)
JOIN public.routes r ON r.route_number = cr.route_number
JOIN public.stops s ON s.stop_name = cr.stop_name;

-- -------------------------------------------------------------------------
-- STEP 5: Insert Disruptions
-- Permitted severity: 'low', 'medium', 'high'
-- Permitted status: 'active', 'resolved'
-- Sourced from: src/data/transitData.js & server/index.js
-- -------------------------------------------------------------------------
INSERT INTO public.disruptions (route_id, title, description, severity, status, location, created_at)
SELECT r.id, d.title, d.description, d.severity, d.status, d.location, d.created_at
FROM (VALUES
  -- 1. Avinashi Road Monsoon Waterlogging (High Severity, Active)
  (
    '70',
    'Monsoon Waterlogging Underpass Surge',
    'Monsoon waterlogging (1.4 ft) near Peelamedu underpass. Traffic diverted via Trichy Road / Singanallur (+8 mins delay). Extra buses deployed.',
    'high',
    'active',
    'Avinashi Road Flyover / Peelamedu Underpass',
    NOW() - INTERVAL '45 minutes'
  ),

  -- 2. CODISSIA Industrial Trade Fair Commuter Overflow (Medium Severity, Active)
  (
    '70',
    'Industrial Expo Event Commuter Surge',
    'CODISSIA industrial fair visitor rush causing platform overflow. +3 extra shuttle buses deployed from Gandhipuram.',
    'medium',
    'active',
    'CODISSIA Trade Fair Complex',
    NOW() - INTERVAL '35 minutes'
  ),

  -- 3. Route 12 Mechanical Breakdown (High Severity, Active)
  (
    '12',
    'Fleet Breakdown - Electrical Circuit Failure',
    'Bus TN-38-N-2914 stalled near Ganapathy Signal. Passengers evacuated safely to platform. Standby relief bus TN-38-N-6602 dispatched (ETA 4 min).',
    'high',
    'active',
    'Ganapathy Signal (Sathy Road)',
    NOW() - INTERVAL '18 minutes'
  ),

  -- 4. Ukkadam Flyover Construction Single Lane Chokepoint (Low Severity, Active)
  (
    '3A',
    'Flyover Construction Slowdown',
    'Single-lane chokepoint near terminal junction due to construction work. Traffic police marshaling active with minimal 3 min delay.',
    'low',
    'active',
    'Ukkadam Bus Terminal Junction',
    NOW() - INTERVAL '60 minutes'
  ),

  -- 5. Peelamedu Signal Traffic Light Sensor Repair (Low Severity, Resolved)
  (
    '15',
    'Traffic Light Sensor Calibration',
    'Sensor recalibration completed at PSG Tech junction. Normal traffic movement restored across all lanes.',
    'low',
    'resolved',
    'Peelamedu Junction (Avinashi Road)',
    NOW() - INTERVAL '120 minutes'
  )
) AS d(route_number, title, description, severity, status, location, created_at)
JOIN public.routes r ON r.route_number = d.route_number;
