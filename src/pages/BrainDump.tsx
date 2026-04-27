import { useState, useEffect } from "react";
import { Trash2, Save } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function BrainDump() {
  const { brainDump, setBrainDump } = useApp();
  const [text, setText] = useState(brainDump);
  const [saved, setSaved] = useState(true);

  // Auto-save with debounce
  useEffect(() => {
    setSaved(false);
    const timer = setTimeout(() => {
      setBrainDump(text);
      setSaved(true);
    }, 700);
    return () => clearTimeout(timer);
  }, [text, setBrainDump]);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const handleClear = () => {
    if (!text.trim()) return;
    const confirmed = window.confirm('Effacer tout le contenu ?');
    if (confirmed) {
      setText('');
      setBrainDump('');
    }
  };

  return (
    <div className="p-4 flex flex-col" style={{ minHeight: 'calc(100dvh - 130px)' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-2xl font-bold text-plum">Brain Dump</h2>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-1 text-xs font-semibold transition-colors ${
            saved ? 'text-green-500' : 'text-plum-muted'
          }`}>
            <Save size={12} />
            {saved ? 'Sauvegardé' : 'En cours...'}
          </div>
          <button
            onClick={handleClear}
            className="text-plum-muted hover:text-red-400 transition-colors p-1"
            title="Effacer"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <p className="font-script text-plum-muted text-xl mb-5">
        Vide ta tête ici, sans jugement 🌸
      </p>

      {/* Main textarea */}
      <div className="glass-card rounded-3xl p-4 flex-1 flex flex-col border border-rose-200/30">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={`Qu'est-ce qui tourne dans ta tête ?\n\nTes idées, tes peurs, tes rêves, ta liste de courses...\nTout va ici. Sans structure, sans filtre. C'est ton espace. 💕`}
          className="flex-1 w-full bg-transparent resize-none text-plum placeholder:text-plum-muted/45 focus:outline-none text-base leading-relaxed font-medium"
          style={{ fontFamily: "'Quicksand', system-ui, sans-serif", minHeight: '320px' }}
        />
        <div className="flex justify-between mt-3 pt-3 border-t border-rose-100/50">
          <span className="text-xs text-plum-muted font-semibold">
            {wordCount} {wordCount === 1 ? 'mot' : 'mots'} · {text.length} caractères
          </span>
          <span className="text-xs text-plum-muted font-medium">
            {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Prompts */}
      <div className="mt-4 glass-card-rose rounded-3xl p-4 border border-rose-200/30">
        <p className="text-xs font-bold text-plum-muted mb-2 uppercase tracking-wide">Besoin d'inspiration ?</p>
        <div className="flex flex-wrap gap-2">
          {[
            'Comment je me sens aujourd\'hui ?',
            'Ce qui m\'occupe l\'esprit...',
            'Ce que j\'ai peur d\'oublier',
            'Ce dont je suis fière',
            'Ce qui me pèse',
          ].map(prompt => (
            <button
              key={prompt}
              onClick={() => setText(t => t ? `${t}\n\n${prompt}\n` : `${prompt}\n`)}
              className="text-[11px] font-semibold text-plum-muted hover:text-plum bg-white/50 hover:bg-white/80 rounded-full px-3 py-1.5 transition-all btn-bounce border border-rose-200/50"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom badge */}
      <div className="mt-4 text-center">
        <div className="slow-progress-badge justify-center text-sm mx-auto inline-flex">
          🧠 Mettre des mots, c'est déjà agir
        </div>
      </div>
    </div>
  );
}
