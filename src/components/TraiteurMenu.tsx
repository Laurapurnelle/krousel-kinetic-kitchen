import { useState } from "react";
import { motion } from "framer-motion";
import { UtensilsCrossed } from "lucide-react";

import plateauImg from "@/assets/traiteur-plateau-aperitif.jpg";
import tartareImg from "@/assets/traiteur-tartare-saumon.jpg";
import sandwichesImg from "@/assets/traiteur-mini-sandwiches.jpg";
import platImg from "@/assets/traiteur-plat-principal.jpg";
import saladeImg from "@/assets/traiteur-salade-fraiche.jpg";
import mousseImg from "@/assets/traiteur-mousse-chocolat.jpg";
import verrinesImg from "@/assets/traiteur-verrines.jpg";
import buffetImg from "@/assets/traiteur-buffet-mariage.jpg";

interface MenuItem {
  name: string;
  description: string;
  image: string;
  price: string;
}

interface MenuCategory {
  id: string;
  title: string;
  subtitle: string;
  items: MenuItem[];
}

const menuCategories: MenuCategory[] = [
  {
    id: "aperitifs",
    title: "Apéritifs & Finger Food",
    subtitle: "Idéal pour vos réceptions et cocktails dînatoires",
    items: [
      { name: "Plateau Apéritif Garni", description: "Bruschetta pesto-prosciutto, canapés saumon-câpres, brochettes tomates-mozzarella, cornets de crudités, crackers, olives & fromages artisanaux", image: plateauImg, price: "18€/pers." },
      { name: "Collection de Verrines", description: "Cocktail de crevettes, gazpacho frais, mousse de foie gras, crème de betterave — servies sur ardoise", image: verrinesImg, price: "14€/pers." },
      { name: "Mini Sandwiches Artisanaux", description: "Assortiment sésame, pavot & campagne : poulet croustillant, saumon fumé, brie aux noix, dagobert jambon — étiquettes manuscrites", image: sandwichesImg, price: "12€/pers." },
    ],
  },
  {
    id: "entrees",
    title: "Entrées",
    subtitle: "Des saveurs raffinées pour ouvrir l'appétit",
    items: [
      { name: "Tartare de Saumon Frais", description: "Saumon coupé au couteau, brunoise de concombre, citron, pousses de betterave, microgreens & huile d'olive citronnée", image: tartareImg, price: "16€/pers." },
      { name: "Salade Fraîcheur Burrata", description: "Mesclun, burrata crémeuse, prosciutto, tomates cerises, croûtons dorés & balsamique de Modène", image: saladeImg, price: "13€/pers." },
    ],
  },
  {
    id: "plats",
    title: "Plats Principaux",
    subtitle: "Cuisine d'auteur, produits nobles",
    items: [
      { name: "Magret de Canard Laqué", description: "Magret au miel & balsamique, purée de patate douce, légumes rôtis, jus réduit & microgreens", image: platImg, price: "28€/pers." },
      { name: "Buffet de Mariage", description: "Formule complète sur mesure : petits fours, roses de saumon en tartelettes, mini quiches, champagne & desserts assortis", image: buffetImg, price: "Sur devis" },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    subtitle: "La touche sucrée de Kassandra",
    items: [
      { name: "Mousse au Chocolat Belge", description: "Mousse onctueuse au chocolat noir, copeaux & boucles de chocolat, perles craquantes, bonbons au chocolat blanc — servie en verrines individuelles", image: mousseImg, price: "8€/pers." },
    ],
  },
];

const TraiteurMenu = () => {
  const [activeCategory, setActiveCategory] = useState("aperitifs");

  const currentCategory = menuCategories.find((c) => c.id === activeCategory)!;

  return (
    <section id="notre-carte" className="py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-traiteur-olive mb-3">
            Nos Spécialités
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
            La Carte Traiteur
          </h2>
          <p className="font-body text-sm text-muted-foreground max-w-lg mx-auto">
            Tous nos menus sont personnalisables selon votre événement, le nombre de convives et vos envies. 
            Contactez-nous pour un devis sur mesure.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`font-body text-xs uppercase tracking-wider px-4 py-2 rounded-full transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-traiteur-forest text-traiteur-offwhite cinematic-shadow"
                  : "bg-traiteur-forest/5 text-muted-foreground hover:bg-traiteur-forest/10"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Category Content */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <p className="font-body text-xs text-traiteur-olive text-center mb-8 uppercase tracking-widest">
            {currentCategory.subtitle}
          </p>

          <div className="space-y-6">
            {currentCategory.items.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl overflow-hidden flex flex-col sm:flex-row hover-lift"
              >
                <div className="sm:w-48 md:w-56 flex-shrink-0 aspect-video sm:aspect-square">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width={400}
                    height={400}
                  />
                </div>
                <div className="p-5 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    <UtensilsCrossed size={14} className="text-traiteur-forest" />
                    <h3 className="font-heading text-lg font-semibold text-foreground">{item.name}</h3>
                  </div>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="font-body text-xs text-muted-foreground mb-4">
            Les prix varient selon le nombre de convives et la personnalisation souhaitée.
          </p>
          <a
            href="#food-truck-booking"
            className="inline-flex items-center gap-2 bg-traiteur-forest text-traiteur-offwhite px-8 py-4 rounded-xl font-body text-sm font-semibold uppercase tracking-widest cinematic-shadow btn-bounce"
          >
            Demander un Devis
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TraiteurMenu;
