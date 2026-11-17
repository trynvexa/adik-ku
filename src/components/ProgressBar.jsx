import React from 'react';

const SCENE_TITLES = [
  "Awal Cerita",
  "Kejutan Kecil",
  "Kenangan Indah",
  "Rasa Syukur",
  "Pesan Khusus",
  "Sebuah Melodi",
  "Surat Kakak",
  "Peluk Hangat",
];

export default function ProgressBar({ currentScene, totalScenes = 8 }) {
  return (
    <div 
      className="w-full max-w-[210px] xs:max-w-xs mx-auto px-2 xs:px-4 py-1 pointer-events-none select-none" 
      role="progressbar" 
      aria-valuenow={currentScene + 1} 
      aria-valuemin={1} 
      aria-valuemax={totalScenes}
      aria-label={`Babak ${currentScene + 1} dari ${totalScenes}: ${SCENE_TITLES[currentScene]}`}
    >
      {/* Delicate stitched thread effect with tiny dots */}
      <div className="relative flex items-center justify-between">
        {/* Background stitched line */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[1px] border-b border-dashed border-magenta/25" />

        {Array.from({ length: totalScenes }).map((_, idx) => {
          const isActive = idx === currentScene;
          const isPassed = idx < currentScene;

          return (
            <div
              key={idx}
              className="relative z-10 flex items-center justify-center transition-all duration-500"
            >
              <div
                className={`transition-all duration-500 rounded-full ${
                  isActive
                    ? "w-2.5 h-2.5 bg-gradient-to-tr from-magenta to-soft-pink ring-2 ring-soft-pink/50 shadow-sm scale-110"
                    : isPassed
                    ? "w-1.5 h-1.5 bg-magenta/60"
                    : "w-1.5 h-1.5 bg-white/30"
                }`}
              />
            </div>
          );
        })}
      </div>

      <div className="text-center mt-1">
        <span className="text-[10px] font-medium tracking-wider text-pastel-pink/80 font-poppins drop-shadow-sm">
          {SCENE_TITLES[currentScene]} ({currentScene + 1}/{totalScenes})
        </span>
      </div>
    </div>
  );
}
