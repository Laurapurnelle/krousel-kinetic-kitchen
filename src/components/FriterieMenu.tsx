import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Plus, Minus, ChevronDown, Flame } from "lucide-react";

import fritesImg from "@/assets/frites-cornet.jpg";
import fricadelleImg from "@/assets/fricadelle.jpg";
import mexicanoImg from "@/assets/mexicano.jpg";
import bouletImg from "@/assets/boulet-liegeois.jpg";
import mitrailletteImg from "@/assets/mitraillette-new.jpg";
import bickyImg from "@/assets/bicky-burger-new.jpg";
import saucesImg from "@/assets/sauces.jpg";
import boissonsImg from "@/assets/boissons.jpg";

const categories = [
  { id: "tout", label: "Tout" },
  { id: "frites", label: "Frites" },
  { id: "viandes", label: "Viandes" },
  { id: "burgers", label: "Burgers" },
  { id: "mitraillettes", label: "Mitraillettes" },
  { id: "boulets", label: "Boulets" },
  { id: "sauces", label: "Sauces" },
  { id: "boissons", label: "Boissons" },
];

interface MenuItem {
  name: string;
  desc?: string;
  price: string;
  signature?: boolean;
  bestSeller?: boolean;
  hasDropdown?: "viandes" | "sauces";
}

interface OrderItem {
  key: string;
  qty: number;
}

const sauceOptions = [
  { name: "Mayo", price: "1,20€" },
  { name: "Andalouse", price: "1,20€" },
  { name: "Samouraï", price: "1,20€" },
  { name: "Brasil", price: "1,20€" },
  { name: "Dallas", price: "1,20€" },
  { name: "Américaine", price: "1,20€" },
  { name: "Cocktail", price: "1,20€" },
  { name: "Bicky chaude", price: "1,50€" },
  { name: "Sauce brune", price: "1,50€" },
  { name: "Curry", price: "1,50€" },
  { name: "Tartare", price: "1,50€" },
  { name: "Mayo Truffe", price: "1,50€" },
];

const viandeOptions = [
  { name: "Fricadelle", price: "2,20€" },
  { name: "Viandelle", price: "2,40€" },
  { name: "Mexicano", price: "3,20€" },
  { name: "Poulycroc", price: "2,80€" },
  { name: "Hamburger", price: "2,50€" },
  { name: "Bicky Burger", price: "4,80€" },
  { name: "Crispy Chicken", price: "4,50€" },
  { name: "Lucifer", price: "3,50€" },
];

