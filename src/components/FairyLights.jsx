import React, { useMemo } from 'react';

/**
 * Hanging fairy lights (lampu tumbler peri) across the top of the screen.
 * Adds a cozy, warm, romantic ambient glow to the experience.
 */
export default function FairyLights() {
  const lights = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      // Create a gentle catenary dip curve across the width
      yOffset: Math.sin((i / 13) * Math.PI) * 10 + 2,
      duration: 1.8 + (i % 4) * 0.6,
      delay: (i * 0.35) % 2.5,
      color:
        i % 3 === 0
          ? '#FFE6A3' // warm amber gold
          : i % 3 === 1
          ? '#FFB3D1' // soft rose
          : '#FFF3E0', // warm candlelight white
      glowColor:
        i % 3 === 0
          ? 'rgba(255, 230, 163, 0.6)'
          : i % 3 === 1
          ? 'rgba(255, 179, 209, 0.6)'
          : 'rgba(255, 243, 224, 0.6)',
    }));
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-[15] h-10 overflow-hidden select-none"
    >
      {/* Delicate hanging string line */}
      <svg
        viewBox="0 0 100 12"
        preserveAspectRatio="none"
        className="absolute top-0 inset-x-0 w-full h-4 text-white/15"
      >
        <path
          d="M 0,1 Q 25,9 50,7 Q 75,9 100,1"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="2,2"
        />
      </svg>

      {/* Bulbs distributed along the curve */}
      <div className="relative w-full h-full flex items-center justify-between px-3 sm:px-8">
        {lights.map((light, i) => (
          <div
            key={light.id}
            style={{
              transform: `translateY(${light.yOffset}px)`,
            }}
            className="relative flex flex-col items-center"
          >
            {/* Socket cap */}
            <div className="w-1 h-1 bg-amber-900/60 rounded-xs" />
            {/* The glowing bulb */}
            <div
              style={{
                backgroundColor: light.color,
                boxShadow: `0 0 8px ${light.glowColor}, 0 0 16px ${light.glowColor}`,
                animationDuration: `${light.duration}s`,
                animationDelay: `${light.delay}s`,
              }}
              className="w-2 h-2.5 rounded-full animate-star-twinkle"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
