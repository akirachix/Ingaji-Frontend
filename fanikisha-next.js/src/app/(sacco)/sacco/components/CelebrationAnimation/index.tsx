
import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  left: number;
  delay: number;
  size: number;
  type: 'coin' | 'star' | 'confetti';
  color: string;
}

const CelebrationAnimation = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  
  useEffect(() => {
    const initialParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      size: Math.random() * 15 + 8,
      type: ['coin', 'star', 'confetti'][Math.floor(Math.random() * 3)] as Particle['type'],
      color: [
        '#FFD700', 
        '#FFB6C1', 
        '#87CEEB', 
      ][Math.floor(Math.random() * 3)]
    }));
    setParticles(initialParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.left}%`,
            top: '-20px',
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `fall 3s linear infinite`,
            animationDelay: `${particle.delay}s`,
            zIndex: 0
          }}
        >
          <div 
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: particle.color,
              borderRadius: particle.type === 'coin' ? '50%' : 
                           particle.type === 'star' ? '0%' : '15%',
              transform: `rotate(${Math.random() * 360}deg)`,
              opacity: 0.8
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default CelebrationAnimation;