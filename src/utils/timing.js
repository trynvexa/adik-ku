/**
 * Calculates reading duration in milliseconds based on text length.
 * PRD Rule: ~0.06s (60ms) per character + intentional pause.
 *
 * @param {string|string[]} text - Text or array of paragraphs
 * @param {number} [basePauseMs=2200] - Base pause to digest the scene
 * @param {number} [minDurationMs=3500] - Minimum duration to stay in scene
 * @returns {number} duration in milliseconds
 */
export function calculateReadingTime(text, basePauseMs = 2200, minDurationMs = 3500) {
  let charCount = 0;
  if (Array.isArray(text)) {
    charCount = text.join(' ').length;
  } else if (typeof text === 'string') {
    charCount = text.length;
  }

  // 60ms per character as per PRD spec
  const calculated = charCount * 60 + basePauseMs;
  return Math.max(calculated, minDurationMs);
}
