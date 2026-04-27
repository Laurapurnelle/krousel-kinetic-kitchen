import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { X } from "lucide-react";
import { motion } from "framer-motion";

const COLORS = [
  '#FFD0D8', '#FFE0C8', '#E8D4F0', '#C8F0E0',
  '#FFF0C8', '#C8E8FF', '#FFD8E8', '#D4F0C8',
];

interface Props {
  day: string;
  onClose: () => void;
}

export default function AddTaskModal({ day, onClose }: Props) {
  const { addTask } = useApp();
  const [title, setTitle] = useState('');
  const [color, setColor] = useState(COLORS[0]);
  const [isComplex, setIsComplex] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({ title: title.trim(), day, completed: false, color, isComplex });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-plum/20 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="glass-card rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-rose-200/40"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-plum text-lg">{day} — Nouvelle tâche</h3>
          <button onClick={onClose} className="text-plum-muted hover:text-plum transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Qu'est-ce que tu veux faire ?"
            autoFocus
            className="w-full bg-white/60 border border-rose-200 rounded-2xl px-4 py-3 text-plum placeholder:text-plum-muted/60 focus:outline-none focus:ring-2 focus:ring-rose-300 font-medium text-sm"
          />

          <div>
            <p className="text-xs font-semibold text-plum-muted mb-2">Couleur du bloc</p>
            <div className="flex gap-2 flex-wrap">
              {COLORS.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-8 h-8 rounded-full transition-all btn-bounce ${
                    color === c ? 'scale-125 ring-2 ring-rose-400 ring-offset-2' : 'hover:scale-110'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsComplex(v => !v)}
            className={`w-full flex items-center justify-between rounded-2xl px-4 py-3 border-2 transition-all ${
              isComplex
                ? 'border-orange-300 bg-orange-50 text-plum'
                : 'border-rose-200/60 bg-rose-50/40 text-plum-muted'
            }`}
          >
            <span className="text-sm font-semibold">Tâche complexe 🧠</span>
            <div className={`w-10 h-6 rounded-full relative transition-colors ${isComplex ? 'bg-peach' : 'bg-rose-200'}`}>
              <div className={`w-4 h-4 bg-white rounded-full shadow-sm absolute top-1 transition-transform ${isComplex ? 'translate-x-5' : 'translate-x-1'}`} />
            </div>
          </button>

          {isComplex && (
            <p className="text-xs text-plum-muted text-center -mt-1">
              Sera masquée en mode basse énergie 💕
            </p>
          )}

          <button
            type="submit"
            disabled={!title.trim()}
            className="w-full bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-2xl py-3 font-bold btn-bounce shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Ajouter cette tâche ✓
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
