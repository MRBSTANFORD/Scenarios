import React from 'react';
import { Challenge, PlacedBrock } from '../types';
import { CHALLENGES } from '../constants';
import { CheckCircle2, Circle, Trophy, ArrowRight } from 'lucide-react';

interface ChallengesPanelProps {
  activeChallengeId: string | null;
  setActiveChallengeId: (id: string | null) => void;
  stats: {
    totalBlocks: number;
    totalCost: number;
    totalWeight: number;
    sdgImpact: number;
  };
  blocks: PlacedBrock[];
}

export const ChallengesPanel: React.FC<ChallengesPanelProps> = ({ activeChallengeId, setActiveChallengeId, stats, blocks }) => {
  
  const checkChallengeStatus = (challenge: Challenge) => {
    if (!challenge.criteria) return false;
    const { maxCost, maxBlocks, maxDimensions, exactInventory } = challenge.criteria;
    
    if (maxCost && stats.totalCost > maxCost) return false;
    if (maxBlocks && stats.totalBlocks > maxBlocks) return false;
    
    if (maxDimensions) {
      // Calculate bounding box in meters (grid size is 0.2m per unit)
      let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity, maxY = -Infinity;
      blocks.forEach(b => {
        minX = Math.min(minX, b.position.x);
        maxX = Math.max(maxX, b.position.x);
        minZ = Math.min(minZ, b.position.z);
        maxZ = Math.max(maxZ, b.position.z);
        maxY = Math.max(maxY, b.position.y);
      });
      
      const width = (maxX - minX + 1) * 0.2;
      const depth = (maxZ - minZ + 1) * 0.2;
      const height = (maxY + 1) * 0.2;
      
      if (width > maxDimensions.x || depth > maxDimensions.z || height > maxDimensions.y) {
        return false;
      }
    }
    
    if (exactInventory) {
      const counts: Record<string, number> = {};
      blocks.forEach(b => {
        counts[b.type] = (counts[b.type] || 0) + 1;
      });
      
      for (const [type, count] of Object.entries(exactInventory)) {
        if ((counts[type] || 0) !== count) return false;
      }
    }
    
    return true;
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full shadow-xl z-20">
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-white">
        <h2 className="text-lg font-bold text-indigo-900 flex items-center gap-2">
          <Trophy size={20} className="text-yellow-500" /> Challenges
        </h2>
        <p className="text-xs text-gray-500 mt-1">Complete challenges to earn rewards and test your skills.</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {CHALLENGES.map(challenge => {
          const isActive = activeChallengeId === challenge.id;
          const isCompleted = isActive && checkChallengeStatus(challenge);
          
          return (
            <div 
              key={challenge.id}
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                isActive 
                  ? isCompleted 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-100 hover:border-indigo-200 hover:bg-gray-50'
              }`}
              onClick={() => setActiveChallengeId(isActive ? null : challenge.id)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className={`font-bold text-sm ${isActive ? (isCompleted ? 'text-green-800' : 'text-indigo-900') : 'text-gray-800'}`}>
                  {challenge.title}
                </h3>
                {isCompleted ? (
                  <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                ) : (
                  <Circle size={18} className={isActive ? 'text-indigo-300' : 'text-gray-300'} />
                )}
              </div>
              
              <p className="text-xs text-gray-600 mb-3">{challenge.description}</p>
              
              {isActive && (
                <div className="space-y-2 animate-in slide-in-from-top-2">
                  <div className="bg-white/60 p-2 rounded text-xs text-gray-700 border border-white/40">
                    <strong>Tip:</strong> {challenge.tip}
                  </div>
                  
                  {isCompleted && (
                    <div className="bg-green-100 text-green-800 p-2 rounded text-xs font-bold flex items-center gap-2">
                      🎉 {challenge.rewardText}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
