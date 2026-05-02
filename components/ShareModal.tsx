import React, { useState } from 'react';
import { X, Download, Twitter, Facebook, Linkedin, Link as LinkIcon, Info, Share2 } from 'lucide-react';

interface ShareModalProps {
  imageUrl: string;
  onClose: () => void;
}

const VIRAL_PHRASES = [
  "I just became a sustainable architect! 🌍 I designed this custom furniture using only interlocking #Corkbrick blocks without a single screw. Can you build something better? 🧱✨ Try it for free at corkbrick.com #SustainableLiving #ModularDesign #CorkbrickPlay",
  "Challenge accepted! 🏆 I just built this modular masterpiece in CorkbrickPlay. No glue, no screws, just pure sustainable design. 🌿 Think you can beat my score? Play for free: corkbrick.com #CorkbrickPlay #EcoFriendly #DesignChallenge",
  "Who needs IKEA when you have Corkbrick? 🛠️ I just designed my own sustainable, modular furniture in 3D. The best part? I can build it in real life! 🤯 Try CorkbrickPlay at corkbrick.com #InteriorDesign #CorkbrickPlay #Sustainability",
  "Just finished my latest creation in CorkbrickPlay! 🏗️ It's amazing what you can build with zero tools and 100% natural cork. Check out my design and try it yourself at corkbrick.com ♻️ #CorkbrickPlay #GreenTech #CreativeDesign"
];

export const ShareModal: React.FC<ShareModalProps> = ({ imageUrl, onClose }) => {
  const [showInstruction, setShowInstruction] = useState(false);
  const [shareText, setShareText] = useState(() => VIRAL_PHRASES[Math.floor(Math.random() * VIRAL_PHRASES.length)]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = `corkbrick-design-${new Date().getTime()}.png`;
    link.href = imageUrl;
    link.click();
  };

  const shareUrl = "https://corkbrick.com";

  const handleNativeShare = async () => {
    try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], 'corkbrick-design.png', { type: 'image/png' });
        
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
                files: [file],
                title: 'My Corkbrick Design',
                text: shareText,
            });
        } else {
            alert("Your browser doesn't support direct file sharing. Please use the download button instead.");
        }
    } catch (err) {
        console.error("Native share failed:", err);
    }
  };

  const handleSocialClick = (url: string) => {
    handleDownload();
    setShowInstruction(true);
    // Small delay to ensure download triggers before navigating away/opening popup
    setTimeout(() => {
        window.open(url, '_blank');
    }, 100);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareText);
    alert("Copied to clipboard!");
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full flex flex-col overflow-hidden border border-gray-100">
        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800">Share Your Creation</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 p-1 rounded-full transition">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 flex flex-col items-center gap-6">
          <div className="w-full max-h-[35vh] rounded-lg overflow-hidden border border-gray-200 shadow-inner bg-gray-100 flex items-center justify-center relative group">
            <img src={imageUrl} alt="Your Corkbrick Design" className="max-w-full max-h-full object-contain" />
          </div>
          
          <div className="w-full text-center">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Show off your sustainable design!</h3>
            
            {showInstruction ? (
                <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-sm flex items-start gap-2 text-left animate-in zoom-in-95">
                    <Info size={20} className="shrink-0 mt-0.5 text-blue-500" />
                    <div>
                        <strong>Image downloaded!</strong> Because your design is generated live, social networks can't grab the image automatically. 
                        <br/>👉 <strong>Please attach the downloaded image to your post manually.</strong>
                    </div>
                </div>
            ) : (
                <div className="mb-6 text-left">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Customize your message:</label>
                    <textarea 
                        value={shareText}
                        onChange={(e) => setShareText(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg text-sm text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none h-24"
                    />
                </div>
            )}
            
            <div className="flex flex-wrap justify-center gap-3">
              {navigator.canShare && (
                  <button onClick={handleNativeShare} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium shadow-sm w-full sm:w-auto justify-center">
                    <Share2 size={18} /> Share via App
                  </button>
              )}
              <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-medium shadow-sm">
                <Download size={18} /> Download
              </button>
              <button onClick={() => handleSocialClick(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`)} className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] transition font-medium shadow-sm">
                <Twitter size={18} /> X (Twitter)
              </button>
              <button onClick={() => handleSocialClick(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`)} className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white rounded-lg hover:bg-[#166fe5] transition font-medium shadow-sm">
                <Facebook size={18} /> Facebook
              </button>
              <button onClick={() => handleSocialClick(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`)} className="flex items-center gap-2 px-4 py-2 bg-[#0A66C2] text-white rounded-lg hover:bg-[#0958a8] transition font-medium shadow-sm">
                <Linkedin size={18} /> LinkedIn
              </button>
              <button onClick={handleCopyLink} className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium shadow-sm border border-gray-200">
                <LinkIcon size={18} /> Copy Text
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
