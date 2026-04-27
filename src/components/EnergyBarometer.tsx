import { useState, useRef, useEffect } from "react";
import { useApp, type EnergyLevel } from "@/context/AppContext";

const LEVELS: { value: EnergyLevel; emoji: string; label: string; color: string }[] = [
  { value: 'empty', emoji: '😴', label: 'Épuisée', color: 'bg-gray-100' },
  { value: 'low',   emoji: '😔', label: 'Faible',  color: 'bg-blue-100' },
  { value: 'medium',emoji: '🙂', label: 'Moyen',   color: 'bg-rose-100' },
  { value: 'high',  emoji: '😊', label: 'Bien',    color: 'bg-green-100' },
  { value: 'super', emoji: '🌟', label: 'Super!',  color: 'bg-yellow-100' },
];

export default function EnergyBarometer() {
  const { energy, setEnergy } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LEVELS.find(l => l.value === energy) ?? LEVELS[2];

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 glass-card rounded-2xl px-3 py-1.5 btn-bounce border border-rose-200/40"
        aria-label="Sélectionner mon énergie"
      >
        <span className="text-xl leading-none">{current.emoji}</span>
        <span className="text-xs font-semibold text-plum hidden sm:block">{current.label}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-12 glass-card rounded-3xl p-3 flex gap-2 shadow-2xl z-50 border border-rose-200/40"
          style={{ animation: 'scale-in 0.15s ease-out forwards' }}>
          {LEVELS.map(l => (
            <button
              key={l.value}
              onClick={() => { setEnergy(l.value); setOpen(false); }}
              className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all duration-200 ${
                energy === l.value
                  ? `${l.color} scale-110 shadow-md`
                  : 'hover:bg-rose-50'
              }`}
            >
              <span className="text-2xl leading-none">{l.emoji}</span>
              <span className="text-[10px] font-semibold text-plum-muted whitespace-nowrap">{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
