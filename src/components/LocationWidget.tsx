import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Truck, Store } from "lucide-react";

const LocationWidget = () => {
  const [isLive, setIsLive] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-2xl p-6 md:p-8 max-w-lg mx-auto cinematic-shadow"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading text-xl font-semibold text-foreground">
          Nous Trouver
        </h3>
        <div className="flex items-center gap-3 bg-muted rounded-full p-1">
          <button
            onClick={() => setIsLive(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-body font-semibold uppercase tracking-wider transition-all duration-300 btn-bounce ${
              isLive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Truck size={14} />
            Live
          </button>
          <button
            onClick={() => setIsLive(false)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-body font-semibold uppercase tracking-wider transition-all duration-300 btn-bounce ${
              !isLive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Store size={14} />
            Fixe
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isLive ? (
          <motion.div
            key="live"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full mt-1.5 animate-pulse" />
              <div>
                <p className="font-body text-sm font-semibold text-foreground">
                  En service maintenant
                </p>
                <p className="font-body text-sm text-muted-foreground">
                  Place du Marché, 4000 Liège
                </p>
              </div>
            </div>
            <div className="bg-muted/50 rounded-xl h-40 flex items-center justify-center">
              <MapPin className="text-primary" size={32} />
              <span className="ml-2 font-body text-sm text-muted-foreground">Carte en direct</span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="fixed"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-start gap-3">
              <Store className="text-secondary mt-0.5" size={18} />
              <div>
                <p className="font-body text-sm font-semibold text-foreground">
                  Friterie Fixe
                </p>
                <p className="font-body text-sm text-muted-foreground">
                  Rue de la Casquette 12, 4000 Liège
                </p>
                <p className="font-body text-xs text-muted-foreground mt-1">
                  Mar–Sam : 11h30 – 21h00 • Dim : 12h – 18h
                </p>
              </div>
            </div>
            <div className="bg-muted/50 rounded-xl h-40 flex items-center justify-center">
              <MapPin className="text-secondary" size={32} />
              <span className="ml-2 font-body text-sm text-muted-foreground">Adresse fixe</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LocationWidget;
