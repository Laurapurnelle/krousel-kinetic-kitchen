import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import miniSandwichesImg from "@/assets/traiteur-mini-sandwiches.jpg";
import tartareSaumonImg from "@/assets/traiteur-tartare-saumon.jpg";
import mousseChocolatImg from "@/assets/traiteur-mousse-chocolat.jpg";
import plateauAperitifImg from "@/assets/traiteur-plateau-aperitif.jpg";
import saladeFraicheImg from "@/assets/traiteur-salade-fraiche.jpg";
import buffetMariageImg from "@/assets/traiteur-buffet-mariage.jpg";
import platPrincipalImg from "@/assets/traiteur-plat-principal.jpg";
import verrinesImg from "@/assets/traiteur-verrines.jpg";

const galleryItems = [
  { src: buffetMariageImg, alt: "Buffet mariage élégant", label: "Buffet Mariage", category: "Événement" },
  { src: plateauAperitifImg, alt: "Plateau apéritif garni", label: "Plateau Apéritif", category: "Apéritif" },
  { src: tartareSaumonImg, alt: "Tartare de saumon frais", label: "Tartare Saumon", category: "Entrée" },
  { src: miniSandwichesImg, alt: "Mini sandwiches artisanaux", label: "Mini Sandwiches", category: "Finger Food" },
  { src: platPrincipalImg, alt: "Plat gastronomique", label: "Plat Principal", category: "Plat" },
  { src: mousseChocolatImg, alt: "Mousse au chocolat belge", label: "Mousse Chocolat", category: "Dessert" },
  { src: saladeFraicheImg, alt: "Salade fraîche burrata", label: "Salade Fraîche", category: "Salade" },
  { src: verrinesImg, alt: "Verrines apéritives", label: "Verrines", category: "Apéritif" },
];

const TraiteurGallery = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section id="realisations" className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-traiteur-olive mb-3">
            Nos Créations
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            L'Art Culinaire par Kassandra
          </h2>
          <p className="font-body text-sm text-muted-foreground max-w-md mx-auto">
            Chaque plat est une création unique, préparée avec passion et des produits d'exception.
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
