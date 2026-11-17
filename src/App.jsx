import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { AudioProvider, useAudio } from './hooks/useAudio';
import MiniPlayer from './components/MiniPlayer';
import ProgressBar from './components/ProgressBar';
import Navigation from './components/Navigation';
import FairyLights from './components/FairyLights';
import StardustTrail from './components/StardustTrail';
import { triggerHaptic } from './utils/haptics';

import WelcomeScene from './scenes/WelcomeScene';
import SurpriseScene from './scenes/SurpriseScene';
import MemoriesScene from './scenes/MemoriesScene';
import GratitudeScene from './scenes/GratitudeScene';
import MessagesScene from './scenes/MessagesScene';
import MusicScene from './scenes/MusicScene';
import LetterScene from './scenes/LetterScene';
import FinalScene from './scenes/FinalScene';

const TOTAL_SCENES = 8;
const INTERACTIVE_SELECTOR =
  'button, a, input, textarea, select, [role="button"], [role="dialog"], [data-no-swipe], [contenteditable="true"]';

const sceneVariants = {
  initial: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 30 : -30,
    scale: 0.98,
  }),
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -30 : 30,
    scale: 0.98,
    transition: {
      duration: 0.25,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function MainExperience() {
  const [currentScene, setCurrentScene] = useState(0);
  const [direction, setDirection] = useState(1);
  const { playAudio, hasStarted } = useAudio();
  const mainRef = useRef(null);

  const touchStartRef = useRef({ x: 0, y: 0, time: 0, ignore: false });

  const goToScene = useCallback(
    (targetIndex) => {
      if (targetIndex >= 0 && targetIndex < TOTAL_SCENES) {
        setDirection(targetIndex > currentScene ? 1 : -1);
        setCurrentScene(targetIndex);
      }
    },
    [currentScene]
  );

  const nextScene = useCallback(() => {
    if (currentScene >= TOTAL_SCENES - 1) return;
    triggerHaptic(12);
    setDirection(1);
    setCurrentScene(currentScene + 1);
  }, [currentScene]);

  const prevScene = useCallback(() => {
    if (currentScene <= 0) return;
    triggerHaptic(12);
    setDirection(-1);
    setCurrentScene(currentScene - 1);
  }, [currentScene]);

  const resetToStart = useCallback(() => {
    triggerHaptic(20);
    setDirection(-1);
    setCurrentScene(0);
  }, []);

  const goToMemories = useCallback(() => {
    triggerHaptic(15);
    goToScene(2);
  }, [goToScene]);

  const handleStartExperience = useCallback(() => {
    triggerHaptic([20, 40, 20]);
    if (!hasStarted) {
      playAudio();
    }
    nextScene();
  }, [hasStarted, playAudio, nextScene]);

  // Keep the reading area at the top whenever a new chapter appears.
  useEffect(() => {
    if (mainRef.current) mainRef.current.scrollTop = 0;
  }, [currentScene]);

  // Keyboard navigation: never hijack keys aimed at a control or a form field.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.repeat || event.defaultPrevented) return;

      const target = event.target;
      const isFormField = ['INPUT', 'TEXTAREA', 'SELECT'].includes(target?.tagName);
      const isInteractive = target?.closest?.(INTERACTIVE_SELECTOR);

      if (isFormField || isInteractive) return;

      if (event.key === 'ArrowRight' || event.key === ' ' || event.key === 'Enter') {
        if (event.key === ' ' || event.key === 'Enter') {
          event.preventDefault();
        }
        if (currentScene === 0) {
          handleStartExperience();
        } else {
          nextScene();
        }
      } else if (event.key === 'ArrowLeft') {
        prevScene();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScene, handleStartExperience, nextScene, prevScene]);

  const handleTouchStart = (event) => {
    const touch = event.touches?.[0];
    if (!touch) return;

    const target = event.target;
    const isInteractive = target?.closest?.(INTERACTIVE_SELECTOR);

    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
      ignore: Boolean(isInteractive),
    };
  };

  const handleTouchEnd = (event) => {
    if (touchStartRef.current.ignore) return;

    const touch = event.changedTouches?.[0];
    if (!touch) return;

    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const deltaTime = Date.now() - touchStartRef.current.time;

    if (deltaTime >= 650) return;

    const isHorizontal = Math.abs(deltaX) > 55 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2;
    const isVertical = Math.abs(deltaY) > 65 && Math.abs(deltaY) > Math.abs(deltaX) * 1.2;

    if (isHorizontal) {
      if (deltaX < 0) {
        if (currentScene === 0) handleStartExperience();
        else nextScene();
      } else {
        prevScene();
      }
    } else if (isVertical) {
      if (deltaY < 0) {
        if (currentScene === 0) handleStartExperience();
        else nextScene();
      } else {
        prevScene();
      }
    }
  };

  const renderScene = () => {
    switch (currentScene) {
      case 0:
        return <WelcomeScene onNext={handleStartExperience} />;
      case 1:
        return <SurpriseScene onNext={nextScene} />;
      case 2:
        return <MemoriesScene onNext={nextScene} />;
      case 3:
        return <GratitudeScene onNext={nextScene} />;
      case 4:
        return <MessagesScene onNext={nextScene} />;
      case 5:
        return <MusicScene onNext={nextScene} />;
      case 6:
        return <LetterScene onNext={nextScene} />;
      case 7:
        return <FinalScene onReset={resetToStart} onGoToMemories={goToMemories} />;
      default:
        return <WelcomeScene onNext={handleStartExperience} />;
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-gradient-to-b from-[#1F081B] via-[#350D26] to-[#160413] text-cream selection:bg-magenta selection:text-white"
    >
      <StardustTrail />
      <FairyLights />
      <MiniPlayer />

      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-magenta/15 blur-3xl" />
        <div className="absolute -right-24 top-1/4 h-80 w-80 rounded-full bg-amber-200/10 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-[30rem] w-[30rem] rounded-full bg-deep-magenta/20 blur-3xl" />
      </div>

      <header className="relative z-20 shrink-0 pt-3 sm:pt-4">
        <ProgressBar currentScene={currentScene} totalScenes={TOTAL_SCENES} />
      </header>

      <main
        ref={mainRef}
        className="relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-contain"
      >
        <div className="flex min-h-full w-full items-center justify-center px-3 py-2 sm:px-6 sm:py-3">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={currentScene}
              custom={direction}
              variants={sceneVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex w-full items-center justify-center"
            >
              {renderScene()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <footer className="relative z-20 shrink-0 pb-2 sm:pb-3">
        <Navigation
          currentScene={currentScene}
          totalScenes={TOTAL_SCENES}
          onNext={nextScene}
          onPrev={prevScene}
        />
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AudioProvider>
      <MainExperience />
    </AudioProvider>
  );
}
