import { useState } from "react";
import { Plus, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";

const DAYS_FR = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const EMOJIS = ['✨', '🚶', '💧', '🧘', '📚', '💊', '🏃', '🍎', '😴', '🎨', '🎵', '🌿', '☀️', '🌙'];

function getWeekDates(offset = 0): string[] {
  const now = new Date();
  const dow = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1) + offset * 7);
  return DAYS_FR.map((_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.toISOString().split('T')[0];
  });
}

function weekLabel(dates: string[]): string {
  const s = new Date(dates[0]);
  const e = new Date(dates[6]);
  return `${s.getDate()} — ${e.getDate()} ${e.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}`;
}

function getStreak(completedDays: string[]): number {
  let streak = 0;
  const d = new Date();
  while (true) {
    const ds = d.toISOString().split('T')[0];
    if (!completedDays.includes(ds)) break;
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

export default function HabitTracker() {
  const { habits, addHabit, toggleHabitDay, deleteHabit } = useApp();
  const [weekOffset, setWeekOffset] = useState(0);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newIcon, setNewIcon] = useState('✨');

  const dates = getWeekDates(weekOffset);
  const today = new Date().toISOString().split('T')[0];

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    addHabit(newName.trim(), newIcon);
    setNewName('');
    setShowAdd(false);
  };

  const weekCompletion = habits.length
    ? Math.round(
        (habits.reduce((acc, h) => acc + dates.filter(d => h.completedDays.includes(d)).length, 0) /
          (habits.length * 7)) * 100
      )
    : 0;

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-plum">Mes Habitudes</h2>
        <button
          onClick={() => setShowAdd(v => !v)}
          className="flex items-center gap-1.5 bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-2xl px-4 py-2 text-sm font-bold btn-bounce shadow-md"
        >
          <Plus size={15} />
          Ajouter
        </button>
      </div>

      {/* Week navigation */}
      <div className="glass-card rounded-2xl flex items-center justify-between px-4 py-3">
        <button
          onClick={() => setWeekOffset(o => o - 1)}
          className="text-plum-muted hover:text-plum btn-bounce p-1"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="font-script text-plum text-lg text-center">{weekLabel(dates)}</span>
        <button
          onClick={() => setWeekOffset(o => o + 1)}
          disabled={weekOffset >= 0}
          className={`btn-bounce p-1 ${weekOffset >= 0 ? 'text-rose-200 cursor-not-allowed' : 'text-plum-muted hover:text-plum'}`}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Progress bar */}
      {habits.length > 0 && (
        <div className="glass-card rounded-2xl px-4 py-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-plum-muted">Progression cette semaine</span>
            <span className="text-sm font-bold text-plum">{weekCompletion}%</span>
          </div>
          <div className="h-2.5 bg-rose-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${weekCompletion}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #E8889A, #C41230)' }}
            />
          </div>
        </div>
      )}

      {/* Add habit form */}
      <AnimatePresence>
        {showAdd && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleAdd} className="glass-card rounded-3xl p-4 space-y-3 border border-rose-200/40">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="Nom de l'habitude..."
                  autoFocus
                  className="flex-1 bg-white/60 border border-rose-200 rounded-2xl px-4 py-2.5 text-plum placeholder:text-plum-muted/60 focus:outline-none focus:ring-2 focus:ring-rose-300 text-sm font-medium"
                />
                <button
                  type="submit"
                  className="bg-rose-400 text-white rounded-2xl px-4 py-2 font-bold btn-bounce"
                >
                  ✓
                </button>
              </div>
              <div className="flex gap-2 flex-wrap">
                {EMOJIS.map(em => (
                  <button
                    key={em}
                    type="button"
                    onClick={() => setNewIcon(em)}
                    className={`text-xl p-1.5 rounded-xl transition-all ${
                      newIcon === em ? 'bg-rose-200 scale-125 shadow-sm' : 'hover:bg-rose-100'
                    }`}
                  >
                    {em}
                  </button>
                ))}
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Habit table */}
      <div className="glass-card rounded-3xl overflow-hidden border border-rose-200/40">
        {/* Column headers */}
        <div className="grid items-center bg-rose-100/60 px-4 py-2.5" style={{ gridTemplateColumns: '1fr repeat(7, 2.25rem)' }}>
          <p className="text-xs font-bold text-plum-muted">Habitude</p>
          {DAYS_FR.map((d, i) => (
            <p
              key={d}
              className={`text-center text-xs font-bold ${dates[i] === today ? 'text-rose-500' : 'text-plum-muted'}`}
            >
              {d[0]}
            </p>
          ))}
        </div>

        {/* Rows */}
        <div className="divide-y divide-rose-100/60">
          {habits.length === 0 && (
            <p className="text-center text-plum-muted py-10 text-sm font-medium">
              Ajoute ta première habitude 🌸
            </p>
          )}
          {habits.map(habit => {
            const streak = getStreak(habit.completedDays);
            return (
              <motion.div
                key={habit.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="grid items-center px-4 py-3 group"
                style={{ gridTemplateColumns: '1fr repeat(7, 2.25rem)' }}
              >
                {/* Habit name */}
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <span className="text-xl flex-shrink-0">{habit.icon}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-plum truncate">{habit.name}</p>
                    {streak > 0 && (
                      <p className="text-[10px] text-peach font-bold">🔥 {streak}j</p>
                    )}
                  </div>
                  <button
                    onClick={() => deleteHabit(habit.id)}
                    className="ml-auto opacity-0 group-hover:opacity-100 text-plum-muted hover:text-red-400 transition-all flex-shrink-0"
                    aria-label="Supprimer"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>

                {/* Day checkboxes */}
                {dates.map(dateStr => {
                  const done = habit.completedDays.includes(dateStr);
                  const isFuture = dateStr > today;
                  const isToday = dateStr === today;
                  return (
                    <button
                      key={dateStr}
                      onClick={() => !isFuture && toggleHabitDay(habit.id, dateStr)}
                      disabled={isFuture}
                      aria-label={done ? 'Décocher' : 'Cocher'}
                      className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm font-bold transition-all btn-bounce ${
                        done
                          ? 'text-white shadow-md'
                          : isFuture
                          ? 'opacity-20 cursor-not-allowed bg-rose-50'
                          : isToday
                          ? 'border-2 border-rose-400 hover:bg-rose-100 text-rose-400'
                          : 'bg-rose-50 hover:bg-rose-100 text-transparent hover:text-rose-300'
                      }`}
                      style={done ? { background: 'linear-gradient(135deg, #E8889A, #C41230)' } : {}}
                    >
                      ✓
                    </button>
                  );
                })}
              </motion.div>
            );
          })}
        </div>

        {/* Footer stats */}
        {habits.length > 0 && (
          <div className="px-4 py-3 bg-rose-50/50 border-t border-rose-100/60 text-center">
            <p className="text-xs text-plum-muted font-semibold">
              {habits.reduce((acc, h) => acc + dates.filter(d => h.completedDays.includes(d)).length, 0)}{' '}
              / {habits.length * 7} complétées · {weekCompletion}% 🌸
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
