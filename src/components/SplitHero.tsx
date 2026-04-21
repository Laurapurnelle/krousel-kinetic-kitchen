import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import heroStreet from "@/assets/hero-street.jpg";
import heroTraiteur from "@/assets/hero-traiteur.jpg";
import logoKrouselTypo from "@/assets/logo-krousel-typo-beige.svg";
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
        <div className="absolute inset-0 bg-street-red-dark/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-street-red-dark/90 via-street-red-dark/40 to-street-red-dark/30" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-[50vh] md:min-h-screen p-8 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
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
        <div className="absolute inset-0 bg-traiteur-forest/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-traiteur-forest/90 via-traiteur-forest/40 to-traiteur-forest/30" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-[50vh] md:min-h-screen p-8 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
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

      {/* Centered "THE K'ROUSEL" wordmark on the split junction */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7, ease: "easeOut" }}
        className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 md:top-[18%] md:translate-y-0 z-20 pointer-events-none w-[88%] md:w-[60%] lg:w-[50%] max-w-[680px] px-4"
        aria-hidden="true"
      >
        <img
          src={logoKrouselTypo}
          alt="THE K'ROUSEL"
          className="w-full h-auto drop-shadow-[0_4px_20px_rgba(0,0,0,0.55)]"
        />
      </motion.div>

      {/* Scroll hint — shown on mobile where sections stack vertically */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="md:hidden absolute left-1/2 -translate-x-1/2 bottom-6 z-30 pointer-events-none flex flex-col items-center gap-1"
        aria-hidden="true"
      >
        <span className="font-body text-[10px] uppercase tracking-[0.3em] text-street-beige/80 drop-shadow">
          Défiler
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-9 h-9 rounded-full bg-street-beige/15 backdrop-blur-sm border border-street-beige/40 flex items-center justify-center"
        >
          <ChevronDown className="text-street-beige" size={18} strokeWidth={2.5} />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default SplitHero;
