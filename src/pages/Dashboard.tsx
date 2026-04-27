import { useState } from "react";
import { Plus, Trash2, Target, Zap } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import AddTaskModal from "@/components/AddTaskModal";

const DAYS = [
  { key: 'Lun', full: 'Lundi' },
  { key: 'Mar', full: 'Mardi' },
  { key: 'Mer', full: 'Mercredi' },
  { key: 'Jeu', full: 'Jeudi' },
  { key: 'Ven', full: 'Vendredi' },
  { key: 'Sam', full: 'Samedi' },
  { key: 'Dim', full: 'Dimanche' },
];

function getWeekDates(): number[] {
  const now = new Date();
  const dow = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1));
  return DAYS.map((_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.getDate();
  });
}

function todayKey(): string {
  const keys = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  return keys[new Date().getDay()];
}

export default function Dashboard() {
  const { tasks, toggleTask, deleteTask, energy, setOneThingMode, setFocusTask } = useApp();
  const [addingTo, setAddingTo] = useState<string | null>(null);
  const dates = getWeekDates();
  const today = todayKey();
  const isLowEnergy = energy === 'empty' || energy === 'low';

  const tasksFor = (dayKey: string) =>
    tasks.filter(t => t.day === dayKey && (!isLowEnergy || !t.isComplex));

  const handleOneThing = () => {
    const incomplete = tasks.filter(t => !t.completed);
    if (incomplete.length) setFocusTask(incomplete[0]);
    setOneThingMode(true);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-plum">Cette Semaine</h2>
          <div className="slow-progress-badge mt-2">
            🌸 Slow progress is still progress
          </div>
        </div>
        <button
          onClick={handleOneThing}
          className="flex flex-col items-center gap-1 rounded-3xl px-4 py-3 btn-bounce shadow-lg text-xs font-bold text-white flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #4A2535, #7A4F65)' }}
        >
          <Target size={20} />
          <span>One Thing</span>
        </button>
      </div>

      {/* Super Cherry sticker badge */}
      <div className="flex items-center gap-3">
        <div className="cherry-sticker w-10 h-10 flex items-center justify-center text-xl flex-shrink-0">🍒</div>
        <div className="slow-progress-badge text-xs">
          ✨ Vacation mode
        </div>
      </div>

      {/* Low energy banner */}
      <AnimatePresence>
        {isLowEnergy && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-card-rose rounded-2xl px-4 py-3 flex items-center gap-2.5"
          >
            <Zap size={16} className="text-peach flex-shrink-0" />
            <p className="text-xs text-plum font-semibold">
              Mode basse énergie — tâches complexes masquées. Sois douce avec toi 💕
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Weekly grid */}
      <div className="overflow-x-auto -mx-4 px-4 no-scrollbar">
        <div className="flex gap-3 pb-4" style={{ minWidth: 'max-content' }}>
          {DAYS.map((day, idx) => {
            const dayTasks = tasksFor(day.key);
            const isToday = day.key === today;

            return (
              <div
                key={day.key}
                className={`flex-shrink-0 w-36 rounded-3xl overflow-hidden shadow-sm ${
                  isToday ? 'ring-2 ring-rose-400 shadow-xl' : 'ring-1 ring-rose-100'
                }`}
              >
                {/* Day header */}
                <div
                  className={`px-3 py-2.5 text-center ${
                    isToday
                      ? 'text-white'
                      : 'bg-rose-50/80 text-plum'
                  }`}
                  style={isToday ? { background: 'linear-gradient(135deg, #E8889A, #C4607A)' } : {}}
                >
                  <p className={`text-xs font-bold ${isToday ? 'text-white/80' : 'text-plum-muted'}`}>
                    {day.full}
                  </p>
                  <p className={`text-2xl font-bold leading-tight ${isToday ? 'text-white' : 'text-plum'}`}>
                    {dates[idx]}
                  </p>
                  {isToday && (
                    <span className="text-[10px] text-white/80 font-semibold">Aujourd'hui ✨</span>
                  )}
                </div>

                {/* Tasks */}
                <div className="bg-white/40 backdrop-blur-sm min-h-28 p-2 space-y-2">
                  <AnimatePresence>
                    {dayTasks.map(task => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8, height: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className={`rounded-2xl p-2 cursor-pointer group relative transition-opacity ${
                          task.completed ? 'opacity-50' : ''
                        }`}
                        style={{ backgroundColor: task.color }}
                        onClick={() => toggleTask(task.id)}
                      >
                        <p className={`text-xs font-semibold text-plum leading-tight ${
                          task.completed ? 'line-through' : ''
                        }`}>
                          {task.isComplex && <span className="mr-0.5">🧠</span>}
                          {task.title}
                        </p>
                        {task.completed && (
                          <span className="text-green-600 text-xs font-bold">✓ Fait !</span>
                        )}
                        <button
                          onClick={e => { e.stopPropagation(); deleteTask(task.id); }}
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-plum-muted hover:text-red-400 transition-all"
                          aria-label="Supprimer"
                        >
                          <Trash2 size={10} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  <button
                    onClick={() => setAddingTo(day.key)}
                    className="w-full flex items-center justify-center gap-1 text-plum-muted hover:text-rose-500 transition-colors rounded-2xl py-2 border-2 border-dashed border-rose-200/70 hover:border-rose-300 text-[11px] font-semibold"
                  >
                    <Plus size={11} />
                    Ajouter
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats row */}
      {tasks.length > 0 && (
        <div className="glass-card rounded-3xl px-5 py-4 flex justify-around text-center">
          <div>
            <p className="text-2xl font-bold text-plum">{tasks.filter(t => t.completed).length}</p>
            <p className="text-xs text-plum-muted font-semibold">Complétées</p>
          </div>
          <div className="w-px bg-rose-200" />
          <div>
            <p className="text-2xl font-bold text-plum">{tasks.filter(t => !t.completed).length}</p>
            <p className="text-xs text-plum-muted font-semibold">Restantes</p>
          </div>
          <div className="w-px bg-rose-200" />
          <div>
            <p className="text-2xl font-bold text-plum">{tasks.length}</p>
            <p className="text-xs text-plum-muted font-semibold">Total</p>
          </div>
        </div>
      )}

      <AnimatePresence>
        {addingTo && (
          <AddTaskModal key="add-modal" day={addingTo} onClose={() => setAddingTo(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
