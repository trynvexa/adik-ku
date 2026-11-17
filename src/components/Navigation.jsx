import React from 'react';

/**
 * Unobtrusive scrapbook cue for the gesture navigation.
 * Reading scenes also provide an explicit "Lanjut" button once ready.
 */
export default function Navigation({ currentScene, totalScenes = 8 }) {
  if (currentScene >= totalScenes - 1) {
    return null;
  }

  return (
    <div
      className="pointer-events-none mx-auto flex w-full max-w-xs select-none items-center justify-center px-4 py-2 text-center"
      aria-hidden="true"
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/15 px-3 py-1 font-poppins text-[11px] text-pastel-pink/70 backdrop-blur-sm">
        {currentScene > 0 && <span>‹ kembali</span>}
        {currentScene > 0 && <span className="opacity-40">•</span>}
        <span>geser layar untuk pindah bab</span>
        <span>›</span>
      </div>
    </div>
  );
}
