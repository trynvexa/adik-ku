/**
 * Haptic feedback helper for mobile devices
 * Gracefully no-ops if navigator.vibrate is not supported or rejected
 */
export function triggerHaptic(pattern = 15) {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch {
      // Ignore devices that block vibration
    }
  }
}
