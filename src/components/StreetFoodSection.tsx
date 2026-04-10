import { useState } from "react";
import { motion } from "framer-motion";
import LocationWidget from "./LocationWidget";
import BurgerCarousel from "./BurgerCarousel";

const StreetFoodSection = () => {
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);

  return (
    <section id="street-food" className="section-street py-24 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-secondary mb-3">
            La Friterie Itinérante
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            Street Food d'Artisan
          </h2>
          <p className="font-body text-base text-muted-foreground max-w-xl mx-auto">
            Par Kassandra Lorquet — des classiques belges sublimés avec passion, 
            servis depuis notre food truck à travers Liège.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <LocationWidget />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">
              Composez Votre Burger
            </h3>
            <p className="font-body text-sm text-muted-foreground mb-6 leading-relaxed">
              Choisissez votre base, votre sauce et vos suppléments. 
              Notre carrousel interactif vous guide pas à pas vers le burger parfait.
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
      </div>

      <BurgerCarousel isOpen={isCarouselOpen} onClose={() => setIsCarouselOpen(false)} />
    </section>
  );
};

export default StreetFoodSection;
