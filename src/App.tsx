/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { Trophy, Music, Gamepad2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-500/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-blue-500/5 blur-[100px] rounded-full" />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center gap-8">
        {/* Header */}
        <header className="text-center space-y-2">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center justify-center gap-3 mb-2"
          >
            <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
              <Gamepad2 className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="p-2 bg-fuchsia-500/10 rounded-lg border border-fuchsia-500/20">
              <Music className="w-6 h-6 text-fuchsia-400" />
            </div>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter italic uppercase">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">Neon</span>
            <span className="text-slate-100"> Beats</span>
          </h1>
          <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.3em]">Snake & Sound System v1.0</p>
        </header>

        {/* Game Section */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-12">
          
          {/* Left Side: Stats (Desktop) */}
          <div className="hidden lg:flex flex-col gap-6 w-64">
            <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4 text-slate-400">
                <Trophy className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">High Score</span>
              </div>
              <div className="text-4xl font-black text-white font-mono">0000</div>
            </div>
            
            <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800 backdrop-blur-sm">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">System Status</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
                <span className="text-xs font-mono text-green-500">ONLINE</span>
              </div>
            </div>
          </div>

          {/* Center: Snake Game */}
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center justify-between w-full px-2 mb-[-1rem]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-cyan-500 rounded-full shadow-[0_0_8px_#06b6d4]" />
                <span className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Live Score</span>
              </div>
              <div className="text-2xl font-black text-white font-mono tabular-nums">
                {score.toString().padStart(4, '0')}
              </div>
            </div>
            
            <SnakeGame onScoreChange={setScore} />
          </div>

          {/* Right Side: Music Player */}
          <div className="w-full max-w-md lg:w-auto">
            <MusicPlayer />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center">
          <p className="text-slate-600 text-[10px] uppercase tracking-widest font-mono">
            Built with React & Tailwind • 2024 Neon Beats Inc.
          </p>
        </footer>
      </main>
    </div>
  );
}

