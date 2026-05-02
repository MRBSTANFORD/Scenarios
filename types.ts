
/**
 * 🔒 STABLE MODULE: Core Type Definitions
 * STATUS: FROZEN
 * VERSION: 1.0.0
 */
export enum BrockType {
  BASE = 'BASE',
  DOUBLE = 'DOUBLE',
  CONN_1D = 'CONN_1D',
  CONN_2D = 'CONN_2D',
  CONN_3D = 'CONN_3D',
  CONN_4D = 'CONN_4D',
  TERMINAL = 'TERMINAL'
}

export enum RoomSize {
  UNLIMITED = 'UNLIMITED',
  NICHE_2M = 'NICHE_2M',     // 2m Wide x 1m Deep
  WALL_3M = 'WALL_3M',       // 3m Wide (Wall context)
  CORNER_3M = 'CORNER_3M',   // 3m x 3m Corner
  ROOM_4X5 = 'ROOM_4X5',     // 4m x 5m Full Room
  CUSTOM = 'CUSTOM'          // Custom Dimensions
}

export enum FloorMaterial {
  CORK = 'CORK',
  WOOD_OAK = 'WOOD_OAK',
  WOODEN_FLOORING = 'WOODEN_FLOORING',
  CONCRETE = 'CONCRETE',
  TILE = 'TILE',
  CARPET = 'CARPET'
}

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface Rotation3 {
  x: number;
  y: number;
  z: number;
}

export interface PlacedBrock {
  id: string;
  type: BrockType;
  position: Vector3;
  rotation: Rotation3; // Euler rotation steps (multiples of 90 deg)
  timestamp: number;
  color?: string;
}

export enum PropCategory {
  FURNITURE_DECOR = 'FURNITURE_DECOR',
  STRUCTURES = 'STRUCTURES'
}

export enum PropType {
  // Furniture & Decor
  MATTRESS = 'MATTRESS',
  LAPTOP = 'LAPTOP',
  POTTED_PLANT = 'POTTED_PLANT',
  LAMP = 'LAMP',
  BOOKS = 'BOOKS',
  CHAIR = 'CHAIR',
  TABLE = 'TABLE',
  TV = 'TV',
  COFFEE_CUP = 'COFFEE_CUP',
  RUG = 'RUG',
  SOFA = 'SOFA',
  PICTURE_FRAME = 'PICTURE_FRAME',
  
  // Structures
  WALL = 'WALL',
  DOOR = 'DOOR',
  WINDOW = 'WINDOW',
  STAIRS = 'STAIRS',
  ROOM_DIVIDER = 'ROOM_DIVIDER',
  
  // IKEA Props
  IKEA_KALLAX_2X2 = 'IKEA_KALLAX_2X2',
  IKEA_MALM_BED = 'IKEA_MALM_BED',
  IKEA_LACK_TABLE = 'IKEA_LACK_TABLE',
}

export interface PropSpec {
  type: PropType;
  category: PropCategory;
  name: string;
  description: string;
  requiredSurface: { width: number, depth: number }; // Required flat surface dimensions (x, z)
  icon: string; // Lucide icon name or similar
}

export interface PlacedProp {
  id: string;
  type: PropType;
  position: Vector3;
  rotation: number; // Y-axis rotation in degrees
}

export interface BrockSpec {
  name: string;
  description: string;
  dimensions: Vector3; // In grid units
  weight: number; // kg
  cost: number; // EUR
  color: string;
  isConnector: boolean;
}

export interface ChallengeCriteria {
  maxCost?: number;
  minSdg?: number;
  maxBlocks?: number;
  minBlocks?: number;
  exactBlocks?: number;
  minHeight?: number; // in grid units
  maxHeight?: number; // in grid units
  requiredBlocks?: Partial<Record<BrockType, number>>;
  maxDimensions?: { x: number, y: number, z: number }; // in meters
  exactInventory?: Partial<Record<BrockType, number>>;
}

export interface EnvironmentElement {
  id: string;
  type: 'wall' | 'obstacle' | 'window';
  position: Vector3; // In grid units (center of the element)
  dimensions: Vector3; // In grid units (width, height, depth)
  color?: string;
  opacity?: number;
}

export interface Scenario {
  elements: EnvironmentElement[];
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  tip?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  type?: 'RESTRICTION' | 'TRANSFORMATION' | 'OPEN';
  criteria: ChallengeCriteria;
  scenario?: Scenario;
  rewardText?: string;
}

export interface MaterialDef {
  name: string;
  color: string;
}

export interface AppConfig {
  gridSize: number; // mm
  currency: string;
  prices: Record<BrockType, number>;
  weights: Record<BrockType, number>;
  sdgImpacts: Record<BrockType, number>; // New SDG Impact
  prompts: {
    instructionGeneration: string;
    designValidation: string;
  };
  materials: MaterialDef[];
}
