import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, MailOpen } from 'lucide-react';
import Envelope from '../components/Envelope';
import HeartAnimation from '../components/HeartAnimation';
import { triggerHaptic } from '../utils/haptics';
import { calculateReadingTime } from '../utils/timing';

const LETTER_TEXT = {
  title: 'Untuk Adikku Tersayang, 💗',
  paragraphs: [
    'Sebelum kita membuka lembaran-lembaran kenangan kita di belakang nanti, ada satu hal kecil yang selalu ingin kakak bisikkan.',
    'Kehadiranmu di hidup kakak itu bukan sekadar kebetulan, melainkan anugerah terindah yang selalu kakak syukuri dalam setiap doa.',
    'Mungkin kakak bukan orang yang pandai merangkai kata manis setiap hari. Tapi percayalah, melihat senyummu bahagia adalah salah satu hal yang paling membuat hati kakak tenang.',
    'Terima kasih sudah selalu jadi adik yang luar biasa ya. Yuk, kita lihat kenangan-kenangan manis kita berikutnya...',
  ],
  closing: 'Peluk erat dari kakak, selalu menyayangimu. ✨',
};

export default function SurpriseScene({ onNext }) {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const openTimerRef = useRef(null);
  const advanceTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (openTimerRef.current) window.clearTimeout(openTimerRef.current);
      if (advanceTimerRef.current) window.clearTimeout(advanceTimerRef.current);
    };
  }, []);

  const handleOpenEnvelope = () => {
    if (isOpening || isOpen) return;

    triggerHaptic([20, 40, 20]);
    setIsOpening(true);

    openTimerRef.current = window.setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);

      // Auto-advance after reading time
      const readDuration = calculateReadingTime(LETTER_TEXT.paragraphs, 2500, 6000);
      advanceTimerRef.current = window.setTimeout(() => {
        onNext();
      }, readDuration);
    }, 520);
  };

  const handleAccelerate = (e) => {
    if (!isOpen) return;
    // If envelope is open, tapping accelerates to next scene
    triggerHaptic(12);
    if (advanceTimerRef.current) window.clearTimeout(advanceTimerRef.current);
    onNext();
  };

  return (
    <div
      onClick={handleAccelerate}
      className={`relative mx-auto flex w-full max-w-sm flex-col items-center justify-center px-3 py-2 text-center select-none sm:max-w-md sm:py-6 ${
        isOpen ? 'cursor-pointer' : ''
      }`}
    >
      <HeartAnimation count={10} />

      <div className="relative w-full rounded-3xl border border-soft-pink/35 scene-paper p-4 text-dark-purple shadow-polaroid backdrop-blur-md sm:p-6">
        {/* Washi tape */}
        <div className="washi-tape pointer-events-none absolute -top-3 left-6 flex h-5 w-24 -rotate-2 items-center justify-center rounded-sm shadow-xs">
          <span className="text-[9px] font-dancing font-bold uppercase tracking-widest text-magenta">
            surprise ♡
          </span>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-magenta/20 bg-soft-pink/30 px-3 py-1 text-xs font-dancing font-bold tracking-wider text-deep-magenta shadow-xs">
          <Sparkles className="h-3 w-3 animate-spin-slow text-magenta" />
          <span>kejutan kecil dari kakak 💌</span>
          <Sparkles className="h-3 w-3 animate-spin-slow text-magenta" />
        </div>

        <h2 className="mt-1.5 text-2xl font-dancing font-bold leading-tight text-deep-magenta drop-shadow-xs sm:text-4xl">
          Ada Sesuatu untuk Kamu...
        </h2>

        <p className="mx-auto mb-3 max-w-xs text-xs font-poppins leading-relaxed text-[#4A1532] sm:text-sm">
          Sebelum melanjutkan, kakak punya sesuatu yang ingin disampaikan.
        </p>

        <AnimatePresence mode="wait" initial={false}>
          {!isOpen ? (
            <motion.div
              key="sealed"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center"
            >
              <div className="mb-2.5 inline-flex items-center gap-1 rounded-full border border-soft-pink/60 bg-cream/95 px-3 py-1 text-xs font-dancing font-bold text-deep-magenta shadow-sm">
                <span>ketuk amplopnya yaa~</span>
                <span className="text-magenta">♡</span>
              </div>

              <Envelope isOpen={isOpening} onOpen={handleOpenEnvelope} />

              <p className="mt-3 text-[11px] font-dancing font-bold text-magenta/80 sm:text-xs">
                ada surat kecil di dalamnya ✨
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="opened"
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex w-full flex-col items-center"
            >
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-soft-pink/60 bg-white/70 px-3 py-1 text-[11px] font-dancing font-bold text-deep-magenta shadow-xs">
                <MailOpen className="h-3.5 w-3.5 text-magenta" />
                <span>surat dari kakak sudah terbuka</span>
              </div>

              {/* Readable, scrollable letter */}
              <div
                data-no-swipe
                className="w-full max-h-[38vh] overflow-y-auto rounded-2xl border border-soft-pink/50 bg-[#FFF9F2] px-3.5 py-3 text-center shadow-inner sm:max-h-[42vh] sm:px-5 sm:py-4"
              >
                <div className="mx-auto mb-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-soft-pink/40 text-magenta shadow-xs">
                  <Heart className="h-3.5 w-3.5 fill-magenta" />
                </div>

                <h3 className="font-dancing text-lg font-bold leading-tight text-deep-magenta sm:text-xl">
                  {LETTER_TEXT.title}
                </h3>

                <div className="mt-2 space-y-2 text-[11px] font-poppins leading-relaxed text-[#4A1532] sm:text-xs">
                  {LETTER_TEXT.paragraphs.map((paragraph, index) => (
                    <p key={index} className={index === 1 ? 'font-medium text-deep-magenta' : ''}>
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="mt-2.5 border-t border-magenta/15 pt-2">
                  <p className="font-dancing text-xs font-bold text-magenta sm:text-sm">
                    {LETTER_TEXT.closing}
                  </p>
                </div>
              </div>

              {/* Zero-Button UI: subtle romantic auto-advance cue */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-3 flex flex-col items-center gap-0.5"
              >
                <p className="text-[11px] font-dancing font-bold text-magenta">
                  kenangan indah akan terbuka sebentar lagi ✨
                </p>
                <p className="text-[10px] font-poppins text-neutral-400">
                  (ketuk area layar untuk mempercepat ›)
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
