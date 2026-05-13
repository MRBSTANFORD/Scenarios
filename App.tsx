
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Scene, SceneHandle } from './components/Scene';
import { BrockType, PlacedBrock, Vector3, Rotation3, RoomSize, FloorMaterial, PropType, PlacedProp } from './types';
import { BROCK_SPECS, APP_CONFIG, AppConfigService, ROOM_SPECS, FLOOR_PROPS, PROP_SPECS } from './constants';
import { calculateStats, generateInstructionSteps, calculateSelectionBounds, findFlatSurfaces, calculateStress } from './services/builder';
import { GeoConfig } from './services/geometryConfig';
import { AdminDashboard } from './components/AdminDashboard';
import { BOMModal } from './components/BOMModal';
import { ImportWizard } from './components/ImportWizard';
import { HelpModal } from './components/HelpModal';
import { SubmitModal } from './components/SubmitModal';
import { ChallengeModal, ChallengeHUD } from './components/ChallengeSystem';
import { ShareModal } from './components/ShareModal';
import { Challenge } from './types';
import { 
  Box, RotateCw, Play, Pause, ShoppingCart, Trash2, Info, Layers, Undo, Redo, 
  Image as ImageIcon, Hammer, MousePointer2, Save, Upload, Move, AlertTriangle, Focus, Magnet, Settings, Copy, Clipboard, Leaf, Euro, Cuboid, Ruler, Layout, Grid3X3, Camera, Scaling, FileBox, HelpCircle, ChevronUp, ChevronDown, Trophy, Activity, Sun, Hand,
  Check, Bed, Laptop, Lightbulb, Book, Star, Lock, Armchair, Table, Monitor, Coffee, Square, Sofa, Image, DoorOpen, Maximize, TrendingUp, Columns, X, Clock
} from 'lucide-react';

const PropIcon: React.FC<{ iconName: string; className?: string }> = ({ iconName, className }) => {
  switch (iconName) {
    case 'Bed': return <Bed className={className} />;
    case 'Laptop': return <Laptop className={className} />;
    case 'Leaf': return <Leaf className={className} />;
    case 'Lightbulb': return <Lightbulb className={className} />;
    case 'Book': return <Book className={className} />;
    case 'Armchair': return <Armchair className={className} />;
    case 'Table': return <Table className={className} />;
    case 'Monitor': return <Monitor className={className} />;
    case 'Coffee': return <Coffee className={className} />;
    case 'Square': return <Square className={className} />;
    case 'Sofa': return <Sofa className={className} />;
    case 'Image': return <Image className={className} />;
    case 'DoorOpen': return <DoorOpen className={className} />;
    case 'Maximize': return <Maximize className={className} />;
    case 'TrendingUp': return <TrendingUp className={className} />;
    case 'Columns': return <Columns className={className} />;
    default: return <Star className={className} />;
  }
};

const BlockIcon: React.FC<{ type: BrockType; color: string; isSelected: boolean }> = ({ type, color, isSelected }) => {
  const strokeColor = isSelected ? '#ea580c' : '#78350f'; 
  const fillColor = color;
  const renderShape = () => {
    switch (type) {
      case BrockType.BASE: return <rect x="5" y="5" width="14" height="14" rx="1" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />;
      case BrockType.DOUBLE: return <g><rect x="6" y="3" width="12" height="18" rx="1" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" /><line x1="6" y1="12" x2="18" y2="12" stroke={strokeColor} strokeWidth="1" opacity="0.6" /></g>;
      case BrockType.CONN_1D: return <path d="M6 5h3v5.5h6V5h3v14h-3v-5.5H9V19H6z" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />;
      case BrockType.CONN_2D: return <path d="M5 5h3v11h11v3H5z" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />;
      case BrockType.CONN_3D: return <path d="M4 6h16v3.5h-6.25v10h-3.5v-10H4z" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />;
      case BrockType.CONN_4D: return <path d="M10.25 4h3.5v6.25H20v3.5h-6.25V20h-3.5v-6.25H4v-3.5h6.25z" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />;
      case BrockType.TERMINAL: return <path d="M4 10h16v6H4z" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />;
      default: return <circle cx="12" cy="12" r="6" fill={fillColor} />;
    }
  };
  return <svg width="24" height="24" viewBox="0 0 24 24" className={`transition-transform duration-200 ${isSelected ? 'scale-110' : ''}`}>{renderShape()}</svg>;
};

