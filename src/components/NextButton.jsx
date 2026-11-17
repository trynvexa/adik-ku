import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

/**
 * Consistent, tactile "next chapter" button used once a scene is ready.
 * It stops propagation so tapping it never re-triggers a scene's own
 * tap-to-reveal interaction.
 */
export default function NextButton({
  onClick,
  label = 'Lanjut',
  hint,
  icon = 'arrow',
  className = '',
}) {
  const Icon = icon === 'heart' ? Heart : ArrowRight;

  return (
    <div className={`w-full flex flex-col items-center gap-1.5 ${className}`}>
      <motion.button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          triggerHaptic(15);
          onClick?.();
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        className="group inline-flex w-full max-w-[18rem] items-center justify-center gap-2 rounded-full border border-white/40 bg-gradient-to-r from-magenta via-[#E03A8F] to-deep-magenta px-5 py-2.5 text-xs font-poppins font-semibold text-white shadow-glow-pink transition-shadow hover:shadow-lg sm:text-sm"
      >
        <span>{label}</span>
        <Icon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </motion.button>

      {hint && (
        <p className="text-[10px] font-poppins text-neutral-500 sm:text-[11px]">
          {hint}
        </p>
      )}
    </div>
  );
}
