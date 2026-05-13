
/**
 * 🔒 STABLE MODULE: App Constants & Defaults
 * STATUS: FROZEN
 * VERSION: 1.2.0 - Launch Ready (BYOK & Pro Model)
 */
import { AppConfig, BrockSpec, BrockType, RoomSize, FloorMaterial, Challenge, PropType, PropSpec, PropCategory } from './types';

export const PROP_SPECS: Record<PropType, PropSpec> = {
  // Furniture & Decor
  [PropType.MATTRESS]: { type: PropType.MATTRESS, category: PropCategory.FURNITURE_DECOR, name: 'Mattress', description: 'A cozy mattress for a bed.', requiredSurface: { width: 4, depth: 8 }, icon: 'Bed' },
  [PropType.LAPTOP]: { type: PropType.LAPTOP, category: PropCategory.FURNITURE_DECOR, name: 'Laptop', description: 'A sleek laptop for a desk.', requiredSurface: { width: 2, depth: 2 }, icon: 'Laptop' },
  [PropType.POTTED_PLANT]: { type: PropType.POTTED_PLANT, category: PropCategory.FURNITURE_DECOR, name: 'Potted Plant', description: 'A nice green plant.', requiredSurface: { width: 1, depth: 1 }, icon: 'Leaf' },
  [PropType.LAMP]: { type: PropType.LAMP, category: PropCategory.FURNITURE_DECOR, name: 'Desk Lamp', description: 'A modern desk lamp.', requiredSurface: { width: 1, depth: 1 }, icon: 'Lightbulb' },
  [PropType.BOOKS]: { type: PropType.BOOKS, category: PropCategory.FURNITURE_DECOR, name: 'Books', description: 'A stack of books.', requiredSurface: { width: 1, depth: 1 }, icon: 'Book' },
  [PropType.CHAIR]: { type: PropType.CHAIR, category: PropCategory.FURNITURE_DECOR, name: 'Chair', description: 'A comfortable chair.', requiredSurface: { width: 2, depth: 2 }, icon: 'Armchair' },
  [PropType.TABLE]: { type: PropType.TABLE, category: PropCategory.FURNITURE_DECOR, name: 'Table', description: 'A sturdy table.', requiredSurface: { width: 4, depth: 4 }, icon: 'Table' },
  [PropType.TV]: { type: PropType.TV, category: PropCategory.FURNITURE_DECOR, name: 'Television', description: 'A flat screen TV.', requiredSurface: { width: 4, depth: 1 }, icon: 'Monitor' },
  [PropType.COFFEE_CUP]: { type: PropType.COFFEE_CUP, category: PropCategory.FURNITURE_DECOR, name: 'Coffee Cup', description: 'A warm cup of coffee.', requiredSurface: { width: 1, depth: 1 }, icon: 'Coffee' },
  [PropType.RUG]: { type: PropType.RUG, category: PropCategory.FURNITURE_DECOR, name: 'Rug', description: 'A soft floor rug.', requiredSurface: { width: 6, depth: 6 }, icon: 'Square' },
  [PropType.SOFA]: { type: PropType.SOFA, category: PropCategory.FURNITURE_DECOR, name: 'Sofa', description: 'A relaxing sofa.', requiredSurface: { width: 6, depth: 3 }, icon: 'Sofa' },
  [PropType.PICTURE_FRAME]: { type: PropType.PICTURE_FRAME, category: PropCategory.FURNITURE_DECOR, name: 'Picture Frame', description: 'A beautiful picture.', requiredSurface: { width: 1, depth: 1 }, icon: 'Image' },

  // Structures
  [PropType.WALL]: { type: PropType.WALL, category: PropCategory.STRUCTURES, name: 'Wall Panel', description: 'A solid wall panel.', requiredSurface: { width: 4, depth: 1 }, icon: 'Square' },
  [PropType.DOOR]: { type: PropType.DOOR, category: PropCategory.STRUCTURES, name: 'Door', description: 'A standard interior door.', requiredSurface: { width: 0, depth: 0 }, icon: 'DoorOpen' },
  [PropType.WINDOW]: { type: PropType.WINDOW, category: PropCategory.STRUCTURES, name: 'Window', description: 'A glass window pane.', requiredSurface: { width: 0, depth: 0 }, icon: 'Maximize' },
  [PropType.STAIRS]: { type: PropType.STAIRS, category: PropCategory.STRUCTURES, name: 'Stairs', description: 'A set of wooden stairs.', requiredSurface: { width: 3, depth: 4 }, icon: 'TrendingUp' },
  [PropType.ROOM_DIVIDER]: { type: PropType.ROOM_DIVIDER, category: PropCategory.STRUCTURES, name: 'Room Divider', description: 'A stylish room divider.', requiredSurface: { width: 4, depth: 1 }, icon: 'Columns' },

  // IKEA Props
  [PropType.IKEA_KALLAX_2X2]: { type: PropType.IKEA_KALLAX_2X2, category: PropCategory.FURNITURE_DECOR, name: 'IKEA KALLAX (2x2)', description: 'A 77x77cm shelving unit.', requiredSurface: { width: 4, depth: 2 }, icon: 'Grid' },
  [PropType.IKEA_MALM_BED]: { type: PropType.IKEA_MALM_BED, category: PropCategory.FURNITURE_DECOR, name: 'IKEA MALM Bed', description: 'A standard Queen bed frame.', requiredSurface: { width: 8, depth: 10 }, icon: 'Bed' },
  [PropType.IKEA_LACK_TABLE]: { type: PropType.IKEA_LACK_TABLE, category: PropCategory.FURNITURE_DECOR, name: 'IKEA LACK Table', description: 'A 55x55cm side table.', requiredSurface: { width: 3, depth: 3 }, icon: 'Table' },
};

