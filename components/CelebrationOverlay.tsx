
import React, { useEffect, useState } from 'react';
import { HeartIcon } from '../constants';

const CelebrationOverlay: React.FC = () => {
  const [showSticker, setShowSticker] = useState(false);
  const [showMainText, setShowMainText] = useState(false);
  const [showBow, setShowBow] = useState(false);

  useEffect(() => {
    // Cinematic sequence of events
    const textTimer = setTimeout(() => setShowMainText(true), 400);
    const bowTimer = setTimeout(() => setShowBow(true), 1000);
    const stickerTimer = setTimeout(() => setShowSticker(true), 1600);
    
    return () => {
      clearTimeout(textTimer);
      clearTimeout(bowTimer);
      clearTimeout(stickerTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-rose-100/60 backdrop-blur-md overflow-hidden">
      
      {/* Dynamic Background: Exploding Hearts Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-celebrate text-rose-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.4
            }}
          >
            <HeartIcon className="w-6 h-6" />
          </div>
        ))}
      </div>

      <div className="relative text-center z-10 flex flex-col items-center max-w-4xl px-4">
        
        {/* Main Text with Glow */}
        {showMainText && (
          <div className="animate-[scaleUp_0.8s_cubic-bezier(0.175,0.885,0.32,1.275)] mb-2">
            <h1 className="text-6xl md:text-9xl font-cursive text-rose-600 drop-shadow-[0_0_20px_rgba(225,29,72,0.5)]">
              Thank you, my Goddess ❤️
            </h1>
          </div>
        )}

        {/* Bow Gesture Animation */}

        
        {/* The Emotional Sticker Area */}
        <div className="relative h-72 md:h-96 flex items-center justify-center mt-6">
          {showSticker && (
            <div className="relative group animate-[stickerPop_0.8s_cubic-bezier(0.175,0.885,0.32,1.275)]">
              {/* Premium Polaroid/Sticker Frame */}
              <div className="relative p-3 bg-white rounded-3xl shadow-[0_20px_60px_rgba(225,29,72,0.3)] border-[8px] border-white -rotate-3 hover:rotate-0 transition-transform duration-500 overflow-hidden">
                <img 
                  src="sticker.png" 
                  alt="Wholesome Love Sticker" 
                  className="w-56 h-56 md:w-80 md:h-80 object-cover rounded-xl"
                  onError={(e) => {
                    // Fallback to a high-quality animated heart if file not found
                    (e.target as HTMLImageElement).src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJvbm03bmV4bmV4bmV4bmV4bmV4bmV4bmV4bmV4bmV4bmV4bmV4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1z/26FLdmIp6wJr91JAI/giphy.gif";
                  }}
                />
                
                {/* Glossy Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/30 pointer-events-none" />
              </div>

              {/* Decorative Sparkles */}
              <div className="absolute -top-6 -right-6 text-4xl animate-pulse text-yellow-400">✨</div>
              <div className="absolute top-1/2 -left-12 text-5xl animate-bounce text-rose-500 delay-150">💖</div>
              <div className="absolute -bottom-6 right-1/4 text-4xl animate-pulse text-rose-300 delay-300">🌸</div>
            </div>
          )}
        </div>

        {/* Emotional Tagline */}
        {showSticker && (
          <div className="mt-10 animate-[fadeIn_1.5s_ease-in]">
            <div className="bg-white/40 backdrop-blur-xl px-10 py-4 rounded-full border border-white/60 shadow-xl">
              <p className="text-rose-600 font-romantic text-3xl md:text-4xl font-bold">
                You've made me the happiest person alive! ✨
              </p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes scaleUp {
          from { transform: scale(0.3); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes stickerPop {
          0% { transform: scale(0) rotate(-15deg); opacity: 0; }
          60% { transform: scale(1.1) rotate(5deg); opacity: 1; }
          100% { transform: scale(1) rotate(-3deg); opacity: 1; }
        }
        @keyframes bowAction {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(15px) rotate(-5deg); }
        }
        @keyframes celebrate {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { opacity: 0.6; }
          100% { transform: scale(1.5) rotate(180deg); opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-celebrate {
          animation: celebrate 4s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default CelebrationOverlay;
