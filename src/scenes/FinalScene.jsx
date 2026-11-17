import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import FlowerAnimation from '../components/FlowerAnimation';
import HeartAnimation from '../components/HeartAnimation';
import { memories } from '../data/memories';
import { triggerHaptic } from '../utils/haptics';

const ROTATIONS = [-6, -2, 2, 5, -4];

export default function FinalScene({ onReset, onGoToMemories }) {
  const [isRibbonPulled, setIsRibbonPulled] = useState(false);
  const resetTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current);
    };
  }, []);

  const triggerResetAction = () => {
    if (isRibbonPulled) return;
    triggerHaptic([30, 60, 30]);
    setIsRibbonPulled(true);
    resetTimerRef.current = window.setTimeout(() => {
      onReset();
    }, 550);
  };

  const handleRibbonDragEnd = (event, info) => {
    if (info.offset.y > 40) {
      triggerResetAction();
    }
  };

  const handleRibbonClick = () => {
    triggerResetAction();
  };

  return (
    <div className="relative mx-auto flex w-full max-w-sm flex-col items-center justify-center px-3 py-1 text-center select-none sm:max-w-md sm:py-3">
      <FlowerAnimation count={10} />
      <HeartAnimation count={10} />

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative w-full rounded-3xl border border-soft-pink/40 scene-paper p-3.5 text-dark-purple shadow-polaroid backdrop-blur-md sm:p-5"
      >
        <div className="washi-tape-mint pointer-events-none absolute -top-3 left-8 flex h-5 w-24 -rotate-2 items-center justify-center rounded-sm shadow-xs">
          <span className="text-[9px] font-dancing font-bold uppercase tracking-widest text-magenta">
            forever ♡
          </span>
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-full border border-magenta/20 bg-soft-pink/30 px-3 py-1 text-xs font-dancing font-bold tracking-wider text-deep-magenta shadow-xs">
          <Sparkles className="h-3 w-3 animate-spin-slow text-magenta" />
          <span>peluk hangat dari kakak 🎀</span>
          <Sparkles className="h-3 w-3 animate-spin-slow text-magenta" />
        </div>

        <h2 className="mt-1 text-2xl font-dancing font-bold leading-tight text-deep-magenta drop-shadow-xs sm:text-3xl">
          Terima Kasih Sudah Hadir
        </h2>

        <div className="mb-2 space-y-1 px-1 text-xs font-poppins leading-relaxed text-[#4A1532] sm:text-sm">
          <p>Terima kasih sudah menjadi bagian dari kehidupan kakak.</p>
          <p>
            Mungkin hadiah ini sederhana, tetapi rasa syukur kakak karena mempunyai kamu tidak sesederhana itu.
          </p>
          <p className="pt-0.5 text-xs font-semibold text-deep-magenta sm:text-sm">
            Kakak beruntung mempunyai kamu.
          </p>
          <p className="pt-0.5 font-dancing text-lg font-bold text-magenta sm:text-xl">
            Jangan lupa bahagia, ya, adikku. 💗
          </p>
        </div>

        <div
          onClick={() => {
            triggerHaptic(15);
            onGoToMemories();
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              event.stopPropagation();
              onGoToMemories();
            }
          }}
          aria-label="Lihat kenangan foto lagi"
          className="group relative flex cursor-pointer flex-col items-center justify-center py-1"
        >
          <div className="my-1 flex -space-x-2 items-center justify-center">
            {memories.map((memory, index) => (
              <motion.div
                key={memory.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + index * 0.08 }}
                style={{ transform: `rotate(${ROTATIONS[index % ROTATIONS.length]}deg)` }}
                className="flex h-[60px] w-12 shrink-0 flex-col items-center overflow-hidden rounded-lg border border-slate-200 bg-white p-1 pb-1.5 shadow-sm transition-transform group-hover:scale-105 sm:h-[68px] sm:w-14"
              >
                <img
                  src={memory.src}
                  alt={memory.caption}
                  className="h-9 w-full rounded-xs object-cover object-[center_20%] sm:h-11"
                  onError={(event) => {
                    event.currentTarget.style.display = 'none';
                  }}
                />
                <Heart className="mt-0.5 h-2 w-2 fill-magenta text-magenta" />
              </motion.div>
            ))}
          </div>
          <span className="text-[10px] font-dancing font-bold text-magenta group-hover:underline sm:text-[11px]">
            📸 ketuk foto di atas untuk bernostalgia lagi
          </span>
        </div>

        {/* Link to Heart Barcode Generator */}
        <div className="my-1.5 flex flex-col items-center">
          <a
            href="./qr.html"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-magenta/10 border border-magenta/30 text-deep-magenta hover:bg-magenta/20 font-poppins text-[11px] font-semibold shadow-xs transition-all hover:scale-105 active:scale-95"
          >
            <span>💌</span>
            <span>Buka Barcode Hati untuk Adik</span>
            <span>✨</span>
          </a>
        </div>

        <div className="mt-1.5 flex flex-col items-center border-t border-soft-pink/30 pt-1.5">
          <motion.div
            data-no-swipe
            role="button"
            tabIndex={0}
            aria-label="Tarik ke bawah atau tekan untuk mengulang dari awal"
            onClick={handleRibbonClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleRibbonClick();
              }
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 60 }}
            dragElastic={0.4}
            onDragEnd={handleRibbonDragEnd}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex cursor-grab touch-none flex-col items-center py-1 active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta/60 rounded-xl px-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-gradient-to-r from-magenta to-deep-magenta text-white shadow-md">
              <span className="text-lg">🎀</span>
            </div>
            <span className="mt-1 text-[10px] font-poppins text-neutral-500">
              {isRibbonPulled
                ? 'Mengulang cerita indah... ✨'
                : '↓ tarik pita atau ketuk untuk mengulang'}
            </span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