// SDG Calculation: Base (1.22kg) = €20.00. Ratio = 20 / 1.22
const SDG_RATIO = 20.00 / 1.22;

export const CHALLENGES: Challenge[] = [
  // --- Category 1: Disaster Relief & Climate ---
  {
    id: 'c1',
    title: '🌊 The Flood Barrier',
    description: 'Rising waters threaten a coastal home! Build a continuous, sturdy water-diverting wall.',
    tip: 'Build a long, solid wall. It needs to be exactly 3 units high and use at least 60 blocks to ensure stability against the water.',
    difficulty: 'Hard',
    criteria: { exactBlocks: 60, minHeight: 3, minSdg: 1000 },
    scenario: { elements: [{ id: 'water', type: 'obstacle', position: { x: 10, y: 0.5, z: 2 }, dimensions: { x: 20, y: 1, z: 4 }, color: '#3b82f6', opacity: 0.5 }] }
  },
  {
    id: 'c2',
    title: '🏚️ The Seismic Shelter',
    description: 'After an earthquake, communities need immediate, stable shelters. Build a low-center-of-gravity emergency pod.',
    tip: 'Keep it low! The maximum height is 4 units. Use at least four 4D Connectors to ensure the structure is tightly interlocked and secure.',
    difficulty: 'Medium',
    criteria: { maxHeight: 4, requiredBlocks: { [BrockType.CONN_4D]: 4 } },
    scenario: { elements: [{ id: 'rubble', type: 'obstacle', position: { x: 10, y: 0.5, z: 10 }, dimensions: { x: 8, y: 1, z: 8 }, color: '#78716c', opacity: 0.8 }] }
  },
  {
    id: 'c3',
    title: '☀️ The Heatwave Pavilion',
    description: 'The city is boiling. Create a shaded public structure for a park to protect citizens from the sun.',
    tip: 'Build a "roof" or overhang using connectors that spans across a gap without touching the ground in the middle.',
    difficulty: 'Hard',
    criteria: { minHeight: 4, requiredBlocks: { [BrockType.CONN_4D]: 2 } },
    scenario: { elements: [{ id: 'sun', type: 'obstacle', position: { x: 10, y: 10, z: 10 }, dimensions: { x: 4, y: 1, z: 4 }, color: '#fef08a', opacity: 0.9 }] }
  },

  // --- Category 2: Social Impact ---
  {
    id: 'c4',
    title: '🛏️ The Dignity Pod',
    description: 'Design a secure, private sleeping pod for an indoor homeless shelter. It needs walls on 3 sides and a raised bed platform.',
    tip: 'You are on a strict budget of €400. Build walls at least 4 units high and use at least 20 blocks total.',
    difficulty: 'Medium',
    criteria: { maxCost: 400, minHeight: 4, minBlocks: 20 },
    scenario: { elements: [{ id: 'floor', type: 'obstacle', position: { x: 10, y: -0.5, z: 10 }, dimensions: { x: 10, y: 1, z: 10 }, color: '#e2e8f0', opacity: 0.8 }] }
  },
  {
    id: 'c5',
    title: '⛺ The Refugee Transit Hub',
    description: 'A sudden influx of displaced people requires immediate infrastructure. Build a modular seating and sleeping area for a transit camp.',
    tip: 'Efficiency is key! Use exactly 50 blocks to create the maximum amount of usable furniture. High SDG score required.',
    difficulty: 'Hard',
    criteria: { exactBlocks: 50, minSdg: 800 },
    scenario: { elements: [{ id: 'tent', type: 'obstacle', position: { x: 10, y: 5, z: -0.5 }, dimensions: { x: 20, y: 10, z: 1 }, color: '#cbd5e1', opacity: 0.3 }] }
  },
  {
    id: 'c6',
    title: '🏠 The Micro-Home Foundation',
    description: 'You are tasked with furnishing a tiny home (15 square meters). Build a combined bed, desk, and partition wall.',
    tip: 'Stay under a strict budget of €1,000 but use at least 30 blocks to make it functional.',
    difficulty: 'Medium',
    criteria: { maxCost: 1000, minBlocks: 30 },
    scenario: { elements: [{ id: 'wall1', type: 'wall', position: { x: -0.5, y: 5, z: 10 }, dimensions: { x: 1, y: 10, z: 20 }, color: '#a0aec0', opacity: 0.3 }] }
  },

  // --- Category 3: Public Spaces & Civic ---
  {
    id: 'c7',
    title: '🎭 The Park Amphitheater',
    description: 'The community wants an outdoor theater. Build tiered seating for the audience.',
    tip: 'Create a wide, stepped structure. Use at least 40 blocks and make sure the highest tier is at least 3 units high.',
    difficulty: 'Medium',
    criteria: { minBlocks: 40, minHeight: 3 },
    scenario: { elements: [{ id: 'stage', type: 'obstacle', position: { x: 10, y: 0.5, z: 2 }, dimensions: { x: 12, y: 1, z: 4 }, color: '#fca5a5', opacity: 0.8 }] }
  },
  {
    id: 'c8',
    title: '🩺 The Pop-Up Clinic',
    description: 'A local health initiative needs a temporary vaccination booth in a town square.',
    tip: 'Build a desk and a privacy screen at least 6 units high, but use fewer than 40 blocks to keep it portable.',
    difficulty: 'Medium',
    criteria: { minHeight: 6, maxBlocks: 40 },
    scenario: { elements: [{ id: 'square', type: 'obstacle', position: { x: 10, y: -0.5, z: 10 }, dimensions: { x: 20, y: 1, z: 20 }, color: '#d6d3d1', opacity: 0.8 }] }
  },
  {
    id: 'c9',
    title: '🚌 The Bus Stop Oasis',
    description: 'Redesign a miserable city bus stop into a comfortable, wind-blocking waiting area.',
    tip: 'Build a back wall at least 5 units high to block the wind, and use at least 20 blocks to include seating.',
    difficulty: 'Easy',
    criteria: { minHeight: 5, minBlocks: 20 },
    scenario: { elements: [{ id: 'road', type: 'obstacle', position: { x: 10, y: -0.5, z: 18 }, dimensions: { x: 20, y: 1, z: 4 }, color: '#44403c', opacity: 0.9 }] }
  },

  // --- Category 4: Innovative Workspaces ---
  {
    id: 'c10',
    title: '💻 The Agile Stand-Up Pod',
    description: 'The tech team needs a place for quick daily meetings. Build a standing desk with a sound-absorbing acoustic wall.',
    tip: 'The desk must be exactly 4 units high (standing height). Make sure the structure achieves an SDG impact of at least 200.',
    difficulty: 'Easy',
    criteria: { minHeight: 4, minSdg: 200 },
    scenario: { elements: [{ id: 'office', type: 'wall', position: { x: 4, y: 5, z: -0.5 }, dimensions: { x: 8, y: 10, z: 1 }, color: '#a0aec0', opacity: 0.3 }] }
  },
  {
    id: 'c11',
    title: '🏢 The Co-Working Labyrinth',
    description: 'Open-plan offices are too noisy! Create a zig-zag partition wall to separate 3 different desk areas.',
    tip: 'Build a long wall using at least 30 blocks. You must use at least 10 DOUBLE blocks to keep costs down.',
    difficulty: 'Medium',
    criteria: { minBlocks: 30, requiredBlocks: { [BrockType.DOUBLE]: 10 } },
    scenario: { elements: [{ id: 'desk1', type: 'obstacle', position: { x: 4, y: 1.5, z: 4 }, dimensions: { x: 4, y: 3, z: 4 }, color: '#cbd5e1', opacity: 0.8 }] }
  },
  {
    id: 'c12',
    title: '💡 The Brainstorming Bleachers',
    description: 'Build informal, stadium-style seating for startup pitch meetings.',
    tip: 'Create a wide, stepped structure using EXACTLY 64 blocks. Count carefully!',
    difficulty: 'Hard',
    criteria: { exactBlocks: 64 },
    scenario: { elements: [{ id: 'screen', type: 'wall', position: { x: 10, y: 5, z: -0.5 }, dimensions: { x: 12, y: 10, z: 1 }, color: '#a0aec0', opacity: 0.3 }] }
  },

  // --- Category 5: Residential & Lifestyle ---
  {
    id: 'c13',
    title: '🌿 The Vertical Garden Wall',
    description: 'Bring nature indoors! Build a staggered wall with gaps and shelves to hold heavy potted plants.',
    tip: 'High structural integrity required. You must use at least 10 BASE blocks and 10 DOUBLE blocks.',
    difficulty: 'Medium',
    criteria: { requiredBlocks: { [BrockType.BASE]: 10, [BrockType.DOUBLE]: 10 } },
    scenario: { elements: [{ id: 'window', type: 'window', position: { x: 10, y: 5, z: -0.5 }, dimensions: { x: 8, y: 6, z: 0.5 }, color: '#60a5fa', opacity: 0.2 }] }
  },
  {
    id: 'c14',
    title: '🧸 The Modular Playroom',
    description: 'Build a safe, low-height play structure for children, including a "tunnel" to crawl through.',
    tip: 'Keep it safe! Max height of 3 units, and use a maximum of 50 blocks.',
    difficulty: 'Easy',
    criteria: { maxHeight: 3, maxBlocks: 50 },
    scenario: { elements: [{ id: 'rug', type: 'obstacle', position: { x: 10, y: 0.1, z: 10 }, dimensions: { x: 12, y: 0.2, z: 12 }, color: '#fca5a5', opacity: 0.9 }] }
  },
  {
    id: 'c15',
    title: '🪜 The Studio Loft',
    description: 'Maximize a small apartment by building a lofted bed platform with storage space underneath.',
    tip: 'It must be at least 6 units high to fit storage underneath, but you must keep the total cost under €1,200.',
    difficulty: 'Hard',
    criteria: { minHeight: 6, maxCost: 1200 },
    scenario: { elements: [{ id: 'corner1', type: 'wall', position: { x: -0.5, y: 8, z: 8 }, dimensions: { x: 1, y: 16, z: 16 }, color: '#a0aec0', opacity: 0.3 }] }
  },
  // --- Category 6: Gamification Challenges ---
  {
    id: 'c16_minimalist_bed',
    title: '🛏️ Minimalist Bed',
    description: 'Build a double bed using the absolute least number of brocks possible. Must cost under €400.',
    tip: 'Use DOUBLE brocks to save money and space.',
    difficulty: 'Medium',
    type: 'RESTRICTION',
    criteria: {
      maxCost: 400,
      maxDimensions: { x: 2, y: 1, z: 2 }
    },
    rewardText: 'Unlocked: "Minimalist Master" Badge & 500 SDG Points'
  },
  {
    id: 'c17_spatial_division',
    title: '📚 Spatial Division',
    description: 'Create a wall that acts simultaneously as a bookshelf to divide a tight 3x2 area.',
    tip: 'Leave gaps in the wall to act as shelves.',
    difficulty: 'Hard',
    type: 'RESTRICTION',
    criteria: {
      maxDimensions: { x: 3, y: 2.5, z: 2 }
    },
    rewardText: 'Unlocked: "Space Architect" Badge'
  },
  {
    id: 'c18_transformation',
    title: '♻️ Transformation Challenge',
    description: 'Build a functional desk using exactly 15 BASE brocks and 4 DOUBLE brocks.',
    tip: 'You have a strict inventory. Use it wisely.',
    difficulty: 'Hard',
    type: 'TRANSFORMATION',
    criteria: {
      exactInventory: {
        [BrockType.BASE]: 15,
        [BrockType.DOUBLE]: 4,
        [BrockType.CONN_1D]: 10,
        [BrockType.CONN_2D]: 10,
        [BrockType.CONN_3D]: 10,
        [BrockType.CONN_4D]: 10,
        [BrockType.TERMINAL]: 10
      }
    },
    rewardText: 'Unlocked: "MacGyver" Badge & Reusability Multiplier'
  }
];

