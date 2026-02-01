
import React, { useState } from 'react';
import { AppState } from '../types';
import { HeartIcon } from '../constants';

interface LandingPageProps {
  onEnter: () => void;
  appState: AppState;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter, appState }) => {
  const isOpening = appState === AppState.OPENING;

  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
      <div className={`text-center transition-all duration-1000 ${isOpening ? 'opacity-0 scale-90 translate-y-10' : 'opacity-100'}`}>
        <h1 className="text-4xl md:text-6xl font-romantic text-rose-600 mb-4 drop-shadow-md">
          Only Nandana is allowed to enter here ❤️
        </h1>
        <p className="text-rose-400 font-sans tracking-widest uppercase text-sm mb-12">
          A Magical Surprise!!!
        </p>
      </div>

      <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
        {/* Heart Door Left Half */}
        <div 
          className={`absolute inset-0 flex transition-transform duration-[2000ms] ease-in-out ${isOpening ? '-translate-x-full rotate-y-90' : 'translate-x-0'}`}
          style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }}
        >
          <div className="w-full h-full bg-rose-500 rounded-lg shadow-2xl flex items-center justify-end">
             <HeartIcon className="w-full h-full text-rose-400 scale-110 opacity-50 absolute left-1/2 transform -translate-x-1/2" />
          </div>
        </div>

        {/* Heart Door Right Half */}
        <div 
          className={`absolute inset-0 flex transition-transform duration-[2000ms] ease-in-out ${isOpening ? 'translate-x-full -rotate-y-90' : 'translate-x-0'}`}
          style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }}
        >
          <div className="w-full h-full bg-rose-500 rounded-lg shadow-2xl flex items-center justify-start">
             <HeartIcon className="w-full h-full text-rose-400 scale-110 opacity-50 absolute left-1/2 transform -translate-x-1/2" />
          </div>
        </div>

        {/* Central Heart SVG Overlay to make it look like one piece */}
        {!isOpening && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <HeartIcon className="w-full h-full text-rose-600 scale-100 drop-shadow-[0_0_20px_rgba(225,29,72,0.5)]" />
          </div>
        )}

        {/* Click Area / Enter Button */}
        {!isOpening && (
          <button
            onClick={onEnter}
            className="absolute z-20 bg-white/20 backdrop-blur-md border border-white/40 px-8 py-3 rounded-full text-white font-semibold text-lg hover:bg-white/30 transition-all duration-300 shadow-xl group"
          >
            Open the Heart
            <div className="absolute -inset-1 bg-white/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        )}
      </div>
      
      {!isOpening && (
        <p className="mt-12 text-rose-400 font-sans italic opacity-60">Tap to unlock magic...</p>
      )}
    </div>
  );
};

export default LandingPage;
