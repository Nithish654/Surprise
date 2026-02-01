
import React, { useMemo } from 'react';
import { Particle } from '../types';
import { HeartIcon } from '../constants';

const BackgroundParticles: React.FC = () => {
  const particles = useMemo(() => {
    const p: Particle[] = [];
    for (let i = 0; i < 40; i++) {
      p.push({
        id: i,
        x: Math.random() * 100,
        y: 100 + Math.random() * 20,
        size: 10 + Math.random() * 30,
        duration: 10 + Math.random() * 15,
        delay: Math.random() * 10,
      });
    }
    return p;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-gradient-to-b from-pink-50 via-rose-100 to-pink-200">
      {particles.map((p) => (
        <div
          key={p.id}
          className="heart-particle text-rose-300 opacity-40"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <HeartIcon className="w-full h-full" />
        </div>
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(255,255,255,0.4)_100%)]" />
    </div>
  );
};

export default BackgroundParticles;