export const MARKET_TEMPLATES = {
    "Commercial": [
        { label: "Co-working", title: "Agile Co-working Hub", prompt: "Design a modular co-working cluster for 4 people with semi-private partitions." },
        { label: "Flex-work", title: "Dynamic Flex-Office", prompt: "Create a flexible office with a standing desk and integrated shelving." }
    ],
    "Public": [
        { label: "Museum", title: "Exhibition Pedestals", prompt: "Design a series of 3 varying height pedestals for artifacts, connected by a low bench." },
        { label: "Airport", title: "Transit Lounge", prompt: "Design a series of back-to-back benches with integrated charging tables." }
    ],
    "Residential": [
        { label: "Living Room", title: "Luxury Wall Unit", prompt: "Design a floor-to-ceiling library wall with space for a large TV." },
        { label: "Eco-Home", title: "Biophilic Plant Stand", prompt: "Design a multi-tier stepped plant stand to maximize sunlight exposure." }
    ]
};

export const ROOM_SPECS: Record<RoomSize, { name: string, width: number, depth: number, walls: ('back'|'left'|'right'|'front')[], offset: {x:number, z:number} }> = {
    [RoomSize.UNLIMITED]: { name: "Studio (Unlimited)", width: 100, depth: 100, walls: [], offset: {x: 50, z: 50} },
    [RoomSize.NICHE_2M]: { name: "Niche (2m x 1m)", width: 10, depth: 5, walls: ['back', 'left', 'right'], offset: {x: 5, z: 2.5} }, 
    [RoomSize.WALL_3M]: { name: "Wall (3m Wide)", width: 15, depth: 10, walls: ['back'], offset: {x: 7.5, z: 5} },
    [RoomSize.CORNER_3M]: { name: "Corner (3m x 3m)", width: 15, depth: 15, walls: ['back', 'left'], offset: {x: 7.5, z: 7.5} },
    [RoomSize.ROOM_4X5]: { name: "Full Room (4m x 5m)", width: 20, depth: 25, walls: ['back', 'left', 'right'], offset: {x: 10, z: 12.5} },
    [RoomSize.CUSTOM]: { name: "Custom Room", width: 20, depth: 20, walls: [], offset: {x: 10, z: 10} }
};

