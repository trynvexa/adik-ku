import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Disc3,
  Music2,
  Sparkles,
  Heart,
} from 'lucide-react';
import { useAudio } from '../hooks/useAudio';
import HeartAnimation from '../components/HeartAnimation';
import { memories } from '../data/memories';
import { triggerHaptic } from '../utils/haptics';

function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export default function MusicScene({ onNext }) {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    audioError,
    togglePlay,
    seek,
    setVolume,
    toggleMute,
  } = useAudio();

  const [photoIndex, setPhotoIndex] = useState(0);
  const advanceTimerRef = useRef(null);

  // Dynamic photo slideshow: rotates smoothly through all memories every 2.8s
  useEffect(() => {
    if (!memories || memories.length <= 1) return;
    const interval = window.setInterval(() => {
      setPhotoIndex((prev) => (prev + 1) % memories.length);
    }, 2800);

    return () => window.clearInterval(interval);
  }, []);

  // Auto-advance after 18 seconds to allow enjoying music and cycling photos
  useEffect(() => {
    advanceTimerRef.current = window.setTimeout(() => {
      onNext();
    }, 18000);

    return () => {
      if (advanceTimerRef.current) window.clearTimeout(advanceTimerRef.current);
    };
  }, [onNext]);

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    triggerHaptic(12);
    setPhotoIndex((prev) => (prev + 1) % memories.length);

    // Give user more time to enjoy if they are manually flipping photos
    if (advanceTimerRef.current) window.clearTimeout(advanceTimerRef.current);
    advanceTimerRef.current = window.setTimeout(() => {
      onNext();
    }, 14000);
  };

  const handleAccelerate = (e) => {
    const isControl = e.target.closest('button, input, [role="button"]');
    if (isControl) return;

    triggerHaptic(12);
    if (advanceTimerRef.current) window.clearTimeout(advanceTimerRef.current);
    onNext();
  };

  const currentPhoto = memories[photoIndex] || {
    id: 1,
    src: '/images/photo-1.jpg',
    caption: 'Senyum manismu',
  };

  return (
    <div
      onClick={handleAccelerate}
      className="relative mx-auto flex w-full max-w-md flex-col items-center justify-center px-3 py-1.5 text-center select-none sm:max-w-lg sm:py-6 cursor-pointer"
    >
      <HeartAnimation count={10} />

      <div className="relative w-full rounded-3xl border border-soft-pink/35 scene-paper p-3.5 text-dark-purple shadow-polaroid backdrop-blur-md sm:p-6">
        {/* Washi tape */}
        <div className="washi-tape-gold pointer-events-none absolute -top-3 left-8 flex h-5 w-24 -rotate-2 items-center justify-center rounded-sm shadow-xs">
          <span className="text-[9px] font-dancing font-bold uppercase tracking-widest text-amber-900">
            melody ♡
          </span>
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-full border border-magenta/20 bg-soft-pink/30 px-3 py-1 text-xs font-dancing font-bold tracking-wider text-deep-magenta shadow-xs">
          <Music2 className="h-3.5 w-3.5 text-magenta" />
          <span>sebuah melodi hangat 🎵</span>
          <Sparkles className="h-3 w-3 animate-spin-slow text-amber-300" />
        </div>

        <h2 className="mt-1.5 text-2xl font-dancing font-bold leading-tight text-deep-magenta drop-shadow-xs sm:text-4xl">
          Sebuah Lagu untukmu
        </h2>

        <p className="mx-auto mb-2 max-w-xs text-xs font-poppins leading-relaxed text-[#4A1532] sm:text-sm">
          Alunan nada yang kakak persembahkan untuk menemani setiap baris kata dalam hadiah ini.
        </p>

        {/* Turntable deck: vinyl on the left, cycling polaroid keepsake on the right */}
        <div
          data-no-swipe
          className="relative mt-0.5 rounded-2xl border border-amber-200/70 bg-[#F5E7D5]/80 p-2.5 shadow-inner sm:p-4"
        >
          <div className="flex items-center justify-between gap-3 sm:gap-5">
            {/* Vinyl */}
            <div className="relative flex min-w-0 flex-1 items-center justify-center py-1">
              <div className="relative h-28 w-28 sm:h-36 sm:w-36">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerHaptic(15);
                    togglePlay();
                  }}
                  aria-label={isPlaying ? 'Jeda pemutaran musik' : 'Putar musik'}
                  className="group relative flex h-full w-full items-center justify-center rounded-full border-4 border-neutral-800 bg-neutral-900 shadow-polaroid transition-transform active:scale-95 cursor-pointer"
                >
                  <span
                    className={`flex h-full w-full items-center justify-center rounded-full ${
                      isPlaying ? 'animate-spin-slow' : ''
                    }`}
                    style={{
                      backgroundImage:
                        'radial-gradient(circle, #1a1a1a 28%, #111 29%, #111 36%, #222 37%, #1a1a1a 50%, #292929 51%, #1a1a1a 62%, #111 63%, #1a1a1a 78%, #222 79%, #111 100%)',
                    }}
                  >
                    <span
                      className="pointer-events-none absolute inset-0 rounded-full opacity-25"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.2) 100%)',
                      }}
                    />

                    <span className="absolute inset-0 m-auto flex h-10 w-10 flex-col items-center justify-center rounded-full border border-pastel-pink/60 bg-gradient-to-tr from-deep-magenta to-magenta shadow-inner sm:h-14 sm:w-14">
                      <Disc3 className="h-3.5 w-3.5 text-white/90 sm:h-4 sm:w-4" />
                      <span className="text-[6px] font-dancing font-bold text-white sm:text-[7px]">
                        Lucky 💗
                      </span>
                    </span>
                  </span>

                  {!isPlaying && (
                    <span className="absolute z-20 flex h-7 w-7 items-center justify-center rounded-full bg-cream/95 shadow-md">
                      <Play className="ml-0.5 h-3.5 w-3.5 fill-deep-magenta text-deep-magenta" />
                    </span>
                  )}
                </button>

                {/* Tonearm */}
                <span
                  className={`pointer-events-none absolute -right-1 -top-0.5 h-14 w-2 origin-top rounded-full bg-gradient-to-b from-amber-200 to-amber-400 shadow-md transition-transform duration-700 sm:h-20 ${
                    isPlaying ? 'rotate-[20deg]' : 'rotate-[-10deg]'
                  }`}
                >
                  <span className="absolute -left-1 -top-1 h-4 w-4 rounded-full border border-amber-200 bg-amber-500" />
                  <span className="absolute bottom-0 left-0.5 h-3 w-1.5 rounded-xs bg-zinc-800" />
                </span>
              </div>
            </div>

            {/* Dynamic Changing Polaroid Photo on the right */}
            <motion.div
              role="button"
              tabIndex={0}
              aria-label={`Foto kenangan ${photoIndex + 1} dari ${memories.length}: ketuk untuk ganti foto`}
              onClick={handleNextPhoto}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleNextPhoto(e);
              }}
              whileHover={{ scale: 1.04, rotate: 0 }}
              whileTap={{ scale: 0.96 }}
              className="relative w-[6.4rem] shrink-0 rotate-3 rounded-2xl border border-white/90 bg-[#FFFDF9] p-1.5 pb-2.5 shadow-polaroid transition-transform cursor-pointer sm:w-34 sm:p-2 sm:pb-3"
            >
              <div className="washi-tape-mint pointer-events-none absolute -top-2.5 left-1/2 flex h-4 w-14 -translate-x-1/2 -rotate-2 items-center justify-center rounded-xs shadow-xs sm:w-16">
                <span className="text-[7px] font-dancing font-bold text-emerald-800 opacity-80">
                  {photoIndex + 1}/{memories.length} ♡
                </span>
              </div>

              <div className="mt-1 flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-pastel-pink/20 shadow-inner relative">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentPhoto.id}
                    src={currentPhoto.src}
                    alt={currentPhoto.caption}
                    initial={{ opacity: 0, scale: 0.92, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 1.06, filter: 'blur(4px)' }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="h-full w-full object-cover object-center"
                    onError={(event) => {
                      event.currentTarget.style.display = 'none';
                    }}
                  />
                </AnimatePresence>
                <div className="absolute bottom-1 right-1 pointer-events-none bg-black/40 rounded-full p-0.5 backdrop-blur-xs">
                  <Heart className="w-2.5 h-2.5 text-soft-pink fill-soft-pink" />
                </div>
              </div>

              <p className="mt-1.5 truncate px-0.5 font-dancing text-[10px] font-bold leading-tight text-deep-magenta sm:text-xs">
                {currentPhoto.caption ? currentPhoto.caption.slice(0, 22) + '...' : 'senyum manismu 🌸'}
              </p>
            </motion.div>
          </div>

          <div className="mt-1.5 flex items-center justify-between text-[9px] font-poppins text-amber-900/70 sm:text-[10px] px-1">
            <span>ketuk vinyl: play/pause</span>
            <span className="text-magenta/80">ketuk foto: ganti foto ✨</span>
          </div>
        </div>

        {/* Track info */}
        <div className="mt-2 text-center">
          <h4 className="truncate font-playfair text-sm font-bold text-deep-magenta sm:text-base">
            {currentTrack?.title || 'Sebuah Lagu Untukmu'}
          </h4>
          <p className="truncate font-poppins text-[11px] text-neutral-600">
            {currentTrack?.artist || 'Melodi Hangat Kakak'}
          </p>
        </div>

        {/* Progress */}
        <div className="mt-1.5 px-1">
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime || 0}
            onChange={(event) => seek(parseFloat(event.target.value))}
            aria-label="Posisi pemutaran lagu"
            className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-pastel-pink accent-magenta"
          />
          <div className="mt-0.5 flex justify-between font-mono text-[9px] text-neutral-500">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Playback controls */}
        <div className="mt-1.5 flex items-center justify-between border-t border-soft-pink/30 px-1 pt-1.5">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                triggerHaptic(10);
                toggleMute();
              }}
              aria-label={isMuted ? 'Bunyikan musik' : 'Bisukan musik'}
              className="text-deep-magenta transition-opacity hover:opacity-80 cursor-pointer"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(event) => setVolume(parseFloat(event.target.value))}
              aria-label="Volume audio"
              className="h-1 w-16 cursor-pointer appearance-none rounded-lg bg-pastel-pink accent-magenta"
            />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              triggerHaptic(15);
              togglePlay();
            }}
            aria-label={isPlaying ? 'Jeda musik' : 'Putar musik'}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-magenta to-deep-magenta text-white shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4 fill-white" />
            ) : (
              <Play className="ml-0.5 h-4 w-4 fill-white" />
            )}
          </button>

          <div className="flex h-3 w-4 items-end justify-end gap-[2px]">
            <span
              className={`w-[2px] rounded-full bg-magenta ${
                isPlaying ? 'soundwave-bar-1' : 'h-[3px]'
              }`}
            />
            <span
              className={`w-[2px] rounded-full bg-soft-pink ${
                isPlaying ? 'soundwave-bar-2' : 'h-[6px]'
              }`}
            />
            <span
              className={`w-[2px] rounded-full bg-deep-magenta ${
                isPlaying ? 'soundwave-bar-3' : 'h-[2px]'
              }`}
            />
          </div>
        </div>

        {audioError && (
          <p className="mt-1.5 rounded-lg bg-amber-50 px-2 py-1 text-[10px] font-poppins text-amber-800">
            Musik belum bisa diputar. Ketuk piringan hitam untuk mencoba lagi 🎵
          </p>
        )}

        {/* Zero-Button UI: Subtle romantic progress cue */}
        <div className="mt-3 flex flex-col items-center gap-0.5">
          <p className="text-[11px] font-dancing font-bold text-magenta">
            surat dari hati kakak akan terbuka sebentar lagi ✨
          </p>
          <p className="text-[10px] font-poppins text-neutral-400">
            (ketuk area kosong atau geser layar untuk lanjut ›)
          </p>
        </div>
      </div>
    </div>
  );
}
