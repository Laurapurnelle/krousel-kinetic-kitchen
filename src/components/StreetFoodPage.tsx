import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import LocationWidget from "./LocationWidget";
import MenuSection from "./MenuSection";
import BurgerCarousel from "./BurgerCarousel";

interface StreetFoodPageProps {
  onBack: () => void;
}

const StreetFoodPage = ({ onBack }: StreetFoodPageProps) => {
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* Navbar Street */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card-strong border-b-2 border-street-bordeaux/20">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <button onClick={onBack} className="flex items-center gap-2 text-primary font-body text-sm font-medium btn-bounce">
            <ArrowLeft size={18} />
            Accueil
          </button>
          <span className="font-heading text-xl font-bold text-primary">THE K'ROUSEL</span>
          <div className="flex items-center gap-6">
            {["La Carte", "Nous Trouver"].map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`} className="hidden md:block font-body text-sm text-muted-foreground hover:text-primary transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero banner */}
      <section className="pt-24 pb-16 px-6 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <p className="font-body text-sm uppercase tracking-[0.3em] text-secondary mb-3">La Friterie Itinérante</p>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-4">Street Food d'Artisan</h1>
            <p className="font-body text-base text-muted-foreground max-w-xl mx-auto mb-8">
              Par Kassandra Lorquet — des classiques belges sublimés avec passion, servis depuis notre food truck à travers Liège.
            </p>
            <motion.button
              onClick={() => setIsCarouselOpen(true)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-body text-sm font-semibold uppercase tracking-widest cinematic-shadow btn-bounce"
            >
              Créer Mon Burger
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Location */}
      <section id="nous-trouver" className="py-16 px-6">
        <div className="container mx-auto">
          <LocationWidget />
        </div>
      </section>

      {/* Menu */}
      <MenuSection />

      {/* Footer Street */}
      <footer className="bg-primary py-12 px-6 text-center">
        <p className="font-heading text-2xl font-bold text-primary-foreground mb-2">THE K'ROUSEL</p>
        <p className="font-body text-sm text-primary-foreground/60">Friterie Itinérante — Liège, Belgique</p>
        <p className="font-body text-xs text-primary-foreground/40 mt-4">© {new Date().getFullYear()} THE K'ROUSEL</p>
      </footer>

      <BurgerCarousel isOpen={isCarouselOpen} onClose={() => setIsCarouselOpen(false)} />
    </motion.div>
  );
};

export default StreetFoodPage;
