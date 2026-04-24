import { useState } from "react";
import { motion } from "framer-motion";
import { ChefHat, UtensilsCrossed, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

import plateauImg from "@/assets/traiteur-plateau-aperitif.jpg";
import tartareImg from "@/assets/traiteur-tartare-saumon.jpg";
import sandwichesImg from "@/assets/traiteur-mini-sandwiches.jpg";
import platImg from "@/assets/traiteur-plat-principal.jpg";
import saladeImg from "@/assets/traiteur-salade-fraiche.jpg";
import mousseImg from "@/assets/traiteur-mousse-chocolat.jpg";
import verrinesImg from "@/assets/traiteur-verrines.jpg";
import buffetImg from "@/assets/traiteur-buffet-mariage.jpg";
import tatakiImg from "@/assets/traiteur-tataki-thon.jpg";
import foieGrasImg from "@/assets/traiteur-foie-gras.jpg";
import filetBarImg from "@/assets/traiteur-filet-bar.jpg";
import risottoImg from "@/assets/traiteur-risotto-truffe.jpg";
import domeImg from "@/assets/traiteur-dome-chocolat.jpg";
import pannaCottaImg from "@/assets/traiteur-panna-cotta.jpg";

interface MenuItem {
  name: string;
  description: string;
  image: string;
  price: string;
}

interface MenuFormula {
  id: string;
  name: string;
  tagline: string;
  price: string;
  items: string[];
}

interface MenuCategory {
  id: string;
  title: string;
  subtitle: string;
  items: MenuItem[];
}

const menuFormulas: MenuFormula[] = [
  {
    id: "terroir",
    name: "Le Terroir",
    tagline: "Authenticité & saveurs de notre région",
    price: "45€/pers.",
    items: ["Carpaccio de bœuf du pays", "Volaille fermière rôtie, jus au thym", "Tarte fine aux fruits de saison"],
  },
  {
    id: "audacieux",
    name: "L'Audacieux",
    tagline: "Fusion créative pour palais aventuriers",
    price: "55€/pers.",
    items: ["Tataki de thon aux agrumes", "Risotto truffe & parmesan 36 mois", "Dôme chocolat & passion"],
  },
  {
    id: "gastronomique",
    name: "Le Gastronomique",
    tagline: "L'excellence à chaque bouchée",
    price: "65€/pers.",
    items: ["Foie gras mi-cuit maison", "Filet de bar, beurre blanc aux herbes", "Soufflé Grand Marnier"],
  },
  {
    id: "vegetal",
    name: "Le Végétal",
    tagline: "100% végétarien, 100% gourmand",
    price: "42€/pers.",
    items: ["Velouté de butternut, noisettes torréfiées", "Risotto aux champignons & truffe", "Panna cotta coco & mangue"],
  },
];

const menuCategories: MenuCategory[] = [
  {
    id: "aperitifs",
    title: "Apéritifs & Finger Food",
    subtitle: "Idéal pour vos réceptions et cocktails dînatoires",
    items: [
      { name: "Plateau Apéritif Garni", description: "Bruschetta pesto-prosciutto, canapés saumon-câpres, brochettes tomates-mozzarella, cornets de crudités, crackers, olives & fromages artisanaux", image: plateauImg, price: "18€/pers." },
      { name: "Collection de Verrines", description: "Cocktail de crevettes, gazpacho frais, mousse de foie gras, crème de betterave — servies sur ardoise", image: verrinesImg, price: "14€/pers." },
      { name: "Mini Sandwiches Artisanaux", description: "Assortiment sésame, pavot & campagne : poulet croustillant, saumon fumé, brie aux noix, dagobert jambon", image: sandwichesImg, price: "12€/pers." },
    ],
  },
  {
    id: "entrees",
    title: "Entrées",
    subtitle: "Des saveurs raffinées pour ouvrir l'appétit",
    items: [
      { name: "Tartare de Saumon Frais", description: "Saumon coupé au couteau, brunoise de concombre, citron, pousses de betterave, microgreens & huile d'olive citronnée", image: tartareImg, price: "16€/pers." },
      { name: "Salade Fraîcheur Burrata", description: "Mesclun, burrata crémeuse, prosciutto, tomates cerises, croûtons dorés & balsamique de Modène", image: saladeImg, price: "13€/pers." },
      { name: "Tataki de Thon aux Agrumes", description: "Thon rouge snacké, émulsion d'agrumes, sésame noir, pickles de gingembre & wakamé", image: tatakiImg, price: "18€/pers." },
      { name: "Foie Gras Mi-Cuit Maison", description: "Foie gras de canard mi-cuit, chutney de figues, fleur de sel & brioche toastée", image: foieGrasImg, price: "22€/pers." },
    ],
  },
  {
    id: "plats",
    title: "Plats Principaux",
    subtitle: "Cuisine d'auteur, produits nobles",
    items: [
      { name: "Magret de Canard Laqué", description: "Magret au miel & balsamique, purée de patate douce, légumes rôtis, jus réduit & microgreens", image: platImg, price: "28€/pers." },
      { name: "Filet de Bar, Beurre Blanc", description: "Bar de ligne cuit sur peau, beurre blanc aux herbes, risotto crémeux & légumes croquants", image: filetBarImg, price: "26€/pers." },
      { name: "Risotto Truffe & Parmesan 36 Mois", description: "Risotto carnaroli crémeux, copeaux de parmesan reggiano, huile de truffe noire & roquette", image: risottoImg, price: "24€/pers." },
      { name: "Buffet de Mariage", description: "Formule complète sur mesure : petits fours, roses de saumon en tartelettes, mini quiches, champagne & desserts assortis", image: buffetImg, price: "Sur devis" },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    subtitle: "La touche sucrée de Kassandra",
    items: [
      { name: "Mousse au Chocolat Belge", description: "Mousse onctueuse au chocolat noir, copeaux & boucles de chocolat, perles craquantes, bonbons au chocolat blanc", image: mousseImg, price: "8€/pers." },
      { name: "Dôme Chocolat & Passion", description: "Coque en chocolat noir, cœur coulant fruit de la passion, crumble coco & coulis mangue", image: domeImg, price: "12€/pers." },
      { name: "Panna Cotta Coco & Mangue", description: "Panna cotta au lait de coco, coulis de mangue fraîche, éclats de pistache & tuile dentelle", image: pannaCottaImg, price: "9€/pers." },
    ],
  },
];

const TraiteurMenu = () => {
  const [activeTab, setActiveTab] = useState<"formules" | "carte">("formules");
  const [activeCategory, setActiveCategory] = useState("aperitifs");
  const navigate = useNavigate();

  const currentCategory = menuCategories.find((c) => c.id === activeCategory)!;

  return (
    <section id="notre-carte" className="py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left mb-10"
        >
          <div className="flex items-center gap-2 mb-3">
            <ChefHat size={18} className="text-traiteur-forest" />
            <p className="font-body text-sm uppercase tracking-[0.3em] text-traiteur-olive">
              Nos Spécialités
            </p>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
            La Carte Traiteur
          </h2>
          <p className="font-body text-sm text-muted-foreground max-w-lg">
            Tous nos menus sont personnalisables selon votre événement, le nombre de convives et vos envies.
          </p>
        </motion.div>

        {/* Top-level tabs: Formules vs À la carte */}
        <div className="flex gap-2 mb-8">
          {[
            { id: "formules" as const, label: "Les Menus" },
            { id: "carte" as const, label: "À la Carte" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`font-body text-sm font-semibold uppercase tracking-wider px-6 py-3 rounded-xl transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-traiteur-forest text-traiteur-offwhite cinematic-shadow"
                  : "bg-traiteur-forest/5 text-muted-foreground hover:bg-traiteur-forest/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "formules" ? (
          /* Named Formulas */
          <motion.div
            key="formules"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {menuFormulas.map((formula, i) => (
              <motion.div
                key={formula.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 hover-lift flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles size={16} className="text-traiteur-forest" />
                      <h3 className="font-heading text-xl font-bold text-foreground">{formula.name}</h3>
                    </div>
                    <p className="font-body text-xs text-muted-foreground italic">{formula.tagline}</p>
                  </div>
                  <span className="font-heading text-lg font-bold text-traiteur-forest whitespace-nowrap">{formula.price}</span>
                </div>
                <div className="space-y-2 flex-1 mb-4">
                  {formula.items.map((item, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-traiteur-forest/40 flex-shrink-0" />
                      <p className="font-body text-sm text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => navigate(`/devis?motif=traiteur-prive`)}
                  className="font-body text-xs text-traiteur-forest font-semibold uppercase tracking-wider hover:underline underline-offset-4 transition-colors self-start"
                >
                  Demander un devis →
                </button>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* À la carte */
          <motion.div
            key="carte"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
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

            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <p className="font-body text-xs text-traiteur-olive mb-6 uppercase tracking-widest">
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
                    <div className="p-5 flex flex-col justify-center flex-1">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <UtensilsCrossed size={14} className="text-traiteur-forest" />
                          <h3 className="font-heading text-lg font-semibold text-foreground">{item.name}</h3>
                        </div>
                        <span className="font-heading text-lg font-bold text-traiteur-forest whitespace-nowrap">{item.price}</span>
                      </div>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left mt-12"
        >
          <p className="font-body text-xs text-muted-foreground mb-4">
            Les prix varient selon le nombre de convives et la personnalisation souhaitée.
          </p>
          <button
            onClick={() => navigate("/devis?motif=traiteur-mariage")}
            className="inline-flex items-center gap-2 bg-traiteur-forest text-traiteur-offwhite px-8 py-4 rounded-xl font-body text-sm font-semibold uppercase tracking-widest cinematic-shadow btn-bounce"
          >
            Demander un Devis
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default TraiteurMenu;
