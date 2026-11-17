import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

export default function Navigation({ currentScene, totalScenes = 8, onNext, onPrev }) {
  if (currentScene >= totalScenes - 1) {
    return null;
  }

  const handlePrev = (e) => {
    e.stopPropagation();
    triggerHaptic(12);
    if (onPrev) onPrev();
  };

  const handleNext = (e) => {
    e.stopPropagation();
    triggerHaptic(12);
    if (onNext) onNext();
  };

  return (
    <nav
      aria-label="Navigasi bab"
      className="mx-auto flex w-full max-w-sm select-none items-center justify-between px-4 py-1.5 text-center z-30"
    >
      {/* Tombol Kembali */}
      <div className="w-20 flex justify-start">
        {currentScene > 0 && (
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Kembali ke bab sebelumnya"
            className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/30 px-2.5 py-1 text-[11px] font-poppins text-pastel-pink/80 backdrop-blur-md hover:bg-black/50 hover:text-white active:scale-95 transition-all shadow-xs"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Kembali</span>
          </button>
        )}
      </div>

      {/* Petunjuk Geser Layar */}
      <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/20 px-3 py-1 font-poppins text-[10px] text-pastel-pink/70 backdrop-blur-sm pointer-events-none">
        <span>geser layar</span>
        <span className="opacity-40">•</span>
        <span>{currentScene + 1}/{totalScenes}</span>
      </div>

      {/* Tombol Lanjut */}
      <div className="w-20 flex justify-end">
        {currentScene < totalScenes - 1 && (
          <button
            type="button"
            onClick={handleNext}
            aria-label="Lanjut ke bab berikutnya"
            className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/30 px-2.5 py-1 text-[11px] font-poppins text-pastel-pink/80 backdrop-blur-md hover:bg-black/50 hover:text-white active:scale-95 transition-all shadow-xs"
          >
            <span>Lanjut</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </nav>
  );
}
