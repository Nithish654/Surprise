
import React, { useState, useEffect, useRef } from 'react';
import { HeartIcon } from '../constants';

interface ProposalPageProps {
  onYes: () => void;
}

const ProposalPage: React.FC<ProposalPageProps> = ({ onYes }) => {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noScale, setNoScale] = useState(1);
  const [noRotate, setNoRotate] = useState(0);
  const [escapeCount, setEscapeCount] = useState(0);
  const [isMoved, setIsMoved] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleNoInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    // Prevent any default behavior that might trigger a click
    e.preventDefault();
    
    const btnWidth = 120;
    const btnHeight = 60;
    const padding = 20;

    // Calculate random position within the visible window
    // We subtract button size and padding to keep it within bounds
    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;
    
    // We want the button to jump to a random absolute position on the screen
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    setNoPosition({ x: newX, y: newY });
    setNoScale(prev => Math.max(0.6, prev - 0.02)); // Shrink slightly but stay visible
    setNoRotate(Math.random() * 60 - 30);
    setEscapeCount(prev => prev + 1);
    setIsMoved(true);
  };

  return (
    <div ref={containerRef} className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Title Section */}
      <div className="text-center mb-16 animate-bounce">
        <HeartIcon className="w-16 h-16 text-rose-500 mx-auto mb-6" />
        <h2 className="text-5xl md:text-7xl font-romantic text-rose-600 drop-shadow-lg px-4">
          Will you be my Valentine?
        </h2>
      </div>

      {/* Buttons Container */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-2xl relative min-h-[200px]">
        
        {/* YES BUTTON - Always stay in center flow */}
        <button
          onClick={onYes}
          className="relative z-20 group"
        >
          <div className="absolute -inset-4 bg-rose-400 rounded-full blur-xl opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 animate-pulse" />
          <div className="relative bg-rose-500 text-white px-12 py-5 rounded-full text-3xl font-bold shadow-2xl border-2 border-rose-300 flex items-center gap-3 transition-transform duration-300 hover:scale-110 active:scale-95">
            💗 YES
          </div>
        </button>

        {/* NO BUTTON - Starts in flow, then becomes fixed to move anywhere */}
        <button
          ref={buttonRef}
          onMouseEnter={handleNoInteraction}
          onTouchStart={handleNoInteraction}
          onClick={handleNoInteraction}
          style={isMoved ? {
            position: 'fixed',
            left: 0,
            top: 0,
            transform: `translate(${noPosition.x}px, ${noPosition.y}px) scale(${noScale}) rotate(${noRotate}deg)`,
            transition: `all ${Math.max(0.1, 0.3 - (escapeCount * 0.01))}s cubic-bezier(0.34, 1.56, 0.64, 1)`,
            zIndex: 50
          } : {
            position: 'relative',
            zIndex: 10
          }}
          className="bg-white/80 backdrop-blur-md text-slate-500 px-8 py-4 rounded-full text-2xl font-semibold shadow-lg border border-slate-200 cursor-not-allowed select-none whitespace-nowrap"
        >
          ❌ NO
        </button>
      </div>

      {/* Mischievous feedback text */}
      <div className="mt-20 text-rose-400 font-sans text-center max-w-md h-8">
        {escapeCount > 0 && (
          <p className="italic text-lg animate-pulse transition-opacity duration-300">
            {escapeCount < 5 ? "hey gunduu...edhuku No thoda poraa? 🥺" : 
             escapeCount < 10 ? "Nadakadhu maa! 🏃💨" : 
             escapeCount < 15 ? "Podhum😂😂 press 'yes' ammu😂" :
             "Just click YES already, Nandana! ❤️"}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProposalPage;
