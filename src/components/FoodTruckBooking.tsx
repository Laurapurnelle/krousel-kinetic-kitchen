import { motion } from "framer-motion";
import { Truck, Calendar, Users, Music, Star } from "lucide-react";
import foodtruckImg from "@/assets/gallery-foodtruck-event.jpg";

const FoodTruckBooking = () => {
  return (
    <section id="food-truck-booking" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden aspect-[4/3] cinematic-shadow-lg"
          >
            <img
              src={foodtruckImg}
              alt="Réserver le food truck pour votre événement"
              className="w-full h-full object-cover"
              loading="lazy"
              width={640}
              height={640}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-traiteur-forest/50 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="glass-card-strong rounded-xl p-4 flex items-center gap-3">
                <Truck className="text-primary flex-shrink-0" size={24} />
                <div>
                  <p className="font-heading text-sm font-semibold text-foreground">Food Truck Privatisé</p>
                  <p className="font-body text-xs text-muted-foreground">Mariages, festivals, événements d'entreprise</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-body text-sm uppercase tracking-[0.3em] text-traiteur-olive mb-3">
              Privatisation
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Le Food Truck à Votre Événement
            </h2>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8">
              Envie d'une touche originale pour votre mariage, festival ou soirée d'entreprise ? 
              Privatisez notre food truck et offrez à vos invités une expérience street food authentique et conviviale.
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {[
                { icon: Users, text: "De 30 à 300 convives" },
                { icon: Calendar, text: "Disponible toute l'année, partout en Belgique" },
                { icon: Music, text: "Ambiance festive & service sur place" },
                { icon: Star, text: "Menu personnalisable selon vos envies" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-traiteur-forest/10 flex items-center justify-center flex-shrink-0">
                    <item.icon size={16} className="text-traiteur-forest" />
                  </div>
                  <p className="font-body text-sm text-foreground">{item.text}</p>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-traiteur-forest text-traiteur-offwhite px-8 py-4 rounded-xl font-body text-sm font-semibold uppercase tracking-widest cinematic-shadow btn-bounce"
            >
              <Truck size={18} />
              Réserver le Food Truck
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FoodTruckBooking;
