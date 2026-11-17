import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { tracks } from '../data/tracks';

const AudioContext = createContext(null);

export function AudioProvider({ children }) {
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.45); // Moderate-low initial volume as requested
  const [isMuted, setIsMuted] = useState(false);
  const [audioError, setAudioError] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);

  const audioRef = useRef(null);

  // Initialize single HTML5 Audio instance
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.volume = 0.45;

    // Load initial track immediately
    if (tracks && tracks.length > 0 && tracks[0].src) {
      audio.src = tracks[0].src;
    }

    audioRef.current = audio;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setAudioError(null);
    };

    const handleEnded = () => {
      if (tracks.length > 1) {
        setTrackIndex((prev) => (prev + 1) % tracks.length);
      } else {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      }
    };

    const handleError = () => {
      setAudioError("Musik tidak tersedia atau sedang offline");
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  // Update track src when trackIndex changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const currentTrack = tracks[trackIndex];
    if (currentTrack?.src) {
      const wasPlaying = isPlaying;
      if (audio.src !== window.location.origin + currentTrack.src && !audio.src.endsWith(currentTrack.src)) {
        audio.src = currentTrack.src;
        audio.load();
      }

      if (wasPlaying) {
        audio.play().catch((err) => {
          console.warn("Audio playback issue:", err);
          setIsPlaying(false);
        });
      }
    }
  }, [trackIndex]);

  const playAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setHasStarted(true);
    setAudioError(null);

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn("Browser blocked autoplay or audio error:", err);
          setIsPlaying(false);
          setAudioError("Ketuk vinyl untuk memutar musik");
        });
    }
  }, []);

  const pauseAudio = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  }, [isPlaying, pauseAudio, playAudio]);

  const seek = useCallback((timeInSeconds) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = timeInSeconds;
      setCurrentTime(timeInSeconds);
    }
  }, []);

  const setVolume = useCallback((newVol) => {
    const audio = audioRef.current;
    const clamped = Math.max(0, Math.min(1, newVol));
    if (audio) {
      audio.volume = clamped;
      setVolumeState(clamped);
      if (clamped > 0 && isMuted) {
        setIsMuted(false);
        audio.muted = false;
      }
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      const nextMuted = !isMuted;
      audio.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  }, [isMuted]);

  const nextTrack = useCallback(() => {
    if (tracks.length > 1) {
      setTrackIndex((prev) => (prev + 1) % tracks.length);
    } else if (audioRef.current) {
      audioRef.current.currentTime = 0;
      playAudio();
    }
  }, [playAudio]);

  const prevTrack = useCallback(() => {
    if (tracks.length > 1) {
      setTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    } else if (audioRef.current) {
      audioRef.current.currentTime = 0;
      playAudio();
    }
  }, [playAudio]);

  const currentTrack = tracks[trackIndex] || {
    title: "Sebuah Lagu Untukmu",
    artist: "Melodi Hangat Kakak",
  };

  const value = {
    currentTrack,
    trackIndex,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    audioError,
    hasStarted,
    playAudio,
    pauseAudio,
    togglePlay,
    seek,
    setVolume,
    toggleMute,
    nextTrack,
    prevTrack,
    totalTracks: tracks.length,
  };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
