// csvHotspots.ts
export type CsvRow = { name: string; canonical_name?: string; Area: string; Spot: string }

const AREA_TO_NODE: Record<string, string> = {
  Arms: 'Mech/Arms',
  Back: 'Mech/Backpack',
  Legs: 'Mech/Legs',
  Torso: 'Mech/Torso',
  Head: 'Mech/Head',
}

// For each area, pick sensible defaults (macro open + micro loop)
const AREA_DEFAULT_CLIPS: Record<string, { open: string; loop: string }> = {
  Arms: { open: 'Arms_Forearm_Open', loop: 'Arms_Shoulder_Loop' },
  Back: { open: 'Backpack_Main_Open', loop: 'Backpack_Cooling_Loop' },
  Legs: { open: 'Leg_Knee_Cyl_Open', loop: 'Leg_Shin_Shell_Loop' },
  Torso: { open: 'Torso_Cockpit_Open', loop: 'Torso_Cooling_Loop' },
  Head: { open: 'Head_Open', loop: 'Head_Loop' },
}

// Optional: refine by Spot (if you want subpart-accurate animations)
const SPOT_OVERRIDES: Record<string, Partial<{ open: string; loop: string; nodePath: string }>> = {
  'Elbow Boosters': { open: 'Arms_Forearm_Cyl_Open', loop: 'Arms_Forearm_Cyl_Loop' },
  'Shoulder Vents': { open: 'Arms_Shoulder_Open', loop: 'Arms_Shoulder_Loop' },
  'Wrist Utility': { /* keep area defaults */ },
  'Booster': { open: 'Backpack_Cyl_Open', loop: 'Backpack_Cyl_Loop' },
  'Gears': { open: 'Backpack_Cyl_Open', loop: 'Backpack_Cooling_Loop' },
  'Power Source': { open: 'Backpack_Main_Open', loop: 'Backpack_Cooling_Loop' },
  'Cockpit': { open: 'Torso_Cockpit_Open', loop: 'Torso_Cooling_Loop' },
  'Vents': { open: 'Torso_Cooling_Open', loop: 'Torso_Cooling_Loop' },
  'Brain': { open: 'Head_Open', loop: 'Head_Loop' },
  'Ear Antenna': { open: 'Head_Ears_Open', loop: 'Head_Loop' },
  'Knee Gears': { open: 'Leg_Knee_Cyl_Open', loop: 'Leg_Knee_Cyl_Loop' },
  'Hamstring Hover Engines': { open: 'Leg_Hip_Engine_Open', loop: 'Leg_Hip_Engine_Loop' },
  'Wing Panels': { open: 'Leg_Shin_Shell_Open', loop: 'Leg_Shin_Shell_Loop' },
  'Control Panel': { open: 'Leg_Shin_Engine_Open', loop: 'Leg_Shin_Engine_Loop' },
}

export type Hotspot = {
  key: string;                    // 'payments', etc.
  title: string;                  // pretty name
  nodePath: string;               // scene path to focus
  open: string;                   // macro clip
  loop: string;                   // micro loop
  azimuth?: number; polar?: number; zoomBias?: number;
}

export function csvToHotspots(rows: CsvRow[]): Hotspot[] {
  return rows.map(r => {
    const key = (r.canonical_name || r.name).toLowerCase().trim()
    const baseNode = AREA_TO_NODE[r.Area] || 'Mech'
    const defaults = AREA_DEFAULT_CLIPS[r.Area] || AREA_DEFAULT_CLIPS.Torso
    const spot = SPOT_OVERRIDES[r.Spot] || {}
    return {
      key,
      title: r.name.trim(),
      nodePath: spot.nodePath || baseNode,
      open: spot.open || defaults.open,
      loop: spot.loop || defaults.loop,
      // Optional default view angles per area:
      azimuth: { Head: -0.4, Torso: 0.3, Arms: -1.2, Legs: 2.0, Back: -0.8 }[r.Area],
      polar: { Head: 1.0, Torso: 1.1, Arms: 1.3, Legs: 1.4, Back: 1.2 }[r.Area],
      zoomBias: 1.25,
    }
  })
}

// CSV data parsed from your provided mapping
export const CSV_DATA: CsvRow[] = [
  { name: 'Accelerator', canonical_name: 'accelerator', Area: 'Arms', Spot: 'Elbow Boosters' },
  { name: 'Buy Button for Mobile Games', canonical_name: 'buybutton', Area: 'Back', Spot: 'Booster' },
  { name: 'Cloud Gaming', canonical_name: 'cloudgaming', Area: 'Legs', Spot: 'Wing Panels' },
  { name: 'Ecosystem', canonical_name: 'ecosystem', Area: 'Legs', Spot: 'Control Panel' },
  { name: 'Funding Club', canonical_name: 'fundingclub', Area: 'Torso', Spot: 'Vents' },
  { name: 'Metasites', canonical_name: 'metasites', Area: 'Arms', Spot: 'Wrist Utility' },
  { name: 'Mobile SDK', canonical_name: 'mobilesdk', Area: 'Legs', Spot: 'Knee Gears' },
  { name: 'Offerwall', canonical_name: 'offerwall', Area: 'Head', Spot: 'Ear Antenna' },
  { name: 'Partner Network', canonical_name: 'partnernetwork', Area: 'Legs', Spot: 'Hamstring Hover Engines' },
  { name: 'Payments', canonical_name: 'payments', Area: 'Back', Spot: 'Power Source' },
  { name: 'Publishing Suite', canonical_name: 'publishingsuite', Area: 'Torso', Spot: 'Cockpit' },
  { name: 'Subscriptions', canonical_name: 'subscriptions', Area: 'Back', Spot: 'Gears' },
  { name: 'Web Shop', canonical_name: 'webshop', Area: 'Arms', Spot: 'Shoulder Vents' },
  { name: 'Xsolla Mall', canonical_name: 'xsollamall', Area: 'Head', Spot: 'Brain' },
]

// Generate hotspots from CSV data
export const HOTSPOTS = csvToHotspots(CSV_DATA)
