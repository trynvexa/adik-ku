import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Sun, Star, Gift } from 'lucide-react';
import { interactiveCards } from '../data/messages';
import HeartAnimation from '../components/HeartAnimation';
import { triggerHaptic } from '../utils/haptics';

const ICONS = [Heart, Sun, Star, Sparkles, Gift];

export default function MessagesScene({ onNext }) {
  const [flippedCards, setFlippedCards] = useState(new Set());
  const [confettiBurst, setConfettiBurst] = useState([]);
  const advanceTimerRef = useRef(null);

  const allFlipped = flippedCards.size === interactiveCards.cards.length;

  useEffect(() => {
    if (allFlipped) {
      // Auto-advance after 5 seconds once all secret notes are opened
      advanceTimerRef.current = window.setTimeout(() => {
        onNext();
      }, 5000);
      return () => {
        if (advanceTimerRef.current) window.clearTimeout(advanceTimerRef.current);
      };
    }
  }, [allFlipped, onNext]);

  const toggleCard = (id) => {
    triggerHaptic(15);
    setFlippedCards((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });

    const newConfetti = Array.from({ length: 10 }).map((_, index) => ({
      id: `${id}-${index}-${Date.now()}`,
      x: (Math.random() - 0.5) * 120,
      y: -20 - Math.random() * 60,
      scale: 0.5 + Math.random() * 0.6,
      color: index % 3 === 0 ? '#FF65A5' : index % 3 === 1 ? '#FFE6A3' : '#FADADD',
    }));
    setConfettiBurst(newConfetti);

    window.setTimeout(() => setConfettiBurst([]), 850);
  };

  const handleKeyDown = (event, id) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      toggleCard(id);
    }
  };

  const handleAccelerate = (e) => {
    if (!allFlipped) return;
    const isCard = e.target.closest('[role="button"]');
    if (isCard) return;

    triggerHaptic(12);
    if (advanceTimerRef.current) window.clearTimeout(advanceTimerRef.current);
    onNext();
  };

  return (
    <div
      onClick={handleAccelerate}
      className={`relative mx-auto flex w-full max-w-sm flex-col items-center justify-center px-3 py-2 text-center select-none sm:max-w-md sm:py-6 ${
        allFlipped ? 'cursor-pointer' : ''
      }`}
    >
      <HeartAnimation count={10} />

      <div className="relative w-full rounded-3xl border border-soft-pink/35 scene-paper p-4 text-dark-purple shadow-polaroid backdrop-blur-md sm:p-5">
        <div className="washi-tape pointer-events-none absolute -top-3 right-8 flex h-5 w-24 rotate-2 items-center justify-center rounded-sm shadow-xs">
          <span className="text-[9px] font-dancing font-bold uppercase tracking-widest text-magenta">
            secret notes ♡
          </span>
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-full border border-magenta/20 bg-soft-pink/30 px-3 py-1 text-xs font-dancing font-bold tracking-wider text-deep-magenta shadow-xs">
          <Sparkles className="h-3 w-3 animate-spin-slow text-magenta" />
          <span>pesan khusus dari kakak 💌</span>
          <Sparkles className="h-3 w-3 animate-spin-slow text-magenta" />
        </div>

        <h2 className="mt-1.5 text-2xl font-dancing font-bold leading-tight text-deep-magenta drop-shadow-xs sm:text-4xl">
          {interactiveCards.title}
        </h2>

        <p className="mx-auto mb-2.5 max-w-xs text-xs font-poppins leading-relaxed text-[#4A1532] sm:text-sm">
          Ketuk tiap amplop rahasia di bawah untuk membuka pesan penuh kasih dari kakak.
        </p>

        <div className="my-1 grid w-full grid-cols-1 gap-2">
          {interactiveCards.cards.map((card, index) => {
            const isFlipped = flippedCards.has(card.id);
            const IconComponent = ICONS[index % ICONS.length];

            return (
              <div
                key={card.id}
                role="button"
                tabIndex={0}
                aria-expanded={isFlipped}
                aria-label={`Kartu pesan ${card.id}: ${
                  isFlipped ? card.text : 'Ketuk untuk membuka'
                }`}
                onClick={() => toggleCard(card.id)}
                onKeyDown={(event) => handleKeyDown(event, card.id)}
                className="relative h-[68px] w-full cursor-pointer select-none rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta/50 sm:h-[74px]"
                style={{ perspective: '1000px' }}
              >
                <motion.div
                  initial={false}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="relative h-full w-full rounded-xl"
                >
                  {/* Sealed front */}
                  <div
                    style={{ backfaceVisibility: 'hidden' }}
                    className="absolute inset-0 flex items-center justify-between rounded-xl border border-soft-pink/70 bg-gradient-to-r from-[#FFF5F8] to-[#FFF0F4] p-3 shadow-xs transition-shadow hover:shadow-md"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-magenta to-deep-magenta text-white shadow-xs">
                        <IconComponent className="h-4 w-4 text-cream" />
                      </div>
                      <div className="text-left">
                        <span className="block font-dancing text-base font-bold leading-none text-deep-magenta sm:text-lg">
                          {card.hint}
                        </span>
                        <span className="block pt-0.5 font-poppins text-[10px] text-magenta/70">
                          (ketuk untuk buka 💌)
                        </span>
                      </div>
                    </div>
                    <Sparkles className="h-4 w-4 shrink-0 animate-pulse text-magenta/50" />
                  </div>

                  {/* Revealed back */}
                  <div
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                    className="absolute inset-0 flex items-center justify-center rounded-xl border border-white/30 bg-gradient-to-r from-magenta to-deep-magenta p-2.5 text-white shadow-md"
                  >
                    <p className="px-1 text-center font-poppins text-[11px] font-semibold leading-snug sm:text-xs">
                      “{card.text}”
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        <AnimatePresence>
          {confettiBurst.map((confetti) => (
            <motion.div
              key={confetti.id}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0.3 }}
              animate={{ x: confetti.x, y: confetti.y, opacity: 0, scale: confetti.scale }}
              transition={{ duration: 0.75, ease: 'easeOut' }}
              className="pointer-events-none absolute left-1/2 top-1/2 z-30"
            >
              <Heart
                style={{ fill: confetti.color, color: confetti.color }}
                className="h-3.5 w-3.5"
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Zero-Button UI: Subtle romantic progress cue */}
        <div className="mt-3 flex flex-col items-center gap-0.5">
          <p className="text-[11px] font-dancing font-bold text-magenta">
            {allFlipped
              ? 'semua pesan telah terbuka dengan cinta 💗'
              : `sudah terbuka ${flippedCards.size} dari ${interactiveCards.cards.length} pesan ✨`}
          </p>
          {allFlipped && (
            <p className="text-[10px] font-poppins text-neutral-400">
              (melodi lagu akan terbuka otomatis atau ketuk layar ›)
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
