import { motion } from "framer-motion";
import { MessageCircle, Star, Quote } from "lucide-react";

import mariageImg from "@/assets/event-mariage-outdoor.jpg";
import corporateImg from "@/assets/event-corporate-cocktail.jpg";
import anniversaireImg from "@/assets/event-anniversaire.jpg";
import brunchImg from "@/assets/event-brunch-terrasse.jpg";

const reviews = [
  {
    name: "Sophie & Maxime",
    event: "Mariage — Juin 2024",
    image: mariageImg,
    text: "Kassandra a sublimé notre mariage. Chaque plat était une œuvre d'art et nos invités en parlent encore. Le food truck en soirée, c'était la cerise sur le gâteau !",
    rating: 5,
  },
  {
    name: "Laurent D.",
    event: "Cocktail Corporate — Mars 2024",
    image: corporateImg,
    text: "Service impeccable, verrines raffinées et une organisation sans faille. Nos collaborateurs ont adoré. On recommande les yeux fermés.",
    rating: 5,
  },
  {
    name: "Amandine B.",
    event: "Anniversaire 40 ans — Septembre 2024",
    image: anniversaireImg,
    text: "Une soirée magique grâce au food truck privatisé dans notre jardin. Les burgers maison étaient incroyables et l'ambiance au top !",
    rating: 5,
  },
  {
    name: "Claire & Thomas",
    event: "Brunch dominical — Novembre 2024",
    image: brunchImg,
    text: "Le brunch sur notre terrasse était un rêve. Tout était frais, beau et délicieux. Kassandra a un talent fou pour les présentations.",
    rating: 5,
  },
];

const ClientReviews = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left mb-12"
        >
          <div className="flex items-center gap-2 mb-3">
            <MessageCircle size={18} className="text-traiteur-forest" />
            <p className="font-body text-sm uppercase tracking-[0.3em] text-traiteur-olive">
              Témoignages
            </p>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
            Ce Que Nos Clients Disent
          </h2>
          <p className="font-body text-sm text-muted-foreground max-w-lg">
            Découvrez les retours de ceux qui nous ont fait confiance pour leurs événements.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden hover-lift"
            >
              {/* Event photo — uniform height */}
              <div className="h-48 overflow-hidden">
                <img
                  src={review.image}
                  alt={review.event}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={600}
                  height={300}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} size={14} className="text-street-gold fill-street-gold" />
                  ))}
                </div>
                <div className="flex gap-3 mb-3">
                  <Quote size={20} className="text-traiteur-forest/30 flex-shrink-0 mt-0.5" />
                  <p className="font-body text-sm text-foreground leading-relaxed italic">
                    {review.text}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border/50">
                  <p className="font-heading text-sm font-semibold text-foreground">{review.name}</p>
                  <p className="font-body text-xs text-muted-foreground">{review.event}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientReviews;
