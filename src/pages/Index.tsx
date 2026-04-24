import { useSearchParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import SplitHero from "@/components/SplitHero";
import StreetFoodPage from "@/components/StreetFoodPage";
import TraiteurPage from "@/components/TraiteurPage";

export type Universe = "gate" | "street" | "traiteur";

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const universeParam = searchParams.get("universe");
  const universe: Universe = universeParam === "street" || universeParam === "traiteur" ? universeParam : "gate";

  const handleUniverseChange = (nextUniverse: Universe) => {
    setSearchParams(nextUniverse === "gate" ? {} : { universe: nextUniverse });
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {universe === "gate" && (
          <SplitHero key="gate" onSelect={(nextUniverse) => handleUniverseChange(nextUniverse)} />
        )}
        {universe === "street" && (
          <StreetFoodPage key="street" onBack={() => handleUniverseChange("gate")} />
        )}
        {universe === "traiteur" && (
          <TraiteurPage key="traiteur" onBack={() => handleUniverseChange("gate")} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