const menuData: Record<string, { hero?: { image: string; title: string; subtitle: string }; items: MenuItem[] }> = {
  frites: {
    hero: { image: fritesImg, title: "La Frite Belge", subtitle: "Bintje 12mm, double cuisson au blanc de bœuf" },
    items: [
      { name: "Petite", desc: "Cornet ou barquette", price: "2,40€" },
      { name: "Moyenne", price: "2,80€" },
      { name: "Grande", price: "3,20€" },
    ],
  },
  viandes: {
    hero: { image: fricadelleImg, title: "Les Viandes", subtitle: "Les classiques du fritkot belge" },
    items: [
      { name: "Fricadelle", desc: "Cylindre lisse, mélange porc-bœuf-poulet. L'icône.", price: "2,20€" },
      { name: "Fricadelle Spéciale", desc: "Avec frites & sauce", price: "2,80€" },
      { name: "Fricadelle XXL", price: "5,50€" },
      { name: "Viandelle", desc: "Fricadelle enrobée de pâte croquante & chapelure", price: "2,40€" },
      { name: "Mexicano", desc: "Rectangle strié, viande épicée bœuf-porc", price: "3,20€" },
      { name: "Poulycroc", desc: "Disque de poulet pané aux corn-flakes, ultra-crunchy", price: "2,80€" },
      { name: "Cervelas", desc: "Saucisse de porc fumée classique", price: "3,50€" },
      { name: "Lucifer", desc: "Saucisse piquante, pour les amateurs de feu", price: "3,50€" },
      { name: "Hamburger", desc: "Galette de bœuf haché, simple & efficace", price: "2,50€" },
      { name: "Nuggets", price: "3,50€" },
      { name: "Mini Loempia", price: "3,50€" },
      { name: "Chix Finger", desc: "Bâtonnets de poulet panés croustillants", price: "3,80€" },
      { name: "Crispy Chicken", desc: "Poulet pané croustillant, généreux", price: "4,50€" },
      { name: "Brochettes oignons/poivrons", price: "4,00€" },
      { name: "Brochettes de dinde", price: "4,00€" },
      { name: "Grizly", price: "4,50€" },
      { name: "Ragozzi", price: "3,50€" },
      { name: "8 Balls", price: "3,80€" },
      { name: "Croq. Spéciale", price: "3,80€" },
      { name: "Croq. Fromage", desc: "Ou en assiette 12,00€", price: "3,50€" },
      { name: "Croq. Volaille", desc: "Ou en assiette 12,00€", price: "3,50€" },
      { name: "Croq. Crevette", desc: "Ou en assiette 14,00€", price: "4,50€" },
    ],
  },
  burgers: {
    hero: { image: bickyImg, title: "Les Burgers", subtitle: "Du classique au Burger Maison signature" },
    items: [
      { name: "Burger MAISON", desc: "La création signature de Kassandra", price: "7,90€", signature: true },
      { name: "Bicky Burger", desc: "Galette panée, oignons crispy, cornichons & triple-sauce iconique", price: "4,80€" },
      { name: "Bicky Royal", desc: "Le Bicky en version XL & garni", price: "5,80€" },
      { name: "Hamburger", price: "3,80€" },
      { name: "Cheese Burger", price: "4,00€" },
      { name: "Burger Poulet", price: "6,50€" },
      { name: "Burger Mexicanos", desc: "Épicé, avec la viande mexicano", price: "6,50€" },
      { name: "Burger Veggie", price: "5,80€" },
      { name: "Burger Fish", price: "6,00€" },
    ],
  },
  mitraillettes: {
    hero: { image: mitrailletteImg, title: "Les Mitraillettes", subtitle: "Demi-baguette, viande, montagne de frites & sauce" },
    items: [
      { name: "Mitraillette", desc: "Pain + frites + sauce au choix + viande au choix", price: "4,50€", signature: true, hasDropdown: "viandes" },
      { name: "+ Crudité", desc: "Salade, tomate, oignon", price: "+0,50€" },
    ],
  },
  boulets: {
    hero: { image: bouletImg, title: "Les Boulets", subtitle: "Spécialité liégeoise, sauce au sirop de Liège" },
    items: [
      { name: "Boulet Lapin ou Provençale", desc: "Sauce au choix", price: "3,20€" },
      { name: "Assiette 1 pièce", desc: "Boulet + frites + salade", price: "10,50€" },
      { name: "Assiette 2 pièces", desc: "Double boulet + frites + salade", price: "12,50€", bestSeller: true },
    ],
  },
  sauces: {
    hero: { image: saucesImg, title: "Les Sauces", subtitle: "En Belgique, la sauce est une montagne sur les frites" },
    items: [
      { name: "Sauce Froide", desc: "Mayo, Andalouse, Samouraï, Brasil, Dallas, Américaine, Cocktail...", price: "1,20€" },
      { name: "Sauce Chaude", desc: "Bicky chaude, sauce brune, curry...", price: "1,50€" },
      { name: "Tartare / Mayo Truffe / Bicky", desc: "Nos sauces premium", price: "1,50€" },
    ],
  },
  boissons: {
    hero: { image: boissonsImg, title: "Les Boissons", subtitle: "Pour accompagner vos frites" },
    items: [
      { name: "Soft", desc: "Coca, Fanta, Sprite, Ice Tea...", price: "2,00€" },
      { name: "Bière", desc: "À déguster sur place", price: "2,50€" },
      { name: "Red Bull", price: "3,00€" },
    ],
  },
};

