import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

import fritesImg from "@/assets/frites-cornet.jpg";
import fricadelleImg from "@/assets/fricadelle.jpg";
import mexicanoImg from "@/assets/mexicano.jpg";
import bouletImg from "@/assets/boulet-liegeois.jpg";
import mitrailletteImg from "@/assets/mitraillette-new.jpg";
import bickyImg from "@/assets/bicky-burger-new.jpg";
import saucesImg from "@/assets/sauces.jpg";

const categories = [
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
}

const menuData: Record<string, { hero?: { image: string; title: string; subtitle: string }; items: MenuItem[] }> = {
  frites: {
    hero: { image: fritesImg, title: "La Frite Belge", subtitle: "Bintje 12mm, double cuisson au blanc de bœuf" },
    items: [
      { name: "Petite", desc: "Cornet ou barquette", price: "2,40€" },
      { name: "Moyenne", price: "2,80€" },
      { name: "Grande", price: "3,20€" },
      { name: "Supplément cornet", price: "+0,20€" },
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
      { name: "Hamburger", price: "3,80€" },
      { name: "Cheese Burger", price: "4,00€" },
      { name: "Bicky Burger", desc: "Galette panée, oignons crispy, cornichons & triple-sauce iconique", price: "4,80€" },
      { name: "Bicky Royal", desc: "Le Bicky en version XL & garni", price: "5,80€" },
      { name: "Burger MAISON", desc: "La création signature de Kassandra", price: "7,90€", signature: true },
      { name: "Burger Poulet", price: "6,50€" },
      { name: "Burger Mexicanos", desc: "Épicé, avec la viande mexicano", price: "6,50€" },
      { name: "Burger Veggie", price: "5,80€" },
      { name: "Burger Fish", price: "6,00€" },
    ],
  },
  mitraillettes: {
    hero: { image: mitrailletteImg, title: "Les Mitraillettes", subtitle: "Demi-baguette, viande, montagne de frites & sauce" },
    items: [
      { name: "Mitraillette", desc: "Pain + frites + sauce", price: "4,50€", signature: true },
      { name: "+ Viande au choix", desc: "Ajoutez le prix de la viande sélectionnée", price: "Variable" },
      { name: "+ Crudité", desc: "Salade, tomate, oignon", price: "+0,50€" },
    ],
  },
  boulets: {
    hero: { image: bouletImg, title: "Les Boulets", subtitle: "Spécialité liégeoise, sauce au sirop de Liège" },
    items: [
      { name: "Boulet Lapin ou Provençale", desc: "Sauce au choix", price: "3,20€" },
      { name: "Assiette 1 pièce", desc: "Boulet + frites + salade", price: "10,50€" },
      { name: "Assiette 2 pièces", desc: "Double boulet + frites + salade", price: "12,50€", signature: true },
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
    items: [
      { name: "Soft", desc: "Coca, Fanta, Sprite, Ice Tea...", price: "2,00€" },
      { name: "Bière", desc: "À déguster sur place", price: "2,50€" },
      { name: "Red Bull", price: "3,00€" },
    ],
  },
};

const FriterieMenu = () => {
  const [activeCategory, setActiveCategory] = useState("frites");
  const data = menuData[activeCategory];
  const hero = data?.hero;

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

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full font-body text-xs font-semibold uppercase tracking-wider transition-all duration-300 btn-bounce ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground cinematic-shadow"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="max-w-3xl mx-auto"
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
                <div className="absolute inset-0 bg-gradient-to-t from-street-red-dark/75 via-street-red/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="font-heading text-3xl md:text-4xl font-bold text-street-beige mb-1">
                    {hero.title}
                  </h3>
                  <p className="font-body text-sm text-street-cream/80">
                    {hero.subtitle}
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {data.items.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={`glass-card rounded-xl p-4 md:p-5 flex items-start justify-between gap-4 hover-lift ${
                    item.signature ? "ring-2 ring-primary/30" : ""
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-heading text-base md:text-lg font-semibold text-foreground">
                        {item.name}
                      </h4>
                      {item.signature && (
                        <Star size={14} className="text-street-gold fill-street-gold flex-shrink-0" />
                      )}
                    </div>
                    {item.desc && (
                      <p className="font-body text-xs md:text-sm text-muted-foreground mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    )}
                  </div>
                  <span className="font-heading text-base md:text-lg font-bold text-primary whitespace-nowrap">
                    {item.price}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FriterieMenu;
