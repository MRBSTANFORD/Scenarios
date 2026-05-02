import React, { useState } from 'react';
import { X, Copy, Mail, CheckCircle2 } from 'lucide-react';
import { PlacedBrock, PlacedProp } from '../types';

interface SubmitModalProps {
  onClose: () => void;
  blocks: PlacedBrock[];
  props: PlacedProp[];
  stats: {
    totalBlocks: number;
    totalCost: number;
    totalWeight: number;
    sdgImpact: number;
  };
}

export const SubmitModal: React.FC<SubmitModalProps> = ({ onClose, blocks, props, stats }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [designName, setDesignName] = useState('');
  const [description, setDescription] = useState('');

  const handleDownload = async () => {
    const data = {
      name: designName || 'My Corkbrick Design',
      description,
      stats,
      blocks,
      props,
      version: '1.0'
    };
    try {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      setStep(2);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('Failed to copy design data to clipboard.');
    }
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`New Design Submission: ${designName}`);
    const body = encodeURIComponent(
      `Hello Corkbrick Team,\n\nI would like to submit my design for the Corkbrick Shop!\n\nName: ${designName}\nDescription: ${description}\n\nTotal Blocks: ${stats.totalBlocks}\nTotal Cost: €${stats.totalCost.toFixed(2)}\n\n(Please paste the copied JSON data below this line)\n--------------------------------------------------\n\n\nBest regards,`
    );
    window.location.href = `mailto:design@corkbrick.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b bg-indigo-50">
          <h2 className="text-lg font-bold text-indigo-900 flex items-center gap-2">
            🚀 Submit to Shop
          </h2>
          <button onClick={onClose} className="text-indigo-400 hover:text-indigo-600 p-1 hover:bg-indigo-100 rounded-full transition">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {step === 1 ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Submit your creation to the Corkbrick Shop! If your design is selected, you could earn lifelong royalties.
              </p>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Design Name</label>
                <input 
                  type="text" 
                  value={designName}
                  onChange={(e) => setDesignName(e.target.value)}
                  placeholder="e.g. The Ultimate Standing Desk"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell us what makes this design special..."
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
                />
              </div>

              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-xs text-gray-600 space-y-1">
                <div className="flex justify-between"><span>Blocks:</span> <span className="font-bold">{stats.totalBlocks}</span></div>
                <div className="flex justify-between"><span>Cost:</span> <span className="font-bold">€{stats.totalCost.toFixed(2)}</span></div>
              </div>

              <button 
                onClick={handleDownload}
                disabled={!designName.trim()}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <Copy size={18} /> Copy Design Data
              </button>
            </div>
          ) : (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Design Copied!</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Your design data has been copied to your clipboard. To complete your submission, please email it to our team.
                </p>
              </div>
              
              <button 
                onClick={handleEmail}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <Mail size={18} /> Email Design to Corkbrick
              </button>
              
              <p className="text-xs text-gray-400">
                Don't forget to paste the copied JSON data into the email!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
