import { useRef } from "react";
import { motion } from "framer-motion";

const QUOTES = [
  "Slow progress is still progress 🌸",
  "Tu fais du mieux que tu peux 💕",
  "Chaque petite victoire compte ✨",
  "Sois douce avec toi-même 🍒",
  "Une chose à la fois, c'est parfait 🌷",
  "Tu es en train de faire quelque chose d'incroyable 💪",
  "Le progrès n'est pas linéaire, et c'est OK 🌈",
  "Petits pas, grands voyages 🚶‍♀️",
  "Bravo, Super Cherry! 🍒⭐",
  "Tu gères vraiment bien 🎉",
  "Fière de toi 🥰",
];

interface Props {
  task: string;
}

export default function MotivationalQuote({ task }: Props) {
  const quoteRef = useRef(QUOTES[Math.floor(Math.random() * QUOTES.length)]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className="fixed bottom-28 left-1/2 -translate-x-1/2 z-50 glass-card rounded-3xl px-6 py-5 shadow-2xl border border-rose-200/40 text-center max-w-xs w-[90vw] pointer-events-none"
    >
      <div className="text-4xl mb-2">🎉</div>
      <p className="text-xs text-plum-muted font-semibold mb-1.5 line-clamp-2">
        « {task} » ✓
      </p>
      <p className="text-sm font-bold text-plum leading-snug">{quoteRef.current}</p>
      <div className="slow-progress-badge mt-3 justify-center text-xs mx-auto">
        🍒 Super Cherry
      </div>
    </motion.div>
  );
}
