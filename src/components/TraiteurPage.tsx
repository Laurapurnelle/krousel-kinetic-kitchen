import { motion } from "framer-motion";
import { ArrowLeft, Instagram, Mail, Phone } from "lucide-react";
import TraiteurQuiz from "./TraiteurQuiz";
import heroTraiteur from "@/assets/hero-traiteur.jpg";

interface TraiteurPageProps {
  onBack: () => void;
}

const TraiteurPage = ({ onBack }: TraiteurPageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 60 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* Navbar Traiteur */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card-strong border-b-2 border-traiteur-forest/20">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <button onClick={onBack} className="flex items-center gap-2 text-traiteur-forest font-body text-sm font-medium btn-bounce">
            <ArrowLeft size={18} />
            Accueil
          </button>
          <span className="font-heading text-xl font-bold text-traiteur-forest">THE K'ROUSEL</span>
          <div className="flex items-center gap-6">
            {["Le Concept", "Votre Menu", "Contact"].map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`} className="hidden md:block font-body text-sm text-muted-foreground hover:text-traiteur-forest transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-20">
        <div className="relative h-[60vh] overflow-hidden">
          <img src={heroTraiteur} alt="Traiteur sur mesure" className="w-full h-full object-cover" width={1280} height={720} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-traiteur-forest/20 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center">
              <p className="font-body text-sm uppercase tracking-[0.3em] text-traiteur-olive mb-3">Traiteur Sur Mesure</p>
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-traiteur-offwhite mb-4">L'Art de Recevoir</h1>
              <p className="font-body text-base text-traiteur-offwhite/80 max-w-lg mx-auto">
                Kassandra Lorquet compose pour vous des expériences culinaires uniques, pensées pour sublimer chaque moment.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Concept */}
      <section id="le-concept" className="py-20 px-6">
        <div className="container mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">Notre Philosophie</h2>
            <p className="font-body text-base text-muted-foreground leading-relaxed">
              Chaque événement est unique. C'est pourquoi nous concevons des menus sur mesure, 
              en alliant des produits locaux d'exception à une créativité sans limite. 
              Du mariage intime au gala corporate, nous transformons votre vision en une expérience gustative inoubliable.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Sur Mesure", desc: "Chaque menu est créé spécifiquement pour votre événement, vos goûts et vos invités." },
              { title: "Produits Nobles", desc: "Circuits courts, producteurs locaux, ingrédients de saison sélectionnés avec soin." },
              { title: "Service Complet", desc: "De la conception du menu au service en salle, nous gérons chaque détail." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass-card rounded-2xl p-6 text-center hover-lift"
              >
                <h3 className="font-heading text-lg font-semibold text-traiteur-forest mb-2">{item.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz */}
      <TraiteurQuiz />

      {/* Contact */}
      <section id="contact" className="py-20 px-6">
        <div className="container mx-auto max-w-lg text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Parlons de Votre Projet</h2>
            <p className="font-body text-sm text-muted-foreground mb-8">
              Contactez-nous pour discuter de votre événement et recevoir une proposition personnalisée.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:contact@therousel.be" className="flex items-center justify-center gap-2 bg-traiteur-forest text-traiteur-offwhite px-6 py-3 rounded-xl font-body text-sm font-semibold btn-bounce">
                <Mail size={16} /> Nous Écrire
              </a>
              <a href="tel:+32000000000" className="flex items-center justify-center gap-2 border-2 border-traiteur-forest text-traiteur-forest px-6 py-3 rounded-xl font-body text-sm font-semibold btn-bounce hover:bg-traiteur-forest/5 transition-colors">
                <Phone size={16} /> Appeler
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Traiteur */}
      <footer className="bg-traiteur-forest py-12 px-6 text-center">
        <p className="font-heading text-2xl font-bold text-traiteur-offwhite mb-2">THE K'ROUSEL</p>
        <p className="font-body text-sm text-traiteur-offwhite/60">Traiteur Sur Mesure — Liège, Belgique</p>
        <div className="flex items-center justify-center gap-4 mt-6">
          {[Instagram, Mail, Phone].map((Icon, i) => (
            <a key={i} href="#" className="w-9 h-9 rounded-full bg-traiteur-offwhite/10 flex items-center justify-center text-traiteur-offwhite/60 hover:text-traiteur-offwhite transition-colors">
              <Icon size={16} />
            </a>
          ))}
        </div>
        <p className="font-body text-xs text-traiteur-offwhite/30 mt-6">© {new Date().getFullYear()} THE K'ROUSEL</p>
      </footer>
    </motion.div>
  );
};

export default TraiteurPage;
