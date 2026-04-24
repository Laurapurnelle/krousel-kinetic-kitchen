import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X } from "lucide-react";

import mariageOutdoorImg from "@/assets/event-mariage-outdoor.jpg";
import corporateCocktailImg from "@/assets/event-corporate-cocktail.jpg";
import foodtruckGardenImg from "@/assets/event-foodtruck-garden.jpg";
import anniversaireImg from "@/assets/event-anniversaire.jpg";
import grazingTableImg from "@/assets/event-grazing-table.jpg";
import chefActionImg from "@/assets/event-chef-action.jpg";
import festivalNightImg from "@/assets/event-festival-night.jpg";
import brunchTerrasseImg from "@/assets/event-brunch-terrasse.jpg";

const galleryItems = [
  { src: mariageOutdoorImg, alt: "Réception de mariage en plein air", label: "Mariage en Plein Air", category: "Mariage" },
  { src: corporateCocktailImg, alt: "Cocktail dînatoire corporate", label: "Cocktail Corporate", category: "Entreprise" },
  { src: grazingTableImg, alt: "Table de partage garnie", label: "Grazing Table", category: "Réception" },
  { src: foodtruckGardenImg, alt: "Food truck dans un jardin privatisé", label: "Food Truck Privatisé", category: "Privatisation" },
  { src: chefActionImg, alt: "Chef en action lors d'un événement", label: "Chef en Action", category: "Service" },
  { src: anniversaireImg, alt: "Dîner d'anniversaire intime", label: "Dîner Intimiste", category: "Privé" },
  { src: festivalNightImg, alt: "Stand food truck en festival nocturne", label: "Festival & Marché", category: "Festival" },
  { src: brunchTerrasseImg, alt: "Brunch sur terrasse ensoleillée", label: "Brunch Terrasse", category: "Brunch" },
];

const TraiteurGallery = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section id="realisations" className="py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left mb-12"
        >
          <div className="flex items-center gap-2 mb-3">
            <Camera size={18} className="text-traiteur-forest" />
            <p className="font-body text-sm uppercase tracking-[0.3em] text-traiteur-olive">
              Nos Événements
            </p>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ils Nous Ont Fait Confiance
          </h2>
          <p className="font-body text-sm text-muted-foreground max-w-md">
            Mariages, soirées corporate, fêtes privées & festivals — découvrez l'ambiance de nos prestations.
          </p>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {galleryItems.map((item, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              onClick={() => setLightbox(i)}
              className={`relative rounded-xl overflow-hidden group cursor-pointer cinematic-shadow hover-lift ${
                i === 0 || i === 5 ? "md:col-span-2 md:row-span-2 aspect-square" : "aspect-square"
              }`}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                width={1024}
                height={1024}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-traiteur-forest/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="font-body text-[10px] uppercase tracking-wider text-traiteur-olive/80 block">
                  {item.category}
                </span>
                <span className="font-heading text-sm font-semibold text-traiteur-offwhite">
                  {item.label}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
            >
              <X size={28} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={galleryItems[lightbox].src}
              alt={galleryItems[lightbox].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-8 text-center">
              <p className="font-heading text-lg font-semibold text-white">{galleryItems[lightbox].label}</p>
              <p className="font-body text-xs text-white/60 uppercase tracking-wider">{galleryItems[lightbox].category}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TraiteurGallery;
