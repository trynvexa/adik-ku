import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { gratitudeMessages } from '../data/messages';
import FlowerAnimation from '../components/FlowerAnimation';
import { triggerHaptic } from '../utils/haptics';
import { calculateReadingTime } from '../utils/timing';

export default function GratitudeScene({ onNext }) {
  const [revealedCount, setRevealedCount] = useState(1);
  const totalItems = gratitudeMessages.items.length;
  const allRevealed = revealedCount >= totalItems;
  const advanceTimerRef = useRef(null);

  useEffect(() => {
    if (allRevealed) {
      // Once all items are revealed, auto-advance after reading time
      const readDuration = calculateReadingTime(gratitudeMessages.items, 2500, 5500);
      advanceTimerRef.current = window.setTimeout(() => {
        onNext();
      }, readDuration);
      return () => {
        if (advanceTimerRef.current) window.clearTimeout(advanceTimerRef.current);
      };
    }

    const timer = window.setTimeout(() => {
      setRevealedCount((prev) => Math.min(prev + 1, totalItems));
    }, 1500);

    return () => window.clearTimeout(timer);
  }, [revealedCount, totalItems, allRevealed, onNext]);

  const handleAccelerate = () => {
    if (!allRevealed) {
      triggerHaptic(10);
      setRevealedCount((prev) => Math.min(prev + 1, totalItems));
    } else {
      triggerHaptic(12);
      if (advanceTimerRef.current) window.clearTimeout(advanceTimerRef.current);
      onNext();
    }
  };

  return (
    <div
      onClick={handleAccelerate}
      className="relative mx-auto flex w-full max-w-sm flex-col items-center justify-center px-3 py-2 text-center select-none sm:max-w-md sm:py-6 cursor-pointer"
    >
      <FlowerAnimation count={10} />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full rounded-3xl border border-soft-pink/35 scene-paper p-4 text-dark-purple shadow-polaroid backdrop-blur-md sm:p-6"
      >
        <div className="washi-tape-mint pointer-events-none absolute -top-3 left-8 flex h-5 w-24 -rotate-2 items-center justify-center rounded-sm shadow-xs">
          <span className="text-[9px] font-dancing font-bold uppercase tracking-widest text-magenta">
            grateful ♡
          </span>
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-full border border-magenta/20 bg-soft-pink/30 px-3 py-1 text-xs font-dancing font-bold tracking-wider text-deep-magenta shadow-xs">
          <Sparkles className="h-3 w-3 animate-spin-slow text-magenta" />
          <span>alasan kakak bersyukur 🌸</span>
          <Sparkles className="h-3 w-3 animate-spin-slow text-magenta" />
        </div>

        <h2 className="mt-1.5 text-2xl font-dancing font-bold leading-tight text-deep-magenta drop-shadow-xs sm:text-4xl">
          {gratitudeMessages.title}
        </h2>

        <div className="mb-2.5 px-1">
          <p className="text-xs font-poppins leading-relaxed text-[#4A1532] sm:text-sm">
            {gratitudeMessages.intro}
          </p>
        </div>

        <div className="my-1 w-full space-y-1.5 text-left">
          {gratitudeMessages.items.map((item, index) => {
            const isVisible = index < revealedCount;

            return (
              <AnimatePresence key={index}>
                {isVisible && (
                  <motion.div
                    initial={{ opacity: 0, x: -15, scale: 0.96 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex items-center gap-2.5 rounded-xl border border-soft-pink/40 bg-white/80 p-2.5 shadow-xs sm:p-3"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-magenta to-soft-pink font-dancing text-xs font-bold text-white shadow-xs">
                      {index + 1}
                    </div>

                    <p className="font-poppins text-xs font-medium leading-snug text-[#360C26] sm:text-sm">
                      {item}
                    </p>

                    <Heart className="ml-auto h-3 w-3 shrink-0 fill-magenta/30 text-magenta/40" />
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })}
        </div>

        {/* Zero-Button UI: Subtle romantic progress cue */}
        <div className="mt-3 flex flex-col items-center gap-0.5">
          <p className="text-[11px] font-dancing font-bold text-magenta">
            {allRevealed
              ? 'semua rasa syukur terukir indah untukmu 💖'
              : 'ketuk layar untuk mempercepat tulisan ✨'}
          </p>
          {allRevealed && (
            <p className="text-[10px] font-poppins text-neutral-400">
              (pesan khusus akan terbuka otomatis atau ketuk layar ›)
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
