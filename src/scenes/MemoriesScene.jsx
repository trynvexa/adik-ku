import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Sparkles } from 'lucide-react';
import PhotoGallery from '../components/PhotoGallery';
import HeartAnimation from '../components/HeartAnimation';
import { memories } from '../data/memories';
import { triggerHaptic } from '../utils/haptics';

export default function MemoriesScene({ onNext }) {
  const advanceTimerRef = useRef(null);

  useEffect(() => {
    // Auto-advance after 8 seconds of photo appreciation
    advanceTimerRef.current = window.setTimeout(() => {
      onNext();
    }, 8000);

    return () => {
      if (advanceTimerRef.current) window.clearTimeout(advanceTimerRef.current);
    };
  }, [onNext]);

  const handleAccelerate = (e) => {
    // Only accelerate if not clicking inside the photo gallery cards or lightbox
    const isInteractive = e.target.closest('button, [role="button"], img, [data-no-swipe]');
    if (isInteractive) return;

    triggerHaptic(12);
    if (advanceTimerRef.current) window.clearTimeout(advanceTimerRef.current);
    onNext();
  };

  return (
    <div
      onClick={handleAccelerate}
      className="relative mx-auto flex w-full max-w-xl flex-col items-center justify-center px-2 py-2 text-center select-none sm:py-6 cursor-pointer"
    >
      <HeartAnimation count={10} />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-1.5 rounded-full border border-magenta/25 bg-soft-pink/25 px-3 py-1 text-xs font-dancing font-bold tracking-wider text-pastel-pink shadow-xs"
      >
        <Camera className="h-3.5 w-3.5 text-magenta" />
        <span>album kenangan kita 📸</span>
        <Sparkles className="h-3 w-3 animate-spin-slow text-amber-200" />
      </motion.div>

      <h2 className="mb-1.5 mt-1 text-3xl font-dancing font-bold leading-tight text-transparent drop-shadow-sm sm:text-5xl">
        <span className="bg-gradient-to-r from-soft-pink via-white to-pastel-pink bg-clip-text">
          Kenangan Kecil Kita
        </span>
      </h2>

      <div className="mx-auto mb-1 max-w-md px-4">
        <p className="text-xs font-poppins leading-relaxed text-cream/90 sm:text-sm">
          Setiap momen mungkin terlihat sederhana, tetapi semuanya punya tempat tersendiri di hati kakak.
        </p>
      </div>

      <div className="flex w-full justify-center">
        <PhotoGallery memories={memories} />
      </div>

      {/* Zero-Button UI: Subtle romantic progress cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-3 flex flex-col items-center gap-0.5"
      >
        <p className="text-[11px] font-dancing font-bold text-pastel-pink">
          rasa syukur kakak akan terbuka sebentar lagi ✨
        </p>
        <p className="text-[10px] font-poppins text-pastel-pink/60">
          (ketuk area kosong atau geser layar untuk lanjut ›)
        </p>
      </motion.div>
    </div>
  );
}
