
import React, { useState, useEffect, useRef } from 'react';
import { AppState } from './types';
import LandingPage from './components/LandingPage';
import ProposalPage from './components/ProposalPage';
import CelebrationOverlay from './components/CelebrationOverlay';
import BackgroundParticles from './components/BackgroundParticles';
import { MusicNoteIcon } from './constants';


const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.ENTRY);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startExperience = () => {
    setAppState(AppState.OPENING);
    if (audioRef.current) {
        // Set volume to a soft level (30%)
        audioRef.current.volume = 0.3;
        
        // Use a user interaction to trigger the play (bypass browser restrictions)
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("Playback failed:", error);
          });
        }
    }
    
    // Smooth transition to proposal
    setTimeout(() => {
      setAppState(AppState.PROPOSAL);
    }, 2200);
  };

  const handleYes = () => {
    setAppState(AppState.CELEBRATION);
    // Optional: Boost volume slightly when she says YES
    if (audioRef.current) {
        audioRef.current.volume = 0.5;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !isMuted;
      setIsMuted(newMutedState);
      audioRef.current.muted = newMutedState;
    }
  };

  return (
    <div className="relative min-h-screen font-sans selection:bg-rose-200 selection:text-rose-900 overflow-hidden">
      <BackgroundParticles />

      {/* 
        This references the file in your root folder. 
        Make sure your mp3 is named exactly 'romantic-song.mp3'
      */}
      <audio 
        ref={audioRef}
        loop 
        src="/Surprise/music/romantic-song.mp3"
        preload="auto"
      />

      {/* Floating Music Toggle */}
      <div className="fixed top-6 right-6 z-[60]">
        <button 
          onClick={toggleMute}
          className="p-4 bg-white/40 backdrop-blur-xl border border-white/50 rounded-full shadow-2xl text-rose-600 hover:scale-110 transition-all active:scale-95 group"
          aria-label={isMuted ? "Unmute Music" : "Mute Music"}
        >
          <MusicNoteIcon className={`w-6 h-6 transition-all ${isMuted ? 'opacity-30 grayscale' : 'animate-bounce'}`} />
          {isMuted && (
            <div className="absolute top-1/2 left-1/2 w-8 h-0.5 bg-rose-600 -translate-x-1/2 -translate-y-1/2 rotate-45" />
          )}
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white/80 px-2 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {isMuted ? "Turn On Music" : "Playing Song..."}
          </span>
        </button>
      </div>

      {/* Application Screens */}
      {appState === AppState.ENTRY || appState === AppState.OPENING ? (
        <LandingPage onEnter={startExperience} appState={appState} />
      ) : appState === AppState.PROPOSAL ? (
        <ProposalPage onYes={handleYes} />
      ) : (
        <CelebrationOverlay />
      )}

      {/* Footer Branding */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] pointer-events-none">
        <p className="text-rose-400 font-sans tracking-[0.2em] opacity-50 text-[10px] uppercase">
          Nalla iruka Nanduuuu ❤️
        </p>
      </div>
    </div>
  );
};

export default App;