export const FLOOR_PROPS: Record<FloorMaterial, { name: string, color: string, roughness: number }> = {
    [FloorMaterial.CORK]: { name: "Natural Cork", color: "#d2b48c", roughness: 0.9 },
    [FloorMaterial.WOOD_OAK]: { name: "Light Oak", color: "#e1c699", roughness: 0.6 },
    [FloorMaterial.WOODEN_FLOORING]: { name: "Wooden Flooring", color: "#D9A86C", roughness: 0.5 },
    [FloorMaterial.CONCRETE]: { name: "Polished Concrete", color: "#9ca3af", roughness: 0.4 },
    [FloorMaterial.TILE]: { name: "White Tile", color: "#f3f4f6", roughness: 0.2 },
    [FloorMaterial.CARPET]: { name: "Grey Carpet", color: "#4b5563", roughness: 1.0 },
};

const CORK_COLOR = '#C49A6C';
export const MATERIAL_COLORS = [
  { name: 'Cork', color: CORK_COLOR },
  { name: 'White Marble', color: '#F0F0F0' },
  { name: 'Black Marble', color: '#1A1A1A' },
  { name: 'Rose Marble', color: '#E8B4B8' },
  { name: 'Wood', color: '#8B5A2B' },
  { name: 'Hemp', color: '#D2B48C' },
];

