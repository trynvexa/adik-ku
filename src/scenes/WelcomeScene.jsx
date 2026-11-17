import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import HeartAnimation from '../components/HeartAnimation';
import { triggerHaptic } from '../utils/haptics';

export default function WelcomeScene({ onNext }) {
  const [isTapped, setIsTapped] = useState(false);
  const [burstParticles, setBurstParticles] = useState([]);
  const advanceTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (advanceTimerRef.current) window.clearTimeout(advanceTimerRef.current);
    };
  }, []);

  // Generate 18 heart and sparkle particles scattering outwards on tap
  const handleHeartTap = (e) => {
    e.stopPropagation();
    if (isTapped) return;

    triggerHaptic([25, 50, 25]);
    setIsTapped(true);

    const particles = Array.from({ length: 18 }).map((_, i) => {
      const angle = (i * (360 / 18) + Math.random() * 12) * (Math.PI / 180);
      const distance = 90 + Math.random() * 110;
      return {
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        scale: 0.6 + Math.random() * 0.9,
        rotation: (Math.random() - 0.5) * 80,
        color: i % 3 === 0 ? '#FFFFFF' : i % 3 === 1 ? '#FADADD' : '#D63384',
        type: i % 4 === 0 ? 'sparkle' : 'heart',
      };
    });

    setBurstParticles(particles);

    // Smooth transition to Scene 02 after the burst expansion
    advanceTimerRef.current = window.setTimeout(() => {
      onNext();
    }, 650);
  };

  // Keyboard activation (Space or Enter)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleHeartTap(e);
    }
  };

  const messageWords = "Haiii, adikku! Ada sesuatu yang ingin kakak tunjukkan. Ini memang sederhana, tetapi kakak membuatnya khusus untuk kamu.".split(" ");

  return (
    <div className="relative flex flex-col items-center justify-center text-center px-3 py-1 sm:py-4 max-w-sm sm:max-w-md mx-auto w-full select-none">
      {/* 1. Multi-layered organic atmosphere: twinkling stars, sakura petals, ambient hearts */}
      <HeartAnimation count={14} />

      {/* 2. Main Scrapbook Letter Keepsake Sheet */}
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.94, rotate: -1 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full rounded-3xl p-4 sm:p-6 shadow-polaroid border border-soft-pink/40 backdrop-blur-md overflow-visible"
        style={{
          background: 'linear-gradient(145deg, rgba(255, 248, 242, 0.96) 0%, rgba(255, 238, 244, 0.94) 100%)',
          boxShadow: '0 10px 30px -5px rgba(45, 11, 46, 0.35), 0 20px 45px -10px rgba(214, 51, 132, 0.25)',
        }}
      >
        {/* Physical Washi Tapes pinning down the corners */}
        <div className="washi-tape absolute -top-3 left-6 sm:left-8 w-24 h-6 -rotate-3 rounded-sm shadow-sm z-20 pointer-events-none flex items-center justify-center">
          <span className="text-[9px] font-dancing text-magenta/70 font-bold uppercase tracking-widest">
            for you ♡
          </span>
        </div>
        <div className="washi-tape-mint absolute -top-3 right-6 sm:right-8 w-20 h-6 rotate-[4deg] rounded-sm shadow-sm z-20 pointer-events-none" />

        {/* Vintage Postmark Stamp at the Top-Right */}
        <div className="absolute top-4 right-4 w-12 h-12 rounded-full border border-dashed border-magenta/40 flex flex-col items-center justify-center rotate-12 opacity-80 pointer-events-none">
          <span className="text-[7px] font-mono tracking-widest text-deep-magenta uppercase">LOVE</span>
          <Heart className="w-3.5 h-3.5 text-magenta fill-magenta/30 my-0.5" />
          <span className="text-[7px] font-mono tracking-tighter text-deep-magenta">SPECIAL</span>
        </div>

        {/* Delicate Header Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft-pink/35 border border-magenta/20 text-deep-magenta text-xs font-dancing font-bold tracking-wider mb-2 shadow-xs"
        >
          <Sparkles className="w-3 h-3 text-magenta animate-spin-slow" />
          <span>Hadiah kecil dari kakak</span>
          <Sparkles className="w-3 h-3 text-magenta animate-spin-slow" />
        </motion.div>

        {/* Main Title in Romantic Script */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mb-3"
        >
          <h1 className="text-3xl sm:text-5xl font-dancing font-bold text-deep-magenta drop-shadow-sm leading-tight">
            Hai, Adikku! 💗
          </h1>
          {/* Animated decorative underline flourish */}
          <motion.svg
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.85 }}
            transition={{ duration: 0.9, delay: 0.45, ease: "easeInOut" }}
            viewBox="0 0 200 14"
            fill="none"
            className="w-40 sm:w-52 h-3.5 mx-auto -mt-1 text-magenta"
          >
            <motion.path
              d="M 5 9 Q 100 2, 195 7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </motion.svg>
        </motion.div>

        {/* The Handwritten Message with Staggered Word Reveal */}
        <div className="relative mb-3 sm:mb-4 px-1 sm:px-3">
          <p className="text-xs sm:text-sm text-[#4A1532] font-poppins leading-relaxed font-normal flex flex-wrap justify-center gap-x-1 gap-y-1">
            {messageWords.map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.25,
                  delay: 0.4 + index * 0.03,
                  ease: "easeOut",
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </p>
        </div>

        {/* 3. The Beating Heart Centerpiece Buttonless Interaction */}
        <div className="relative flex flex-col items-center justify-center pt-1 pb-1">
          {/* Concentric expanding pulse rings radiating outward */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-magenta/40 animate-ring-pulse-1" />
            <span className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-soft-pink/50 animate-ring-pulse-2" />
            <span className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-pastel-pink/40 animate-ring-pulse-3" />
          </div>

          {/* Tactile Heart Target */}
          <motion.div
            role="button"
            tabIndex={0}
            onClick={handleHeartTap}
            onKeyDown={handleKeyDown}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            aria-label="Ketuk hati untuk memulai perjalanan"
            className="relative w-24 h-24 sm:w-28 sm:h-28 cursor-pointer flex items-center justify-center focus:outline-none group z-10"
          >
            {/* Heart SVG with Double Heartbeat Rhythm */}
            <div className={`w-full h-full flex items-center justify-center ${!isTapped ? 'animate-heartbeat-double' : ''}`}>
              <svg
                viewBox="0 0 100 100"
                className="w-20 h-20 sm:w-24 sm:h-24 filter drop-shadow-[0_8px_18px_rgba(214,51,132,0.55)] transition-transform group-hover:scale-105"
              >
                <defs>
                  <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF65A5" />
                    <stop offset="50%" stopColor="#D63384" />
                    <stop offset="100%" stopColor="#960E56" />
                  </linearGradient>
                  <radialGradient id="heartHighlight" cx="35%" cy="30%" r="40%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Base gradient heart */}
                <path
                  d="M50,88 C20,60 5,42 5,26 C5,13 14,5 27,5 C36,5 45,10 50,18 C55,10 64,5 73,5 C86,5 95,13 95,26 C95,42 80,60 50,88 Z"
                  fill="url(#heartGradient)"
                />
                {/* Glossy highlight layer */}
                <path
                  d="M50,88 C20,60 5,42 5,26 C5,13 14,5 27,5 C36,5 45,10 50,18 C55,10 64,5 73,5 C86,5 95,13 95,26 C95,42 80,60 50,88 Z"
                  fill="url(#heartHighlight)"
                />
              </svg>
            </div>

            {/* Subtle accents & orbiting satellite hearts */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="w-3.5 h-3.5 text-soft-pink fill-magenta/80 animate-orbit-1">
                <Heart className="w-full h-full fill-magenta/80 text-magenta drop-shadow-sm" />
              </span>
              <span className="w-2.5 h-2.5 text-amber-200 fill-amber-200 animate-orbit-2">
                <Sparkles className="w-full h-full text-amber-300 drop-shadow-sm" />
              </span>
            </div>

            <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-magenta animate-spin-slow pointer-events-none" />
            <Heart className="absolute -bottom-1 -left-1 w-3.5 h-3.5 text-soft-pink fill-magenta/60 animate-pulse pointer-events-none" />

            {/* Particle Burst on Tap */}
            <AnimatePresence>
              {isTapped && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {burstParticles.map((p) => (
                    <motion.div
                      key={p.id}
                      initial={{ x: 0, y: 0, opacity: 1, scale: 0.3 }}
                      animate={{
                        x: p.x,
                        y: p.y,
                        opacity: 0,
                        scale: p.scale,
                        rotate: p.rotation,
                      }}
                      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute"
                    >
                      {p.type === 'heart' ? (
                        <Heart
                          style={{ fill: p.color, color: p.color }}
                          className="w-5 h-5 drop-shadow-md"
                        />
                      ) : (
                        <Sparkles
                          style={{ color: p.color }}
                          className="w-5 h-5 drop-shadow-md"
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* 4. Cute Handwritten Hint with Curved Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-2 flex flex-col items-center gap-0.5 animate-hint-bounce"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-magenta/10 border border-magenta/20 text-deep-magenta font-dancing font-bold text-sm sm:text-base tracking-wide shadow-xs">
              <span>ketuk hatinya yaa~</span>
              <span className="text-magenta text-xs">✨</span>
            </div>
            <span className="text-[10px] text-neutral-500 font-poppins">
              (atau tekan Spasi / Enter)
            </span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
