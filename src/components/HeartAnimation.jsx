import React, { useMemo } from 'react';

/**
 * Multi-layered organic atmosphere:
 * 1. Twinkling stars scattered in the sky with varying rhythms (starfield)
 * 2. Swaying sakura petals drifting down with sinusoidal path
 * 3. Soft ambient hearts rising from corners
 */
export default function HeartAnimation({ count = 16, includeStars = true, includePetals = true }) {
  // Layer 1: Twinkling stars
  const stars = useMemo(() => {
    if (!includeStars) return [];
    return Array.from({ length: 16 }).map((_, i) => ({
      id: `star-${i}`,
      left: `${(i * 6.2 + (i % 5) * 3.5) % 96 + 2}%`,
      top: `${(i * 5.4 + (i % 4) * 4.2) % 85 + 4}%`,
      size: 2 + (i % 3) * 2,
      opacity: 0.2 + (i % 4) * 0.22,
      duration: 2.2 + (i % 5) * 0.7,
      delay: (i * 0.35) % 3,
      color: i % 3 === 0 ? '#FFFFFF' : i % 3 === 1 ? '#FADADD' : '#F8C8DC',
    }));
  }, [includeStars]);

  // Layer 2: Gentle falling sakura petals
  const petals = useMemo(() => {
    if (!includePetals) return [];
    return Array.from({ length: 7 }).map((_, i) => ({
      id: `petal-${i}`,
      left: `${(i * 14.5 + (i % 3) * 5) % 92 + 4}%`,
      delay: (i * 1.2) % 6,
      duration: 7 + (i % 3) * 2,
      size: 14 + (i % 3) * 4,
      rotation: (i * 45) % 360,
    }));
  }, [includePetals]);

  // Layer 3: Ambient rising hearts
  const ambientHearts = useMemo(() => {
    const heartCount = Math.min(count, 10);
    return Array.from({ length: heartCount }).map((_, i) => ({
      id: `heart-${i}`,
      left: `${(i * 9.8 + (i % 4) * 4) % 92 + 4}%`,
      delay: (i * 0.7) % 5,
      duration: 5.5 + (i % 4) * 1.2,
      size: 13 + (i % 3) * 6,
      opacity: 0.25 + (i % 3) * 0.15,
      color: i % 2 === 0 ? '#F8C8DC' : '#D63384',
    }));
  }, [count]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden z-0 select-none"
    >
      {/* 1. Starfield */}
      {stars.map((s) => (
        <span
          key={s.id}
          style={{
            left: s.left,
            top: s.top,
            width: `${s.size}px`,
            height: `${s.size}px`,
            backgroundColor: s.color,
            boxShadow: `0 0 6px ${s.color}`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
            opacity: s.opacity,
          }}
          className="absolute block rounded-full animate-star-twinkle"
        />
      ))}

      {/* 2. Swaying Sakura Petals */}
      {petals.map((p) => (
        <span
          key={p.id}
          style={{
            left: p.left,
            top: '-24px',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            width: `${p.size}px`,
            height: `${p.size * 1.3}px`,
          }}
          className="absolute block animate-petal-drift opacity-75"
        >
          <svg viewBox="0 0 30 40" fill="none" className="w-full h-full drop-shadow-sm">
            <path
              d="M15 0 C25 8, 30 22, 22 34 C16 42, 6 36, 2 26 C-2 16, 5 4, 15 0 Z"
              fill="#FADADD"
              fillOpacity="0.85"
            />
          </svg>
        </span>
      ))}

      {/* 3. Ambient Rising Hearts */}
      {ambientHearts.map((h) => (
        <span
          key={h.id}
          style={{
            left: h.left,
            bottom: '-25px',
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            opacity: h.opacity,
            width: `${h.size}px`,
            height: `${h.size}px`,
          }}
          className="absolute block animate-float-organic"
        >
          <svg viewBox="0 0 24 24" fill={h.color} className="w-full h-full drop-shadow-sm">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </span>
      ))}
    </div>
  );
}