export const APP_CONFIG: AppConfig = {
  gridSize: 200,
  currency: '€',
  prices: { [BrockType.BASE]: 11.50, [BrockType.DOUBLE]: 23.08, [BrockType.CONN_1D]: 8.87, [BrockType.CONN_2D]: 17.77, [BrockType.CONN_3D]: 22.14, [BrockType.CONN_4D]: 26.56, [BrockType.TERMINAL]: 4.44 },
  weights: { [BrockType.BASE]: 1.22, [BrockType.DOUBLE]: 2.45, [BrockType.CONN_1D]: 0.94, [BrockType.CONN_2D]: 1.88, [BrockType.CONN_3D]: 2.35, [BrockType.CONN_4D]: 2.82, [BrockType.TERMINAL]: 0.47 },
  sdgImpacts: { [BrockType.BASE]: 20.00, [BrockType.DOUBLE]: 40.16, [BrockType.CONN_1D]: 15.41, [BrockType.CONN_2D]: 30.82, [BrockType.CONN_3D]: 38.52, [BrockType.CONN_4D]: 46.23, [BrockType.TERMINAL]: 7.70 },
  assemblySpeedBlocksPerMinute: 4,
  prompts: {
    instructionGeneration: "Analyze layers. Identify interlocking points. Generate assembly steps.",
    designValidation: "Check structural integrity and interlock logic."
  },
  materials: [...MATERIAL_COLORS]
};

