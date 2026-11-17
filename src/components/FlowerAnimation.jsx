import React, { useMemo } from 'react';

// Falling flower petals animation
// Follows PRD rules: <= 20 elements on mobile, only transform & opacity, respects reduced-motion
export default function FlowerAnimation({ count = 16 }) {
  const petals = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${(i * 100) / count + (i % 4) * 2}%`,
      delay: (i * 0.45) % 5,
      duration: 6.5 + (i % 4) * 1.5,
      size: 16 + (i % 3) * 6,
      opacity: 0.4 + (i % 4) * 0.15,
      color:
        i % 3 === 0
          ? '#F8C8DC' // soft-pink
          : i % 3 === 1
          ? '#FADADD' // pastel-pink
          : '#E8A3C4', // rose pink
    }));
  }, [count]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden z-0"
    >
      {petals.map((p) => (
        <span
          key={p.id}
          style={{
            left: p.left,
            top: '-20px',
            animation: `petalFall ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
            width: `${p.size}px`,
            height: `${p.size * 1.3}px`,
          }}
          className="absolute block select-none"
        >
          {/* Organic Petal Shape */}
          <svg viewBox="0 0 30 40" fill={p.color} className="w-full h-full drop-shadow-xs">
            <path d="M15 0 C25 10 30 25 15 40 C0 25 5 10 15 0 Z" />
          </svg>
        </span>
      ))}
    </div>
  );
}
