import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ZoomIn } from 'lucide-react';
import Lightbox from './Lightbox';
import { triggerHaptic } from '../utils/haptics';

const TAPE_COLORS = [
  'washi-tape',
  'washi-tape-mint',
  'washi-tape-gold',
  'washi-tape',
  'washi-tape-mint',
];

export default function PhotoGallery({ memories = [] }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [failedImages, setFailedImages] = useState({});
  const scrollRef = useRef(null);

  const handleImageError = (id) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  const handlePhotoSelect = (photo) => {
    triggerHaptic(15);
    setSelectedPhoto(photo);
  };

  return (
    <div className="my-1 w-full max-w-lg select-none">
      <div
        ref={scrollRef}
        data-no-swipe
        className="no-scrollbar flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto px-4 py-5 scroll-smooth sm:gap-6 sm:px-6"
      >
        {memories.map((photo, index) => {
          const hasError = failedImages[photo.id];
          const tapeStyle = TAPE_COLORS[index % TAPE_COLORS.length];
          const defaultRotation = photo.rotation || (index % 2 === 0 ? -3 : 3);

          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: -35, rotate: defaultRotation * 2 }}
              animate={{ opacity: 1, y: 0, rotate: defaultRotation }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.12 + index * 0.1,
              }}
              whileHover={{ scale: 1.04, rotate: 0, zIndex: 20 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handlePhotoSelect(photo)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  event.stopPropagation();
                  handlePhotoSelect(photo);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Lihat foto kenangan: ${photo.caption}`}
              className="group relative flex w-52 shrink-0 cursor-pointer snap-center flex-col rounded-2xl border border-white/80 bg-[#FFFDF9] p-3 pb-4 shadow-polaroid transition-shadow hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta/60 sm:w-60"
            >
              <div
                className={`absolute -top-3 left-1/2 flex h-5 w-20 -translate-x-1/2 rotate-[-2deg] items-center justify-center rounded-xs shadow-xs ${tapeStyle} pointer-events-none`}
              >
                <span className="text-[8px] font-dancing font-bold text-magenta opacity-75">
                  memory #{index + 1}
                </span>
              </div>

              <div className="relative mb-2.5 flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-pastel-pink/20 shadow-inner">
                {hasError ? (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-pastel-pink to-soft-pink p-3 text-center">
                    <Heart className="mb-1 h-8 w-8 animate-pulse fill-magenta text-magenta" />
                    <span className="text-[10px] font-dancing font-bold text-deep-magenta">
                      Foto Kenangan Indah
                    </span>
                  </div>
                ) : (
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    onError={() => handleImageError(photo.id)}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                )}

                <div className="absolute right-2 top-2 rounded-full bg-white/70 p-1 text-magenta opacity-0 shadow-xs backdrop-blur-sm transition-opacity group-hover:opacity-100">
                  <ZoomIn className="h-3.5 w-3.5" />
                </div>
              </div>

              <p className="flex min-h-[38px] items-center justify-center px-1 text-center font-dancing text-sm font-bold leading-snug text-[#4A1532] sm:text-base">
                {photo.caption}
              </p>
            </motion.div>
          );
        })}
      </div>

      <p className="mt-1 text-center text-[11px] font-dancing font-bold text-soft-pink">
        ✨ ketuk foto untuk melihat lebih dekat • geser untuk foto lain
      </p>

      <Lightbox item={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </div>
  );
}
