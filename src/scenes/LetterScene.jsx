import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { letter } from '../data/letter';
import FlowerAnimation from '../components/FlowerAnimation';
import { triggerHaptic } from '../utils/haptics';
import { calculateReadingTime } from '../utils/timing';

export default function LetterScene({ onNext }) {
  const [revealedParagraphs, setRevealedParagraphs] = useState(1);
  const totalParagraphs = letter.paragraphs.length;
  const allRevealed = revealedParagraphs >= totalParagraphs;
  const scrollRef = useRef(null);
  const advanceTimerRef = useRef(null);

  useEffect(() => {
    if (allRevealed) {
      // Auto-advance after giving comfortable reading duration
      const duration = calculateReadingTime(letter.paragraphs, 2800, 6500);
      advanceTimerRef.current = window.setTimeout(() => {
        onNext();
      }, duration);
      return () => {
        if (advanceTimerRef.current) window.clearTimeout(advanceTimerRef.current);
      };
    }

    const timer = window.setTimeout(() => {
      setRevealedParagraphs((prev) => Math.min(prev + 1, totalParagraphs));
    }, 1600);

    return () => window.clearTimeout(timer);
  }, [revealedParagraphs, totalParagraphs, allRevealed, onNext]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [revealedParagraphs]);

  const handleAccelerate = () => {
    if (!allRevealed) {
      triggerHaptic(12);
      setRevealedParagraphs(totalParagraphs);
    } else {
      triggerHaptic(12);
      if (advanceTimerRef.current) window.clearTimeout(advanceTimerRef.current);
      onNext();
    }
  };

  return (
    <div
      onClick={handleAccelerate}
      className="relative mx-auto flex w-full max-w-sm flex-col items-center justify-center px-3 py-2 text-center select-none sm:max-w-md sm:py-5 cursor-pointer"
    >
      <FlowerAnimation count={10} />

      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative w-full rounded-3xl border border-soft-pink/40 scene-paper p-4 text-left text-dark-purple shadow-polaroid backdrop-blur-md sm:p-6"
      >
        <div className="washi-tape pointer-events-none absolute -top-3 left-8 flex h-5 w-24 -rotate-2 items-center justify-center rounded-sm shadow-xs">
          <span className="text-[9px] font-dancing font-bold uppercase tracking-widest text-magenta">
            letter for you ♡
          </span>
        </div>

        <div className="mb-2 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-magenta/20 bg-soft-pink/30 px-3 py-0.5 text-xs font-dancing font-bold tracking-wider text-deep-magenta shadow-xs">
            <Sparkles className="h-3 w-3 animate-spin-slow text-magenta" />
            <span>surat kecil dari kakak 🕊️</span>
            <Sparkles className="h-3 w-3 animate-spin-slow text-magenta" />
          </div>
        </div>

        <div
          ref={scrollRef}
          data-no-swipe
          className="max-h-[40vh] space-y-3 overflow-y-auto pr-1 sm:max-h-[46vh]"
        >
          <p className="font-dancing text-xl font-bold text-deep-magenta sm:text-2xl">
            {letter.recipient}
          </p>

          <div className="space-y-2.5 font-poppins text-xs leading-relaxed text-[#4A1532] sm:text-[13px]">
            {letter.paragraphs.slice(0, revealedParagraphs).map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {allRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-0.5 pt-2 text-right"
            >
              <p className="font-dancing text-sm text-neutral-600 sm:text-base">
                {letter.closing}
              </p>
              <p className="font-dancing text-2xl font-bold text-deep-magenta sm:text-3xl">
                {letter.sender}
              </p>
            </motion.div>
          )}
        </div>

        {/* Zero-Button UI: Subtle romantic progress cue */}
        <div className="mt-2.5 border-t border-soft-pink/30 pt-1.5 text-center">
          <p className="text-[11px] font-dancing font-bold text-magenta">
            {allRevealed
              ? 'seluruh surat telah tertulis dari hati yang paling dalam 💖'
              : 'ketuk surat untuk mempercepat tulisan ✨'}
          </p>
          {allRevealed && (
            <p className="text-[10px] font-poppins text-neutral-400 mt-0.5">
              (pelukan hangat akan terbuka otomatis atau ketuk layar ›)
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
