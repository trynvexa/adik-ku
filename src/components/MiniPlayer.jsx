import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, Music } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';
import { triggerHaptic } from '../utils/haptics';

export default function MiniPlayer() {
  const {
    isPlaying,
    togglePlay,
    volume,
    setVolume,
    isMuted,
    toggleMute,
    currentTrack,
    hasStarted,
    playAudio,
    audioError,
    nextTrack,
    prevTrack,
    totalTracks,
    currentTime,
    duration,
    seek,
  } = useAudio();

  const [isExpanded, setIsExpanded] = useState(false);
  const collapseTimerRef = useRef(null);

  // Auto collapse expanded card after 5 seconds of inactivity
  useEffect(() => {
    if (isExpanded) {
      if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current);
      collapseTimerRef.current = setTimeout(() => {
        setIsExpanded(false);
      }, 5000);
    }
    return () => {
      if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current);
    };
  }, [isExpanded, isPlaying, volume]);

  const handleVinylClick = (e) => {
    e.stopPropagation();
    triggerHaptic(15);
    if (!hasStarted) {
      playAudio();
    } else {
      togglePlay();
    }
  };

  const handleExpandToggle = (e) => {
    e.stopPropagation();
    triggerHaptic(10);
    setIsExpanded((prev) => !prev);
  };

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed top-2.5 right-2.5 sm:top-3 sm:right-4 z-50">
      {/* Vinyl Disc & Mini Bar */}
      <div className="flex items-center gap-2">
        {/* Pulsing prompt if audio has not started yet or was blocked */}
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden xs:flex items-center gap-1 px-2.5 py-1 rounded-full bg-cream/90 text-dark-purple border border-soft-pink/60 shadow-sm text-[11px] font-dancing font-bold animate-hint-bounce"
          >
            <span>dengerin lagunya yuk</span>
            <span className="text-magenta">♪</span>
          </motion.div>
        )}

        {/* The Vinyl Disc */}
        <div className="relative group">
          <button
            type="button"
            onClick={handleVinylClick}
            onContextMenu={(e) => {
              e.preventDefault();
              handleExpandToggle(e);
            }}
            aria-label={isPlaying ? "Jeda musik vinyl" : "Putar musik vinyl"}
            title="Ketuk untuk Play/Pause, tahan untuk kontrol lengkap"
            className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-neutral-900 border-2 border-neutral-800 shadow-polaroid flex items-center justify-center cursor-pointer transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-pastel-pink/80 select-none"
          >
            {/* Vinyl record grooves texture */}
            <div
              className={`absolute inset-0 rounded-full border border-neutral-700/60 transition-transform ${
                isPlaying ? 'animate-spin-slow' : ''
              }`}
              style={{
                backgroundImage: `radial-gradient(circle, #1a1a1a 28%, #111 29%, #111 36%, #222 37%, #1a1a1a 50%, #292929 51%, #1a1a1a 62%, #111 63%, #1a1a1a 78%, #222 79%, #111 100%)`,
              }}
            >
              {/* Vinyl sheen reflection */}
              <div 
                className="absolute inset-0 rounded-full pointer-events-none opacity-30"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.2) 100%)'
                }}
              />

              {/* Center vinyl label */}
              <div className="absolute inset-0 m-auto w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-gradient-to-tr from-deep-magenta to-magenta border border-pastel-pink/60 flex items-center justify-center shadow-inner">
                {/* Spindle hole */}
                <div className="w-1.5 h-1.5 rounded-full bg-cream border border-neutral-800" />
              </div>
            </div>

            {/* Small center play/pause indicator when hovered or paused */}
            {!isPlaying && (
              <div className="absolute z-10 w-4 h-4 rounded-full bg-cream/90 flex items-center justify-center shadow-sm">
                <Play className="w-2.5 h-2.5 text-deep-magenta fill-deep-magenta ml-0.5" />
              </div>
            )}
          </button>

          {/* Mini expand trigger button */}
          <button
            type="button"
            onClick={handleExpandToggle}
            aria-label="Buka kontrol lagu"
            title="Buka kontrol lagu"
            className="absolute -bottom-1 -left-1 w-4.5 h-4.5 rounded-full bg-cream/90 border border-soft-pink text-deep-magenta flex items-center justify-center shadow-sm hover:scale-110 active:scale-90 transition-transform text-[9px] font-bold"
          >
            ♪
          </button>
        </div>

        {/* Mini Equalizer & Title Pill */}
        <div
          onClick={handleExpandToggle}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleExpandToggle(e);
          }}
          className="hidden xs:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-dark-purple/75 backdrop-blur-md border border-white/15 text-cream cursor-pointer hover:bg-dark-purple/90 transition-all select-none shadow-sm"
        >
          {/* Mini Soundwave */}
          <div className="flex items-end gap-[2px] h-3 w-3 overflow-hidden">
            <span className={`w-[2px] bg-soft-pink rounded-full ${isPlaying ? 'soundwave-bar-1' : 'h-[3px]'}`} />
            <span className={`w-[2px] bg-magenta rounded-full ${isPlaying ? 'soundwave-bar-2' : 'h-[5px]'}`} />
            <span className={`w-[2px] bg-pastel-pink rounded-full ${isPlaying ? 'soundwave-bar-3' : 'h-[2px]'}`} />
          </div>

          <span className="text-[10px] font-poppins text-pastel-pink font-medium max-w-[85px] sm:max-w-[120px] truncate">
            {audioError ? "Lagu istirahat~" : currentTrack?.title || "Melodi Hangat"}
          </span>
        </div>
      </div>

      {/* Expandable Mini Cassette / Scrapbook Player Card */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.94 }}
            transition={{ duration: 0.2 }}
            className="absolute top-14 right-0 w-64 p-3.5 rounded-2xl bg-cream text-dark-purple shadow-polaroid border border-soft-pink/60 backdrop-blur-lg select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Scrapbook washi tape on top of cassette */}
            <div className="washi-tape absolute -top-2 left-1/2 -translate-x-1/2 px-4 py-0.5 text-[9px] font-dancing text-deep-magenta uppercase tracking-widest rounded-sm">
              pita lagu kakak
            </div>

            {/* Track Info */}
            <div className="mt-1 text-center">
              <h4 className="font-playfair font-bold text-sm text-deep-magenta truncate">
                {currentTrack?.title || "Lagu Untukmu"}
              </h4>
              <p className="text-[11px] font-poppins text-neutral-600 truncate">
                {currentTrack?.artist || "Melodi Hangat Kakak"}
              </p>
            </div>

            {/* Progress Bar & Seek */}
            <div className="mt-2.5">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime || 0}
                onChange={(e) => seek(parseFloat(e.target.value))}
                aria-label="Posisi pemutaran musik"
                className="w-full h-1 bg-pastel-pink rounded-lg appearance-none cursor-pointer accent-magenta"
              />
              <div className="flex justify-between text-[9px] text-neutral-500 font-mono mt-0.5">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="mt-2 flex items-center justify-center gap-3">
              {totalTracks > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    triggerHaptic(10);
                    prevTrack();
                  }}
                  aria-label="Lagu sebelumnya"
                  className="p-1 rounded-full hover:bg-soft-pink/40 text-deep-magenta transition-colors"
                >
                  <SkipBack className="w-4 h-4" />
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  triggerHaptic(15);
                  togglePlay();
                }}
                aria-label={isPlaying ? "Jeda" : "Putar"}
                className="w-8 h-8 rounded-full bg-gradient-to-r from-magenta to-deep-magenta text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
              </button>

              {totalTracks > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    triggerHaptic(10);
                    nextTrack();
                  }}
                  aria-label="Lagu berikutnya"
                  className="p-1 rounded-full hover:bg-soft-pink/40 text-deep-magenta transition-colors"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Volume Control */}
            <div className="mt-2.5 pt-2 border-t border-soft-pink/30 flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  triggerHaptic(10);
                  toggleMute();
                }}
                aria-label={isMuted ? "Bunyikan" : "Bisukan"}
                className="text-deep-magenta hover:opacity-80 transition-opacity"
              >
                {isMuted || volume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                aria-label="Pengaturan volume musik"
                className="w-full h-1 bg-pastel-pink rounded-lg appearance-none cursor-pointer accent-deep-magenta"
              />
            </div>

            {/* Quick link to generate printable Love QR Barcode Card */}
            <div className="mt-2 pt-1 border-t border-soft-pink/20 text-center">
              <a
                href="./qr.html"
                target="_blank"
                rel="noreferrer"
                className="text-[10px] font-dancing text-magenta hover:underline font-bold inline-flex items-center gap-1"
              >
                <span>💌</span>
                <span>Buat Kartu Barcode Cinta untuk Adik</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
