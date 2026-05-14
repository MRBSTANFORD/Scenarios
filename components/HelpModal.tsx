
import React, { useState } from 'react';
import { X, MousePointer2, Hammer, Hand, Move, Keyboard, Settings, Info, Heart, Leaf, Box, Layers, Mouse, Trophy, Activity, Sun, FileBox, ShoppingCart, Layout, Camera, Share2, Upload, Download } from 'lucide-react';

interface HelpModalProps {
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'WELCOME' | 'CONTROLS' | 'TOOLS' | 'VISION' | 'GAMIFICATION' | 'SYSTEM'>('WELCOME');

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full flex flex-col max-h-[90vh] overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-orange-500 to-amber-600 text-white flex justify-between items-start shrink-0">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Info className="text-white/80" /> <span className="font-bold">Corkbrick</span><span className="font-normal">Play</span> Guide
            </h2>
            <p className="text-orange-100 text-sm mt-1">
              Your gateway to sustainable, modular furniture design.
            </p>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white p-1 hover:bg-white/10 rounded-full transition">
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap border-b bg-gray-50">
            <button onClick={() => setActiveTab('WELCOME')} className={`px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors whitespace-nowrap ${activeTab === 'WELCOME' ? 'bg-white text-orange-600 border-t-2 border-orange-600' : 'text-gray-500 hover:text-gray-700'}`}>
                <Hand size={16}/> Welcome
            </button>
            <button onClick={() => setActiveTab('VISION')} className={`px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors whitespace-nowrap ${activeTab === 'VISION' ? 'bg-white text-orange-600 border-t-2 border-orange-600' : 'text-gray-500 hover:text-gray-700'}`}>
                <Leaf size={16}/> Vision & Values
            </button>
            <button onClick={() => setActiveTab('CONTROLS')} className={`px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors whitespace-nowrap ${activeTab === 'CONTROLS' ? 'bg-white text-orange-600 border-t-2 border-orange-600' : 'text-gray-500 hover:text-gray-700'}`}>
                <Mouse size={16}/> Controls
            </button>
            <button onClick={() => setActiveTab('TOOLS')} className={`px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors whitespace-nowrap ${activeTab === 'TOOLS' ? 'bg-white text-orange-600 border-t-2 border-orange-600' : 'text-gray-500 hover:text-gray-700'}`}>
                <Box size={16}/> Advanced Tools
            </button>
            <button onClick={() => setActiveTab('GAMIFICATION')} className={`px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors whitespace-nowrap ${activeTab === 'GAMIFICATION' ? 'bg-white text-orange-600 border-t-2 border-orange-600' : 'text-gray-500 hover:text-gray-700'}`}>
                <Trophy size={16}/> Gamification
            </button>
            <button onClick={() => setActiveTab('SYSTEM')} className={`px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors whitespace-nowrap ${activeTab === 'SYSTEM' ? 'bg-white text-orange-600 border-t-2 border-orange-600' : 'text-gray-500 hover:text-gray-700'}`}>
                <Settings size={16}/> System Config
            </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-white">
            
