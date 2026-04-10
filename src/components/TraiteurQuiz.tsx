import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Building2, PartyPopper, TreePine, Sparkles, Palette, Beef, Leaf, Flame, ChevronRight, ChevronLeft, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const quizSteps = [
  {
    title: "Type d'Événement",
    subtitle: "Quel est votre occasion spéciale ?",
    options: [
      { id: "wedding", label: "Mariage", icon: Heart },
      { id: "corporate", label: "Corporate", icon: Building2 },
      { id: "private", label: "Privé", icon: PartyPopper },
    ],
  },
  {
    title: "L'Ambiance",
    subtitle: "Quelle atmosphère souhaitez-vous créer ?",
    options: [
      { id: "rustic", label: "Rustique", icon: TreePine },
      { id: "chic", label: "Modern Chic", icon: Sparkles },
      { id: "creative", label: "Créatif", icon: Palette },
    ],
  },
  {
    title: "Vos Préférences",
    subtitle: "Quelle direction culinaire vous inspire ?",
    options: [
      { id: "meat", label: "Terroir & Viandes", icon: Beef },
      { id: "plant", label: "Végétal & Frais", icon: Leaf },
      { id: "fusion", label: "Fusion Créative", icon: Flame },
    ],
  },
];

const menuResults: Record<string, { name: string; description: string; highlights: string[] }> = {
  default: {
    name: "Le Terroir",
    description: "Un voyage à travers les saveurs authentiques de notre région. Des produits locaux, une cuisine de caractère.",
    highlights: ["Carpaccio de bœuf du pays", "Volaille fermière rôtie", "Tarte fine aux fruits de saison"],
  },
  audacieux: {
    name: "L'Audacieux",
    description: "Pour les palais aventuriers. Une cuisine fusion qui repousse les frontières du goût avec élégance.",
    highlights: ["Tataki de thon aux agrumes", "Risotto truffe & parmesan 36 mois", "Dôme chocolat & passion"],
  },
  gastronomique: {
    name: "Le Gastronomique",
    description: "L'excellence culinaire à chaque bouchée. Un menu raffiné pour une expérience inoubliable.",
    highlights: ["Foie gras mi-cuit maison", "Filet de bar, beurre blanc", "Soufflé Grand Marnier"],
  },
};

function getResult(selections: Record<number, string>): typeof menuResults.default {
  const pref = selections[2];
  if (pref === "fusion") return menuResults.audacieux;
  if (pref === "plant" || (selections[1] === "chic" && pref === "meat")) return menuResults.gastronomique;
  return menuResults.default;
}

const TraiteurQuiz = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (optionId: string) => {
    setSelections((prev) => ({ ...prev, [currentStep]: optionId }));
  };

  const handleNext = () => {
    if (currentStep < 2) setCurrentStep((s) => s + 1);
    else setShowResult(true);
  };

  const reset = () => {
    setCurrentStep(0);
    setSelections({});
    setShowResult(false);
  };

  const result = getResult(selections);

  return (
    <section id="traiteur" className="section-traiteur py-24 px-6 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-traiteur-forest/5 via-transparent to-traiteur-olive/5 pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-traiteur-olive mb-3">
            Traiteur Sur Mesure
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            Votre Événement, Notre Passion
          </h2>
          <p className="font-body text-base text-muted-foreground max-w-xl mx-auto">
            Répondez à trois questions et découvrez le menu qui correspond à votre vision.
          </p>
        </motion.div>

        <div className="max-w-lg mx-auto">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={`step-${currentStep}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="glass-card rounded-2xl p-8 cinematic-shadow"
              >
                {/* Progress */}
                <div className="flex items-center gap-2 mb-6">
                  {quizSteps.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full flex-1 transition-all duration-500 ${
                        i <= currentStep ? "bg-traiteur-forest" : "bg-border"
                      }`}
                    />
                  ))}
                </div>

                <h3 className="font-heading text-2xl font-semibold text-foreground mb-1">
                  {quizSteps[currentStep].title}
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-8">
                  {quizSteps[currentStep].subtitle}
                </p>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  {quizSteps[currentStep].options.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = selections[currentStep] === opt.id;
                    return (
                      <motion.button
                        key={opt.id}
                        onClick={() => handleSelect(opt.id)}
                        whileTap={{ scale: 0.95 }}
                        className={`flex flex-col items-center gap-3 p-5 rounded-xl border-2 transition-all duration-300 btn-bounce ${
                          isSelected
                            ? "border-traiteur-forest bg-traiteur-forest/5"
                            : "border-border hover:border-traiteur-olive"
                        }`}
                      >
                        <Icon
                          size={28}
                          className={isSelected ? "text-traiteur-forest" : "text-muted-foreground"}
                        />
                        <span className="font-body text-xs font-semibold text-foreground">
                          {opt.label}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => currentStep > 0 && setCurrentStep((s) => s - 1)}
                    disabled={currentStep === 0}
                    className="flex items-center gap-1 font-body text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 btn-bounce"
                  >
                    <ChevronLeft size={16} />
                    Retour
                  </button>
                  <motion.button
                    onClick={handleNext}
                    disabled={!selections[currentStep]}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-traiteur-forest text-traiteur-offwhite px-6 py-3 rounded-xl font-body text-sm font-semibold uppercase tracking-wider disabled:opacity-40 btn-bounce"
                  >
                    {currentStep === 2 ? "Voir le Résultat" : "Suivant"}
                    <ChevronRight size={16} />
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", damping: 20 }}
                className="glass-card rounded-2xl p-8 text-center cinematic-shadow-lg"
              >
                <motion.div
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-traiteur-forest/10 mb-6"
                >
                  <Award className="text-traiteur-forest" size={36} />
                </motion.div>

                <p className="font-body text-sm uppercase tracking-[0.3em] text-traiteur-olive mb-2">
                  Votre Menu Idéal
                </p>
                <h3 className="font-heading text-3xl font-bold text-foreground mb-3">
                  {result.name}
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-8 leading-relaxed">
                  {result.description}
                </p>

                <div className="space-y-3 mb-8">
                  {result.highlights.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="bg-traiteur-forest/5 rounded-lg py-3 px-4"
                    >
                      <span className="font-body text-sm text-foreground">{item}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="bg-traiteur-forest text-traiteur-offwhite px-6 py-3 rounded-xl font-body text-sm font-semibold uppercase tracking-wider btn-bounce"
                  >
                    Demander un Devis
                  </motion.button>
                  <button
                    onClick={reset}
                    className="border-2 border-traiteur-olive text-traiteur-forest px-6 py-3 rounded-xl font-body text-sm font-semibold uppercase tracking-wider hover:bg-traiteur-olive/10 transition-colors btn-bounce"
                  >
                    Recommencer
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default TraiteurQuiz;
