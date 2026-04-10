import { motion } from "framer-motion";
import { Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const foodTruckItems = [
  {
    category: "Frites",
    items: [
      { name: "Petite", price: "2,40€" },
      { name: "Moyenne", price: "2,80€" },
      { name: "Grande", price: "3,20€" },
    ],
  },
  {
    category: "Burgers",
    items: [
      { name: "Burger Maison", desc: "La signature de Kassandra", price: "7,90€" },
      { name: "Cheese Burger", price: "4,00€" },
      { name: "Bicky Burger", desc: "L'iconique belge", price: "4,80€" },
    ],
  },
  {
    category: "Snacks",
    items: [
      { name: "Fricadelle", price: "2,20€" },
      { name: "Nuggets (x6)", price: "3,50€" },
      { name: "Poulycroc", price: "2,80€" },
      { name: "Croq. Fromage", price: "3,50€" },
    ],
  },
  {
    category: "Boissons",
    items: [
      { name: "Soft", price: "2,00€" },
      { name: "Bière", price: "2,50€" },
    ],
  },
];

const FoodTruckMenu = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left mb-10"
        >
          <div className="flex items-center gap-2 mb-3">
            <Truck size={18} className="text-traiteur-forest" />
            <p className="font-body text-sm uppercase tracking-[0.3em] text-traiteur-olive">
              Carte Food Truck
            </p>
          </div>
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">
            Menu Food Truck Événement
          </h3>
          <p className="font-body text-sm text-muted-foreground max-w-lg">
            Notre carte street food simplifiée pour vos événements privés. Frites, burgers & snacks — l'essentiel du fritkot belge.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {foodTruckItems.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card rounded-2xl p-5"
            >
              <h4 className="font-heading text-base font-bold text-traiteur-forest mb-3 uppercase tracking-wider">
                {group.category}
              </h4>
              <div className="space-y-2">
                {group.items.map((item) => (
                  <div key={item.name} className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm text-foreground">{item.name}</p>
                      {"desc" in item && item.desc && (
                        <p className="font-body text-xs text-muted-foreground">{item.desc}</p>
                      )}
                    </div>
                    <span className="font-heading text-sm font-bold text-traiteur-forest whitespace-nowrap">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <button
          onClick={() => navigate("/devis?motif=foodtruck-prive")}
          className="inline-flex items-center gap-2 bg-traiteur-forest text-traiteur-offwhite px-6 py-3 rounded-xl font-body text-sm font-semibold uppercase tracking-widest cinematic-shadow btn-bounce"
        >
          <Truck size={16} />
          Privatiser le Food Truck
        </button>
      </div>
    </section>
  );
};

export default FoodTruckMenu;