const ProjectStatsHUD: React.FC<{ 
    stats: { totalCost: number, totalWeight: number, totalSDG: number }, 
    blockCount: number,
    selectionSize: { width: number, height: number, depth: number } | null 
}> = ({ stats, blockCount, selectionSize }) => {
    if (!stats) return null;
    return (
        <div className="absolute top-4 left-4 z-20 pointer-events-none select-none">
            <div className="bg-white/80 backdrop-blur-md shadow-lg border border-white/50 rounded-xl p-3 min-w-[160px] animate-in slide-in-from-left-4 fade-in duration-500">
                <div className="flex flex-col mb-2">
                    <div className="flex items-center gap-1.5 text-green-700 font-bold text-sm uppercase tracking-wider">
                        <Leaf size={14} fill="currentColor" className="text-green-600" />
                        SDG Impact
                    </div>
                    <div className="text-2xl font-bold text-green-800 tabular-nums leading-none mt-1">
                        {(stats.totalSDG || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className="text-[10px] text-green-600/80 leading-tight mt-0.5">Sustainable Value Generated</div>
                </div>
                <div className="w-full h-px bg-gradient-to-r from-gray-300 to-transparent my-2"></div>
                <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-gray-600 text-xs font-medium">
                        <div className="flex items-center gap-2"><Euro size={12} /> Cost</div>
                        <span className="tabular-nums">€{(stats.totalCost || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-600 text-xs font-medium">
                        <div className="flex items-center gap-2"><Cuboid size={12} /> Blocks</div>
                        <span className="tabular-nums">{blockCount}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-600 text-xs font-medium">
                        <div className="flex items-center gap-2" title="Estimated assembly time"><Clock size={12} /> Assembly Time</div>
                        <span className="tabular-nums">{Math.ceil(blockCount / (AppConfigService.get().assemblySpeedBlocksPerMinute || 4))} m</span>
                    </div>
                </div>
                {selectionSize && (
                    <>
                        <div className="w-full h-px bg-gradient-to-r from-gray-300 to-transparent my-2"></div>
                        <div className="bg-blue-50/80 rounded p-1.5 border border-blue-100/50">
                             <div className="text-[10px] font-bold text-blue-700 uppercase mb-1 flex items-center gap-1"><Ruler size={10}/> Selection Size</div>
                             <div className="grid grid-cols-3 gap-1 text-[10px] text-blue-900 tabular-nums">
                                 <div className="flex flex-col items-center"><span className="text-blue-400">W</span>{selectionSize.width.toFixed(2)}m</div>
                                 <div className="flex flex-col items-center"><span className="text-blue-400">H</span>{selectionSize.height.toFixed(2)}m</div>
                                 <div className="flex flex-col items-center"><span className="text-blue-400">D</span>{selectionSize.depth.toFixed(2)}m</div>
                             </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

// --- SELECTION INSPECTOR (GUMBALL) ---
const SelectionInspector: React.FC<{
    selectedBlocks: PlacedBrock[];
    onUpdate: (absPos: Vector3, absRot: Rotation3) => void;
}> = ({ selectedBlocks, onUpdate }) => {
    if (selectedBlocks.length === 0) return null;
    
    // Always bind to the first selected item as the leader
    const leader = selectedBlocks[0];
    const [localPos, setLocalPos] = useState<Vector3>({ ...leader.position });
    const [localRot, setLocalRot] = useState<Rotation3>({ ...leader.rotation });

    useEffect(() => {
        setLocalPos({ ...leader.position });
        setLocalRot({ ...leader.rotation });
    }, [leader]);

    const handleApply = () => {
        onUpdate(localPos, localRot);
    };

    const updateAxis = (axis: 'x' | 'y' | 'z', val: number, isRot: boolean) => {
        if (isRot) {
            const steps = Math.round(val / 90);
            setLocalRot(prev => ({ ...prev, [axis]: steps }));
        } else {
            setLocalPos(prev => ({ ...prev, [axis]: val }));
        }
    };

    return (
        <div className="absolute bottom-6 left-6 z-30 bg-white/90 backdrop-blur-md shadow-2xl border border-indigo-100 rounded-2xl p-4 w-72 animate-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <div className="bg-indigo-600 p-1.5 rounded-lg text-white"><Move size={16}/></div>
                    <span className="text-sm font-bold text-gray-800">Transform Inspector</span>
                </div>
                <div className="text-[10px] font-bold text-gray-400 uppercase">{selectedBlocks.length} Items</div>
            </div>

            <div className="space-y-4">
                {/* Position Group */}
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Position (Units)</label>
                    <div className="grid grid-cols-3 gap-2">
                        {['x', 'y', 'z'].map((axis) => (
                            <div key={axis} className="relative">
                                <span className={`absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase ${axis === 'x' ? 'text-red-500' : axis === 'y' ? 'text-green-500' : 'text-blue-500'}`}>{axis}</span>
                                <input 
                                    type="number" step="0.5"
                                    value={localPos[axis as keyof Vector3]}
                                    onChange={(e) => updateAxis(axis as 'x'|'y'|'z', parseFloat(e.target.value), false)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-6 pr-1 py-1.5 text-xs font-mono font-bold focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Rotation Group */}
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Rotation (Degrees)</label>
                    <div className="grid grid-cols-3 gap-2">
                        {['x', 'y', 'z'].map((axis) => (
                            <div key={axis} className="relative">
                                <span className={`absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase ${axis === 'x' ? 'text-red-500' : axis === 'y' ? 'text-green-500' : 'text-blue-500'}`}>{axis}</span>
                                <input 
                                    type="number" step="90"
                                    value={Math.round(localRot[axis as keyof Rotation3] * 90)}
                                    onChange={(e) => updateAxis(axis as 'x'|'y'|'z', parseFloat(e.target.value), true)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-6 pr-1 py-1.5 text-xs font-mono font-bold focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <button 
                    onClick={handleApply}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
                >
                    <Check size={14}/> Apply Changes
                </button>
            </div>
        </div>
    );
}

const App: React.FC = () => {
  const [history, setHistory] = useState<PlacedBrock[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const blocks = useMemo(() => history[historyIndex] || [], [history, historyIndex]);

  const [placedProps, setPlacedProps] = useState<PlacedProp[]>([]);
  const [unlockedProps, setUnlockedProps] = useState<Set<PropType>>(() => {
    const initial = new Set<PropType>();
    Object.values(PROP_SPECS).forEach(spec => {
      if (spec.requiredSurface.width === 0 && spec.requiredSurface.depth === 0) {
        initial.add(spec.type);
      }
    });
    return initial;
  });
  const [activePropType, setActivePropType] = useState<PropType | null>(null);

  const [mode, setMode] = useState<'BUILD' | 'EDIT' | 'MEASURE'>('BUILD');
  const [selectedType, setSelectedType] = useState<BrockType>(BrockType.BASE);
  const [activeColor, setActiveColor] = useState<string>(APP_CONFIG.materials[0].color);
  
  const [roomSize, setRoomSize] = useState<RoomSize>(RoomSize.UNLIMITED);
  const [customRoomDimensions, setCustomRoomDimensions] = useState({ width: 20, length: 20 });
  const [floorMaterial, setFloorMaterial] = useState<FloorMaterial>(FloorMaterial.CORK);
  const [showRuler, setShowRuler] = useState(true);
  const [pendingImport, setPendingImport] = useState<PlacedBrock[] | null>(null);

  const [rotation, setRotation] = useState<Rotation3>({ x: 0, y: 0, z: 0 });
  const [isPrecisionMode, setIsPrecisionMode] = useState(false);
  const [engineerMode, setEngineerMode] = useState(false);
  const [sunTime, setSunTime] = useState(12);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showBOM, setShowBOM] = useState(false); 
  const [showImport, setShowImport] = useState(false); 
  const [showHelp, setShowHelp] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareScreenshotUrl, setShareScreenshotUrl] = useState('');
  const [showChallenges, setShowChallenges] = useState(false);
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [forceRender, setForceRender] = useState(0); 
  const [celebrationProp, setCelebrationProp] = useState<PropType | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const [selectedBlockIds, setSelectedBlockIds] = useState<Set<string>>(new Set());
  const [selectedPropIds, setSelectedPropIds] = useState<Set<string>>(new Set());
  const [isMoving, setIsMoving] = useState(false);
  const [selectionBox, setSelectionBox] = useState<{ start: {x:number, y:number}, current: {x:number, y:number} } | null>(null);
  const [isShiftDown, setIsShiftDown] = useState(false);
  const [clipboard, setClipboard] = useState<PlacedBrock[]>([]);

  const [instructionMode, setInstructionMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const controlsRef = useRef<any>(null);
  const sceneRef = useRef<SceneHandle>(null);
  const [logoError, setLogoError] = useState(false);

  const stats = useMemo(() => calculateStats(blocks), [blocks, forceRender]);
  const selectionSize = useMemo(() => calculateSelectionBounds(blocks, selectedBlockIds), [blocks, selectedBlockIds]);
  const instructionSteps = useMemo(() => generateInstructionSteps(blocks), [blocks]);
  const stressMap = useMemo(() => engineerMode ? calculateStress(blocks) : {}, [blocks, engineerMode]);
  
  const selectedBlocks = useMemo(() => 
    blocks.filter(b => selectedBlockIds.has(b.id)),
  [blocks, selectedBlockIds]);

  const visibleBlockIds = useMemo(() => {
    if (!instructionMode) return new Set<string>();
    const ids = new Set<string>();
    for (let i = 0; i <= currentStep; i++) {
        if (instructionSteps[i]) instructionSteps[i].forEach(b => ids.add(b.id));
    }
    return ids;
  }, [instructionMode, currentStep, instructionSteps]);

  const currentStepName = useMemo(() => {
      if (!instructionMode || !instructionSteps[currentStep] || instructionSteps[currentStep].length === 0) return "";
      const firstBlock = instructionSteps[currentStep][0];
      const spec = BROCK_SPECS[firstBlock.type];
      return `Add ${spec ? spec.name : 'blocks'} to Layer ${Math.round(firstBlock.position.y)}`;
  }, [instructionMode, currentStep, instructionSteps, forceRender]);

  useEffect(() => {
    const unsubGeo = GeoConfig.subscribe(() => setForceRender(prev => prev + 1));
    const unsubApp = AppConfigService.subscribe(() => setForceRender(prev => prev + 1));
    return () => { unsubGeo(); unsubApp(); };
  }, []);

  useEffect(() => {
    // Validation Engine for Props
    const newUnlocked = new Set(unlockedProps);
    let newlyUnlocked: PropType[] = [];

    Object.values(PROP_SPECS).forEach(spec => {
      if (!newUnlocked.has(spec.type)) {
        if (spec.requiredSurface.width === 0 && spec.requiredSurface.depth === 0) {
          newUnlocked.add(spec.type);
          newlyUnlocked.push(spec.type);
        } else {
          const validSurfaces = findFlatSurfaces(blocks, spec.requiredSurface.width, spec.requiredSurface.depth);
          if (validSurfaces.length > 0) {
            newUnlocked.add(spec.type);
            newlyUnlocked.push(spec.type);
          }
        }
      }
    });

    if (newlyUnlocked.length > 0) {
      setUnlockedProps(newUnlocked);
      // Trigger celebration UI for the first newly unlocked prop
      setCelebrationProp(newlyUnlocked[0]);
      setTimeout(() => setCelebrationProp(null), 5000);
    }
  }, [blocks, unlockedProps]);

  useEffect(() => {
      const hasSeenHelp = localStorage.getItem('corkbrick_welcome_seen');
      if (!hasSeenHelp) {
          setShowHelp(true);
          localStorage.setItem('corkbrick_welcome_seen', 'true');
      }
  }, []);

  const pushState = useCallback((newBlocks: PlacedBrock[]) => {
      setHistory(prev => {
          const next = prev.slice(0, historyIndex + 1);
          return [...next, newBlocks];
      });
      setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  const undo = () => {
      if (historyIndex > 0) {
          setHistoryIndex(prev => prev - 1);
          setSelectedBlockIds(new Set());
          setIsMoving(false);
      }
  };

  const redo = () => {
      if (historyIndex < history.length - 1) {
          setHistoryIndex(prev => prev + 1);
          setSelectedBlockIds(new Set());
          setIsMoving(false);
      }
  };

  const handlePlaceBlock = useCallback((position: Vector3, rot: Rotation3) => {
    if (mode !== 'BUILD') return;
    const newBlock: PlacedBrock = {
      id: Math.random().toString(36).substr(2, 9),
      type: selectedType,
      position: { x: position.x, y: position.y, z: position.z },
      rotation: { x: rot.x, y: rot.y, z: rot.z },
      timestamp: Date.now(),
      color: activeColor,
    };
    pushState([...blocks, newBlock]);
    setSelectedBlockIds(new Set()); 
  }, [blocks, selectedType, pushState, mode, activeColor]);

  const handleSelectBlock = useCallback((id: string, isMulti: boolean) => {
      setSelectedPropIds(new Set());
      if (mode === 'EDIT') {
          if (isMulti) {
              setSelectedBlockIds(prev => {
                  const newSet = new Set(prev);
                  if (newSet.has(id)) newSet.delete(id);
                  else newSet.add(id);
                  return newSet;
              });
              setIsMoving(false); 
          } else {
              if (selectedBlockIds.has(id)) {
                  setIsMoving(true);
              } else {
                  setSelectedBlockIds(new Set([id]));
                  setIsMoving(false);
              }
          }
      } else if (mode === 'BUILD' || mode === 'MEASURE') {
          setSelectedBlockIds(new Set([id]));
      }
  }, [mode, selectedBlockIds]);

  const handleSelectProp = useCallback((id: string, isMulti: boolean) => {
      setSelectedBlockIds(new Set());
      if (mode === 'EDIT') {
          if (isMulti) {
              setSelectedPropIds(prev => {
                  const newSet = new Set(prev);
                  if (newSet.has(id)) newSet.delete(id);
                  else newSet.add(id);
                  return newSet;
              });
              setIsMoving(false); 
          } else {
              if (selectedPropIds.has(id)) {
                  setIsMoving(true);
              } else {
                  setSelectedPropIds(new Set([id]));
                  setIsMoving(false);
              }
          }
      } else if (mode === 'BUILD' || mode === 'MEASURE') {
          setSelectedPropIds(new Set([id]));
      }
  }, [mode, selectedPropIds]);

  const handleMoveBlock = useCallback((leaderPos: Vector3, leaderRot: Rotation3) => {
      if (!isMoving) return;
      
      if (selectedBlockIds.size > 0) {
          const leaderId = Array.from(selectedBlockIds)[0];
          const leaderBlock = blocks.find(b => b.id === leaderId);
          if (!leaderBlock) return;

          const dx = leaderPos.x - leaderBlock.position.x;
          const dy = leaderPos.y - leaderBlock.position.y;
          const dz = leaderPos.z - leaderBlock.position.z;

          const newBlocks = blocks.map(b => {
              if (selectedBlockIds.has(b.id)) {
                  return { 
                      ...b, 
                      position: {
                          x: b.position.x + dx,
                          y: b.position.y + dy,
                          z: b.position.z + dz
                      },
                      rotation: (b.id === leaderId) ? { ...leaderRot } : { ...b.rotation }
                  };
              }
              return b;
          });
          
          pushState(newBlocks);
          setIsMoving(false);
      } else if (selectedPropIds.size > 0) {
          const leaderId = Array.from(selectedPropIds)[0];
          const leaderProp = placedProps.find(p => p.id === leaderId);
          if (!leaderProp) return;

          const dx = leaderPos.x - leaderProp.position.x;
          const dy = leaderPos.y - leaderProp.position.y;
          const dz = leaderPos.z - leaderProp.position.z;

          setPlacedProps(prev => prev.map(p => {
              if (selectedPropIds.has(p.id)) {
                  return {
                      ...p,
                      position: {
                          x: p.position.x + dx,
                          y: p.position.y + dy,
                          z: p.position.z + dz
                      },
                      rotation: (p.id === leaderId) ? leaderRot.y * Math.PI / 2 : p.rotation
                  };
              }
              return p;
          }));
          setIsMoving(false);
      }
  }, [blocks, placedProps, isMoving, selectedBlockIds, selectedPropIds, pushState]);

  const handleSetAbsoluteTransform = useCallback((absPos: Vector3, absRot: Rotation3) => {
      if (selectedBlockIds.size === 0) return;
      
      const leaderId = Array.from(selectedBlockIds)[0];
      const leaderBlock = blocks.find(b => b.id === leaderId);
      if (!leaderBlock) return;

      const dx = absPos.x - leaderBlock.position.x;
      const dy = absPos.y - leaderBlock.position.y;
      const dz = absPos.z - leaderBlock.position.z;

      const newBlocks = blocks.map(b => {
          if (selectedBlockIds.has(b.id)) {
              if (b.id === leaderId) {
                  return { ...b, position: { ...absPos }, rotation: { ...absRot } };
              }
              // For followers, maintain relative position but use absolute rotation?
              // Usually, users want absolute rotation to align the whole set.
              return {
                  ...b,
                  position: {
                      x: b.position.x + dx,
                      y: b.position.y + dy,
                      z: b.position.z + dz
                  },
                  rotation: { ...absRot }
              };
          }
          return b;
      });
      pushState(newBlocks);
  }, [blocks, selectedBlockIds, pushState]);

  const executeClear = () => {
    pushState([]);
    setSelectedBlockIds(new Set());
    setHistoryIndex(0);
    setHistory([[]]);
    setInstructionMode(false);
    setIsMoving(false);
    setShowClearConfirm(false);
    setPlacedProps([]);
    setUnlockedProps(new Set());
    setActivePropType(null);
  };

  const handleSelectChallenge = (challenge: Challenge) => {
      setActiveChallenge(challenge);
      executeClear();
  };

  const handleDeleteSelected = () => {
      let changed = false;
      let newBlocks = blocks;
      if (selectedBlockIds.size > 0) {
          newBlocks = blocks.filter(b => !selectedBlockIds.has(b.id));
          setSelectedBlockIds(new Set());
          changed = true;
      }
      if (selectedPropIds.size > 0) {
          setPlacedProps(prev => prev.filter(p => !selectedPropIds.has(p.id)));
          setSelectedPropIds(new Set());
          // Props aren't in history yet, but we update state
      }
      if (changed) {
          pushState(newBlocks);
      }
      setIsMoving(false);
  };

  const handleCopy = () => {
      if (selectedBlockIds.size === 0) return;
      const selectedBlocks = blocks.filter(b => selectedBlockIds.has(b.id));
      setClipboard(JSON.parse(JSON.stringify(selectedBlocks)));
  };

  const handlePaste = () => {
      if (clipboard.length === 0) return;
      const newIds = new Set<string>();
      const newBlocks: PlacedBrock[] = clipboard.map(b => {
          const newId = Math.random().toString(36).substr(2, 9);
          newIds.add(newId);
          return {
              ...JSON.parse(JSON.stringify(b)),
              id: newId,
              timestamp: Date.now()
          };
      });
      const updatedWorld = [...blocks, ...newBlocks];
      pushState(updatedWorld);
      setSelectedBlockIds(newIds);
      setMode('EDIT');
      setIsMoving(true); 
  };

  const handleUpdateSelected = (
      posDelta: {x:number, y:number, z:number}, 
      rotDelta: {x:number, y:number, z:number}
  ) => {
      if (selectedBlockIds.size === 0) return;
      const leaderId = Array.from(selectedBlockIds)[0];
      const leader = blocks.find(b => b.id === leaderId);
      if (!leader) return;

      const newBlocks = blocks.map(b => {
          if (!selectedBlockIds.has(b.id)) return b;
          let dx = b.position.x - leader.position.x;
          let dy = b.position.y - leader.position.y;
          let dz = b.position.z - leader.position.z;
          
          if (rotDelta.x !== 0) { const s = Math.sign(rotDelta.x); const oldY = dy; const oldZ = dz; dy = -oldZ * s; dz = oldY * s; }
          if (rotDelta.y !== 0) { const s = Math.sign(rotDelta.y); const oldX = dx; const oldZ = dz; dx = oldZ * s; dz = -oldX * s; }
          if (rotDelta.z !== 0) { const s = Math.sign(rotDelta.z); const oldX = dx; const oldY = dy; dx = -oldY * s; dy = oldX * s; }
          
          return { 
              ...b, 
              position: { 
                  x: leader.position.x + dx + posDelta.x, 
                  y: leader.position.y + dy + posDelta.y, 
                  z: leader.position.z + dz + posDelta.z 
              }, 
              rotation: { 
                  x: b.rotation.x + rotDelta.x, 
                  y: b.rotation.y + rotDelta.y, 
                  z: b.rotation.z + rotDelta.z 
              } 
          };
      });
      pushState(newBlocks);
  };

  const toggleInstructionMode = () => {
      if (blocks.length === 0) { alert("Place some blocks first!"); return; }
      setInstructionMode(prev => {
          if (!prev) {
              setCurrentStep(0); setIsPlaying(false); setSelectedBlockIds(new Set()); setIsMoving(false); setMode('EDIT');
          }
          return !prev;
      });
  };

  const handleSaveScene = () => {
      const data = JSON.stringify(blocks, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `corkbrick-scene-${new Date().toISOString().slice(0,10)}.json`;
      a.click(); URL.revokeObjectURL(url);
  };

  const handleLoadScene = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]; if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
          try {
              const loadedBlocks = JSON.parse(ev.target?.result as string);
              if (Array.isArray(loadedBlocks)) {
                  if (blocks.length > 0) {
                      setPendingImport(loadedBlocks);
                  } else {
                      pushState(loadedBlocks);
                      alert("Scene loaded successfully!");
                  }
              }
          } catch (err) { alert("Error parsing file."); }
      };
      reader.readAsText(file); if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleScreenshot = () => {
     const canvas = document.querySelector('canvas');
     if (canvas) {
         try {
             const watermarkedCanvas = document.createElement('canvas');
             watermarkedCanvas.width = canvas.width;
             watermarkedCanvas.height = canvas.height;
             const ctx = watermarkedCanvas.getContext('2d');
             if (ctx) {
                 ctx.drawImage(canvas, 0, 0);
                 
                 ctx.font = 'bold 24px Inter, sans-serif';
                 ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                 ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
                 ctx.shadowBlur = 6;
                 ctx.shadowOffsetX = 2;
                 ctx.shadowOffsetY = 2;
                 
                 const prefix = "Built in ";
                 const brandBold = "Corkbrick";
                 const brandNormal = "Play";
                 const suffix = " - corkbrick.com";
                 
                 ctx.font = 'normal 24px Inter, sans-serif';
                 const prefixWidth = ctx.measureText(prefix).width;
                 const suffixWidth = ctx.measureText(suffix).width;
                 
                 ctx.font = 'bold 24px Inter, sans-serif';
                 const brandBoldWidth = ctx.measureText(brandBold).width;
                 
                 ctx.font = 'normal 24px Inter, sans-serif';
                 const brandNormalWidth = ctx.measureText(brandNormal).width;
                 
                 const totalWidth = prefixWidth + brandBoldWidth + brandNormalWidth + suffixWidth;
                 const startX = canvas.width - totalWidth - 30;
                 const startY = canvas.height - 30;
                 
                 let currentX = startX;
                 ctx.font = 'normal 24px Inter, sans-serif';
                 ctx.fillText(prefix, currentX, startY);
                 currentX += prefixWidth;
                 
                 ctx.font = 'bold 24px Inter, sans-serif';
                 ctx.fillText(brandBold, currentX, startY);
                 currentX += brandBoldWidth;
                 
                 ctx.font = 'normal 24px Inter, sans-serif';
                 ctx.fillText(brandNormal, currentX, startY);
                 currentX += brandNormalWidth;
                 
                 ctx.fillText(suffix, currentX, startY);
                 
                 const dataUrl = watermarkedCanvas.toDataURL('image/png');
                 setShareScreenshotUrl(dataUrl);
                 setShowShareModal(true);
             }
         } catch (e) {
             console.error("Screenshot failed", e);
             alert("Could not capture screenshot.");
         }
     }
  };
  
  const handleClearRequest = () => {
      setShowClearConfirm(true);
  };

  const handleRecenter = () => {
      if (controlsRef.current) {
          controlsRef.current.reset();
      }
  };
  
  const handleImport3D = (importedBlocks: PlacedBrock[]) => {
      if (blocks.length > 0) {
          setPendingImport(importedBlocks);
      } else {
          pushState(importedBlocks);
          setMode('EDIT');
          handleRecenter();
      }
      setShowImport(false);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
      if (mode === 'EDIT' && e.shiftKey) {
          const rect = mainContainerRef.current?.getBoundingClientRect();
          if (rect) {
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            setSelectionBox({ start: { x, y }, current: { x, y } });
          }
      }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
      if (selectionBox) {
          const rect = mainContainerRef.current?.getBoundingClientRect();
          if (rect) {
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            setSelectionBox(prev => prev ? { ...prev, current: { x, y } } : null);
          }
      }
  };

  const handlePointerUp = () => {
      if (selectionBox) {
          const x = Math.min(selectionBox.start.x, selectionBox.current.x);
          const y = Math.min(selectionBox.start.y, selectionBox.current.y);
          const w = Math.abs(selectionBox.current.x - selectionBox.start.x);
          const h = Math.abs(selectionBox.current.y - selectionBox.start.y);
          if (w > 5 && h > 5 && sceneRef.current && mainContainerRef.current) {
             const rect = mainContainerRef.current.getBoundingClientRect();
             const selectedIds = sceneRef.current.getBlocksInRect({ x, y, w, h }, { w: rect.width, h: rect.height });
             setSelectedBlockIds(prev => {
                const newSet = new Set(prev);
                selectedIds.forEach(id => newSet.add(id));
                return newSet;
             });
          }
          setSelectionBox(null);
      }
  };

  useEffect(() => { if (mainContainerRef.current) mainContainerRef.current.focus(); }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Shift') setIsShiftDown(true);
      if ((e.metaKey || e.ctrlKey) && (e.key === 'c' || e.key === 'C')) { e.preventDefault(); handleCopy(); return; }
      if ((e.metaKey || e.ctrlKey) && (e.key === 'v' || e.key === 'V')) { e.preventDefault(); handlePaste(); return; }
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') { e.preventDefault(); if (e.shiftKey) redo(); else undo(); return; }
      if ((e.metaKey || e.ctrlKey) && e.key === 'y') { e.preventDefault(); redo(); return; }
      if (instructionMode) { if (e.key === 'Escape') setInstructionMode(false); return; }
      if (e.key === 'PageUp') {
          e.preventDefault();
          if (mode === 'BUILD') setRotation(r => ({ ...r, z: r.z + 1 }));
          else if (mode === 'EDIT' && selectedBlockIds.size > 0 && !isMoving) handleUpdateSelected({x:0, y:0, z:0}, {x:0, y:0, z:1});
          return;
      }
      if (e.key === 'PageDown') {
          e.preventDefault();
          if (mode === 'BUILD') setRotation(r => ({ ...r, z: r.z - 1 }));
          else if (mode === 'EDIT' && selectedBlockIds.size > 0 && !isMoving) handleUpdateSelected({x:0, y:0, z:0}, {x:0, y:0, z:-1});
          return;
      }
      if (e.key === 'Tab') {
          e.preventDefault();
          setMode(prev => prev === 'BUILD' ? 'EDIT' : 'BUILD');
          setIsMoving(false);
          return;
      }
      if (e.key === 'Delete' || e.key === 'Backspace') { handleDeleteSelected(); return; }
      if (e.key === 'm' || e.key === 'M') { if (mode === 'EDIT' && selectedBlockIds.size > 0) setIsMoving(!isMoving); }
      if (e.key === 'p' || e.key === 'P') setIsPrecisionMode(prev => !prev);
      if (mode === 'EDIT' && selectedBlockIds.size > 0 && !isMoving) {
          if (e.key === 'w' || e.key === 'W') handleUpdateSelected({x:0, y:0, z:-0.5}, {x:0, y:0, z:0});
          if (e.key === 's' || e.key === 'S') handleUpdateSelected({x:0, y:0, z:0.5}, {x:0, y:0, z:0});
          if (e.key === 'a' || e.key === 'A') handleUpdateSelected({x:-0.5, y:0, z:0}, {x:0, y:0, z:0});
          if (e.key === 'd' || e.key === 'D') handleUpdateSelected({x:0.5, y:0, z:0}, {x:0, y:0, z:0});
          if (e.key === 'ArrowRight' && !e.shiftKey) handleUpdateSelected({x:0, y:0, z:0}, {x:0, y:1, z:0});
          if (e.key === 'ArrowLeft' && !e.shiftKey) handleUpdateSelected({x:0, y:0, z:0}, {x:0, y:-1, z:0});
          if (e.key === 'ArrowUp' && !e.shiftKey) handleUpdateSelected({x:0, y:0, z:0}, {x:-1, y:0, z:0});
          if (e.key === 'ArrowDown' && !e.shiftKey) handleUpdateSelected({x:0, y:0, z:0}, {x:1, y:0, z:0});
          if (e.key === 'ArrowRight' && e.shiftKey) handleUpdateSelected({x:0, y:0, z:0}, {x:0, y:0, z:-1});
          if (e.key === 'ArrowLeft' && e.shiftKey) handleUpdateSelected({x:0, y:0, z:0}, {x:0, y:0, z:1});
      } 
      if (mode === 'BUILD') {
          if (e.key === 'ArrowRight') setRotation(r => ({ ...r, y: r.y + 1 }));
          if (e.key === 'ArrowLeft') setRotation(r => ({ ...r, y: r.y - 1 }));
          if (e.key === 'ArrowUp') setRotation(r => e.shiftKey ? ({ ...r, z: r.z - 1 }) : ({ ...r, x: r.x - 1 }));
          if (e.key === 'ArrowDown') setRotation(r => e.shiftKey ? ({ ...r, z: r.z + 1 }) : ({ ...r, x: r.x + 1 }));
          if (e.code === 'KeyZ') setRotation(r => ({ ...r, z: r.z + 1 }));
      }
      if (e.key === 'Escape') {
          if (isMoving) setIsMoving(false);
          else if (showClearConfirm) setShowClearConfirm(false);
          else if (showChallenges) setShowChallenges(false);
          else if (showDashboard) setShowDashboard(false);
          else if (showBOM) setShowBOM(false);
          else if (showImport) setShowImport(false);
          else if (showHelp) setShowHelp(false);
          else if (mode === 'MEASURE') setMode('EDIT'); 
          else setSelectedBlockIds(new Set());
      }
      if (e.code === 'KeyO' && mode === 'BUILD') setRotation({ x: 0, y: 0, z: 0 });
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
      if (e.key === 'Shift') setIsShiftDown(false);
  };

  return (
    <div 
        ref={mainContainerRef} 
        className={`h-screen w-screen flex flex-col font-sans text-gray-800 outline-none select-none ${isShiftDown && mode === 'EDIT' ? 'cursor-crosshair' : (mode === 'MEASURE' ? 'cursor-none' : '')}`}
        tabIndex={0} 
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
    >
      <input type="file" ref={fileInputRef} onChange={handleLoadScene} className="hidden" accept=".json"/>
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
      {showSubmitModal && <SubmitModal onClose={() => setShowSubmitModal(false)} blocks={blocks} props={placedProps} stats={{totalBlocks: blocks.length, totalCost: stats.totalCost, totalWeight: stats.totalWeight, sdgImpact: stats.totalSDG}} />}
      {showShareModal && <ShareModal imageUrl={shareScreenshotUrl} onClose={() => setShowShareModal(false)} />}
      {showChallenges && <ChallengeModal onClose={() => setShowChallenges(false)} onSelectChallenge={handleSelectChallenge} activeChallengeId={activeChallenge?.id} />}
      {activeChallenge && <ChallengeHUD challenge={activeChallenge} blocks={blocks} stats={stats} onClearChallenge={() => setActiveChallenge(null)} onShare={handleScreenshot} />}
      {showDashboard && <AdminDashboard onClose={() => setShowDashboard(false)} />}
      {showBOM && <BOMModal blocks={blocks} onClose={() => setShowBOM(false)} />}
      {showImport && <ImportWizard onClose={() => setShowImport(false)} onImport={handleImport3D} />}
      
      {pendingImport && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Import Design</h2>
                  <p className="text-gray-600 mb-6">You already have blocks in your scene. Would you like to replace your current scene, or add the new design to it?</p>
                  <div className="flex flex-col gap-3">
                      <button onClick={() => {
                          pushState(pendingImport);
                          setPendingImport(null);
                          setMode('EDIT');
                          handleRecenter();
                      }} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors">
                          Replace Current Scene
                      </button>
                      <button onClick={() => {
                          const offset = { x: 200, y: 0, z: 200 };
                          const newBlocks = pendingImport.map(b => ({
                              ...b,
                              id: Math.random().toString(36).substr(2, 9),
                              position: {
                                  x: b.position.x + offset.x,
                                  y: b.position.y + offset.y,
                                  z: b.position.z + offset.z
                              }
                          }));
                          pushState([...blocks, ...newBlocks]);
                          setPendingImport(null);
                          setMode('EDIT');
                      }} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors">
                          Add to Current Scene
                      </button>
                      <button onClick={() => setPendingImport(null)} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl transition-colors">
                          Cancel
                      </button>
                  </div>
              </div>
          </div>
      )}

      {celebrationProp && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-4 fade-in duration-500">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border-2 border-white/20">
                  <div className="bg-white/20 p-3 rounded-xl">
                      <PropIcon iconName={PROP_SPECS[celebrationProp].icon} className="w-8 h-8" />
                  </div>
                  <div>
                      <div className="text-indigo-100 text-sm font-bold tracking-wider uppercase">New Prop Unlocked!</div>
                      <div className="text-xl font-bold">{PROP_SPECS[celebrationProp].name}</div>
                      <div className="text-indigo-100 text-sm">{PROP_SPECS[celebrationProp].description}</div>
                  </div>
              </div>
          </div>
      )}

      {selectionBox && (
          <div className="absolute z-50 border border-blue-500 bg-blue-500/20 pointer-events-none" style={{ left: Math.min(selectionBox.start.x, selectionBox.current.x), top: Math.min(selectionBox.start.y, selectionBox.current.y), width: Math.abs(selectionBox.current.x - selectionBox.start.x), height: Math.abs(selectionBox.current.y - selectionBox.start.y), }} />
      )}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 border border-gray-100">
             <div className="flex items-center gap-3 text-red-600 mb-2"><AlertTriangle size={24} /><h3 className="text-lg font-bold text-gray-900">Clear Workspace?</h3></div>
             <p className="text-gray-600 mb-6">Are you sure? This will clear your current scene.</p>
             <div className="flex justify-end gap-3">
                 <button onClick={() => setShowClearConfirm(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium">Cancel</button>
                 <button onClick={executeClear} className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg font-medium shadow-sm">Yes, Clear All</button>
             </div>
          </div>
        </div>
      )}
      <header className="bg-white border-b p-3 flex flex-nowrap justify-between items-center shadow-sm z-10 select-none gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
        <div className="flex items-center gap-3 shrink-0">
            <div className="h-10 flex items-center shrink-0">
              {!logoError ? <img src="corkbrick-logo.png" alt="CorkbrickPlay" className="h-full w-auto object-contain" onError={() => setLogoError(true)}/> : 
                <div className="flex items-center gap-2">
                    <h1 className="text-xl tracking-tight text-gray-900"><span className="font-bold">Corkbrick</span><span className="font-normal">Play</span></h1>
                </div>}
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1 px-2 border border-gray-200 shrink-0">
                <div className="flex items-center gap-2"><Layout size={14} className="text-gray-500" />
                    <select value={roomSize} onChange={(e) => setRoomSize(e.target.value as RoomSize)} className="bg-transparent text-xs font-bold text-gray-700 outline-none cursor-pointer w-24 sm:w-32">
                        {(Object.entries(ROOM_SPECS) || []).map(([key, spec]) => (<option key={key} value={key}>{spec.name}</option>))}
                    </select>
                </div>
                {roomSize === RoomSize.CUSTOM && (
                    <>
                        <div className="w-px h-4 bg-gray-300"></div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                            <label className="flex items-center gap-1">W: <input type="number" min="2" max="100" value={customRoomDimensions.width} onChange={(e) => setCustomRoomDimensions(prev => ({ ...prev, width: Number(e.target.value) || 2 }))} className="w-12 px-1 border rounded" />m</label>
                            <label className="flex items-center gap-1">L: <input type="number" min="2" max="100" value={customRoomDimensions.length} onChange={(e) => setCustomRoomDimensions(prev => ({ ...prev, length: Number(e.target.value) || 2 }))} className="w-12 px-1 border rounded" />m</label>
                        </div>
                    </>
                )}
                <div className="w-px h-4 bg-gray-300"></div>
                <div className="flex items-center gap-2"><Grid3X3 size={14} className="text-gray-500" />
                    <select value={floorMaterial} onChange={(e) => setFloorMaterial(e.target.value as FloorMaterial)} className="bg-transparent text-xs font-medium text-gray-700 outline-none cursor-pointer w-20 sm:w-24">
                        {(Object.entries(FLOOR_PROPS) || []).map(([key, prop]) => (<option key={key} value={key}>{prop.name}</option>))}
                    </select>
                </div>
            </div>
        </div>
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg shrink-0">
             <button onClick={() => { setMode('BUILD'); setIsMoving(false); setSelectedBlockIds(new Set()); }} className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-md text-sm font-medium transition-all ${mode === 'BUILD' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}><Hammer size={16} />Build</button>
             <button onClick={() => setMode('EDIT')} className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-md text-sm font-medium transition-all ${mode === 'EDIT' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}><Hand size={16} />Select</button>
             <button onClick={() => setMode('MEASURE')} className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-md text-sm font-medium transition-all ${mode === 'MEASURE' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`} title="Tape Measure Tool"><Ruler size={16} />Measure</button>
             <div className="w-px h-6 bg-gray-300 mx-2 hidden sm:block"></div>
             <button onClick={() => setIsPrecisionMode(!isPrecisionMode)} className={`hidden sm:flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-md text-sm font-medium transition-all ${isPrecisionMode ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`} title="Toggle Precision Snapping (P)"><Magnet size={16} className={isPrecisionMode ? 'text-purple-600' : 'text-gray-400'} /><span>{isPrecisionMode ? 'Free Move' : 'Snap'}</span></button>
             <button onClick={() => setEngineerMode(!engineerMode)} className={`hidden sm:flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-md text-sm font-medium transition-all ${engineerMode ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`} title="Toggle Engineer Vision (Stress View)"><Activity size={16} className={engineerMode ? 'text-red-600' : 'text-gray-400'} /><span>Stress View</span></button>
             <div className="w-px h-6 bg-gray-300 mx-2 hidden sm:block"></div>
             <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md" title="Sun Position Simulator">
                 <Sun size={16} className="text-amber-500"/>
                 <input type="range" min="6" max="18" step="0.5" value={sunTime} onChange={(e) => setSunTime(parseFloat(e.target.value))} className="w-20 h-1.5 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-amber-500" />
             </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
             <button onClick={() => setShowRuler(!showRuler)} className={`p-2 rounded-lg transition-colors ${showRuler ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`} title="Toggle Ruler"><Scaling size={20}/></button>
             <div className="w-px h-6 bg-gray-300 mx-1 hidden sm:block"></div>
             <button onClick={() => setShowDashboard(!showDashboard)} className={`p-2 rounded-lg transition-colors ${showDashboard ? 'bg-gray-200 text-gray-800' : 'text-gray-600 hover:bg-gray-100'}`} title="Geometry Settings"><Settings size={20}/></button>
             <button onClick={handleScreenshot} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg" title="Take Screenshot"><Camera size={20} /></button>
             <div className="w-px h-6 bg-gray-300 mx-1 hidden sm:block"></div>
             <button onClick={handleSaveScene} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg" title="Save Scene"><Save size={20} /></button>
             <button onClick={() => fileInputRef.current?.click()} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg" title="Load Scene"><Upload size={20} /></button>
             <button onClick={() => setShowImport(true)} className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg" title="Import 3D Model"><FileBox size={20} /></button>
             <div className="w-px h-6 bg-gray-300 mx-1 hidden sm:block"></div>
             <button onClick={toggleInstructionMode} className={`px-4 py-2 rounded-lg flex items-center gap-2 transition ${instructionMode ? 'bg-indigo-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}><Layers size={18} /><span className="hidden md:inline">{instructionMode ? 'Exit' : 'Instructions'}</span></button>
             <button onClick={() => setShowBOM(true)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium shadow-sm"><ShoppingCart size={18} /><span className="hidden md:inline">Order BOM</span></button>
             <button onClick={() => setShowSubmitModal(true)} className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium shadow-sm transition-all transform hover:scale-105"><ShoppingCart size={18} /><span className="hidden md:inline">Submit to Shop</span></button>
             <div className="w-px h-6 bg-gray-300 mx-1 hidden sm:block"></div>
             <button onClick={() => setShowChallenges(true)} className="p-2 rounded-full bg-amber-100 text-amber-600 hover:bg-amber-200 transition" title="Challenges"><Trophy size={20}/></button>
             <button onClick={() => setShowHelp(true)} className="p-2 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition" title="Help & Getting Started"><HelpCircle size={20}/></button>
        </div>
      </header>

      <div className="flex-1 flex relative overflow-hidden">
        {/* Mobile Menu Backdrop */}
        {showMobileMenu && (
            <div className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm" onClick={() => setShowMobileMenu(false)} />
        )}
        <aside className={`w-fit min-w-[16rem] max-w-[20rem] bg-white border-r flex flex-col z-50 overflow-y-auto shrink-0 select-none absolute md:relative h-full transition-transform duration-300 md:translate-x-0 ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="md:hidden flex items-center justify-between p-3 border-b bg-gray-50">
                <span className="font-bold text-gray-800">Builder Menu</span>
                <button onClick={() => setShowMobileMenu(false)} className="p-1 rounded hover:bg-gray-200"><X size={20}/></button>
            </div>
            <div className="p-2 grid grid-cols-2 gap-2 border-b bg-gray-50 md:flex md:grid-cols-none">
                <button onClick={undo} disabled={historyIndex <= 0} className="flex-1 flex items-center justify-center gap-1 p-2 rounded bg-white border hover:bg-gray-100 disabled:opacity-50 text-sm font-medium"><Undo size={14} /> Undo</button>
                <button onClick={redo} disabled={historyIndex >= history.length - 1} className="flex-1 flex items-center justify-center gap-1 p-2 rounded bg-white border hover:bg-gray-100 disabled:opacity-50 text-sm font-medium"><Redo size={14} /> Redo</button>
            </div>
            <div className="p-4 border-b">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{mode === 'BUILD' ? 'Builder Mode' : (mode === 'MEASURE' ? 'Measure Tool' : 'Select Mode')}</h3>
                <div className="text-xs text-gray-500 mb-2 space-y-1">
                    {mode === 'BUILD' ? (
                        <><p><span className="font-bold text-orange-600">Click Floor</span> to Place</p><p><span className="font-bold text-orange-600">Click Block</span> to Stack</p><p><span className="font-bold text-orange-600">Arrows</span> to Rotate Ghost</p><p><span className="font-bold text-orange-600">PgUp/Dn</span> Rotate Z</p><p><span className="font-bold text-blue-600">Tab</span> to Select Mode</p></>
                    ) : mode === 'MEASURE' ? (
                        <><p><span className="font-bold text-emerald-600">Click Pt 1</span> to Start</p><p><span className="font-bold text-emerald-600">Click Pt 2</span> to End</p><p><span className="font-bold text-emerald-600">Click Pt 3</span> to Clear</p></>
                    ) : (
                        <><p><span className="font-bold text-blue-600">Shift+Drag</span> Marquee Select</p><p><span className="font-bold text-blue-600">Shift+Click</span> Multi-Select</p><p><span className="font-bold text-blue-600">Ctrl+C/V</span> Copy & Paste</p><p><span className="font-bold text-blue-600">PgUp/Dn</span> Rotate Z</p><p><span className="font-bold text-orange-600">Tab</span> to Build Mode</p></>
                    )}
                </div>
                {mode === 'EDIT' && (
                    <div className="space-y-2 mt-2">
                        {selectedBlockIds.size > 0 && (
                            <div className={`p-2 rounded flex items-center gap-2 text-sm transition-colors ${isMoving ? 'bg-orange-100 text-orange-700 animate-pulse' : 'bg-gray-100 text-gray-600'}`}>
                                <Move size={16} />{isMoving ? 'Click to Drop' : `${selectedBlockIds.size} Selected`}
                            </div>
                        )}
                        {clipboard.length > 0 && (
                             <div className="p-2 rounded bg-blue-50 text-blue-600 text-xs flex items-center gap-2 border border-blue-100"><Clipboard size={14}/>{clipboard.length} items in Clipboard</div>
                        )}
                    </div>
                )}
            </div>
            <div className={`flex-1 p-2 space-y-2 transition-opacity ${mode === 'EDIT' ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                {/* Material Selector */}
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Material</h3>
                        <button 
                            onClick={() => {
                                if (selectedBlockIds.size > 0) {
                                    const newBlocks = blocks.map(b => selectedBlockIds.has(b.id) ? { ...b, color: activeColor } : b);
                                    pushState(newBlocks);
                                } else {
                                    const newBlocks = blocks.map(b => ({ ...b, color: activeColor }));
                                    pushState(newBlocks);
                                }
                            }}
                            className="text-[10px] text-orange-600 hover:text-orange-700 font-medium bg-orange-50 px-2 py-0.5 rounded border border-orange-100"
                            title={selectedBlockIds.size > 0 ? "Apply to selected blocks" : "Apply current material to all placed blocks"}
                        >
                            {selectedBlockIds.size > 0 ? 'Apply to Selected' : 'Apply to All'}
                        </button>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                        {APP_CONFIG.materials.map((mat) => (
                            <button
                                key={mat.name}
                                onClick={() => setActiveColor(mat.color)}
                                className={`h-8 rounded border transition-all flex items-center justify-center ${activeColor === mat.color ? 'ring-2 ring-orange-500 border-transparent' : 'border-gray-200 hover:border-gray-400'}`}
                                title={mat.name}
                                style={{ backgroundColor: mat.color }}
                            />
                        ))}
                    </div>
                </div>

                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Blocks</h3>
                {(Object.values(BROCK_SPECS) || []).map((spec, idx) => (
                    <button key={idx} onClick={() => { setSelectedType(Object.keys(BROCK_SPECS)[idx] as BrockType); if(mode !== 'BUILD') setMode('BUILD'); setActivePropType(null); }} className={`w-full p-2 rounded-lg border text-left transition flex items-center gap-3 group ${selectedType === Object.keys(BROCK_SPECS)[idx] && !activePropType ? 'border-orange-500 bg-orange-50 ring-1 ring-orange-200' : 'border-gray-200 hover:border-orange-300 hover:bg-gray-50'}`}>
                        <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-white rounded shadow-sm border border-gray-100"><BlockIcon type={Object.keys(BROCK_SPECS)[idx] as BrockType} color={activeColor} isSelected={selectedType === Object.keys(BROCK_SPECS)[idx] && !activePropType}/></div>
                        <div className="min-w-0"><div className="font-semibold text-gray-700 text-sm truncate">{spec.name}</div><div className="text-xs text-gray-400 truncate">{spec.dimensions.x}x{spec.dimensions.y}x{spec.dimensions.z}</div></div>
                    </button>
                ))}

                {/* Props Section */}
                <div className="pt-4 border-t mt-4">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-4">Furniture & Decor</h3>
                    <div className="space-y-2">
                        {Object.values(PROP_SPECS).filter(spec => spec.category === 'FURNITURE_DECOR').map(spec => {
                            const isUnlocked = unlockedProps.has(spec.type);
                            return (
                                <button 
                                    key={spec.type} 
                                    onClick={() => { 
                                        if (isUnlocked) {
                                            setActivePropType(spec.type); 
                                            if(mode !== 'BUILD') setMode('BUILD'); 
                                        }
                                    }} 
                                    disabled={!isUnlocked}
                                    className={`w-full p-2 rounded-lg border text-left transition flex items-center gap-3 group relative ${!isUnlocked ? 'opacity-60 cursor-not-allowed bg-gray-50 border-gray-100' : activePropType === spec.type ? 'border-indigo-500 bg-indigo-50 ring-1 ring-indigo-200' : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'}`}
                                    title={!isUnlocked ? `Locked: Build a ${spec.requiredSurface.width}x${spec.requiredSurface.depth} flat surface to unlock.` : spec.description}
                                >
                                    <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center bg-white rounded shadow-sm border border-gray-100 ${isUnlocked ? 'text-indigo-600' : 'text-gray-400'}`}>
                                        <PropIcon iconName={spec.icon} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="font-semibold text-gray-700 text-sm truncate flex items-center gap-2">
                                            {spec.name}
                                            {!isUnlocked && <Lock size={12} className="text-gray-400" />}
                                        </div>
                                        <div className="text-xs text-gray-400 truncate">
                                            {isUnlocked ? spec.description : `Requires ${spec.requiredSurface.width}x${spec.requiredSurface.depth} surface`}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-6">Structures</h3>
                    <div className="space-y-2">
                        {Object.values(PROP_SPECS).filter(spec => spec.category === 'STRUCTURES').map(spec => {
                            const isUnlocked = unlockedProps.has(spec.type);
                            return (
                                <button 
                                    key={spec.type} 
                                    onClick={() => { 
                                        if (isUnlocked) {
                                            setActivePropType(spec.type); 
                                            if(mode !== 'BUILD') setMode('BUILD'); 
                                        }
                                    }} 
                                    disabled={!isUnlocked}
                                    className={`w-full p-2 rounded-lg border text-left transition flex items-center gap-3 group relative ${!isUnlocked ? 'opacity-60 cursor-not-allowed bg-gray-50 border-gray-100' : activePropType === spec.type ? 'border-indigo-500 bg-indigo-50 ring-1 ring-indigo-200' : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'}`}
                                    title={!isUnlocked ? `Locked: Build a ${spec.requiredSurface.width}x${spec.requiredSurface.depth} flat surface to unlock.` : spec.description}
                                >
                                    <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center bg-white rounded shadow-sm border border-gray-100 ${isUnlocked ? 'text-indigo-600' : 'text-gray-400'}`}>
                                        <PropIcon iconName={spec.icon} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="font-semibold text-gray-700 text-sm truncate flex items-center gap-2">
                                            {spec.name}
                                            {!isUnlocked && <Lock size={12} className="text-gray-400" />}
                                        </div>
                                        <div className="text-xs text-gray-400 truncate">
                                            {isUnlocked ? spec.description : `Requires ${spec.requiredSurface.width}x${spec.requiredSurface.depth} surface`}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="p-4 border-t space-y-2"><button onClick={handleClearRequest} className="w-full flex items-center justify-center gap-2 p-2 rounded text-red-600 hover:bg-red-50 text-sm"><Trash2 size={16} /> Clear Scene</button></div>
        </aside>

        <div className="flex-1 relative bg-gray-100 cursor-crosshair group overflow-hidden">
             <ProjectStatsHUD stats={stats} blockCount={blocks.length} selectionSize={selectionSize} />
             <Scene 
                key={forceRender} ref={sceneRef} blocks={blocks} selectedType={selectedType} roomSize={roomSize} customRoomDimensions={customRoomDimensions} floorMaterial={floorMaterial}
                onPlaceBlock={handlePlaceBlock} onSelectBlock={handleSelectBlock} selectedBlockIds={selectedBlockIds} 
                rotation={rotation} instructionMode={instructionMode} visibleBlockIds={visibleBlockIds} 
                mode={mode} isMoving={isMoving} onMoveBlock={handleMoveBlock} controlsRef={controlsRef} 
                isPrecisionMode={isPrecisionMode} isBoxSelecting={!!selectionBox} showRuler={showRuler}
                scenario={activeChallenge?.scenario}
                activePropType={activePropType}
                placedProps={placedProps}
                onPlaceProp={(pos, rot, type) => {
                    setPlacedProps(prev => [...prev, { id: Math.random().toString(36).substr(2, 9), type, position: pos, rotation: rot }]);
                    setActivePropType(null); // Deselect after placing
                }}
                selectedPropIds={selectedPropIds}
                onSelectProp={handleSelectProp}
                stressMap={stressMap}
                sunTime={sunTime}
                activeColor={activeColor}
             />
             
             {/* Gumball / Selection Inspector */}
             {mode === 'EDIT' && selectedBlocks.length > 0 && !isMoving && (
                <SelectionInspector selectedBlocks={selectedBlocks} onUpdate={handleSetAbsoluteTransform} />
             )}

             <button onClick={handleRecenter} className="absolute bottom-6 right-6 p-3 bg-white/90 backdrop-blur rounded-full shadow-lg text-gray-600 hover:text-orange-600 hover:scale-110 transition-all z-20" title="Recenter View"><Focus size={24} /></button>
             {!instructionMode && mode === 'BUILD' && <div className="absolute top-4 right-4 bg-white/80 backdrop-blur p-2 rounded text-xs text-gray-500 font-mono pointer-events-none z-10">ROT: [X:{rotation.x % 4}, Y:{rotation.y % 4}, Z:{rotation.z % 4}]</div>}
             {instructionMode && (
                 <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t p-6 shadow-up-lg transition-transform duration-300 z-20 md:pb-6 pb-20">
                     <div className="max-w-3xl mx-auto">
                        <div className="flex justify-between items-center mb-4"><div><h2 className="text-lg font-bold text-gray-800">Assembly Instructions</h2><p className="text-orange-600 font-medium">{currentStepName}</p></div><div className="text-2xl font-mono text-gray-300">{String(currentStep + 1).padStart(2, '0')} / {String(instructionSteps.length).padStart(2, '0')}</div></div>
                        <div className="flex items-center gap-4"><button onClick={() => setIsPlaying(!isPlaying)} className="w-12 h-12 rounded-full bg-orange-600 text-white flex items-center justify-center hover:bg-orange-700 shadow-lg">{isPlaying ? <Pause fill="currentColor" /> : <Play fill="currentColor" className="ml-1" />}</button><input type="range" min="0" max={Math.max(0, instructionSteps.length - 1)} value={currentStep} onChange={(e) => { setIsPlaying(false); setCurrentStep(parseInt(e.target.value)); }} className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600" /></div>
                     </div>
                 </div>
             )}

             {/* Mobile / Tablet Action Bar */}
             {!instructionMode && (
                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 bg-white/90 backdrop-blur-md shadow-2xl border border-gray-200 rounded-2xl p-2 flex items-center gap-1 md:hidden overflow-x-auto max-w-[95vw]">
                    <button onClick={() => setShowMobileMenu(true)} className="p-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 active:bg-gray-300 transition-colors flex flex-col items-center gap-1 min-w-[60px]" title="Open Builder Menu">
                        <Layout size={20} />
                        <span className="text-[9px] font-bold uppercase">Menu</span>
                    </button>
                    <div className="w-px h-8 bg-gray-300 mx-1 shrink-0"></div>
                    <button onClick={undo} disabled={historyIndex <= 0} className="p-2 text-gray-600 hover:bg-gray-100 active:bg-gray-200 rounded-xl disabled:opacity-30 transition-colors flex flex-col items-center gap-1 min-w-[60px]">
                        <Undo size={20} />
                        <span className="text-[9px] font-bold uppercase">Undo</span>
                    </button>
                    <button onClick={() => { if (mode === 'BUILD') setRotation(r => ({ ...r, z: r.z - 1 })); else if (mode === 'EDIT' && selectedBlockIds.size > 0 && !isMoving) handleUpdateSelected({x:0, y:0, z:0}, {x:0, y:0, z:-1}); }} className="p-2 text-blue-600 hover:bg-blue-50 active:bg-blue-100 rounded-xl transition-colors flex flex-col items-center gap-1 min-w-[60px]" title="Rotate Z">
                        <RotateCw size={20} />
                        <span className="text-[9px] font-bold uppercase">Rot Z</span>
                    </button>
                    <button onClick={() => { if (mode === 'BUILD') setRotation(r => ({ ...r, y: r.y + 1 })); }} className={`p-2 text-orange-600 hover:bg-orange-50 active:bg-orange-100 rounded-xl transition-colors flex flex-col items-center gap-1 min-w-[60px] ${mode !== 'BUILD' ? 'opacity-30 pointer-events-none' : ''}`} title="Rotate Y">
                        <Layers size={20} />
                        <span className="text-[9px] font-bold uppercase">Rot Y</span>
                    </button>
                    <div className="w-px h-8 bg-gray-300 mx-1 shrink-0"></div>
                    {mode === 'EDIT' ? (
                        <>
                            <button onClick={handleCopy} disabled={selectedBlockIds.size === 0} className="p-2 text-gray-600 hover:bg-gray-100 active:bg-gray-200 rounded-xl disabled:opacity-30 transition-colors flex flex-col items-center gap-1 min-w-[60px]" title="Copy">
                                <Copy size={20} />
                                <span className="text-[9px] font-bold uppercase">Copy</span>
                            </button>
                            <button onClick={handlePaste} disabled={clipboard.length === 0} className="p-2 text-gray-600 hover:bg-gray-100 active:bg-gray-200 rounded-xl disabled:opacity-30 transition-colors flex flex-col items-center gap-1 min-w-[60px]" title="Paste">
                                <Clipboard size={20} />
                                <span className="text-[9px] font-bold uppercase">Paste</span>
                            </button>
                            <button onClick={handleDeleteSelected} disabled={selectedBlockIds.size === 0 && selectedPropIds.size === 0} className="p-2 text-red-600 hover:bg-red-50 active:bg-red-100 rounded-xl disabled:opacity-30 transition-colors flex flex-col items-center gap-1 min-w-[60px]" title="Delete">
                                <Trash2 size={20} />
                                <span className="text-[9px] font-bold uppercase">Delete</span>
                            </button>
                            <button onClick={() => setMode('BUILD')} className="p-2 text-orange-600 bg-orange-50 hover:bg-orange-100 active:bg-orange-200 rounded-xl font-bold text-sm px-4 flex flex-col items-center gap-1 min-w-[60px]">
                                <Box size={20} />
                                <span className="text-[9px] font-bold uppercase text-orange-700">Build</span>
                            </button>
                        </>
                    ) : (
                        <button onClick={() => setMode('EDIT')} className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 active:bg-blue-200 rounded-xl font-bold text-sm px-4 flex flex-col items-center gap-1 min-w-[60px]">
                            <MousePointer2 size={20} />
                            <span className="text-[9px] font-bold uppercase text-blue-700">Select</span>
                        </button>
                    )}
                 </div>
             )}
        </div>
      </div>
    </div>
  );
};

export default App;
