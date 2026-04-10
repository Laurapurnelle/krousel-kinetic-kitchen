import { motion } from "framer-motion";
import { ArrowLeft, Truck } from "lucide-react";
import LocationWidget from "./LocationWidget";
import FriterieMenu from "./FriterieMenu";
import heroStreet from "@/assets/hero-street.jpg";

interface StreetFoodPageProps {
  onBack: () => void;
}

const StreetFoodPage = ({ onBack }: StreetFoodPageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card-strong border-b-2 border-primary/20">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <button onClick={onBack} className="flex items-center gap-2 text-primary font-body text-sm font-medium btn-bounce">
            <ArrowLeft size={18} />
            Accueil
          </button>
          <span className="font-heading text-xl font-bold text-primary">THE K'ROUSEL</span>
          <div className="flex items-center gap-6">
            {[
              { label: "La Carte", href: "#la-carte" },
              { label: "Food Truck", href: "#food-truck" },
            ].map((l) => (
              <a key={l.href} href={l.href} className="hidden md:block font-body text-sm text-muted-foreground hover:text-primary transition-colors">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-20">
        <div className="relative h-[50vh] overflow-hidden">
          <img src={heroStreet} alt="La Friterie" className="w-full h-full object-cover" width={1280} height={720} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-primary/20 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center">
              <p className="font-body text-sm uppercase tracking-[0.3em] text-street-yellow mb-3">
                Friterie & Food Truck
              </p>
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-street-beige mb-4">
                La Friterie
              </h1>
              <p className="font-body text-base text-street-beige/80 max-w-lg mx-auto">
                Par Kassandra Lorquet — les vrais classiques du fritkot belge, sublimés avec passion.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menu (Friterie) */}
      <FriterieMenu />

      {/* Food Truck Location (separate section, location only) */}
      <section id="food-truck" className="py-20 px-6 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 mb-3">
              <Truck className="text-secondary" size={20} />
              <p className="font-body text-sm uppercase tracking-[0.3em] text-secondary">
                Food Truck
              </p>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
              Où nous trouver
            </h2>
            <p className="font-body text-sm text-muted-foreground max-w-md mx-auto">
              Retrouvez notre food truck en direct ou venez nous rendre visite à la friterie fixe. 
              Pas de commande en ligne — venez profiter sur place !
            </p>
          </motion.div>
          <LocationWidget />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary py-12 px-6 text-center">
        <p className="font-heading text-2xl font-bold text-primary-foreground mb-2">THE K'ROUSEL</p>
        <p className="font-body text-sm text-primary-foreground/60">Friterie & Food Truck — Liège, Belgique</p>
        <p className="font-body text-xs text-primary-foreground/40 mt-1">Par Kassandra Lorquet</p>
        <p className="font-body text-xs text-primary-foreground/30 mt-4">© {new Date().getFullYear()} THE K'ROUSEL</p>
      </footer>
    </motion.div>
  );
};

export default StreetFoodPage;
