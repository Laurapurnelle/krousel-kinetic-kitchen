import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Beef, Droplets, Plus } from "lucide-react";

const steps = [
  {
    title: "La Base",
    icon: Beef,
    options: [
      { id: "beef", label: "Bœuf", desc: "Smash patty 150g, grillé à la flamme" },
      { id: "chicken", label: "Poulet", desc: "Filet pané croustillant, mariné 24h" },
      { id: "veggie", label: "Veggie", desc: "Galette de légumes & épices fumées" },
    ],
  },
  {
    title: "La Sauce",
    icon: Droplets,
    options: [
      { id: "bicky", label: "Bicky", desc: "La sauce légendaire, sucrée-épicée" },
      { id: "andalouse", label: "Andalouse", desc: "Tomate, poivron & piment doux" },
      { id: "samourai", label: "Samouraï", desc: "Harissa belge, relevée & addictive" },
      { id: "cocktail", label: "Cocktail", desc: "Classique crémeuse au cognac" },
    ],
  },
  {
    title: "Les Suppléments",
    icon: Plus,
    options: [
      { id: "onions", label: "Oignons Crispy", desc: "+0,50€" },
      { id: "bacon", label: "Bacon Fumé", desc: "+1,00€" },
      { id: "cheese", label: "Cheddar Affiné", desc: "+0,80€" },
      { id: "egg", label: "Œuf au Plat", desc: "+1,00€" },
    ],
  },
];

interface BurgerCarouselProps {
  isOpen: boolean;
  onClose: () => void;
}

const BurgerCarousel = ({ isOpen, onClose }: BurgerCarouselProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<number, string[]>>({
    0: [],
    1: [],
    2: [],
  });

  const step = steps[currentStep];
  const StepIcon = step.icon;

  const toggleSelection = (stepIdx: number, optionId: string) => {
    setSelections((prev) => {
      const current = prev[stepIdx] || [];
      if (stepIdx === 2) {
        // Multi-select for supplements
        return {
          ...prev,
          [stepIdx]: current.includes(optionId)
            ? current.filter((id) => id !== optionId)
            : [...current, optionId],
        };
      }
      return { ...prev, [stepIdx]: [optionId] };
    });
  };

  const canProceed = currentStep < 2 ? (selections[currentStep]?.length || 0) > 0 : true;

  const handleNext = () => {
    if (currentStep < 2) setCurrentStep((s) => s + 1);
    else {
      onClose();
      setCurrentStep(0);
      setSelections({ 0: [], 1: [], 2: [] });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, rotateY: -15 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.9, opacity: 0, rotateY: 15 }}
            transition={{ type: "spring", damping: 25 }}
            className="glass-card-strong rounded-3xl w-full max-w-md overflow-hidden cinematic-shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative bg-primary p-6 text-center">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-primary-foreground/60 hover:text-primary-foreground btn-bounce"
              >
                <X size={20} />
              </button>
              <motion.div
                key={currentStep}
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 15 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-foreground/10 mb-3"
              >
                <StepIcon className="text-street-yellow" size={28} />
              </motion.div>
              <h3 className="font-heading text-2xl font-bold text-primary-foreground">
                {step.title}
              </h3>
              <div className="flex items-center justify-center gap-2 mt-3">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === currentStep
                        ? "w-8 bg-street-yellow"
                        : i < currentStep
                        ? "w-4 bg-primary-foreground/40"
                        : "w-4 bg-primary-foreground/20"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Options with carousel rotation */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ rotateY: 90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: -90, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-3"
                >
                  {step.options.map((option) => {
                    const isSelected = selections[currentStep]?.includes(option.id);
                    return (
                      <motion.button
                        key={option.id}
                        onClick={() => toggleSelection(currentStep, option.id)}
                        whileTap={{ scale: 0.97 }}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 btn-bounce ${
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-secondary"
                        }`}
                      >
                        <p className="font-heading text-base font-semibold text-foreground">
                          {option.label}
                        </p>
                        <p className="font-body text-xs text-muted-foreground mt-0.5">
                          {option.desc}
                        </p>
                      </motion.button>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between p-6 pt-0">
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
                disabled={!canProceed && currentStep < 2}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-body text-sm font-semibold uppercase tracking-wider disabled:opacity-40 btn-bounce"
              >
                {currentStep === 2 ? "Commander" : "Suivant"}
                <ChevronRight size={16} />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BurgerCarousel;
