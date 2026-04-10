import { motion } from "framer-motion";
import { Star } from "lucide-react";
import bickyImg from "@/assets/bicky-burger.jpg";
import friteImg from "@/assets/frite-liegeoise.jpg";
import mitrailletteImg from "@/assets/mitraillette.jpg";

const menuItems = [
  {
    name: "Bicky Burger",
    description: "Pain artisan brioché, galette panée croustillante, oignons crispy, cornichons & la légendaire triple-sauce (jaune · rouge · brune).",
    image: bickyImg,
    price: "7,50€",
    signature: false,
  },
  {
    name: "La Frite Liégeoise",
    description: "Bintje 12mm taillée à la main, double cuisson au blanc de bœuf, servie dans un cornet bordeaux premium.",
    image: friteImg,
    price: "4,50€",
    signature: false,
  },
  {
    name: "La Mitraillette",
    badge: "Signature",
    description: "Demi-baguette garnie de viande, une montagne de frites dorées & sauce signature. L'arme de satisfaction massive.",
    image: mitrailletteImg,
    price: "12,00€",
    signature: true,
  },
];

const snackItems = [
  { name: "Mexicano", description: "Rectangle de viande épicée, pané et strié. Le classique du fritkot.", price: "3,50€" },
  { name: "Fricadelle", description: "Cylindre de viande savoureux, lisse & fondant. L'indémodable belge.", price: "3,00€" },
  { name: "Sito Gold", description: "Brochette panée croustillante au poulet & rondelles d'oignon. Dorée à souhait.", price: "4,00€" },
];

const MenuSection = () => {
  return (
    <section id="menu" className="section-street py-24 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-secondary mb-3">
            La Carte
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
            Nos Créations
          </h2>
        </motion.div>

        {/* Featured Items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {menuItems.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card rounded-2xl overflow-hidden hover-lift group"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  width={640}
                  height={640}
                />
                {item.signature && (
                  <div className="absolute top-4 right-4 bg-primary px-3 py-1 rounded-full flex items-center gap-1">
                    <Star size={12} className="text-street-yellow" />
                    <span className="text-primary-foreground font-body text-xs font-semibold uppercase tracking-wider">
                      {item.badge}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-heading text-xl font-semibold text-foreground">{item.name}</h3>
                  <span className="font-heading text-lg font-bold text-primary">{item.price}</span>
                </div>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Snacks Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h3 className="font-heading text-2xl font-semibold text-foreground text-center mb-8">
            Les Classiques du Fritkot
          </h3>
          <div className="space-y-4">
            {snackItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-xl p-5 flex items-start justify-between hover-lift"
              >
                <div className="flex-1 mr-4">
                  <h4 className="font-heading text-lg font-semibold text-foreground">{item.name}</h4>
                  <p className="font-body text-sm text-muted-foreground mt-1">{item.description}</p>
                </div>
                <span className="font-heading text-lg font-bold text-primary whitespace-nowrap">{item.price}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MenuSection;
