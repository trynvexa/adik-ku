import React, { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Magical Stardust Touch Trail.
 * Spawns delicate twinkling stardust & mini hearts where the user touches or moves.
 */
export default function StardustTrail() {
  const [sparks, setSparks] = useState([]);
  const lastPosRef = useRef({ x: 0, y: 0, time: 0 });
  const idCounterRef = useRef(0);

  const addSpark = useCallback((x, y) => {
    const now = Date.now();
    // Throttle spark creation to prevent heavy CPU load
    if (now - lastPosRef.current.time < 45) return;
    const dist = Math.hypot(x - lastPosRef.current.x, y - lastPosRef.current.y);
    if (dist < 12) return;

    lastPosRef.current = { x, y, time: now };
    idCounterRef.current += 1;

    const newSpark = {
      id: idCounterRef.current,
      x: x + (Math.random() - 0.5) * 12,
      y: y + (Math.random() - 0.5) * 12,
      size: 8 + Math.random() * 8,
      color: Math.random() > 0.4 ? '#FFE6A3' : '#FFB3D1',
      isHeart: Math.random() > 0.65,
    };

    setSparks((prev) => [...prev.slice(-14), newSpark]);

    setTimeout(() => {
      setSparks((prev) => prev.filter((s) => s.id !== newSpark.id));
    }, 700);
  }, []);

  useEffect(() => {
    const handlePointerMove = (e) => {
      addSpark(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        addSpark(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [addSpark]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden z-50 select-none"
    >
      {sparks.map((s) => (
        <span
          key={s.id}
          style={{
            left: `${s.x}px`,
            top: `${s.y}px`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            color: s.color,
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-700 ease-out opacity-90 animate-hint-bounce"
        >
          {s.isHeart ? (
            <svg viewBox="0 0 24 24" fill={s.color} className="w-full h-full drop-shadow-sm">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill={s.color} className="w-full h-full drop-shadow-sm">
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
            </svg>
          )}
        </span>
      ))}
    </div>
  );
}
