import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SplitHero from "@/components/SplitHero";
import StreetFoodPage from "@/components/StreetFoodPage";
import TraiteurPage from "@/components/TraiteurPage";

export type Universe = "gate" | "street" | "traiteur";

const Index = () => {
  const [universe, setUniverse] = useState<Universe>("gate");

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {universe === "gate" && (
          <SplitHero key="gate" onSelect={setUniverse} />
        )}
        {universe === "street" && (
          <StreetFoodPage key="street" onBack={() => setUniverse("gate")} />
        )}
        {universe === "traiteur" && (
          <TraiteurPage key="traiteur" onBack={() => setUniverse("gate")} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
