import React, { useMemo, useEffect, useState } from 'react';
import { Challenge, PlacedBrock, BrockType } from '../types';
import { Trophy, X, CheckCircle, Circle, ArrowRight, Award, Play, Share2, Info } from 'lucide-react';
import { CHALLENGES } from '../constants';

interface ChallengeModalProps {
  onClose: () => void;
  onSelectChallenge: (challenge: Challenge) => void;
  activeChallengeId?: string;
}

export const ChallengeModal: React.FC<ChallengeModalProps> = ({ onClose, onSelectChallenge, activeChallengeId }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2 text-amber-600">
            <Trophy size={20} />
            <h2 className="text-lg font-bold text-gray-900">Client Briefs & Challenges</h2>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto grid gap-4">
          <p className="text-gray-600 mb-2">Select a challenge to test your Corkbrick building skills. Meet all the criteria to complete the brief!</p>
          
          {CHALLENGES.map(challenge => {
            const isActive = challenge.id === activeChallengeId;
            return (
              <div 
                key={challenge.id} 
                className={`p-4 rounded-xl border-2 transition-all ${isActive ? 'border-amber-500 bg-amber-50' : 'border-gray-200 hover:border-amber-300 hover:bg-gray-50'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      {challenge.title}
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        challenge.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                        challenge.difficulty === 'Medium' ? 'bg-blue-100 text-blue-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {challenge.difficulty}
                      </span>
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{challenge.description}</p>
                  </div>
                  <button 
                    onClick={() => {
                        onSelectChallenge(challenge);
                        onClose();
                    }}
                    className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all ${isActive ? 'bg-amber-500 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    {isActive ? 'Active' : <><Play size={16} /> Start</>}
                  </button>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100/50 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {challenge.criteria.maxCost && (
                    <div className="text-xs text-gray-500"><span className="font-bold text-gray-700">Max Cost:</span> €{challenge.criteria.maxCost}</div>
                  )}
                  {challenge.criteria.minSdg && (
                    <div className="text-xs text-gray-500"><span className="font-bold text-gray-700">Min SDG:</span> {challenge.criteria.minSdg}</div>
                  )}
                  {challenge.criteria.maxBlocks && (
                    <div className="text-xs text-gray-500"><span className="font-bold text-gray-700">Max Blocks:</span> {challenge.criteria.maxBlocks}</div>
                  )}
                  {challenge.criteria.minBlocks && (
                    <div className="text-xs text-gray-500"><span className="font-bold text-gray-700">Min Blocks:</span> {challenge.criteria.minBlocks}</div>
                  )}
                  {challenge.criteria.exactBlocks && (
                    <div className="text-xs text-gray-500"><span className="font-bold text-gray-700">Exact Blocks:</span> {challenge.criteria.exactBlocks}</div>
                  )}
                  {challenge.criteria.minHeight && (
                    <div className="text-xs text-gray-500"><span className="font-bold text-gray-700">Min Height:</span> {challenge.criteria.minHeight} units</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface ChallengeHUDProps {
  challenge: Challenge;
  blocks: PlacedBrock[];
  stats: { totalCost: number, totalWeight: number, totalSDG: number };
  onClearChallenge: () => void;
  onShare?: () => void;
}

export const ChallengeHUD: React.FC<ChallengeHUDProps> = ({ challenge, blocks, stats, onClearChallenge, onShare }) => {
  const [showCelebration, setShowCelebration] = useState(false);

  const progress = useMemo(() => {
    const c = challenge.criteria;
    const currentHeight = blocks.length > 0 ? Math.max(...blocks.map(b => b.position.y + (b.type === BrockType.DOUBLE ? 2 : 1))) : 0;
    
    const blockCounts: Partial<Record<BrockType, number>> = {};
    blocks.forEach(b => {
        blockCounts[b.type] = (blockCounts[b.type] || 0) + 1;
    });

    const checks = [];

    if (c.maxCost) checks.push({ label: `Cost under €${c.maxCost}`, passed: stats.totalCost > 0 && stats.totalCost <= c.maxCost, current: `€${stats.totalCost.toFixed(2)}` });
    if (c.minSdg) checks.push({ label: `SDG Impact over ${c.minSdg}`, passed: stats.totalSDG >= c.minSdg, current: `${stats.totalSDG.toFixed(2)}` });
    if (c.maxBlocks) checks.push({ label: `Fewer than ${c.maxBlocks} blocks`, passed: blocks.length > 0 && blocks.length <= c.maxBlocks, current: `${blocks.length}` });
    if (c.minBlocks) checks.push({ label: `At least ${c.minBlocks} blocks`, passed: blocks.length >= c.minBlocks, current: `${blocks.length}` });
    if (c.exactBlocks) checks.push({ label: `Exactly ${c.exactBlocks} blocks`, passed: blocks.length === c.exactBlocks, current: `${blocks.length}` });
    if (c.minHeight) checks.push({ label: `At least ${c.minHeight} units high`, passed: currentHeight >= c.minHeight, current: `${currentHeight} units` });
    if (c.maxHeight) checks.push({ label: `Maximum ${c.maxHeight} units high`, passed: blocks.length > 0 && currentHeight <= c.maxHeight, current: `${currentHeight} units` });
    
    if (c.maxDimensions) {
      let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity, maxY = -Infinity;
      blocks.forEach(b => {
        minX = Math.min(minX, b.position.x);
        maxX = Math.max(maxX, b.position.x);
        minZ = Math.min(minZ, b.position.z);
        maxZ = Math.max(maxZ, b.position.z);
        maxY = Math.max(maxY, b.position.y);
      });
      const width = blocks.length > 0 ? (maxX - minX + 1) * 0.2 : 0;
      const depth = blocks.length > 0 ? (maxZ - minZ + 1) * 0.2 : 0;
      const height = blocks.length > 0 ? (maxY + 1) * 0.2 : 0;
      
      const passed = blocks.length > 0 && width <= c.maxDimensions.x && depth <= c.maxDimensions.z && height <= c.maxDimensions.y;
      checks.push({ 
        label: `Fit within ${c.maxDimensions.x}x${c.maxDimensions.y}x${c.maxDimensions.z}m`, 
        passed, 
        current: `${width.toFixed(1)}x${height.toFixed(1)}x${depth.toFixed(1)}m` 
      });
    }

    if (c.exactInventory) {
      let passed = blocks.length > 0;
      let currentStr = '';
      for (const [type, count] of Object.entries(c.exactInventory)) {
        const actual = blockCounts[type as BrockType] || 0;
        if (actual !== count) passed = false;
        currentStr += `${type.replace('CONN_', '').replace('TERMINAL', 'T')}: ${actual}/${count} `;
      }
      checks.push({ label: `Use exact inventory`, passed, current: currentStr.trim() });
    }

    if (c.requiredBlocks) {
        Object.entries(c.requiredBlocks).forEach(([type, count]) => {
            const currentCount = blockCounts[type as BrockType] || 0;
            checks.push({
                label: `Use ${count}x ${type}`,
                passed: currentCount >= count,
                current: `${currentCount}/${count}`
            });
        });
    }

    const allPassed = checks.length > 0 && checks.every(chk => chk.passed);
    return { checks, allPassed };
  }, [challenge, blocks, stats]);

  useEffect(() => {
      if (progress.allPassed && !showCelebration) {
          setShowCelebration(true);
      }
  }, [progress.allPassed]);

  return (
    <div className="absolute top-4 right-4 z-20 w-80">
      <div className="bg-white/95 backdrop-blur-md shadow-2xl border-2 border-amber-300 rounded-xl overflow-hidden animate-in slide-in-from-right-4">
        <div className="bg-amber-100 p-3 flex justify-between items-center border-b border-amber-200">
            <div className="flex items-center gap-2 text-amber-900 font-bold">
                <Trophy size={18} className="text-amber-600" />
                <span className="text-sm">{challenge.title}</span>
            </div>
            <button onClick={onClearChallenge} className="text-amber-600 hover:text-amber-900 bg-amber-200/50 hover:bg-amber-200 p-1 rounded transition"><X size={16}/></button>
        </div>
        
        <div className="p-3 bg-amber-50/50 border-b border-amber-100">
            <p className="text-xs text-gray-700 leading-relaxed mb-2">{challenge.description}</p>
            {challenge.tip && (
                <div className="bg-blue-50 text-blue-800 p-2 rounded-lg text-xs flex items-start gap-2 border border-blue-100 shadow-sm">
                    <Info size={14} className="mt-0.5 shrink-0 text-blue-500" />
                    <span><strong>Tip:</strong> {challenge.tip}</span>
                </div>
            )}
        </div>

        <div className="p-3 space-y-2 bg-white">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Objectives</div>
            {progress.checks.map((check, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                    <div className={`flex items-center gap-2 ${check.passed ? 'text-green-700 font-medium' : 'text-gray-600'}`}>
                        {check.passed ? <CheckCircle size={14} className="text-green-500" /> : <Circle size={14} className="text-gray-300" />}
                        {check.label}
                    </div>
                    <span className={`tabular-nums font-mono ${check.passed ? 'text-green-600' : 'text-gray-400'}`}>{check.current}</span>
                </div>
            ))}
        </div>

        {progress.allPassed && (
            <div className="bg-green-500 text-white p-3 text-center animate-in fade-in slide-in-from-bottom-2">
                <div className="flex justify-center mb-1"><Award size={24} className="animate-bounce" /></div>
                <div className="font-bold text-sm mb-2">Challenge Complete!</div>
                <button 
                  onClick={() => {
                    if (onShare) onShare();
                    else alert("Screenshot saved! Share it with #CorkbrickChallenge");
                  }}
                  className="flex items-center justify-center gap-2 w-full py-1.5 bg-white text-green-600 rounded-lg text-xs font-bold hover:bg-green-50 transition"
                >
                  <Share2 size={14} /> Share Creation
                </button>
            </div>
        )}
      </div>
    </div>
  );
};
