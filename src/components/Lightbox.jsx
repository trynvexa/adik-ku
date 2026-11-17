import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Sparkles } from 'lucide-react';

export default function Lightbox({ item, onClose }) {
  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (!item) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <div
        data-no-swipe
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-dark-purple/85 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-label="Preview Foto Kenangan Penuh"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-xs sm:max-w-sm w-full bg-white p-3.5 sm:p-5 pb-5 rounded-3xl shadow-2xl border-4 border-white flex flex-col items-center max-h-[90vh]"
        >
          {/* Close Button X */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup preview foto (Esc)"
            className="absolute -top-3 -right-3 z-30 w-9 h-9 rounded-full bg-deep-magenta text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-pastel-pink"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Decorative Washi Tape on Top */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-5 bg-gradient-to-r from-pastel-pink/80 via-soft-pink/80 to-pastel-pink/80 opacity-85 rotate-1 shadow-xs rounded-xs pointer-events-none" />

          {/* Vertical Portrait Photo Container */}
          <div className="relative w-full max-h-[62vh] rounded-2xl overflow-hidden bg-zinc-900 mb-3 border border-slate-100 flex items-center justify-center">
            <img
              src={item.src}
              alt={item.caption || "Foto kenangan"}
              className="w-full h-auto max-h-[62vh] object-contain rounded-2xl"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement.innerHTML = `
                  <div class="flex flex-col items-center justify-center p-6 text-center text-magenta">
                    <svg class="w-12 h-12 mb-2 fill-magenta text-magenta opacity-80" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    <span class="text-xs font-poppins font-medium text-slate-700">Kenangan Indah Bersamamu</span>
                  </div>
                `;
              }}
            />
          </div>

          {/* Caption in Dancing Script */}
          <div className="w-full text-center px-1">
            <p className="font-dancing text-lg sm:text-xl font-bold text-deep-magenta leading-snug">
              {item.caption}
            </p>
            <div className="mt-1.5 flex items-center justify-center gap-1.5 text-magenta/60 text-xs">
              <Sparkles className="w-3 h-3 text-magenta" />
              <span className="font-poppins text-[11px]">Lucky to Have You 💗</span>
              <Heart className="w-3 h-3 fill-magenta text-magenta" />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