            {/* TAB: WELCOME */}
            {activeTab === 'WELCOME' && (
                <div className="space-y-6 animate-in slide-in-from-bottom-2">
                    <div className="text-center space-y-4 max-w-2xl mx-auto mb-8">
                        <h3 className="text-2xl font-bold text-gray-800">Build Anything. Change Everything.</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Welcome to <span className="font-bold">Corkbrick</span><span className="font-normal">Play</span>. 
                            Our modular system allows you to build furniture, walls, and structures without tools, screws, or glue.
                            Just purely natural, sustainable cork blocks that interlock like magic.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-orange-50 p-5 rounded-xl border border-orange-100">
                            <h4 className="font-bold text-orange-800 mb-2 flex items-center gap-2"><Hammer size={18}/> 1. Build Mode</h4>
                            <p className="text-sm text-gray-700 mb-2">The default mode. Select a block from the left panel and click anywhere in the 3D space to place it.</p>
                            <ul className="text-sm text-gray-600 list-disc list-inside space-y-1 ml-1">
                                <li>Blocks snap to the grid automatically.</li>
                                <li>Connectors automatically align to structural blocks.</li>
                                <li>Use arrow keys to rotate before placing.</li>
                            </ul>
                        </div>
                        <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                            <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2"><Hand size={18}/> 2. Select Mode (Empty Hand)</h4>
                            <p className="text-sm text-gray-700 mb-2">Switch to Select Mode (Tab) to modify your creation without placing new blocks.</p>
                            <ul className="text-sm text-gray-600 list-disc list-inside space-y-1 ml-1">
                                <li>Click a block to select it.</li>
                                <li><strong>Shift + Click</strong> to select multiple blocks.</li>
                                <li>Press 'M' or click "Move" to drag selected blocks.</li>
                                <li>Press 'Delete' to remove blocks.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Sponsorship Teaser */}
                    <div className="mt-8 bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-100 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100 rounded-full blur-3xl opacity-50 -mr-10 -mt-10 pointer-events-none"></div>
                        <div className="relative z-10">
                            <h4 className="text-lg font-bold text-indigo-900 mb-2 flex items-center gap-2">
                                🚀 Partner with Corkbrick Europe
                            </h4>
                            <p className="text-sm text-indigo-800 mb-4 leading-relaxed max-w-2xl">
                                Help us take this digital builder to a new dimension! We are actively looking for forward-thinking sponsors whose values align with our mission of sustainable, flexible design.
                            </p>
                            
                            <div className="grid sm:grid-cols-3 gap-4 mb-5">
                                <div className="bg-white/60 p-3 rounded-lg border border-indigo-50">
                                    <div className="font-bold text-indigo-900 text-sm mb-1">Brand Association</div>
                                    <div className="text-xs text-indigo-700">Align your company with eco-friendly innovation and sustainable living.</div>
                                </div>
                                <div className="bg-white/60 p-3 rounded-lg border border-indigo-50">
                                    <div className="font-bold text-indigo-900 text-sm mb-1">In-Game Integration</div>
                                    <div className="text-xs text-indigo-700">We select exclusive partners to integrate real-world solutions directly into this 3D environment.</div>
                                </div>
                                <div className="bg-white/60 p-3 rounded-lg border border-indigo-50">
                                    <div className="font-bold text-indigo-900 text-sm mb-1">Community Reach</div>
                                    <div className="text-xs text-indigo-700">Connect with a growing, passionate community of creators, architects, and designers.</div>
                                </div>
                            </div>

                            <a 
                                href="https://corkbrick.com/pages/talk-to-us" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-colors shadow-sm"
                            >
                                Talk to Us <MousePointer2 size={14} />
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB: VISION */}
            {activeTab === 'VISION' && (
                <div className="space-y-8 animate-in slide-in-from-bottom-2">
                    <div className="prose prose-orange max-w-none">
                        <h3 className="flex items-center gap-2 text-xl font-bold text-gray-800">
                            <Heart className="text-red-500 fill-current" /> A System for Life
                        </h3>
                        <p className="text-gray-600">
                            Corkbrick Europe is dedicated to creating sustainable, dynamic structures that adapt to your life. 
                            We believe in a future where you don't buy furniture; you invent it, use it, and reinvent it.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="border p-4 rounded-xl hover:shadow-md transition bg-gray-50">
                            <Leaf className="text-green-600 mb-3" size={32} />
                            <h4 className="font-bold text-gray-800 mb-2">Sustainable</h4>
                            <p className="text-sm text-gray-600">Made from cork oak bark—a renewable resource harvested without harming the tree. Carbon negative and eco-friendly.</p>
                        </div>
                        <div className="border p-4 rounded-xl hover:shadow-md transition bg-gray-50">
                            <Layers className="text-indigo-600 mb-3" size={32} />
                            <h4 className="font-bold text-gray-800 mb-2">Modular</h4>
                            <p className="text-sm text-gray-600">7 unique block types create infinite possibilities. From beds and sofas to partition walls and desks.</p>
                        </div>
                        <div className="border p-4 rounded-xl hover:shadow-md transition bg-gray-50">
                            <Hand className="text-orange-600 mb-3" size={32} />
                            <h4 className="font-bold text-gray-800 mb-2">DIY Friendly</h4>
                            <p className="text-sm text-gray-600">No tools. No glue. No screws. It's like a life-sized logic puzzle that anyone can build.</p>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB: CONTROLS */}
            {activeTab === 'CONTROLS' && (
                <div className="space-y-6 animate-in slide-in-from-bottom-2">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         
                         {/* Mouse */}
                         <div>
                             <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2"><Mouse size={18}/> Mouse & Touch Interactions</h4>
                             <div className="space-y-3 text-sm text-gray-600">
                                 <div className="flex justify-between">
                                     <span>Left Click / Tap</span>
                                     <span className="font-semibold text-gray-800">Place Block / Select</span>
                                 </div>
                                 <div className="flex justify-between">
                                     <span>Left Drag / One Finger</span>
                                     <span className="font-semibold text-gray-800">Orbit Camera</span>
                                 </div>
                                 <div className="flex justify-between">
                                     <span>Right Drag / Two Fingers</span>
                                     <span className="font-semibold text-gray-800">Pan Camera</span>
                                 </div>
                                 <div className="flex justify-between">
                                     <span>Scroll Wheel / Pinch</span>
                                     <span className="font-semibold text-gray-800">Zoom In / Out</span>
                                 </div>
                                 <div className="flex justify-between">
                                     <span>Shift + Drag</span>
                                     <span className="font-semibold text-blue-600">Box Select (Select Mode)</span>
                                 </div>
                             </div>
                         </div>

                         {/* Keyboard */}
                         <div>
                             <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2"><Keyboard size={18}/> Keyboard Shortcuts (Desktop)</h4>
                             <div className="space-y-3 text-sm text-gray-600">
                                 <div className="flex justify-between">
                                     <span className="bg-gray-100 px-2 py-0.5 rounded border">Tab</span>
                                     <span className="font-semibold text-gray-800">Toggle Build / Select Mode</span>
                                 </div>
                                 <div className="flex justify-between">
                                     <span className="bg-gray-100 px-2 py-0.5 rounded border">Arrows</span>
                                     <span className="font-semibold text-gray-800">Rotate Block (X/Y Axis)</span>
                                 </div>
                                 <div className="flex justify-between">
                                     <span className="bg-gray-100 px-2 py-0.5 rounded border">Page Up / Down</span>
                                     <span className="font-semibold text-gray-800">Rotate Block (Z Axis)</span>
                                 </div>
                                 <div className="flex justify-between">
                                     <span className="bg-gray-100 px-2 py-0.5 rounded border">Ctrl + Z / Y</span>
                                     <span className="font-semibold text-gray-800">Undo / Redo</span>
                                 </div>
                                 <div className="flex justify-between">
                                     <span className="bg-gray-100 px-2 py-0.5 rounded border">Ctrl + C / V</span>
                                     <span className="font-semibold text-gray-800">Copy / Paste Selection</span>
                                 </div>
                             </div>
                         </div>
                         
                         {/* Mobile Actions */}
                         <div className="md:col-span-2 pt-4 mt-2 border-t">
                             <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2 mb-2"><Hand size={18}/> Mobile & Tablet Tools</h4>
                             <p className="text-sm text-gray-600 mb-3">When building on a smartphone or tablet, use the <strong>Mobile Action Bar</strong> at the bottom of the screen to quickly rotate pieces, delete selections, undo, and copy/paste without a keyboard.</p>
                         </div>
                     </div>
                </div>
            )}

            {/* TAB: TOOLS */}
            {activeTab === 'TOOLS' && (
                <div className="space-y-6 animate-in slide-in-from-bottom-2">
                    
                    <div className="flex gap-4 items-start p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="bg-blue-600 text-white p-2 rounded-lg shrink-0"><FileBox size={24}/></div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-2">Importing & Exporting to CAD Systems (SketchUp, AutoCAD)</h4>
                            
                            <div className="space-y-4">
                                <div>
                                    <h5 className="font-bold text-gray-800 flex items-center gap-2 mb-1"><Upload size={16} className="text-blue-600" /> How to Import a 3D Model</h5>
                                    <p className="text-sm text-gray-600 mb-2">
                                        You can easily import complete Corkbrick solutions that were designed in other CAD software (like SketchUp or AutoCAD) or downloaded directly from 3D Warehouse.
                                    </p>
                                    <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-700">
                                        <li>In your CAD software, export your design as a <strong>Collada (.DAE)</strong>, <strong>.OBJ</strong>, or <strong>.GLTF / .GLB</strong> file. Ensure components are exported clearly in standard dimensions.</li>
                                        <li>In Corkbrick Play, click the <strong>Import 3D Model</strong> button (the box with a downward arrow icon) in the top right menu block.</li>
                                        <li>Select your exported file. The system will automatically detect the Corkbrick module shapes and precisely snap them into our grid.</li>
                                        <li>If you already have blocks in your workspace, you can choose to <strong>Replace</strong> your current scene or <strong>Add</strong> the imported design to your existing scene.</li>
                                    </ol>
                                </div>
                                
                                <div className="pt-3 border-t border-gray-200">
                                    <h5 className="font-bold text-gray-800 flex items-center gap-2 mb-1"><Download size={16} className="text-indigo-600" /> How to Export to CAD Software</h5>
                                    <p className="text-sm text-gray-600 mb-2">
                                        If you want to take your Corkbrick Play design and compliment it in another architectural context (like placing it inside a room plan in AutoCAD or SketchUp), you can easily export it.
                                    </p>
                                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                                        <li>Click the <strong>Export 3D Model</strong> button (the document with a downward arrow icon) in the top menu.</li>
                                        <li>The app will automatically generate and download an <strong>.OBJ</strong> file containing the accurate geometry of your exact Corkbrick build.</li>
                                        <li>You can now open or import this .OBJ file into standard CAD software (SketchUp, AutoCAD, Revit, Blender, etc.) to continue your architectural work!</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 items-start p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="bg-indigo-600 text-white p-2 rounded-lg shrink-0"><ShoppingCart size={24}/></div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-1">Submit to Shop</h4>
                            <p className="text-sm text-gray-600 mb-2">
                                Finished a masterpiece? Click "Submit to Shop" to copy your design data to your clipboard. You can then instantly email it to the Corkbrick team for a chance to earn lifelong royalties!
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 items-start p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="bg-pink-600 text-white p-2 rounded-lg shrink-0"><Camera size={24}/></div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-1">Smart Screenshots & Social Sharing</h4>
                            <p className="text-sm text-gray-600 mb-2">
                                Click the Camera icon in the top right to capture your design. The system automatically adds a beautiful watermark and opens a sharing menu. Instantly post your sustainable creations to X (Twitter), Facebook, or LinkedIn to challenge your friends!
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 items-start p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="bg-emerald-600 text-white p-2 rounded-lg shrink-0"><Layout size={24}/></div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-1">Custom Room Sizes</h4>
                            <p className="text-sm text-gray-600 mb-2">
                                Use the Room Size dropdown in the top left to select "Custom". You can then enter exact Width and Length dimensions (in meters) to perfectly match your real-world space.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 items-start p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="bg-red-600 text-white p-2 rounded-lg shrink-0"><Activity size={24}/></div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-1">Engineer Vision (Stress View)</h4>
                            <p className="text-sm text-gray-600 mb-2">
                                Visualize the structural integrity of your creation. Blocks will be color-coded based on the stress they are under (Green = Safe, Yellow = Warning, Red = Danger).
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 items-start p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="bg-amber-500 text-white p-2 rounded-lg shrink-0"><Sun size={24}/></div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-1">Sun Position Simulator</h4>
                            <p className="text-sm text-gray-600 mb-2">
                                Adjust the time of day using the sun slider in the toolbar. See how natural light and shadows interact with your furniture throughout the day.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 items-start p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="bg-gray-600 text-white p-2 rounded-lg shrink-0"><Settings size={24}/></div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-1">Admin Dashboard & Settings</h4>
                            <p className="text-sm text-gray-600 mb-2">
                                Tweak the physics engine (collision tolerance), adjust block prices, or change the color theme.
                            </p>
                            <div className="flex items-center gap-2 text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded w-fit">
                                <Info size={12}/> Important: Settings are Local
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                Any changes you make to settings (price, weight, colors) only affect <strong>your current browser session</strong>. 
                                They will not affect the official version or other users. Refreshing the page restores defaults.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB: GAMIFICATION */}
            {activeTab === 'GAMIFICATION' && (
                <div className="space-y-8 animate-in slide-in-from-bottom-2">
                    <div className="text-center space-y-4 max-w-3xl mx-auto mb-8">
                        <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">🎮 Have Fun While Building!</h3>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            <strong>What is the purpose?</strong> We want you to have fun exploring the endless possibilities of <span className="font-bold">Corkbrick</span><span className="font-normal">Play</span>! Gamification gives you goals to achieve and rewards you with cool items to decorate your creations. It turns building into a creative puzzle.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Challenges Section */}
                        <div className="p-6 bg-amber-50 rounded-2xl border border-amber-200 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Trophy size={100} />
                            </div>
                            <h4 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2 relative z-10">
                                <Trophy size={24} className="text-amber-600" /> 1. Challenges
                            </h4>
                            <div className="space-y-4 relative z-10">
                                <div>
                                    <strong className="text-amber-900 block mb-1">Where to start?</strong>
                                    <p className="text-sm text-amber-800/90">Click the <strong>Trophy icon (Challenges)</strong> button at the top right of the screen to open the challenges panel.</p>
                                </div>
                                <div>
                                    <strong className="text-amber-900 block mb-1">What are they?</strong>
                                    <p className="text-sm text-amber-800/90">Missions designed to test your creativity and problem-solving! Try replicating a famous monument in <strong>The Castle Keep</strong>, or test your budget skills in <strong>The Minimalist</strong>.</p>
                                </div>
                                <div>
                                    <strong className="text-amber-900 block mb-1">How do they work?</strong>
                                    <p className="text-sm text-amber-800/90">Each challenge has a goal and rules (e.g., use exactly 10 blocks, or reach an SDG impact of 500). When you start a challenge, an on-screen guide will appear with the objectives and a helpful tip. Build a structure that meets all the criteria to win! Upon completion, use the <strong>Share Creation</strong> button to instantly post your watermarked masterpiece to social media and challenge your friends!</p>
                                </div>
                            </div>
                        </div>

                        {/* Props Section */}
                        <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-200 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Box size={100} />
                            </div>
                            <h4 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2 relative z-10">
                                <Box size={24} className="text-indigo-600" /> 2. Unlockable Props
                            </h4>
                            <div className="space-y-4 relative z-10">
                                <div>
                                    <strong className="text-indigo-900 block mb-1">What are they?</strong>
                                    <p className="text-sm text-indigo-800/90">Decorative 3D items to bring your furniture to life. There are two categories: <strong>Furniture & Decor</strong> (Mattress, Laptop, Plant, Lamp, Books, Chair, Table, TV, Coffee Cup, Rug, Sofa, Picture Frame) and <strong>Structures</strong> (Wall, Door, Window, Stairs, Room Divider).</p>
                                </div>
                                <div>
                                    <strong className="text-indigo-900 block mb-1">How to unlock them?</strong>
                                    <p className="text-sm text-indigo-800/90">The system watches what you build. If you build a flat, solid surface of a specific size (e.g., a 4x8 surface), you instantly unlock a prop that fits perfectly on it (like a Mattress)!</p>
                                </div>
                                <div>
                                    <strong className="text-indigo-900 block mb-1">How to use them?</strong>
                                    <p className="text-sm text-indigo-800/90">Once unlocked, props appear in the left sidebar under their respective categories. Click one to select it, then place it on your creation.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB: SYSTEM */}
            {activeTab === 'SYSTEM' && (
                <div className="space-y-8 animate-in slide-in-from-bottom-2">
                    <div className="text-center space-y-4 max-w-3xl mx-auto mb-8">
                        <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">⚙️ System Configuration</h3>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            The System Configuration (Admin Dashboard) is a powerful tool that lets you fine-tune the physical characteristics and behavior of the <span className="font-bold">Corkbrick</span><span className="font-normal">Play</span> interlocking system.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 shadow-sm">
                            <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Settings size={24} className="text-gray-600" /> Physics & Tolerances
                            </h4>
                            <div className="space-y-4">
                                <div>
                                    <strong className="text-gray-900 block mb-1">Collision Tolerance</strong>
                                    <p className="text-sm text-gray-600">Adjusts how strictly the system checks for overlapping blocks. A higher tolerance allows blocks to intersect slightly, which can be useful for complex or creative builds. A lower tolerance enforces strict physical boundaries.</p>
                                </div>
                                <div>
                                    <strong className="text-gray-900 block mb-1">Max Overhang</strong>
                                    <p className="text-sm text-gray-600">Determines how far a block can extend beyond its supporting base before it is considered structurally unstable. This is crucial for designing safe and realistic furniture.</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 shadow-sm">
                            <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Box size={24} className="text-gray-600" /> Block Properties
                            </h4>
                            <div className="space-y-4">
                                <div>
                                    <strong className="text-gray-900 block mb-1">Cost & Weight</strong>
                                    <p className="text-sm text-gray-600">You can modify the cost and weight of individual block types. This is helpful if you want to simulate different material densities or test budget constraints for specific projects.</p>
                                </div>
                                <div>
                                    <strong className="text-gray-900 block mb-1">Colors</strong>
                                    <p className="text-sm text-gray-600">Customize the default color of each block type to match your design aesthetic or brand guidelines.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start gap-3">
                        <Info className="text-blue-600 shrink-0 mt-0.5" size={20} />
                        <div>
                            <strong className="text-blue-900 block mb-1">Reset to Defaults</strong>
                            <p className="text-sm text-blue-800">If you ever get lost or want to revert your changes, you can always use the "Restore Defaults" button located at the bottom of the System Configuration panel to reset everything back to the original <span className="font-bold">Corkbrick</span><span className="font-normal">Play</span> specifications.</p>
                        </div>
                    </div>
                </div>
            )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t flex justify-end">
           <button onClick={onClose} className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-medium">
               Got it, let's build!
           </button>
        </div>
      </div>
    </div>
  );
};
