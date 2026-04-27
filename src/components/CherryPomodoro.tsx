import { useState, useEffect, useRef, useCallback } from "react";
import { X, Play, Pause, RotateCcw } from "lucide-react";
import { useApp } from "@/context/AppContext";

const WORK = 25 * 60;
const BREAK = 5 * 60;

export default function CherryPomodoro() {
  const { triggerConfetti } = useApp();
  const [open, setOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(WORK);
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState<'work' | 'break'>('work');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = phase === 'work' ? WORK : BREAK;
  const fill = Math.round((1 - timeLeft / total) * 100);

  const complete = useCallback(() => {
    setRunning(false);
    if (phase === 'work') {
      triggerConfetti();
      setPhase('break');
      setTimeLeft(BREAK);
    } else {
      setPhase('work');
      setTimeLeft(WORK);
    }
  }, [phase, triggerConfetti]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) { complete(); return 0; }
          return t - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, complete]);

  const reset = () => { setRunning(false); setPhase('work'); setTimeLeft(WORK); };

  const mm = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const ss = (timeLeft % 60).toString().padStart(2, '0');

  // SVG cherry fill — clip rect moves up from bottom
  const cherryFillY = 30 + (1 - fill / 100) * 52; // from y=82 (empty) to y=30 (full)

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className={`fixed bottom-20 right-4 z-50 w-14 h-14 cherry-sticker flex items-center justify-center text-2xl shadow-lg btn-bounce ${running ? 'animate-pulse-rose' : 'animate-float'}`}
          aria-label="Ouvrir le Timer Cerise"
        >
          🍒
        </button>
      )}

      {open && (
        <div className="fixed bottom-20 right-4 z-50 glass-card rounded-3xl p-5 w-64 shadow-2xl border border-rose-200/40"
          style={{ animation: 'scale-in 0.2s ease-out forwards' }}>
          <div className="flex justify-between items-center mb-3">
            <span className="font-bold text-plum text-sm">
              {phase === 'work' ? '🍒 Focus — 25 min' : '☕ Pause — 5 min'}
            </span>
            <button onClick={() => setOpen(false)} className="text-plum-muted hover:text-plum transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Cherry SVG */}
          <div className="flex justify-center mb-3">
            <svg viewBox="0 0 100 100" className="w-24 h-24">
              <defs>
                <clipPath id="cherry-clip">
                  <rect x="18" y={cherryFillY} width="64" height={82 - cherryFillY} />
                </clipPath>
              </defs>
              {/* Stem */}
              <path d="M50 22 Q62 10 74 16 Q82 22 78 32" stroke="#2D6A1A" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
              {/* Cherry body empty */}
              <circle cx="50" cy="65" r="28" fill="#FFD6D9" stroke="#F5B4BC" strokeWidth="1.5"/>
              {/* Cherry body filled */}
              <circle cx="50" cy="65" r="28" fill="#C41230" clipPath="url(#cherry-clip)"/>
              {/* Shine */}
              <ellipse cx="40" cy="55" rx="7" ry="5" fill="rgba(255,255,255,0.30)" transform="rotate(-25,40,55)"/>
            </svg>
          </div>

          {/* Time */}
          <div className="text-center mb-3">
            <span className="font-script text-4xl text-plum tracking-wide">{mm}:{ss}</span>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-rose-100 rounded-full mb-4 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${fill}%`,
                background: 'linear-gradient(90deg, #E8889A, #C41230)',
              }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setRunning(r => !r)}
              className="flex items-center gap-2 bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-2xl px-5 py-2.5 font-bold text-sm btn-bounce shadow-md"
            >
              {running ? <Pause size={15} /> : <Play size={15} />}
              {running ? 'Pause' : 'Démarrer'}
            </button>
            <button onClick={reset} className="text-plum-muted hover:text-plum transition-colors rounded-xl p-2 hover:bg-rose-50">
              <RotateCcw size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
