import { useState } from "react";
import { motion } from "framer-motion";

import weddingImg from "@/assets/gallery-wedding.jpg";
import corporateImg from "@/assets/gallery-corporate.jpg";
import privateImg from "@/assets/gallery-private.jpg";
import dessertImg from "@/assets/gallery-dessert.jpg";
import foodtruckImg from "@/assets/gallery-foodtruck-event.jpg";
import charcuterieImg from "@/assets/gallery-charcuterie.jpg";

const galleryItems = [
  { src: weddingImg, alt: "Mariage avec food truck", label: "Mariage" },
  { src: corporateImg, alt: "Événement corporate", label: "Corporate" },
  { src: privateImg, alt: "Soirée privée", label: "Privé" },
  { src: foodtruckImg, alt: "Food truck en festival", label: "Food Truck" },
  { src: dessertImg, alt: "Dessert gastronomique", label: "Dessert" },
  { src: charcuterieImg, alt: "Planche charcuterie", label: "Charcuterie" },
];

const TraiteurGallery = () => {
  const [selected, setSelected] = useState<number | null>(null);

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
            Nos Réalisations
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ils Nous Ont Fait Confiance
          </h2>
          <p className="font-body text-sm text-muted-foreground max-w-md mx-auto">
            Mariages, événements corporate, soirées privées & festivals — découvrez nos prestations passées.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryItems.map((item, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setSelected(selected === i ? null : i)}
              className={`relative rounded-xl overflow-hidden aspect-square group cursor-pointer cinematic-shadow hover-lift ${
                selected === i ? "col-span-2 row-span-2 md:col-span-1 md:row-span-1" : ""
              }`}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                width={640}
                height={640}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-traiteur-forest/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="font-body text-xs font-semibold uppercase tracking-wider text-traiteur-offwhite">
                  {item.label}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TraiteurGallery;
