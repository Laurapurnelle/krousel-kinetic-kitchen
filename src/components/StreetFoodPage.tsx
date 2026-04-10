import { motion } from "framer-motion";
import { ArrowLeft, Truck } from "lucide-react";
import LocationWidget from "./LocationWidget";
import FriterieMenu from "./FriterieMenu";
import KMonogram from "./KMonogram";
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
        <div className="container mx-auto flex items-center justify-between px-6 py-3">
          <button onClick={onBack} className="flex items-center gap-2 text-primary font-body text-sm font-medium btn-bounce">
            <ArrowLeft size={18} />
            Accueil
          </button>
          <div className="flex items-center gap-2">
            <KMonogram variant="red" size={28} />
            <span className="font-heading text-lg font-bold text-primary">THE K'ROUSEL</span>
          </div>
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
      <section className="relative pt-16">
        <div className="relative h-[55vh] overflow-hidden">
          <img src={heroStreet} alt="La Friterie" className="w-full h-full object-cover" width={1280} height={720} />
          <div className="absolute inset-0 bg-gradient-to-t from-street-red-dark/80 via-street-red/25 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center">
              <KMonogram variant="cream" size={64} className="mx-auto mb-4" />
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-street-beige mb-3">
                La Friterie
              </h1>
              <p className="font-heading text-lg italic text-street-cream mb-4">
                Made with love by Kassandra
              </p>
              <p className="font-body text-sm text-street-beige/80 max-w-lg mx-auto">
                Les vrais classiques du fritkot belge, sublimés avec passion.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menu (Friterie) */}
      <FriterieMenu />

      {/* Food Truck Location */}
      <section id="food-truck" className="py-20 px-6 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 mb-3">
              <Truck className="text-street-gold" size={20} />
              <p className="font-body text-sm uppercase tracking-[0.3em] text-street-gold">
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
        <KMonogram variant="cream" size={40} className="mx-auto mb-3" />
        <p className="font-heading text-2xl font-bold text-primary-foreground mb-1">THE K'ROUSEL</p>
        <p className="font-heading text-sm italic text-street-cream/80">Made with love by Kassandra</p>
        <p className="font-body text-xs text-primary-foreground/50 mt-1">Friterie & Food Truck — Liège, Belgique</p>
        <p className="font-body text-xs text-primary-foreground/30 mt-4">© {new Date().getFullYear()} THE K'ROUSEL</p>
      </footer>
    </motion.div>
  );
};

export default StreetFoodPage;