// Dropdown component for mitraillettes
const DropdownSelect = ({ label, options }: { label: string; options: { name: string; price: string }[] }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="relative mt-2">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 bg-muted/60 rounded-lg px-3 py-2 font-body text-xs text-foreground transition-colors hover:bg-muted"
      >
        <span>{selected || label}</span>
        <ChevronDown size={14} className={`text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute z-30 left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg max-h-48 overflow-y-auto"
          >
            {options.map((opt) => (
              <button
                key={opt.name}
                onClick={() => { setSelected(`${opt.name} — ${opt.price}`); setOpen(false); }}
                className="w-full flex items-center justify-between px-3 py-2 font-body text-xs hover:bg-muted/60 transition-colors"
              >
                <span className="text-foreground">{opt.name}</span>
                <span className="font-heading font-bold text-primary">{opt.price}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Quantity button component
const QtyControl = ({ qty, onAdd, onRemove }: { qty: number; onAdd: () => void; onRemove: () => void }) => (
  <div className="flex items-center gap-1">
    {qty > 0 && (
      <>
        <button onClick={onRemove} className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-destructive/20 hover:text-destructive transition-colors">
          <Minus size={14} />
        </button>
        <span className="font-heading text-sm font-bold text-foreground w-6 text-center">{qty}</span>
      </>
    )}
    <button onClick={onAdd} className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-primary hover:bg-primary/25 transition-colors">
      <Plus size={14} />
    </button>
  </div>
);

const FriterieMenu = () => {
  const [activeCategory, setActiveCategory] = useState("tout");
  const [orders, setOrders] = useState<Record<string, number>>({});

  const addItem = (key: string) => setOrders((prev) => ({ ...prev, [key]: (prev[key] || 0) + 1 }));
  const removeItem = (key: string) => setOrders((prev) => {
    const n = (prev[key] || 0) - 1;
    if (n <= 0) { const { [key]: _, ...rest } = prev; return rest; }
    return { ...prev, [key]: n };
  });

  const visibleCategories = activeCategory === "tout"
    ? Object.keys(menuData)
    : [activeCategory];

  return (
    <section id="la-carte" className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-street-gold mb-3">
            La Carte
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
            Notre Menu
          </h2>
        </motion.div>

        {/* Category Tabs — scrollable on mobile */}
        <div className="flex flex-nowrap overflow-x-auto gap-2 mb-12 pb-2 -mx-2 px-2 scrollbar-hide justify-start md:justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full font-body text-xs font-semibold uppercase tracking-wider transition-all duration-300 btn-bounce whitespace-nowrap flex-shrink-0 ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground cinematic-shadow"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="max-w-3xl mx-auto space-y-16">
          {visibleCategories.map((catId) => {
            const data = menuData[catId];
            const hero = data?.hero;

            return (
              <motion.div
                key={catId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                {hero && (
                  <div className="relative rounded-2xl overflow-hidden mb-10 h-56 md:h-72 cinematic-shadow-lg">
                    <img
                      src={hero.image}
                      alt={hero.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width={640}
                      height={640}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent backdrop-blur-[1px]" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <h3 className="font-heading text-3xl md:text-4xl font-bold text-white mb-1 drop-shadow-lg">
                        {hero.title}
                      </h3>
                      <p className="font-body text-sm text-white/90 drop-shadow-md">
                        {hero.subtitle}
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {data.items.map((item, i) => {
                    const itemKey = `${catId}-${item.name}`;
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className={`glass-card rounded-xl p-4 md:p-5 hover-lift ${
                          item.signature ? "ring-2 ring-primary/30" : ""
                        } ${item.bestSeller ? "ring-2 ring-street-gold/40" : ""}`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-heading text-base md:text-lg font-semibold text-foreground">
                                {item.name}
                              </h4>
                              {item.signature && (
                                <Star size={14} className="text-street-gold fill-street-gold flex-shrink-0" />
                              )}
                              {item.bestSeller && (
                                <span className="flex items-center gap-1 bg-street-gold/15 text-street-gold px-2 py-0.5 rounded-full font-body text-[10px] font-bold uppercase tracking-wider">
                                  <Flame size={10} /> Best-seller
                                </span>
                              )}
                            </div>
                            {item.desc && (
                              <p className="font-body text-xs md:text-sm text-muted-foreground mt-0.5 leading-relaxed">
                                {item.desc}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <span className="font-heading text-base md:text-lg font-bold text-primary whitespace-nowrap">
                              {item.price}
                            </span>
                            <QtyControl
                              qty={orders[itemKey] || 0}
                              onAdd={() => addItem(itemKey)}
                              onRemove={() => removeItem(itemKey)}
                            />
                          </div>
                        </div>

                        {/* Dropdowns for mitraillette */}
                        {item.hasDropdown === "viandes" && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                            <DropdownSelect label="Choisir une viande" options={viandeOptions} />
                            <DropdownSelect label="Choisir une sauce" options={sauceOptions} />
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FriterieMenu;
