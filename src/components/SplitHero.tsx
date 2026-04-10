import { motion } from "framer-motion";
import { Utensils, ChefHat } from "lucide-react";
import heroStreet from "@/assets/hero-street.jpg";
import heroTraiteur from "@/assets/hero-traiteur.jpg";
import KMonogram from "./KMonogram";
import type { Universe } from "@/pages/Index";

interface SplitHeroProps {
  onSelect: (universe: Universe) => void;
}

const SplitHero = ({ onSelect }: SplitHeroProps) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="relative h-screen flex flex-col md:flex-row overflow-hidden"
    >
      {/* Street Food Side */}
      <motion.button
        onClick={() => onSelect("street")}
        className="relative flex-1 group cursor-pointer overflow-hidden"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img
          src={heroStreet}
          alt="Friterie & Food Truck"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          width={1280}
          height={720}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-street-red-dark/85 via-street-red/30 to-transparent" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-[50vh] md:min-h-screen p-8 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Utensils className="mx-auto mb-4 text-street-cream" size={48} />
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-street-beige mb-3">
              Friterie
            </h2>
            <p className="font-heading text-lg md:text-xl italic text-street-cream mb-2">
              & Food Truck
            </p>
            <p className="font-body text-sm md:text-base text-street-beige/80 max-w-sm mx-auto tracking-wide">
              Notre carte complète, nos classiques du fritkot & la localisation de notre food truck en direct.
            </p>
            <motion.div
              className="mt-8 inline-block border-2 border-street-cream px-6 py-3 rounded-lg font-body text-sm font-semibold uppercase tracking-widest text-street-cream group-hover:bg-street-cream group-hover:text-street-red-dark transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Entrer
            </motion.div>
          </motion.div>
        </div>
      </motion.button>

      {/* Traiteur Side */}
      <motion.button
        onClick={() => onSelect("traiteur")}
        className="relative flex-1 group cursor-pointer overflow-hidden"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img
          src={heroTraiteur}
          alt="Traiteur & Privatisation Food Truck"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          width={1280}
          height={720}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-traiteur-forest/80 via-traiteur-forest/30 to-transparent" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-[50vh] md:min-h-screen p-8 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <ChefHat className="mx-auto mb-4 text-traiteur-olive" size={48} />
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-traiteur-offwhite mb-3">
              Traiteur
            </h2>
            <p className="font-heading text-lg md:text-xl italic text-traiteur-olive mb-2">
              & Privatisation Food Truck
            </p>
            <p className="font-body text-sm md:text-base text-traiteur-offwhite/80 max-w-sm mx-auto tracking-wide">
              Menus sur mesure, événements privés & réservation de notre food truck pour vos fêtes.
            </p>
            <motion.div
              className="mt-8 inline-block border-2 border-traiteur-olive px-6 py-3 rounded-lg font-body text-sm font-semibold uppercase tracking-widest text-traiteur-olive group-hover:bg-traiteur-olive group-hover:text-traiteur-forest transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explorer
            </motion.div>
          </motion.div>
        </div>
      </motion.button>

      {/* Center Logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.6, type: "spring" }}
          className="bg-background/90 backdrop-blur-xl rounded-full w-28 h-28 md:w-36 md:h-36 flex items-center justify-center cinematic-shadow-lg"
        >
          <div className="flex flex-col items-center">
            <KMonogram variant="red" size={50} />
            <p className="font-body text-[7px] md:text-[8px] tracking-[0.25em] uppercase text-muted-foreground -mt-1">
              The K'rousel
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SplitHero;