export const BROCK_SPECS: Record<BrockType, BrockSpec> = {
  [BrockType.BASE]: { name: 'BASE-Brock', description: '0.20m Cube.', dimensions: { x: 1, y: 1, z: 1 }, weight: 1.22, cost: 11.50, color: CORK_COLOR, isConnector: false },
  [BrockType.DOUBLE]: { name: 'DOUBLE - Brock', description: '0.40m Tall.', dimensions: { x: 1, y: 2, z: 1 }, weight: 2.45, cost: 23.08, color: CORK_COLOR, isConnector: false },
  [BrockType.CONN_1D]: { name: '1D - Brock', description: 'Linear Connector.', dimensions: { x: 1, y: 1, z: 1 }, weight: 0.94, cost: 8.87, color: CORK_COLOR, isConnector: true },
  [BrockType.CONN_2D]: { name: '2D - Brock', description: 'Corner Connector.', dimensions: { x: 1.5, y: 1, z: 1.5 }, weight: 1.88, cost: 17.77, color: CORK_COLOR, isConnector: true },
  [BrockType.CONN_3D]: { name: '3D - Brock', description: 'T-Junction Connector.', dimensions: { x: 2.0, y: 1, z: 1.5 }, weight: 2.35, cost: 22.14, color: CORK_COLOR, isConnector: true },
  [BrockType.CONN_4D]: { name: '4D - Brock', description: '4-Way Connector.', dimensions: { x: 2.0, y: 1, z: 2.0 }, weight: 2.82, cost: 26.56, color: CORK_COLOR, isConnector: true },
  [BrockType.TERMINAL]: { name: 'T - Brock', description: 'Finishing Cap.', dimensions: { x: 1, y: 1, z: 1 }, weight: 0.47, cost: 4.44, color: CORK_COLOR, isConnector: false },
};

