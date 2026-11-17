import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

/**
 * A handmade paper envelope with a wax heart seal.
 * The seal stays perfectly centred; the whole envelope is the tap target.
 */
export default function Envelope({ isOpen, onOpen }) {
  return (
    <div className="relative mx-auto w-full max-w-[19rem] select-none">
      <motion.button
        type="button"
        data-no-swipe
        onClick={(event) => {
          event.stopPropagation();
          if (!isOpen) onOpen?.();
        }}
        whileTap={isOpen ? undefined : { scale: 0.98 }}
        aria-label={isOpen ? 'Amplop sudah terbuka' : 'Ketuk amplop untuk membuka surat'}
        className="relative block aspect-[1.6] w-full cursor-pointer rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta/60"
        style={{ perspective: '900px' }}
      >
        {/* Envelope back */}
        <div className="absolute inset-0 rounded-2xl border border-white/60 bg-gradient-to-br from-[#F7D4E1] via-[#F2BDD0] to-[#E8A5BC] shadow-scrapbook" />

        {/* Soft inner letter peeking out when opened */}
        <motion.div
          initial={false}
          animate={{ y: isOpen ? -10 : 8, opacity: isOpen ? 1 : 0.85 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-5 top-4 bottom-9 rounded-xl border border-soft-pink/50 bg-[#FFF9F2] shadow-sm"
        />

        {/* Front pocket folds */}
        <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-2xl">
          <div
            className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-[#EFB4C9] to-[#F8D3E0] shadow-sm"
            style={{ clipPath: 'polygon(0% 100%, 100% 100%, 50% 16%)' }}
          />
          <div
            className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#EAA9C0] to-[#F5C4D5]"
            style={{ clipPath: 'polygon(0% 0%, 0% 100%, 100% 50%)' }}
          />
          <div
            className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#EAA9C0] to-[#F5C4D5]"
            style={{ clipPath: 'polygon(100% 0%, 100% 100%, 0% 50%)' }}
          />
        </div>

        {/* Top flap */}
        <motion.div
          initial={false}
          animate={{ rotateX: isOpen ? 180 : 0 }}
          transition={{ duration: 0.55, ease: [0.34, 1.2, 0.64, 1] }}
          style={{
            transformOrigin: 'top center',
            transformStyle: 'preserve-3d',
            zIndex: isOpen ? 5 : 30,
          }}
          className="pointer-events-none absolute inset-x-0 top-0 h-1/2"
        >
          <div
            className="h-full w-full rounded-t-2xl border-t border-white/50 bg-gradient-to-b from-[#F2C1D2] to-[#E5A3BA] shadow-md"
            style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)' }}
          />
        </motion.div>

        {/* Centred wax seal with heart */}
        <AnimatePresence>
          {!isOpen && (
            <motion.span
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.35, opacity: 0 }}
              transition={{
                scale: { type: 'spring', stiffness: 260, damping: 18 },
                default: { duration: 0.25 },
              }}
              className="pointer-events-none absolute left-1/2 top-1/2 z-40 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-amber-200/70 bg-gradient-to-br from-[#8A1155] via-[#A41363] to-[#5C0A37] p-1 shadow-lg sm:h-14 sm:w-14"
            >
              <span className="flex h-full w-full items-center justify-center rounded-full border border-amber-300/50 bg-black/10">
                <Heart className="h-5 w-5 fill-amber-200 text-amber-200 drop-shadow-sm sm:h-6 sm:w-6" />
              </span>
              <span className="absolute -right-1.5 -top-1.5 text-amber-200">
                <Sparkles className="h-3.5 w-3.5 animate-star-twinkle" />
              </span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
