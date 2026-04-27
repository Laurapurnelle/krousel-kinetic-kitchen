import { useApp } from "@/context/AppContext";
import { X } from "lucide-react";
import { motion } from "framer-motion";

export default function OneThingMode() {
  const { tasks, focusTask, setFocusTask, setOneThingMode, toggleTask } = useApp();
  const incomplete = tasks.filter(t => !t.completed);
  const displayed = focusTask ?? incomplete[0] ?? null;

  const handleDone = () => {
    if (displayed) toggleTask(displayed.id);
    setOneThingMode(false);
    setFocusTask(null);
  };

  const handleNext = () => {
    if (!displayed) return;
    const idx = incomplete.findIndex(t => t.id === displayed.id);
    setFocusTask(incomplete[(idx + 1) % incomplete.length]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center p-8"
      style={{ background: 'linear-gradient(135deg, #FFF1EC 0%, #FFE0E8 50%, #FFF5F0 100%)' }}
    >
      <button
        onClick={() => { setOneThingMode(false); setFocusTask(null); }}
        className="absolute top-6 right-6 text-plum-muted hover:text-plum transition-colors p-2"
        aria-label="Fermer"
      >
        <X size={28} />
      </button>

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-script text-plum-muted text-2xl mb-6 text-center"
      >
        Une seule chose à la fois...
      </motion.p>

      {displayed ? (
        <div className="flex flex-col items-center gap-6 w-full max-w-sm">
          <motion.div
            key={displayed.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 280, damping: 22 }}
            className="glass-card rounded-3xl p-8 text-center w-full shadow-2xl"
            style={{ borderColor: displayed.color, borderWidth: 2 }}
          >
            <p className="text-4xl font-bold text-plum leading-snug break-words">
              {displayed.isComplex && <span className="block text-2xl mb-2">🧠</span>}
              {displayed.title}
            </p>
            <p className="text-sm text-plum-muted font-medium mt-3">{displayed.day}</p>
          </motion.div>

          <button
            onClick={handleDone}
            className="w-full bg-gradient-to-r from-rose-400 to-cherry text-white rounded-3xl px-10 py-4 text-xl font-bold btn-bounce shadow-xl"
          >
            ✓ C'est fait !
          </button>

          {incomplete.length > 1 && (
            <button onClick={handleNext} className="text-plum-muted text-sm underline underline-offset-4 font-semibold">
              Voir une autre tâche →
            </button>
          )}
        </div>
      ) : (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="text-7xl mb-4">🎉</div>
          <p className="text-3xl font-bold text-plum">Tout est fait !</p>
          <p className="font-script text-plum-muted text-2xl mt-3">Tu es une vraie Super Cherry 🍒</p>
        </motion.div>
      )}
    </motion.div>
  );
}