export const AppConfigService = {
    get: () => APP_CONFIG,
    setPrice: (type: BrockType, price: number) => { APP_CONFIG.prices[type] = price; BROCK_SPECS[type].cost = price; notify(); },
    setWeight: (type: BrockType, weight: number) => { APP_CONFIG.weights[type] = weight; BROCK_SPECS[type].weight = weight; notify(); },
    setSdgImpact: (type: BrockType, val: number) => { APP_CONFIG.sdgImpacts[type] = val; notify(); },
    setAssemblySpeed: (speed: number) => { APP_CONFIG.assemblySpeedBlocksPerMinute = speed; notify(); },
    setPrompt: (key: keyof AppConfig['prompts'], val: string) => { APP_CONFIG.prompts[key] = val; notify(); },
    setMaterials: (materials: MaterialDef[]) => { APP_CONFIG.materials = materials; notify(); },
    setColor: (type: BrockType, color: string) => { BROCK_SPECS[type].color = color; notify(); },
    setGlobalColor: (color: string) => { Object.keys(BROCK_SPECS).forEach(key => { BROCK_SPECS[key as BrockType].color = color; }); notify(); },
    reset: () => {
        // Reset to initial values
        APP_CONFIG.prices = {
            [BrockType.BASE]: 11.50, [BrockType.DOUBLE]: 23.08, [BrockType.CONN_1D]: 8.87,
            [BrockType.CONN_2D]: 17.77, [BrockType.CONN_3D]: 22.14, [BrockType.CONN_4D]: 26.56, [BrockType.TERMINAL]: 4.44
        };
        APP_CONFIG.weights = {
            [BrockType.BASE]: 1.22, [BrockType.DOUBLE]: 2.45, [BrockType.CONN_1D]: 0.94,
            [BrockType.CONN_2D]: 1.88, [BrockType.CONN_3D]: 2.35, [BrockType.CONN_4D]: 2.82, [BrockType.TERMINAL]: 0.47
        };
        APP_CONFIG.sdgImpacts = {
            [BrockType.BASE]: 10, [BrockType.DOUBLE]: 20, [BrockType.CONN_1D]: 8,
            [BrockType.CONN_2D]: 15, [BrockType.CONN_3D]: 18, [BrockType.CONN_4D]: 22, [BrockType.TERMINAL]: 5
        };
        APP_CONFIG.assemblySpeedBlocksPerMinute = 4;
        Object.keys(BROCK_SPECS).forEach(key => {
            const type = key as BrockType;
            BROCK_SPECS[type].cost = APP_CONFIG.prices[type];
            BROCK_SPECS[type].weight = APP_CONFIG.weights[type];
            BROCK_SPECS[type].color = CORK_COLOR;
        });
        notify();
    },
    subscribe: (cb: () => void) => { listeners.push(cb); return () => { const idx = listeners.indexOf(cb); if (idx > -1) listeners.splice(idx, 1); }; }
};
const listeners: (() => void)[] = [];
const notify = () => listeners.forEach(cb => cb());
