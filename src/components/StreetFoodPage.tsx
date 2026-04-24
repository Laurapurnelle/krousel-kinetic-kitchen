import { motion } from "framer-motion";
import { MapPin, User } from "lucide-react";
import { Link } from "react-router-dom";
import LocationWidget from "./LocationWidget";
import FriterieMenu from "./FriterieMenu";
import KMonogram from "./KMonogram";
import CartDrawer from "./CartDrawer";
import heroStreet from "@/assets/hero-street.jpg";
import logoBordeaux from "@/assets/logo-krousel-bordeaux.svg";
import logoBeige from "@/assets/logo-krousel-beige.svg";
import logoJaune from "@/assets/logo-krousel-jaune.svg";
import { useAuth } from "@/context/AuthContext";

interface StreetFoodPageProps {
  onBack: () => void;
}

const StreetFoodPage = ({ onBack }: StreetFoodPageProps) => {
  const { user } = useAuth();
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
          <button onClick={onBack} className="flex items-center gap-2 btn-bounce" aria-label="Retour à l'accueil">
            <img src={logoBordeaux} alt="K'rousel" className="h-8 w-auto" />
          </button>
          <div className="flex items-center gap-3">
            <a href="#la-carte" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">
              La Carte
            </a>
            <Link
              to={user ? "/profil" : "/auth"}
              aria-label={user ? "Mon profil" : "Se connecter"}
              className="w-10 h-10 rounded-full bg-muted/60 hover:bg-muted flex items-center justify-center transition-colors"
            >
              <User size={18} className="text-primary" />
            </Link>
            <CartDrawer />
          </div>
        </div>
      </nav>

      {/* Hero with logo at the junction between photo and blur */}
      <section className="relative pt-16">
        <div className="relative h-[45vh] overflow-hidden">
          <img src={heroStreet} alt="La Friterie & Food Truck" className="w-full h-full object-cover" width={1280} height={720} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-street-red/25 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center">
              <h1 className="font-heading text-4xl md:text-5xl font-semibold tracking-tight text-white mb-2 drop-shadow-lg">
                Friterie et Food Truck
              </h1>
              <p className="font-body text-sm uppercase tracking-[0.25em] text-white/85 drop-shadow-md">
                Made with love by Kassandra
              </p>
            </motion.div>
          </div>
        </div>
        {/* Logo at the junction — pulled higher to overlap the hero photo */}
        <div className="flex justify-center -mt-16 md:-mt-20 relative z-10">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="bg-street-beige rounded-full w-28 h-28 md:w-32 md:h-32 flex items-center justify-center cinematic-shadow-lg p-5 ring-2 ring-primary/10"
          >
            <img src={logoBordeaux} alt="K'rousel" className="w-full h-full object-contain" />
          </motion.div>
        </div>
      </section>

      {/* Menu */}
      <FriterieMenu />

      {/* Food Truck Location — just above footer */}
      <section className="py-10 px-6 bg-gradient-to-b from-transparent to-primary/8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <MapPin className="text-primary" size={18} />
            <p className="font-body text-sm uppercase tracking-[0.2em] text-primary font-semibold">
              Où nous trouver aujourd'hui
            </p>
          </motion.div>
          <LocationWidget />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary py-12 px-6 text-center">
        <img src={logoJaune} alt="K'rousel" className="h-12 w-auto mx-auto mb-3" />
        <p className="font-heading text-2xl font-bold text-street-beige mb-1">THE K'ROUSEL</p>
        <p className="font-heading text-sm italic text-street-cream/80">Made with love by Kassandra</p>
        <p className="font-body text-xs text-primary-foreground/50 mt-1">Friterie & Food Truck — Liège, Belgique</p>
        <p className="font-body text-xs text-primary-foreground/30 mt-4">© {new Date().getFullYear()} THE K'ROUSEL</p>
      </footer>
    </motion.div>
  );
};

export default StreetFoodPage;
