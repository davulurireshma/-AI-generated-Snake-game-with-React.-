import React, { useState, useRef, useEffect } from 'react';
import { Track } from '../types';
import { Play, Pause, SkipForward, SkipBack, Volume2, Music2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const DUMMY_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Neon Horizon',
    artist: 'AI Synthwave',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    cover: 'https://picsum.photos/seed/neon1/300/300',
  },
  {
    id: '2',
    title: 'Cyber Pulse',
    artist: 'Neural Beats',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    cover: 'https://picsum.photos/seed/neon2/300/300',
  },
  {
    id: '3',
    title: 'Digital Dreams',
    artist: 'Silicon Soul',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    cover: 'https://picsum.photos/seed/neon3/300/300',
  },
];

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const skipForward = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };

  const skipBackward = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  return (
    <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 border border-fuchsia-500/30 shadow-[0_0_40px_rgba(217,70,239,0.1)]">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={skipForward}
      />

      <div className="flex items-center gap-6">
        {/* Album Art */}
        <div className="relative group">
          <motion.div
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 rounded-full overflow-hidden border-2 border-fuchsia-500 shadow-[0_0_20px_rgba(217,70,239,0.4)]"
          >
            <img 
              src={currentTrack.cover} 
              alt={currentTrack.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 bg-slate-900 rounded-full border border-fuchsia-500" />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-white truncate tracking-tight">{currentTrack.title}</h3>
          <p className="text-fuchsia-400 text-sm font-medium truncate">{currentTrack.artist}</p>
          
          <div className="mt-4 flex items-center gap-2">
            <Music2 className="w-3 h-3 text-slate-500" />
            <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-fuchsia-500 shadow-[0_0_10px_#d946ef]" 
                style={{ width: `${progress}%` }}
                transition={{ type: "spring", bounce: 0, duration: 0.2 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-slate-500" />
          <div className="w-16 h-1 bg-slate-800 rounded-full">
            <div className="w-2/3 h-full bg-slate-600 rounded-full" />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={skipBackward}
            className="text-slate-400 hover:text-fuchsia-400 transition-colors"
          >
            <SkipBack className="w-6 h-6 fill-current" />
          </button>
          
          <button 
            onClick={togglePlay}
            className="w-14 h-14 bg-fuchsia-500 rounded-full flex items-center justify-center text-slate-950 hover:bg-fuchsia-400 transition-all shadow-[0_0_20px_rgba(217,70,239,0.5)] active:scale-95"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 fill-current ml-1" />
            )}
          </button>

          <button 
            onClick={skipForward}
            className="text-slate-400 hover:text-fuchsia-400 transition-colors"
          >
            <SkipForward className="w-6 h-6 fill-current" />
          </button>
        </div>

        <div className="w-20" /> {/* Spacer */}
      </div>
    </div>
  );
};
